import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DataProvider } from "./context/DataContext";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { EditProvider } from "./context/EditContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <DataProvider>
      <ThemeProvider>
        <EditProvider>
          <App />
        </EditProvider>
      </ThemeProvider>
    </DataProvider>
  </HashRouter>
);
