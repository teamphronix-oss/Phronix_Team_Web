import { makeModel } from "./contentModel.js";

const model = makeModel("about_points", { hasPublish: false });

export const listAboutPoints = (opts) => model.list(opts);
export const getAboutPointById = (id) => model.getById(id);
export const createAboutPoint = (row) => model.create(row);
export const updateAboutPoint = (id, row) => model.update(id, row);
export const deleteAboutPoint = (id) => model.remove(id);

export default { listAboutPoints, getAboutPointById, createAboutPoint, updateAboutPoint, deleteAboutPoint };
