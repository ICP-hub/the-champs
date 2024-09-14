/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getCurrentTab } from "../../../../redux/reducers/myProfileReducer";
import { motion } from "framer-motion";

const initialStateIndex = {
  Profile: 0,
  "My NFTs": 1,
  Favourites: 2,
  Activity: 3,
};

const Tabs = ({ tabs, defaultTab, onTabChange }) => {
  const { state } = useLocation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    initialStateIndex[state] || 0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentTab(selectedTabIndex));
  }, [selectedTabIndex]);

  const handleTabClick = (index) => {
    setSelectedTabIndex(index);
    if (onTabChange) {
      onTabChange(tabs[index]);
    }
  };

  return (
    <div className="relative">
      {tabs.map((tab, index) => (
        <Chip
          key={index}
          text={tab}
          selected={selectedTabIndex === index}
          setSelected={() => handleTabClick(index)}
        />
      ))}
      <div className="h-1 w-full bg-gray-200 absolute bottom-0"></div>
    </div>

    // <div className="relative bg-gradient-to-br from-[#fc001e] to-[#ff7d57]">
    //   <div className="flex border-b-2 border-[#E9D6E5] md:gap-10 gap-4">
    //     {tabs.map((tab, index) => (
    //       <button
    //         key={index}
    //         ref={(el) => (tabsRef.current[index] = el)}
    //         className={`${
    //           index === selectedTabIndex
    //             ? "bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text"
    //             : "text-gray-600"
    //         } font-semibold max-md:text-sm py-2 px-1 cursor-pointer`}
    //         onClick={() => handleTabClick(index)}
    //       >
    //         {tab}
    //       </button>
    //     ))}
    //   </div>
    //   <span
    //     ref={tabUnderlineRef}
    //     className="absolute bottom-0 block h-1 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] transition-all duration-300"
    //   />
    // </div>
  );
};

const Chip = ({ text, selected, setSelected }) => {
  const animationVar = {
    initial: { x: -100 },
    animate: { x: 0, borderBottom: "#fc001e" },
  };
  return (
    <button
      onClick={setSelected}
      className={`px-2.5 py-2 relative font-semibold text-sm md:text-xl hover:text-[#fc001e]
         z-10`}
    >
      <span className={`relative z-10 ${selected && "gradient_text"}`}>
        {text}
      </span>
      {selected && (
        <motion.div
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 border-b-4 border-red-500"
        ></motion.div>
      )}
    </button>
  );
};

export default Tabs;
