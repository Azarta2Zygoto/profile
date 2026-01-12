import { NextResponse } from "next/server";

export function proxy() {
    return NextResponse.next();
}

export const config = {
    // Fait correspondre toutes les routes, mais ignore les ressources statiques et les API
    matcher: "/((?!api|trpc|_next|_vercel|public|.*\\..*).*)",
};
