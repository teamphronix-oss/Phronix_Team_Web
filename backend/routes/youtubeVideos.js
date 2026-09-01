import { Router } from "express";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";
import {
  listYoutubeVideos,
  getYoutubeVideoById,
  createYoutubeVideo,
  updateYoutubeVideo,
  deleteYoutubeVideo,
} from "../models/YoutubeVideo.js";

const router = Router();

router.get("/", softAdmin, async (req, res, next) => {
  try {
    const onlyPublished = !(req.admin && req.query.all === "true");
    const videos = await listYoutubeVideos({ onlyPublished });
    res.json({ videos });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, upload.single("thumbnail"), async (req, res, next) => {
  try {
    const row = {
      title: req.body.title,
      youtube_url: req.body.url,
      order: Number(req.body.order) || 0,
    };

    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "youtube");
      row.thumbnail_url = url;
      row.thumbnail_public_id = publicId;
    }

    const video = await createYoutubeVideo(row);
    res.status(201).json({ video });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, upload.single("thumbnail"), async (req, res, next) => {
  try {
    const existing = await getYoutubeVideoById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Video not found." });

    const row = {
      title: req.body.title,
      youtube_url: req.body.url,
      order: Number(req.body.order) || 0,
    };

    if (req.file) {
      const { url, publicId } = await uploadBuffer(req.file.buffer, "youtube");
      row.thumbnail_url = url;
      row.thumbnail_public_id = publicId;
      if (existing.thumbnail_public_id) await deleteImage(existing.thumbnail_public_id);
    }

    const video = await updateYoutubeVideo(req.params.id, row);
    res.json({ video });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const existing = await getYoutubeVideoById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Video not found." });
    if (existing.thumbnail_public_id) await deleteImage(existing.thumbnail_public_id);
    await deleteYoutubeVideo(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
