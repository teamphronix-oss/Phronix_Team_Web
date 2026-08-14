import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { listProjects, createProject, updateProject, deleteProject } from "../models/Project.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();
const uploadDir = path.resolve("uploads/public/projects");
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
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
    const projects = await listProjects();
    res.json({ projects });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.technologies) body.technologies = body.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    if (req.file) body.image = `/uploads/public/projects/${req.file.filename}`;
    const project = await createProject(body);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.technologies) body.technologies = body.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    if (req.file) body.image = `/uploads/public/projects/${req.file.filename}`;
    const project = await updateProject(req.params.id, body);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json({ project });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const project = await deleteProject(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;