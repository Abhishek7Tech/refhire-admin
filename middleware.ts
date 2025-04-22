import { type NextRequest } from "next/server";
import { updateSession } from "@/app/utils/supabase/middleware";
import allowToVerify from "./app/verify/middleware";
import allowToLogin from "./app/home/middleware";
import allowToSignIn from "./app/utils/middlewares/signIn/middleware";
export default async function middleWare(request: NextRequest) {
  if (request.url.includes("/home")) {
    return await allowToLogin(request);
  }

  if (request.url.includes("/")) {
    return await allowToSignIn(request);
  }

  if (request.url.includes("/verify")) {
    return await allowToVerify(request);
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/home/:path*",
    "/verify/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
