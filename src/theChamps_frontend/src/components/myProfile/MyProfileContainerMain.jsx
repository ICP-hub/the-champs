/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import MyProfileA from "./MyProfileA";
import MyProfileB from "./MyProfileB";
import { useLocation } from "react-router";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ base : <MyProfileContainerMain /> : route : my-profile
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileContainerMain = () => {
  const { state } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(state);

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
