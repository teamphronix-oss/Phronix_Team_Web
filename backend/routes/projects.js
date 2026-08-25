import { Router } from "express";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import { listProjects, getProjectById, createProject, updateProject, deleteProject } from "../models/Project.js";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";

const router = Router();

router.get("/", softAdmin, async (req, res, next) => {
  try {
    const onlyPublished = !(req.admin && req.query.all === "true");
    const projects = await listProjects({ onlyPublished });
    res.json({ projects });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.technologies) body.technologies = body.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "projects");
      body.image = url;
      body.image_public_id = publicId;
    }
    const project = await createProject(body);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const existing = await getProjectById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found." });

    const body = { ...req.body };
    if (body.technologies) body.technologies = body.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "projects");
      body.image = url;
      body.image_public_id = publicId;
      if (existing.image_public_id) await deleteImage(existing.image_public_id);
    }
    const project = await updateProject(req.params.id, body);
    res.json({ project });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const existing = await getProjectById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Project not found." });
    if (existing.image_public_id) await deleteImage(existing.image_public_id);
    await deleteProject(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
