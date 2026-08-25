import { supabase } from "../config/supabase.js";

// Shared CRUD for the simple "admin-managed content list" tables (services,
// testimonials, careers, youtube_videos, ongoing_projects, why_features,
// clients). Each of these follows the same shape: order + is_published +
// created_at/updated_at, so the query logic doesn't need repeating per file.
// Resource-specific field handling (arrays, image fields) lives in the route
// layer, not here — this module only talks to Supabase.
export function makeModel(table, { orderColumn = "order", hasPublish = true } = {}) {
  return {
    async list({ onlyPublished = false } = {}) {
      let query = supabase
        .from(table)
        .select("*")
        .order(orderColumn, { ascending: true })
        .order("created_at", { ascending: false });
      if (hasPublish && onlyPublished) query = query.eq("is_published", true);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    async getById(id) {
      const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },

    async create(row) {
      const { data, error } = await supabase.from(table).insert(row).select().single();
      if (error) throw error;
      return data;
    },

    async update(id, row) {
      const { data, error } = await supabase.from(table).update(row).eq("id", id).select().maybeSingle();
      if (error) throw error;
      return data;
    },

    async remove(id) {
      const { data, error } = await supabase.from(table).delete().eq("id", id).select().maybeSingle();
      if (error) throw error;
      return data;
    },
  };
}

export default { makeModel };
