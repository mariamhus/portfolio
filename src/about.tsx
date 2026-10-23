import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AboutPage from "./AboutPage";
import { finishLoading } from "./lib/loader";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
);

finishLoading();
