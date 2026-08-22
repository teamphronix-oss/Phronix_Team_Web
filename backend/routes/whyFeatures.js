import { makeContentRouter } from "./_makeContentRouter.js";
import WhyFeature from "../models/WhyFeature.js";

const model = {
  list: WhyFeature.listWhyFeatures,
  getById: WhyFeature.getWhyFeatureById,
  create: WhyFeature.createWhyFeature,
  update: WhyFeature.updateWhyFeature,
  remove: WhyFeature.deleteWhyFeature,
};

export default makeContentRouter({
  model,
  responseKey: "features",
  singleKey: "feature",
  arrayFields: [],
  imageFields: [
    { formField: "image", urlField: "image_url", publicIdField: "image_public_id", folder: "why-features" },
  ],
});
