import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContactPage from "./ContactPage";
import { finishLoading } from "./lib/loader";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>,
);

finishLoading();
