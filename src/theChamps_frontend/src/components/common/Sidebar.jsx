// Sidebar.js
import { useEffect } from "react";
import SidebarMain from "./SidebarMain";
import {
  ConnectDialog,
  useBalance,
  useConnect,
  useDialog,
} from "@connect2ic/react";
import { login, logout } from "../../../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

const Sidebar = ({ isOpen, toggle }) => {
  const { open } = useDialog();
  const { principal, isConnected } = useConnect();
  // For realtime plug balance :
  const [assets] = useBalance();
  const dispatch = useDispatch();

  // Effect for setting userInfo : redux
  useEffect(() => {
    if (principal) {
      const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
      const icpBal = icpWallet ? icpWallet.amount : 0;
      // console.log(icpBal);
      dispatch(login({ plugPrincipal: principal, plugBalance: icpBal }));
    } else {
      dispatch(logout());
    }
  }, [principal, assets]);

  return (
    <>
      <ConnectDialog dark={false} />
      <div
        className={`fixed  top-0 custom-box right-0 h-full bg-white md:w-[23%] w-1/2 text-black transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isConnected ? (
          <SidebarMain />
        ) : (
          <div className="p-4 mt-24  h-screen bg-white ">
            {/* Your sidebar content goes here */}
            <h2 className="text-md    mb-4 text-gray-500 text-left ">
              Connect Wallet
            </h2>
            <p className="text-left ml-2 text-sm md:text-md ">
              Connect your wallet to buy and sell NFT’s directly from the
              marketplace.
            </p>

            <div className="flex items-center justify-center">
              <button
                className="mt-4 button bg-opacity-100  text-white py-2 px-2 rounded-md w-full md:w-[90%]"
                onClick={() => open()} // Fix: Use arrow function or wrap setLogin(true) inside another function
                style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)" }}
              >
                Connect to wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
