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

  const submitForm = async () => {
    try {
      const res = await backend.FractionalizeNFt(
        Principal.fromText("a3shf-5eaaa-aaaaa-qaafa-cai"),
        Principal.fromText("2vxsx-fae"),
        [
          {
            data: [101],
            key_val_data: [
              {
                key: "exampleKey3",
                val: { TextContent: "one" },
              },
            ],
            purpose: { Preview: null },
          },
        ],
        "Text1",
        "Text1",
        "Text1",
        1,
        2,
        3
      );
      console.log("response nft sumbit", res);
    } catch (err) {
      console.log(err);
    }
  };

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
