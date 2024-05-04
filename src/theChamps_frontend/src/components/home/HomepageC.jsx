/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect } from "react";
import choose1 from "../../assets/icons/choose-1.svg";
import choose2 from "../../assets/icons/choose-2.svg";
import choose3 from "../../assets/icons/choose-3.svg";
import choose4 from "../../assets/icons/choose-4.svg";
import FancyHeader from "../common/FancyHeader";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <ChooseCard /> : <HomePageC />
/* ----------------------------------------------------------------------------------------------------- */
const ChooseCard = ({ imageSrc, title, description, custom }) => {
  return (
    <div
      data-aos="fade-up"
      className={`border-2 rounded-2xl px-6 py-12 flex flex-col gap-8 max-md:gap-4 ${custom}  border__animation`}
    >
      <img src={imageSrc} alt="choose" className="max-h-[50px] max-w-[50px]" />
      <h1 className="font-bold text-2xl max-[900px]:text-xl">{title}</h1>
      <p className="text-[#7B7583]">{description}</p>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageC /> : Why choose us.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageC = () => {
  const chooseCardsData = [
    {
      imageSrc: choose1,
      title: "Exclusive Access to Iconic Players",
      description:
        "Gain access to a curated selection of iconic football player NFTs, representing legendary figures from past and present. Our platform offers a unique opportunity to own digital collectibles of your favorite players, immortalized on the blockchain forever.",
    },
    {
      imageSrc: choose4,
      title: "Personalized Fan Experience",
      description:
        "Tailor your fan experience to suit your preferences and interests. Customize your profile, set notifications for player auctions and club updates, and receive personalized recommendations based on your collecting habits and favorite players. Our platform puts you in control of your football journey.        ",
    },
    {
      imageSrc: choose2,
      title: "Transparent and Secure Transactions",
      description:
        "Our platform utilizes blockchain technology to ensure transparent and secure transactions. Each football player NFT is minted on the Ethereum blockchain, providing immutable ownership records and eliminating the risk of counterfeit or fraudulent activity.        ",
    },
    {
      imageSrc: choose3,
      title: "Commitment to Quality and Excellence",
      description:
        "We are committed to delivering a high-quality, user-friendly platform that exceeds your expectations. Our team of experienced developers, designers, and football enthusiasts works tirelessly to ensure that your experience on our platform is seamless, enjoyable, and rewarding. Join us and elevate your football collecting experience to new heights.        ",
    },
  ];

  return (
    <div className="md:p-24 max-md:p-6">
      <FancyHeader normal="Why" fancy="choose us?" />
      <div className="py-12 grid lg:grid-cols-4 gap-x-5 gap-y-5 sm:grid-cols-2 max-sm:grid-cols-1">
        {chooseCardsData.map((card, index) => (
          <div key={index} className="h-full max-lg:flex">
            <ChooseCard
              {...card}
              custom={index % 2 !== 0 ? "lg:mt-10" : ""}
              animation="fade-up"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageC;
