import { Router } from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import requireAuth from "../middleware/requireAuth.js";
import { findDownloadableBySlug } from "../models/DownloadableProject.js";

const router = Router();

const requestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
});

const TTL = Number(process.env.DOWNLOAD_LINK_TTL_SECONDS || 120);

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