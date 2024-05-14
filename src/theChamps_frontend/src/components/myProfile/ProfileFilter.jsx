import { FiFilter } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
const ProfileFilter = () => {
  const controls = useAnimation();

  const openMenu = () => {
    controls.start({ x: -100 });
  };

  return (
    <div className="px-4 items-center relative">
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] p-2 rounded-md cursor-pointer"
        onClick={openMenu}
      >
        <FiFilter size={28} color="white" />
      </motion.div>
      <motion.div animate={controls} className="absolute bg-white p-4">
        filter
      </motion.div>
      {/* <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer">
        <div className="flex items-center border bg-white relative md:rounded-md border-gray-400 rounded-full cursor-pointer -z-10">
          <span className="relative p-[6px] rounded-l-md">
            <TfiFilter size={24} color="white" />
            <span className="absolute top-0 bottom-0 right-0 left-0 max-md:rounded-md bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] md:rounded-l-md -z-10"></span>
          </span>
          <div className="rounded-r-md hidden px-2 md:flex h-full">
            <span className="text-sm font-medium italic">Filter</span>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
};

export default ProfileFilter;
