import { createContext } from "react";
import type { IAdmin, TLoginRequest } from "@/app/api/auth/types.ts";

export type AuthStatus = "booting" | "authenticated" | "anonymous";

export type AuthContextType = {
  status: AuthStatus;
  isAuthReady: boolean;

  accessToken: string | null;
  user: IAdmin | null;

  login: (input: TLoginRequest) => Promise<void>;
  logout: () => Promise<void>;

  setAccessToken: (token: string | null) => void;
  setUser: (user: IAdmin | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
