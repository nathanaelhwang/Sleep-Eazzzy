import { clerkMiddleware } from '@clerk/nextjs/server';
import { isAuthEnabled } from '@/lib/auth/config';

/**
 * Next.js 16 proxy (formerly `middleware.ts`). When auth env vars are
 * configured, delegate to Clerk's middleware so server components and API
 * routes can read `auth()`. When not configured, this is a no-op — the site
 * continues to function without auth.
 */
const proxy = isAuthEnabled ? clerkMiddleware() : () => undefined;
export default proxy;

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files.
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
