import React, { useState } from "react";
import MintNft from "./MintNft";
import NFTPrice from "./NFTPrice";
import UploadNFTImg from "./UploadNFTImg";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";

const HeroNFT = () => {
  const [child, setChld] = useState(<MintNft />);
  const [selected, setSelected] = useState("");
  const [backend] = useCanister("backend");
  const handeldetail = () => {
    setChld(<MintNft />);
  };

  const handlepaymentdetail = () => {
    setChld(<NFTPrice />);
  };
  const handleUpload = () => {
    setChld(<UploadNFTImg />);
  };

  // const submitForm = async () => {
  //   try {
  //     const res = await backend.FractionalizeNFt(
  //       Principal.fromText("br5f7-7uaaa-aaaaa-qaaca-cai"), // First principal argument
  //       Principal.fromText("2vxsx-fae"), // Second principal argument
  //       [
  //         {
  //           data: [101], // vec nat8
  //           key_val_data: [
  //             {
  //               key: "exampleKey3", // text
  //               val: { TextContent: "one" }, // TextContent variant
  //             },
  //           ],
  //           purpose: { Preview: null }, // purpose variant
  //         },
  //       ],
  //       123, // priceusd
  //       "text3", // text
  //       "text1", // text
  //       "text2", // text (logo, name, symbol)
  //       1, // nat8 (fee)
  //       2, // nat (decimals)
  //       3 // nat (totalSupply),
  //     );
  //     console.log("response nft submit", res);
  //   } catch (err) {
  //     console.log("Error Creating NFT", err);
  //   }
  // };

  return (
    <div className="mx-4 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl  mt-6">
      <div className="flex gap-4 rounded-t-2xl bg-gradient-to-r from-[#FC001E] to-[#FF7D57] text-white px-4 py-6 justify-between text-xl">
        <div onClick={handeldetail} className="cursor-pointer ">
          <span className="flex gap-1 max-md:text-sm max-md:font-semibold">
            1. Plan <p className="hidden md:inline-block">your lunch</p>
          </span>
        </div>
        <div onClick={handlepaymentdetail} className="cursor-pointer ">
          <span className="flex gap-1 max-md:text-sm max-md:font-semibold">
            2. Pricing <p className="hidden md:inline-block">group</p>
          </span>
        </div>
        <div onClick={handleUpload} className="cursor-pointer">
          <span className="flex gap-1 max-md:text-sm max-md:font-semibold">
            3.<p className="hidden md:inline-block">Upload & </p>Finalize
          </span>
        </div>
      </div>
      {child}
    </div>
  );
};

export default HeroNFT;
