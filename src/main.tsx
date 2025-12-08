import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import store from "./modules/store";
import "./styles/normalized.css";
import "./styles/variables.css";
import "./styles/layout.css";
import { registerSW } from "virtual:pwa-register";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  registerSW();
}
