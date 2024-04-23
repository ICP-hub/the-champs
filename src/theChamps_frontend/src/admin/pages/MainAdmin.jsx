import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar.jsx";
import Topbar from "../features/dashboard/Topbar.jsx";
import DashBoard from "../features/dashboard/DashBoard.jsx";
import { MdDarkMode, MdLightMode, MdOutlineMenu } from "react-icons/md";

function MainAdmin({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`w-full flex justify-between h-screen overflow-y-auto ${
        theme === "dark"
          ? "dark:bg-[#383854] text-white"
          : "bg-[#f7f7f7] text-black"
      }`}
    >
      <div className="md:w-[20%] inline-block">
        <LeftSidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
        />
      </div>

      <div className="w-[100%] h-screen md:w-[80%] dark:bg-[#383854] bg-[#f7f7f7] text-[#292929] xl:text-[#525252] dark:text-[#fff] dark:xl:text-[#f3f3f3]">
        <div className="flex items-center gap-3 md:px-8 md:pt-10 px-2 py-4">
          <button
            className="inline-flex items-center md:hidden text-[#292929] mb-[-1px]"
            type="button"
            onClick={openSidebar}
          >
            <MdOutlineMenu size={24} />
          </button>
          <h2 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            DashBoard
          </h2>
        </div>
        <div className=" ">{children}</div>
      </div>

      {/* Theme Switch Button */}
      <div className="fixed right-0 top-0 mt-8 mr-0">
        <button
          onClick={handleThemeSwitch}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-s-3xl focus:outline-none"
        >
          {theme === "dark" ? (
            <MdLightMode className="w-5 h-5" />
          ) : (
            <MdDarkMode className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MainAdmin;
