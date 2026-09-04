import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Readable } from "node:stream";
import { supabase } from "../config/supabase.js";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import { makeModel } from "../models/contentModel.js";
import { issueToken, validateToken, consumeToken } from "../services/downloadTokenService.js";
import { fetchReleaseAssetStream } from "../services/githubZipService.js";

const requestLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20 });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Builds a full CRUD + secure-download router for one of the two download
// resources ("client" or "student"). The admin CRUD half mirrors
// makeContentRouter's shape exactly (list/create/update/delete with the
// same softAdmin/requireAdmin + image-upload conventions); the token
// request/validate/download endpoints are the part specific to downloads,
// and living here once means client and student never duplicate the logic.
//
//   projectType      — "client" | "student"
//   table            — the Supabase table for that resource
//   supportsCategory — only "student_downloadable_projects" has a category
//                      column; keep this false for client so we never try
//                      to insert/update a column that table doesn't have.
//   supportsYoutube  — both client and student tables have a youtube_url
//                      column, but keep this explicit per-router so a table
//                      without it (if one is ever added) doesn't break.
export function makeDownloadRouter({ projectType, table, supportsCategory = false, supportsYoutube = false }) {
  const router = Router();
  const model = makeModel(table, { orderColumn: "order" });

  // release_tag / asset_name are GitHub-distribution internals — never
  // let them reach a client response, admin or public.
  function toPublic(row) {
    if (!row) return row;
    const { release_tag, asset_name, ...rest } = row;
    return rest;
  }

  async function findBySlug(slug) {
    const { data, error } = await supabase.from(table).select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data;
  }

  function projectIdFromTokenRecord(tokenRecord) {
    return projectType === "client" ? tokenRecord.client_project_id : tokenRecord.student_project_id;
  }

  // ───────────────────────── Admin CRUD ─────────────────────────

  router.get("/", softAdmin, async (req, res, next) => {
    try {
      const onlyPublished = !(req.admin && req.query.all === "true");
      const items = await model.list({ onlyPublished });
      res.json({ downloads: items.map(toPublic) });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
    try {
      const {
        slug,
        name,
        description,
        version,
        releaseTag,
        assetName,
        order,
        requiresLogin,
        category,
        youtubeUrl,
      } = req.body;

      if (!slug || !name || !releaseTag || !assetName) {
        return res
          .status(400)
          .json({ message: "Slug, name, release tag, and asset filename are required." });
      }

      const row = {
        slug,
        name,
        description: description || "",
        version: version || null,
        release_tag: releaseTag,
        asset_name: assetName,
        order: Number(order) || 0,
        requires_login: requiresLogin === undefined ? true : requiresLogin === "true" || requiresLogin === true,
        is_published: true,
      };

      if (supportsCategory) {
        row.category = category || "";
      }

      if (supportsYoutube) {
        row.youtube_url = youtubeUrl || null;
      }

      if (req.file) {
        const { url, publicId } = await uploadBuffer(req.file.buffer, `downloads-${projectType}`);
        row.image_url = url;
        row.image_public_id = publicId;
      }

      const created = await model.create(row);
      res.status(201).json({ download: toPublic(created) });
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).json({ message: "That slug is already in use." });
      }
      next(err);
    }
  });

  router.put("/:id", requireAdmin, upload.single("image"), async (req, res, next) => {
    try {
      const existing = await model.getById(req.params.id);
      if (!existing) return res.status(404).json({ message: "Project not found." });

      const row = {};
      if (req.body.name !== undefined) row.name = req.body.name;
      if (req.body.description !== undefined) row.description = req.body.description;
      if (req.body.version !== undefined) row.version = req.body.version;
      if (req.body.releaseTag !== undefined && req.body.releaseTag !== "") row.release_tag = req.body.releaseTag;
      if (req.body.assetName !== undefined && req.body.assetName !== "") row.asset_name = req.body.assetName;
      if (req.body.order !== undefined) row.order = Number(req.body.order) || 0;
      if (req.body.is_published !== undefined) {
        row.is_published = req.body.is_published === "true" || req.body.is_published === true;
      }
      if (req.body.requiresLogin !== undefined) {
        row.requires_login = req.body.requiresLogin === "true" || req.body.requiresLogin === true;
      }
      if (supportsCategory && req.body.category !== undefined) {
        row.category = req.body.category;
      }
      if (supportsYoutube && req.body.youtubeUrl !== undefined) {
        row.youtube_url = req.body.youtubeUrl || null;
      }
      if (req.file) {
        const { url, publicId } = await uploadBuffer(req.file.buffer, `downloads-${projectType}`);
        row.image_url = url;
        row.image_public_id = publicId;
        if (existing.image_public_id) await deleteImage(existing.image_public_id);
      }

      const updated = await model.update(req.params.id, row);
      res.json({ download: toPublic(updated) });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", requireAdmin, async (req, res, next) => {
    try {
      const existing = await model.getById(req.params.id);
      if (!existing) return res.status(404).json({ message: "Project not found." });
      if (existing.image_public_id) await deleteImage(existing.image_public_id);
      await model.remove(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  // ───────────────────────── Secure download flow ─────────────────────────

  // 1) User requests a download -> a fresh token is generated and emailed.
  //    Never trusts a client-supplied project id/email over what's on the
  //    verified project row / session — see rule "don't trust frontend".
  router.post("/:slug/request", requestLimiter, async (req, res, next) => {
    try {
      const project = await findBySlug(req.params.slug);
      if (!project || !project.is_published) {
        return res.status(404).json({ message: "Project not found." });
      }

      let email;
      let userId = null;

      if (project.requires_login) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
          return res.status(401).json({ message: "Please sign in to request this download." });
        }
        // Use the verified session email, not anything the client sent.
        email = req.user.email;
        userId = req.user.id;
      } else {
        email = String(req.body.email || "").trim().toLowerCase();
        if (!EMAIL_RE.test(email)) {
          return res.status(400).json({ message: "A valid email address is required." });
        }
      }

      await issueToken({ projectType, project, email, userId });

      res.json({ message: "Check your email for the activation link." });
    } catch (err) {
      next(err);
    }
  });

  // 2) Activation page hits this to decide whether to show the Download
  //    button. Read-only — does not consume the token.
  router.get("/validate/:token", async (req, res, next) => {
    try {
      const result = await validateToken(req.params.token);
      if (!result.valid) {
        return res.status(result.status).json({ valid: false, message: result.message });
      }
      const project = await model.getById(projectIdFromTokenRecord(result.record));
      if (!project) {
        return res.status(404).json({ valid: false, message: "Project not found." });
      }
      res.json({ valid: true, project: toPublic(project) });
    } catch (err) {
      next(err);
    }
  });

  // 3) Actual download. Validates again for a clear error message, then
  //    atomically consumes the token (rule #7), THEN retrieves the file —
  //    matching the order specified in the flow: validate -> consume ->
  //    verify project -> stream.
  router.get("/:token/download", async (req, res, next) => {
    try {
      const check = await validateToken(req.params.token);
      if (!check.valid) {
        return res.status(check.status).json({ message: check.message });
      }

      const consumed = await consumeToken(req.params.token);
      if (!consumed.ok) {
        // Someone else (or a retry) won the race, or it expired between
        // the check above and now — reject, do not serve the file.
        return res.status(consumed.status).json({ message: consumed.message });
      }

      const project = await model.getById(projectIdFromTokenRecord(consumed.record));
      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }

      let stream;
      try {
        stream = await fetchReleaseAssetStream({
          releaseTag: project.release_tag,
          assetName: project.asset_name,
        });
      } catch (fetchErr) {
        // Token is already burned at this point (by design — see rule #7).
        // This is the rare-failure case called out in the spec: log it for
        // manual follow-up and tell the user to request a fresh link.
        console.error(
          `[downloads:${projectType}] GitHub fetch failed after token consumption (token record ${consumed.record.id}):`,
          fetchErr.message
        );
        return res.status(502).json({
          message: "The download could not be retrieved right now. Please request a new download link.",
        });
      }

      res.setHeader("Content-Disposition", `attachment; filename="${project.asset_name}"`);
      res.setHeader("Content-Type", stream.contentType);
      if (stream.contentLength) res.setHeader("Content-Length", stream.contentLength);

      Readable.fromWeb(stream.body).pipe(res);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

export default { makeDownloadRouter };