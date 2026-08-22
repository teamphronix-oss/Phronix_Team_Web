import { Router } from "express";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";
import { getSettings, setLogo, updateSettings } from "../models/SiteSettings.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const row = await getSettings();
    res.json({
      settings: {
        logoUrl: row.logo_url || "",
        projectsStat: row.projects_stat || "",
        projectsTitle: row.projects_title || "",
        projectsDescription: row.projects_description || "",
        whyTitle: row.why_title || "",
        whyDescription: row.why_description || "",
      },
    });
  } catch (err) {
    next(err);
  }
});

router.put("/logo", requireAdmin, upload.single("logo"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded." });
    const previous = await getSettings();
    const { url, publicId } = await uploadBuffer(req.file.buffer, "site");
    const row = await setLogo(url);
    // Store the public_id too so future logo swaps clean up after themselves.
    await updateSettings({ logo_public_id: publicId });
    if (previous.logo_public_id) await deleteImage(previous.logo_public_id);
    res.json({ settings: { logoUrl: row.logo_url } });
  } catch (err) {
    next(err);
  }
});

router.put("/", requireAdmin, async (req, res, next) => {
  try {
    const row = await updateSettings(req.body);
    res.json({
      settings: {
        projectsStat: row.projects_stat,
        projectsTitle: row.projects_title,
        projectsDescription: row.projects_description,
        whyTitle: row.why_title,
        whyDescription: row.why_description,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
