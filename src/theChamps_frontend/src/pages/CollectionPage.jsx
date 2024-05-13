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

const CollectionPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  const [backend] = useCanister("backend");
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState();

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const { getAllCollections, isLoading } = CollectionApi();
  const collectionSelector = useSelector((state) => state.collections);
  console.log(collectionSelector);

  useEffect(() => {
    getAllCollections();
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearch(true);
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = collectionSelector.allCollections.filter((item) =>
      item.details.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSort = () => {
    const sortedResults = [...searchResults].sort((a, b) =>
      a.details.name.localeCompare(b.details.name)
    );
    setSearchResults(sortedResults);
  };

  const handleSortByPrice = () => {
    const sortedResults = [...searchResults].sort(
      (a, b) => parseInt(a.data.created_at) - parseInt(b.data.created_at)
    );
    setSearchResults(sortedResults);
  };

  return (
    <>
      <Header />
      <motion.div
        className="mt-44 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="z-0">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1  px-6 lg:px-24 ">
            <span className="relative  text-transparent ml-2 bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div className="search-bar px-6 lg:px-24 relative z-10">
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
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8 max-lg:grid-cols-2 mt-8 max-sm:grid-cols-1 pb-4 px-6 lg:px-24">
              {Array.from({ length: 9 }, (_, index) => (
                <ProducrCardLgLoader key={index} />
              ))}
            </div>
          ) : collectionSelector.allCollections == null ? (
            <div className="text-center mt-8 px-6 lg:px-24 h-screen flex justify-center items-center">
              <button className="px-4 py-2  cursor-pointer rounded-lg w-48 productcardlgborder z-[1]">
                No collection found
              </button>
            </div>
          ) : (
            <div className="grid min-[948px]:grid-cols-2 gap-x-8 gap-y-8 mt-8 px-6 lg:px-24">
              {search ? (
                <>
                  {searchResults?.map((prod, index) => (
                    <ProductCardLg prod={prod} key={index} />
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  {collectionSelector.allCollections?.map((prod, index) => (
                    <ProductCardLg prod={prod} key={index} />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-full mt-12 gap-2 text-gray-300">
          <div className="border border-gray-400 rounded-full p-1 hover:bg-gray-400">
            <IoIosArrowBack size={20} />
          </div>
          <div className="border border-gray-400 rounded-full p-1 hover:bg-gray-400">
            <IoIosArrowForward size={20} />
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default CollectionPage;
