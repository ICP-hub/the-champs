import ConfImg from "../assets/order_conf.svg";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { scrollToTop } from "../components/common/BackToTop";

const OrderConfirmation = ({ action }) => {
  const navigate = useNavigate();

  const viewOrderDetails = () => {
    navigate("/my-profile", { state: "My Collectibles" });
    scrollToTop();
  };
  return (
    <div className="flex justify-center items-center bg-white md:rounded-2xl px-8 py-24 max-md:flex-col gap-8 shadow-lg relative max-md:h-screen max-md:w-screen">
      <button className="absolute top-5 right-5" onClick={action}>
        <IoMdClose size={32} color="red" />
      </button>
      <div className="flex flex-col items-center text-center max-md:justify-center">
        <h1 className="text-xl md:text-4xl font-black  mb-2 gradient-text">
          Your Order is Confirmed!
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-gray-700">
          Thank You for Your Purchase!
        </h2>

        <div className="mt-6">
          <button
            className="bg-[#fc001e] text-white px-6 py-2 rounded-full shadow hover:bg-[#ff7d57] transition duration-300"
            onClick={viewOrderDetails}
          >
            View Order Details
          </button>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex justify-center"
      >
        <img
          src={ConfImg}
          alt="Order Confirmation"
          className="h-80 w-80 sm:h-96 sm:w-96 bg-white rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
