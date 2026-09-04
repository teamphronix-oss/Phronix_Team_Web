import { makeDownloadRouter } from "./_makeDownloadRouter.js";

const router = makeDownloadRouter({
  projectType: "student",
  table: "student_downloadable_projects",
  supportsCategory: true,
  supportsYoutube: true,
});

export default router;