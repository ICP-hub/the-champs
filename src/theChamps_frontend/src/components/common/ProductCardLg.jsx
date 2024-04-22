import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCardLg = ({ prod }) => {
  // motion variants
  const imgVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1.01 },
  };

  return (
    <div className="rounded-2xl p-6 border-2 border__animation">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-2 overflow-hidden rounded-2xl">
          <motion.img
            variants={imgVariants}
            initial="initial"
            whileHover="hover"
            src={prod.imageUrl}
            alt={prod.title}
            className="rounded-2xl h-full object-cover  z-[1]"
          ></motion.img>
        </div>
        <div className="grid grid-rows-2 gap-y-8">
          <div className="overflow-hidden rounded-2xl">
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={prod.image1}
              alt="image-1"
              className="rounded-2xl row-span-2 w-full object-cover h-full  z-[1] relative"
            ></motion.img>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <motion.img
              variants={imgVariants}
              initial="initial"
              whileHover="hover"
              src={prod.image2}
              alt="image-2"
              className="rounded-2xl h-full w-full  z-[1] relative"
            ></motion.img>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Name</h1>
            <p className="text-sm text-[#7B7583] font-normal">By name</p>
          </div>
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
        <div className="flex justify-between pt-6 gap-4 text-sm">
          <Link
            to="/collections/collection"
            className="px-4 py-2 bg-gradient-to-tr from-[#FC001E] flex items-center justify-center to-[#FF7D57]  text-white cursor-pointer  rounded-lg w-full z-[1]"
          >
            View Collection
          </Link>
          <button className="px-4 py-2  cursor-pointer rounded-lg w-full productcardlgborder z-[1]">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLg;
