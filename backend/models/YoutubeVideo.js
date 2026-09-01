import { supabase } from "../config/supabase.js";

const TABLE = "youtube_videos";

// Admin panel and frontend both use "url" — DB column is "youtube_url".
// This mapping keeps that existing frontend/admin code untouched.
function toApi(row) {
  return {
    id: row.id,
    title: row.title,
    url: row.youtube_url,
    thumbnail_url: row.thumbnail_url,
    order: row.order,
    is_published: row.is_published,
  };
}

export async function listYoutubeVideos({ onlyPublished = false } = {}) {
  let query = supabase.from(TABLE).select("*").order("order", { ascending: true });
  if (onlyPublished) query = query.eq("is_published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(toApi);
}

export async function getYoutubeVideoById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createYoutubeVideo(row) {
  const { data, error } = await supabase.from(TABLE).insert(row).select().single();
  if (error) throw error;
  return toApi(data);
}

export async function updateYoutubeVideo(id, row) {
  const { data, error } = await supabase.from(TABLE).update(row).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return toApi(data);
}

export async function deleteYoutubeVideo(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export default {
  listYoutubeVideos,
  getYoutubeVideoById,
  createYoutubeVideo,
  updateYoutubeVideo,
  deleteYoutubeVideo,
};
