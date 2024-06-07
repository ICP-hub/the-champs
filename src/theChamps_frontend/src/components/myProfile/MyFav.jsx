// src/components/MyFav.js
import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart, CiSearch } from "react-icons/ci";
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
import ProductCardLoader from "../productcomponent/ProductCardLoader";
import IcpLogo from "../../assets/IcpLogo";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoHeartFill } from "react-icons/go";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [favChanged, setFavChanged] = useState(false);
  const [favMatched, setFavMatched] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  const getUsersFractionNFT = async () => {
    try {
      const res = await backend.getallfractionalnfts();
      const favouritesRes = await backend.getfavourites();
      console.log("user product", res);
      console.log("user fav", favouritesRes);

      const favouriteProducts = res.filter((product) =>
        favouritesRes.some(
          (fav) =>
            fav[0].id === product[1].nft.id &&
            fav[0]?.owner.toText() === product[1]?.nft?.owner.toText()
        )
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

  useEffect(() => {
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
        owner: Principal?.fromText(principal),
        metadata: metadata,
        locked: locked,
        priceinusd: priceinusd,
        forsale: forsale,
        listed: listed,
      };

      const res = await backend.removefavourite([
        { ...item, id: BigInt(parseInt(productId)) },
        canister,
      ]);

      if (res === "Favourite removed") {
        toast.success("Item removed from favourites");
        getUsersFractionNFT();
      }
      console.log(res);
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

  const handleSearch = (e) => {
    setSearch(true);
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = filteredProduct.filter((item) =>
      item[1]?.fractional_token?.name
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const displayProducts = search ? searchResults : filteredProduct;
  const loadMoreItems = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 9);
  };
  return (
    <>
      <div className="flex text-xl mb-6 items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-1">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search Our NFTs"
          className="bg-transparent outline-none w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        {loading2 ? (
          <div className="grid lg:grid-cols-3  gap-4  mb-4 xl:grid-cols-3  max-lg:grid-cols-2  max-sm:grid-cols-1 ">
            {Array.from({ length: 9 }, (_, index) => (
              <ProductCardLoader key={index} />
            ))}
          </div>
        ) : filteredProduct.length > 0 ? (
          <>
            <InfiniteScroll
              dataLength={displayProducts.slice(0, itemsPerPage).length}
              next={loadMoreItems}
              hasMore={displayProducts.length > itemsPerPage}
              loader={
                <div className="grid lg:grid-cols-3 mt-4 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                  {Array.from({ length: 3 }, (_, index) => (
                    <ProductCardLoader key={index} />
                  ))}
                </div>
              }
              endMessage={
                <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
                  <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 z-[1]">
                    No more NFTs found
                  </button>
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {displayProducts.map((product, index) => (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden"
                    style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="overflow-hidden">
                      <Link
                        to={`/collection/${product[0]?.toText()}/${
                          product[1]?.nft?.id
                        }`}
                      >
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          src={
                            product[1]?.fractional_token?.logo
                              ? product[1]?.fractional_token?.logo
                              : placeHolderImg
                          }
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
                        <span className="flex items-center justify-center">
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
                                      product[1]?.nft?.metadata,
                                      product[1]?.nft?.locked,
                                      product[1]?.nft?.forsale,
                                      product[1]?.nft?.listed,
                                      product[1]?.nft?.priceinusd
                                    )
                                  }
                                >
                                  <IconWrapper>
                                    <GoHeartFill size={32} />
                                  </IconWrapper>
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
                                  <IconWrapper>
                                    <CiHeart size={32} />
                                  </IconWrapper>
                                </button>
                              )}
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        <ReadMore
                          text={product[2]?.toText() || ""}
                          maxLength={20}
                        />
                      </p>
                      <div className="flex justify-between mb-4">
                        <p className="mt-4 py-2 rounded-md w-[50%] flex gap-1">
                          <IcpLogo />
                          <p>
                            {" "}
                            {parseInt(product[1]?.nft?.priceinusd) || 0}
                          </p>{" "}
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
                          <p>
                            You don't have sufficient balance to buy this NFT.
                          </p>
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
            </InfiniteScroll>
          </>
        ) : (
          <div className="text-center mt-8 px-6 lg:px-24  flex justify-center items-center">
            <button className="px-4 py-2  bg-tr  cursor-pointer rounded-lg w-48 border border-red-500 z-[1]">
              No NFT found
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyFav;
