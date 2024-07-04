import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Searchbar from "../components/common/Searchbar";
import ProductCardLg from "../components/common/ProductCardLg1";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import { useCanister } from "@connect2ic/react";
import ProducrCardLgLoader from "../components/productcomponent/ProducrCardLgLoader";
import CollectionApi from "../api/CollectionApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useAuth } from "../auth/useClient";

const CollectionPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const { getAllCollections, isLoading } = CollectionApi();
  const collectionSelector = useSelector((state) => state.collections);
  const { id } = useParams();

  useEffect(() => {
    getAllCollections();
    setLoading(false);
  }, [backendActor]);

  const handleSearch = (e) => {
    setSearch(true);
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = collectionSelector.allCollections.filter((item) =>
      item.details.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

   

  return (
    <>
      <Header />
      <motion.div
        className="left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="z-0 mt-24">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1  px-6 lg:px-24 ">
            <span className="relative  text-transparent ml-2 bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div className="  px-6 lg:px-24 relative z-10">
            <Searchbar
              grid={grid}
              setGrid={setGrid}
              value={searchQuery}
              handleSearch={handleSearch}
              collection={collectionSelector.allCollections}
              setSearchResults={setSearchResults}
              setSearch={setSearch}
            />
          </div>

          {isLoading ? (
            <div className="grid lg:grid-cols-1 xl:grid-cols-1 gap-8 max-lg:grid-cols-1 mt-8 max-sm:grid-cols-1 pb-4 px-6 lg:px-24">
              {Array.from({ length: 2 }, (_, index) => (
                <ProducrCardLgLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="grid min-[948px]:grid-cols-1 gap-x-8 gap-y-8 mt-8 px-6 lg:px-24">
              {search ? (
                searchResults.length > 0 ? (
                  searchResults.map((prod, index) => (
                    <ProductCardLg prod={prod} key={index} />
                  ))
                ) : (
                  <div className="text-center mt-20 px-6 lg:px-24 flex justify-center items-center">
                    <p className="px-4 py-2 cursor-pointer rounded-lg w-48 productcardlgborder z-[1]">
                      No collection found
                    </p>
                  </div>
                )
              ) : (
                collectionSelector.allCollections?.map((prod, index) => (
                  <ProductCardLg prod={prod} key={index} />
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default CollectionPage;
