/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { MdArrowOutward } from "react-icons/md";
import CustomButton from "../common/CustomButton";

/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageJ /> : Homepage bottom.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageJ = () => {
  return (
    <div className="md:p-24 max-md:p-6 flex flex-col md:gap-8 max-md:gap-4 items-center justify-center">
      <div className="flex flex-col justify-center items-center font-bold text-6xl max-[900px]:text-3xl">
        <h1>Let's start</h1>
        <span className="bg-gradient-to-tr from-[#2600FC] to-[#FF00EA] inline-block text-transparent bg-clip-text">
          minting
        </span>
      </div>
      <p className="font-normal text-[22px] text-[#7B7583] max-[900px]:text-sm">
        Invest and manage all your NFTs at one place
      </p>
      <CustomButton>
        Get Started <MdArrowOutward size={24} />
      </CustomButton>
    </div>
  );
};

export default HomePageJ;
