import { makeModel } from "./contentModel.js";

const model = makeModel("why_features");

export const listWhyFeatures = (opts) => model.list(opts);
export const getWhyFeatureById = (id) => model.getById(id);
export const createWhyFeature = (row) => model.create(row);
export const updateWhyFeature = (id, row) => model.update(id, row);
export const deleteWhyFeature = (id) => model.remove(id);

export default { listWhyFeatures, getWhyFeatureById, createWhyFeature, updateWhyFeature, deleteWhyFeature };
