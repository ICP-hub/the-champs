import React, { useState, useEffect } from "react";

import ProductCard from "../components/productcomponent/productCard";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Searchbar from "../components/common/Searchbar";
import { FakeData } from "../FakeProdDatbase";
import ProductCardLg from "../components/common/ProductCardLg";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import MyProfileActivity from "../components/myProfile/MyProfileActivity";
import { useCanister } from "@connect2ic/react";

const CollectionPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  const [backend] = useCanister("backend");
  const [collection, setCollection] = useState("");

  useEffect(() => {
    const getAllCollection = async () => {
      try {
        console.log("hello");
        const res = await backend.getallcollections();
        setCollection(res);
        console.log(res);
      } catch {}
    };
    getAllCollection();
  }, [backend]);

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
        <div className=" z-0 ">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1  px-6 lg:px-24 ">
            <span className="relative  text-transparent ml-2 bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div className=" search-bar  px-6 lg:px-24">
            {/* sticky top-24 */}
            <Searchbar grid={grid} setGrid={setGrid} />
          </div>
          {grid ? (
            <div className="grid min-[948px]:grid-cols-2 gap-x-8 gap-y-8  mt-8 px-6 lg:px-24">
              {FakeData.map((prod, index) => (
                <ProductCardLg prod={prod} key={index} />
              ))}
            </div>
          ) : (
            <div className=" px-6 lg:px-24 mt-8">
              <MyProfileActivity />
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
