import React, { useState } from "react";
import MintNft from "./MintNft";
import NFTPrice from "./NFTPrice";
import UploadNFTImg from "./UploadNFTImg";

const HeroNFT = () => {
  const [child, setChld] = useState(<MintNft />);
  const [selected, setSelected] = useState("");
  const handeldetail = () => {
    setChld(<MintNft />);
  };

  const handlepaymentdetail = () => {
    setChld(<NFTPrice />);
  };
  const handleUpload = () => {
    setChld(<UploadNFTImg />);
  };
  return (
    <div className=" mx-4   flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl  mt-6">
      <div className="flex gap-4 rounded-t-2xl bg-gradient-to-r from-[#FC001E] to-[#FF7D57] text-white px-4 py-6 justify-between text-xl">
        <div onClick={handeldetail} className="cursor-pointer ">
          1 . <span className="hidden md:inline-block">Plan your lunch</span>
        </div>
        <div onClick={handlepaymentdetail} className="cursor-pointer ">
          2 . <span className="hidden md:inline-block"> Pricing group </span>
        </div>
        <div onClick={handleUpload} className="cursor-pointer">
          3 .{" "}
          <span className="hidden md:inline-block"> Upload & Finalize </span>
        </div>
      </div>
      {child}
    </div>
  );
};

export default HeroNFT;
