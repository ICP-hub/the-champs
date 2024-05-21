import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { InternetIdentity, defaultProviders } from "@connect2ic/core/providers";

import { createClient } from "@connect2ic/core";
import { Connect2ICProvider } from "@connect2ic/react";
import * as backend from "../../../.dfx/local/canisters/theChamps_backend/";
// import * as nft from "../../../.dfx/local/canisters/theChamps_nft";

import { PlugWallet, StoicWallet } from "@connect2ic/core/providers";

import "@connect2ic/core/style.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../../redux/store/store";

const client = createClient({
  canisters: { backend },
  //providers: [new PlugWallet(), new InternetIdentity()],
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Connect2ICProvider client={client}>
        <App />
        <Toaster
          position="top-center"
          containerClassName="mt-6"
          reverseOrder={true}
        />
      </Connect2ICProvider>
    </Provider>
  </React.StrictMode>
);
