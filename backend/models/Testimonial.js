import { makeModel } from "./contentModel.js";

const model = makeModel("testimonials");

export const listTestimonials = (opts) => model.list(opts);
export const getTestimonialById = (id) => model.getById(id);
export const createTestimonial = (row) => model.create(row);
export const updateTestimonial = (id, row) => model.update(id, row);
export const deleteTestimonial = (id) => model.remove(id);

export default { listTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
