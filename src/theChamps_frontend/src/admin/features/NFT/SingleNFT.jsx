import React, { useState, useEffect } from "react";
// import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
// import herobg from "../../assets/herobg.jpg";
// import profile from "../../assets/user.jpg";
// import { IoCopyOutline } from "react-icons/io5";
// import { FiLink, FiSearch } from "react-icons/fi";
// import { LuFilter } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { RxAvatar } from "react-icons/rx";
// import { BsFileText } from "react-icons/bs";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import champsImg from "../../../assets/CHAMPS.png";
// import { Grid } from "react-loader-spinner";
import AdminLoader from "../../components/laoding-admin";
import { useAuth } from "../../../auth/useClient";

const SingleNFT = () => {
  const { collection, slug, id } = useParams();
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [isNFTLoading, setIsNFTLoading] = useState(true);
  const [nftDetail, setNFTDetail] = useState(null);
  const navigate = useNavigate();
  const [shareLoading, setShareLoading] = useState(true);
  const [sharesLeft, setSharesLeft] = useState(null);

  useEffect(() => {
    const fetchNFTDetail = async () => {
      try {
        setIsNFTLoading(true);
        const res = await backendActor?.getFractionalNftDetails(
          parseInt(id),
          Principal.fromText(slug),
          Principal.fromText(collection)
        );
        console.log("Response getFractionalNFTDetails : ", res);
        setNFTDetail(res);
      } catch (err) {
        // console.error("Error fecthing fractionalcollectibledetails : ", err);
      } finally {
        setIsNFTLoading(false);
      }
    };

    fetchNFTDetail();
  }, [backendActor]);

  // Avalibale share
  useEffect(() => {
    const fetchAvailableShare = async () => {
      try {
        setShareLoading(true);
        const response = await backendActor.getAvailableshares(
          Principal.fromText(slug)
        );
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

  console.log("single collectible detail", nftDetail);

  return (
    <div className="rounded-lg bg-card text-textall h-full shadow-md p-6">
      <div className="flex gap-4 items-center font-bold text-lg tracking-wider">
        <TbSquareRoundedChevronLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        Collectible Detail
      </div>
      {isNFTLoading ? (
        <AdminLoader />
      ) : (
        <div className="mt-6 flex gap-4 max-md:flex-col max-md:justify-center max-md:items-center">
          <div className="min-h-64 min-w-64 rounded-lg p-2 border-2 border-divider max-h-64 max-w-64">
            <img
              src={
                nftDetail?.nft?.logo?.data?.length > 10
                  ? nftDetail?.nft?.logo?.data
                  : champsImg
              }
              alt={nftDetail?.fractional_token[0][1].Text}
              className="rounded-lg h-full w-full"
            />
          </div>
          <div className="flex border-2 w-full p-4 rounded-lg border-divider flex-col gap-2 tracking-wider">
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Collectible name</span>
                <span>:</span>
              </div>
              <p className="font-bold">
                {nftDetail?.fractional_token[0][1].Text}
              </p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Collection</span>
                <span>:</span>
              </div>
              <p className="font-bold">{collection}</p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Collectible ID</span>
                <span>:</span>
              </div>
              <p className="font-bold">{slug}</p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Owner</span>
                <span>:</span>
              </div>
              <p className="font-bold">{nftDetail?.nft.owner.toText()}</p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Total Share</span>
                <span>:</span>
              </div>
              <p className="font-bold">{parseInt(nftDetail?.totalSupply)}</p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Avl. Share</span>
                <span>:</span>
              </div>
              {shareLoading ? (
                <div className="h-4 w-20 animate-pulse rounded bg-gray-500"></div>
              ) : (
                <p className="font-bold">{sharesLeft}</p>
              )}
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Total Value</span>
                <span>:</span>
              </div>
              <p className="font-bold flex items-center">
                Rp.{" "}
                {shareLoading ? (
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-500"></div>
                ) : (
                  <p className="font-bold">
                    {(sharesLeft * nftDetail?.price_per_share).toFixed(3)}
                  </p>
                )}
              </p>
            </div>
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Listed</span>
                <span>:</span>
              </div>
              <p className="font-bold">
                {nftDetail?.nft.listed ? "Yes" : "No"}
              </p>
            </div>
            {/* <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Total Share</span>
                <span>:</span>
              </div>
              <p className="font-bold">
                {parseInt(nftDetail?.fractional_token.totalSupply)}
              </p>
            </div> */}
            <div className="font-medium flex gap-2">
              <div className="min-w-32 flex justify-between">
                <span>Price/Share</span>
                <span>:</span>
              </div>
              <p className="font-bold">
                Rp. {nftDetail?.price_per_share.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//   const [copied, setCopied] = useState(false);
//   const textToCopy =
//     "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe";
//   const copyToClipboard = () => {
//     navigator.clipboard
//       .writeText(textToCopy)
//       .then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1500);
//       })
//       .catch((err) => console.error("Failed to copy:", err));
//   };
//   const [backend] = useCanister("backend");
//   const [isLoading, setIsLoading] = useState(true);

//   const [sampleData, setSampleData] = useState([]);
//   const param = useParams();

//   const canisterid = Principal.fromText(param.slug);

//   const getAllCollections = async () => {
//     try {
//       const data = await backend.getNFTdetails(canisterid, parseInt(param.id));
//       setSampleData(data);

//       setIsLoading(false);
//       console.log("nft data ", data);
//     } catch (error) {
//       console.log("reeegdf", error);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       getAllCollections();
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [backend]);
//   // const sampleData = [
//   //   {
//   //     title: "Product 1",
//   //     category: "Category A",
//   //     status: "Active",
//   //     price: "$10",
//   //     inventory: 100,
//   //     image:
//   //       "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=740&t=st=1713351871~exp=1713352471~hmac=ed679c41842035c86855182a5cdfd9b4317fac54471101d127d87f9cdd467412", // Sample NFT image link
//   //     slug: "product-1",
//   //   },
//   //   {
//   //     title: "Product 2",
//   //     category: "Category B",
//   //     status: "Paused",
//   //     price: "$20",
//   //     inventory: 50,
//   //     image:
//   //       "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
//   //     slug: "product-2",
//   //   },
//   // ];
//   return (
//     <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl mt-6">
//       <div className="">
//         <div className="flex gap-2 w-full">
//           <div className="dark:bg-[#2e2e48] bg-[#fff] w-[360px] px-4 pt-4 pb-10 rounded-2xl shadow-2xl  mx-6">
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
//           <div className="px-4 mt-10">
//             <div className="flex flex-col   mb-4">
//               <div className="flex items-center justify-between mb-1">
//                 <h1 className="text-2xl font-semibold line-clamp-1 ">
//                   Single NFT name
//                 </h1>
//                 <h4>Listed April 2024</h4>
//               </div>
//               <div className="flex  gap-6 items-center">By Ritesh</div>
//             </div>
//             <h1 className="text-2xl font-semibold pb-2"> Detail</h1>
//             <p className="">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
//               temporibus quod reprehenderit sapiente at id et, vel possimus
//               deserunt magni!
//             </p>
//             <div className="flex gap-4  justify-between mt-6">
//               <button className="uppercase bg-[#fff] font-semibold text-sm md:text-[20px]  dark:bg-[#2e2e48]  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
//                 $ 08.00
//               </button>

//               <button className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
//                 Update price
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-[50%]  mx-auto mt-10 border border-red-500 px-4 py-4">
//         <div className="font-semibold flex items-center gap-4 mb-4">
//           <h1>Detail </h1>{" "}
//           <div className="flex gap-2 text-lg  items-center">
//             <FiLink />
//             <p className="text-red-500 line-clamp-1"> view on chain </p>
//           </div>
//           <div className="flex gap-2 text-lg  items-center">
//             <RxAvatar />
//             owner:
//             <p className="text-red-500"> dffds... </p>
//           </div>
//           <div className="flex gap-2 text-lg  items-center">
//             <BsFileText />

//             <p className="text-red-500"> Licence </p>
//           </div>
//         </div>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sequi.
//           Beatae, nesciunt sint iure quam assumenda ipsam, porro rerum eius
//           eligendi voluptatibus maxime voluptates iusto dicta. Impedit, optio
//           perferendis! Minus, nulla ea hic amet ratione ullam debitis fugit
//           ducimus, optio adipisci eum blanditiis asperiores neque cum tenetur
//           earum porro at distinctio quod officia. Consectetur, vel eligendi.
//         </p>

//         <div className="flex">
//           {sampleData?.metadata?.map((metadataItem, metadataIndex) => (
//             <div
//               key={metadataIndex}
//               className="metadata-item grid grid-cols-3 mt-4 gap-4"
//             >
//               {metadataItem.key_val_data.map((keyValItem, keyValIndex) => (
//                 <div
//                   key={keyValIndex}
//                   className="shadow-2xl line-clamp rounded-2xl flex flex-col items-center"
//                 >
//                   <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//                     {keyValItem.key}
//                   </div>
//                   <div className="p-4 text-lg">
//                     {keyValItem.val.TextContent
//                       ? keyValItem.val.TextContent
//                       : Number(keyValItem.val.Nat64Content)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}

//           {/* <div className="shadow-2xl rounded-2xl flex flex-col items-center ">
//             <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//               flower
//             </div>
//             <div className="p-4 text-lg">Dimond</div>
//           </div>
//           <div className="shadow-2xl rounded-2xl flex flex-col items-center ">
//             <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//               flower
//             </div>
//             <div className="p-4 text-lg">Dimond</div>
//           </div>
//           <div className="shadow-2xl rounded-2xl flex flex-col items-center ">
//             <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//               flower
//             </div>
//             <div className="p-4 text-lg">Dimond</div>
//           </div>
//           <div className="shadow-2xl rounded-2xl flex flex-col items-center ">
//             <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//               flower
//             </div>
//             <div className="p-4 text-lg">Dimond</div>
//           </div> */}
//           {/* <div className="shadow-2xl rounded-2xl flex flex-col items-center ">
//             <div className="bg-gray-200 w-full text-center text-black rounded-t-2xl">
//               flower
//             </div>
//             <div className="p-4 text-lg">Dimond</div>
//           </div> */}
//         </div>
//       </div>

//       <div className="px-16 shadow-md mt-10 py-6">
//         <div className="flex  justify-between ">
//           <h1 className="text-xl">Activity</h1>
//           <select
//             className="dark:text-[#e0e0e0] px-2 py-1 rounded-md text-[#676767] dark:bg-[#2e2e48] bg-[#fff] border border-[#FF7D57] outline-none"
//             name=""
//             id=""
//           >
//             <option value="">Last day</option>
//             <option value="">Last 7 days</option>
//             <option value="">Last 30 days</option>
//             <option value="">Last month</option>
//           </select>
//         </div>
//         <div className="flex justify-between  border border-red-500 px-6 py-1 mt-10">
//           <h2>MINT#</h2>
//           <h2>NRI</h2>
//           <h2>PRICE</h2>
//           <h2>TIME</h2>
//         </div>
//         <div className="flex justify-between  shadow-2xl px-6 py-2 mt-10">
//           <h2>254#</h2>
//           <h2>-</h2>
//           <h2>$ 5.62</h2>
//           <h2>3 Months</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

export default SingleNFT;
