import { supabase } from "../config/supabase.js";

const TABLE = "contact_messages";

export async function createContactMessage({
  name,
  email,
  phone,
  projectType,
  budget,
  timeline,
  contactMethod,
  message,
  attachmentName,
}) {
  const { data, error } = await supabase
    .from(TABLE)
  .insert({
  name,
  email,
  phone: phone || null,
  subject: projectType || "General enquiry",
  project_type: projectType || null,
  budget_range: budget || null,
  timeline: timeline || null,
  preferred_contact_method: contactMethod || null,
  message,
  attachment_url: attachmentName || null,
})
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function listContactMessages() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export default {
  createContactMessage,
   listContactMessages,
};
