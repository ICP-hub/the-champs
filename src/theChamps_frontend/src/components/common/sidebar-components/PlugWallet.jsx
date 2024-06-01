import Avatar from "boring-avatars";
import { useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";
import IconWrapper from "../IconWrapper";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdCopy,
  IoMdLogOut,
  IoMdRefresh,
  IoMdSearch,
} from "react-icons/io";
import { useBalance, useConnect } from "@connect2ic/react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../../../redux/reducers/authReducer";
import IcpLogo from "../../../assets/IcpLogo";
import useClipboard from "react-use-clipboard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PlugWallet = () => {
  const controls = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { principal, disconnect } = useConnect();
  const [assets] = useBalance();
  const dispatch = useDispatch();
  const [isCopied, setCopied] = useClipboard(principal, {
    successDuration: 1000,
  });

  const userInfo = useSelector((state) => state.auth);

  console.log("useinfo", userInfo);
  // Open close sidebar
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      controls.start({ y: -400, opacity: 0 });
    } else {
      controls.start({ y: 10, opacity: 1 });
    }
  };

  // Refresh bal logic
  const refreshBal = () => {};

  // Copy plug id
  const copyAddress = () => {
    setCopied();
    toast.success("Address copied successfully");
  };

  const viewInExplorer = () => {};
  // user logout
  const userLogOut = () => {
    dispatch(logout());
    disconnect();
    toast.success("Logout successfully");
  };

  // Effect for setting userInfo : redux
  useEffect(() => {
    if (principal) {
      const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
      const icpBal = icpWallet?.amount;
      // console.log(icpBal);
      dispatch(login({ plugPrincipal: principal, plugBalance: icpBal }));
    } else {
      dispatch(logout());
    }
  }, [principal, assets]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex gap-4 items-center w-full py-4">
        <div className="rounded-full border border-gray-700 flex items-center justify-center p-[2px]">
          <Avatar
            size={40}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-bold uppercase">USER ID</div>
          <div className="text-sm font-medium line-clamp-1 text-gray-600">
            {userInfo.userPlugPrincipal ? (
              userInfo.userPlugPrincipal
            ) : (
              <div className="w-full rounded-md h-5 bg-gray-300 animate-pulse"></div>
            )}
          </div>
        </div>
        <div className="cursor-pointer" onClick={toggleMenu}>
          <IconWrapper>
            {isMenuOpen ? (
              <IoMdArrowDropup size={24} />
            ) : (
              <IoMdArrowDropdown size={24} />
            )}
          </IconWrapper>
          <motion.div
            animate={controls}
            initial={{ y: -400, opacity: 0 }}
            className="absolute w-60 right-7 rounded-2xl text-gray-700 bg-white text-lg overflow-hidden"
            style={{ boxShadow: " 4px 4px 10px rgba(0, 0, 0, 0.3)" }}
          >
            <div
              className="px-6 py-3 hover:bg-gray-200 flex gap-4 items-center"
              onClick={refreshBal}
            >
              <IconWrapper>
                <IoMdRefresh size={28} />
              </IconWrapper>
              <p>Refresh</p>
            </div>
            <div
              className="px-6 py-3 hover:bg-gray-200 flex gap-4 items-center"
              onClick={copyAddress}
            >
              <IconWrapper>
                <IoMdCopy size={28} />
              </IconWrapper>
              <p>Copy Address</p>
            </div>
            <Link
              to="https://icscan.io/account/d1f2fcb239ed4510f7f1cfe07210a71aa3c8c2bd93e39ab7e1338ca9b37b6060"
              className="px-6 py-3 hover:bg-gray-200 flex gap-4 items-center"
            >
              <IconWrapper>
                <IoMdSearch size={28} />
              </IconWrapper>
              <p>View in explorer</p>
            </Link>
            <div
              className="px-6 py-3 hover:bg-gray-200 flex gap-4 items-center"
              onClick={userLogOut}
            >
              <IconWrapper>
                <IoMdLogOut size={28} />
              </IconWrapper>
              <p>Disconnect</p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <div className="flex gap-4 items-center justify-center text-lg pb-4">
        <IcpLogo size={32} /> {userInfo.userPlugBalance}
      </div> */}
    </div>
  );
};

export default PlugWallet;
