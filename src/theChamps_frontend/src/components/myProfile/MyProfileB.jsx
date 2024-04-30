/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import ProductCard from "../productcomponent/productCard";
import Searchbar from "../common/Searchbar";
import MyProfileActivity from "./MyProfileActivity";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileB /> : tab contents
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileB = ({ activeTabIndex, userNFT }) => {
  // Replace the filterProducts state later
  const [filteredNFT, setFilteredNFT] = useState(null);

  useEffect(() => {
    let filtered = [];
    setFilteredNFT(filtered);
  }, [activeTabIndex]);

  return (
    <div className="flex flex-col">
      <div className="mt-8">
        <Searchbar />{" "}
      </div>
      {activeTabIndex === "Activity" ? (
        <MyProfileActivity />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-8 gap-y-8"
        >
          {userNFT?.map(
            (product) => console.log(product)
            // <ProductCard key={product.id} product={product} />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MyProfileB;
