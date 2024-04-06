import React, { useState } from "react";

import { FiShoppingCart } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [colorChange, setColorchange] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <div className="relative z-[35]">
      <div className="w-full">
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-25"
            onClick={toggleSidebar}
          ></div>
        )}
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />{" "}
      </div>
      {/* Move Sidebar outside of header */}
      <div
        className={`top-0 left-0 fixed right-0 flex flex-wrap justify-between items-center z-30 px-6 lg:px-24 py-7 ${
          colorChange ? "page-header" : "bg-white"
        } ${
          isSidebarOpen || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
        }`}
        style={{
          boxShadow: isSidebarOpen
            ? " 0px -4px 10px rgba(0, 0, 0, 0.4)"
            : "none",
        }}
      >
        <h1 className="text-3xl font-bold font-orbitron">CHAMPS</h1>
        <ul className="hidden sm:flex md:gap-7 gap-3 md:text-lg text-sm font-bold">
          <li>Home</li>
          <li>Collection</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="sm:hidden">
          <button className="text-2xl focus:outline-none" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className="flex gap-7 text-center items-center">
          <div className="hidden sm:flex items-center z-1">
            <FiShoppingCart size={24} />
          </div>
          <button
            onClick={toggleSidebar}
            className="flex gap-3 text-lg items-center border border-black rounded-md px-3 py-2"
          >
            <FaWallet />
            <p>Login</p>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="z-40 sm:hidden fixed top-24 left-100 h-screen right-0 flex flex-col w-[38%] bg-white px-8 py-4">
          <ul className="flex flex-col gap-4 text-lg text-left font-bold">
            <li>Home</li>
            <li>Collection</li>
            <li>About</li>
            <li>Contact</li>
            <div className="w-full">
              <FiShoppingCart size={24} />
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
