import React from "react";
import { CiMail, CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Topbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="p-[4px] bg-black w-full">
      <div className="w-full rounded-2xl bg-gray-900 py-6 px-2">
        <div className="flex w-full justify-between">
          <div className="px-4">
            <div className="flex bg-black py-2 items-center rounded-xl px-6">
              <CiSearch className="text-white/80 font-semibold text-2xl" />
              <input
                className="bg-black outline-none text-white px-2 "
                type="text"
                name=""
                id=""
                placeholder="Search here"
              />
            </div>
          </div>
          <div className="flex gap-5 items-center px-4">
            <button
              className={`px-4 py-2 rounded-xl text-white/80 ${
                darkMode ? "bg-gray-800" : "bg-slate-700"
              }`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
            <div className="">
              <CiMail className="text-3xl text-white/80" />
            </div>
            <div className="relative px-2">
              <div className="absolute top-0 bottom-5 mb-10 right-0 left-7 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                4+
              </div>
              <IoIosNotificationsOutline className="text-3xl text-white opacity-80" />
            </div>
            <div className="px-1 ">
              <FaCircleUser className="text-3xl text-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
