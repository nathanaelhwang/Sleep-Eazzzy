/**
 * Whether authentication is configured for this deployment.
 *
 * We check the *required* env vars for both Clerk (auth provider) and Supabase
 * (where user profiles + progress are stored). If any are missing, the site
 * gracefully degrades to its pre-M4 state: no sign-in button, no cross-device
 * sync, progress stays in localStorage on whatever device it was saved on.
 *
 * NEXT_PUBLIC_* vars are baked into the client bundle at build time, so this
 * constant resolves identically on server and client.
 */
export const isAuthEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
