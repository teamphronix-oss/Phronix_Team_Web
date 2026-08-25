import { makeContentRouter } from "./_makeContentRouter.js";
import Client from "../models/Client.js";

const model = {
  list: Client.listClients,
  getById: Client.getClientById,
  create: Client.createClient,
  update: Client.updateClient,
  remove: Client.deleteClient,
};

export default makeContentRouter({
  model,
  responseKey: "clients",
  singleKey: "client",
  arrayFields: [],
  imageFields: [
    { formField: "logo", urlField: "logo_url", publicIdField: "cloudinary_public_id", folder: "clients" },
  ],
  publishColumn: "is_visible",
});
