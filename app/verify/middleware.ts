import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../utils/supabase/server";


export default async function allowToVerify(request: NextRequest) {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userId = await session.data.user?.id;
  if (userId) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}