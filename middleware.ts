import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/how-it-works", 
    "/pricing",
    "/api/generations(.*)",
    "/api/stripe/webhook",
  ],
  ignoredRoutes: ["/api/generations(.*)", "/api/stripe/webhook"],
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
