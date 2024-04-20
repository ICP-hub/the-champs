/* ----------------------------------------------------------------------------------------------------- */
/*  @ Import assets.
/* ----------------------------------------------------------------------------------------------------- */
import wallet1 from "../../assets/icons/wallet-01.svg";
import wallet2 from "../../assets/icons/wallet-02.svg";
import wallet3 from "../../assets/icons/wallet-03.png";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Wallets.
/* ----------------------------------------------------------------------------------------------------- */
const Wallets = () => {
  return (
    <div className="flex gap-8 items-center justify-center max-md:items-start max-md:flex-col max-md:px-6">
      {[wallet1, wallet2, wallet3].map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`anim${index + 1}`}
          className="max-h-12 max-w-48"
        />
      ))}
    </div>
  );
};

export default Wallets;
