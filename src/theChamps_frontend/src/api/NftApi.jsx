import { useCanister } from "@connect2ic/react";
import { useState } from "react";

const NFTApi = () => {
  const [backend] = useCanister("backend");
  const [NFTlist, setNFTlist] = useState(null);
  const [nftLoading, setNFTLoading] = useState(false);
  const [userNFT, setUserNFT] = useState(null);
  // Get NFTs by collection
  const getCollectionWiseNFT = async (canisterId) => {
    try {
      setNFTLoading(true);
      const res = await backend.getcollectionwisenft(canisterId);
      setNFTlist(res);
      console.log(res);
    } catch (err) {
      console.log("Error getting collectionwise nft", err);
    } finally {
      setNFTLoading(false);
    }
  };

  // Get user NFT
  const getUserNFT = async (ownerPrincipal) => {
    try {
      setNFTLoading(true);
      const res = await backend.getusersnft(ownerPrincipal);
      setUserNFT(res.Ok);
      console.log("get nft", res);
    } catch (err) {
      console.log("Error on getUserNFT :", err);
    } finally {
      setNFTLoading(false);
    }
  };

  return { getCollectionWiseNFT, nftLoading, NFTlist, getUserNFT, userNFT };
};

export default NFTApi;
