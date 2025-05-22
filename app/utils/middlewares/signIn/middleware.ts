import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../supabase/server";
import { stat } from "fs";

export default async function allowToSignIn(request: NextRequest) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userEmail = await session.data.user?.email;
  const { data, status, error } = await supabase.
  rpc("validate_admin", { p_email: userEmail });
console.log("userEmail", data, status, error);
  if (userEmail && data && status === 200) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}
