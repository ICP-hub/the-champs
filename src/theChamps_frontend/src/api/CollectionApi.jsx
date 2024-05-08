import { useCanister } from "@connect2ic/react";
import { useState } from "react";

const CollectionApi = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setAllCollections] = useState(null);

  const fetchPrincipalDetails = async (principal) => {
    try {
      const response = await backend.getcollectiondetails(principal);
      return { canisterId: principal, details: response };
    } catch (err) {
      console.error("Error fetching details for:", principal, err);
      throw err;
    }
  };

  const getAllCollections = async () => {
    setIsLoading(true);
    try {
      const res = await backend.getallCollectionids();
      if (res && res.length > 0) {
        const collectionIds = res.map((coll) => coll[1]);
        const promises = collectionIds[0].map(fetchPrincipalDetails);
        const collectionDetails = await Promise.all(promises);
        setAllCollections(collectionDetails);
      } else {
        setAllCollections([]);
      }
    } catch (err) {
      console.error("Error fetching collectionIds", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getAllCollections, isLoading, collections };
};

export default CollectionApi;
