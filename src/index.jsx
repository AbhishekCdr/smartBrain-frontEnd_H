import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { GeneralProvider } from "./contexts/generalContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeneralProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeneralProvider>
  </React.StrictMode>
);
