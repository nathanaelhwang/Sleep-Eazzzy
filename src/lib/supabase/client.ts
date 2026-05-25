'use client';

import { useAuth } from '@clerk/nextjs';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

/**
 * Browser-side Supabase client that authenticates as the current Clerk user.
 *
 * The `accessToken` callback runs on every request and pulls the current
 * Clerk session JWT. Memoized so we don't churn clients on re-renders.
 * Callers should be inside a Clerk-enabled tree — i.e. signed-in or
 * signed-out within a `<ClerkProvider>` ancestor.
 */
export function useSupabase(): SupabaseClient {
  const { getToken } = useAuth();
  return useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          accessToken: async () => {
            // Skip on the server: Clerk's getToken() only works in the browser,
            // and the only caller that fires SSR-side is Supabase Realtime's
            // eager initial-token fetch — we don't use Realtime here.
            if (typeof window === 'undefined') return null;
            return (await getToken()) ?? null;
          },
          auth: { persistSession: false },
        }
      ),
    [getToken]
  );
}
