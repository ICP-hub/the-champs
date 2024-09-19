// Sidebar.js
import { useState } from "react";
// import SidebarMain from "./SidebarMain";
// import {
//   ConnectDialog,
//   useBalance,
//   useConnect,
//   useDialog,
// } from "@connect2ic/react";
// import { login, logout } from "../../../../redux/reducers/authReducer";
// import { useDispatch } from "react-redux";
// import Avatar from "boring-avatars";
// import {
//   IoMdArrowDropdown,
//   IoMdCopy,
//   IoMdLogOut,
//   IoMdRefresh,
//   IoMdSearch,
// } from "react-icons/io";
// import IconWrapper from "./IconWrapper";
import { motion } from "framer-motion";
// import { IoMdArrowDropup } from "react-icons/io";
import PlugWallet from "./sidebar-components/PlugWallet";
import ProfileSection from "./sidebar-components/ProfileSection";
import { useAuth } from "../../auth/useClient";
import WalletModal from "./WalletModal";

const Sidebar = () => {
  // const { isConnected } = useConnect();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="w-full h-screen p-4 overflow-scroll scrollBox">
        {isAuthenticated ? <UserAthenticated /> : <UserNotAuthenticated />}
        {/* <UserAthenticated /> */}
        {/* <UserNotAuthenticated /> */}
      </div>
    </>
  );
};

const UserAthenticated = () => {
  return (
    <div>
      <h1 className="text-sm md:text-md text-gray-500 text-left min-w-max">
        Logged In
      </h1>
      <PlugWallet />
      <ProfileSection />
    </div>
  );
};

const UserNotAuthenticated = () => {
  const { login } = useAuth();
  return (
    <div>
      <h1 className="text-sm md:text-md text-gray-500 text-left min-w-max">
        Log in
      </h1>
      <div className="pt-4 pb-8 text-sm md:text-md font-medium">
        Log in to buy your digital assets or view your collection
      </div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="button text-sm md:text-md min-w-max flex items-center justify-center p-2 rounded-md text-white font-medium cursor-pointer"
        onClick={login}
      >
        Log in
      </motion.div>
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-semibold">How to log in:</h4>
        <p className="text-xs font-medium">
          1. Click the “Log in” button above.
        </p>
        <p className="text-xs font-medium">
          2. Put in your email address and follow the instructions in the email
          received OR Log in with your Google account.
        </p>
        <p className="text-xs font-medium">
          3. Select “Hide NFID wallet”, for maximum privacy OR “Share NFID
          wallet”, for transparency.
        </p>
        <p className="text-xs font-medium">4. Press “Connect”.</p>
        <p className="text-xs font-semibold">
          Congrats, you can now use the platform.
        </p>
      </div>
    </div>
  );
};

// return (
//   <>
//     <ConnectDialog dark={false} />
//     <div
//       className={`fixed  top-0 custom-box right-0 h-full bg-white md:w-[23%] w-1/2 text-black transition-transform transform ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       {isAuthenticated ? (
//         <SidebarMain />
//       ) : (
//         <div className="p-4 mt-24  h-screen bg-white ">
//           {/* Your sidebar content goes here */}
//           <h2 className="text-md    mb-4 text-gray-500 text-left ">
//             Connect Wallet
//           </h2>
//           <p className="text-left ml-2 text-sm md:text-md ">
//             Connect your wallet to buy and sell NFT’s directly from the
//             marketplace.
//           </p>

//           <div className="flex items-center justify-center">
//             <button
//               className="mt-4 button bg-opacity-100  text-white py-2 px-2 rounded-md w-full md:w-[90%]"
//               onClick={() => open()} // Fix: Use arrow function or wrap setLogin(true) inside another function
//               style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)" }}
//             >
//               Connect to wallet
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   </>
// );
// };

export default Sidebar;
