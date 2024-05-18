import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../utils/Table";
import { AiOutlineTable, AiOutlineAppstore } from "react-icons/ai"; // Import AiOutlineTable and AiOutlineAppstore icons
import { IoCopyOutline, IoHeart } from "react-icons/io5";
import { useCanister } from "@connect2ic/react";
import { BallTriangle, Grid, Vortex } from "react-loader-spinner";
import notfound from "../../assets/notfound.jpeg";
import { Principal } from "@dfinity/principal";
import profile from "../../assets/profile.jpg";
import CreateCollections from "./CreateCollection";
import { motion } from "framer-motion";
import CollectionApi from "../../../api/CollectionApi";
import { useSelector } from "react-redux";

const Market = () => {
  const [sortOption, setSortOption] = useState("newest");
  const [isCreate, setIsCreate] = useState(false);
  const { getAllCollections, isLoading } = CollectionApi();
  const [backend] = useCanister("backend");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
  };

  // Get Collections
  useEffect(() => {
    getAllCollections();
  }, [backend, formSubmitted]);

  return (
    <div className="md:py-8 md:px-6 p-2">
      <div className="flex justify-between items-center p-4">
        <div>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-2 py-1 border rounded-md bg-none outline-none bg-transparent text-textall border-black dark:border-white"
          >
            <option className="text-black" value="newest">
              Newest
            </option>
            <option className="text-black" value="oldest">
              Oldest
            </option>
          </select>
        </div>
        {!isCreate && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="button px-4 py-2 rounded-md text-white"
            onClick={handleCreate}
          >
            Create Collection
          </motion.button>
        )}
      </div>
      {isCreate ? (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <CreateCollections
            handleCreate={handleCreate}
            setFormSubmitted={setFormSubmitted}
          />
        </motion.div>
      ) : (
        <ViewCollections isLoading={isLoading} />
      )}
    </div>
  );
};

// View Collection tab
const ViewCollections = ({ isLoading }) => {
  const collectionData = useSelector((state) => state.collections);
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="dark:shadow-[#323257] p-4 rounded-lg text-textall"
    >
      {isLoading && (
        <div className="flex w-full items-center justify-center mt-12">
          <Grid
            visible={true}
            height="150"
            width="150"
            color="#EF4444"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      )}
      {!isLoading &&
        collectionData &&
        collectionData?.allCollections?.length > 0 && (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8">
            {collectionData.allCollections.map((collection, index) => (
              <CollectionCard collection={collection} key={index} />
            ))}
          </div>
        )}
      {!isLoading &&
        collectionData &&
        collectionData?.allCollections?.length === 0 && (
          <div className="">No Collection Available</div>
        )}
    </motion.div>
  );
};

const CollectionCard = ({ collection }) => {
  return (
    <div className="bg-card rounded-2xl flex flex-col gap-2  shadow-md">
      <div className="rounded-t-2xl">
        <img
          src={collection.details.logo.data}
          alt="Collection Banner"
          className="rounded-t-2xl min-h-64"
        />
      </div>
      <div className="flex flex-col px-2 py-4">
        <p className="text-lg font-medium">{collection.details.name}</p>
        <p className="text-xs font-medium line-clamp-1">
          {collection.canisterId.toText()}
        </p>
      </div>
      <div className="flex justify-between px-2 py-4 text-sm font-medium gap-4">
        <Link
          to={`/admin/nft-lists/${collection.canisterId.toText()}`}
          className="px-4 py-2 bg-appbar border rounded-md hover:bg-hover w-full flex items-center justify-center"
        >
          View NFTS
        </Link>
        <Link
          to={`/admin/create-nft/${collection.canisterId.toText()}`}
          className="px-4 py-2 button rounded-md text-white w-full flex items-center justify-center"
        >
          Mint NFT
        </Link>
      </div>
    </div>
  );
};

// const [displayMode, setDisplayMode] = useState("row");
// const [searchQuery, setSearchQuery] = useState("");
// const [filteredData, setFilteredData] = useState([]);
// const [backend] = useCanister("backend");
// const [isLoading, setIsLoading] = useState(true);

// const [sampleData, setSampleData] = useState([]);

// const [copied, setCopied] = useState(false);

// const copyToClipboard = (itemcanister_id) => {
//   navigator.clipboard
//     .writeText(itemcanister_id)
//     .then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     })
//     .catch((err) => console.error("Failed to copy:", err));
// };
// const getAllCollections = async () => {
//   try {
//     const data = await backend.getallCollectionids();
//     setSampleData(data);
//     setIsLoading(false);
//     console.log("data", data);
//   } catch (error) {
//     console.log("reeegdf");
//   }
// };

// useEffect(() => {
//   const timer = setTimeout(() => {
//     getAllCollections();
//   }, 1000);
//   return () => clearTimeout(timer);
// }, [backend]);
// const handleSearchInputChange = (event) => {
//   const value = event.target.value;
//   setSearchQuery(value);
//   filterData(value);
// };

// const filterData = (query) => {
//   const filtered = sampleData.filter((item) =>
//     item.title.toLowerCase().includes(query.toLowerCase())
//   );
//   setFilteredData(filtered);
// };

// // Initialize filtered data with all data initially
// React.useEffect(() => {
//   filterData(searchQuery);
// }, []);

// console.log(sampleData);
// return (
//   <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff]  dark:shadow-[#323257] rounded-t-2xl  mt-6">
//     <div className="">
//       <div className="mb-5 flex justify-between items-center">
//         <select
//           className="dark:text-[#e0e0e0] px-2 py-1 rounded-md text-[#676767] dark:bg-[#2e2e48] bg-[#fff] border border-[#FF7D57] outline-none"
//           name=""
//           id=""
//         >
//           <option value="">Newest</option>
//           <option value="">Oldest</option>
//         </select>
//         <div className="flex gap-4">
//           <Link
//             to={"/create-collection"}
//             className="uppercase  text-sm md:text-lg bg-red-500  flex items-center justify-start gap-3 py-2 px-4 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//           >
//             Create Collection
//           </Link>
//         </div>
//       </div>
//       <div className="w-full">
//         {isLoading ? (
//           <div className="flex justify-center h-80 items-center">
//             <Grid
//               visible={true}
//               height="150"
//               width="150"
//               color="#EF4444"
//               ariaLabel="grid-loading"
//               radius="12.5"
//               wrapperStyle={{}}
//               wrapperClass="grid-wrapper"
//             />
//           </div>
//         ) : sampleData.length > 0 ? (
//           <div className="grid md:grid-cols-3 grid-cols-1 gap-4  px-2   ">
//             {sampleData.map((item, index) => (
//               <div key={index}>
//                 <div
//                   className=" w-full h-80 flex flex-col justify-between rounded-xl  "
//                   style={{
//                     backgroundImage: `url(${item?.data?.logo?.data})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
//                   }}
//                 >
//                   <div className="flex  mx-2 py-2 justify-between ">
//                     <div className="flex gap-1 dark:bg-[#38385470] bg-[#ffffff30] px-1  rounded-3xl items-center">
//                       <div className="">
//                         <img
//                           className="rounded-full w-9 h-9"
//                           src={profile}
//                           alt=""
//                         />
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <h4 className="text-sm ">
//                           {" "}
//                           {/* {(item?._Principal).toText().slice(0, 4) + "..."} */}
//                         </h4>
//                         <button
//                           onClick={() =>
//                             copyToClipboard(item?._Principal.toText())
//                           }
//                           className="uppercase  text-sm shadow-md  text-[#FF7D57] flex items-center justify-start gap-3 rounded-xl"
//                         >
//                           {copied ? <IoCopyOutline /> : <IoCopyOutline />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="dark:bg-[#38385470] bg-[#ffffff30] p-2 rounded-full">
//                       <h1>
//                         {" "}
//                         MaxLmt :{" "}
//                         <span className="text-[#FF7D57]">
//                           {item?.data?.maxLimit}
//                         </span>
//                       </h1>
//                     </div>
//                   </div>
//                   <div className=" dark:bg-[#38385470] bg-[#ffffff30]  mx-2 p-1 mt-auto mb-2 rounded-2xl ">
//                     <div className="flex justify-between  ">
//                       <div>
//                         <div className="flex flex-col mx-2">
//                           <span className="  text-[16px]">
//                             Collection Name
//                           </span>
//                           <span className="font-semibold text-[16px] ">
//                             <h1>{item?.data?.name}</h1>
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex flex-col mx-2">
//                           <span className="  text-[16px]">Collection Id</span>
//                           <span className="font-semibold text-[16px] ">
//                             <div className="flex items-center gap-1">
//                               <h4 className="text-sm ">
//                                 {" "}
//                                 {(item?._Principal).toText().slice(0, 8) +
//                                   "..."}
//                               </h4>
//                               <button
//                                 onClick={() =>
//                                   copyToClipboard(item?._Principal.toText())
//                                 }
//                                 className="uppercase  text-sm shadow-md  text-[#FF7D57] flex items-center justify-start gap-3 rounded-xl"
//                               >
//                                 {copied ? (
//                                   <IoCopyOutline />
//                                 ) : (
//                                   <IoCopyOutline />
//                                 )}
//                               </button>
//                             </div>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between gap-2 mx-2  my-2">
//                       <div className="bg-transparent">
//                         <Link
//                           to={`/details/${item?._Principal.toText()}`}
//                           className="uppercase dark:bg-[#2e2e48] bg-[#fff]  flex items-center justify-start gap-3 px-2 py-1 rounded-xl  bg:text-[#e1e1e1]"
//                         >
//                           view
//                         </Link>
//                       </div>
//                       <div className="">
//                         <Link
//                           to={`/create/${item?._Principal.toText()}`}
//                           className="uppercase bg-red-500  shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-2 py-1 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//                         >
//                           Mint
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>{" "}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center h-80">
//             <img width={"300px"} src={notfound} alt="not found" />
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

export default Market;
