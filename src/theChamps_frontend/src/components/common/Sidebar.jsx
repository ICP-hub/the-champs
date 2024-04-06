// Sidebar.js
import React, { useState } from "react";
import SidebarMain from "./SidebarMain";

const Sidebar = ({ isOpen, toggle }) => {
  const [login, setLogin] = useState(false);

  return (
    <>
      <div
        className={`fixed  top-0 custom-box right-0 h-full bg-white md:w-[23%] w-1/2 text-black transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {login ? (
          <SidebarMain />
        ) : (
          <div className="p-4 mt-24  h-screen bg-white ">
            {/* Your sidebar content goes here */}
            <h2 className="text-sm font-semibold mb-10 ml-2 text-gray-500 text-left">
              champs
            </h2>
            <p className="text-left ml-2">
              Connect your wallet to buy and sell NFT’s directly from the
              marketplace.
            </p>
            <div className="flex items-center justify-center">
              <button
                className="mt-4 bg-[#6D01F6] bg-opacity-100 text-white py-2 px-4 rounded-md w-[90%]"
                onClick={() => setLogin(true)} // Fix: Use arrow function or wrap setLogin(true) inside another function
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
