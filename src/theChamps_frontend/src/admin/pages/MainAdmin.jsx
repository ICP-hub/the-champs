import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import LeftSidebar from "./LeftSidebar.jsx";
import "../admin.styles.css";
import "../theme.css";
import { HiBars4 } from "react-icons/hi2";
import ThemeSwitch from "../components/themeSwitch.jsx";
import { Principal } from "@dfinity/principal";
import FullScreenLoader from "../../pages/FullScreenLoader.jsx";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../auth/useClient.jsx";

function MainAdmin({ children }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 960);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { principal, isAuthenticated, backendActor } = useAuth();
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (isAuthenticated && principal) {
        try {
          const res = await backendActor.checkisadmin(principal);
          console.log("Admin status:", res);
          if (res === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          // console.error("Error checking isAdmin:", error);
          setIsAdmin(false);
        } finally {
          setIsAdminChecked(true);
          setLoading(false);
        }
      }
    };

    checkIsAdmin();
  }, [isAuthenticated, principal, backendActor]);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(null, args);
        }, delay);
      };
    };

    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
      setIsOpen(window.innerWidth > 960);
    }, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const contentRef = useRef();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

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

  useEffect(() => {
    const handleContentClick = () => {
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

  // console.log(loading);

  if (loading) {
    return <FullScreenLoader />;
  } else {
    if (!isAdmin) {
      toast.error("You are not an admin");
      return <Navigate to="/" replace={true} />;
    } else {
      return (
        <div className={`${theme} bg-background`}>
          <div className="text-textall layout">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ marginLeft: -280 }}
                  animate={{ marginLeft: 0 }}
                  exit={{ marginLeft: -280 }}
                  transition={{
                    duration: 0.3,
                    staggerChildren: 0.2,
                  }}
                  className={`navigation border-r dark:border-r-gray-500 ${
                    windowWidth < 960 && "navigation-mode-over"
                  }`}
                >
                  <LeftSidebar />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div className="flex flex-col">
              <div className="relative flex items-center justify-between w-full h-16 min-h-16 px-4 md:px-6 shadow z-50 dark:shadow-none dark:border-b dark:border-b-gray-500 dark:bg-transparent bg-appbar">
                <span
                  className="p-1 rounded-full hover:bg-hover cursor-pointer transition duration-300 ease-in-out"
                  onClick={handleToggle}
                >
                  <HiBars4
                    size={24}
                    color={theme === "light" ? "#64748b" : "white"}
                  />
                </span>
              </div>
              <div className="p-6 sm:p-8 min-h-screen">{children}</div>
            </motion.div>
          </div>
          {isOpen && windowWidth < 960 && (
            <div className="overlay-display" onClick={handleToggle}></div>
          )}
          <ThemeSwitch toggleTheme={toggleTheme} />
        </div>
      );
    }
  }
}

export default MainAdmin;
