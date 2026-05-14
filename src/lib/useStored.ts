'use client';

import { useEffect, useState } from 'react';

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

export function useStored<T>(
  key: string,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => storage.get(key, initial));
  useEffect(() => {
    storage.set(key, val);
  }, [key, val]);
  return [val, setVal];
}
