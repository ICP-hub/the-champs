import React from "react";
import { motion } from "framer-motion";
import placeholderImg from "../../assets/CHAMPS.png";

const Card = ({ nftgeek, toniq, logo }) => {
  return (
    <>
      <div
        className="bg-white rounded-xl w-full  aspect-square overflow-hidden"
        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)" }}
      >
        <div className="w-full h-full">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            src={logo ? logo : placeholderImg}
            alt=""
            className="object-cover w-full h-full rounded-3xl p-3"
          ></motion.img>
        </div>
      </div>
    </>
  );
};

export default Card;
