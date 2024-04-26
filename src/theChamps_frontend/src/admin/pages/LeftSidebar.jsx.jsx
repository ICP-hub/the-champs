import React, { useContext, useState } from "react";
import {
  CiGrid31,
  CiGrid32,
  CiHashtag,
  CiLogout,
  CiMail,
  CiReceipt,
  CiSettings,
  CiShop,
  CiVideoOff,
  CiVideoOn,
  CiViewBoard,
  CiUser,
} from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";
import { TfiAnnouncement } from "react-icons/tfi";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineCallToAction,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLocalOffer,
  MdOutlineLocalShipping,
  MdOutlineLogout,
  MdOutlineSettings,
} from "react-icons/md";
import Topbar from "../features/dashboard/Topbar";
import { RxAvatar } from "react-icons/rx";

const LeftSidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <div
      style={
        {
          // ...mediaStyles,
        }
      }
      className={`bg-[#fff] w-[260px] 2xl:w-[375px] overflow-y-auto dark:shadow-4xl shadow-xl dark:shadow-[#39395f]  text-[#808191] dark:bg-[#2e2e48] fixed left-0 top-0 h-[100%] px-5 py-3 flex flex-col z-50 ${
        isSidebarOpen ? "inline-block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between mb-7 pb-1 border-b border-b-[#575777]">
        <div className="flex items-center gap-2">
          <span className="uppercase md:text-2xl text-lg font-[900] text-red-500 mb-2  lg:inline-block ">
            NFT Quadb
          </span>
        </div>
        <button
          style={{
            transition: "all 300ms ease-in-out",
            boxShadow: " 0px 0px 4px rgba(71, 91, 232, 0.04) ",
          }}
          className="w-[28px] h-[28px] text-[#475be8] rounded-md lg:hidden inline-flex"
          onClick={closeSidebar}
        >
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-menu">
        <ul className="menu-list">
          <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "w-full   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
                  : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270]  flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
              }
            >
              <span className="flex items-center">
                <MdOutlineGridView size={18} />
              </span>
              <span className="   font-medium ml-2 ">Dashboard</span>
            </NavLink>
          </li>
          <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
            <NavLink
              to="/admin-collections"
              className={({ isActive }) =>
                isActive
                  ? "w-full   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
                  : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
              }
            >
              <span className="flex items-center">
                <MdOutlineGridView size={18} />
              </span>
              <span className="   font-medium ml-2 ">Collections</span>
            </NavLink>
          </li>
          <li className="menu-item xl:flex xl:items-center xl:justify-center  mb-4">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "w-full shadow-md   bg-gradient-to-r from-[#FC001E] to-[#FF7D57] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
                  : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
              }
            >
              <span className="flex items-center">
                <MdOutlineGridView size={18} />
              </span>
              <span className="   font-medium ml-2 ">Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="menu-list">
          {/* <li className="mb-2 last:mb-0 md:flex md:items-center md:justify-center">
            <NavLink
              to="/df"
              className={({ isActive }) =>
                isActive
                  ? "w-full  bg-[#FC001E] shadow-md dark:bg-[#FC001E] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
                  : "w-full hover:bg-[#f6f6f6] dark:hover:bg-[#525270] h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] "
              }
            >
              <span className="flex items-center">
                <MdOutlineSettings size={20} />
              </span>
              <span className="   font-medium ml-2 ">Settings</span>
            </NavLink>
          </li> */}
          <li className="mb-4 last:mb-0 md:flex md:items-center md:justify-center">
            <NavLink
              className={
                "w-full  h-12 flex items-center justify-start gap-3 p-3 rounded-xl text-[#808191] bg:text-[#e1e1e1] 2xl:p-1 2xl:w-9 2xl:h-9 2xl:rounded-md"
              }
            >
              <div className="flex items-center gap-6">
                <span className="flex justify-between gap-2 items-center">
                  <RxAvatar size={20} /> <h1>Ritesh</h1>
                </span>
                <button className="flex items-center">
                  <span className="  font-medium ml-2 ">
                    <MdOutlineLogout size={20} />
                  </span>
                </button>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
