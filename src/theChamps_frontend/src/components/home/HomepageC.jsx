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
      <h1 className="font-bold text-3xl max-[900px]:text-2xl">{title}</h1>
      <p className="text-[#7B7583] text-lg">{description}</p>
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
      title: "Huge collection",
      description:
        "A collection of 890 unique Nerkos built to go beyond the digital space",
    },
    {
      imageSrc: choose2,
      title: "High quality",
      description:
        "The nerko’s collection includes dozens of rare costumes ands colorways of artist's.",
    },
    {
      imageSrc: choose3,
      title: "Top resource",
      description:
        "Tasty design resources made with care for each pixel. NFTs and game resources.",
    },
    {
      imageSrc: choose4,
      title: "Big community",
      description:
        "Be part of a community of nerko owners and create user generated items.",
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
