/* ----------------------------------------------------------------------------------------------------- */
/*  @ Import assets.
/* ----------------------------------------------------------------------------------------------------- */
import wallet1 from "../../assets/icons/wallet-01.svg";
import wallet2 from "../../assets/icons/wallet-02.svg";
import wallet3 from "../../assets/icons/wallet-03.png";
import wallet6 from "../../assets/icons/wallet-6.svg";
import ckBTC from "../../assets/icons/ckBTC.png";
import icp from "../../assets/icons/icp.png";
import nft from "../../assets/icons/nft.svg";
import web3 from "../../assets/icons/web3.svg";
import plug from "../../assets/icons/plug.png";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Wallets.
/* ----------------------------------------------------------------------------------------------------- */
const Wallets = () => {
  return (
    <div className="grid md:grid-cols-5 grid-cols-3 md:px-24 max-md:px-6 gap-x-4 gap-y-6">
      {[web3, nft, icp, ckBTC, plug].map((src, index) => (
        <div className="flex items-center justify-center" key={index}>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={src}
            alt={`anim${index + 1}`}
            className="max-h-12"
          />
        </div>
      ))}
    </div>
  );
};

export default Wallets;
