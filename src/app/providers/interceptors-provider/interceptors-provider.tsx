import React, { useEffect, useRef } from "react";
import { useAuth } from "@/app/providers/auth-provider/use-auth.ts";
import { setupInterceptors } from "@/app/api/interceptors.ts";

export function InterceptorsProvider({ children }: { children: React.ReactNode }) {
  const { setAccessToken, logout } = useAuth();

  const setAccessTokenRef = useRef(setAccessToken);
  const logoutRef = useRef(logout);

  useEffect(() => {
    setAccessTokenRef.current = setAccessToken;
    logoutRef.current = logout;
  }, [setAccessToken, logout]);

  useEffect(() => {
    return setupInterceptors(
      (t) => setAccessTokenRef.current(t),
      () => void logoutRef.current(),
    );
  }, []);

  return <>{children}</>;
}
