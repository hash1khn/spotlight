import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";
import type { Database } from "./database.types"; // Import generated types

let supabase: ReturnType<typeof createClient<Database>> | null = null;
let initialized = false;

const seedFilePath = path.join(process.cwd(), "data", "shows.json");

const SUPABASE_URL = "https://uumvgxdzcdynjpgnguzi.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bXZneGR6Y2R5bmpwZ25ndXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQ4MTA1NCwiZXhwIjoyMDc5MDU3MDU0fQ.Cwxbny-ISumDUrZkaBBIBZWg84f6Bt1I1eKxjaYbbOs"; // replace with your Service Role Key

export function getDatabaseClient() {
  if (supabase) return supabase;

  if (!SUPABASE_URL) throw new Error("SUPABASE_URL is missing!");
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing!");

  supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  return supabase;
}

// ... rest of your code