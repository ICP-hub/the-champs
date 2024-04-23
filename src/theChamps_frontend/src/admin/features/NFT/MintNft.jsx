import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FaLastfm } from "react-icons/fa6";

const MintNft = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [CustomDate, setCustomDate] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const setinputcustom = () => {
    if (CustomDate == false) {
      setCustomDate(true);
    } else {
      setCustomDate(false);
    }
  };
  return (
    <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff]  dark:shadow-[#323257] rounded-t-2xl  mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Plan Your Launch</h1>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Launch Name*
          </label>
          <input
            type="text"
            required
            name=""
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Airdrop NFTs* <br />{" "}
            <span className="text-sm pt-2">
              Would you like to airdrop NFTs to anyone?
            </span>
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Collection Size* <br />{" "}
            <span className="text-sm pt-2">
              How many NFTs (in total) should be minted?
            </span>
          </label>
          <input
            type="number"
            required
            name=""
            id="name"
            value={name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Marketplace Opening* <br />{" "}
            <span className="text-sm pt-2 ">
              When would you like to open the marketplace?
            </span>
          </label>
          <div className="w-full flex items-center  mt-3 ">
            <input
              type="radio"
              name="open"
              id=""
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              Immediately when the launch starts
            </label>
          </div>
          <div className="w-full flex items-center  mt-3">
            <input
              type="radio"
              name="open"
              id=""
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              1 day after launch starts (or right when launch sells out)
            </label>
          </div>
          <div className="w-full flex items-center  mt-3">
            <input
              type="radio"
              name="open"
              id=""
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              3 days after launch starts (or right when launch sells out)
            </label>
          </div>
          <div className="w-full flex items-center  mt-3">
            <input
              type="radio"
              name="open"
              id=""
              onClick={setinputcustom}
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              Custom
            </label>{" "}
          </div>
          {CustomDate ? (
            <div className="flex mt-4 gap-2 w-full items-center">
              <input
                type="number"
                required
                name=""
                id="name"
                value={name}
                onChange={handleNameChange}
                className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
              />{" "}
              <span>In Days</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Leftovers* <br />{" "}
            <span className="text-sm pt-2">
              What would you like to do if there are unsold NFTs after the sale
              ends?
            </span>
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          >
            <option value="Save in my wallet (5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe)">
              Save in my wallet
              (5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe)
            </option>
            <option value="Burn the remaining NFTs (This would destroy unsold NFTs to reduce total supply.)">
              Burn the remaining NFTs (This would destroy unsold NFTs to reduce
              total supply.)
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Creator Share* <br />{" "}
            <span className="text-sm pt-2">
              Do you want to retain any NFTs for yourself or your team?
            </span>
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex gap-4  justify-end">
          <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
            cancel
          </button>
          <button className="uppercase text-sm md:text-[16px] bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3  py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            Continue
          </button>
          <button className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            save & next
          </button>
        </div>
      </form>
    </div>
  );
};

export default MintNft;
