/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import "react-multi-carousel/lib/styles.css";
import soccer1 from "../../assets/images/soccer-1.jpeg";
import CustomButton from "../common/CustomButton";
import { MdArrowOutward } from "react-icons/md";
import FancyHeader from "../common/FancyHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Principal } from "@dfinity/principal";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Grid, Pagination, Navigation, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import CollectionApi from "../../api/CollectionApi";
import { useEffect, useState } from "react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageB /> : Soccer collection.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageB = () => {
  const { getAllCollections, isLoading, collections } = CollectionApi();
  const [numColumns, setNumColumns] = useState(2);

  const updateBreakpoints = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setNumColumns(4);
    } else if (width >= 768) {
      setNumColumns(3);
    } else {
      setNumColumns(2);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateBreakpoints);
    updateBreakpoints();
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader
        normal="Champ's"
        fancy="Special Collection of 20 Footballers"
        small={true}
      />
      {isLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-8 gap-x-8 gap-y-8">
          {Array.from({ length: numColumns }).map((_, index) => (
            <CollectionLoader key={index} />
          ))}
        </div>
      ) : collections && collections.length === 0 ? (
        <div>No Collections Available</div>
      ) : (
        <div>
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            keyboard={{
              enabled: true,
            }}
            navigation={true}
            modules={[Grid, Pagination, Navigation, Keyboard]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
              640: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
              768: {
                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
              1024: {
                slidesPerView: 4,
                grid: {
                  rows: 2,
                  fill: "row",
                },
              },
            }}
            className="mySwiper"
          >
            {collections?.map((collection, index) => (
              <SwiperSlide key={index}>
                <Collections
                  key={index}
                  image={soccer1}
                  title={collection.data.name}
                  subtitle={collection.canister_id.toText()}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <span className="flex justify-center gap-4 py-6">
        <CustomButton>
          View collections <MdArrowOutward size={24} />{" "}
        </CustomButton>
      </span>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <Collections /> : collection card.
/* ----------------------------------------------------------------------------------------------------- */
const Collections = ({ image, title, subtitle }) => {
  return (
    <motion.div
      whileHover={{ translateY: -15 }}
      className="flex flex-col gap-4 cursor-pointer"
    >
      <img src={image} alt="image" className="rounded-2xl object-contain" />
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold line-clamp-1">{title}</h1>
        <p className="text-[15px] text-[#7B7583]">{subtitle}</p>
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <CollectionLoader /> : colletion card loader.
/* ----------------------------------------------------------------------------------------------------- */
function CollectionLoader() {
  return (
    <div className="grid grid-rows-6 gap-y-4 animate-pulse">
      <div className="skeleton row-span-4 rounded-2xl"></div>
      <div className="flex flex-col gap-2">
        <div className="skeleton rounded-md min-h-8 w-10/12"></div>
        <div className="skeleton rounded-md min-h-5 w-9/12"></div>
      </div>
    </div>
  );
}
export default HomePageB;
