import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCollectionData,
  getSingleCollectionData,
} from "../../../redux/reducers/collectionReducer";
import { getCollectionIds } from "../../../redux/reducers/nftReducer";
import { useAuth } from "../auth/useClient";

const CollectionApi = () => {
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // Get collection ids to filter collectionwisenft
  const getAllCollectionIds = async () => {
    try {
      const res = await backendActor?.getallCollectionids();
      // If the plug principal required : then return ids : remove ids[1]
      res?.map((ids) => dispatch(getCollectionIds(ids[1])));
    } catch (err) {
      // console.error("Error fetching collection IDs", err);
    }
  };

  const getSingleCollectionDetails = async (collectionId) => {
    setIsLoading(true);
    try {
      const res = await backendActor?.getcollectiondetails(collectionId);
      dispatch(getSingleCollectionData(res));
    } catch (err) {
      // console.error("Error fetching collection Details : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all Collections data
  const getAllCollections = async () => {
    setIsLoading(true);
    try {
      const res = await backendActor?.getallCollectionids();
      if (res && res.length > 0) {
        const collectionIds = res?.map((coll) => coll[1]);
        const allPrincipals = collectionIds;

        const fetchPrincipalDetails = async (principal) => {
          try {
            const response = await backendActor?.getcollectiondetails(
              principal
            );
            return { canisterId: principal, details: response };
          } catch (err) {
            // console.error("Error fetching", err);
            throw err;
          }
        };

        const fetchAllCollections = async () => {
          try {
            const promises = allPrincipals?.map((principal) =>
              fetchPrincipalDetails(principal[0])
            );
            const results = await Promise.all(promises);
            return results;
          } catch (error) {
            // console.error("Error in fetching all principal details:", error);
            throw error;
          } finally {
            setIsLoading(false);
          }
        };

        fetchAllCollections()
          .then((data) => {
            // console.log("All collection details:", data);
            dispatch(
              getAllCollectionData({
                canisterId: data?.map((i) => i.canisterId),
                allCollections: data?.map((i) => i),
                featuredCollections: data.filter(
                  (collection) => collection.details.featured
                ),
              })
              // dispatch name for nft list
            );
          })
          .catch((error) => {
            // console.error("Failed to fetch collections:", error);
          });
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      // console.error("Error fetching collectionId", err);
    }
  };

  return {
    getAllCollections,
    isLoading,
    getAllCollectionIds,
    getSingleCollectionDetails,
  };
};

export default CollectionApi;
