import { supabase } from "../config/supabase.js";

const TABLE = "feedback";

// Public — anyone visiting the site can submit feedback.
export async function createFeedback({ name, email, rating, message }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name: name || "", email: email || "", rating: rating || null, message })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Admin-only listing, newest first, optionally filtered by status
// ("new" | "reviewed" | "archived" — whatever values the admin panel uses).
export async function listFeedback({ status } = {}) {
  let query = supabase.from(TABLE).select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function updateFeedback(id, { status, admin_note }) {
  const row = {};
  if (status !== undefined) row.status = status;
  if (admin_note !== undefined) row.admin_note = admin_note;
  const { data, error } = await supabase.from(TABLE).update(row).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteFeedback(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export default { createFeedback, listFeedback, updateFeedback, deleteFeedback };
