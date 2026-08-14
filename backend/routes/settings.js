import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getSettings, setLogo } from "../models/SiteSettings.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();
const uploadDir = path.resolve("uploads/public/site");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `logo-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image files are allowed."));
    cb(null, true);
  },
});

router.get("/", async (req, res, next) => {
  try {
    const row = await getSettings();
    res.json({ settings: { logoUrl: row.logo_url || "" } });
  } catch (err) {
    next(err);
  }
});

router.put("/logo", requireAdmin, upload.single("logo"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded." });
    const logoUrl = `/uploads/public/site/${req.file.filename}`;
    const row = await setLogo(logoUrl);
    res.json({ settings: { logoUrl: row.logo_url } });
  } catch (err) {
    next(err);
  }
});

export default router;