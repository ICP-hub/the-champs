import React, { createContext, useContext, useEffect, useState } from "react";
// import { AuthClient } from "@dfinity/auth-client";
// import { createActor } from "../../../../.dfx/local/canisters/theChamps_backend";
import { NFID } from "@nfid/embed";
import { Principal } from "@dfinity/principal";

const AuthContext = createContext();

// const defaultOptions = {
//   createOptions: {
//     idleOptions: {
//       idleTimeout: 1000 * 60 * 30,
//       disableDefaultIdleCallback: true,
//     },
//   },
//   // loginOptionsII: {
//   //   identityProvider: "https://identity.ic0.app/#authorize",
//   // },
//   loginOptionsNFID: {
//     identityProvider: `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
//   },
// };

export const useAuthClient = () => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [nfid, setNfid] = useState(null);
  const [error, setError] = useState(null);
  const backendCanisterId = process.env.CANISTER_ID_THECHAMPS_BACKEND;

  useEffect(() => {
    const initNFID = async () => {
      try {
        const nfIDInstance = await NFID.init({
          application: {
            name: "NFID Login",
            logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg",
          },
          idleOptions: {
            idleTimeout: 600000, // 10 minutes
            captureScroll: true,
            scrollDebounce: 100,
          },
        });
        setNfid(nfIDInstance);
      } catch (error) {
        console.error("Error initializing NFID:", error);
        setError("Failed to initialize NFID.");
      }
    };

    initNFID();
  }, []);

  // useEffect(() => {
  //   const initAuthClient = async () => {
  //     const client = await AuthClient.create(options.createOptions);
  //     setAuthClient(client);

  //     const isAuthenticated = await client.isAuthenticated();
  //     const identity = client.getIdentity();
  //     const principal = identity.getPrincipal();

  //     // if (principal.toText() === "2vxsx-fae") {
  //     //   await logout();
  //     //   return;
  //     // }

  //     setIsAuthenticated(isAuthenticated);
  //     setIdentity(identity);
  //     setPrincipal(principal);
  //     if (createActor) {
  //       const backendActor = createActor(backendCanisterId, {
  //         agentOptions: { identity, verifyQuerySignatures: false },
  //       });
  //       setBackendActor(backendActor);
  //     }
  //   };
  //   initAuthClient();
  // }, []);

  // const clientInfo = async (client) => {
  //   const isAuthenticated = await client.isAuthenticated();
  //   const identity = client.getIdentity();
  //   const principal = identity.getPrincipal();

  //   // if (principal.toText() === "2vxsx-fae") {
  //   //   await logout();
  //   //   return;
  //   // }

  //   setAuthClient(client);
  //   setIsAuthenticated(isAuthenticated);
  //   setIdentity(identity);
  //   setPrincipal(principal);

  //   if (
  //     createActor &&
  //     isAuthenticated &&
  //     identity &&
  //     principal &&
  //     !principal.isAnonymous()
  //   ) {
  //     const backendActor = createActor(backendCanisterId, {
  //       agentOptions: { identity, verifyQuerySignatures: false },
  //     });

  //     setBackendActor(backendActor);
  //   }

  //   return true;
  // };

  const login = async () => {
    const canisterArray = [backendCanisterId];
    if (nfid) {
      try {
        const identity = nfid.getIdentity();
        console.log("identity", identity);

        const delegationResult = await nfid.getDelegation({
          targets: canisterArray,
        });
        const theUserPrincipal = Principal.from(
          delegationResult.getPrincipal()
        ).toText();
        console.log("user principal text", theUserPrincipal);
        const isLogin = await nfid.getDelegationType();
        console.log(isLogin, "Delegation type");
        setIsAuthenticated(true);
        setPrincipal();
      } catch (error) {
        console.error("Error during NFID call:", error);
        setError("Failed to get NFID delegation.");
      }
    } else {
      console.warn("NFID is not initialized.");
      setError("NFID is not initialized.");
    }
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
    backendActor,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  console.log("auth is ", auth);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
