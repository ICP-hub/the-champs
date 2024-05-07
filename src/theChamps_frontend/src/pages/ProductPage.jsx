import React, { useState, useEffect } from "react";

import ProductCard from "../components/productcomponent/productCard";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Searchbar from "../components/common/Searchbar";

import nftgeek from "../assets/icons/Nftgeek.svg";
import toniq from "../assets/icons/toniq.svg";
import Card from "../components/common/Card";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link, useParams } from "react-router-dom";

import ProductLists from "../components/productcomponent/ProductList";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import ProductCardLoader from "../components/productcomponent/ProductCardLoader";
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/fc03/276b/ff0c0935ecb0638de0a4eec42156702d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mcxGbPOLeVv0g10rfnbiI8~KfxRtFmoDRgoH7C~jAZTC0s4oOxZfkuXSWyw7WGgTrc7DrVTCwlHNL~05xGaNG60eN8W7SDekpk8valQxSMHXkVu4kxiPFj~vxxHeLLSUXdBM48UB0YvTsIUedWJDB46~4JFmwwX8ieasY6aAe62evR2H3AG23i0B9Uze2CnrRI22ZIfwmDHVgFOU6Lykj00SmPnLjnYUGlDFE2n3xpwbZEyaHoaLFziudPsyYPCOs00MyzQwQCJfpBA4dEILWmvB~rxyz98Nshd~u4WEDb6w1iGde2gwkJIjFL9Ay1ImPmJ~SLO3EEt9R5y72GC6hQ__",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/5913/2795/65808d0975b07404be84d5415a3b9910?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLoZwfcesw26IArhUdil1MpCk0AYHs6LYeWcBSBwVy6tyZaWCpeWBqrwtwHghpijyZlXl0kogRDAz~S4h7ejJgA4rWIG5qpT3q0oGx6zw49wQol0EvjAzzLBw6YwumTU7PKO7hVqJ-P4hPG8zPm0ZesbhVXb1Gtt2xPgycWJKKerKVBj8hdpw2C08aLcsnxTw6wx0ONLK0gb5SxW8BZnxtJURDCX8B8yY28lBLNFs-zzdVsnzxNJ2B5jzJazDJyW-rPL0eQO3RbkyWkb7Gp0rBx22nAvOfTE8JgVglNIOL-~Mi3R2Es4416GeMswE7lRdWcfHTixoNOQHqoji1ucwA__",
  },
  {
    id: 4,
    name: "Product 1",
    price: 19.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__",
  },
  {
    id: 5,
    name: "Product 2",
    price: 29.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/fc03/276b/ff0c0935ecb0638de0a4eec42156702d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mcxGbPOLeVv0g10rfnbiI8~KfxRtFmoDRgoH7C~jAZTC0s4oOxZfkuXSWyw7WGgTrc7DrVTCwlHNL~05xGaNG60eN8W7SDekpk8valQxSMHXkVu4kxiPFj~vxxHeLLSUXdBM48UB0YvTsIUedWJDB46~4JFmwwX8ieasY6aAe62evR2H3AG23i0B9Uze2CnrRI22ZIfwmDHVgFOU6Lykj00SmPnLjnYUGlDFE2n3xpwbZEyaHoaLFziudPsyYPCOs00MyzQwQCJfpBA4dEILWmvB~rxyz98Nshd~u4WEDb6w1iGde2gwkJIjFL9Ay1ImPmJ~SLO3EEt9R5y72GC6hQ__",
  },
  {
    id: 6,
    name: "Product 3",
    price: 39.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/5913/2795/65808d0975b07404be84d5415a3b9910?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLoZwfcesw26IArhUdil1MpCk0AYHs6LYeWcBSBwVy6tyZaWCpeWBqrwtwHghpijyZlXl0kogRDAz~S4h7ejJgA4rWIG5qpT3q0oGx6zw49wQol0EvjAzzLBw6YwumTU7PKO7hVqJ-P4hPG8zPm0ZesbhVXb1Gtt2xPgycWJKKerKVBj8hdpw2C08aLcsnxTw6wx0ONLK0gb5SxW8BZnxtJURDCX8B8yY28lBLNFs-zzdVsnzxNJ2B5jzJazDJyW-rPL0eQO3RbkyWkb7Gp0rBx22nAvOfTE8JgVglNIOL-~Mi3R2Es4416GeMswE7lRdWcfHTixoNOQHqoji1ucwA__",
  },
  {
    id: 7,
    name: "Product 1",
    price: 19.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__",
  },
  {
    id: 8,
    name: "Product 2",
    price: 29.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/fc03/276b/ff0c0935ecb0638de0a4eec42156702d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mcxGbPOLeVv0g10rfnbiI8~KfxRtFmoDRgoH7C~jAZTC0s4oOxZfkuXSWyw7WGgTrc7DrVTCwlHNL~05xGaNG60eN8W7SDekpk8valQxSMHXkVu4kxiPFj~vxxHeLLSUXdBM48UB0YvTsIUedWJDB46~4JFmwwX8ieasY6aAe62evR2H3AG23i0B9Uze2CnrRI22ZIfwmDHVgFOU6Lykj00SmPnLjnYUGlDFE2n3xpwbZEyaHoaLFziudPsyYPCOs00MyzQwQCJfpBA4dEILWmvB~rxyz98Nshd~u4WEDb6w1iGde2gwkJIjFL9Ay1ImPmJ~SLO3EEt9R5y72GC6hQ__",
  },
  {
    id: 9,
    name: "Product 3",
    price: 39.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/5913/2795/65808d0975b07404be84d5415a3b9910?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLoZwfcesw26IArhUdil1MpCk0AYHs6LYeWcBSBwVy6tyZaWCpeWBqrwtwHghpijyZlXl0kogRDAz~S4h7ejJgA4rWIG5qpT3q0oGx6zw49wQol0EvjAzzLBw6YwumTU7PKO7hVqJ-P4hPG8zPm0ZesbhVXb1Gtt2xPgycWJKKerKVBj8hdpw2C08aLcsnxTw6wx0ONLK0gb5SxW8BZnxtJURDCX8B8yY28lBLNFs-zzdVsnzxNJ2B5jzJazDJyW-rPL0eQO3RbkyWkb7Gp0rBx22nAvOfTE8JgVglNIOL-~Mi3R2Es4416GeMswE7lRdWcfHTixoNOQHqoji1ucwA__",
  },
  {
    id: 10,
    name: "Product 1",
    price: 19.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__",
  },
  {
    id: 11,
    name: "Product 2",
    price: 29.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/fc03/276b/ff0c0935ecb0638de0a4eec42156702d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mcxGbPOLeVv0g10rfnbiI8~KfxRtFmoDRgoH7C~jAZTC0s4oOxZfkuXSWyw7WGgTrc7DrVTCwlHNL~05xGaNG60eN8W7SDekpk8valQxSMHXkVu4kxiPFj~vxxHeLLSUXdBM48UB0YvTsIUedWJDB46~4JFmwwX8ieasY6aAe62evR2H3AG23i0B9Uze2CnrRI22ZIfwmDHVgFOU6Lykj00SmPnLjnYUGlDFE2n3xpwbZEyaHoaLFziudPsyYPCOs00MyzQwQCJfpBA4dEILWmvB~rxyz98Nshd~u4WEDb6w1iGde2gwkJIjFL9Ay1ImPmJ~SLO3EEt9R5y72GC6hQ__",
  },
  {
    id: 12,
    name: "Product 3",
    price: 39.99,
    imageUrl:
      " https://s3-alpha-sig.figma.com/img/5913/2795/65808d0975b07404be84d5415a3b9910?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oLoZwfcesw26IArhUdil1MpCk0AYHs6LYeWcBSBwVy6tyZaWCpeWBqrwtwHghpijyZlXl0kogRDAz~S4h7ejJgA4rWIG5qpT3q0oGx6zw49wQol0EvjAzzLBw6YwumTU7PKO7hVqJ-P4hPG8zPm0ZesbhVXb1Gtt2xPgycWJKKerKVBj8hdpw2C08aLcsnxTw6wx0ONLK0gb5SxW8BZnxtJURDCX8B8yY28lBLNFs-zzdVsnzxNJ2B5jzJazDJyW-rPL0eQO3RbkyWkb7Gp0rBx22nAvOfTE8JgVglNIOL-~Mi3R2Es4416GeMswE7lRdWcfHTixoNOQHqoji1ucwA__",
  },
  // Add more products as needed
];

const ProductPage = ({ name }) => {
  const [grid, setGrid] = useState(true);
  const [backend] = useCanister("backend");
  const [collection, setCollection] = useState("");
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState();
  const [loading2, setLoading2] = useState();
  const [searchResults, setSearchResults] = useState(products);
  const [collectionDetails, setCollectionDetails] = useState("");

  const getCollectionDetails = async () => {
    try {
      const canister_id = Principal.fromText(id);
      const res = await backend.getcollectiondetails(canister_id);
      console.log("hello");
      setCollectionDetails(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCollectionWiseNft = async () => {
      try {
        const canister_id = Principal.fromText(id);
        const res = await backend.getcollectionwisefractionalnft(canister_id);
        console.log("hello");
        setCollection(res);
        setloading(false);
        console.log(res);
        setSearchResults(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCollectionDetails();
    getCollectionWiseNft();
  }, [backend]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = collection.filter((item) =>
      item.owner.toText().toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <>
      <Header />
      <div className=" mt-44 left-0 right-0  px-6 lg:px-24 ">
        <div className="w-full relative ">
          <img
            src="https://s3-alpha-sig.figma.com/img/ac74/2282/3c93bce880686ad33e4c8c4c5644d5e0?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qr7Oh2KsRERtw7A0vCclSNF5ddKhxj-1q~kpofC0nTvAnMk-AVqwA6kli2VfOfCOv0jvbfJqgbi8ClI8iLyBlTHSn1EXb5t3iIS-njfeAYBPUO3Ka8Vtl1zObA2iF1IzxW5Ll8hJQ~aR-xInjqC4sLsRqxXq~bhAaNmMfU9WzIEyc~PKRBynkifluczxgalTm19gla91e4~xW~xVw4RvPw1kGCtSpJyE2N9G0eXpM5YgEHf4x8TVW4XCglDiuv6V0T14IldKzt~mJ-5D1j1pcoh6SuKnK0lQmJchlSeFgbD-rPYqx8PmcRwqz2aGvj2iEvBvYTXf6h1oYLdI93QN6g__"
            alt=""
            className="w-full  h-60 rounded-xl object-cover  "
          />
          <div className="md:flex">
            <div className="absolute md:top-32 top-0 p-4 md:mt-0  md:w-1/4  w-full md:left-16">
              <Card nftgeek={nftgeek} toniq={toniq} />
            </div>
            <div className=" md:absolute right-0 md:w-[65%] mt-48 md:mt-8">
              {" "}
              <h1 className="text-3xl text-left font-bold font-sans mb-4 gap-1 ">
                <span className=" md:relative text-transparent  bg-gradient-to-r  from-[#FC001E] to-[#FF7D57] bg-clip-text">
                  {collectionDetails.name}
                </span>
              </h1>
              <div>{collectionDetails.description}</div>
              <div className="mt-12 md:w-1/2 flex gap-4  ">
                <div className=" w-1/4 text-center text-sm space-y-2">
                  <p>LISTINGS</p>
                  <button className=" w-full  button bg-opacity-100 text-white py-1   rounded-md    text-md flex items-center justify-center">
                    184
                  </button>
                </div>
                <div className=" w-1/4 text-center text-sm space-y-2">
                  <p>AVG.PRICE</p>
                  <button className=" w-full  button bg-opacity-100 text-white py-1   rounded-md    text-md flex items-center justify-center">
                    184
                  </button>
                </div>
                <div className=" w-1/4 text-center text-sm space-y-2">
                  <p>MINTED</p>
                  <button className=" w-full button bg-opacity-100 text-white py-1   rounded-md    text-md flex items-center justify-center">
                    184
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-64 left-0 right-0  ">
        <div className=" z-0 ">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1  px-6 lg:px-24 ">
            <span className="relative  text-transparent ml-2 bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div className="  search-bar  px-6 lg:px-24 relative z-10">
            <Searchbar
              grid={grid}
              setGrid={setGrid}
              gridrequired={true}
              value={searchQuery}
              handleSearch={handleSearch}
            />
          </div>
          {loading ? (
            <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-8 max-lg:grid-cols-2 mt-4 max-sm:grid-cols-1 pb-4   px-6 lg:px-24">
              {Array.from({ length: 9 }, (_, index) => (
                <ProductCardLoader key={index} />
              ))}
            </div>
          ) : (
            <>
              {grid ? (
                <div className="grid grid-cols-1  px-6 lg:px-24  sm:grid-cols-2  lg:grid-cols-3  gap-12 mt-4 justify-center">
                  {searchResults.map((product, index) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className=" px-6 lg:px-24 mt-8">
                  <ProductLists />
                </div>
              )}
            </>
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
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
