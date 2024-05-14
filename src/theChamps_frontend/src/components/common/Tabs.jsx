/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getCurrentTab } from "../../../../redux/reducers/myProfileReducer";

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
  const tabUnderlineRef = useRef(null);
  const tabsRef = useRef([]);
  const dispatch = useDispatch();

  const profileData = useSelector((state) => console.log(state));

  useEffect(() => {
    dispatch(getCurrentTab(selectedTabIndex));
  }, [selectedTabIndex]);

  // console.log(selectedTabIndex);
  useEffect(() => {
    const currentTab = tabsRef.current[selectedTabIndex];
    const tabUnderlineWidth = currentTab?.clientWidth ?? 0;
    const tabUnderlineLeft = currentTab?.offsetLeft ?? 0;

    if (tabUnderlineRef.current) {
      tabUnderlineRef.current.style.width = `${tabUnderlineWidth}px`;
      tabUnderlineRef.current.style.left = `${tabUnderlineLeft}px`;
    }
  }, [selectedTabIndex, tabs]);

  const handleTabClick = (index) => {
    setSelectedTabIndex(index);
    if (onTabChange) {
      onTabChange(tabs[index]);
    }
  };

  return (
    <div className="relative">
      <div className="flex border-b-2 border-[#E9D6E5] md:gap-10 gap-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${
              index === selectedTabIndex
                ? "bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text"
                : "text-gray-600"
            } font-semibold max-md:text-sm py-2 px-1 cursor-pointer`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <span
        ref={tabUnderlineRef}
        className="absolute bottom-0 block h-1 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] transition-all duration-300"
      />
    </div>
  );
};

export default Tabs;
