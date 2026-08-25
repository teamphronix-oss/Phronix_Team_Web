import { makeModel } from "./contentModel.js";

const model = makeModel("youtube_videos");

export const listYoutubeVideos = (opts) => model.list(opts);
export const getYoutubeVideoById = (id) => model.getById(id);
export const createYoutubeVideo = (row) => model.create(row);
export const updateYoutubeVideo = (id, row) => model.update(id, row);
export const deleteYoutubeVideo = (id) => model.remove(id);

export default { listYoutubeVideos, getYoutubeVideoById, createYoutubeVideo, updateYoutubeVideo, deleteYoutubeVideo };
