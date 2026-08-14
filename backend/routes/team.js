import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { listTeam, createTeamMember, updateTeamMember, deleteTeamMember } from "../models/TeamMember.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();
const uploadDir = path.resolve("uploads/public/team");
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
    const team = await listTeam();
    res.json({ team });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.skills) body.skills = body.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (req.file) body.image = `/uploads/public/team/${req.file.filename}`;
    const member = await createTeamMember(body);
    res.status(201).json({ member });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.skills) body.skills = body.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (req.file) body.image = `/uploads/public/team/${req.file.filename}`;
    const member = await updateTeamMember(req.params.id, body);
    if (!member) return res.status(404).json({ message: "Team member not found." });
    res.json({ member });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const member = await deleteTeamMember(req.params.id);
    if (!member) return res.status(404).json({ message: "Team member not found." });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;