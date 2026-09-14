import { makeContentRouter } from "./_makeContentRouter.js";
import OngoingProject from "../models/OngoingProject.js";

// The admin panel's Ongoing Projects form sends camelCase field names
// (startDate, expectedCompletion) but the ongoing_projects table uses
// snake_case columns (start_date, expected_completion)   remap here so
// the shared makeContentRouter/contentModel layer never has to know about
// this one form's field names.
function remapFields(row) {
  const mapped = { ...row };
  if (mapped.startDate !== undefined) {
    mapped.start_date = mapped.startDate || null;
    delete mapped.startDate;
  }
  if (mapped.expectedCompletion !== undefined) {
    mapped.expected_completion = mapped.expectedCompletion || null;
    delete mapped.expectedCompletion;
  }
  return mapped;
}

const model = {
  list: OngoingProject.listOngoingProjects,
  getById: OngoingProject.getOngoingProjectById,
  create: (row) => OngoingProject.createOngoingProject(remapFields(row)),
  update: (id, row) => OngoingProject.updateOngoingProject(id, remapFields(row)),
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