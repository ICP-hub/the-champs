import ConfImg from "../assets/order_conf.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { scrollToTop } from "../components/common/BackToTop";
import { useAuth } from "../auth/useClient";
import { useState, useEffect } from "react";

const OrderConfirmation = ({ action }) => {
  const { backendActor } = useAuth();
  const navigate = useNavigate();

  const [orderConf, setOrderConf] = useState(true);

  const payment = async () => {
    try {
      setOrderConf(true);
      const value = localStorage.getItem("invoice_id");
      console.log(value);
      const res = await backendActor.processPendingTransfer(value);
      console.log("Response :", res);
      if (res.ok) {
        localStorage.removeItem("invoice_id");
      }
      setOrderConf(false);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  useEffect(() => {
    payment();
  }, [backendActor]);

  const viewOrderDetails = () => {
    navigate("/my-profile", { state: "My Collectibles" });
    scrollToTop();
  };

  if (orderConf) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="custom-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-white md:rounded-2xl px-8 py-24 max-md:flex-col gap-8 relative max-md:h-screen max-md:w-screen">
      <div className="flex flex-col items-center text-center max-md:justify-center">
        <h1 className="text-xl md:text-4xl font-black mb-2 gradient-text">
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
