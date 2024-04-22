import { motion } from "framer-motion";
// eslint-disable-next-line react/prop-types
const CustomButton = ({ children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] max-w-max rounded-full md:px-10 md:py-5 max-md:px-5 max-md:py-2 font-bold text-[17px] text-white flex items-center gap-2 justify-center"
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
