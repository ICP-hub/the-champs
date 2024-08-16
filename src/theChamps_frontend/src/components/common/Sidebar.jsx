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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleWalletModalOpen = () => setIsLoggedIn(true);
  const handleWalletModalClose = () => setIsLoggedIn(false);

  return (
    <>
      <div className="w-full h-screen p-4 overflow-scroll scrollBox">
        {isAuthenticated ? (
          <UserAthenticated />
        ) : (
          <UserNotAuthenticated onModalOpen={handleWalletModalOpen} />
        )}
        {/* <UserAthenticated /> */}
        {/* <UserNotAuthenticated /> */}
      </div>
      {isLoggedIn && <WalletModal onModalClose={handleWalletModalClose} />}
    </>
  );
};

const UserAthenticated = () => {
  return (
    <div>
      <h1 className="text-sm md:text-md text-gray-500 text-left min-w-max">
        Connected Wallet
      </h1>
      <PlugWallet />
      <ProfileSection />
    </div>
  );
};

const UserNotAuthenticated = ({ onModalOpen }) => {
  return (
    <div>
      <h1 className="text-sm md:text-md text-gray-500 text-left min-w-max">
        Connect Wallet
      </h1>
      <div className="pt-4 pb-8 text-sm md:text-md font-medium">
        Connect your wallet to buy and sell digital assets directly from the
        marketplace.
      </div>
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="button text-sm md:text-md min-w-max flex items-center justify-center p-2 rounded-md text-white font-medium cursor-pointer"
        onClick={onModalOpen}
      >
        Log in
      </motion.div>
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
