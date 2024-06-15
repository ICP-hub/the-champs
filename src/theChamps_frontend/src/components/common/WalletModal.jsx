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
            }}
            onMouseEnter={() => setHoveredId(wallet.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              whileHover={{ scale: 1.05, originX: 0 }}
              whileTap={{ scale: 1 }}
              className={`p-4 mr-24 md:mr-32 w-full font-medium text-lg flex items-center gap-4 hover:bg-foreground ${
                hoveredId === wallet.id && "button"
              }`}
            >
              <img
                src={wallet.imgSrc}
                className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
              />
              <span>{wallet.defaultText}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
