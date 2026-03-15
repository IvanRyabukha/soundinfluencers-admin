import type { AxiosError, AxiosRequestHeaders } from "axios";
import { $api } from "./http";
import { notifyApiError } from "./errors/notify";
import { tokenStorage } from "@/app/api/auth/token-storage.ts";
import type { RetriableRequestConfig } from "@/app/api/types.ts";
import { refreshAccessToken } from "@/app/api/refresh.manager.ts";

type Options = {
  notify?: boolean;
};

export function setupInterceptors(
  setAccessToken: (token: string | null) => void,
  logout: () => void,
  options: Options = { notify: true },
) {
  const isAuthRoute = (url?: string) => {
    if (!url) return false;
    return (
      url.includes("/auth/login") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout")
    );
  };

  const reqId = $api.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const resId = $api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const config = error.config as RetriableRequestConfig | undefined;

      // network
      if (!error.response) {
        if (options.notify) notifyApiError(error);
        return Promise.reject(error);
      }

      // no config
      if (!config) {
        if (options.notify) notifyApiError(error);
        return Promise.reject(error);
      }

      // do not refresh on auth routes
      if (isAuthRoute(config.url)) {
        if (options.notify) {
          notifyApiError(error, {
            ignore: (n) => n.kind === "unauthorized",
          });
        }
        return Promise.reject(error);
      }

      const isUnauthorized = error.response.status === 401;
      if (!isUnauthorized || config._retry) {
        if (options.notify) {
          notifyApiError(error, { ignore: (n) => n.kind === "unauthorized" });
        }
        return Promise.reject(error);
      }

      config._retry = true;

      try {
        const token = await refreshAccessToken(setAccessToken);
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        return $api.request(config);
      } catch (refreshErr) {
        // refresh failed
        logout();
        if (options.notify) {
          notifyApiError(refreshErr, { ignore: () => true });
          //or show toast.info("Session expired. Please login again.")
        }
        return Promise.reject(refreshErr);
      }
    },
  );

  return () => {
    $api.interceptors.request.eject(reqId);
    $api.interceptors.response.eject(resId);
  };
}
