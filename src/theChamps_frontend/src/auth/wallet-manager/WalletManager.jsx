// import { motion } from "framer-motion";
// import { useState } from "react";
// import { newArtemis } from "../useWalletInit";
// import { useDispatch } from "react-redux";
// import { tokenList } from "../utils/canisterDriver";
// import { ENV } from "../config/env";
// import {
//   walletActions,
//   walletState,
// } from "../../../../redux/reducers/walletReducer";

// const WalletList = ({ onModalClose }) => {
//   return (
//     <div
//       className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
//       onClick={onModalClose}
//     >
//       <div className="bg-white rounded-3xl overflow-hidden">
//         {newnewArtemis.wallets.map((wallet) => (
//           <WalletSection wallet={wallet} key={wallet.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const WalletSection = ({ wallet }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const dispatch = useDispatch();

//   async function handleSelectWallet(id, name) {
//     var tknList = tokenList("obj");
//     const connectObj = {
//       host: ENV.host,
//       whitelist: [
//         ...Object.values(ENV.canistersPrincipalIDs),
//         ...Object.keys(tknList),
//       ],
//     };

//     dispatch(walletActions.setWalletSelected(id));
//     walletSelected;
//     setWSName(name ? name : id);

//     dispatch(walletActions.setOnwalletList(walletState.Connecting));

//     var connectInfo = await newArtemis.connect(id, connectObj);

//     if (connectInfo) {
//       if (newArtemis?.principalId && newArtemis?.provider) {
//         dispatch(
//           walletActions.setWalletLoaded({
//             principleId: newArtemis.principalId,
//             accountId: newArtemis.accountId,
//             walletActive: newArtemis.walletActive,
//           })
//         );
//       }
//     } else {
//       dispatch(walletActions.setOnwalletList(walletState.OpenWalletList));
//     }
//   }

//   return (
//     <motion.button
//       whileHover={{ scale: 1.04 }}
//       whileTap={{ scale: 1 }}
//       className={`flex items-center py-3 w-full pl-6 mr-28 md:mr-48 ${
//         isHovered && "button text-white"
//       }`}
//       onClick={() => window.open(wallet.adapter.url)}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <img
//         src={wallet.icon}
//         alt={wallet.id}
//         style={{
//           minHeight: "48px",
//           minWidth: "48px",
//           maxHeight: "48px",
//           maxWidth: "48px",
//         }}
//       />
//       <div className="ml-5 text-lg font-medium">{wallet.name}</div>
//     </motion.button>
//   );
// };

// export default WalletList;
