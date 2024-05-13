import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import soccer3 from "../../assets/images/soccer-3.jpeg";
import { useState } from "react";
import IcpLogo from "../../assets/IcpLogo";

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
      <div className="p-6  backface-hidden">
        <div className="grid grid-cols-3 gap-x-8">
          <div className="col-span-2 overflow-hidden rounded-2xl">
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={soccer3}
              alt={prod.details.name}
              className="rounded-2xl object-cover  z-[1]"
            ></motion.img>
          </div>
          <div className="grid grid-rows-2 gap-y-8">
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={soccer3}
                alt="image-1"
                className="rounded-2xl row-span-2 w-full object-cover h-full  z-[1] relative"
              ></motion.img>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <motion.img
                variants={imgVariants}
                initial="initial"
                whileHover="hover"
                src={soccer3}
                alt="image-2"
                className="rounded-2xl h-full w-full  z-[1] relative"
              ></motion.img>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">{prod.details.name}</h1>
              <p className="text-sm text-[#7B7583] font-normal">
                By {prod.canisterId.toText()}
              </p>
            </div>
          </div>
          <div className="mt-8   flex  w-full items-center justify-between flex-wrap ">
            <div className=" w-1/4 text-center text-sm space-y-2">
              <p>VOLUME</p>
              <button className=" w-full  bg-gray-100  bg-opacity-100  text-[#7B7583] py-1  gap-1  rounded-lg   text-md flex items-center justify-center">
                <IcpLogo /> 184
              </button>
            </div>
            <div className=" w-1/4 text-center text-sm space-y-2">
              <p>LISTING</p>
              <button className=" w-full  bg-gray-100  bg-opacity-100  text-[#7B7583] py-2  rounded-lg    text-md flex items-center justify-center">
                184
              </button>
            </div>
            <div className=" w-1/4 text-center text-sm space-y-2">
              <p>FLOOR PRICE</p>
              <button className=" w-full   bg-gray-100 bg-opacity-100  text-[#7B7583] py-1 gap-1  rounded-lg    text-md flex items-center justify-center">
                <IcpLogo /> 184
              </button>
            </div>
          </div>
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
      </div>
      <div className="p-6 absolute top-0 h-full w-full backface-hidden back flex flex-col">
        <div>Collection description</div>
        <div className="flex justify-between pt-6 gap-4 text-sm mt-auto">
          <Link
            to={`/collections/${prod.canisterId.toText()}`}
            className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57]  text-white cursor-pointer  rounded-lg w-full z-[1]"
          >y
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
    </motion.div>
  );
};

export default ProductCardLg;
