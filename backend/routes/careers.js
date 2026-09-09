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
// column is "is_open" — remap here so the shared factory never needs to
// know about this one form's field name.
function transformCareerBody(row) {
  const mapped = { ...row };
  mapped.is_open = mapped.open === undefined ? true : mapped.open === "true" || mapped.open === true;
  delete mapped.open;
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