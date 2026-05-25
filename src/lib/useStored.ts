'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';

const STORAGE_PREFIX = 'se_';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const v = window.localStorage.getItem(STORAGE_PREFIX + key);
      return v == null ? fallback : (JSON.parse(v) as T);
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, val: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
    } catch {
      /* quota exceeded or storage disabled — silently drop */
    }
  },
};

// Per-key revision counter used to nudge useSyncExternalStore subscribers on
// same-tab writes (the native `storage` event only fires for *other* tabs).
const listeners = new Map<string, Set<() => void>>();
function notify(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

export function useStored<T>(
  key: string,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void] {
  // Stable refs so the snapshot getter can return the same reference between
  // reads when the underlying value hasn't changed (required by uSES).
  const snapshotRef = useRef<{ raw: string | null; parsed: T }>({
    raw: null,
    parsed: initial,
  });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_PREFIX + key) onStoreChange();
      };
      window.addEventListener('storage', onStorage);
      const set = listeners.get(key) ?? new Set();
      set.add(onStoreChange);
      listeners.set(key, set);
      return () => {
        window.removeEventListener('storage', onStorage);
        set.delete(onStoreChange);
      };
    },
    [key],
  );

  const getSnapshot = useCallback((): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    } catch {
      raw = null;
    }
    const cache = snapshotRef.current;
    if (raw === cache.raw) return cache.parsed;
    let parsed: T;
    try {
      parsed = raw == null ? initial : (JSON.parse(raw) as T);
    } catch {
      parsed = initial;
    }
    snapshotRef.current = { raw, parsed };
    return parsed;
  }, [key, initial]);

  const getServerSnapshot = useCallback((): T => initial, [initial]);

  const val = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setVal = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = storage.get(key, initial);
      const resolved =
        typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      storage.set(key, resolved);
      notify(key);
    },
    [key, initial],
  );

  return [val, setVal];
}
