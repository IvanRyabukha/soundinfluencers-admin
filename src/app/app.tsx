import { RouterProvider } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ToastContainer } from "react-toastify";
import { ROUTER } from "@/app/providers/router/router.tsx";

import styles from './app.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <ToastContainer />

      <NuqsAdapter>
        <RouterProvider router={ROUTER} />
      </NuqsAdapter>
    </div>
  );
};
