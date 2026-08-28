import { supabase } from "../config/supabase.js";

const TABLE = "downloadable_projects";

export async function findDownloadableBySlug(slug) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function findDownloadableById(id) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function listDownloadables({ onlyPublished = false } = {}) {
  let query = supabase.from(TABLE).select("*").order("order", { ascending: true });
  if (onlyPublished) query = query.eq("is_published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function upsertDownloadable(item) {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        slug: item.slug,
        name: item.name,
        version: item.version,
        filename: item.filename,
        password_hash: item.passwordHash || null,
        requires_auth: item.requiresAuth ?? true,
      },
      { onConflict: "slug" }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Full insert for admin-created downloads (unlike upsertDownloadable, which
// only touches slug/name/version/filename/password_hash/requires_auth —
// this also sets description, order, is_published, and the Cloudinary
// image fields in one go, since it's used by the new admin "create" flow).
export async function createDownloadable(row) {
  const { data, error } = await supabase.from(TABLE).insert(row).select().single();
  if (error) throw error;
  return data;
}


// Admin-panel metadata edits (description, image, order, published state).
// filename/password_hash are intentionally NOT editable here — those are
// set only via scripts/seedDownloads.js + hashPassword.js, since the actual
// protected file has to be placed on disk to match.
export async function updateDownloadableMeta(id, row) {
  const { data, error } = await supabase.from(TABLE).update(row).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteDownloadable(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export default {
  findDownloadableBySlug,
  findDownloadableById,
  listDownloadables,
  upsertDownloadable,
  updateDownloadableMeta,
  deleteDownloadable,
  createDownloadable,
};
