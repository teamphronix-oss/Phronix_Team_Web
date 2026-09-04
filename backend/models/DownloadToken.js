import { supabase } from "../config/supabase.js";

const TABLE = "download_tokens";

// project_type -> which FK column on download_tokens holds the project id.
// Kept in one place so the "client" / "student" polymorphic FK pattern
// isn't hand-rolled again in every caller.
const PROJECT_COLUMN = {
  client: "client_project_id",
  student: "student_project_id",
};

export function projectColumnFor(projectType) {
  const col = PROJECT_COLUMN[projectType];
  if (!col) throw new Error(`Unknown project type "${projectType}".`);
  return col;
}

// Stores a new token row. Only the hash is ever written here — the raw
// token never touches the database, only the activation email.
export async function insertToken({ projectType, projectId, userId, email, tokenHash, expiresAt }) {
  const row = {
    project_type: projectType,
    user_id: userId || null,
    email,
    token_hash: tokenHash,
    status: "active",
    expires_at: expiresAt,
    [projectColumnFor(projectType)]: projectId,
  };
  const { data, error } = await supabase.from(TABLE).insert(row).select().single();
  if (error) throw error;
  return data;
}

// Non-consuming lookup — used to check a token's state (active / used /
// expired / not found) without changing anything, e.g. when the activation
// page loads and needs to decide whether to show the Download button.
export async function findByHash(tokenHash) {
  const { data, error } = await supabase.from(TABLE).select("*").eq("token_hash", tokenHash).maybeSingle();
  if (error) throw error;
  return data;
}

// The core of one-time enforcement: a single conditional UPDATE.
//   UPDATE download_tokens
//   SET status = 'used', used_at = now()
//   WHERE token_hash = ? AND status = 'active' AND expires_at > now()
//   RETURNING *
// Postgres takes a row lock for the duration of this UPDATE, so if two
// requests race on the same token, the second one's WHERE clause is
// re-evaluated after the first commits — by then status is already 'used',
// so it matches zero rows. Only the request that actually flips the row
// gets a result back.
export async function atomicConsume(tokenHash) {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ status: "used", used_at: nowIso })
    .eq("token_hash", tokenHash)
    .eq("status", "active")
    .gt("expires_at", nowIso)
    .select();
  if (error) throw error;
  return data && data.length === 1 ? data[0] : null;
}

export default { insertToken, findByHash, atomicConsume, projectColumnFor };
