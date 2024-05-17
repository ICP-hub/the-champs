import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import soccer3 from "../../assets/images/soccer-3.jpeg";
import { useState } from "react";
import IcpLogo from "../../assets/IcpLogo";
import PlaceholderImg from "../../assets/CHAMPS.png";

const ProductCardLg = ({ prod }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  // motion variants
  const imgVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1.01 },
  };
  // card flip variant
  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6 },
    },
  };

  // console.log(prod);

  return (
    <motion.div
      className="flip-card-inner border-2 border__animation rounded-2xl"
      animate={isFlipped ? "back" : "front"}
      variants={flipVariants}
    >
      <div className="p-6  backface-hidden flex md:flex-row flex-col gap-6 md:gap-6 h-full">
        <div className="grid grid-cols-3 gap-4 w-full md:w-1/2">
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={ prod.details.logo.data || PlaceholderImg}
              alt={prod.details.name}
              className="rounded-2xl object-cover  z-[1]"
            ></motion.img>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={prod.details.image || PlaceholderImg}
                alt="image-1"
                className="rounded-2xl row-span-2 w-full object-cover h-full  z-[1] relative"
              ></motion.img>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={prod.details.image || PlaceholderImg}
                alt="image-2"
                className="rounded-2xl h-full w-full  z-[1] relative"
              ></motion.img>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{prod.details.name}</h1>
                <p className="text-sm text-[#7B7583] font-normal">
                  By {prod.canisterId.toText()}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-4">
              <div className="w-1/3 md:w-1/4 text-left text-xs md:text-sm space-y-1">
                <p>VOLUME</p>
                <button className=" w-full  bg-gray-100  bg-opacity-100  text-[#7B7583] py-1  gap-1  rounded-lg   text-md flex items-center justify-center">
                  <IcpLogo /> 184
                </button>
              </div>
              <div className="w-1/3 md:w-1/4 text-left text-xs md:text-sm space-y-1">
                <p>LISTING</p>
                <button className=" w-full  bg-gray-100  bg-opacity-100  text-[#7B7583] py-2  rounded-lg    text-md flex items-center justify-center">
                  184
                </button>
              </div>
              <div className="w-1/3 md:w-1/4 text-left text-xs md:text-sm space-y-1">
                <p>FLOOR PRICE</p>
                <button className=" w-full   bg-gray-100 bg-opacity-100  text-[#7B7583] py-1 gap-1  rounded-lg    text-md flex items-center justify-center">
                  <IcpLogo /> 184
                </button>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between pt-6 gap-4 text-sm w-full"
            style={{ visibility: isFlipped ? "hidden" : "visible" }}
          >
            <Link
              to={`/collections/${prod.canisterId.toText()}`}
              className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57]  text-white cursor-pointer  rounded-lg w-full z-[1]"
            >
              View Collection
            </Link>
            <button
              className="px-4 py-2  cursor-pointer rounded-lg w-full productcardlgborder z-[1]"
              onClick={handleCardFlip}
            >
              More Info
            </button>
          </div>
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
      </div>
      <div className="p-6 absolute top-0 h-full w-full backface-hidden back flex flex-col">
        <div>Collection description</div>
        <div className="flex justify-end w-full pt-6 gap-4 text-sm mt-auto">
         <div className="w-full md:w-1/2 flex gap-4">
         <Link
            to={`/collections/${prod.canisterId.toText()}`}
            className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57]  text-white cursor-pointer  rounded-lg w-full z-[1]"
          >
            View Collection
          </Link>
          <button
            className="px-4 py-2  cursor-pointer rounded-lg w-full productcardlgborder"
            onClick={handleCardFlip}
          >
            Back
          </button>
         </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardLg;
