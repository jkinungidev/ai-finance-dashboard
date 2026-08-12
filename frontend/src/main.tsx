import { StrictMode } from "react"; // wraps the app into a dev only safety net to catch bugs early
import { createRoot } from "react-dom/client"; // modern function to tell react where to inject the app on the webpage
import "./index.css"; // imports the apps' base styling
import App from "./App.tsx"; // brings in the main app component itself

// This takes the empty placeholder box in the html page and tells react to build the app in that box
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
