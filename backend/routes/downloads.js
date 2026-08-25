import { Router } from "express";
import path from "path";
import fs from "fs";
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
} from "../models/DownloadableProject.js";

const router = Router();

const requestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
});

const TTL = Number(process.env.DOWNLOAD_LINK_TTL_SECONDS || 120);

// Strips filename/password_hash before anything public-facing sees a row —
// those must never leave the server.
function toPublic(row) {
  const { filename, password_hash, ...rest } = row;
  return { ...rest, requiresPassword: !!password_hash };
}

// Public catalog listing (name/description/image/version — no file path,
// no password hash). ?all=true from a signed-in admin also returns drafts.
router.get("/", softAdmin, async (req, res, next) => {
  try {
    const onlyPublished = !(req.admin && req.query.all === "true");
    const items = await listDownloadables({ onlyPublished });
    res.json({ downloads: items.map(toPublic) });
  } catch (err) {
    next(err);
  }
});

// Admin metadata edit — description, image, order, is_published. The
// protected zip itself and its password are managed via
// scripts/seedDownloads.js + hashPassword.js, not this endpoint, since the
// real file has to be placed on disk to match whatever `filename` points to.
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

    const baseDir = path.resolve(process.env.PROTECTED_FILES_DIR);
    const filePath = path.resolve(baseDir, project.filename);

    if (!filePath.startsWith(baseDir)) {
      return res.status(400).json({ message: "Invalid file reference." });
    }
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not available." });
    }

    res.download(filePath, `${project.slug}-${project.version || "latest"}.zip`);
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