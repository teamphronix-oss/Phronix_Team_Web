import { supabase } from "../config/supabase.js";

const TABLE = "projects";

export async function listProjects({ onlyPublished = false } = {}) {
  let query = supabase
    .from(TABLE)
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: false });
  if (onlyPublished) query = query.eq("is_published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProjectById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createProject(body) {
  const { data, error } = await supabase.from(TABLE).insert(toRow(body)).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id, body) {
  const { data, error } = await supabase.from(TABLE).update(toRow(body)).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

// Accepts either camelCase (from the API layer) or already-snake_case fields.
function toRow(body) {
  const row = {};
  if (body.name !== undefined) row.name = body.name;
  if (body.category !== undefined) row.category = body.category;
  if (body.image !== undefined) row.image = body.image;
  if (body.image_public_id !== undefined) row.image_public_id = body.image_public_id;
  if (body.description !== undefined) row.description = body.description;
  if (body.technologies !== undefined) row.technologies = body.technologies;
  if (body.githubUrl !== undefined) row.github_url = body.githubUrl;
  if (body.demoUrl !== undefined) row.demo_url = body.demoUrl;
  if (body.ongoing !== undefined) row.ongoing = body.ongoing === "true" || body.ongoing === true;
  if (body.order !== undefined) row.order = Number(body.order) || 0;
  if (body.is_published !== undefined) {
    row.is_published = body.is_published === "true" || body.is_published === true;
  }
  return row;
}

export default { listProjects, getProjectById, createProject, updateProject, deleteProject };
