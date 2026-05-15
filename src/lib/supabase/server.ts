import { auth } from '@clerk/nextjs/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client that authenticates as the current Clerk user.
 *
 * Uses Supabase's `accessToken` callback pattern (added in supabase-js v2.45)
 * which works with Supabase's "Third-party Authentication" provider for Clerk:
 * the callback runs on every request and returns Clerk's session JWT, which
 * Supabase verifies against Clerk's JWKS. Row-Level Security policies in the
 * migration file check `auth.jwt() ->> 'sub'` against the user_id column.
 *
 * Throws if Supabase env vars are missing — callers should check `isAuthEnabled`
 * before invoking.
 */
export function createSupabaseServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase env vars are not set');
  }
  return createClient(url, anonKey, {
    accessToken: async () => {
      const session = await auth();
      return (await session.getToken()) ?? null;
    },
    auth: { persistSession: false },
  });
}

/**
 * Admin-privileged Supabase client (uses the service-role key). Bypasses RLS —
 * use sparingly, only in server-side code that must write across users
 * (e.g. the /api/users/sync route that runs on first sign-in).
 */
export function createSupabaseAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
