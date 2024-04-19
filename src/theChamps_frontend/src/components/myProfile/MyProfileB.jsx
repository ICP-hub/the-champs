/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { FakeData } from "../../FakeProdDatbase";
import ProductCard from "../common/productcomponent/productCard";
import Searchbar from "../common/Searchbar";
import MyProfileActivity from "./MyProfileActivity";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileB /> : tab contents
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileB = ({ activeTabIndex }) => {
  // Replace the filterProducts state later
  const [filteredProducts, setFilteredProducts] = useState(FakeData);

  useEffect(() => {
    let filtered = [];

    switch (activeTabIndex) {
      // use filter method for real data : demo for now
      case "My NFTs":
        filtered = FakeData.slice(0, 3);
        break;
      case "Favorites":
        filtered = FakeData.slice(0, 6);
        break;
      case "Purchased":
        filtered = FakeData.slice(0, 8);
        break;
      default:
        filtered = FakeData;
    }

    setFilteredProducts(filtered);
  }, [activeTabIndex]);

  return (
    <div className="flex flex-col">
      <div className="mt-8">
        {" "}
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
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyProfileB;
