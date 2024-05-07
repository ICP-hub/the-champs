import { useCanister } from "@connect2ic/react";
import { useState } from "react";

const CollectionApi = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setAllCollections] = useState(null);
  // Get all Collections data
  const getAllCollections = async () => {
    try {
      setIsLoading(true);
      const res = await backend.getallCollectionids();
      if (res && res.length > 0) {
        const collectionIds = res.map((coll) => coll[1]);
        const allPrincipals = collectionIds;

        const fetchPrincipalDetails = async (principal) => {
          try {
            const response = await backend.getcollectiondetails(principal);
            return { canisterId: principal.toText(), details: response };
          } catch (err) {
            console.error("Error fetching", err);
            throw err;
          }
        };

        const fetchAllPrincipalDetails = async () => {
          try {
            if (!Array.isArray(allPrincipals[0])) {
              throw new Error("allPrincipals[0] is not an array");
            }

            const promises = allPrincipals[0].map(fetchPrincipalDetails);
            const results = await Promise.all(promises);
            return results;
          } catch (error) {
            console.error("Error in fetching all principal details:", error);
            throw error;
          }
        };

        fetchAllPrincipalDetails()
          .then((data) => {
            console.log("All collection details:", data);
            setAllCollections(data);
          })
          .catch((error) => {
            console.error("Failed to fetch all data:", error);
          });
      }
    } catch (err) {
      console.error("Error fetching collectionId", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getAllCollections, isLoading, collections };
};

export default CollectionApi;
