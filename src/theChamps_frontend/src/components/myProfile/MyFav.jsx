import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart, CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";
import { useParams } from "react-router";
// import { useCanister, useBalance, useConnect } from "@connect2ic/react";
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
import { useAuth } from "../../auth/useClient";

const MyFav = () => {
  // const { isConnected, principal } = useConnect();
  // const [backend] = useCanister("backend");
  const { backendActor, isAuthenticated, principal } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [assets] = useBalance();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [favLoad, setFavLoad] = useState(false);
  const [favChanged, setFavChanged] = useState(false);
  const [exchange, setExchange] = useState(1);
  const [loading3, setLoading3] = useState(true);

  const getUsersFractionNFT = async () => {
    if (isAuthenticated) {
      try {
        const res = await backendActor?.getallfractionalnfts();
        const favouritesRes = await backendActor?.getfavourites();

        const favouriteProducts = res.filter((product) =>
          favouritesRes.some(
            (fav) =>
              fav[0].id === product[1].nft.id &&
              fav[0]?.owner.toText() === product[1]?.nft?.owner.toText()
          )
        );

        setFilteredProduct(favouriteProducts);
        setLoading2(false);
      } catch (error) {
        // console.log("Error while fetching user NFT", error);
      }
    } else {
      toast.error("please connect to wellect");
      setLoading2(false);
    }
  };

  useEffect(() => {
    getUsersFractionNFT();
  }, [backendActor, principal]);

  const handleBuyNow = () => {
    if (isAuthenticated) {
      // Review
      //   const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
      //   if (icpWallet?.amount <= 0) {
      //     setShowModal(true);
      //   } else {
      //     toast.success("Proceeding to buy");
      //   }
      // } else {
      //   toast.success("Please login first");
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

  // Fetch favorites when favChanged state changes
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setFavLoad(true);
        const res = await backendActor?.getfavourites();
        const favIds = res.map((fav) => fav[0].id);
        setFavourites(favIds);
      } catch (err) {
        // console.error("Error getting fav ", err);
      } finally {
        setFavLoad(false);
      }
    };

    fetchFavourites();
  }, [favChanged]);

  // Add or remove a favorite
  const toggleFav = async (product) => {
    try {
      setFavLoad(true);
      const nft = product[1].nft;
      if (favourites.includes(nft.id)) {
        await backendActor?.removefavourite([
          {
            ...nft,
            id: BigInt(parseInt(nft.id)),
          },
          product[0],
        ]);
        setFilteredProduct((prevProducts) =>
          prevProducts.filter((p) => p[1].nft.id !== nft.id)
        );
      } else {
        await backendActor?.addfavourite(product[0], parseInt(nft.id));
      }
    } catch (err) {
      // console.error("Error toggling fav ", err);
    } finally {
      setFavChanged((prev) => !prev);
    }
  };

  const getExchangeRate = async () => {
    const paymentMethod = "FiatCurrency";
    const paymentOpt = { FiatCurrency: null }; // Initialize directly for FiatCurrency

    const paymentMethod1 = "Cryptocurrency";
    const paymentOpt1 = { Cryptocurrency: null }; // Initialize directly for Cryptocurrency

    setLoading3(true);

    try {
      const res = await backendActor?.get_exchange_rates(
        { class: paymentOpt, symbol: "usd" }, // Assuming paymentOpt is for USD (dollar)
        { class: paymentOpt1, symbol: "icp" } // Assuming paymentOpt1 is for ICP (Internet Computer Protocol)
      );
      // console.log(res);

      if (res?.Ok?.rate) {
        const exchangeRate2 =
          parseInt(res.Ok.rate) / Math.pow(10, res.Ok.metadata.decimals);
        // console.log(exchangeRate2);
        setExchange(exchangeRate2);
      } else {
        // console.log("Failed to fetch the exchange rate");
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, [backendActor]);

  return (
    <>
      <div className="flex text-xl mb-6 items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-1">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search our Digital Collectibles"
          className="bg-transparent outline-none w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        {loading2 ? (
          <div className="grid lg:grid-cols-3 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
                          {product[1]?.fractional_token[0][1].Text}
                        </h2>
                        <span className="flex items-center justify-center">
                          {favLoad ? (
                            <TailSpin
                              height="30px"
                              width="30px"
                              color="black"
                              ariaLabel="tail-spin-loading"
                              radius="1"
                              visible={true}
                            />
                          ) : (
                            <button onClick={() => toggleFav(product)}>
                              {favourites.includes(product[1].nft.id) ? (
                                <IconWrapper>
                                  <GoHeartFill size={32} />
                                </IconWrapper>
                              ) : (
                                <IconWrapper>
                                  <CiHeart size={32} />
                                </IconWrapper>
                              )}
                            </button>
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
                        {loading3 ? (
                          <div className="h-10 mt-4 w-[50px] bg-gray-100 rounded-2xl animate-pulse"></div>
                        ) : (
                          <p className="mt-4 py-2 rounded-md w-[50%] flex gap-1">
                            <IcpLogo />
                            <p>
                              {" "}
                              {(product[1]?.price_per_share / exchange).toFixed(
                                3
                              ) || 0}
                            </p>{" "}
                          </p>
                        )}

                        <button
                          onClick={handleBuyNow}
                          className="px-4 mt-4 py-2 button text-white rounded-md hover:bg-opacity-80"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </>
        ) : (
          <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
            <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 z-[1]">
              No Collectible found
            </button>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default MyFav;
