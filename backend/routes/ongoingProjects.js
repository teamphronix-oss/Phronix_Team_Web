import { makeContentRouter } from "./_makeContentRouter.js";
import OngoingProject from "../models/OngoingProject.js";

const model = {
  list: OngoingProject.listOngoingProjects,
  getById: OngoingProject.getOngoingProjectById,
  create: OngoingProject.createOngoingProject,
  update: OngoingProject.updateOngoingProject,
  remove: OngoingProject.deleteOngoingProject,
};

export default makeContentRouter({
  model,
  responseKey: "ongoingProjects",
  singleKey: "ongoingProject",
  arrayFields: ["technologies"],
  imageFields: [
    { formField: "image", urlField: "image_url", publicIdField: "image_public_id", folder: "ongoing-projects" },
  ],
});
