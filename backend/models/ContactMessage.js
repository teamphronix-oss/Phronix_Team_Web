import { supabase } from "../config/supabase.js";

const TABLE = "contact_messages";

export async function createContactMessage({ name, email, phone, subject, message }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name, email, phone, subject, message })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export default { createContactMessage };