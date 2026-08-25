import { Router } from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import softAdmin from "../middleware/softAdmin.js";
import { upload, uploadBuffer, deleteImage } from "../middleware/upload.js";

// Builds a full CRUD router for admin-managed content list resources.
//
// Optional transformBody:
// - Allows a resource-specific route to map frontend field names
//   to database column names before create/update.
// - Existing routes that don't provide transformBody continue
//   working exactly as before.
export function makeContentRouter({
  model,
  responseKey,
  singleKey,
  arrayFields = [],
  imageFields = [],
  hasPublish = true,
  transformBody = null,
}) {
  const router = Router();

  const multerFields = imageFields.map((f) => ({
    name: f.formField,
    maxCount: 1,
  }));

  function parseBody(body) {
    let row = { ...body };

    // Convert configured comma-separated fields into arrays.
    for (const field of arrayFields) {
      if (row[field] !== undefined) {
        row[field] = String(row[field])
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    if (row.order !== undefined) {
      row.order = Number(row.order) || 0;
    }

    if (row.rating !== undefined) {
      row.rating = Number(row.rating) || undefined;
    }

    if (hasPublish && row.is_published !== undefined) {
      row.is_published =
        row.is_published === "true" || row.is_published === true;
    }

    // Never allow client to directly set Cloudinary public IDs.
    for (const f of imageFields) {
      delete row[f.publicIdField];
    }

    // Resource-specific mapping.
    if (typeof transformBody === "function") {
      row = transformBody(row);
    }

    return row;
  }

  // PUBLIC / ADMIN GET
  router.get("/", softAdmin, async (req, res, next) => {
    try {
      const onlyPublished =
        hasPublish && !(req.admin && req.query.all === "true");

      const items = await model.list({ onlyPublished });

      res.json({ [responseKey]: items });
    } catch (err) {
      next(err);
    }
  });

  // CREATE
  router.post(
    "/",
    requireAdmin,
    upload.fields(multerFields),
    async (req, res, next) => {
      try {
        const row = parseBody(req.body);

        for (const f of imageFields) {
          const file = req.files?.[f.formField]?.[0];

          if (file) {
            const { url, publicId } = await uploadBuffer(
              file.buffer,
              f.folder
            );

            row[f.urlField] = url;
            row[f.publicIdField] = publicId;
          }
        }

        const item = await model.create(row);

        res.status(201).json({
          [singleKey]: item,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // UPDATE
  router.put(
    "/:id",
    requireAdmin,
    upload.fields(multerFields),
    async (req, res, next) => {
      try {
        const existing = await model.getById(req.params.id);

        if (!existing) {
          return res.status(404).json({
            message: `${singleKey} not found.`,
          });
        }

        const row = parseBody(req.body);

        for (const f of imageFields) {
          const file = req.files?.[f.formField]?.[0];

          if (file) {
            const { url, publicId } = await uploadBuffer(
              file.buffer,
              f.folder
            );

            row[f.urlField] = url;
            row[f.publicIdField] = publicId;

            // Delete previous Cloudinary image.
            if (existing[f.publicIdField]) {
              await deleteImage(existing[f.publicIdField]);
            }
          }
        }

        const item = await model.update(req.params.id, row);

        res.json({
          [singleKey]: item,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // DELETE
  router.delete("/:id", requireAdmin, async (req, res, next) => {
    try {
      const existing = await model.getById(req.params.id);

      if (!existing) {
        return res.status(404).json({
          message: `${singleKey} not found.`,
        });
      }

      for (const f of imageFields) {
        if (existing[f.publicIdField]) {
          await deleteImage(existing[f.publicIdField]);
        }
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