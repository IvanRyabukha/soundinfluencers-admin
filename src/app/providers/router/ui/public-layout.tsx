import { Outlet } from "react-router-dom";
import { Container } from "@/shared/ui/container/container.tsx";
import { AppHeader } from "@/widgets/app-header";

export const PublicLayout = () => {
  return (
    <>
      <AppHeader />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}
