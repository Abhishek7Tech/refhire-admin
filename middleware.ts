import { type NextRequest } from "next/server";
import { updateSession } from "@/app/utils/supabase/middleware";
import allowToLogin from "./app/utils/middlewares/signIm/middleware";

export default async function middleWare(request: NextRequest) {
  if (request.url.includes("/") || request.url.includes("/verify")) {
    return await allowToLogin(request);
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
    "/verify/:path*",
    "/signIn/:path*",
    "/hire/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
