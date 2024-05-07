import { useCanister } from "@connect2ic/react";
import { useState } from "react";

const CollectionApi = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setAllCollections] = useState(null);
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
            // console.log("All collection details:", data);
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
