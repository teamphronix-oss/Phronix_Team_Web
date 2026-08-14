import { createClient } from "@supabase/supabase-js";
import ws from "ws";

// Node 20 doesn't have a native WebSocket global (that lands in Node 22+),
// and supabase-js's realtime client needs one even though we never use
// realtime subscriptions here. This polyfills it so createClient() below
// doesn't crash on startup.
if (!globalThis.WebSocket) {
  globalThis.WebSocket = ws;
}

// Server-side only. Uses the SERVICE ROLE key (never expose this key to the
// frontend / browser — it bypasses Row Level Security). The Express API is
// the only thing that talks to Supabase; the React app talks to Express.
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing — check your .env file."
  );
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export default supabase;