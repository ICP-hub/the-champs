import ConfImg from "../assets/order_conf.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { scrollToTop } from "../components/common/BackToTop";
import { useAuth } from "../auth/useClient";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const OrderConfirmation = ({ action }) => {
  const { backendActor } = useAuth();
  const navigate = useNavigate();
  const [orderConf, setOrderConf] = useState(true);
  const hasFetched = useRef(false); // Prevent multiple API calls

  const payment = async () => {
    if (hasFetched.current) return; // Prevent duplicate execution
    hasFetched.current = true;

    if (!backendActor) {
      console.error("backendActor is null, cannot process payment");
      return;
    }

    try {
      setOrderConf(true);
      const value = localStorage.getItem("invoice_id");

      if (!value) {
        toast.error("No invoice ID found");
        return;
      }

      console.log("Processing payment for invoice:", value);
      const res = await backendActor.processPendingTransfer(value);
      console.log("Response:", res);

      if (res.ok) {
        localStorage.removeItem("invoice_id");
        setOrderConf(false);
      } else {
        toast.error("Payment processing failed.");
      }
    } catch (err) {
      toast.error("Error buying collectible");
      console.error("Error fetching details:", err);
    }
  };

  useEffect(() => {
    if (backendActor) {
      console.log("backendActor is available:", backendActor);
      payment();
    } else {
      console.warn("backendActor is not available yet");
    }
  }, [backendActor]);

  const viewOrderDetails = () => {
    navigate("/my-profile", { state: "My Collectibles" });
    scrollToTop();
  };

  if (orderConf) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="custom-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center gap-8 px-8 py-24 bg-white md:rounded-2xl max-md:flex-col max-md:h-screen max-md:w-screen">
      <div className="flex flex-col items-center text-center max-md:justify-center">
        <h1 className="mb-2 text-xl font-black md:text-4xl gradient-text">
          Your Order is Confirmed!
        </h1>
        <h2 className="text-lg font-semibold text-gray-700 md:text-2xl">
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
          className="transition-transform duration-300 bg-white rounded-full shadow-lg h-80 w-80 sm:h-96 sm:w-96 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
