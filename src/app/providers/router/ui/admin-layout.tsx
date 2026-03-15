import { AppHeader } from "@/widgets/app-header";
import { Container } from "@/shared/ui";
import { Outlet } from "react-router-dom";
import { LogoutButton } from "@/features/logout";

export const AdminLayout = () => {
  return (
    <>
      <AppHeader rightSlot={<LogoutButton />}/>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
