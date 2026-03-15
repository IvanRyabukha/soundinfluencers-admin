import axios, { AxiosError } from "axios";

export type ApiErrorKind =
  | "network"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "rate_limit"
  | "server"
  | "unknown";

export type NormalizedApiError = {
  kind: ApiErrorKind;
  status?: number;
  message: string;
  raw: unknown;
  url?: string;
};

type ApiErrorResponse = { error?: string; message?: string };

function fallbackByStatus(status?: number): string {
  switch (status) {
    case 400: return "Bad request. Please check your input.";
    case 401: return "Unauthorized. Please login again.";
    case 403: return "You don't have permission for this action.";
    case 404: return "Resource not found.";
    case 409: return "Conflict detected. Please try again.";
    case 422: return "Validation error. Please check your input.";
    case 429: return "Too many requests. Please wait and try again later.";
    case 500: return "Server error. Please try again later.";
    case 503: return "Service unavailable. Please try again later.";
    default: return "An unexpected error occurred. Please try again later.";
  }
}

function kindByStatus(status?: number): ApiErrorKind {
  if (!status) return "unknown";
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 422) return "validation";
  if (status === 429) return "rate_limit";
  if (status >= 500) return "server";
  return "unknown";
}

export function normalizeApiError(err: unknown): NormalizedApiError {
  if (!axios.isAxiosError(err)) {
    const msg = err instanceof Error ? err.message : fallbackByStatus();
    return { kind: "unknown", message: msg, raw: err };
  }

  const ax = err as AxiosError;
  const status = ax.response?.status;
  const url = ax.config?.url;

  // network/CORS/DNS: no response
  if (!ax.response) {
    return {
      kind: "network",
      message: "Network error. Check your connection and try again.",
      raw: err,
      url,
    };
  }

  const data = ax.response?.data as ApiErrorResponse | undefined;
  const message = data?.message || data?.error || fallbackByStatus(status);

  return {
    kind: kindByStatus(status),
    status,
    message,
    raw: err,
    url,
  };
}
