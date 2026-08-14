import { supabase } from "../config/supabase.js";

const TABLE = "users";

export async function findUserByGoogleId(googleId) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("google_id", googleId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function findUserById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createUser({ googleId, name, email, avatar }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ google_id: googleId, name, email, avatar })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Maps snake_case DB row -> the camelCase shape the rest of the app expects.
export function toClientUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar: row.avatar,
    role: row.role,
  };
}

export default { findUserByGoogleId, findUserById, createUser, toClientUser };