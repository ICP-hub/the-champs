import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FaLastfm } from "react-icons/fa6";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Form, useParams } from "react-router-dom";
import { CiSquareRemove } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

const MintNft = () => {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  console.log("canister id is ", param.slug);
  const userid = Principal.fromText(
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  );
  const canisterid = Principal.fromText(param.slug);
  const [backend] = useCanister("backend");
  const [formData, setFormData] = useState({
    nftCanisterId: canisterid,
    to: userid,
    tokenOwner: userid,
    metadata: [
      {
        data: [],
        key_val_data: [{ key: "", val: [{ nat8: 8 }] }],
        purpose: "Rendered",
      },
    ],
    _logo: "",
    _name: "",
    _symbol: "",
    _decimals: 0,
    _totalSupply: 0,
    _owner: userid,
    _fee: 0,
  });

  const handleAddMetadata = () => {
    setFormData({
      ...formData,
      metadata: [
        ...formData.metadata,
        {
          key_val_data: [{ key: "", val: "" }],
          purpose: "Preview",
          data: "",
        },
      ],
    });
  };

  const handleRemoveMetadata = (index) => {
    const updatedMetadata = [...formData.metadata];
    updatedMetadata.splice(index, 1);
    setFormData({
      ...formData,
      metadata: updatedMetadata,
    });
  };

  const handleChange = (event, index, field) => {
    const { name, value } = event.target;
    const updatedMetadata = [...formData.metadata];
    if (field) {
      updatedMetadata[index][field] = value;
    } else {
      updatedMetadata[index][name] = value;
    }
    setFormData({
      ...formData,
      metadata: updatedMetadata,
    });
  };

  const handleMetadataKeyValuePairChange = (
    event,
    index,
    subIndex,
    property
  ) => {
    const { value } = event.target;
    const updatedMetadata = [...formData.metadata];
    updatedMetadata[index].key_val_data[subIndex][property] = value;
    setFormData({
      ...formData,
      metadata: updatedMetadata,
    });
  };

  const handleAddKeyValuePair = (index) => {
    const updatedMetadata = [...formData.metadata];
    updatedMetadata[index].key_val_data.push({ key: "", val: "" });
    setFormData({
      ...formData,
      metadata: updatedMetadata,
    });
  };

  const handleRemoveKeyValuePair = (index, subIndex) => {
    const updatedMetadata = [...formData.metadata];
    updatedMetadata[index].key_val_data.splice(subIndex, 1);
    setFormData({
      ...formData,
      metadata: updatedMetadata,
    });
  };

  const saveFormData = () => {
    console.log(formData); // Send formData to the backend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Logging formData for debugging purposes

    try {
      const result = await backend.FractionalizeNFt({
        // Constructing an object to pass as an argument to backend.FractionalizeNFt
        nftCanisterId: formData.nftCanisterId,
        to: formData.to,
        tokenOwner: formData.tokenOwner,
        metadata: formData.metadata.map((data) => ({
          data: data.data,
          key_val_data: data.key_val_data[{ key: "", val: [{ nat8: 8 }] }],
          purpose: "Rendered",
        })),
        _logo: formData._logo,
        _name: formData._name,
        _symbol: formData._symbol,
        _decimals: parseInt(formData._decimals),
        _totalSupply: parseInt(formData._totalSupply),
        _owner: formData._owner,
        _fee: parseInt(formData._fee),
      });

      console.log(formData); // Logging formData again (possibly for debugging)

      if (result.Ok) {
        console.log("Fractionalization result:", result.Ok);
        // Handle successful fractionalization
      } else {
        console.error("Fractionalization failed:", result.Err);
        // Handle fractionalization failure
      }
    } catch (error) {
      console.error("Error fractionalizing NFT:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NFT Canister ID:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData.nftCanisterId}
          onChange={(e) =>
            setFormData({ ...formData, nftCanisterId: e.target.value })
          }
        />
      </label>
      <label>
        To:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
        />
      </label>
      <label>
        Token Owner:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData.tokenOwner}
          onChange={(e) =>
            setFormData({ ...formData, tokenOwner: e.target.value })
          }
        />
      </label>
      {formData.metadata.map((record, index) => (
        <div key={index}>
          <label>
            Data:
            <input
              className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
              type="text"
              value={record.data}
              onChange={(e) => handleChange(e, index, "data")}
            />
          </label>
          {record.key_val_data.map((keyValuePair, subIndex) => (
            <div key={subIndex}>
              <label>
                Key:
                <input
                  className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
                  type="text"
                  value={keyValuePair.key}
                  onChange={(e) =>
                    handleMetadataKeyValuePairChange(e, index, subIndex, "key")
                  }
                />
              </label>
              <label>
                Value:
                <input
                  className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
                  type="text"
                  value={keyValuePair.val}
                  onChange={(e) =>
                    handleMetadataKeyValuePairChange(e, index, subIndex, "val")
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveKeyValuePair(index, subIndex)}
              >
                Remove Key-Value Pair
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddKeyValuePair(index)}>
            Add Key-Value Pair
          </button>
          <button type="button" onClick={() => handleRemoveMetadata(index)}>
            Remove Metadata
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddMetadata}>
        Add Metadata
      </button>
      <label>
        Logo:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._logo}
          onChange={(e) => setFormData({ ...formData, _logo: e.target.value })}
        />
      </label>
      <label>
        Name:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._name}
          onChange={(e) => setFormData({ ...formData, _name: e.target.value })}
        />
      </label>
      <label>
        Symbol:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._symbol}
          onChange={(e) =>
            setFormData({ ...formData, _symbol: e.target.value })
          }
        />
      </label>
      <label>
        Decimal:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._decimals}
          onChange={(e) =>
            setFormData({ ...formData, _decimals: e.target.value })
          }
        />
      </label>
      <label>
        Total Supply:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._totalSupply}
          onChange={(e) =>
            setFormData({ ...formData, _totalSupply: e.target.value })
          }
        />
      </label>
      <label>
        Owner:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._owner}
          onChange={(e) => setFormData({ ...formData, _owner: e.target.value })}
        />
      </label>
      <label>
        Fee:
        <input
          className=" px-3 py-2 dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          type="text"
          value={formData._fee}
          onChange={(e) => setFormData({ ...formData, _fee: e.target.value })}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

{
  /* <div>
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
        </div> */
}
{
  /* <div>
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
        </div> */
}
{
  /* <div>
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
        </div> */
}
//         <div className="flex gap-4  justify-end">
//           {/* <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
//             cancel
//           </button>
//           <button className="uppercase text-sm md:text-[16px] bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3  py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
//             Continue
//           </button> */}
//           <button
//             type="submit"
//             className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//           >
//             save & next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default MintNft;
