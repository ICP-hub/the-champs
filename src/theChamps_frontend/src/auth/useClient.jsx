import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../.dfx/local/canisters/theChamps_backend";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      idleTimeout: 1000 * 60 * 30,
      disableDefaultIdleCallback: true,
    },
  },
  // loginOptionsII: {
  //   identityProvider: "https://identity.ic0.app/#authorize",
  // },
  loginOptionsNFID: {
    identityProvider: `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);

  const backendCanisterId = process.env.CANISTER_ID_MERCHSTORE_BACKEND;

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create(options.createOptions);
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();

      // if (principal.toText() === "2vxsx-fae") {
      //   await logout();
      //   return;
      // }

      setIsAuthenticated(isAuthenticated);
      setIdentity(identity);
      setPrincipal(principal);
      if (createActor) {
        const backendActor = createActor(backendCanisterId, {
          agentOptions: { identity, verifyQuerySignatures: false },
        });
        setBackendActor(backendActor);
      }
    };
    initAuthClient();
  }, []);

  const login = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
            false
        ) {
          clientInfo(authClient);
          resolve(authClient);
        } else {
          let opt = "loginOptionsNFID";
          authClient.login({
            ...options[opt],
            onError: (error) => reject(error),
            onSuccess: () => {
              clientInfo(authClient);
              resolve(authClient);
            },
          });
        }
      } catch (error) {
        console.log("error", error);
        reject(error);
      }
    });
  };

  const clientInfo = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();

    // if (principal.toText() === "2vxsx-fae") {
    //   await logout();
    //   return;
    // }

    setAuthClient(client);
    setIsAuthenticated(isAuthenticated);
    setIdentity(identity);
    setPrincipal(principal);

    if (
      createActor &&
      isAuthenticated &&
      identity &&
      principal &&
      !principal.isAnonymous()
    ) {
      const backendActor = createActor(backendCanisterId, {
        agentOptions: { identity, verifyQuerySignatures: false },
      });

      setBackendActor(backendActor);
    }

    return true;
  };

  const logout = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setBackendActor(null);
  };

  return {
    login,
    logout,
    authClient,
    isAuthenticated,
    identity,
    principal,
    backendCanisterId,
    backendActor,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("auth is ", auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
