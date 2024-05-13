/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useEffect } from "react";

import FancyHeader from "../common/FancyHeader";
import { chooseCardsData } from "../../Data/HomePageCData";

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
