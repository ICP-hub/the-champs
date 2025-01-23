import { IoMdClose } from "react-icons/io";
import { FaExclamationTriangle } from "react-icons/fa"; // For a warning icon
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { scrollToTop } from "../components/common/BackToTop";

const OrderFailure = ({ action }) => {
  const navigate = useNavigate();

  //   const retryPurchase = () => {
  //     navigate("/retry-purchase"); // Adjust this path to your retry purchase page
  //     scrollToTop();
  //   };

  const goToHome = () => {
    navigate("/");
    scrollToTop();
  };

  return (
    <div className="flex justify-center items-center   px-8 py-24 max-md:flex-col gap-8 relative max-md:h-screen max-md:w-screen">
      {/* Uncomment this button to add a close action */}
      {/* <button className="absolute top-5 right-5" onClick={action}>
        <IoMdClose size={32} color="red" />
      </button> */}
      <div className="flex flex-col items-center text-center max-md:justify-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-red-600"
        >
          <FaExclamationTriangle size={80} />
        </motion.div>
        <h1 className="text-xl md:text-4xl font-black mb-2 gradient-text mt-4">
          Order Failed!
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-gray-700">
          We're sorry, something went wrong with your purchase.
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-4">
          Please try again or contact support if the issue persists.
        </p>

        <div className="mt-6 flex gap-4">
          {/* <button
            className="bg-[#fc001e] text-white px-6 py-2 rounded-full shadow hover:bg-[#ff7d57] transition duration-300"
            onClick={retryPurchase}
          >
            Retry Purchase
          </button> */}
          <button
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-400 transition duration-300"
            onClick={goToHome}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailure;
