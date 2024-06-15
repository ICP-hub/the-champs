import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IcpLogo from "../../assets/IcpLogo";
import PlaceholderImg from "../../assets/CHAMPS.png";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../../auth/useClient";

const ProductCardLg = ({ prod }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  console.log("single collection is", prod);
  const id = prod.canisterId.toText();
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [exchange, setExchange] = useState(1);
  const [loading3, setLoading3] = useState(true);
  const getCollectionWiseNft = async () => {
    try {
      const canister_id = Principal.fromText(id);
      const res = await backendActor?.getcollectionwisefractionalnft(
        canister_id
      );
      console.log("hello ss", res);
      setCollection(res);
      setImg1(res[0][0].fractional_token?.logo);
      setImg2(res[1][0].fractional_token?.logo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollectionWiseNft();
  }, [backendActor]);

  const calculateVolume = (collection) => {
    return collection
      .reduce((acc, nftArray) => {
        const nft = nftArray[0].nft;
        if (nft.listed) {
          return acc + parseFloat(nft.priceinusd);
        }
        return acc;
      }, 0)
      .toFixed(2);
  };

  const calculateListingCount = (collection) => {
    return collection.filter((nftArray) => nftArray[0].nft.listed === true)
      .length;
  };

  const calculateFloorPrice = (collection) => {
    const listedPrices = collection
      .filter((nftArray) => nftArray[0].nft.listed)
      .map((nftArray) => parseFloat(nftArray[0].price_per_share));
    return listedPrices.length > 0
      ? Math.min(...listedPrices).toFixed(3)
      : "0.00";
  };

  const getExchangeRate = async () => {
    const paymentMethod = "FiatCurrency";
    let paymentOpt = null;
    if (paymentMethod == "Cryptocurrency") {
      paymentOpt = { Cryptocurrency: null };
    } else if (paymentMethod == "FiatCurrency") {
      paymentOpt = { FiatCurrency: null };
    }
    const paymentMethod1 = "Cryptocurrency";
    let paymentOpt1 = null;
    if (paymentMethod1 == "Cryptocurrency") {
      paymentOpt1 = { Cryptocurrency: null };
    } else if (paymentMethod1 == "FiatCurrency") {
      paymentOpt1 = { FiatCurrency: null };
    }

    setLoading3(true);

    try {
      const res = await backendActor?.get_exchange_rates(
        { class: paymentOpt, symbol: "usd" }, // Assuming paymentOpt is for USD (dollar)
        { class: paymentOpt1, symbol: "icp" } // Assuming paymentOpt1 is for ICP (Internet Computer Protocol)
      );
      console.log(res);
      const exchangeRate2 =
        parseInt(res?.Ok?.rate) / Math.pow(10, res?.Ok?.metadata?.decimals);
      console.log(exchangeRate2);
      setExchange(exchangeRate2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, [backendActor]);

  const volume = calculateVolume(collection);
  const listingCount = calculateListingCount(collection);
  const floorPrice = calculateFloorPrice(collection);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // motion variants
  const imgVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1.01 },
  };
  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="flip-card-inner border-2 border__animation rounded-2xl"
      animate={isFlipped ? "back" : "front"}
      variants={flipVariants}
    >
      <div className="p-6  backface-hidden flex md:flex-row flex-col gap-6 md:gap-6 h-full">
        <div className="grid grid-cols-3 gap-4 w-full md:w-1/2">
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={prod.details.logo.data || PlaceholderImg}
              alt={prod.details.name}
              className="rounded-2xl object-cover  z-[1]"
            ></motion.img>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={img1 || PlaceholderImg}
                alt="image-1"
                className="rounded-2xl row-span-2 w-full object-cover h-full  z-[1] relative"
              ></motion.img>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={img2 || PlaceholderImg}
                alt="image-2"
                className="rounded-2xl h-full w-full  z-[1] relative"
              ></motion.img>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{prod.details.name}</h1>
                <p className="text-sm text-[#7B7583] font-normal">
                  By {prod.canisterId.toText()}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-4">
              <div className="w-1/3 md:w-1/4 text-center text-xs md:text-sm space-y-1">
                <p>AVERAGE PRICE</p>

                <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-1 gap-1 rounded-lg text-md flex items-center justify-center">
                  {" "}
                  {loading3 ? (
                    <div className=" h-6  bg-gray-100 bg-opacity-100 text-[#7B7583]  gap-1 rounded-lg  animate-pulse">
                      {" "}
                      <IcpLogo />
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <IcpLogo />
                      {(volume / listingCount / exchange).toFixed(3)}
                    </span>
                  )}
                </button>
              </div>
              <div className="w-1/3 md:w-1/4 text-center text-xs md:text-sm space-y-1">
                <p>LISTING</p>
                <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-2 rounded-lg text-md flex items-center justify-center">
                  {listingCount}
                </button>
              </div>
              <div className="w-1/3 md:w-1/4 text-center text-xs md:text-sm space-y-1">
                <p>FLOOR PRICE</p>
                <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-1 gap-1 rounded-lg text-md flex items-center justify-center">
                  {loading3 ? (
                    <div className=" h-6  bg-gray-100 bg-opacity-100 text-[#7B7583]  gap-1 rounded-lg  animate-pulse">
                      {" "}
                      <IcpLogo />
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <IcpLogo />
                      {(floorPrice / exchange).toFixed(3)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between pt-6 gap-4 text-sm w-full"
            style={{ visibility: isFlipped ? "hidden" : "visible" }}
          >
            <Link
              to={`/collection/${prod.canisterId.toText()}`}
              className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57] text-white cursor-pointer rounded-lg w-full z-[1]"
            >
              View Collection
            </Link>
            <button
              className="px-4 py-2 cursor-pointer rounded-lg w-full productcardlgborder z-[1]"
              onClick={handleCardFlip}
            >
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 absolute top-0 h-full w-full backface-hidden back flex flex-col">
        <h3 className="text-2xl font-semibold">Collection description :- </h3>

        <div>{prod.details.description}</div>
        <div className="flex justify-end w-full pt-6 gap-4 text-sm mt-auto">
          <div className="w-full md:w-1/2 flex gap-4">
            <Link
              to={`/collections/${prod.canisterId.toText()}`}
              className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57] text-white cursor-pointer rounded-lg w-full z-[1]"
            >
              View Collection
            </Link>
            <button
              className="px-4 py-2 cursor-pointer rounded-lg w-full productcardlgborder"
              onClick={handleCardFlip}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardLg;
