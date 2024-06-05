import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";

import ProductCard from "../components/productcomponent/productCard";
import ProductCardLoader from "../components/productcomponent/ProductCardLoader";
import Searchbar from "../components/common/Searchbar";
import Card from "../components/common/Card";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductLists from "../components/productcomponent/ProductList";
import ReadMore from "../components/common/ReadMore";

import nftgeek from "../assets/icons/Nftgeek.svg";
import toniq from "../assets/icons/toniq.svg";
import placeholderImg from "../assets/CHAMPS.png";
import IcpLogo from "../assets/IcpLogo";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  const [backend] = useCanister("backend");
  const [collection, setCollection] = useState([]);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState();
  const [loading2, setLoading2] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const getCollectionDetails = async () => {
    try {
      const canister_id = Principal.fromText(id);
      const res = await backend.getcollectiondetails(canister_id);
      console.log("hello");
      setCollectionDetails(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const [itemsPerPage, setItemsPerPage] = useState(3); // Initial number of items per page

  const getCollectionWiseNft = async () => {
    try {
      const canister_id = Principal.fromText(id);
      const res = await backend.getcollectionwisefractionalnft(canister_id);
      console.log("hello");
      setCollection(res);
      setloading(false);

      // Adjust slice end value based on itemsPerPage
      setSearchResults(res.slice(0, itemsPerPage));

      if (res.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }
  };

  // Function to load more items when scrollbar reaches the bottom
  const loadMoreItems = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 3); // Increase items per page by 3
    getCollectionWiseNft(); // Fetch more items
  };

  useEffect(() => {
    getCollectionDetails();
    getCollectionWiseNft();
  }, [backend, itemsPerPage]);

  const refresh = () => {
    setSearchResults([]);
    setHasMore(true);
    getCollectionWiseNft();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = collection.filter((item) =>
      item[0].fractional_token.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

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
    return collection.filter((nftArray) => nftArray[0].nft.listed).length;
  };

  const calculateFloorPrice = (collection) => {
    const listedPrices = collection
      .filter((nftArray) => nftArray[0].nft.listed)
      .map((nftArray) => parseFloat(nftArray[0].nft.priceinusd));
    return listedPrices.length > 0
      ? Math.min(...listedPrices).toFixed(3)
      : "0.00";
  };

  const volume = calculateVolume(collection);
  const listingCount = calculateListingCount(collection);
  const floorPrice = calculateFloorPrice(collection);

  return (
    <>
      <Header />
      <div className="md:mt-44 left-0 right-0 px-6 lg:px-24">
        <div className="w-full relative">
          <img
            src={
              collectionDetails?.banner?.data
                ? collectionDetails?.banner?.data
                : placeholderImg
            }
            alt=""
            className="w-full h-60 rounded-xl object-cover"
          />
          <div className="md:flex">
            <div className="absolute md:top-32 top-0 p-4 md:mt-0 md:w-1/4 w-full md:left-16">
              <Card
                nftgeek={nftgeek}
                toniq={toniq}
                logo={collectionDetails?.logo?.data}
              />
            </div>
            <div className="right-0 md:w-[65%] md:ml-[33%] mt-64 md:mt-8">
              <h1 className="text-3xl text-left font-bold font-sans mb-4 gap-1">
                <span className="md:relative text-transparent bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
                  {collectionDetails.name}
                </span>
              </h1>
              {collectionDetails.description && (
                <div>
                  <ReadMore
                    text={collectionDetails.description}
                    maxLength={200}
                    readmore={true}
                  />
                </div>
              )}
              <div className="mt-12 md:w-2/3 flex gap-4 flex-wrap">
                <div className="w-1/4 text-center text-sm space-y-2">
                  <p>VOLUME</p>
                  <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-1 gap-1 rounded-lg text-md flex items-center justify-center">
                    <IcpLogo /> {volume}
                  </button>
                </div>
                <div className="w-1/4 text-center text-sm space-y-2">
                  <p>LISTING</p>
                  <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-1.5 rounded-lg text-md flex items-center justify-center">
                    {listingCount}
                  </button>
                </div>
                <div className="w-1/4 text-center text-sm space-y-2">
                  <p>FLOOR PRICE</p>
                  <button className="w-full bg-gray-100 bg-opacity-100 text-[#7B7583] py-1 gap-1 rounded-lg text-md flex items-center justify-center">
                    <IcpLogo /> {floorPrice}
                  </button>
                </div>
                {/* <div className="w-1/4 text-center text-sm space-y-2">
                  <p>MINTED</p>
                  <button className="w-full py-1.5 bg-gray-100 bg-opacity-100 text-[#7B7583] rounded-md text-md flex items-center justify-center">
                    184
                  </button>
                </div>
                <div className="w-1/4 text-center text-sm space-y-2">
                  <p>ROYALTIES</p>
                  <button className="w-full py-1.5 bg-gray-100 bg-opacity-100 text-[#7B7583] rounded-md text-md flex items-center justify-center">
                    184
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="left-0 right-0">
        <div>
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1 px-6 lg:px-24">
            <span className="relative text-transparent ml-2 bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div className="px-6 lg:px-24">
            <Searchbar
              grid={grid}
              setGrid={setGrid}
              gridrequired={true}
              value={searchQuery}
              handleSearch={handleSearch}
            />
          </div>
          {loading ? (
            <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-8 max-lg:grid-cols-2 mt-4 max-sm:grid-cols-1 pb-4 px-6 lg:px-24">
              {Array.from({ length: 9 }, (_, index) => (
                <ProductCardLoader key={index} />
              ))}
            </div>
          ) : (
            <>
              {grid ? (
                <InfiniteScroll
                  dataLength={searchResults.length}
                  next={loadMoreItems}
                  hasMore={hasMore}
                  loader={
                    searchResults.length == collection.length ? (
                      <div className="w-full flex items-center  mt-8 justify-center">
                        <p className="px-4 py-2  cursor-pointer  text-center rounded-lg w-48 productcardlgborder  ">
                          {" "}
                          End of the result
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center mt-8">
                        <h4 className="px-4 py-2  cursor-pointer   text-center rounded-lg w-48 productcardlgborder ">
                          Loading...
                        </h4>
                      </div>
                    )
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                  refreshFunction={refresh}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={3}
                  pullDownToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                      &#8595; Pull down to refresh
                    </h3>
                  }
                  releaseToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                      &#8593; Release to refresh
                    </h3>
                  }
                >
                  <div className="grid grid-cols-1 px-6 lg:px-24 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-4 justify-center">
                    {searchResults.map((product, index) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <div className="px-6 lg:px-24 mt-8">
                  <ProductLists product={searchResults} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
