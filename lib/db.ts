import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";

let supabase: ReturnType<typeof createClient> | null = null;
let initialized = false;

const seedFilePath = path.join(process.cwd(), "data", "shows.json");

// <-- Hardcoded Supabase credentials here
const SUPABASE_URL = "https://uumvgxdzcdynjpgnguzi.supabase.co"; // replace with your Supabase URL
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1bXZneGR6Y2R5bmpwZ25ndXppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQ4MTA1NCwiZXhwIjoyMDc5MDU3MDU0fQ.Cwxbny-ISumDUrZkaBBIBZWg84f6Bt1I1eKxjaYbbOs"; // replace with your Service Role Key

export function getDatabaseClient() {
  if (supabase) return supabase;

  if (!SUPABASE_URL) throw new Error("SUPABASE_URL is missing!");
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing!");

  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  return supabase;
}

export async function ensureDatabase() {
  if (initialized) return;

  const db = getDatabaseClient();

  // Seed if empty
  const { data: existing, error } = await db.from("shows").select("id", { count: "exact" });

  if (error) {
    console.warn("Error reading shows table:", error);
  } else if ((existing?.length ?? 0) === 0) {
    try {
      const seedData = await fs.readFile(seedFilePath, "utf8");
      const shows = JSON.parse(seedData);
      await db.from("shows").insert(shows);
      console.log("Seeded shows table successfully!");
    } catch (err) {
      console.warn("Error inserting seed data:", err);
    }
  }

  initialized = true;
}
