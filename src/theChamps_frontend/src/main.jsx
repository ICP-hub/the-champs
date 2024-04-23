import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { defaultProviders } from "@connect2ic/core/providers";

import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import * as backend from "../../../.dfx/local/canisters/theChamps_backend/";

import { PlugWallet, StoicWallet } from "@connect2ic/core/providers";

import "@connect2ic/core/style.css";
import { Toaster } from "react-hot-toast";

const client = createClient({
  canisters: { backend },
  providers: [new PlugWallet()],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Connect2ICProvider client={client}>
      <App />
      <Toaster
        position="top-center"
        containerClassName="mt-6"
        reverseOrder={true}
      />
    </Connect2ICProvider>
  </React.StrictMode>
);
