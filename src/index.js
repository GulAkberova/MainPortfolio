import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TableProvider } from "./components/TableContext";
import App from "./App";
import "./i18n";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
          <TableProvider>
            <App />
          </TableProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
