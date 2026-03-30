import { useAuth } from "@/app/providers/auth-provider/use-auth.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedOnly() {
  const { status, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function PublicOnly() {
  const { status, isAuthReady, user } = useAuth();

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    if (user) return <Navigate to="/dashboard" replace />;

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
