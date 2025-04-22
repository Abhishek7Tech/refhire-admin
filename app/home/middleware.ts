import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../utils/supabase/server";

export default async function allowToLogin(request: NextRequest) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userEmail = await session.data.user?.email;

  const { data } = await supabase
    .from("admins")
    .select("email")
    .eq("email", userEmail);

  if (!userEmail || data === null || data.length === 0) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
