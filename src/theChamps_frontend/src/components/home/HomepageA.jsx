/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import CustomButton from "../common/CustomButton";
import { MdArrowOutward } from "react-icons/md";
// Import assets
import anim1 from "../../assets/images/anim1.png";
import anim2 from "../../assets/images/anim2.png";
import anim3 from "../../assets/images/anim3.png";
import soccer1 from "../../assets/images/soccer-1-removebg.png";
import soccer2 from "../../assets/images/soccer-4-removebg.png";
import square from "../../assets/icons/square.svg";
import star from "../../assets/icons/star.svg";
import star2 from "../../assets/icons/star-02.svg";
import star3 from "../../assets/icons/star-03.svg";
import circle from "../../assets/icons/circle.svg";
import circle2 from "../../assets/icons/circle-02.svg";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useCanister, useConnect } from "@connect2ic/react";
import { useAuth } from "../../auth/useClient";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageA /> : Homepage top.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageA = () => {
  return (
    <div className="grid lg:grid-cols-2 p-6 md:p-8">
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
        Exclusive Digital Collectibles of your favourite players.
      </div>
      <div className="text-[22px] font-normal text-[#7B7583] max-[900px]:text-[16px]">
        The chance to own a unique digital collectible of the 20 best Indonesian
        Football Players.
      </div>
      <span className="mt-10">
        <Link to="/collections">
          <CustomButton>
            Buy Now <MdArrowOutward size={24} />
          </CustomButton>
        </Link>
      </span>
      <HomePageALeftCommunityCounter />
    </div>
  );
};

const HomePageALeftCommunityCounter = () => {
  // const { isConnected, principal } = useConnect();
  const { principal, backendActor } = useAuth();
  // const [backend] = useCanister("backend");
  const [NFTs, SetNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const getUsersFractionNFT = async () => {
    try {
      const res = await backendActor.getallfractionalnfts();
      SetNFTs(res);
      console.log("all nft", res[0][1]?.fractional_token.logo);
      setimg1(res[0][1]?.fractional_token?.logo);
      setimg2(res[1][1]?.fractional_token?.logo);
      setimg3(res[2][1]?.fractional_token?.logo);
    } catch (error) {
      console.log("Error while fetching user NFT", error);
    }
  };

  useEffect(() => {
    getUsersFractionNFT();
  }, [backendActor, principal]);

  return (
    <div className="flex py-6 gap-4">
      <div className="flex flex-0 items-center -space-x-1.5">
        {[soccer1, soccer2, soccer1].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`anim${index + 1}`}
            className="flex-0 w-12 h-12 bg-gradient-to-tr object-contain from-[#FC001E] to-[#FF7D57]   rounded-full ring-4 ring-offset-1 ring-white ring-offset-white  "
          />
        ))}
      </div>
      <div className="">
        {/* <p className="font-bold text-[32px]">{NFTs.length}+</p> */}
        <p className="font-bold text-[32px]">10000+</p>
        <p className="font-normal2 text-[#7B7583]">Fans</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageALeft /> : Homepage top RIGHT.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageARight = () => {
  return (
    <div className="lg:order-last order-first grid grid-rows-2 gap-y-5">
      <div className="grid grid-cols-2">
        <div className="rotate-12 relative">
          <div className="absolute h-full w-full rounded-3xl bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] shadow-[20px_20px_0px_0px_rgba(207,210,221,0.5)]"></div>
          <motion.img
            whileHover={{
              rotate: -15,
              scale: 1.1,
              x: -56,
              y: 26,
            }}
            src={soccer1}
            alt="soccer1"
            className="rounded-3xl max-lg:relative absolute bottom-0 z-10"
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
        <div className="rotate-[-10deg] relative overflow-hidden">
          <div className="absolute h-full w-full rounded-3xl bg-gradient-to-tr from-[#2b0405] to-[#2d1e23] shadow-[20px_20px_0px_0px_rgba(207,210,221,0.5)]"></div>
          <motion.img
            whileHover={{ rotate: 15, scale: 1.2, y: 10 }}
            src={soccer2}
            alt="soccer2"
            className="rounded-3xl relative h-full z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageA;
