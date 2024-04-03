import FancyHeader from "../common/FancyHeader";
import Tabs from "../common/Tabs";

const MyProfileA = () => {
  const handleTabChange = (tab) => {
    console.log("Selected Tab:", tab);
  };
  return (
    <div className="md:px-24 p-6">
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
