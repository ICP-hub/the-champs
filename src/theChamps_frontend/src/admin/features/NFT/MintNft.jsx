import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FaLastfm } from "react-icons/fa6";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Form } from "react-router-dom";

const MintNft = () => {
  const [loading, setLoading] = useState(false);
  const userid = Principal.fromText(
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  );
  const [backend] = useCanister("backend");
  const [formData, setFormData] = useState({
    nftCanisterId: "be2us-64aaa-aaaaa-qaabq-cai",
    to: userid,
    tokenowner: userid,
    metadata: {
      data: "",
      keyValData: [
        { key: "size", val: { Nat64Content: 123456 } },
        { key: "format", val: { TextContent: "JPEG" } },
        { key: "resolution", val: { Nat32Content: 1080 } },
        { key: "quality", val: { Nat8Content: 95 } },
        { key: "fileType", val: { TextContent: "image/jpeg" } },
        { key: "tag", val: { TextContent: "landscape" } },
        { key: "locationType", val: { Nat8Content: 4 } },
        { key: "logo", val: { BlobContent: "http://logo_url.com" } },
        { key: "symbol", val: { TextContent: "SYMB" } },
      ],
      purpose: "Rendered",
    },

    logo: "Additional Text 1",
    name: "Additional Text 2",
    symbol: "Additional Text 3",
    decimal: 42,
    totalsupply: 123456789,
    owner: userid,
    fee: 99,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // If the changed field is within the metadata object
    if (name.startsWith("metadata.")) {
      const updatedMetadata = {
        ...formData.metadata,
        [name.split(".")[1]]: value,
      };
      setFormData((prevData) => ({
        ...prevData,
        metadata: updatedMetadata,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await backend.FractionalizeNFt(
        formData.nftCanisterId,
        formData.to,
        formData.tokenowner,
        formData.metadata,
        formData.logo,
        formData.name,
        formData.symbol,
        parseInt(formData.decimal),
        parseInt(formData.totalsupply),
        formData.owner,
        parseInt(formData.fee)
      );

      if (result) {
        console.log("Fractionalization result:", result);
        return true;
      } else {
        console.error("Fractionalization failed:", result);
        return Promise.reject(new Error("Fractionalization failed"));
      }
    } catch (error) {
      console.error("Error fractionalizing NFT:", error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
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
            custodian*
          </label>
          <input
            type="text"
            required
            name="custodian"
            id="custodian"
            value={formData.custodian}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            creator*
          </label>
          <input
            type="text"
            required
            name="creator"
            id="creator"
            value={formData.creator}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            recipient*
          </label>
          <input
            type="text"
            required
            name="recipient"
            id="recipient"
            value={formData.recipient}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <div>
            <label
              htmlFor="metadata.data"
              className="md:text-lg text-sm font-semibold"
            >
              Metadata Data
            </label>
            <input
              type="text"
              required
              name="metadata.data"
              id="metadata.data"
              value={formData.metadata.data}
              onChange={handleChange}
              className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
            />
          </div>
          <div>
            <label
              htmlFor="metadata.key_val_data"
              className="md:text-lg text-sm font-semibold"
            >
              Metadata Key Value Data
            </label>
            <input
              type="text"
              required
              name="metadata.key_val_data"
              id="metadata.key_val_data"
              value={formData.metadata.key_val_data}
              onChange={handleChange}
              className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
            />
          </div>
          <div>
            <label
              htmlFor="metadata.purpose"
              className="md:text-lg text-sm font-semibold"
            >
              Metadata Purpose
            </label>
            <input
              type="text"
              required
              name="metadata.purpose"
              id="metadata.purpose"
              value={formData.metadata.purpose}
              onChange={handleChange}
              className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            metadataName*
          </label>
          <input
            type="text"
            required
            name="metadataName"
            id="metadataName"
            value={formData.metadataName}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            metadataDescription*
          </label>
          <input
            type="text"
            required
            name="metadataDescription"
            id="metadataDescription"
            value={formData.metadataDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Launch Name*
          </label>
          <input
            type="text"
            required
            name="metadataType"
            id="metadataType"
            value={formData.metadataType}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            amount*
          </label>
          <input
            type="number"
            required
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            decimals*
          </label>
          <input
            type="number"
            required
            name="decimals"
            id="decimals"
            value={formData.decimals}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            fee*
          </label>
          <input
            type="number"
            required
            name="fee"
            id="fee"
            value={formData.fee}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            controller*
          </label>
          <input
            type="text"
            required
            name="controller"
            id="controller"
            value={formData.controller}
            onChange={handleChange}
            className="w-full px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          />
        </div>

        {/* <div>
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
        </div> */}
        {/* <div>
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
        </div> */}
        {/* <div>
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
        </div> */}
        <div className="flex gap-4  justify-end">
          <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
            cancel
          </button>
          <button className="uppercase text-sm md:text-[16px] bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3  py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            Continue
          </button>
          <button
            onSubmit={handleSubmit}
            className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
          >
            save & next
          </button>
        </div>
      </form>
    </div>
  );
};

export default MintNft;
