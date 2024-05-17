import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FaLastfm } from "react-icons/fa6";
import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Form, useNavigate, useParams } from "react-router-dom";
import { CiSquareRemove } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscDiffAdded } from "react-icons/vsc";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { HiOutlineXMark } from "react-icons/hi2";

const initialFormValues = {
  collectionId: "",
  ownerId: "",
  metaData: [
    {
      data: [""],
      key_val_data: [
        {
          key: "",
          val: { TextContent: "" },
        },
      ],
      purpose: { Preview: null, Rendered: null },
    },
  ],
  fee: "",
  decimals: "",
  owner: "",
  logo: "",
  name: "",
  symbol: "",
};

const MintNft = () => {
  const [formData, setFormData] = useState(initialFormValues);
  const { slug } = useParams();
  const { principal } = useConnect();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageArrayBuffer, setImageArrayBuffer] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState("Preview");
  const [backend] = useCanister("backend");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : name === "fee" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const FinalData = {
      ...formData,
      collectionId: Principal.fromText(slug),
      ownerId: Principal.fromText(principal),
      owner: principal,
      metaData: [
        {
          data: imageArrayBuffer,
          key_val_data: formData.metaData[0].key_val_data,
          purpose: { [selectedPurpose]: null },
        },
      ],
      logo: selectedImage,
      decimals: 2,
      symbol: "random",
    };
    console.log(FinalData);
    try {
      const res = await backend.FractionalizeNFt(
        FinalData.collectionId,
        FinalData.ownerId,
        FinalData.metaData,
        FinalData.name,
        FinalData.owner,
        FinalData.symbol,
        FinalData.fee,
        FinalData.decimals,
        3 // This is total supply? didn't understand the meaning
      );
      console.log("NFT Created Successfully : ", res);
    } catch (err) {
      console.error("Error Creating NFT", err);
    }
  };

  const handleAddKeyVal = () => {
    const updatedMetaData = { ...formData.metaData[0] };
    updatedMetaData.key_val_data.push({ key: "", val: { TextContent: "" } });
    setFormData((prevData) => ({
      ...prevData,
      metaData: [{ ...updatedMetaData }],
    }));
  };

  const handleRemoveKeyVal = (index) => {
    const updatedMetaData = { ...formData.metaData[0] };
    updatedMetaData.key_val_data.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      metaData: [{ ...updatedMetaData }],
    }));
  };

  const handleKeyValChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedMetaData = { ...prevData.metaData[0] };
      updatedMetaData.key_val_data[index][field] = value;
      const updatedFormData = {
        ...prevData,
        metaData: [{ ...updatedMetaData }],
      };
      return updatedFormData;
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      setSelectedImage(URL.createObjectURL(file));
      const uintArray = new Uint8Array(arrayBuffer);
      const byteArray = Array.from(uintArray);
      setImageArrayBuffer(byteArray);
    };
    reader.readAsArrayBuffer(file);
  };

  const handlePurposeChange = (e) => {
    setSelectedPurpose(e.target.value);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { ease: "easeInOut" },
      }}
      className="mx-4 md:py-8 md:px-6 p-2 mt-6"
    >
      <div className="w-full flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            NFT Canister ID :
          </label>
          <input
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            type="text"
            value={slug}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Owner :
          </label>
          <input
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            type="text"
            value={principal ? principal : ""}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            NFT Name :
          </label>
          <input
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="md:text-lg text-sm font-semibold flex flex-col"
          >
            NFT Image :
          </label>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="pt-4 pb-2"
              style={{
                maxWidth: "96px",
                maxHeight: "96px",
              }}
            />
          )}
          <input
            type="file"
            className="text-sm py-2"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Logo :
          </label>
          <input
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            type="text"
            value={selectedImage ? selectedImage : ""}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            NFT Price :
          </label>
          <input
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="flex justify-between items-center pb-2">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Key-Value Data :
            </label>
            <button
              className="button px-4 py-2 rounded-md text-white text-xs font-medium"
              onClick={handleAddKeyVal}
            >
              Add New Key
            </button>
          </div>
          {formData.metaData[0].key_val_data.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Key"
                value={item.key}
                onChange={(e) =>
                  handleKeyValChange(index, "key", e.target.value)
                }
                className="w-1/2 px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              />
              <input
                type="text"
                placeholder="Value"
                value={item.val.TextContent}
                onChange={(e) =>
                  handleKeyValChange(index, "val", {
                    TextContent: e.target.value,
                  })
                }
                className="w-1/2 px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              />
              <button onClick={() => handleRemoveKeyVal(index)}>
                <HiOutlineXMark scale={24} />
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="purpose" className="md:text-lg text-sm font-semibold">
            Select Purpose:
          </label>
          <select
            id="purpose"
            value={selectedPurpose}
            onChange={handlePurposeChange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          >
            <option value="Preview">Preview</option>
            <option value="Rendered">Rendered</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="button px-4 py-2 mt-6 rounded-md text-white font-medium"
      >
        Submit
      </button>
    </motion.div>
  );
};
// const navigate = useNavigate();

// const [loading, setLoading] = useState(false);
// const param = useParams();
// // console.log("canister id is ", param.slug);
// const userid = Principal.fromText(
//   "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
// );
// const canisterid = Principal.fromText(param.slug);
// const [backend] = useCanister("backend");
// const { principal } = useConnect();
// const [formData, setFormData] = useState({
//   nftCanisterId: canisterid,
//   tokenOwner: userid,
//   metadata: [
//     {
//       key_val_data: [{ key: "", val: "" }],
//       purpose: { Rendered: null },
//       data: 0,
//     },
//   ],
//   _logo: "",
//   _name: "",
//   _symbol: "",
//   _decimals: 0,
//   _totalSupply: 0,
//   _owner: userid,
//   _fee: 0,
// });

// console.log(principal);

// const handleDataChange = (event) => {
//   const { value } = event.target;

//   const parsedValue = parseInt(value);
//   if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 255) {
//     console.error(
//       "Invalid input for data. Please enter a number between 0 and 255."
//     );
//     return;
//   }

//   const updatedMetadata = [...formData.metadata];
//   updatedMetadata[0].data = Uint8Array.from([parsedValue]);
//   setFormData({
//     ...formData,
//     metadata: updatedMetadata,
//   });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log(formData);
// try {
//   const metadata = formData.metadata.map((item) => {
//     const data = item.data ? Uint8Array.from(item.data) : [];
//     const keyValData = item.key_val_data.map((keyValue) => {
//       let valContent;
//       switch (keyValue.key) {
//         case "size":
//           valContent = { Nat64Content: keyValue.val };
//           break;
//         case "format":
//         case "fileType":
//         case "tag":
//         case "sym bol":
//           valContent = { TextContent: keyValue.val };
//           break;

//         default:
//           valContent = { TextContent: keyValue.val };
//       }
//       return { key: keyValue.key, val: valContent };
//     });
//     return { data, key_val_data: keyValData, purpose: item.purpose };
//   });

//   const result = await backend.FractionalizeNFt(
//     formData.nftCanisterId,
//     formData.to,
//     formData.tokenOwner,
//     metadata,
//     formData._logo,
//     formData._name,
//     formData._symbol,
//     parseInt(formData._decimals),
//     parseInt(formData._totalSupply),
//     formData._owner,
//     parseInt(formData._fee)
//   );

//   if (result.Ok) {
//     console.log("Fractionalization result:", result.Ok);

//     toast.success("Fractionalization successful!");
//   } else {
//     console.error("Fractionalization failed:", result.Err);

//     toast.error("Fractionalization failed. Please try again.");
//   }
// } catch (error) {
//   console.error("Error fractionalizing NFT:", error);

//   showErrorMessage(
//     "An error occurred while fractionalizing the NFT. Please try again."
//   );
// }
//   };

//   const handleMetadataKeyValuePairChange = (
//     event,
//     index,
//     subIndex,
//     property
//   ) => {
//     const { value } = event.target;
//     const updatedMetadata = [...formData.metadata];
//     updatedMetadata[index].key_val_data[subIndex][property] = value;
//     setFormData({
//       ...formData,
//       metadata: updatedMetadata,
//     });
//   };

//   const handleAddKeyValuePair = (index) => {
//     const updatedMetadata = [...formData.metadata];
//     updatedMetadata[index].key_val_data.push({ key: "", val: "" });
//     setFormData({
//       ...formData,
//       metadata: updatedMetadata,
//     });
//   };

//   const handleRemoveKeyValuePair = (index, subIndex) => {
//     const updatedMetadata = [...formData.metadata];
//     updatedMetadata[index].key_val_data.splice(subIndex, 1);
//     setFormData({
//       ...formData,
//       metadata: updatedMetadata,
//     });
//   };
//   const handleAddMetadata = () => {
//     setFormData({
//       ...formData,
//       metadata: [
//         ...formData.metadata,
//         {
//           key_val_data: [{ key: "", val: "" }],
//           purpose: "Preview",
//           data: "",
//         },
//       ],
//     });
//   };

//   const handleRemoveMetadata = (index) => {
//     const updatedMetadata = [...formData.metadata];
//     updatedMetadata.splice(index, 1);
//     setFormData({
//       ...formData,
//       metadata: updatedMetadata,
//     });
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{
//         x: 0,
//         opacity: 1,
//         transition: { ease: "easeInOut" },
//       }}
//       className="mx-4 md:py-8 md:px-6 p-2 mt-6"
//     >
//       <div className="mb-6">
//         <h1 className="text-xl font-bold">
//           <div className="flex gap-4 items-center">
//             <TbSquareRoundedChevronLeft
//               onClick={() => navigate(-1)}
//               className="w-6 h-6 cursor-pointer"
//             />
//             MInt NFT
//           </div>
//         </h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="w-full">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             NFT Canister ID:
//           </label>
//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData.nftCanisterId}
//             onChange={(e) =>
//               setFormData({ ...formData, nftCanisterId: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             Token Owner:
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData.tokenOwner}
//             onChange={(e) =>
//               setFormData({ ...formData, tokenOwner: e.target.value })
//             }
//           />
//         </div>
//         <div className="mt-6 border px-4 py-2 border-[#575794] rounded-xl">
//           <h1 className="md:text-lg text-sm font-semibold">META DATA</h1>
//           {formData.metadata.map((record, index) => (
//             <div key={index}>
//               <div className="w-full mt-4">
//                 <label
//                   htmlFor="name"
//                   className="md:text-lg text-sm font-semibold"
//                 >
//                   Data:
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//                   type="text"
//                   value={record.data}
//                   onChange={(e) => handleDataChange(e, index)}
//                 />
//               </div>
//               <div className="mt-6 border px-4 py-2 border-[#575794] rounded-xl">
//                 <h1 className="md:text-lg text-sm font-semibold">
//                   KEY VALUE DATA
//                 </h1>
//                 {record.key_val_data.map((keyValuePair, subIndex) => (
//                   <div key={subIndex} className="flex gap-4 items-center  ">
//                     <div className="w-full mt-4">
//                       <label
//                         htmlFor="name"
//                         className="md:text-lg text-sm font-semibold"
//                       >
//                         KEY:
//                       </label>
//                       <input
//                         className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//                         type="text"
//                         value={keyValuePair.key}
//                         onChange={(e) =>
//                           handleMetadataKeyValuePairChange(
//                             e,
//                             index,
//                             subIndex,
//                             "key"
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="w-full mt-4">
//                       <label
//                         htmlFor="name"
//                         className="md:text-lg text-sm font-semibold"
//                       >
//                         VALUE:
//                       </label>
//                       <input
//                         className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//                         type="text"
//                         value={keyValuePair.val}
//                         onChange={(e) =>
//                           handleMetadataKeyValuePairChange(
//                             e,
//                             index,
//                             subIndex,
//                             "val"
//                           )
//                         }
//                       />
//                     </div>
//                     <div className="">
//                       <button
//                         type="button"
//                         className="uppercase  text-sm md:text-[16px]  mt-12 flex items-center justify-start gap-3   "
//                         onClick={() =>
//                           handleRemoveKeyValuePair(index, subIndex)
//                         }
//                       >
//                         <CiSquareRemove className="w-8 h-8" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 type="button"
//                 className="uppercase text-sm md:text-[16px] mt-6 bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//                 onClick={() => handleAddKeyValuePair(index)}
//               >
//                 <VscDiffAdded />
//               </button>
//               <button
//                 type="button"
//                 className="uppercase mt-4 bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  "
//                 onClick={() => handleRemoveMetadata(index)}
//               >
//                 Remove Metadata
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           type="button"
//           className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//           onClick={handleAddMetadata}
//         >
//           Add Metadata
//         </button>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             LOGO :
//           </label>
//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData._logo}
//             onChange={(e) =>
//               setFormData({ ...formData, _logo: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             NAME :
//           </label>
//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData._name}
//             onChange={(e) =>
//               setFormData({ ...formData, _name: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             SYMBOL :
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData._symbol}
//             onChange={(e) =>
//               setFormData({ ...formData, _symbol: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             Decimal :
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="number"
//             value={formData._decimals}
//             onChange={(e) =>
//               setFormData({ ...formData, _decimals: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             Total Supply:
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="number"
//             value={formData._totalSupply}
//             onChange={(e) =>
//               setFormData({ ...formData, _totalSupply: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             Owner:
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="text"
//             value={formData._owner}
//             onChange={(e) =>
//               setFormData({ ...formData, _owner: e.target.value })
//             }
//           />
//         </div>
//         <div className="w-full mt-4">
//           <label htmlFor="name" className="md:text-lg text-sm font-semibold">
//             Fee :
//           </label>

//           <input
//             className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
//             type="number"
//             value={formData._fee}
//             onChange={(e) => setFormData({ ...formData, _fee: e.target.value })}
//           />
//         </div>
//         <div className="flex gap-4 mt-6 justify-end">
//           {" "}
//           <button
//             className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//             type="submit"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

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
