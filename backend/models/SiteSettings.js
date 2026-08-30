import { supabase } from "../config/supabase.js";

const TABLE = "site_settings";


// ─────────────────────────────────────────────
// GET SETTINGS
// ─────────────────────────────────────────────

export async function getSettings() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("key", "main")
    .maybeSingle();

  if (error) throw error;

  return data || { key: "main", logo_url: "" };
}


// ─────────────────────────────────────────────
// SET LOGO
// ─────────────────────────────────────────────

export async function setLogo(logoUrl) {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      {
        key: "main",
        logo_url: logoUrl,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "key",
      }
    )
    .select()
    .single();

  if (error) throw error;

  return data;
}


// ─────────────────────────────────────────────
// UPDATE SETTINGS
// ─────────────────────────────────────────────

export async function updateSettings(data) {
  const updates = {
    key: "main",
    updated_at: new Date().toISOString(),
  };

  // General website settings
  if (data.projects_stat !== undefined) {
    updates.projects_stat = data.projects_stat;
  }

  if (data.projects_title !== undefined) {
    updates.projects_title = data.projects_title;
  }

  if (data.projects_description !== undefined) {
    updates.projects_description = data.projects_description;
  }

  if (data.why_title !== undefined) {
    updates.why_title = data.why_title;
  }

  if (data.why_description !== undefined) {
    updates.why_description = data.why_description;
  }

  // Contact details
  if (data.email !== undefined) {
    updates.email = data.email;
  }

  if (data.phone !== undefined) {
    updates.phone = data.phone;
  }

  if (data.address_line1 !== undefined) {
    updates.address_line1 = data.address_line1;
  }

  if (data.address_line2 !== undefined) {
    updates.address_line2 = data.address_line2;
  }

  if (data.gst_number !== undefined) {
    updates.gst_number = data.gst_number;
  }

  // Logo public ID
  if (data.logo_public_id !== undefined) {
    updates.logo_public_id = data.logo_public_id;
  }

  const { data: row, error } = await supabase
    .from(TABLE)
    .upsert(updates, {
      onConflict: "key",
    })
    .select()
    .single();

  if (error) throw error;

  return row;
}


export default {
  getSettings,
  setLogo,
  updateSettings,
};