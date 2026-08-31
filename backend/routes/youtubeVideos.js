import { makeContentRouter } from "./_makeContentRouter.js";
import YoutubeVideo from "../models/YoutubeVideo.js";

const model = {
  list: YoutubeVideo.listYoutubeVideos,
  getById: YoutubeVideo.getYoutubeVideoById,
  create: YoutubeVideo.createYoutubeVideo,
  update: YoutubeVideo.updateYoutubeVideo,
  remove: YoutubeVideo.deleteYoutubeVideo,
};

export default makeContentRouter({
  model,
  responseKey: "videos",
  singleKey: "video",
  arrayFields: [],
  imageFields: [
    { formField: "thumbnail", urlField: "thumbnail_url", publicIdField: "thumbnail_public_id", folder: "youtube" },
  ],
});