'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { isAuthEnabled } from './auth/config';
import { useSupabase } from './supabase/client';
import { storage, useStored } from './useStored';

export type Progress = Record<number, boolean>;

export type UseProgressReturn = {
  progress: Progress;
  setComplete: (moduleId: number, done: boolean) => void;
  /** False until the initial Supabase fetch resolves (true immediately when local-only). */
  isLoaded: boolean;
};

/* ------------------------------------------------------------------ *
 * Local-only fallback — used when auth env vars aren't configured.   *
 * Behaves like the original useStored('progress', {}) hook.          *
 * ------------------------------------------------------------------ */
function useProgressLocal(): UseProgressReturn {
  const [progress, setProgress] = useStored<Progress>('progress', {});
  return {
    progress,
    setComplete: (moduleId, done) => setProgress({ ...progress, [moduleId]: done }),
    isLoaded: true,
  };
}

/* ------------------------------------------------------------------ *
 * Auth-aware version — reads from Supabase when signed in, writes    *
 * through to both Supabase and localStorage. On first sign-in, if    *
 * the user has local progress and Supabase is empty, the local data  *
 * is uploaded once.                                                  *
 * ------------------------------------------------------------------ */
function useProgressSync(): UseProgressReturn {
  const { isLoaded: authLoaded, isSignedIn, user } = useUser();
  const supabase = useSupabase();
  const userId = user?.id ?? null;

  const [progress, setProgress] = useState<Progress>(() => storage.get('progress', {}));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!authLoaded) return;

    // Signed out — fall back to localStorage and we're done.
    if (!isSignedIn || !userId) {
      setProgress(storage.get('progress', {}));
      setIsLoaded(true);
      return;
    }

    let cancelled = false;
    (async () => {
      // RLS scopes the select to the current user automatically.
      const { data, error } = await supabase
        .from('progress')
        .select('module_id, completed');

      if (cancelled) return;

      if (error) {
        console.warn('[useProgress] Supabase fetch failed:', error);
        setIsLoaded(true);
        return;
      }

      const remote: Progress = {};
      for (const row of data ?? []) {
        if (row.completed) remote[row.module_id as number] = true;
      }
      const remoteHas = Object.keys(remote).length > 0;

      // Local-import path: first sign-in with prior local progress.
      // Only fires when the cloud table is empty for this user.
      const local = storage.get<Progress>('progress', {});
      const localHas = Object.values(local).some(Boolean);

      if (!remoteHas && localHas) {
        const rows = Object.entries(local)
          .filter(([, done]) => done)
          .map(([modId, done]) => ({
            user_id: userId,
            module_id: Number(modId),
            completed: !!done,
          }));
        if (rows.length) {
          const { error: importErr } = await supabase
            .from('progress')
            .upsert(rows, { onConflict: 'user_id,module_id' });
          if (importErr) {
            console.warn('[useProgress] local-progress import failed:', importErr);
          }
        }
        if (!cancelled) {
          setProgress(local);
          setIsLoaded(true);
        }
        return;
      }

      // Normal path: cloud is the source of truth; mirror to local cache.
      if (!cancelled) {
        setProgress(remote);
        storage.set('progress', remote);
        setIsLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoaded, isSignedIn, userId, supabase]);

  const setComplete = (moduleId: number, done: boolean) => {
    // Optimistic local update — re-render happens immediately.
    setProgress((prev) => {
      const next = { ...prev, [moduleId]: done };
      storage.set('progress', next);
      return next;
    });

    // Best-effort cloud write (no await — fire-and-forget).
    if (isSignedIn && userId) {
      void supabase
        .from('progress')
        .upsert(
          {
            user_id: userId,
            module_id: moduleId,
            completed: done,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,module_id' }
        )
        .then(({ error }) => {
          if (error) console.warn('[useProgress] write failed:', error);
        });
    }
  };

  return { progress, setComplete, isLoaded };
}

/**
 * Module-load dispatch: pick the right implementation once based on whether
 * auth env vars are present. Avoids the "rules of hooks" trap because each
 * branch is consistent across renders.
 */
export const useProgress: () => UseProgressReturn = isAuthEnabled
  ? useProgressSync
  : useProgressLocal;
