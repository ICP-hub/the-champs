import { motion, AnimatePresence } from "framer-motion";
import { RiErrorWarningFill } from "react-icons/ri";

const CommonModal = ({ toggleModal }) => {
  return (
    <div className="h-screen w-screen top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { ease: "easeInOut", duration: 0.4 },
        }}
        className="filter-card p-6 bg-white"
      >
        <div className="flex flex-col">
          <h1 className="flex items-center justify-center text-center text-[1.3rem] py-4 font-medium">
            Transfer NFT
          </h1>
          <h4 className="text-center py-4 text-lg">
            Please enter the address or Principal you want to send the NFT to
          </h4>
          <p className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] text-[0.8rem] md:text-[0.9rem] flex text-white p-3 rounded-md gap-2 md:min-w-max font-semibold">
            <RiErrorWarningFill size={20} color="white" />
            Beware, not all wallets support all token
          </p>
          <span className="flex flex-col">
            <h4 className="text-gray=400 py-4">
              Address or Principal of receiver
            </h4>
            <input
              type="text"
              className="outline-none focus:outline-none border-b-2 border-gray-400"
            />
          </span>
          <div className="flex justify-end items-end pt-4 gap-4">
            <button className="px-4 py-2 rounded-md" onClick={toggleModal}>
              Back
            </button>
            <button className="button px-4 py-2 rounded-md text-white">
              Transfer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommonModal;
