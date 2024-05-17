/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Setup1 from "../../assets/images/nft-1.png";
import Setup2 from "../../assets/images/nft-2.png";
import Setup3 from "../../assets/images/nft-3.png";
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
            The initial step involves setting up and connecting your digital
            wallet to our platform. This facilitates secure storage and
            management of cryptocurrency assets, enabling seamless transactions
            within our ecosystem.
          </p>
          <button className="cursor-pointer flex items-center gap-4 font-bold pt-6 mt-auto">
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
            Discover Iconic Players NFT
          </h1>
          <p className="text-[#7B7583]">
            Upon accessing our platform, users are presented with an array of
            opportunities to explore. They can peruse through meticulously
            curated collections featuring iconic football player NFTs and
            prestigious club memberships. This process allows individuals to
            identify and engage with entities aligning with their preferences
            and interests.
          </p>
          <button className="cursor-pointer flex items-center gap-4 font-bold pt-6 mt-auto">
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
            Purchase Your Footplayer NFT
          </h1>
          <p className="text-[#7B7583]">
            Following the discovery phase, users proceed to acquire their
            desired football player NFT or club membership. This transaction is
            executed with utmost security and efficiency, wherein users select
            the desired asset, proceed to checkout, and complete the purchase
            using their connected wallet. This seamless process ensures that
            users swiftly and securely obtain ownership of their chosen assets.
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
