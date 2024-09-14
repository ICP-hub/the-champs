/* eslint-disable react/prop-types */
/* ----------------------------------------------------------------------------------------------------- */

import { useCanister } from "@connect2ic/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useAuth } from "../../auth/useClient";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageD /> : Counts wallet, artists, value.
/* ----------------------------------------------------------------------------------------------------- */

const HomePageD = () => {
  const [dataBlocks, setDataBlocks] = useState([
    // { value: "1", label: "Total Users", unit: "k+" },
    // { value: "0", label: "Total Collections", unit: "k+" },
    // { value: "0", label: "Total NFTs", unit: "+" },
    // { value: "0", label: "NFT sales", unit: "x" },
    { value: "10000", label: "Fans", unit: "+" },
    { value: "1", label: "Total Collections" },
    { value: "100000", label: "Digital Collectibles" },
    { value: "0", label: "NFT sales" },
  ]);
  const [counts, setCounts] = useState([]);
  // const [backend] = useCanister("backend");
  // const { backendActor } = useAuth();

  // useEffect(() => {
  //   const getStat = async () => {
  //     try {
  //       const res = await backendActor?.getallstats();
  //       console.log(res);
  //       // Assuming `res` is an object with the same keys as `dataBlocks`
  //       const newBlocks = [
  //         {
  //           value: parseInt(res.totalusers).toString(),
  //           label: "Total Users",
  //           unit: "k+",
  //         },
  //         {
  //           value: parseInt(res.totalCollections).toString(),
  //           label: "Total Collections",
  //           unit: "k+",
  //         },
  //         {
  //           value: parseInt(res.totalnfts).toString(),
  //           label: "Total NFTs",
  //           unit: "+",
  //         },
  //         { value: "0", label: "NFT sales", unit: "x" },
  //       ];
  //       setDataBlocks(newBlocks);
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getStat();
  // }, [backendActor]);

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
    <div className="p-6 md:p-8 grid grid-cols-4 max-md:grid-cols-2 md:divide-x-2">
      {dataBlocks.map((block, index) => (
        <div
          key={index}
          className="p-6 flex flex-col gap-4 sm:items-center sm:justify-center"
        >
          <h1 className="font-bold text-5xl max-lg:text-3xl max-sm:text-lg">
            <CountUp end={block.value} duration={2} />
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
