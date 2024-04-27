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
      const res = await backend.getallcollections();
      setAllCollections(res);
    } catch (err) {
      console.log("Error fetching getAllCollections");
    } finally {
      setIsLoading(false);
    }
  };

  return { getAllCollections, isLoading, collections };
};

export default CollectionApi;
