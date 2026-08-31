import { makeContentRouter } from "./_makeContentRouter.js";
import AboutPoint from "../models/AboutPoint.js";

const model = {
  list: AboutPoint.listAboutPoints,
  getById: AboutPoint.getAboutPointById,
  create: AboutPoint.createAboutPoint,
  update: AboutPoint.updateAboutPoint,
  remove: AboutPoint.deleteAboutPoint,
};

export default makeContentRouter({
  model,
  responseKey: "points",
  singleKey: "point",
  arrayFields: [],
  imageFields: [],
  hasPublish: false,
});
