import { useCallback } from "react";

export const useCopyToClipboard = () => {
  return useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);
};
