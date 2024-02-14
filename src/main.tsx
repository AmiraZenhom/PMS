import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DndProvider>
    </React.StrictMode>
  </>
);
