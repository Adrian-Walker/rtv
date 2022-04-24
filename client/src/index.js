import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import IssueProvider from "./context/IssueProvider.js";
import UserProvider from "./context/UserProvider.js";
import "./index.css";

ReactDOM.render(
  <IssueProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </IssueProvider>,
  document.getElementById("root")
);
