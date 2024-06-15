import React, { useContext, useState } from "react";
// import {
//   CiGrid31,
//   CiGrid32,
//   CiHashtag,
//   CiLogout,
//   CiMail,
//   CiReceipt,
//   CiSettings,
//   CiShop,
//   CiVideoOff,
//   CiVideoOn,
//   CiViewBoard,
//   CiUser,
// } from "react-icons/ci";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { BiSolidOffer } from "react-icons/bi";
// import { TfiAnnouncement } from "react-icons/tfi";
import {
  MdCollections,
  MdDashboard,
  MdMail,
  // MdOutlineAttachMoney,
  // MdOutlineBarChart,
  // MdOutlineCallToAction,
  // MdOutlineClose,
  // MdOutlineCurrencyExchange,
  // MdOutlineGridView,
  // MdOutlineLocalOffer,
  // MdOutlineLocalShipping,
  // MdOutlineLogout,
  // MdOutlineSettings,
  MdPerson,
} from "react-icons/md";
// import Topbar from "../features/dashboard/Topbar";
// import { RxAvatar } from "react-icons/rx";
// import { useConnect } from "@connect2ic/react";
import Avatar from "boring-avatars";
import toast from "react-hot-toast";
import useClipboard from "react-use-clipboard";
import { RiCheckLine, RiFileCopyLine, RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "../../auth/useClient";

const LeftSidebar = ({ isOpen }) => {
  // const { principal, isConnected, disconnect } = useConnect();
  const { principal, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCopied, setCopied] = useClipboard(principal, {
    successDuration: 1000,
  });
  // Button URLs
  const navItems = [
    { path: "/admin", icon: <MdDashboard size={24} />, text: "Dashboard" },
    {
      path: "/admin/collections",
      icon: <MdCollections size={24} />,
      text: "Collections",
    },
    { path: "/admin/users", icon: <MdPerson size={24} />, text: "Users" },
    { path: "/admin/message", icon: <MdMail size={24} />, text: "Message" },
  ];

  // const position = "left";
  // const classList = {
  //   "animations-enabled": true,
  //   "mode-side": !isOpen,
  //   opened: isOpen,
  //   "position-left": position === "left",
  // };

  // const classNames = Object.entries(classList)
  //   .filter(([_, value]) => value)
  //   .map(([key]) => key)
  //   .join(" ");

  // disconnect
  const disconnectPlug = () => {
    // disconnect();
    logout();
    // location or useNavigate ???
    //window.location.href = "/";
    navigate("/");
    toast.success("Disconnected successfully");
  };
  return (
    <div className="bg-card h-full">
      <div className="p-4 flex flex-col text-gray-500 dark:text-text gap-2 h-full">
        <div className="flex flex-col items-center justify-center w-full p-4 mb-4">
          <div className="relative">
            <Avatar
              size={80}
              className="w-full h-full rounded-full"
              name={principal?.toText()}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden text-center leading-normal font-semibold">
              Admin
            </div>
            {principal ? (
              <p className="text-ellipsis line-clamp-1 text-sm text-gray-400">
                {principal?.toText()}
              </p>
            ) : (
              <span className="h-4 w-full bg-gray-100 rounded-sm animate-pulse"></span>
            )}
            <div className="flex items-center justify-center w-full gap-4 mt-2">
              <button
                onClick={() => {
                  setCopied();
                  toast.success("Principal copied successfully");
                }}
                className="text-gray-400"
              >
                {isCopied ? (
                  <RiCheckLine className="w-5 h-5 text-emerald-500" />
                ) : (
                  <RiFileCopyLine className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button className="text-gray-400" onClick={disconnectPlug}>
                <RiLogoutBoxLine className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        {navItems.map(({ path, icon, text }) => (
          <Link
            key={text}
            className={`navigation-items ${
              location.pathname === path ? "active" : ""
            }`}
            to={path}
          >
            {icon}
            {text}
          </Link>
        ))}
        <div className="mt-auto">
          <Link
            to="/"
            className="text-sm w-full flex justify-center items-center tracking-wider hover:bg-hover py-2 rounded-md"
          >
            switch to main site
          </Link>
        </div>
      </div>
    </div>
    // <div className="bg-[#fff] w-[260px] overflow-y-auto dark:shadow-4xl shadow-xl dark:shadow-[#39395f]  text-[#808191] dark:bg-[#2e2e48] fixed left-0 top-0 h-[100%] px-5 py-3 flex flex-col z-50">
    //   <div className="flex items-center justify-between mb-7 pb-1 border-b border-b-[#575777]">
    //     <div className="flex items-center gap-2">
    //       <span className="uppercase md:text-2xl text-lg font-[900] text-red-500 mb-2  lg:inline-block ">
    //         NFT Quadb
    //       </span>
    //     </div>
    //     <button
    //       style={{
    //         transition: "all 300ms ease-in-out",
    //         boxShadow: " 0px 0px 4px rgba(71, 91, 232, 0.04) ",
    //       }}
    //       className="w-[28px] h-[28px] text-[#475be8] rounded-md lg:hidden inline-flex"
    //       onClick={handleSidebarToggle}
    //     >
    //       <MdOutlineClose size={24} />
    //     </button>
    //   </div>
    //   <div className="sidebar-menu">
    //     <ul className="menu-list">
    //       <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
    //         <NavLink
    //           to="/admin"
    //           className={({ isActive }) =>
    //             isActive
    //               ? "w-full   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
    //               : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270]  flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
    //           }
    //         >
    //           <span className="flex items-center">
    //             <MdOutlineGridView size={18} />
    //           </span>
    //           <span className="   font-medium ml-2 ">Dashboard</span>
    //         </NavLink>
    //       </li>
    //       <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
    //         <NavLink
    //           to="/admin-collections"
    //           className={({ isActive }) =>
    //             isActive
    //               ? "w-full   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
    //               : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
    //           }
    //         >
    //           <span className="flex items-center">
    //             <MdOutlineGridView size={18} />
    //           </span>
    //           <span className="   font-medium ml-2 ">Collections</span>
    //         </NavLink>
    //       </li>
    //       <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
    //         <NavLink
    //           to="/users"
    //           className={({ isActive }) =>
    //             isActive
    //               ? "w-full shadow-md   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
    //               : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
    //           }
    //         >
    //           <span className="flex items-center">
    //             <MdOutlineGridView size={18} />
    //           </span>
    //           <span className="   font-medium ml-2 ">Users</span>
    //         </NavLink>
    //       </li>
    //       <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
    //         <NavLink
    //           to="/message"
    //           className={({ isActive }) =>
    //             isActive
    //               ? "w-full shadow-md   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
    //               : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
    //           }
    //         >
    //           <span className="flex items-center">
    //             <MdOutlineGridView size={18} />
    //           </span>
    //           <span className="   font-medium ml-2 ">Message</span>
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="mt-auto">
    //     <ul className="menu-list">
    //       {/* <li className="mb-2 last:mb-0 md:flex md:items-center md:justify-center">
    //         <NavLink
    //           to="/df"
    //           className={({ isActive }) =>
    //             isActive
    //               ? "w-full  bg-[#FC001E] shadow-md dark:bg-[#FC001E] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
    //               : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
    //           }
    //         >
    //           <span className="flex items-center">
    //             <MdOutlineSettings size={20} />
    //           </span>
    //           <span className="   font-medium ml-2 ">Settings</span>
    //         </NavLink>
    //       </li> */}
    //       <li className="mb-1 last:mb-0 md:flex md:items-center md:justify-center">
    //         <NavLink
    //           className={
    //             "w-full  h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] 2xl:p-1 2xl:w-9 2xl:h-9 2xl:rounded-md"
    //           }
    //         >
    //           <div className="flex items-center gap-6">
    //             <span className="flex justify-between gap-2 items-center">
    //               <RxAvatar size={20} /> <h1>Ritesh</h1>
    //             </span>
    //             <button className="flex items-center">
    //               <span className="  font-medium ml-16 ">
    //                 <MdOutlineLogout size={20} />
    //               </span>
    //             </button>
    //           </div>
    //         </NavLink>
    //       </li>
    //       <li className=" last:mb-0 md:flex md:items-center md:justify-center">
    //         <Link
    //           to={"/"}
    //           className={
    //             "w-full uppercase  flex items-center justify-start  py-1 px-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] 2xl:p-1 2xl:w-9 2xl:h-9 2xl:rounded-md"
    //           }
    //         >
    //           Switch to main site
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default LeftSidebar;
