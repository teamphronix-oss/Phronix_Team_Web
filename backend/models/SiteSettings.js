import { supabase } from "../config/supabase.js";

const TABLE = "site_settings";

export async function getSettings() {
  const { data, error } = await supabase.from(TABLE).select("*").eq("key", "main").maybeSingle();
  if (error) throw error;
  return data || { logo_url: "" };
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

export default { getSettings, setLogo };