import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");
import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

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
          <CiHeart size={32} />
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
            {" "}
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
