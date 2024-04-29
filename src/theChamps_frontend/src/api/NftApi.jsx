import { useCanister } from "@connect2ic/react";
import { useState } from "react";

const NFTApi = () => {
  const [backend] = useCanister("backend");
  const [NFTlist, setNFTlist] = useState(null);
  const [nftLoading, setNFTLoading] = useState(false);
  // Get NFTs by collection
  const getCollectionWiseNFT = async (principal) => {
    try {
      setNFTLoading(true);
      const res = await backend.getcollectionwisenft(principal);
      setNFTlist(res);
    } catch (err) {
      console.log("Error getting collectionwise nft", err);
    } finally {
      setNFTLoading(false);
    }
  };

  return { getCollectionWiseNFT, nftLoading, NFTlist };
};

export default NFTApi;
