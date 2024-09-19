/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import ProductCard from "../productcomponent/productCard";
import Searchbar from "../common/Searchbar";
import MyProfileActivity from "./MyProfileActivity";
import { motion } from "framer-motion";
import ProfileSearch from "./ProfileSearch";
import ProfileFilter from "./ProfileFilter";
import MyProfileDetails from "./MyProfileDetails";
import MyProfileNFT from "./MyProfileNft";
import MyFav from "./MyFav";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileB /> : tab contents
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileB = ({ activeTabIndex }) => {
  // Replace the filterProducts state later
  const [filteredNFT, setFilteredNFT] = useState(null);

  useEffect(() => {
    let filtered = [];
    setFilteredNFT(filtered);
  }, [activeTabIndex]);

  if (activeTabIndex === "Profile") {
    return <MyProfileDetails />;
  }

  if (activeTabIndex === "My Collectibles") {
    const filterOptions = [
      { value: "all", label: "all" },
      { value: "Newest", label: "Newest" },
      { value: "Oldest", label: "Oldest" },
    ];
    return (
      <div className="flex flex-col">
        <div className="flex w-full items-center ">
          {/* <ProfileSearch />
          <ProfileFilter filterOptions={filterOptions} /> */}
        </div>
        <MyProfileNFT />
      </div>
    );
  }

  if (activeTabIndex === "Favourites") {
    return (
      <div className="flex flex-col">
        <div className="flex w-full items-center ">
          {/* <ProfileSearch /> */}
          {/* <ProfileFilter /> */}
        </div>
        <MyFav />
      </div>
    );
  }

  if (activeTabIndex === "Activity") {
    const filterOptions = [
      { value: "all", label: "all" },
      { value: "purchase", label: "purchase" },
      { value: "sales", label: "sales" },
    ];
    return (
      <div className="flex flex-col">
        <div className="flex w-full items-center pb-4">
          {/* <ProfileSearch />
          <ProfileFilter filterOptions={filterOptions} /> */}
        </div>
        <MyProfileActivity />
      </div>
    );
  }
  // return (
  // <div className="flex flex-col">
  //   <div className="flex w-full items-center pb-4">
  //     <ProfileSearch />
  //     <ProfileFilter />
  //   </div>
  //   {activeTabIndex === "Activity" ? (
  //     <MyProfileActivity />
  //   ) : (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       transition={{ duration: 0.5 }}
  //       className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-8 gap-y-8"
  //     >
  //       {userNFT?.map(
  //         (product) => console.log(product)
  //         // <ProductCard key={product.id} product={product} />
  //       )}
  //     </motion.div>
  //   )}
  // </div>
  // );
};

export default MyProfileB;
