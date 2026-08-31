import { Router } from "express";

import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";

import {
  getSettings,
  setLogo,
  updateSettings,
} from "../models/SiteSettings.js";

import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();


// ─────────────────────────────────────────────
// GET ALL SITE SETTINGS
// ─────────────────────────────────────────────

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

        aboutTitle: row.about_title || "",
        aboutDescription: row.about_description || "",
        // Contact details
        email: row.email || "",
        phone: row.phone || "",
        addressLine1: row.address_line1 || "",
        addressLine2: row.address_line2 || "",
        gstNumber: row.gst_number || "",
      },
    });
  } catch (err) {
    next(err);
  }
});


// ─────────────────────────────────────────────
// UPDATE LOGO
// ─────────────────────────────────────────────

router.put(
  "/logo",
  requireAdmin,
  upload.single("logo"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded.",
        });
      }

      const previous = await getSettings();

      const { url, publicId } = await uploadBuffer(
        req.file.buffer,
        "site"
      );

      const row = await setLogo(url);

      await updateSettings({
        logo_public_id: publicId,
      });

      if (previous.logo_public_id) {
        await deleteImage(previous.logo_public_id);
      }

      res.json({
        settings: {
          logoUrl: row.logo_url,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);


// ─────────────────────────────────────────────
// UPDATE CONTACT DETAILS
// ─────────────────────────────────────────────

router.put("/contact", requireAdmin, async (req, res, next) => {
  try {
    const {
      email,
      phone,
      addressLine1,
      addressLine2,
      gstNumber,
    } = req.body;

    const row = await updateSettings({
      email: email || null,
      phone: phone || null,
      address_line1: addressLine1 || null,
      address_line2: addressLine2 || null,
      gst_number: gstNumber || null,
    });

    res.json({
      settings: {
        email: row.email || "",
        phone: row.phone || "",
        addressLine1: row.address_line1 || "",
        addressLine2: row.address_line2 || "",
        gstNumber: row.gst_number || "",
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// UPDATE ABOUT INTRO
// ─────────────────────────────────────────────

router.put("/about-intro", requireAdmin, async (req, res, next) => {
  try {
    const row = await updateSettings({
      about_title: req.body.title,
      about_description: req.body.description,
    });

    res.json({
      settings: {
        aboutTitle: row.about_title,
        aboutDescription: row.about_description,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────
// UPDATE GENERAL SETTINGS
// ─────────────────────────────────────────────

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