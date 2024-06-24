import { motion } from "framer-motion";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
import PlugSvg from "../../assets/wallet-images/plug.png";
import NFIDSvg from "../../assets/wallet-images/nfid.png";
import StoicSvg from "../../assets/wallet-images/stoic.png";
import DfinitySvg from "../../assets/wallet-images/dfinity.svg";

const WalletModal = ({ onModalClose }) => {
  const whitelist = ["krcsw-aaaaa-aaaak-akqea-cai"];

  const handleLogin = async (loginFunction) => {
    try {
      const userObject = await loginFunction(whitelist);
      console.log(userObject);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const walletOptions = [
    { name: "Plug", image: PlugSvg, login: PlugLogin },
    { name: "NFID", image: NFIDSvg, login: NFIDLogin },
    { name: "Stoic", image: StoicSvg, login: StoicLogin },
    { name: "Internet Identity", image: DfinitySvg, login: IdentityLogin },
  ];

  const animationVar = {
    rest: {},
    hover: {
      scale: 1.05,
      originX: 0,
      background: "linear-gradient(60.27deg, #fc001e 0%, #ff7d57 100%)",
      color: "#ffffff",
    },
  };

  return (
    <div
      className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      onClick={onModalClose}
    >
      <div className="bg-white rounded-3xl overflow-hidden">
        {walletOptions.map((wallet, index) => (
          <motion.div
            key={index}
            whileHover="hover"
            whileTap="hover"
            variants={animationVar}
            className="px-8 py-3 mr-24 md:mr-32 w-full font-medium text-lg hover:bg-foreground"
            onClick={() => handleLogin(wallet.login)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={wallet.image}
                className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
                alt={`${wallet.name} logo`}
              />
              <span>{wallet.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
