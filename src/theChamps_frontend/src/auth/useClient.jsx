import React, { createContext, useContext, useEffect, useState } from "react";
import { createActor } from "../../../../.dfx/local/canisters/theChamps_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

// Create a utility function to initialize the backendActor
const initBackendActor = (identity) => {
  const agentOptions = identity
    ? { identity, verifyQuerySignatures: false }
    : { verifyQuerySignatures: false };

  const agent = new HttpAgent(agentOptions);

  // You can specify your canister ID here directly
  const backendCanisterId =
    process.env.CANISTER_ID_THECHAMPS_BACKEND ||
    process.env.CANISTER_ID_THECHAMPS_BACKEND;

  return createActor(backendCanisterId, {
    agentOptions: agentOptions,
  });
};

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      idleTimeout: 1000 * 60 * 30, // set to 30 minutes
      disableDefaultIdleCallback: true, // disable the default reload behavior
    },
  },
  loginOptionsII: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
  },
  loginOptionsNFID: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
        : `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);

  const backendCanisterId =
    process.env.CANISTER_ID_THECHAMPS_BACKEND ||
    process.env.CANISTER_ID_THECHAMPS_BACKEND;

  const frontendCanisterId =
    process.env.CANISTER_ID_THECHAMPS_FRONTEND ||
    process.env.CANISTER_ID_THECHAMPS_FRONTEND;

  useEffect(() => {
    const initAuthClient = async () => {
      const client = await AuthClient.create(options.createOptions);
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();

      if (principal.toText() === "2vxsx-fae") {
        await logout();
        return;
      }

      setIsAuthenticated(isAuthenticated);
      setIdentity(identity);
      setPrincipal(principal);

      const actor =
        isAuthenticated && !principal.isAnonymous()
          ? initBackendActor(identity)
          : initBackendActor(null); // Initialize with anonymous identity if not authenticated

      setBackendActor(actor);
    };
    initAuthClient();
  }, [options.createOptions]);

  const login = async (provider) => {
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
          let opt = provider === "ii" ? "loginOptionsII" : "loginOptionsNFID";
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

    if (principal.toText() === "2vxsx-fae") {
      await logout();
      return;
    }

    setAuthClient(client);
    setIsAuthenticated(isAuthenticated);
    setIdentity(identity);
    setPrincipal(principal);

    const actor =
      isAuthenticated && identity && principal && !principal.isAnonymous()
        ? initBackendActor(identity)
        : initBackendActor(null); // Initialize with anonymous identity if not authenticated

    setBackendActor(actor);

    return true;
  };

  const logout = async () => {
    await authClient?.logout();
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setBackendActor(initBackendActor(null)); // Initialize with anonymous identity on logout
  };

  return {
    login,
    logout,
    authClient,
    isAuthenticated,
    identity,
    principal,
    frontendCanisterId,
    backendCanisterId,
    backendActor,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
