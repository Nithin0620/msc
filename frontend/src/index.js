import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom"; 
import { Toaster } from "react-hot-toast";

const clerkPubKey ="pk_test_ZGVjZW50LW9zdHJpY2gtODEuY2xlcmsuYWNjb3VudHMuZGV2JA"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <React.StrictMode>
        <Toaster/>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ClerkProvider>
);
