import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";
import { useParams } from "react-router";
import { useCanister, useBalance, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import image from "../../assets/images/soccer-1.jpeg";
import { RiErrorWarningLine } from "react-icons/ri";
import IconWrapper from "../common/IconWrapper";
import placeHolderImg from "../../assets/CHAMPS.png";
import { Link } from "react-router-dom";
import IcpLogo from "../../assets/IcpLogo";
import BuyNowModal from "../common/BuyNowCard";

const ProductCard = ({ product }) => {
  const { isConnected } = useConnect();
  const { id } = useParams();
  const [backend] = useCanister("backend");

  const [favourites, setFavourites] = useState();
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [assets] = useBalance();
  const [image, setImage] = useState(product[0]?.fractional_token.logo);
  const [loading3, setLoading3] = useState(true);
  const [exchange, setExchange] = useState(1);

  const addToFavourites = async () => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      const res = await backend.addfavourite(
        canister_id,
        parseInt(product[0].nft.id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const icpWallet = assets?.find((wallet) => wallet.name === "ICP");

  const getFavourites = async () => {
    try {
      const res = await backend.getfavourites();

      setFavourites(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourites();

    if (favourites != null) {
      const isProductInWishlist = favourites.some(
        (item) => item[0].id === product[0].nft.id && item[1].toText() === id
      );
      setProductInFavourites(isProductInWishlist);
    }
  }, [product, favourites]);

  const imageHandler = () => {
    setImage(placeHolderImg);
  };

  const removeFavourites = async (
    canisterid,
    productId,
    metadata,
    locked,
    forsale,
    listed,
    priceinusd
  ) => {
    try {
      setLoading(true);
      const canister = Principal.fromText(canisterid);
      const item = {
        id: parseInt(productId),
        owner: Principal?.fromText("2vxsx-fae"),
        metadata: metadata,
        locked: locked,
        priceinusd: priceinusd,
        forsale: forsale,
        listed: listed,
      };

      await backend.removefavourite([item, canister]);
      toast.success("Item removed from favourites");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      const res = await backend.get_exchange_rates(
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
  }, [backend]);

  const handleBuyNow = () => {
    if (isConnected) {
      // Check if user has sufficient balance
      if (icpWallet?.amount <= 0) {
        setShowModal(true);
      } else {
        // Proceed with the buy now action
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div
      className="border   rounded-xl overflow-hidden "
      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="overflow-hidden ">
        <Link to={`/collection/${id}/${product[1].toText()}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            src={image}
            alt={product[0]?.fractional_token.name}
            className="rounded-t-lg  object-cover cursor-pointer overflow-hidden "
            onError={imageHandler}
          ></motion.img>
        </Link>
      </div>
      <div className="p-2 mx-2">
        <div className="flex justify-between font-bold items-center">
          <h2 className="text-lg font-semibold mb-2">
            {product[0]?.fractional_token?.name}
          </h2>

          {loading ? (
            <button className="ml-[255px]">
              <TailSpin
                height="30%"
                width="30%"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            </button>
          ) : (
            <>
              {productInFavourites ? (
                <button
                  onClick={() =>
                    removeFavourites(
                      product[1]?.toText(),
                      product[0]?.nft?.id,
                      product[0]?.nft?.metadata,
                      product[0]?.nft?.locked,
                      product[0]?.nft?.forsale,
                      product[0]?.nft?.listed,
                      product[0]?.nft?.priceinusd
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 115.77 122.88"
                    width="30"
                    height="25"
                    className="gradient-icon"
                  >
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#FC001E" />
                        <stop offset="100%" stopColor="#FF7D57" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#gradient)"
                      d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"
                    />
                  </svg>
                </button>
              ) : (
                <button onClick={addToFavourites}>
                  <CiHeart size={32} />
                </button>
              )}
            </>
          )}
        </div>
        <p className="text-gray-500 text-sm">
          <ReadMore
            text={product[0]?.fractional_token?.owner?.toText()}
            maxLength={20}
          />
        </p>
        <div className="flex justify-between  mb-4">
          <p className="mt-4    bg-opacity-100  py-2  flex  gap-1 rounded-md w-[50%]">
            <IcpLogo />
            {loading3 ? (
              <div className="h-8 w-[50px] bg-gray-200 rounded animate-pulse"></div>
            ) : (
              (product[0]?.nft?.priceinusd / exchange).toFixed(3)
            )}
          </p>
          <button
            className="mt-4   button   text-white   rounded-md w-[50%]  text-md flex items-center justify-center"
            onClick={handleBuyNow} // Call handleBuyNow function when button is clicked
          >
            Buy now
          </button>
        </div>
      </div>

      {/* Modal for insufficient balance */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className=" z-10 bg-white p-4 rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
            <IconWrapper>
              <RiErrorWarningLine size={36} />
            </IconWrapper>
            <p>You don't have sufficient balance to buy this nft.</p>
            <button
              className="mt-2 px-4 py-2 button bg-blue-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
