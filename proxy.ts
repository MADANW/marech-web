import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Must mirror `isMock` in lib/api.ts: mock mode is opt-in via NEXT_PUBLIC_MOCK="true".
const isMock = process.env.NEXT_PUBLIC_MOCK === "true";

export function proxy(req: NextRequest) {
  if (isMock) return NextResponse.next();

  const token = req.cookies.get("marech_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/logs/:path*", "/policies/:path*", "/snippet/:path*", "/account/:path*", "/billing/:path*"],
};
