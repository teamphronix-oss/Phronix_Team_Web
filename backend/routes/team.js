import { Router } from "express";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import { listTeam, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember } from "../models/TeamMember.js";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";

const router = Router();

router.get("/", softAdmin, async (req, res, next) => {
  try {
    const onlyPublished = !(req.admin && req.query.all === "true");
    const team = await listTeam({ onlyPublished });
    res.json({ team });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (body.skills) body.skills = body.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "team");
      body.image = url;
      body.image_public_id = publicId;
    }
    const member = await createTeamMember(body);
    res.status(201).json({ member });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    const existing = await getTeamMemberById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Team member not found." });

    const body = { ...req.body };
    if (body.skills) body.skills = body.skills.split(",").map((s) => s.trim()).filter(Boolean);
    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "team");
      body.image = url;
      body.image_public_id = publicId;
      if (existing.image_public_id) await deleteImage(existing.image_public_id);
    }
    const member = await updateTeamMember(req.params.id, body);
    res.json({ member });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const existing = await getTeamMemberById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Team member not found." });
    if (existing.image_public_id) await deleteImage(existing.image_public_id);
    await deleteTeamMember(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
