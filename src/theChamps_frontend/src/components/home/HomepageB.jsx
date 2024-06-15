/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import "react-multi-carousel/lib/styles.css";
import soccer1 from "../../assets/CHAMPS.png";
import CustomButton from "../common/CustomButton";
import { MdArrowOutward } from "react-icons/md";
import FancyHeader from "../common/FancyHeader";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Grid, Pagination, Navigation, Keyboard } from "swiper/modules";
import { motion } from "framer-motion";
import CollectionApi from "../../api/CollectionApi";
import { useEffect, useState } from "react";
import NFTApi from "../../api/NftApi";
import { Link } from "react-router-dom";
import NotAvailable from "../common/NotAvailable";
import { useSelector } from "react-redux";
import { useCanister } from "@connect2ic/react";
import { useAuth } from "../../auth/useClient";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageB /> : Soccer collection.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageB = () => {
  const { getAllCollectionIds } = CollectionApi();
  const [numColumns, setNumColumns] = useState(2);
  const { getAllCollectionWiseNFT } = NFTApi();
  const [finalLoading, setFinalLoading] = useState(true);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();

  const nftData = useSelector((state) => state.nftData);

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

  // Effect hook get collection onLoad;
  useEffect(() => {
    getAllCollectionIds();
  }, [backendActor]);

  // Effect : nft data fetch
  useEffect(() => {
    getAllCollectionWiseNFT(nftData.collectionIds);
    setTimeout(() => {
      setFinalLoading(false);
    }, 5000);
  }, [nftData.collectionIds, backendActor]);

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <div className="flex gap-2 max-md:flex-col justify-center">
        <FancyHeader normal="Champ's" />
        <FancyHeader fancy="featured NFTs of 20 Footballers" small />
      </div>
      {finalLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:px-8 px-2 gap-x-8 gap-y-8">
          {Array.from({ length: numColumns }).map((_, index) => (
            <CollectionLoader key={index} />
          ))}
        </div>
      ) : nftData && nftData?.collectionWiseNft === null ? (
        <NotAvailable>Featured NFT not available</NotAvailable>
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
            {nftData?.collectionWiseNft[0]?.nfts?.map((NFT, index) => (
              <SwiperSlide key={index}>
                <NFTCard
                  key={index}
                  NFT={NFT}
                  nftData={nftData.collectionIds}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <span className="flex justify-center gap-4 py-6">
        <Link to="/collection">
          <CustomButton>
            View collections <MdArrowOutward size={24} />{" "}
          </CustomButton>
        </Link>
      </span>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <NFTCard /> : collection card.
/* ----------------------------------------------------------------------------------------------------- */
const NFTCard = ({ NFT, collection, nftData }) => {
  const [image, setImage] = useState(NFT[0]?.fractional_token?.logo);
  // console.log(NFT);

  // useEffect(() => {
  //   // const img = NFT.metadata.map((item) => item.key_val_data);
  //   // console.log("This console is coming from HOMEPAGE B  NFT:", NFT);
  //   // console.log(Object.values(img));
  //   // console.log(NFT);
  // }, [NFT]);
  // console.log(NFT.nft.owner.toText());
  // console.log(NFT);
  const handleImage = () => {
    setImage(soccer1);
  };

  return (
    <Link to={`/collection/${nftData}/${NFT[1].toText()}`}>
      <motion.div
        whileHover={{ translateY: -15 }}
        className="flex flex-col gap-4 cursor-pointer"
      >
        <img
          src={image}
          alt="image"
          className="rounded-2xl object-contain"
          onError={handleImage}
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold line-clamp-1">
            {NFT[0]?.fractional_token?.name}
          </h1>
          {/* Static collection pick for now we can show featured later */}
          <p className="text-[15px] text-[#7B7583]">{NFT[1].toText()}</p>
        </div>
      </motion.div>
    </Link>
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
