import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Suppress error if keys are missing - will fall back to mock data gracefully
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getStorageUrl(bucket: string, path: string): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
