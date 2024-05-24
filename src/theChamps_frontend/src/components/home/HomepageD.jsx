/* eslint-disable react/prop-types */
/* ----------------------------------------------------------------------------------------------------- */

import { useCanister } from "@connect2ic/react";
import { useEffect, useState } from "react";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageD /> : Counts wallet, artists, value.
/* ----------------------------------------------------------------------------------------------------- */
const dataBlocks = [
  { value: "400", label: "Total Users", unit: "k+" },
  { value: "400", label: "Total Collections", unit: "k+" },
  { value: "230", label: "Total NFTs", unit: "+" },
  { value: "3", label: "NFT sales", unit: "x" },
];

const HomePageD = () => {
  const [counts, setCounts] = useState([]);
  const [backend] = useCanister("backend");

  useEffect(() => {
    const getStat = async () => {
      try {
        const res = await backend.getallstats();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getStat();
  }, [backend]);

  useEffect(() => {
    const intervalIds = [];
    dataBlocks.forEach((block, index) => {
      let startNumber = 0;
      const targetNumber = parseFloat(block.value);
      const intervalId = setInterval(() => {
        startNumber++;
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = startNumber;
          return newCounts;
        });
        if (startNumber === targetNumber) {
          clearInterval(intervalId);
        }
      }, 10);
      intervalIds.push(intervalId);
    });
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, []);

  return (
    <div className="md:p-24 max-md:p-6 grid grid-cols-4 max-md:grid-cols-2 md:divide-x-2">
      {dataBlocks.map((block, index) => (
        <div
          key={index}
          className="p-6 flex flex-col gap-4 sm:items-center sm:justify-center"
        >
          <h1 className="font-bold text-7xl max-lg:text-3xl max-sm:text-lg">
            {counts[index]}
            {block.unit}
          </h1>
          <p className="max-lg:text-sm sm:min-w-max text-[#7B7583]">
            {block.label}
          </p>
        </div>
      ))}
    </div>
  );
};
export default HomePageD;
