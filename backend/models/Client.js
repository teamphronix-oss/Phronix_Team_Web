import { makeModel } from "./contentModel.js";

const model = makeModel("clients", { publishColumn: "is_visible" });

export const listClients = (opts) => model.list(opts);
export const getClientById = (id) => model.getById(id);
export const createClient = (row) => model.create(row);
export const updateClient = (id, row) => model.update(id, row);
export const deleteClient = (id) => model.remove(id);

export default { listClients, getClientById, createClient, updateClient, deleteClient };
