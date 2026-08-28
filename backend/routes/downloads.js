import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import {
  findDownloadableBySlug,
  findDownloadableById,
  listDownloadables,
  updateDownloadableMeta,
  deleteDownloadable,
  createDownloadable,
} from "../models/DownloadableProject.js";

const router = Router();

const requestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
});

const TTL = Number(process.env.DOWNLOAD_LINK_TTL_SECONDS || 120);

function toPublic(row) {
  const { filename, password_hash, ...rest } = row;
  return { ...rest, requiresPassword: !!password_hash };
}

router.get("/", softAdmin, async (req, res, next) => {
  try {
    const onlyPublished = !(req.admin && req.query.all === "true");
    const items = await listDownloadables({ onlyPublished });
    res.json({ downloads: items.map(toPublic) });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const { slug, name, description, version, filename, order, requiresAuth, password } = req.body;

    if (!slug || !name || !filename) {
      return res.status(400).json({ message: "Slug, name, and the GitHub download link are required." });
    }

    const row = {
      slug,
      name,
      description: description || "",
      version: version || null,
      filename,
      order: Number(order) || 0,
      requires_auth: requiresAuth === "true" || requiresAuth === true,
      is_published: true,
    };

    if (password) {
      row.password_hash = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "downloads");
      row.image_url = url;
      row.image_public_id = publicId;
    }

    const created = await createDownloadable(row);
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
    const existing = await findDownloadableById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found." });

    const row = {};
    if (req.body.description !== undefined) row.description = req.body.description;
    if (req.body.order !== undefined) row.order = Number(req.body.order) || 0;
    if (req.body.is_published !== undefined) {
      row.is_published = req.body.is_published === "true" || req.body.is_published === true;
    }
    if (req.body.version !== undefined) row.version = req.body.version;
    if (req.body.filename !== undefined && req.body.filename !== "") {
      row.filename = req.body.filename;
    }
    if (req.body.requiresAuth !== undefined) {
      row.requires_auth = req.body.requiresAuth === "true" || req.body.requiresAuth === true;
    }
    if (req.body.password) {
      row.password_hash = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "downloads");
      row.image_url = url;
      row.image_public_id = publicId;
      if (existing.image_public_id) await deleteImage(existing.image_public_id);
    }

    const updated = await updateDownloadableMeta(req.params.id, row);
    res.json({ download: toPublic(updated) });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const existing = await findDownloadableById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found." });
    if (existing.image_public_id) await deleteImage(existing.image_public_id);
    await deleteDownloadable(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post("/:slug/request", requireAuth, requestLimiter, async (req, res, next) => {
  try {
    const project = await findDownloadableBySlug(req.params.slug);
    if (!project) return res.status(404).json({ message: "Project not found." });

    if (project.password_hash) {
      const provided = req.body.password || "";
      const matches = await bcrypt.compare(provided, project.password_hash);
      if (!matches) {
        return res.status(403).json({ message: "Incorrect password for this project." });
      }
    }

    const token = jwt.sign(
      { slug: project.slug, userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: TTL }
    );

    res.json({ downloadUrl: `/api/downloads/serve/${token}` });
  } catch (err) {
    next(err);
  }
});

router.get("/serve/:token", async (req, res, next) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const project = await findDownloadableBySlug(payload.slug);
    if (!project) return res.status(404).json({ message: "Project not found." });

    if (!project.filename) {
      return res.status(404).json({ message: "Download link not configured yet." });
    }

    return res.redirect(project.filename);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(410).json({ message: "This download link has expired. Please request a new one." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid download link." });
    }
    next(err);
  }
});

export default router;