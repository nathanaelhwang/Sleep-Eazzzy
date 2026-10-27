'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useMounted } from '@/lib/useMounted';
import { useProgress, type Progress } from '@/lib/useProgress';

type Ctx = { progress: Progress; setComplete: (id: number, done: boolean) => void };

const ModuleProgressContext = createContext<Ctx | null>(null);

/**
 * One progress source per module page, so the progress strip and the
 * "mark complete" button stay in sync (the signed-in hook keeps its own state
 * per caller). Progress reads as empty until mount to avoid a hydration mismatch.
 */
export function ModuleProgressProvider({ children }: { children: ReactNode }) {
  const { progress, setComplete } = useProgress();
  const mounted = useMounted();
  return (
    <ModuleProgressContext.Provider value={{ progress: mounted ? progress : {}, setComplete }}>
      {children}
    </ModuleProgressContext.Provider>
  );
}

export function useModuleProgress(): Ctx {
  const ctx = useContext(ModuleProgressContext);
  if (!ctx) throw new Error('Missing <ModuleProgressProvider>');
  return ctx;
}
