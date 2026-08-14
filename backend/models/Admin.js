import { supabase } from "../config/supabase.js";

const TABLE = "admins";

export async function findAdminByUsername(username) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findAdminByEmail(email) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("email", email)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findAdminById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function findAdminByValidResetToken(tokenHash) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("reset_token_hash", tokenHash)
    .gt("reset_token_expires", new Date().toISOString())
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function setResetToken(id, tokenHash, expiresAt) {
  const { error } = await supabase
    .from(TABLE)
    .update({ reset_token_hash: tokenHash, reset_token_expires: expiresAt })
    .eq("id", id);
  if (error) throw error;
}

export async function updatePassword(id, passwordHash) {
  const { error } = await supabase
    .from(TABLE)
    .update({ password_hash: passwordHash, reset_token_hash: null, reset_token_expires: null })
    .eq("id", id);
  if (error) throw error;
}

// Used by scripts/seedAdmin.js — creates the admin if missing, updates it if not.
export async function upsertAdmin({ username, email, passwordHash }) {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert({ username, email, password_hash: passwordHash }, { onConflict: "username" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export default {
  findAdminByUsername,
  findAdminByEmail,
  findAdminById,
  findAdminByValidResetToken,
  setResetToken,
  updatePassword,
  upsertAdmin,
};