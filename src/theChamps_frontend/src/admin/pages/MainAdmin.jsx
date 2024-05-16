import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar.jsx";
import Topbar from "../features/dashboard/Topbar.jsx";
import DashBoard from "../features/dashboard/DashBoard.jsx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "../admin.styles.css";
import "../theme.css";
import { HiBars4 } from "react-icons/hi2";
import ThemeSwitch from "../components/themeSwitch.jsx";

function MainAdmin({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const themeRef = useRef();
  const contentRef = useRef();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Custom debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Update window width on resize with debouncing
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set isOpen based on windowWidth
  useEffect(() => {
    setIsOpen(window.innerWidth > 960);
  }, [windowWidth]);

  // Effect closing sidenav on small screen
  useEffect(() => {
    const handleContentClick = (event) => {
      if (windowWidth <= 960 && isOpen) {
        setIsOpen(false);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("click", handleContentClick);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("click", handleContentClick);
      }
    };
  }, [windowWidth, isOpen]);

  return (
    <div className={`layout bg-background ${theme}`} ref={themeRef}>
      <LeftSidebar isOpen={isOpen} />
      <div
        className={`${isOpen && windowWidth < 960 && "overlay-display"}
        ${windowWidth < 960 && "fixed top-0 bottom-0 overflow-scroll"}
        flex flex-col flex-auto w-full min-w-0`}
      >
        <div className="relative flex items-center justify-between w-full h-16 min-h-16 px-4 md:px-6 shadow z-50 dark:shadow-none dark:border-b dark:border-b-gray-500 dark:bg-transparent bg-appbar">
          <span
            className="p-1 rounded-full hover:bg-hover cursor-pointer transition duration-300 ease-in-out"
            onClick={handleToggle}
          >
            <HiBars4 size={24} color="#64748b" />
          </span>
        </div>
        <div className="flex-auto" ref={contentRef}>
          {children}
        </div>
      </div>
      {isOpen && windowWidth < 960 && (
        <div className="overlay-display" onClick={() => setIsOpen(false)} />
      )}
      <ThemeSwitch toggleTheme={toggleTheme} />
    </div>

    // <div
    //   className={`w-full flex justify-between h-screen overflow-y-auto ${
    //     theme === "dark"
    //       ? "dark:bg-[#383854] text-white"
    //       : "bg-[#f7f7f7] text-black"
    //   }`}
    // >
    //   {/* <div className="md:w-[20%] inline-block">
    //     <LeftSidebar handleSidebarToggle={handleSidebarToggle} />
    //   </div> */}
    //   {isSidebarOpen ? (
    //     <LeftSidebar handleSidebarToggle={handleSidebarToggle} />
    //   ) : null}

    //   <div className="w-[100%] h-screen md:w-[80%] dark:bg-[#383854] bg-[#f7f7f7] text-[#292929] xl:text-[#525252] dark:text-[#fff] dark:xl:text-[#f3f3f3]">
    //     <div className="flex items-center gap-3 md:px-8 md:pt-10 px-2 py-4">
    //       <button
    //         className="inline-flex items-center md:hidden text-[#292929] mb-[-1px]"
    //         type="button"
    //         onClick={handleSidebarToggle}
    //       >
    //         <MdOutlineMenu size={24} />
    //       </button>
    //       <h2 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
    //         DashBoard
    //       </h2>
    //     </div>
    //     <div className=" ">{children}</div>
    //   </div>

    //   {/* Theme Switch Button */}
    //   <div className="fixed right-0 top-0 mt-8 mr-0">
    //     <button
    //       onClick={handleThemeSwitch}
    //       className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-s-3xl focus:outline-none"
    //     >
    //       {theme === "dark" ? (
    //         <MdLightMode className="w-5 h-5" />
    //       ) : (
    //         <MdDarkMode className="w-5 h-5" />
    //       )}
    //     </button>
    //   </div>
    // </div>
  );
}

export default MainAdmin;
