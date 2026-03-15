import { useAuth } from "@/app/providers/auth-provider/use-auth.ts";
import { Navigate } from "react-router-dom";

export function RootRedirect() {
  const {isAuthReady, user, status} = useAuth();
  console.log("RootRedirect", {isAuthReady, user, status});

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  if (status !== "authenticated" || !user) {
    console.log("User is not authenticated, redirecting to login page");
    return <Navigate to="/login" replace />;
  }

  console.log("User is authenticated, redirecting based on role", {role: user.role});
  if (user) return <Navigate to="/dashboard" replace />;

  return <Navigate to="/login" replace />;
}
