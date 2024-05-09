import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import soccer3 from "../../assets/images/soccer-3.jpeg";
import { useState } from "react";
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
    <div className="rounded-2xl p-6 border-2 border__animation">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-2 overflow-hidden rounded-2xl">
          <motion.div
            animate={isFlipped ? "back" : "front"}
            variants={flipVariants}
            className="relative w-full h-full flip-card-inner"
          >
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={soccer3}
              alt={prod.details.name}
              className="rounded-2xl h-full w-full object-cover absolute backface-hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white backface-hidden back">
              <div className="p-4">
                <p>Collection Description</p>
              </div>
            </div>
          </motion.div>
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
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
        <div className="flex justify-between pt-6 gap-4 text-sm">
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
            {isFlipped ? "Back" : "More Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLg;
