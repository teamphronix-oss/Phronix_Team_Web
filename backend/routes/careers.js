import { makeContentRouter } from "./_makeContentRouter.js";
import Career from "../models/Career.js";

const model = {
  list: Career.listCareers,
  getById: Career.getCareerById,
  create: Career.createCareer,
  update: Career.updateCareer,
  remove: Career.deleteCareer,
};

// Admin panel's checkbox field is named "open", but the careers table's
// column is "is_open"; similarly the "Type" field maps to "employment_type".
// Remap here so the shared factory never needs to know about this one
// form's field names.
function transformCareerBody(row) {
  const mapped = { ...row };

  // Admin form uses "open", database uses "is_open"
  mapped.is_open =
    mapped.open === undefined
      ? true
      : mapped.open === "true" || mapped.open === true;
  delete mapped.open;

  // Admin form uses "type", database uses "employment_type"
  if (mapped.type !== undefined) {
    mapped.employment_type = mapped.type;
    delete mapped.type;
  }

  // Generate slug automatically from title
  if (mapped.title) {
    mapped.slug = mapped.title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return mapped;
}

// Careers has no image and uses is_open instead of is_published, so it
// doesn't fit the generic hasPublish filter — the public site should just
// see everything and filter on is_open itself if it wants to.
export default makeContentRouter({
  model,
  responseKey: "careers",
  singleKey: "career",
  arrayFields: ["responsibilities", "requirements", "skills"],
  imageFields: [],
  hasPublish: false,
  transformBody: transformCareerBody,
});