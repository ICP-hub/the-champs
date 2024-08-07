import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCollectionwiseNft,
  getSingleCollectionNFT,
} from "../../../redux/reducers/nftReducer";
import { useAuth } from "../auth/useClient";

const NFTApi = () => {
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [nftLoading, setNFTLoading] = useState(true);
  const dispatch = useDispatch();

  // Get single nft by canister id
  const getSingleCollectionWiseNFT = async (canisterId) => {
    try {
      setNFTLoading(true);
      const res = await backendActor?.getcollectionwisefractionalnft(
        canisterId
      );
      // console.log("single collection nft", res);
      dispatch(getSingleCollectionNFT(res));
    } catch (err) {
      console.log("Error getting collectionwise nft (single)", err);
    } finally {
      setNFTLoading(false);
    }
  };

  // Get All NFTs by collection
  const getAllCollectionWiseNFT = async (collectionIds) => {
    if (collectionIds) {
      try {
        setNFTLoading(true);
        const promises = collectionIds.map((collectionId) =>
          backendActor
            .getcollectionwisefractionalnft(collectionId)
            .then((response) => ({ collectionId, nfts: response }))
            .catch((error) => {
              console.error(
                `Error getting NFTs for collection ${collectionId}`,
                error
              );
              return { collectionId, nfts: [], error };
            })
        );
        const results = await Promise.all(promises);
        dispatch(getCollectionwiseNft(results));
        // console.log(results);
      } catch (err) {
        console.error("Error getting collectionwise NFT (All)", err);
      } finally {
        setNFTLoading(false);
      }
    }
  };

  // Get user NFT

  return { getAllCollectionWiseNFT, nftLoading, getSingleCollectionWiseNFT };
};

export default NFTApi;
