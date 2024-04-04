import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <div
      className="border   rounded-xl overflow-hidden"
      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <img src={imageUrl} alt={name} className="w-full h-96 object-cover" />
      <div className="p-2 mx-2">
        <div className="flex justify-between font-bold items-center">
          <h2 className="text-lg font-semibold mb-2">{name}</h2>
          <CiHeart size={32} />
        </div>
        <p className="text-gray-500 text-sm">By TheSalvare</p>
        <div className="flex justify-between  mb-4">
          <p className="mt-4  bg-[#6D01F6] bg-opacity-100 text-white py-2 px-4 rounded-md w-[80%]">
            ${price}
          </p>
          <button className="mt-4   bg-[#6D01F6] bg-opacity-100 text-white   rounded-md w-[15%]  text-2xl flex items-center justify-center">
            {" "}
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
