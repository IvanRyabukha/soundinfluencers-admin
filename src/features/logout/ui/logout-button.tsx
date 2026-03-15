import { useAuth } from "@/app/providers/auth-provider/use-auth.ts";
import { Button } from "@/shared/ui";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button
      variant={'primary'}
      size={'small'}
      onClick={logout}
    >
      Logout
    </Button>
  );
};
