import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom"; 

const clerkPubKey ="pk_test_ZGVzdGluZWQtaGVkZ2Vob2ctMzYuY2xlcmsuYWNjb3VudHMuZGV2JA"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ClerkProvider>
);
