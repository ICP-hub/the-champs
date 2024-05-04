import React from "react";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");
import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";
import { useParams } from "react-router";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";

const ProductCard = ({ product }) => {
  const { id } = useParams();
  const [backend] = useCanister("backend");
  const [favourites, setFavourites] = useState();
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState();

  const addToFavourites = async () => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      const res = await backend.addfavourite(canister_id, parseInt(product.id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  //console.log(favourites[0][1].toText(), "favourites");

  useEffect(() => {
    getFavourites();

    if (favourites != null) {
      const isProductInWishlist = favourites.some(
        (item) => item[0].id === product.id && item[1].toText() === id
      );
      setProductInFavourites(isProductInWishlist);
    }
  }, [product, favourites]);

  const removeFavourites = async () => {
    try {
      setLoading(true);
      const res = backend.removefavourite(parseInt(product.id));
      console.log("item successfully remove from favourites");
      toast.success("item successfully remove from favourites");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="border   rounded-xl overflow-hidden "
      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          src="https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__"
          alt=""
          className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden "
        ></motion.img>
      </div>
      <div className="p-2 mx-2">
        <div className="flex justify-between font-bold items-center">
          <h2 className="text-lg font-semibold mb-2">product 1</h2>
          {loading ? (
            <button>
              <TailSpin
                height="8%"
                width="8%"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            </button>
          ) : (
            <>
              {productInFavourites ? (
                <button onClick={removeFavourites}>
                  {" "}
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
                  {" "}
                  <CiHeart size={32} />
                </button>
              )}
            </>
          )}
        </div>
        <p className="text-gray-500 text-sm">
          <ReadMore text={product.owner.toText()} maxLength={20} />
        </p>
        <div className="flex justify-between  mb-4">
          <p className="mt-4    bg-opacity-100  py-2   rounded-md w-[50%]">
            $29
          </p>
          <button
            className="mt-4   button   bg-opacity-100 text-white   rounded-md w-[50%]  text-md flex items-center justify-center"
            onClick={notify}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
