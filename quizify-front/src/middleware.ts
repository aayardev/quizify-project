export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/u/:path*", "/quiz/:slug/play", "/quiz"],
};
