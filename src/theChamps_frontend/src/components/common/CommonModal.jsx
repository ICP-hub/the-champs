// import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import { useAuth } from "../../auth/useClient";

const CommonModal = ({ toggleModal, tokencanisterid }) => {
  // const { isConnected, principal } = useConnect();
  const { isAuthenticated } = useAuth();
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setReceiver(e.target.value);
  };

  const handleTransferNow = async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const response = await backend.transfertokens(
          tokencanisterid,
          Principal.fromText(receiver),
          BigInt(0)
        );

        if (response.Ok) {
          toast.success("Transfer successful");
          // console.log(response);
        } else {
          toast.error("Transfer error:", response.Err);
          // console.error("Transfer error:", response.Err);
        }
      } catch (error) {
        // console.error("Error occurred during transfer:", error);
        toast.error("Error occurred during transfer");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <div className="h-screen w-screen top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent">
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
            Transfer Digital Collectible
          </h1>
          <h4 className="text-center py-4 text-lg">
            Please enter the address or Principal you want to send the Digital Collectible to
          </h4>
          <p className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] text-[0.8rem] md:text-[0.9rem] flex text-white p-3 rounded-md gap-2 md:min-w-max font-semibold">
            <RiErrorWarningFill size={20} color="white" />
            Beware, not all wallets support all token
          </p>
          <span className="flex flex-col">
            <h4 className="text-gray-400 py-4">
              Address or Principal of receiver
            </h4>
            <input
              onChange={handleChange}
              type="text"
              className="outline-none focus:outline-none border-b-2 border-gray-400"
            />
          </span>
          <div className="flex justify-end items-end pt-4 gap-4">
            <button className="px-4 py-2 rounded-md" onClick={toggleModal}>
              Back
            </button>
            <button
              className={`button px-4 py-2 rounded-md text-white ${
                loading ? "opacity-50" : ""
              }`}
              onClick={handleTransferNow}
            >
              Transfer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommonModal;
