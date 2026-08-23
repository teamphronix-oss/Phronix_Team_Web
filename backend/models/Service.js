import { makeModel } from "./contentModel.js";

const model = makeModel("services");

export const listServices = (opts) => model.list(opts);
export const getServiceById = (id) => model.getById(id);
export const createService = (row) => model.create(row);
export const updateService = (id, row) => model.update(id, row);
export const deleteService = (id) => model.remove(id);

export default { listServices, getServiceById, createService, updateService, deleteService };
