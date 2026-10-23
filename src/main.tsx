import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { finishLoading } from "./lib/loader";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

finishLoading();
