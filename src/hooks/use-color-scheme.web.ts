import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const emptySubscribe = () => () => {};

/**
 * Modern SSR-safe hook using useSyncExternalStore to avoid hydration mismatches
 * without cascading effect re-renders.
 */
export function useColorScheme() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const colorScheme = useRNColorScheme();
  return isClient ? colorScheme : 'light';
}
