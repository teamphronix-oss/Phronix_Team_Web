import { Router } from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";

// Builds a full CRUD router for one of the "admin-managed content list"
// resources (services, testimonials, careers, youtube_videos,
// ongoing_projects, why_features, clients). Public GET only returns
// is_published rows unless ?all=true is passed by an authenticated admin
// request from the admin panel; admin POST/PUT/DELETE require a session.
//
// imageFields: [{ formField, urlField, publicIdField, folder }]
//   formField     — the multipart field name the admin panel uploads under
//   urlField      — the DB column to store the Cloudinary URL in
//   publicIdField — the DB column to store the Cloudinary public_id in
//   folder        — Cloudinary subfolder, e.g. "services"
export function makeContentRouter({
  model,
  responseKey,
  singleKey,
  arrayFields = [],
  imageFields = [],
  hasPublish = true,
  publishColumn = "is_published",
}) {
  const router = Router();
  const multerFields = imageFields.map((f) => ({ name: f.formField, maxCount: 1 }));

  function parseBody(body) {
    const row = { ...body };
    for (const field of arrayFields) {
      if (row[field] !== undefined) {
        const raw = String(row[field]);
        row[field] = (raw.includes("\n") ? raw.split("\n") : raw.split(","))
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
    if (row.order !== undefined) row.order = Number(row.order) || 0;
    if (row.rating !== undefined) row.rating = Number(row.rating) || undefined;
    if (hasPublish && row[publishColumn] !== undefined) {
      row[publishColumn] = row[publishColumn] === "true" || row[publishColumn] === true;
    }
    // Never let the client set the Cloudinary public_id columns directly —
    // those are only ever set by the upload branch below.
    for (const f of imageFields) delete row[f.publicIdField];
    return row;
  }

  router.get("/", softAdmin, async (req, res, next) => {
    try {
      const onlyPublished = hasPublish && !(req.admin && req.query.all === "true");
      const items = await model.list({ onlyPublished });
      res.json({ [responseKey]: items });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", requireAdmin, upload.fields(multerFields), async (req, res, next) => {
    try {
      const row = parseBody(req.body);
      for (const f of imageFields) {
        const file = req.files?.[f.formField]?.[0];
        if (file) {
          const { url, publicId } = await uploadBuffer(file.buffer, f.folder);
          row[f.urlField] = url;
          row[f.publicIdField] = publicId;
        }
      }
      const item = await model.create(row);
      res.status(201).json({ [singleKey]: item });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:id", requireAdmin, upload.fields(multerFields), async (req, res, next) => {
    try {
      const existing = await model.getById(req.params.id);
      if (!existing) return res.status(404).json({ message: `${singleKey} not found.` });

      const row = parseBody(req.body);
      for (const f of imageFields) {
        const file = req.files?.[f.formField]?.[0];
        if (file) {
          const { url, publicId } = await uploadBuffer(file.buffer, f.folder);
          row[f.urlField] = url;
          row[f.publicIdField] = publicId;
          // Clean up the previous Cloudinary asset now that it's replaced.
          if (existing[f.publicIdField]) await deleteImage(existing[f.publicIdField]);
        }
      }
      const item = await model.update(req.params.id, row);
      res.json({ [singleKey]: item });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", requireAdmin, async (req, res, next) => {
    try {
      const existing = await model.getById(req.params.id);
      if (!existing) return res.status(404).json({ message: `${singleKey} not found.` });
      for (const f of imageFields) {
        if (existing[f.publicIdField]) await deleteImage(existing[f.publicIdField]);
      }
      await model.remove(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

export default { makeContentRouter };
