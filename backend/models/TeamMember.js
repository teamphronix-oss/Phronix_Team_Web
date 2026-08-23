import { supabase } from "../config/supabase.js";

const TABLE = "team_members";

export async function listTeam({ onlyPublished = false } = {}) {
  let query = supabase
    .from(TABLE)
    .select("*")
    .order("order", { ascending: true })
    .order("created_at", { ascending: true });
  if (onlyPublished) query = query.eq("is_published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getTeamMemberById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createTeamMember(body) {
  const { data, error } = await supabase.from(TABLE).insert(toRow(body)).select().single();
  if (error) throw error;
  return data;
}

export async function updateTeamMember(id, body) {
  const { data, error } = await supabase.from(TABLE).update(toRow(body)).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteTeamMember(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

function toRow(body) {
  const row = {};
  if (body.name !== undefined) row.name = body.name;
  if (body.role !== undefined) row.role = body.role;
  if (body.image !== undefined) row.image = body.image;
  if (body.image_public_id !== undefined) row.image_public_id = body.image_public_id;
  if (body.bio !== undefined) row.bio = body.bio;
  if (body.skills !== undefined) row.skills = body.skills;
  if (body.linkedin !== undefined) row.linkedin = body.linkedin;
  if (body.github !== undefined) row.github = body.github;
  if (body.order !== undefined) row.order = Number(body.order) || 0;
  if (body.is_published !== undefined) {
    row.is_published = body.is_published === "true" || body.is_published === true;
  }
  return row;
}

export default { listTeam, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember };
