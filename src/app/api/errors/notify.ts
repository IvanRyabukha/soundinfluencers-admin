import { toast } from "react-toastify";
import { normalizeApiError, type NormalizedApiError } from "./normalize";

type NotifyOptions = {
  ignore?: (n: NormalizedApiError) => boolean;
};

export function notifyApiError(err: unknown, options: NotifyOptions = {}) {
  const n = normalizeApiError(err);
  if (options.ignore?.(n)) return;
  toast.error(n.message, { autoClose: 5000, position: "bottom-center" });
}
