/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import CustomButton from "../common/CustomButton";
import { MdArrowOutward } from "react-icons/md";
// Import assets
import anim1 from "../../assets/images/anim1.png";
import anim2 from "../../assets/images/anim2.png";
import anim3 from "../../assets/images/anim3.png";
import soccer1 from "../../assets/images/soccer1.jpeg";
import soccer2 from "../../assets/images/soccer2.jpeg";
import square from "../../assets/icons/square.svg";
import star from "../../assets/icons/star.svg";
import star2 from "../../assets/icons/star-02.svg";
import star3 from "../../assets/icons/star-03.svg";
import circle from "../../assets/icons/circle.svg";
import circle2 from "../../assets/icons/circle-02.svg";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageA /> : Homepage top.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageA = () => {
  return (
    <div className="grid min-[900px]:grid-cols-2 md:p-24 max-md:p-6 mt-28">
      <HomePageALeft />
      <HomePageARight />
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageALeft /> : Homepage top LEFT.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageALeft = () => {
  return (
    <div className="flex flex-col lg:max-w-[80%] gap-4 mt-10">
      <div className="font-bold text-[55px] leading-[72px] max-[900px]:text-3xl">
        High Quality NFT Collection
      </div>
      <div className="text-[22px] font-normal text-[#7B7583] max-[900px]:text-[16px]">
        A 890 piece custom fractionalized NFTs of Indonesian football stars and
        celebrities is joining the NFT space on Champ.
      </div>
      <span className="mt-10">
        <CustomButton>
          Buy Now <MdArrowOutward size={24} />
        </CustomButton>
      </span>
      <HomePageALeftCommunityCounter />
    </div>
  );
};

const HomePageALeftCommunityCounter = () => {
  return (
    <div className="flex py-6 gap-4">
      <div className="flex flex-0 items-center -space-x-1.5">
        {[anim1, anim2, anim3].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`anim${index + 1}`}
            className="flex-0 w-12 h-12 rounded-full ring-4 ring-offset-1 ring-white ring-offset-white object-cover"
          />
        ))}
      </div>
      <div className="">
        <p className="font-bold text-[32px]">47k+</p>
        <p className="font-normal text-xs text-[#7B7583]">Community members</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageALeft /> : Homepage top RIGHT.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageARight = () => {
  return (
    <div className="max-[900px]:order-first grid grid-rows-2 gap-y-5">
      <div className="grid grid-cols-2">
        <div className="rotate-12">
          <img
            src={soccer1}
            alt="soccer1"
            className="rounded-3xl shadow-[20px_20px_0px_0px_rgba(207,210,221,0.5)]"
          />
        </div>
        <div className="flex">
          <span className="flex w-full">
            <img src={circle} alt="circle-02" className="max-h-8 max-w-8" />
          </span>
          <span className="flex w-full mt-auto">
            <img src={star3} alt="square" className="max-h-80 max-w-80" />
          </span>
          <span className="flex items-center w-full">
            <img src={star} alt="star" className="max-h-20 max-w-80" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex">
          <span className="flex items-center w-full mt-10">
            <img src={circle2} alt="circle-02" className="max-h-16 max-w-16" />
          </span>
          <span className="flex w-full">
            <img src={star2} alt="square" className="max-h-80 max-w-80" />
          </span>
          <span className="flex mt-auto w-full">
            <img src={square} alt="square" className="max-h-20 max-w-80" />
          </span>
        </div>
        <div className="rotate-[-10deg]">
          <img
            src={soccer2}
            alt="soccer2"
            className="rounded-3xl shadow-[20px_20px_0px_0px_rgba(207,210,221,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageA;
