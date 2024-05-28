// src/components/MyFav.js
import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";
import { useParams } from "react-router";
import { useCanister, useBalance, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { InfinitySpin, TailSpin } from "react-loader-spinner";
import { RiErrorWarningLine } from "react-icons/ri";
import IconWrapper from "../common/IconWrapper";
import placeHolderImg from "../../assets/CHAMPS.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyFav = () => {
  const { isConnected, principal } = useConnect();
  const { id } = useParams();
  const [backend] = useCanister("backend");
  const [productInFavourites, setProductInFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [assets] = useBalance();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const userInfo = useSelector((state) => state.auth);
  const user = userInfo.userPlugPrincipal;

  const defaultPrincipal = Principal.fromText(user);

  useEffect(() => {
    const getUsersFractionNFT = async () => {
      try {
        const res = await backend.getallfractionalnfts();
        const favouritesRes = await backend.getfavourites();
        console.log("user product", res);
        console.log("user fav", favouritesRes);

        const favouriteProducts = res.filter((product) =>
          favouritesRes.some((fav) => fav[0].id === product[1].nft.id)
        );

        if (favouritesRes.length > 0) {
          setProductInFavourite(true);
        }

        setFilteredProduct(favouriteProducts);
        setLoading2(false);
        console.log("Favourite Products", favouriteProducts);
      } catch (error) {
        console.log("Error while fetching user NFT", error);
      }
    };

    getUsersFractionNFT();
  }, [backend, principal]);

  const addToFavourites = async (id, productId) => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      await backend.addfavourite(canister_id, productId);
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

  const removeFavourites = async (
    id,
    productId,
    nftId,
    metadata,
    locked,
    forsale,
    listed,
    priceinusd
  ) => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      await backend.removefavourite({
        id: nftId,
        owner: canister_id,
        metadata,
        locked,
        forsale,
        listed,
        priceinusd,
      });
      toast.success("Item removed from favourites");
      // Refresh favourites
      const res = await backend.getfavourites();
      setFavourites(res);
      // Update the filtered products list after removal
      const favouriteProducts = filteredProduct.filter(
        (product) => product[1].nft.id !== nftId
      );
      setFilteredProduct(favouriteProducts);
      setProductInFavourite(favouriteProducts.length > 0);
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
      {loading2 ? (
        <div className="flex items-center h-56 justify-center">
          <InfinitySpin
            visible={true}
            width="200"
            color="#FC001E"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : filteredProduct.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredProduct.map((product, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
              style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="overflow-hidden">
                <Link
                  to={`/collections/${product[0]?.toText()}/${
                    product[1]?.nft?.id
                  }`}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    src={placeHolderImg || product[1]?.fractional_token?.logo}
                    alt=""
                    className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden"
                  />
                </Link>
              </div>
              <div className="p-2 mx-2">
                <div className="flex justify-between font-bold items-center">
                  <h2 className="text-lg font-semibold mb-2">
                    {product[1]?.fractional_token?.name}
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
                        <button
                          onClick={() =>
                            removeFavourites(
                              product[0]?.toText(),
                              product[1]?.nft?.id,
                              product[1]?.nft?.id,
                              product[1]?.nft?.metadata,
                              product[1]?.nft?.locked,
                              product[1]?.nft?.forsale,
                              product[1]?.nft?.listed,
                              product[1]?.nft?.priceinusd
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
                        <button
                          onClick={() =>
                            addToFavourites(
                              product[0]?.toText(),
                              product[1]?.nft.id
                            )
                          }
                        >
                          <CiHeart color="red" size={32} />
                        </button>
                      )}
                    </>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  <ReadMore
                    text={product[1]?.fractional_token.owner.toText() || ""}
                    maxLength={20}
                  />
                </p>
                <div className="flex justify-between mb-4">
                  <p className="mt-4 py-2 rounded-md w-[50%]">
                    {parseInt(product[1]?.fractional_token.fee) || 0}
                  </p>
                  <button
                    className="mt-4 button bg-opacity-100 text-white rounded-md w-[50%] text-md flex items-center justify-center"
                    onClick={handleBuyNow}
                  >
                    Buy now
                  </button>
                </div>
              </div>

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
          ))}
        </div>
      ) : (
        <div className="text-center mt-8 px-6 lg:px-24  flex justify-center items-center">
          <button className="px-4 py-2  bg-tr  cursor-pointer rounded-lg w-48 border border-red-500 z-[1]">
            No NFT found
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFav;
