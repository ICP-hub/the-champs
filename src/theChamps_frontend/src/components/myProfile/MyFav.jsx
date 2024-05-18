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
import { RiErrorWarningLine } from "react-icons/ri";
import IconWrapper from "../common/IconWrapper";
import placeHolderImg from "../../assets/CHAMPS.png";
import { Link } from "react-router-dom";

const MyFav = () => {
  const { isConnected, principal } = useConnect();
  const { id } = useParams();
  const [backend] = useCanister("backend");

  const [favourites, setFavourites] = useState([]);
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assets] = useBalance();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getUsersFractionNFT = async () => {
      try {
        const canister_id = Principal.fromText("2vxsx-fae");
        const res = await backend.getusersfractionnft(canister_id);
        setProduct(res);
        console.log("Favorite", res);
      } catch (error) {
        console.log("Error while fetching user NFT", error);
      }
    };

    const getFavourites = async () => {
      try {
        const res = await backend.getfavourites();
        setFavourites(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUsersFractionNFT();
    getFavourites();
  }, [backend, principal]);

  useEffect(() => {
    if (favourites.length > 0 && product.length > 0) {
      const isProductInWishlist = favourites.some(
        (item) => item[0].id === product[0]?.nft?.id && item[1].toText() === id
      );
      setProductInFavourites(isProductInWishlist);
    }
  }, [product, favourites, id]);

  const addToFavourites = async () => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      await backend.addfavourite(canister_id, parseInt(product[0]?.nft?.id));
      toast.success("Item added to favourites");
      // Refresh favourites
      const res = await backend.getfavourites();
      setFavourites(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to favourites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavourites = async () => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      await backend.removefavourite(canister_id, parseInt(product[0]?.nft?.id));
      toast.success("Item removed from favourites");
      // Refresh favourites
      const res = await backend.getfavourites();
      setFavourites(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item from favourites");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (isConnected) {
      const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
      if (icpWallet?.amount <= 0) {
        setShowModal(true);
      } else {
        toast.success("Proceeding to buy");
      }
    } else {
      toast.success("Please login first");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {product.map((product, index) => (
          <div className="">
            {" "}
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
              style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="overflow-hidden">
                <Link to={`/collections/${id}/${product[0]?.nft?.id}`}>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    src={product[0]?.fractional_token?.logo || placeHolderImg}
                    alt=""
                    className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden"
                  />
                </Link>
              </div>
              <div className="p-2 mx-2">
                <div className="flex justify-between font-bold items-center">
                  <h2 className="text-lg font-semibold mb-2">
                    {product[0]?.fractional_token?.name}
                  </h2>
                  {loading ? (
                    <TailSpin
                      height="8%"
                      width="8%"
                      color="black"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={true}
                    />
                  ) : (
                    <>
                      {productInFavourites ? (
                        <button onClick={removeFavourites}>
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
                    text={product[0]?.fractional_token?.owner?.toText() || ""}
                    maxLength={20}
                  />
                </p>
                <div className="flex justify-between mb-4">
                  <p className="mt-4 py-2 rounded-md w-[50%]">
                    {parseInt(product[0]?.fractional_token?.fee) || 0}
                  </p>
                  <button
                    className="mt-4 button bg-opacity-100 text-white rounded-md w-[50%] text-md flex items-center justify-center"
                    onClick={handleBuyNow}
                  >
                    Buy now
                  </button>
                </div>
              </div>

              {/* Modal for insufficient balance */}
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="bg-white p-4 rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
                    <IconWrapper>
                      <RiErrorWarningLine size={36} />
                    </IconWrapper>
                    <p>You don't have sufficient balance to buy this NFT.</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFav;
