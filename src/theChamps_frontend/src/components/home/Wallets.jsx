/* ----------------------------------------------------------------------------------------------------- */
/*  @ Import assets.
/* ----------------------------------------------------------------------------------------------------- */
import wallet1 from "../../assets/icons/wallet-01.svg";
import wallet2 from "../../assets/icons/wallet-02.svg";
import wallet3 from "../../assets/icons/wallet-03.png";
import wallet6 from "../../assets/icons/wallet-6.svg";
import { motion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Wallets.
/* ----------------------------------------------------------------------------------------------------- */
const Wallets = () => {
  return (
    <div className="flex justify-evenly items-center max-md:items-start max-md:flex-col max-md:px-6">
      {[wallet1, wallet2, wallet3, wallet6].map((src, index) => (
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          key={index}
          src={src}
          alt={`anim${index + 1}`}
          className="max-h-12 "
        />
      ))}
    </div>
  );
};

export default Wallets;
