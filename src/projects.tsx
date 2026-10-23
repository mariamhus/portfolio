import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProjectsPage from "./ProjectsPage";
import { finishLoading } from "./lib/loader";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectsPage />
  </StrictMode>,
);

finishLoading();
