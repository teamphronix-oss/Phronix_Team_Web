import { makeModel } from "./contentModel.js";

const model = makeModel("careers");

export const listCareers = (opts) => model.list(opts);
export const getCareerById = (id) => model.getById(id);
export const createCareer = (row) => model.create(row);
export const updateCareer = (id, row) => model.update(id, row);
export const deleteCareer = (id) => model.remove(id);

export default { listCareers, getCareerById, createCareer, updateCareer, deleteCareer };
