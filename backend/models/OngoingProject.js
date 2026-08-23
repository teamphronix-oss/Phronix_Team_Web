import { makeModel } from "./contentModel.js";

const model = makeModel("ongoing_projects");

export const listOngoingProjects = (opts) => model.list(opts);
export const getOngoingProjectById = (id) => model.getById(id);
export const createOngoingProject = (row) => model.create(row);
export const updateOngoingProject = (id, row) => model.update(id, row);
export const deleteOngoingProject = (id) => model.remove(id);

export default { listOngoingProjects, getOngoingProjectById, createOngoingProject, updateOngoingProject, deleteOngoingProject };
