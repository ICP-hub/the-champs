import React, { createContext, useContext, useEffect, useState } from "react";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
import { createActor } from "../../../../.dfx/local/canisters/theChamps_backend";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

const AuthContext = createContext();

const canisterID = process.env.CANISTER_ID_THECHAMPS_BACKEND;
const whitelist = [process.env.CANISTER_ID_THECHAMPS_BACKEND];

export const useAuthClient = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(createActor(canisterID));
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const initializeAuthClient = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        // const actor = createActor(canisterID, { agentOptions: { identity } });

        setIsAuthenticated(true);
        setPrincipal(principal);
        setIdentity(identity);
      }
    };

    initializeAuthClient();
  }, []);

  const login = async (provider) => {
    if (authClient) {
      let userObject = {
        principal: "Not Connected.",
        agent: undefined,
        provider: "N/A",
      };
      if (provider === "Plug") {
        userObject = await PlugLogin(whitelist);
      } else if (provider === "Stoic") {
        userObject = await StoicLogin();
      } else if (provider === "NFID") {
        userObject = await NFIDLogin();
      } else if (provider === "Identity") {
        userObject = await IdentityLogin();
      }

      const identity = userObject.agent;
      const principal = Principal.fromText(userObject.principal);
      // const actor = createActor(canisterID, { agentOptions: { identity } });

      setIsAuthenticated(true);
      setPrincipal(principal);
      setIdentity(identity);

      await authClient.login({
        identity,
        onSuccess: () => {
          setIsAuthenticated(true);
          setPrincipal(principal);
          setIdentity(identity);
        },
      });
    }
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setIdentity(null);
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    principal,
    backendActor,
    identity,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
