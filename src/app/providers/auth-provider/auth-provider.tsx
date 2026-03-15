import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode, useRef,
} from "react";
import axios from "axios";
import { AuthContext, type AuthStatus } from "@/app/providers/auth-provider/auth-context.ts";
import type { IAdmin, TLoginRequest } from "@/app/api/auth/types.ts";
import { tokenStorage } from "@/app/api/auth/token-storage.ts";
import { queryClient } from "@/app/api/query-client/query-client.ts";
import { refreshAccessToken } from "@/app/api/refresh.manager.ts";
import { getMeApi, loginApi, logoutApi } from "@/app/api/auth/auth.api.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("booting");
  const [accessToken, _setAccessToken] = useState<string | null>(null);
  const [user, _setUser] = useState<IAdmin | null>(null);

  const bootstrappedRef = useRef(false);

  const setAccessToken = useCallback((token: string | null) => {
    _setAccessToken(token);
    tokenStorage.set(token);
  }, []);

  const setUser = useCallback((u: IAdmin | null) => {
    _setUser(u);
  }, []);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    setStatus("anonymous");
    queryClient.clear();
  }, [setAccessToken, setUser]);

  const bootstrap = useCallback(async () => {
    try {
      const token = await refreshAccessToken(setAccessToken);
      if (!token) {
        clearSession();
        return;
      }
      const me = await getMeApi();
      setUser(me);
      setStatus("authenticated");
    } catch {
      clearSession();
    }
  }, [setAccessToken, setUser, clearSession]);

  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;
    void bootstrap();
  }, [bootstrap]);

  const login = useCallback(async (reqBody: TLoginRequest) => {
    const response = await loginApi(reqBody);

    //if backend returned accessToken and user info in login response, use them directly
    if (response?.accessToken) {
      console.log("Login response contained accessToken, using it directly");
      setAccessToken(response.accessToken);

      const me = await getMeApi();

      setUser(me);

      setStatus("authenticated");
      return;
    }

    //if login did not return a token, it means the "cookie + refresh" scheme is in use
    const token = await refreshAccessToken(setAccessToken);
    if (!token) throw new Error("Login succeeded but refresh returned no token");

    const me = await getMeApi();
    setUser(me);
    setStatus("authenticated");
  }, [setAccessToken, setUser]);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 401) {
        throw error;
      }
    }
    finally {
      clearSession();
    }
  }, [clearSession]);

  const isAuthReady = status !== "booting";

  const value = useMemo(
    () => ({
      status,
      isAuthReady,
      accessToken,
      user,
      login,
      logout,
      setAccessToken,
      setUser,
    }),
    [status, isAuthReady, accessToken, user, login, logout, setAccessToken, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
