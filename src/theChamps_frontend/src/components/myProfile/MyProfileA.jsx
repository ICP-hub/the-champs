/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import FancyHeader from "../common/FancyHeader";
import Tabs from "../common/Tabs";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileA /> : route : my-profile : <Tabs />
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileA = ({ onTabChange }) => {
  const handleTabChange = (tabIndex) => {
    // console.log("curr tab ", tabIndex);
    onTabChange(tabIndex);
  };

  // console.log(location.state, "hello");

  return (
    <div>
      <div className="flex">
        <FancyHeader fancy="My Profile" />
      </div>
      <div className="py-6">
        <Tabs
          tabs={["Profile", "My NFTs", "Favourites", "Activity"]}
          defaultTab={"Profile"}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default MyProfileA;
