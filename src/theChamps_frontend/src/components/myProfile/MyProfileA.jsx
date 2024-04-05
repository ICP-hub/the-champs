import FancyHeader from "../common/FancyHeader";
import Tabs from "../common/Tabs";

const MyProfileA = ({ onTabChange }) => {
  const handleTabChange = (tabIndex) => {
    console.log("curr tab ", tabIndex);
    onTabChange(tabIndex);
  };

  return (
    <div>
      <div className="flex">
        <FancyHeader fancy="My Profile" />
      </div>
      <div className="py-6">
        <Tabs
          tabs={["My NFTs", "Favorites", "Purchased"]}
          defaultTabIndex="My NFTs"
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default MyProfileA;
