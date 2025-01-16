export { default } from "next-auth/middleware"
export const config = {
  matcher: [
    "/:path*",
    // Add other protected routes
  ]
}