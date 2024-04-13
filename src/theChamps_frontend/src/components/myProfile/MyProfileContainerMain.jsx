/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import MyProfileA from "./MyProfileA";
import MyProfileB from "./MyProfileB";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ base : <MyProfileContainerMain /> : route : my-profile
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileContainerMain = () => {
  const [activeTabIndex, setActiveTabIndex] = useState("My NFTs");

  // console.log(activeTabIndex);
  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <div className="md:px-24 px-6">
      <MyProfileA onTabChange={handleTabChange} />
      <MyProfileB activeTabIndex={activeTabIndex} />
    </div>
  );
};

export default MyProfileContainerMain;
