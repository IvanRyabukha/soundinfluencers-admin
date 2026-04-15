import { useMemo, useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);

  return useSyncExternalStore(
    (callback) => {
      mediaQuery.addEventListener("change", callback);

      return () => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    () => mediaQuery.matches,
    () => false,
  );
};
