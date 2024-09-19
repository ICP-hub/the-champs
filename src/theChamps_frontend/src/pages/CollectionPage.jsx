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
import CHAMPS from "../assets/CHAMPS.png";

const CollectionPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  const { backendActor } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const { getAllCollections, isLoading } = CollectionApi();
  const collectionSelector = useSelector((state) => state.collections);
  const { id } = useParams();

  useEffect(() => {
    getAllCollections().then(() => setLoading(false));
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
        className="container mx-auto min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="z-0 mt-12 p-6 md:p-8 h-full">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1">
            <span className="relative text-transparent bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          {/* <div className="px-6 lg:px-24 relative z-10">
            <Searchbar
              grid={grid}
              setGrid={setGrid}
              value={searchQuery}
              handleSearch={handleSearch}
              collection={collectionSelector.allCollections}
              setSearchResults={setSearchResults}
              setSearch={setSearch}
              setLoading={setLoading}
            />
          </div> */}

          {isLoading || loading ? (
            <div className="rounded-2xl border-2 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 p-2 gap-2">
                <div className="">
                  <img
                    src={CHAMPS}
                    alt="loading..."
                    className="rounded-l-2xl"
                  />
                </div>
                <div className="col-span-2 flex p-4 flex-col">
                  <span className="text-gray-400 animate-pulse bg-gray-400 rounded-md h-6 w-28 mb-2"></span>
                  <div className="items-center grid grid-cols-8 gap-1 mb-3">
                    <div className="animate-pulse bg-gray-600 rounded-md h-4"></div>
                    <div className="animate-pulse bg-gray-600 rounded-md h-4"></div>
                    <div className="animate-pulse bg-gray-600 rounded-md h-4"></div>
                    <div className="animate-pulse bg-gray-600 rounded-md h-4"></div>
                  </div>
                  <div className="animate-pulse bg-gray-600 rounded-md h-6 mb-2 w-20"></div>
                  <div className="animate-pulse bg-gray-400 rounded-md h-12 mb-1"></div>
                  <div className="animate-pulse bg-gray-400 rounded-md h-12"></div>
                  <div className="mt-auto animate-pulse bg-gray-300 rounded-md h-8 w-28"></div>
                </div>
              </div>
            </div>
          ) : (
            // <div className="grid lg:grid-cols-1 xl:grid-cols-1 gap-8 max-lg:grid-cols-1 mt-8 max-sm:grid-cols-1 pb-4 px-6 lg:px-24">
            //   {Array.from({ length: 2 }, (_, index) => (
            //     <ProducrCardLgLoader key={index} />
            //   ))}
            // </div>
            // <div
            //   className="container mx-auto"
            //   // animate={isFlipped ? "back" : "front"}
            //   // variants={flipVariants}
            // >
            //   <div className="border rounded-md border-black p-6 md:p-8">
            //     <div>
            //       <img
            //         src={CHAMPS}
            //         // src={collectionImg}
            //         alt="Loading.."
            //         className="rounded-2xl object-cover z-[2] h-40"
            //       ></img>
            //     </div>
            //     <div className="flex flex-col w-full h-full col-span-2">
            //       <div>
            //         <h1 className="font-bold text-2xl bg-gray-400 max-w-max text-gray-400 rounded-xl animate-pulse">
            //           product name
            //         </h1>
            //         <p className="text-sm font-normal bg-gray-400 max-w-max text-gray-400 rounded-xl animate-pulse mt-2">
            //           xxxx-xxxx-xxxx-xxxx-xxx.xxx.xx
            //         </p>
            //       </div>
            //       <p className="bg-gray-400 text-gray-400 rounded-xl animate-pulse mt-2">
            //         Lorem ipsum dolor sit amet consectetur adipisicing elit.
            //         Ducimus laborum ipsa eveniet nesciunt facere delectus
            //         dolorem tempore placeat. Numquam beatae quam dolores? Ab,
            //         magni possimus numquam dolor ipsa facilis maiores!
            //       </p>
            //       <div className="mt-auto">
            //         <span className="px-4 py-2 bg-gray-400 max-w-max text-gray-400 rounded-xl animate-pulse mt-2 flex items-center justify-center cursor-pointer  max-md:mb-4">
            //           View Collection
            //         </span>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="grid min-[948px]:grid-cols-1 gap-x-8 gap-y-8 mt-8">
              {search ? (
                searchResults?.length > 0 ? (
                  searchResults.map((prod, index) => (
                    <ProductCardLg prod={prod} key={index} />
                  ))
                ) : (
                  <div className="text-center mt-20 px-6 flex justify-center items-center">
                    <p className="px-4 py-2 cursor-pointer rounded-lg w-48 productcardlgborder z-[1]">
                      No data found
                    </p>
                  </div>
                )
              ) : collectionSelector.allCollections?.length > 0 ? (
                collectionSelector.allCollections.map((prod, index) => (
                  <ProductCardLg prod={prod} key={index} />
                ))
              ) : (
                <div className="text-center mt-20 px-6 lg:px-24 flex justify-center items-center">
                  <p className="px-4 py-2 cursor-pointer rounded-lg w-48 productcardlgborder z-[1]">
                    No data found
                  </p>
                </div>
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
