import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "@/app/providers/app-providers/app-providers.tsx";
import { App } from "./app.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
