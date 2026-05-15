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
          accessToken: async () => (await getToken()) ?? null,
          auth: { persistSession: false },
        }
      ),
    [getToken]
  );
}
