import { makeContentRouter } from "./_makeContentRouter.js";
import Career from "../models/Career.js";

const model = {
  list: Career.listCareers,
  getById: Career.getCareerById,
  create: Career.createCareer,
  update: Career.updateCareer,
  remove: Career.deleteCareer,
};

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
});
