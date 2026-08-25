import { makeContentRouter } from "./_makeContentRouter.js";
import Testimonial from "../models/Testimonial.js";

const model = {
  list: Testimonial.listTestimonials,
  getById: Testimonial.getTestimonialById,
  create: Testimonial.createTestimonial,
  update: Testimonial.updateTestimonial,
  remove: Testimonial.deleteTestimonial,
};

export default makeContentRouter({
  model,
  responseKey: "testimonials",
  singleKey: "testimonial",
  arrayFields: [],
  imageFields: [
    { formField: "photo", urlField: "photo_url", publicIdField: "cloudinary_public_id", folder: "testimonials" },
  ],
  publishColumn: "is_visible",
});
