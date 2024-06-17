import NFIDImg from "/nfid.png";
import InternetIdentity from "/dfinity.svg";
import { motion } from "framer-motion";
import { useAuth } from "../../auth/useClient";
import { useState } from "react";

const WalletModal = ({ onModalClose }) => {
  const { login } = useAuth();
  const [hoveredId, setHoveredId] = useState(null);

  const walletOptions = [
    {
      id: "ii",
      imgSrc: InternetIdentity,
      defaultText: "Internet Identity",
    },
    {
      id: "nfid",
      imgSrc: NFIDImg,
      defaultText: "NFID",
    },
  ];

  const loginHandler = async (id) => {
    await login(id);
  };

  const animVar = {
    initial: {
      scale: 1,
    },
    hover: { scale: 1.04 },
    transition: { duration: 0.3, stiffness: 300 },
  };

  return (
    <div
      className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      onClick={onModalClose}
    >
      <div className="bg-white rounded-3xl overflow-hidden">
        {walletOptions.map((wallet) => (
          <div
            key={wallet.id}
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal close on child click
              loginHandler(wallet.id);
              onModalClose();
            }}
            onMouseEnter={() => setHoveredId(wallet.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className={`px-8 py-6 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground ${
                hoveredId === wallet.id && "button text-white"
              }`}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: hoveredId === wallet.id ? 1.04 : 1 }}
                className="flex items-center space-x-10"
              >
                <img
                  src={wallet.imgSrc}
                  className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
                />
                <span>{wallet.defaultText}</span>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
