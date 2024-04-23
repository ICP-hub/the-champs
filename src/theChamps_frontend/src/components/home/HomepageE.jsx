/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Setup1 from "../../assets/images/setup-1.png";
import Setup2 from "../../assets/images/setup-2.png";
import Setup3 from "../../assets/images/setup-3.png";
import { MdArrowOutward } from "react-icons/md";
import FancyHeader from "../common/FancyHeader";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageE /> : Setup section.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageE = () => {
  return (
    <div className="md:p-24 max-md:p-6">
      <FancyHeader normal="How it" fancy="works!" />
      <Setup />
    </div>
  );
};

const Setup = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 py-12 gap-x-8 gap-y-4">
        <img src={Setup1} alt="setup-1" />
        <div className="flex flex-col gap-4 lg:py-12">
          <span className="font-bold bg-gradient-to-tr from-[#fc001e] to-[#ff7d57] inline-block max-w-max text-transparent bg-clip-text">
            01
          </span>
          <h1 className="font-bold lg:text-[56px] max-lg:text-3xl">
            Setup and connect your wallet.
          </h1>
          <p className="text-[#7B7583]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit Metamask or
            any wallet ipsam temporibus.
          </p>
          <p className="text-[#7B7583]">
            Use Trust Wallet, Metamask or any wallet to connect to multiple
            chains the app.
          </p>
          <button className="cursor-pointer flex items-center gap-4 font-bold pt-6">
            Learn More
            <MdArrowOutward size={24} />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 py-12 gap-x-8 gap-y-4">
        <div className="flex flex-col gap-4 lg:py-12">
          <span className="font-bold bg-gradient-to-tr from-[#fc001e] to-[#ff7d57] inline-block max-w-max text-transparent bg-clip-text">
            02
          </span>
          <h1 className="font-bold lg:text-[56px] max-lg:text-3xl">
            Create your own digital artwork
          </h1>
          <p className="text-[#7B7583]">
            Quality comes first. we took our time to plan out everything and
            build our production pipeline for a good quality artwork's & digital
            artwork.
          </p>
          <p className="text-[#7B7583]">
            Starting the production on the procedurally generated planets and
            the smart contract for minting.
          </p>
          <button className="cursor-pointer flex items-center gap-4 font-bold pt-6">
            Learn More
            <MdArrowOutward size={24} />
          </button>
        </div>
        <img src={Setup2} alt="setup-2" className="max-md:order-first" />
      </div>
      <div className="grid md:grid-cols-2 py-12 gap-x-8 gap-y-4">
        <img src={Setup3} alt="setup-3" />
        <div className="flex flex-col gap-4 lg:py-12">
          <span className="font-bold bg-gradient-to-tr from-[#fc001e] to-[#ff7d57] inline-block max-w-max text-transparent bg-clip-text">
            03
          </span>
          <h1 className="font-bold lg:text-[56px] max-lg:text-3xl">
            Choose a platform to sell your NFT
          </h1>
          <p className="text-[#7B7583]">
            Earn ETH and BIT for all your NFTs that you sell on our marketplace.
          </p>
          <p className="text-[#7B7583]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
            doloremque a officiis quasi autem!
          </p>
          <button className="cursor-pointer flex items-center gap-4 font-bold pt-6">
            Learn More
            <MdArrowOutward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageE;
