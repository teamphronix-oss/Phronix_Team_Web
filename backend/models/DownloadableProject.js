import { supabase } from "../config/supabase.js";

const TABLE = "downloadable_projects";

export async function findDownloadableBySlug(slug) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("slug", slug).maybeSingle();
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

export default { findDownloadableBySlug, upsertDownloadable };