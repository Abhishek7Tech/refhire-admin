"use server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ADMIN_KEY = process.env.SUPABASE_ADMIN_KEY;

export async function createAdminClient() {
  return createClient(SUPABASE_URL!, SUPABASE_ADMIN_KEY!);
}
