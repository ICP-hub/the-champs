import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown, MdShoppingCart } from "react-icons/md";
import { MdCollections, MdAddShoppingCart } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import Avatar from "boring-avatars";
import IcpLogo from "../../assets/IcpLogo";
import { LuRefreshCcw } from "react-icons/lu";
import { FaCopy } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReadMore from "./ReadMore";
import {
  ConnectButton,
  ConnectDialog,
  useConnect,
  useDialog,
} from "@connect2ic/react";

import { RiArrowUpDownFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

const SidebarMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { principal, disconnect, isConnected } = useConnect();

  return (
    <div className="py-4 mt-24 ">
      {/* Your sidebar content goes here */}
      <h2 className="text-md px-4   mb-4 text-gray-500 text-left ">
        Connected Wallet
      </h2>
      <div className=" w-full hover:bg-gray-200">
        <div className="sm:flex px-4 py-2 items-center justify-between w-[90%]">
          <div className="w-12  h-12 rounded-full border border-gray-700 flex items-center justify-center">
            <Avatar
              size={40}
              name={principal}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className=" text-left">
            <p>plug</p>
            <p className="text-gray-500">
              <ReadMore text={principal || ""} maxLength={15} />
            </p>
          </div>
          <button
            className="text-[#FC001E]"
            onClick={() => setIsModalOpen(true)}
          >
            <MdOutlineKeyboardArrowDown size={24} />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50  mt-32 flex items-start justify-center  bg-opacity-50">
          <div className="  p-6 rounded-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 hover:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              className=" pt-1 bg-white text-gray-700  "
              style={{ boxShadow: " 4px 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              <div className=" p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full">
                <div className="text-[#fc001e]">
                  <LuRefreshCcw size={20} />
                </div>
                Refresh
              </div>
              <div className="  p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full">
                <div className="text-[#fc001e]">
                  <FaCopy size={20} />
                </div>
                Copy Address
              </div>
              <div className="  p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full ">
                <div className="text-[#fc001e] ">
                  <FaMagnifyingGlass size={20} />
                </div>
                View In Explorer
              </div>
              <div className=" p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full">
                <div className="text-[#fc001e]">
                  <RiMoneyDollarBoxLine size={20} />
                </div>
                Check Payment
              </div>
              <div className="border-[1px] mt-4 border-gray-200 w-full m-0"></div>
              <div className=" p-2 px-4 flex gap-8 mb-2 items-center text-lg hover:bg-gray-200 w-full">
                <div className="text-[#fc001e]">
                  <IoMdLock size={20} />
                </div>
                <button
                  onClick={() => {
                    disconnect();

                    toast.success("Logout successfully");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="text-center gap-1  flex items-center justify-center w-full my-4 mt-6 px-4">
        <IcpLogo size={18} /> 0
      </p>

      {/* <div className="flex items-center justify-center ">
        <button className="mt-4  font-bold text-[#6D01F6] border-2 border-[#6D01F6]  py-2 px-4 rounded-md w-[90%]">
          Link volt
        </button>
      </div> */}
      <div className="border-[1px] mt-4 border-gray-200 w-full m-0"></div>

      <div className="p-4 text-left text-md ">
        <p className=" mb-2 text-gray-400">NFTs</p>
        <div className="flex gap-8 items-center text-lg">
          <div className="text-[#fc001e]">
            <MdCollections size={24} />
          </div>
          Collected
        </div>
        <div className="flex gap-8 mt-4 items-center text-lg">
          <div className="text-[#fc001e]">
            <MdAddShoppingCart size={24} />
          </div>
          selling
        </div>
      </div>
      <div className="p-4 py-2 text-left text-md ">
        <p className=" mb-2 text-gray-400">Profile</p>
        <div className="flex gap-8 items-center text-lg">
          <div className="text-[#fc001e]">
            <IoMdHeart size={24} />
          </div>
          Favorites
        </div>
        <div className="flex gap-8 mt-4 items-center text-lg">
          <div className="text-[#fc001e]">
            <RiArrowUpDownFill size={24} />
          </div>
          Activity
        </div>
      </div>
    </div>
  );
};

export default SidebarMain;