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
  const [activeTabIndex, setActiveTabIndex] = useState(state);
  const { getAllCollections, collections } = CollectionApi();
  const { getCollectionWiseNFT, NFTlist, getUserNFT, userNFT } = NFTApi();

  useEffect(() => {
    getAllCollections();
  }, []);

  useEffect(() => {
    if (collections && collections.length !== 0) {
      collections.map((collection) =>
        getCollectionWiseNFT(collection.canister_id)
      );
    }
  }, [collections]);

  useEffect(() => {
    if (NFTlist && NFTlist.length !== 0) {
      NFTlist.map((data) => getUserNFT(data.owner));
    }
  }, [NFTlist]);

  useEffect(() => {
    const nftOwnerFilter = () => {
      if (NFTlist && NFTlist.length !== 0) {
        NFTlist.map((nft) => console.log(nft));
      }
    };
    nftOwnerFilter();
  }, [NFTlist]);

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  return (
    <div className="md:px-24 px-6">
      <MyProfileA onTabChange={handleTabChange} />
      <MyProfileB activeTabIndex={activeTabIndex} userNFT={userNFT} />
    </div>
  );
};

export default MyProfileContainerMain;
