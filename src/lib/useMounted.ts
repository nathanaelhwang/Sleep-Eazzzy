import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * False during SSR and hydration, true afterwards. Use it to show
 * device-local state (saved progress) without a hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
