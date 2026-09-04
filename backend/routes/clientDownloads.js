import { makeDownloadRouter } from "./_makeDownloadRouter.js";

const router = makeDownloadRouter({
  projectType: "client",
  table: "client_downloadable_projects",
  supportsYoutube: true,
});

export default router;