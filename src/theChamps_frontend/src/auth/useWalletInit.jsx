// import { useEffect } from "react";
// import { Artemis } from "artemis-web3-adapter";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useWalletStore,
//   walletActions,
//   walletState,
// } from "../../../redux/reducers/walletReducer";
// import { tokenList } from "./utils/canisterDriver";
// import { ENV } from "./config/env";

// export const newArtemis = new Artemis();

// const tknList = tokenList("obj");
// const connectObj = {
//   host: ENV.host,
//   whitelist: [
//     ...Object.values(ENV.canistersPrincipalIDs),
//     ...Object.keys(tknList),
//   ],
// };

// const backendCanisterId = process.env.CANISTER_ID_THECHAMPS_BACKEND;
// const frontendCanisterId = process.env.CANISTER_ID_THECHAMPS_FRONTEND;

// export const useWalletInit = () => {
//   const dispatch = useDispatch();
//   const { isConnected } = useWalletStore();

//   useEffect(() => {
//     console.log("is connected ", isConnected);
//     const initAdapter = async () => {
//       const walletId = localStorage.getItem("dfinityWallet") || "";
//       if (walletId) {
//         dispatch(walletActions.setWalletSelected(walletId));
//         dispatch(walletActions.setOnwalletList(walletState.Connecting));
//       }
//       const walletStatus = await newArtemis.autoConnect(connectObj);
//       console.log(walletStatus);
//       if (
//         walletStatus &&
//         newArtemis &&
//         newArtemis.principalId &&
//         newArtemis.provider
//       ) {
//         dispatch(
//           walletActions.setWalletLoaded({
//             principleId: newArtemis.principalId,
//             accountId: newArtemis.accountId,
//             walletActive: newArtemis.walletActive,
//           })
//         );
//       } else {
//         dispatch(walletActions.setOnwalletList(walletState.Idle));
//       }
//     };

//     initAdapter();
//   }, [dispatch]);
// };
