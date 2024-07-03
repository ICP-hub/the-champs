/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { MdArrowOutward } from "react-icons/md";
import CustomButton from "../common/CustomButton";
import { Link } from "react-router-dom";
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageJ /> : Homepage bottom.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageJ = () => {
  return (
    <div className="md:p-24 max-md:p-6 flex flex-col md:gap-8 max-md:gap-4 items-center justify-center">
      <div className="flex flex-col justify-center items-center font-bold text-6xl max-[900px]:text-3xl">
        <h1>View our latest</h1>
        <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text pb-2">
          collection
        </span>
      </div>
      <p className="font-normal text-[22px] text-[#7B7583] max-[900px]:text-sm">
        Invest and manage all your NFTs at one place
      </p>
      <Link to="/collections">
        <CustomButton>
          Get Started <MdArrowOutward size={24} />
        </CustomButton>
      </Link>
    </div>
  );
};

export default HomePageJ;
