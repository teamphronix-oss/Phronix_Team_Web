import { makeContentRouter } from "./_makeContentRouter.js";
import Service from "../models/Service.js";

const model = {
  list: Service.listServices,
  getById: Service.getServiceById,
  create: Service.createService,
  update: Service.updateService,
  remove: Service.deleteService,
};

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function transformServiceBody(body) {
  return {
    name: body.name || "",

    // Automatically generate slug from service name.
    slug: slugify(body.name),

    icon: body.icon || "",

    // Admin: shortDescription
    // DB: description
    description: body.shortDescription || "",

    // Admin: technologies
    // DB: features[]
    features: body.technologies
      ? String(body.technologies)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],

    // Admin: priceRange
    // DB: price_range
    price_range: body.priceRange || "",

    order: Number(body.order) || 0,

    is_published:
      body.is_published === undefined
        ? true
        : body.is_published === "true" ||
          body.is_published === true,
  };
}

export default makeContentRouter({
  model,

  responseKey: "services",
  singleKey: "service",

  // We are doing the technologies → features[] conversion
  // inside transformServiceBody.
  arrayFields: [],

  // Services UI uses Lucide icons, NOT image uploads.
  imageFields: [],

  transformBody: transformServiceBody,
});