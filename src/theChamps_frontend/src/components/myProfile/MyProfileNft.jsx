import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useParams } from "react-router";
// import { useBalance, useCanister, useConnect } from "@connect2ic/react";
// import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ReadMore from "../common/ReadMore";
import { motion } from "framer-motion";
import placeHolderImg from "../../assets/CHAMPS.png";
import IconWrapper from "../common/IconWrapper";
import toast from "react-hot-toast";
import ProductCardLoader from "../productcomponent/ProductCardLoader";
import CommonModal from "../common/CommonModal";
import InfiniteScroll from "react-infinite-scroll-component";
import IcpLogo from "../../assets/IcpLogo";
import { useAuth } from "../../auth/useClient";
import { Principal } from "@dfinity/principal";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { TailSpin } from "react-loader-spinner";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { host, ids } from "../../../../DevConfig";
import { idlFactory } from "../../../../wallet/ledger.did";
import { Actor, HttpAgent } from "@dfinity/agent";

const MyProfileNFT = () => {
  const { principal } = useAuth();
  // const { id } = useParams();
  const { backendActor } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [favLoad, setFavLoad] = useState(false);
  const [loading3, setLoading3] = useState(true);
  const [exchange, setExchange] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const [favStatus, setFavStatus] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [paymentMethod2, SetPaymentMethod2] = useState("icp");
  const [selectedPlan, setSelectedPlan] = useState({ value: "icp" });

  const handleModalOpen = (nft) => {
    setSelectedNFT(nft);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedNFT(null);
  };

  useEffect(() => {
    const getUserNFT = async () => {
      try {
        const res = await backendActor.getusersfractionnft(
          // Principal.fromText("2vxsx-fae")
          principal
        );
        setProduct(res);
      } catch (err) {
        console.error("Error getting user nft ", err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserNFT();
  }, []);

  // exchange rate
  const getExchangeRate = async () => {
    const paymentMethod = "FiatCurrency";
    let paymentOpt = null;
    if (paymentMethod == "Cryptocurrency") {
      paymentOpt = { Cryptocurrency: null };
    } else if (paymentMethod == "FiatCurrency") {
      paymentOpt = { FiatCurrency: null };
    }
    const paymentMethod1 = "Cryptocurrency";
    let paymentOpt1 = null;
    if (paymentMethod1 == "Cryptocurrency") {
      paymentOpt1 = { Cryptocurrency: null };
    } else if (paymentMethod1 == "FiatCurrency") {
      paymentOpt1 = { FiatCurrency: null };
    }

    if (selectedPlan.value == "ckBTC") {
      SetPaymentMethod2("btc");
    } else {
      SetPaymentMethod2("icp");
    }

    setLoading3(true);

    try {
      const res = await backendActor?.get_exchange_rates(
        { class: paymentOpt, symbol: "usd" },
        { class: paymentOpt1, symbol: paymentMethod2 }
      );
      console.log(res);
      const exchangeRate2 =
        parseInt(res?.Ok?.rate) / Math.pow(10, res?.Ok?.metadata?.decimals);
      console.log(exchangeRate2);
      setExchange(exchangeRate2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading3(false);
    }
  };

  // console.log(exchange);

  const getFav = async () => {
    try {
      setFavLoad(true);
      const res = await backendActor.getfavourites();
      const favIds = res.map((fav) => fav[0].id);
      setFavourites(favIds);
      const favStatusObj = product.reduce((acc, prod) => {
        acc[prod[1].nft.id] = favIds.includes(prod[1].nft.id);
        return acc;
      }, {});
      setFavStatus(favStatusObj);
    } catch (err) {
      console.error("Error getting fav ", err);
    } finally {
      setFavLoad(false);
    }
  };

  useEffect(() => {
    if (product.length > 0) {
      getFav();
      getExchangeRate();
    }
  }, [product]);

  const toggleFav = async (prod, id) => {
    try {
      // setFavLoad(true);
      if (favStatus[prod[1].nft.id]) {
        await backendActor.removefavourite([
          {
            ...prod[1].nft,
            id: BigInt(parseInt(prod[1].nft.id)),
          },
          id,
        ]);
      } else {
        await backendActor.addfavourite(id, parseInt(prod[1].nft.id));
      }
      setFavStatus((prevStatus) => ({
        ...prevStatus,
        [prod[1].nft.id]: !prevStatus[prod[1].nft.id],
      }));
    } catch (err) {
      console.error("error toggling fav ", err);
    } finally {
      setFavLoad(false);
    }
  };

  return (
    <>
      <div className="flex text-xl mb-6 items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-1">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search Our NFTs"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div>
        {isLoading ? (
          <div className="grid lg:grid-cols-3 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <Loader />
          </div>
        ) : product.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {product.map((prod, index) => (
              <div key={index}>
                {isModalOpen && selectedNFT === prod && (
                  <TransferModal
                    nft={selectedNFT}
                    onClose={handleModalClose}
                    exchange={exchange}
                    loading={loading3}
                  />
                )}
                <div
                  className="border rounded-xl overflow-hidden"
                  style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="overflow-hidden flex items-center justify-center">
                    <Link>
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        src={
                          prod[1].nft.logo.data.length > 10
                            ? prod[1].nft.logo.data
                            : placeHolderImg
                        }
                        className="rounded-t-lg object-cover cursor-pointer overflow-hidden"
                      ></motion.img>
                    </Link>
                  </div>
                  <div className="p-2 mx-2">
                    <div className="flex justify-between font-bold items-center">
                      <div className="text-lg font-semibold mb-2">
                        {prod[1]?.fractional_token[0][1]?.Text}
                      </div>

                      <span className="flex items-center justify-center">
                        {favLoad ? (
                          <TailSpin
                            height="30px"
                            width="30px"
                            color="black"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                          />
                        ) : (
                          <button onClick={() => toggleFav(prod, prod[0])}>
                            {favStatus[prod[1].nft.id] ? (
                              <IconWrapper>
                                <GoHeartFill size={32} />
                              </IconWrapper>
                            ) : (
                              <GoHeart size={32} />
                            )}
                          </button>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <p className="mt-4 bg-opacity-100 py-2 flex gap-1 rounded-md w-[50%]">
                        <IcpLogo />
                        {loading3 ? (
                          <div className="h-6 bg-gray-300 rounded-2xl animate-pulse w-24"></div>
                        ) : (
                          <span className="font-semibold">
                            {(prod[1].price_per_share / exchange).toFixed(3)}
                          </span>
                        )}
                      </p>
                      <button
                        className="mt-4 button text-white rounded-md w-[50%] text-md flex items-center justify-center"
                        onClick={() => handleModalOpen(prod)}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
            <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 z-[1]">
              No NFT found
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Loader = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <ProductCardLoader key={index} />
  ));
};

const TransferModal = ({ nft, onClose, exchange, loading }) => {
  const [quantity, setQuantity] = useState(1);
  // const [tokenActor, setTokenActor] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const { identity, isAuthenticated, principal, backendActor } = useAuth();
  // const [balance, setBalance] = useState(null);
  // const [metaData, setMetaData] = useState(null);
  const [transferTo, setTransferTo] = useState("");
  // const [error, setError] = useState(false);
  // decrement qty
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) =>
      prev < parseInt(nft[1].totalSupply) ? prev + 1 : prev
    );
  };

  // const createTokenActor = async (canisterId) => {
  //   const agent = new HttpAgent({
  //     identity,
  //     host,
  //   });
  //   let tokenActor = Actor.createActor(idlFactory, {
  //     agent,
  //     canisterId,
  //   });

  //   return tokenActor;
  // };

  // /*****************Token Functions : copied from buynow card ******************/
  // const fetchMetadataAndBalance = async (tokenActor, ownerPrincipal) => {
  //   console.log(tokenActor, ownerPrincipal.toText());
  //   try {
  //     const [metadata, balance] = await Promise.all([
  //       tokenActor.icrc1_metadata(),
  //       tokenActor.icrc1_balance_of({
  //         owner: ownerPrincipal,
  //         subaccount: [],
  //       }),
  //     ]);
  //     console.log("Fetched metadata:", metadata);
  //     return { metadata, balance };
  //   } catch (err) {
  //     console.error("Error fetching metadata and balance:", err);
  //     throw err;
  //   }
  // };
  // const formatTokenMetaData = (arr) => {
  //   const resultObject = {};
  //   arr.forEach((item) => {
  //     const key = item[0];
  //     const value = item[1][Object.keys(item[1])[0]]; // Extracting the value from the nested object
  //     resultObject[key] = value;
  //   });
  //   return resultObject;
  // };

  // const transferApprove = async (
  //   currentBalance,
  //   currentMetaData,
  //   tokenActor
  // ) => {
  //   try {
  //     const decimals = parseInt(currentMetaData["icrc1:decimals"], 10);
  //     const sendableAmount = parseInt(
  //       ((nft[1].price_per_share * quantity) / exchange) *
  //         Math.pow(10, decimals),
  //       10
  //     );
  //     console.log("sendable amount console ", sendableAmount);
  //     console.log("current balance console ", currentBalance);

  //     let transaction = {
  //       from_subaccount: [],
  //       spender: {
  //         owner: Principal.fromText(ids.backendCan),
  //         subaccount: [],
  //       },
  //       amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
  //       expected_allowance: [],
  //       expires_at: [],
  //       fee: [currentMetaData["icrc1:fee"]],
  //       memo: [],
  //       created_at_time: [],
  //     };
  //     console.log("transaction ", transaction);
  //     // console.log("Token Actor ICRC2 APPROVE", tokenActor.icrc2_approve);
  //     const approveRes = await tokenActor.icrc2_approve(transaction);
  //     console.log("Payment Approve Response ", approveRes);
  //     if (approveRes.Err) {
  //       const errorMessage = `Insufficient funds. Balance: ${approveRes.Err.InsufficientFunds.balance}`;
  //       toast.error(errorMessage);
  //       return;
  //     } else {
  //       afterPaymentApprove(
  //         parseInt(approveRes?.Ok).toString(),
  //         sendableAmount,
  //         currentBalance
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error in transfer approve", err);
  //     toast.error("Payment approve declined");
  //   } finally {
  //     setBuyLoading(false);
  //   }
  // };

  // // After approve payment
  // const afterPaymentApprove = async (paymentId, amount, currentBalance) => {
  //   console.log(
  //     `You are going to send ,${amount} and your payment ID is ${paymentId}`
  //   );
  //   // NFTID , To , amount
  //   try {
  //     const paymentResponse = await backendActor.tranfertokens(
  //       nft[2],
  //       Principal.fromText(transferTo),
  //       parseInt(amount)
  //     );
  //     console.log("Payment Success Response ", paymentResponse);
  //   } catch (err) {
  //     console.error("Error after payment approve ", err);
  //     // toast.error("Insufficient fund in wallet. Balance : ", currentBalance);
  //   }
  // };

  // /**************************** */

  // const handleConfirm = async () => {
  //   if (!isAuthenticated) {
  //     toast.error("You need to log in first");
  //     return;
  //   }

  //   // const isValid = validateString(transferTo);
  //   // if (!isValid) {
  //   //   setError(true);
  //   //   return;
  //   // }

  //   try {
  //     setBuyLoading(true);
  //     const tokenActor = await createTokenActor(
  //       Principal.fromText(ids.ICPtokenCan)
  //     );
  //     const { metadata, balance } = await fetchMetadataAndBalance(
  //       tokenActor,
  //       principal
  //     );

  //     const formattedMetadata = formatTokenMetaData(metadata);
  //     setMetaData(formattedMetadata);

  //     const parsedBalance = parseInt(balance, 10);
  //     console.log("Balance:", parsedBalance);
  //     setBalance(parsedBalance);

  //     transferApprove(parsedBalance, formattedMetadata, tokenActor);
  //   } catch (err) {
  //     console.error("Error transfering nft ", err);
  //   }
  // };

  // const validateString = (str) => {
  //   const regexPattern = /^([a-z0-9]{5}-){11}[a-z0-9]{3}$/i;
  //   return regexPattern.test(str);
  // };
  // console.log(nft);
  const handleConfirm = async () => {
    if (!isAuthenticated) {
      toast.error("You need to login first");
      return;
    }
    // Check principal on length basis : change to regex later
    if (transferTo.length < 60) {
      toast.error("Invalid principal ID");
      return;
    }
    try {
      setBuyLoading(true);
      const paymentResponse = await backendActor.transfertokens(
        nft[2],
        Principal.fromText(transferTo),
        // parseInt(amount)
        parseInt(quantity)
      );
      console.log("Transfer nft response", paymentResponse);
    } catch (err) {
      console.error("Error after payment approve ", err);
      // toast.error("Insufficient fund in wallet. Balance : ", currentBalance);
      toast.error("failed to transfer nft");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[999] grid place-items-center overflow-y-scroll no-scrollbar top-0">
      <div className="bg-white rounded-2xl p-4 md:px-6">
        <h4 className="text-sm py-2 flex items-center justify-center w-full font-semibold">
          You are about to transfer this nft!
        </h4>
        <div className="flex w-full items-center justify-center">
          <div className="min-h-48 min-w-40 max-h-48 max-w-40 rounded-md overflow-hidden">
            <img
              src={
                nft[1].nft.logo.data.length > 10
                  ? nft[1].nft.logo.data
                  : placeHolderImg
              }
              // src={nftLogo.length > 10 ? nftLogo : champsImg}
              alt="champs-img"
              className="object-contain min-h-48 min-w-40 max-h-48 max-w-40"
            />
          </div>
        </div>
        {/* {error && <p className="text-sm text-red-600">Invalid Principal</p>} */}
        <input
          type="text"
          placeholder="Enter the principal you want to tranfer the nft"
          className="w-full flex outline-none border border-gray-300 rounded-md px-4 py-2"
          value={transferTo}
          onChange={(e) => setTransferTo(e.target.value)}
        />

        {/* <div className="my-2 h-px w-full bg-gray-300"></div> */}
        <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
          <span>Share</span>
          <div className="flex border rounded-md overflow-hidden items-center">
            <button
              className="flex items-center justify-center p-2 bg-gray-200 h-full"
              onClick={handleDecrement}
            >
              <HiMinus className="h-6" />
            </button>
            <span className="flex items-center justify-center px-4 py-2">
              {quantity}
            </span>
            <button
              className="flex items-center justify-center p-2 bg-gray-200 h-full"
              onClick={handleIncrement}
            >
              <HiPlus className="h-6" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
          <span>Total</span>

          {loading ? (
            <span className="h-5 w-44 bg-gray-500 animate-pulse rounded-2xl"></span>
          ) : (
            <div className="flex gap-1 items-center">
              <IcpLogo size={16} />
              <span>
                {((nft[1].price_per_share * quantity) / exchange).toFixed(6)}
              </span>
              <span className="text-gray-500">
                ({(nft[1].price_per_share * quantity).toFixed(3)} USD)
              </span>
            </div>
          )}
        </div>
        <div className="py-2 text-xs text-center max-w-96 font-medium text-gray-500">
          This process may take a minute. Transactions can not be reversed. By
          clicking confirm you show acceptance to our
          <span className="text-[#FC001E] underline ml-1">
            Terms and Service
          </span>
          .
        </div>
        <div className="flex justify-end items-center space-x-4 my-2">
          <button
            className={`px-4 py-2 rounded-md border-2 border-gray-300 ${
              loading && "animate-pulse"
            }`}
            disabled={loading}
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium text-white flex items-center justify-center gap-2 ${
              buyLoading ? "bg-gray-500" : "button"
            } ${loading && "animate-pulse"}`}
            disabled={loading}
            onClick={handleConfirm}
          >
            confirm
            {buyLoading && <TailSpin color="#FFFFFF" height={24} width={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};
// const [productInFavourites, setProductInFavourites] = useState(false);
// const [loading, setLoading] = useState(true); // Combined loading state
// const [error, setError] = useState(null);
// const [showModal, setShowModal] = useState(false);
// // const [assets] = useBalance();
// const [products, setProducts] = useState([]); // Array to hold all products
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [itemsPerPage, setItemsPerPage] = useState(3); // Initial number of items per page
// const [exchange, setExchange] = useState(1);
// const [loading3, setLoading3] = useState(true);
// const [searchQuery, setSearchQuery] = useState("");
// const [searchResults, setSearchResults] = useState([]);
// const [search, setSearch] = useState(false);

// useEffect(() => {
//   const getUsersFractionNFT = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await backendActor.getusersfractionnft(
//         Principal.fromText("2vxsx-fae")
//         // principal
//       );
//       const filteredData = res.filter((item) => {
//         const ownerPrincipal = item[1].nft?.owner?.toText();
//         return ownerPrincipal === principal;
//       });

//       console.log("dfg", filteredData);
//       setProducts(filteredData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error while fetching user NFT", error);
//       setLoading(false);
//       setError(error.message); // Set error message
//     }
//   };
//   getUsersFractionNFT();
// }, [backendActor, principal]);

// const toggleModal = () => {
//   setIsModalOpen(!isModalOpen);
// };

// useEffect(() => {
//   if (isModalOpen) {
//     document.documentElement.style.overflow = "hidden";
//   } else {
//     document.documentElement.style.overflowY = "auto";
//   }
//   return () => {
//     document.documentElement.style.overflowY = "auto";
//   };
// }, [isModalOpen]);

// const handleBuyNow = () => {
//   if (isAuthenticated) {
//     //   const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
//     //   if (icpWallet?.amount <= 0) {
//     //     setShowModal(true);
//     //   } else {
//     //     toast.success("Proceeding to buy");
//     //     // Implement logic to buy the NFT (assuming backendActor integration)
//     //   }
//     // } else {
//     //   toast.error("Please login first");
//   }
// };

// const handleSearch = (e) => {
//   setSearch(true);
//   const query = e.target.value;
//   setSearchQuery(query);

//   const filteredResults = products.filter((item) =>
//     item[1]?.fractional_token?.name
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );
//   setSearchResults(filteredResults);
// };

// const displayProducts = search ? searchResults : products;

// const loadMoreItems = () => {
//   setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 9); // Increase items per page by 9
// };
// const getExchangeRate = async () => {
//   const paymentMethod = "FiatCurrency";
//   const paymentOpt = { FiatCurrency: null }; // Initialize directly for FiatCurrency

//   const paymentMethod1 = "Cryptocurrency";
//   const paymentOpt1 = { Cryptocurrency: null }; // Initialize directly for Cryptocurrency

//   setLoading3(true);

//   try {
//     const res = await backendActor?.get_exchange_rates(
//       { class: paymentOpt, symbol: "usd" }, // Assuming paymentOpt is for USD (dollar)
//       { class: paymentOpt1, symbol: "icp" } // Assuming paymentOpt1 is for ICP (Internet Computer Protocol)
//     );
//     console.log(res);

//     if (res?.Ok?.rate) {
//       const exchangeRate2 =
//         parseInt(res.Ok.rate) / Math.pow(10, res.Ok.metadata.decimals);
//       console.log(exchangeRate2);
//       setExchange(exchangeRate2);
//     } else {
//       console.log("Failed to fetch the exchange rate");
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setLoading3(false);
//   }
// };

// useEffect(() => {
//   getExchangeRate();
// }, [backendActor]);
// return (
//   <>
//     <div className="flex text-xl mb-6 items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-1">
//       <CiSearch size={24} />
//       <input
//         type="text"
//         placeholder="Search Our NFTs"
//         className="bg-transparent outline-none w-full"
//         value={searchQuery}
//         onChange={handleSearch}
//       />
//     </div>

//     <div className="">
//       {loading ? (
//         <div className="grid lg:grid-cols-3 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
//           {Array.from({ length: 9 }, (_, index) => (
//             <ProductCardLoader key={index} />
//           ))}
//         </div>
//       ) : displayProducts.length > 0 ? (
//         <>
//           <InfiniteScroll
//             dataLength={displayProducts.slice(0, itemsPerPage).length}
//             next={loadMoreItems}
//             hasMore={displayProducts.length > itemsPerPage}
//             loader={
//               <div className="grid lg:grid-cols-3 mt-4 gap-4 mb-4 xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
//                 {Array.from({ length: 3 }, (_, index) => (
//                   <ProductCardLoader key={index} />
//                 ))}
//               </div>
//             }
//             endMessage={
//               <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
//                 <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 z-[1]">
//                   No more NFTs found
//                 </button>
//               </div>
//             }
//           >
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//               {displayProducts.slice(0, itemsPerPage).map((item, index) => (
//                 <div key={index}>
//                   <div
//                     className="border rounded-xl overflow-hidden"
//                     style={{
//                       boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <div className="overflow-hidden">
//                       <Link
//                         to={`/collection/${item[0]?.toText()}/${
//                           item[1]?.nft?.id
//                         }`}
//                       >
//                         <motion.img
//                           whileHover={{
//                             scale: 1.1,
//                           }}
//                           transition={{
//                             duration: 0.2,
//                             ease: "easeInOut",
//                           }}
//                           src={
//                             item[1]?.fractional_token?.logo
//                               ? item[1]?.fractional_token?.logo
//                               : placeHolderImg
//                           }
//                           alt={item[1]?.fractional_token?.logo}
//                           className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden"
//                         />
//                       </Link>
//                     </div>
//                     <div className="p-2 mx-2">
//                       <div className="flex justify-between font-bold items-center">
//                         <h2 className="text-lg font-semibold mb-2">
//                           {item[1]?.fractional_token?.name}
//                         </h2>
//                       </div>
//                       <p className="text-gray-500 text-sm">
//                         <ReadMore
//                           text={item[2]?.toText() || ""}
//                           maxLength={20}
//                         />
//                       </p>
//                       <div className="flex justify-between mb-4">
//                         {loading3 ? (
//                           <div className="h-10 mt-4 w-[50px] bg-gray-100 rounded-2xl animate-pulse"></div>
//                         ) : (
//                           <p className="mt-4 py-2 rounded-md w-[50%] flex gap-1">
//                             <IcpLogo />
//                             <p>
//                               {" "}
//                               {(item[1]?.price_per_share / exchange).toFixed(
//                                 3
//                               ) || 0}
//                             </p>{" "}
//                           </p>
//                         )}

//                         <button
//                           className="mt-4 button bg-opacity-100 text-white rounded-md w-[50%] text-md flex items-center justify-center"
//                           onClick={toggleModal}
//                         >
//                           Transfer
//                         </button>
//                       </div>
//                     </div>
//                     {showModal && (
//                       <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
//                         <div className="bg-white p-4 rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
//                           <IconWrapper>
//                             <RiErrorWarningLine size={36} />
//                           </IconWrapper>
//                           <p>
//                             You don't have sufficient balance to buy this NFT.
//                           </p>
//                           <button
//                             className="mt-2 px-4 py-2 button bg-blue-500 text-white rounded-lg"
//                             onClick={() => setShowModal(false)}
//                           >
//                             Close
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   {isModalOpen && (
//                     <>
//                       <div
//                         className="fixed inset-0 bg-transparent  z-40"
//                         onClick={toggleModal}
//                       ></div>
//                       <div className="fixed inset-0 flex items-center justify-center z-50">
//                         <CommonModal
//                           tokencanisterid={item[2]}
//                           toggleModal={toggleModal}
//                           title="Transfer NFT"
//                           message="Please enter the address or Principal you want to send the NFT to"
//                           warningText="Beware, not all wallets support all tokens"
//                           inputPlaceholder="Address or Principal of receiver"
//                           confirmText="Transfer"
//                           cancelText="Back"
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </InfiniteScroll>
//         </>
//       ) : (
//         <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
//           <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 z-[1]">
//             No NFT found
//           </button>
//         </div>
//       )}
//     </div>
//   </>
// );
// };

export default MyProfileNFT;
