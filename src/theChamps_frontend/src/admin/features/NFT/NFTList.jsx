import React, { useState, useEffect } from "react";
// import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
// import herobg from "../../assets/herobg.jpg";
// import profile from "../../assets/user.jpg";
// import { IoCopyOutline } from "react-icons/io5";
// import { FiSearch } from "react-icons/fi";
// import { LuFilter } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
// import notfound from "../../assets/notfound.jpeg";
// import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import CollectionApi from "../../../api/CollectionApi";
import NFTApi from "../../../api/NftApi";
import champsImg from "../../../assets/CHAMPS.png";
import AdminLoader from "../../components/laoding-admin";
import { AdminModal } from "../../components/admin-modal";
import toast from "react-hot-toast";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useAuth } from "../../../auth/useClient";
import { transformTokenData } from "../../utils/functions";
import { HiArrowRight } from "react-icons/hi2";

const NFTList = () => {
  const { slug } = useParams();
  const { getSingleCollectionDetails, isLoading } = CollectionApi();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { backendActor } = useAuth();
  const [modalLoader, setModalLoader] = useState(false);
  const navigate = useNavigate();

  const collectionDetail = useSelector(
    (state) => state.collections.singleCollectionDetail
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRemoveCollection = async () => {
    try {
      setModalLoader(true);
      const res = await backendActor?.remove_collection_to_map(
        Principal.fromText(slug)
      );
      toast.success("Collection removed successfully");
      navigate("/admin/collections");
    } catch (err) {
      // console.error("error removing collection :", err);
      toast.error("Failed to remove collection");
    } finally {
      setModalLoader(false);
    }
  };
  // console.log(collectionDetail);
  useEffect(() => {
    getSingleCollectionDetails(Principal.fromText(slug));
  }, [backendActor]);

  return isLoading ? (
    <AdminLoader />
  ) : (
    collectionDetail && (
      <>
        <div className="text-textall h-full relative py-4">
          <span className="flex justify-between">
            <button className="flex gap-4 items-center font-bold text-lg tracking-wider">
              <TbSquareRoundedChevronLeft
                className="w-6 h-6 cursor-pointer"
                onClick={() => navigate("/admin/collections")}
              />
              Collections
            </button>
            <button
              className="button px-4 py-2 rounded-md text-white"
              onClick={openModal}
            >
              Remove Collection
            </button>
          </span>
          <div className="py-4 max-h-64 min-h-64 flex rounded-2xl">
            <img
              src={
                collectionDetail.banner.data.length > 10
                  ? collectionDetail.banner.data
                  : champsImg
              }
              alt="banner"
              className="rounded-2xl w-full object-cover"
            />
          </div>
          <div className="absolute top-32 md:left-16 rounded-2xl flex justify-center max-md:w-full">
            <div className="bg-white p-[6px] rounded-2xl">
              <img
                src={
                  collectionDetail.logo.data.length > 10
                    ? collectionDetail.logo.data
                    : champsImg
                }
                className="max-h-48 max-w-48 min-w-48 min-h-48 rounded-2xl"
              />
            </div>
          </div>
          <div className="flex md:px-4 py-1">
            <div className="hidden md:w-72 md:block"></div>
            <div className="max-md:mt-20 flex flex-1 flex-col gap-4 bg-card p-2 rounded-2xl shadow-md">
              <div className="flex justify-between w-full items-center">
                <span className="text-2xl font-bold capitalize">
                  {collectionDetail.name}
                </span>
                <span className="text-sm font-medium flex gap-2">
                  <p>created at :</p>
                  {new Date(
                    Number(collectionDetail.created_at / 1000000n)
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="flex gap-4 max-md:text-sm">
                <p>Collection ID :</p>
                <p>{slug}</p>
              </span>
              <p className="max-md:text-sm">
                Collection Description : {collectionDetail.description}
              </p>
            </div>
          </div>
          <NFTs />
        </div>
        {isModalOpen && (
          <AdminModal
            isOpen={isModalOpen}
            close={closeModal}
            action={handleRemoveCollection}
            isLoading={modalLoader}
          >
            Are you sure you want to remove this collection?
          </AdminModal>
        )}
      </>
    )
  );
};

const NFTs = () => {
  const { getSingleCollectionWiseNFT, nftLoading } = NFTApi();
  const { slug } = useParams();
  const nftList = useSelector((state) => state.nftData.singleCollectionNFT);
  // nftList?.map((item) => console.log(item));
  useEffect(() => {
    getSingleCollectionWiseNFT(Principal.fromText(slug));
  }, []);
  return (
    <div className="py-4">
      <h1 className="md:text-xl font-bold">
        List of all Digital Collectibles for collection : {slug}
      </h1>
      <div className="no-scrollbar relative w-full overflow-hidden overflow-y-scroll">
        <div className="py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-6xl mx-auto">
            {nftLoading ? (
              <div className="col-span-full flex items-center justify-center">
                Loading collectibles...
              </div>
            ) : nftList && nftList.length > 0 ? (
              nftList.map((nft, index) => (
                <NFTCard key={index} nftdetail={nft} collection_Id={slug} />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center">
                <p>No collectibles found in this collection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NFTCard = ({ nftdetail, collection_Id }) => {
  const { backendActor } = useAuth();
  const [shareLoading, setShareLoading] = useState(true);
  const [sharesLeft, setSharesLeft] = useState(null);
  // console.log("collectibles Detail :", nftdetail);
  const { fractional_token, nft } = nftdetail[0];
  // console.log("fractional token", fractional_token, "collectible detail", nft);
  const tokenData = transformTokenData(fractional_token);
  // console.log(tokenData);

  useEffect(() => {
    const fetchAvailableShare = async () => {
      try {
        setShareLoading(true);
        const response = await backendActor.getAvailableshares(nftdetail[1]);
        // console.log("response available share", response);
        setSharesLeft(parseInt(response));
      } catch (err) {
        console.error("Error fetching available share ", err);
      } finally {
        setShareLoading(false);
      }
    };
    if (backendActor) fetchAvailableShare();
  }, [backendActor]);

  return (
    <Link
      to={`/admin/collectible-detail/${collection_Id}/${nftdetail[1].toText()}/${
        nft.id
      }`}
      className="w-full h-96 bg-slate-300 overflow-hidden cursor-pointer group relative rounded-2xl"
    >
      <div
        className="absolute inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(${
            nft.logo.data.length > 10 ? nft.logo.data : champsImg
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-20 h-full text-slate-300 group-hover:text-white transition-colors duration-500 flex flex-col justify-between">
        <div className="p-4">
          <HiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
        </div>
        <div className="bg-[#0009] font-semibold p-4">
          <h4 className="text-3xl font-bold">{tokenData.name}</h4>
          <p>Owner: {nft.owner.toText()}</p>
          <p>Total Share : {parseInt(nftdetail[0].totalSupply)}</p>
          <div className="font-bold flex items-center gap-2">
            Available Share :{" "}
            {shareLoading ? (
              <div className="h-4 w-20 bg-gray-500 animate-pulse rounded"></div>
            ) : (
              <h4>{sharesLeft}</h4>
            )}
          </div>
          <p>
            Price/Share: Rp.
            {nftdetail[0].price_per_share}
          </p>
          <p className="flex items-center">
            Available share Value: Rp.
            {shareLoading ? (
              <div className="h-4 w-20 bg-gray-500 animate-pulse rounded"></div>
            ) : (
              <h4>{(sharesLeft * nftdetail[0].price_per_share).toFixed(3)}</h4>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
  // return (
  //   <div className="button rounded-2xl flex flex-col space-y-4 shadow-lg transition-transform transform hover:scale-105">
  //     <div className="overflow-hidden rounded-t-2xl shadow-md">
  //       <img
  //         src={nft.logo.data.length > 10 ? nft.logo.data : champsImg}
  //         alt="collectibleImg"
  //         className="w-full h-64 object-cover"
  //       />
  //     </div>
  //     <span className="px-6 font-bold text-xl text-white">
  //       Collectible Name: {tokenData.name}
  //     </span>
  //     <span className="text-sm font-medium text-gray-300 px-6">
  //       Collectible ID: {nftdetail[1].toText()}
  //     </span>
  //     <span className="px-6 text-sm text-gray-200">
  //       Owner: {nft.owner.toText()}
  //     </span>
  //     <p className="px-6 text-sm text-gray-200">
  //       Total Share:
  //       <span className="text-lg font-semibold text-white">
  //         {parseInt(nftdetail[0].totalSupply)}
  //       </span>
  //     </p>
  //     <p className="px-6 text-sm text-gray-200">
  //       Price/Share: Rp.
  //       <span className="text-lg font-semibold text-white">
  //         {nftdetail[0].price_per_share}
  //       </span>
  //     </p>
  //     <p className="px-6 text-sm text-gray-200 flex gap-1 items-center">
  //       Total Value: Rp.
  //       <span className="text-lg font-semibold text-white">
  //         {nftdetail[0].price_per_share * parseInt(nftdetail[0].totalSupply)}
  //       </span>
  //     </p>
  //     <div className="flex justify-end px-6 py-3">
  //       <Link
  //         to={`/admin/collectible-detail/${collection_Id}/${nftdetail[1].toText()}/${
  //           nft.id
  //         }`}
  //         className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors duration-200"
  //       >
  //         View
  //       </Link>
  //     </div>
  //   </div>
  // );
};
// const [backend] = useCanister("backend");
// const [isLoading, setIsLoading] = useState(true);
// const copied = false;
// const [sampleData, setSampleData] = useState([]);
// const param = useParams();
// const canisterid = Principal.fromText(param.slug);
// const [id, setid] = useState("");
// const getAllCollections = async () => {
//   try {
//     const data = await backend.getcollectionwisenft(canisterid);
//     setSampleData(data);
//     setid(data?.id);
//     setIsLoading(false);
//     console.log("nft data ", data);
//   } catch (error) {
//     console.log("reeegdf", error);
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
// return (
//   <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl mt-6">
//     <div className="h-[600px]">
//       <div
//         className="rounded-2xl h-full"
//         style={{
//           backgroundImage: `url(${herobg})`,
//           height: "312px",
//           width: "full",
//         }}
//       >
//         <div className="flex gap-2 w-full">
//           <div className="dark:bg-[#2e2e48] bg-[#fff] w-[360px] px-4 pt-4 pb-10 rounded-t-2xl shadow-2xl mt-[200px] mx-6">
//             <div style={{ height: "300px" }} className="relative">
//               <img
//                 src={profile}
//                 alt=""
//                 className="w-full h-full object-cover rounded-2xl"
//               />
//               <div className=" flex items-center mt-3 justify-center">
//                 <div className="flex gap-4 items-center justify-evenly text-lg text-[#FC001E]">
//                   <FaXTwitter />
//                   <FaLinkedin />
//                   <FaInstagram />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="px-4 mt-[330px]">
//             <div className="flex flex-col   mb-4">
//               <div className="flex items-center justify-between mb-1">
//                 <h1 className="text-2xl font-semibold line-clamp-1 ">
//                   Collection Name
//                 </h1>
//                 <h4>Created April 2024</h4>
//               </div>
//               <div className="flex  gap-6 items-center">
//                 <h6 className="text-sm  line-clamp-1 ">Collection id</h6>
//                 <button
//                   // onClick={copyToClipboard}
//                   className="uppercase bg-[#fff] text-sm  shadow-md dark:bg-[#2e2e48] text-[#FC001E]   flex items-center justify-start gap-3  rounded-xl  "
//                 >
//                   {copied ? <IoCopyOutline /> : <IoCopyOutline />}
//                 </button>
//               </div>
//             </div>
//             <p className="">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
//               temporibus quod reprehenderit sapiente at id et, vel possimus
//               deserunt magni!
//             </p>
//             {/* <div className="flex gap-4  justify-end mt-6">
//               <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-[#FC001E]  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
//                 cancel
//               </button>
//               <button className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-[#FC001E] to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
//                 Update Profile
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//     <div>
//       <div className="flex w-full gap-4 mb-6">
//         <div className="flex w-full items-center gap-2 bg-[#fff] text-xl md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500 py-2 px-4 rounded-2xl">
//           <FiSearch className="text-xl" />
//           <input
//             type="text"
//             placeholder="Search Ls of Collections..."
//             className="w-full bg-[#fff] text-sm md:text-[16px]  dark:bg-[#2e2e48] outline-none"
//           />
//         </div>
//         <div className="flex items-center justify-end gap-2 bg-[#fff] text-xl md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500 py-2 px-4 rounded-2xl">
//           Filter <LuFilter />
//         </div>
//       </div>
//       <div>
//         {isLoading ? (
//           <div className="flex justify-center h-80 items-center">
//             <Grid
//               visible={true}
//               height="150"
//               width="150"
//               color="#FF7D57"
//               ariaLabel="grid-loading"
//               radius="12.5"
//               wrapperStyle={{}}
//               wrapperClass="grid-wrapper"
//             />
//           </div>
//         ) : sampleData.length > 0 ? (
//           <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
//             {sampleData.map((item, index) => (
//               <div key={index}>
//                 <div
//                   className=" w-full h-80 flex flex-col justify-between rounded-xl  "
//                   style={{
//                     backgroundImage: `url(${item.image})`,
//                     backgroundSize: "cover",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
//                   }}
//                 >
//                   <div className="flex  mx-2 py-2 justify-between ">
//                     <div className="flex gap-1 dark:bg-[#38385470] bg-[#ffffff30] px-1  rounded-3xl items-center">
//                       <div className="">
//                         <img
//                           className="rounded-full w-9 h-9"
//                           src={item.image}
//                           alt=""
//                         />
//                       </div>
//                       <div>
//                         <h4 className="text-sm"> Collection Name</h4>
//                       </div>
//                     </div>
//                     <div className="dark:bg-[#38385470] bg-[#ffffff30] p-2 rounded-full">
//                       <h1>Creator Name*</h1>
//                     </div>
//                   </div>
//                   <div className=" dark:bg-[#38385470] bg-[#ffffff30]  mx-2 p-1 mt-auto mb-2 rounded-2xl ">
//                     <div className="flex justify-between  ">
//                       <div>
//                         <div className="flex flex-col mx-2">
//                           <span className="  text-[16px]">Website URL*</span>
//                           <span className="font-semibold text-[16px] ">
//                             <a href="https://t4vpt-6qaaa-aaaak-aff6q-cai.icp0.io/">
//                               Link
//                             </a>
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="flex flex-col mx-2">
//                           <span className="  text-[16px]">Creator fee</span>
//                           <span className="font-semibold text-[16px] ">
//                             3%
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between gap-2 mx-2  my-2">
//                       <div className="bg-transparent">
//                         <Link
//                           to={`/details/${param.slug}/${item?.id}`}
//                           className="uppercase dark:bg-[#2e2e48] bg-[#fff]  flex items-center justify-start gap-3 px-2 py-1 rounded-xl  bg:text-[#e1e1e1]"
//                         >
//                           View
//                         </Link>
//                       </div>
//                       <div className="">
//                         <Link
//                           to={`/users/:sdf/update-collections`}
//                           className="uppercase bg-red-500  shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-2 py-1 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
//                         >
//                           detail
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

export default NFTList;
