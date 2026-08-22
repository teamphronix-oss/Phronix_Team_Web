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
    { formField: "clientPhoto", urlField: "client_photo_url", publicIdField: "client_photo_public_id", folder: "testimonials/clients" },
    { formField: "companyLogo", urlField: "company_logo_url", publicIdField: "company_logo_public_id", folder: "testimonials/companies" },
  ],
});
