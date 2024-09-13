/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import MyProfileA from "./MyProfileA";
import MyProfileB from "./MyProfileB";
import { useLocation } from "react-router";
import CollectionApi from "../../api/CollectionApi";
import NFTApi from "../../api/NftApi";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ base : <MyProfileContainerMain /> : route : my-profile
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileContainerMain = () => {
  const { state } = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(
    state ? state : "Profile"
  );
  const { getAllCollections, collections } = CollectionApi();
  const { getCollectionWiseNFT, NFTlist, getUserNFT, userNFT } = NFTApi();

  useEffect(() => {
    getAllCollections();
  }, []);

  // console.log(collections);
  // useEffect(() => {
  //   if (collections && collections.length !== 0) {
  //     collections.map((collection) =>
  //       getCollectionWiseNFT(collection.canisterId)
  //     );
  //   }
  // }, [collections]);

  // useEffect(() => {
  //   if (NFTlist && NFTlist.length !== 0) {
  //     NFTlist.map((data) => getUserNFT(data.owner));
  //   }
  // }, [NFTlist]);

  // useEffect(() => {
  //   const nftOwnerFilter = () => {
  //     if (NFTlist && NFTlist.length !== 0) {
  //       NFTlist.map((nft) => console.log(nft));
  //     }
  //   };
  //   nftOwnerFilter();
  // }, [NFTlist]);

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <div className="md:px-24 p-6 container mx-auto">
      <MyProfileA onTabChange={handleTabChange} />
      <MyProfileB activeTabIndex={activeTabIndex} />
    </div>
  );
};

export default MyProfileContainerMain;
