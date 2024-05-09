import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCollectionData } from "../../../redux/reducers/collectionReducer";

const CollectionApi = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setAllCollections] = useState(null);
  const dispatch = useDispatch();
  // Get all Collections data
  const getAllCollections = async () => {
    setIsLoading(true);
    try {
      const res = await backend.getallCollectionids();
      if (res && res.length > 0) {
        const collectionIds = res.map((coll) => coll[1]);
        const allPrincipals = collectionIds;

        const fetchPrincipalDetails = async (principal) => {
          try {
            const response = await backend.getcollectiondetails(principal);
            return { canisterId: principal, details: response };
          } catch (err) {
            console.error("Error fetching", err);
            throw err;
          }
        };

        const fetchAllCollections = async () => {
          try {
            const promises = allPrincipals[0].map(fetchPrincipalDetails);
            const results = await Promise.all(promises);
            return results;
          } catch (error) {
            console.error("Error in fetching all principal details:", error);
            throw error;
          } finally {
            setIsLoading(false);
          }
        };

        fetchAllCollections()
          .then((data) => {
            console.log("All collection details:", data);
            dispatch(
              getAllCollectionData({
                canisterId: data.map((i) => i.canisterId),
                allCollections: data.map((i) => i.details),
                featuredCollections: data.filter(
                  (collection) => collection.details.featured
                ),
              })
            );
            setAllCollections(data);
          })
          .catch((error) => {
            console.error("Failed to fetch collections:", error);
          });
      }
    } catch (err) {
      console.error("Error fetching collectionId", err);
    }
  };

  return { getAllCollections, isLoading, collections };
};

export default CollectionApi;
