import { supabase } from "../config/supabase.js";

export async function createProjectRequest(data) {
  const { data: request, error } = await supabase
    .from("project_requests")
    .insert([
      {
        name: data.name,
        email: data.email,
        role: data.role,
        company_name: data.companyName,
        project_type: data.projectType,
        venture_stage: data.ventureStage,
        selected_date: data.selectedDate,
        selected_time: data.selectedTime,

        google_event_id: data.googleEventId || null,
        google_meet_url: data.googleMeetUrl || null,
        status: data.status || "scheduled",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return request;
}
export async function listProjectRequests() {
  const { data: requests, error } = await supabase
    .from("project_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return requests;
}

export async function updateProjectRequest(id, data) {
  const updates = {
    updated_at: new Date().toISOString(),
  };

  if (data.status !== undefined) {
    updates.status = data.status;
  }

  if (data.selectedDate !== undefined) {
    updates.selected_date = data.selectedDate;
  }

  if (data.selectedTime !== undefined) {
    updates.selected_time = data.selectedTime;
  }

  if (data.adminNote !== undefined) {
    updates.admin_note = data.adminNote;
  }

  if (data.googleEventId !== undefined) {
    updates.google_event_id = data.googleEventId;
  }

  if (data.googleMeetUrl !== undefined) {
    updates.google_meet_url = data.googleMeetUrl;
  }

  const { data: request, error } = await supabase
    .from("project_requests")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return request;
}
export async function deleteProjectRequest(id) {
  const { data: request, error } = await supabase
    .from("project_requests")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return request;
}
export async function deleteAllProjectRequests() {
  const { error } = await supabase
    .from("project_requests")
    .delete()
    .not("id", "is", null);

  if (error) throw error;
}