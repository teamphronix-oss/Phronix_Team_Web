import { supabase } from "../config/supabase.js";

const TABLE = "site_settings";

export async function getSettings() {
  const { data, error } = await supabase.from(TABLE).select("*").eq("key", "main").maybeSingle();
  if (error) throw error;
  return (
    data || {
      logo_url: "",
      projects_stat: "40+",
      projects_title: "Projects",
      projects_description: "",
      why_title: "Why Phronix",
      why_description: "",
    }
  );
}

export async function setLogo(logoUrl) {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert({ key: "main", logo_url: logoUrl, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Text-only settings — logo goes through setLogo() since it needs the
// Cloudinary upload step first.
export async function updateSettings(fields) {
  const row = { key: "main", updated_at: new Date().toISOString() };
  const allowed = ["projects_stat", "projects_title", "projects_description", "why_title", "why_description"];
  for (const key of allowed) {
    if (fields[key] !== undefined) row[key] = fields[key];
  }
  const { data, error } = await supabase.from(TABLE).upsert(row, { onConflict: "key" }).select().single();
  if (error) throw error;
  return data;
}

export default { getSettings, setLogo, updateSettings };
