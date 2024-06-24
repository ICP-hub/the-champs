import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

import { motion } from "framer-motion";
import ReadMore from "../common/ReadMore";
import { useParams } from "react-router";
// import { useCanister, useBalance, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import image from "../../assets/images/soccer-1.jpeg";
import { RiErrorWarningLine } from "react-icons/ri";
import IconWrapper from "../common/IconWrapper";
import placeHolderImg from "../../assets/CHAMPS.png";
import { Link } from "react-router-dom";
import IcpLogo from "../../assets/IcpLogo";
// import BuyNowModal from "../common/BuyNowCard";
import champsImg from "../../assets/CHAMPS.png";
import { RiVerifiedBadgeFill } from "react-icons/ri";
// Ledger import
import { useAuth } from "../../auth/useClient";
import { idlFactory } from "../../../../wallet/ledger.did";
import { Actor, HttpAgent } from "@dfinity/agent";
import { host, ids } from "../../../../DevConfig";

const plans = [
  {
    name: "ICP",
    value: "icp",
  },

  {
    name: "CKBTC Wallet",
    value: "ckBTC",
  },
];
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { HiMinus, HiPlus } from "react-icons/hi2";

const ProductCard = ({ product, setShowHeader, showHeader }) => {
  // const { isConnected, principal } = useConnect();
  const { id } = useParams();
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [favourites, setFavourites] = useState();
  const [open, setOpen] = useState(false);
  // const [productInFavourites, setProductInFavourites] = useState(false);

  // const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  // const [assets] = useBalance();
  // const [image, setImage] = useState(product[0]?.fractional_token.logo);
  const [loading3, setLoading3] = useState(true);
  const [exchange, setExchange] = useState(1);
  const [confirm, setConfirm] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState({ value: "icp" });
  const [loading4, setLoading4] = useState(false);
  // fav stats
  const [favChanged, setFavChanged] = useState(false);
  const [favMatched, setFavMatched] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  const [paymentMethod2, setPaymentMethod2] = useState("icp");

  // const addToFavourites = async () => {
  //   try {
  //     setLoading(true);
  //     const canister_id = Principal.fromText(id);
  //     const res = await backend.addfavourite(
  //       canister_id,
  //       parseInt(product[0].nft.id)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const icpWallet = assets?.find((wallet) => wallet.name === "ICP");

  // const getFavourites = async () => {
  //   try {
  //     const res = await backend.getfavourites();

  //     setFavourites(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getFavourites();

  //   if (favourites != null) {
  //     const isProductInWishlist = favourites.some(
  //       (item) => item[0].id === product[0].nft.id && item[1].toText() === id
  //     );
  //     setProductInFavourites(isProductInWishlist);
  //   }
  // console.log(selectedPlan.value);
  // }, [product, favourites]);

  // const imageHandler = () => {
  //   setImage(placeHolderImg);
  // };

  // const removeFavourites = async (
  //   canisterid,
  //   productId,
  //   metadata,
  //   locked,
  //   forsale,
  //   listed,
  //   priceinusd
  // ) => {
  //   try {
  //     setLoading(true);
  //     const canister = Principal.fromText(canisterid);
  //     const item = {
  //       id: parseInt(productId),
  //       owner: Principal?.fromText("2vxsx-fae"),
  //       metadata: metadata,
  //       locked: locked,
  //       priceinusd: priceinusd,
  //       forsale: forsale,
  //       listed: listed,
  //     };

  //     await backend.removefavourite([item, canister]);
  //     toast.success("Item removed from favourites");
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

    setLoading3(true);

    try {
      const res = await backendActor.get_exchange_rates(
        { class: paymentOpt, symbol: "usd" }, // Assuming paymentOpt is for USD (dollar)
        { class: paymentOpt1, symbol: paymentMethod2 } // Assuming paymentOpt1 is for ICP (Internet Computer Protocol)
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
  useEffect(() => {
    if (selectedPlan.value == "ckBTC") {
      setPaymentMethod2("btc");
    } else {
      setPaymentMethod2("icp");
    }
    getExchangeRate();
  }, [backendActor, selectedPlan.value]);

  // const buyTokens = async () => {
  //   try {
  //     setLoading4(true);
  //     const paymentMethod = selectedPlan.value;
  //     let paymentOpt = null;
  //     if (paymentMethod == "ckEth") {
  //       paymentOpt = { cketh: null };
  //     } else if (paymentMethod == "SOL") {
  //       paymentOpt = { solana: "test" };
  //     } else if (paymentMethod == "ckBTC") {
  //       paymentOpt = { ckbtc: null };
  //     } else {
  //       paymentOpt = { icp: null };
  //     }

  //     // Metadata

  //     console.log(paymentOpt, paymentMethod, "paymentmethod");
  //     // const userid = Principal.fromText("2vxsx-fae");
  //     const price =
  //       (product[0]?.price_per_share?.toFixed(4) / exchange) *
  //       quantity *
  //       Math.pow(10, 9);
  //     const userid = Principal.fromText(principal);
  //     console.log(quantity);
  //     console.log(price);
  //     console.log(paymentMethod2);

  //     const res = await backend.buytokens(
  //       product[1],
  //       product[0]?.fractional_token?.owner,
  //       userid,

  //       quantity,
  //       paymentOpt,
  //       parseInt(price)
  //     );
  //     if (res) {
  //       toast.success("nft purchased successfully");
  //     }
  //     setLoading4(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading4(false);

  //     setShowModal(true);
  //   }
  // };

  // useEffect(() => {
  //   // Disable scroll when modal is open
  //   if (open) {
  //     document.body.style.overflowY = "hidden";
  //   } else {
  //     document.body.style.overflowY = "auto";
  //   }
  //   getNftDetails();

  //   // Cleanup: Enable scroll when component unmounts
  //   return () => {
  //     document.body.style.overflowY = "auto";
  //   };
  // }, [open, backend, nft]);

  const handleConfirm = () => {
    console.log("confirm button");
    // // Call usePaymentTransfer function only if the setSelected plan is "Plug Wallet"
    // // Call the usePaymentTransfer function
    // setShowHeader(true);
    // buyTokens();
    // setOpen(!open);
    // setConfirm(true);
  };

  const handler = () => {
    setOpen(!open);
    setConfirm(true);
    setShowHeader(true);
  };

  const handleBuyNow = () => {
    if (isConnected) {
      // Check if user has sufficient balance
      if (icpWallet?.amount <= 0) {
        setShowModal(true);
      } else {
        // Proceed with the buy now action
        setOpen(true);
        setShowHeader(false);
      }
    } else {
      setOpen(true);
      setShowHeader(false);
    }
  };

  /*************** Favourite review ****************/
  // get favorites
  const getFav = async () => {
    try {
      setFavLoad(true);
      const res = await backendActor.getfavourites();
      const favIds = res.map((fav) => fav[0].id);
      // console.log("fav nft id", favIds);
      setFavourites(favIds); // store only ids
      setFavMatched(favIds.includes(product[0].nft.id));
    } catch (err) {
      console.error("Error getting fav ", err);
    } finally {
      setFavLoad(false);
    }
  };

  // fetch favorites : fetch in favChanged
  useEffect(() => {
    getFav();
  }, [favChanged]);

  // add or remove a favorite
  const toggleFav = async (product) => {
    try {
      setFavLoad(true);
      if (favMatched) {
        // Remove favorite
        const nft = product[0].nft;
        const res = await backendActor.removefavourite([
          {
            ...nft,
            id: BigInt(parseInt(nft.id)),
          },
          Principal.fromText(id),
        ]);
        console.log(res);
        // return; ? return need?
      } else {
        // Add favorite
        const res = await backendActor.addfavourite(
          Principal.fromText(id),
          parseInt(product[0].nft.id)
        );
        console.log(res);
      }
    } catch (err) {
      console.error("error toggling fav ", err);
    } finally {
      // setFavLoad(false);   // This may cause bug????
      setFavChanged((prev) => !prev);
    }
  };
  /*************** Favourite review ****************/
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () =>
    setQuantity((prev) =>
      prev < parseInt(product[0].fractional_token.totalSupply) ? prev + 1 : prev
    );

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div
      className="border   rounded-xl overflow-hidden "
      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      {loading4 && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
          <TailSpin color="#FC001E" height={80} width={80} />
        </div>
      )}
      <div className="overflow-hidden ">
        <Link to={`/collection/${id}/${product[1].toText()}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            src={product[0].nft.logo.data}
            alt={product[0]?.fractional_token[0][1].Text}
            className="rounded-t-lg  object-cover cursor-pointer overflow-hidden "
            // onError={imageHandler}
          ></motion.img>
        </Link>
      </div>
      <div className="p-2 mx-2">
        <div className="flex justify-between font-bold items-center">
          <div className="text-lg font-semibold mb-2">
            {product[0]?.fractional_token[0][1]?.Text}
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
              <button onClick={() => toggleFav(product)}>
                {favMatched ? (
                  <IconWrapper>
                    <GoHeartFill size={32} />
                  </IconWrapper>
                ) : (
                  <GoHeart size={32} />
                )}
              </button>
            )}
          </span>

          {/* {loading ? (
            <button className="ml-[255px]">
              <TailSpin
                height="30%"
                width="30%"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            </button>
          ) : (
            <>
              {productInFavourites ? (
                <button
                  onClick={() =>
                    removeFavourites(
                      product[1]?.toText(),
                      product[0]?.nft?.id,
                      product[0]?.nft?.metadata,
                      product[0]?.nft?.locked,
                      product[0]?.nft?.forsale,
                      product[0]?.nft?.listed,
                      product[0]?.nft?.priceinusd
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 115.77 122.88"
                    width="30"
                    height="25"
                    className="gradient-icon"
                  >
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#FC001E" />
                        <stop offset="100%" stopColor="#FF7D57" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#gradient)"
                      d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"
                    />
                  </svg>
                </button>
              ) : (
                <button onClick={addToFavourites}>
                  <CiHeart size={32} />
                </button>
              )}
            </>
          )} */}
        </div>
        <p className="text-gray-500 text-sm">
          <ReadMore text={product[1].toText()} maxLength={20} />
        </p>
        <div className="flex justify-between  mb-4">
          <p className="mt-4    bg-opacity-100  py-2  flex  gap-1 rounded-md w-[50%]">
            <IcpLogo />
            {loading3 ? (
              <div className="h-6 w-[50px] bg-gray-100 rounded-2xl animate-pulse"></div>
            ) : (
              (product[0]?.price_per_share / exchange).toFixed(3)
            )}
          </p>
          <button
            className="mt-4   button   text-white   rounded-md w-[50%]  text-md flex items-center justify-center"
            // onClick={handleBuyNow} // Call handleBuyNow function when button is clicked
            onClick={() => setOpen(true)}
          >
            Buy now
          </button>
        </div>
      </div>
      {open && (
        <BuyModal
          onOpen={setOpen}
          nft={product[0].price_per_share}
          nftLogo={product[0].nft.logo.data}
          setSelected={setSelectedPlan}
          selected={selectedPlan}
          exchange={exchange}
          loading={loading3}
          product={product}
        />
      )}
      {/* <BuyNowModal
        isOpen={open}
        onClose={() => setOpen(false)}
        nft={product[0].price_per_share}
        nftLogo={product[0].fractional_token.logo}
        plans={plans}
        setSelected={setSelectedPlan}
        handleConfirm={handleConfirm}
        handler={handler}
        exchange={exchange}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        loading={loading3}
      /> */}

      {/* Modal for insufficient balance */}
      {/* {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className=" z-10 bg-white p-4 rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
            <IconWrapper>
              <RiErrorWarningLine size={36} />
            </IconWrapper>
            <p>You don't have sufficient balance to buy this nft.</p>
            <button
              className="mt-2 px-4 py-2 button bg-blue-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

const BuyModal = ({
  onOpen,
  nft,
  nftLogo,
  setSelected,
  selected,
  exchange,
  loading,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [metaData, setMetaData] = useState(null);
  // const { principal } = useConnect();
  const { principal } = useAuth();
  const [balance, setBalance] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const createTokenActor = (canisterId) => {
    let identity = window.identity;
    // console.log("identity : ", identity);
    const agent = new HttpAgent({
      identity,
    });
    host: host;
    let tokenActor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    return tokenActor;
  };

  const formatTokenMetaData = (arr) => {
    const resultObject = {};
    arr.forEach((item) => {
      const key = item[0];
      const value = item[1][Object.keys(item[1])[0]]; // Extracting the value from the nested object
      resultObject[key] = value;
    });
    return resultObject;
  };

  // const continueICPTransaction = async (amount, transfer, sendPrincipal) => {
  //   const actorICP = createTokenActor(ids.tokenCan);
  //   transfer(amount, sendPrincipal, actorICP);
  // };

  const handleConfirm = async () => {
    const principalId =
      selected.value === "icp"
        ? ids.ICPtokenCan
        : selected.value === "ckBTC"
        ? ids.ckBTCtokenCan
        : null;
    try {
      // console.log(principalId);
      setBuyLoading(true);
      const tokenActor = createTokenActor(Principal.fromText(principalId));
      // console.log(tokenActor);
      // Fetch metadata and balance
      const [metadata, balance] = await Promise.all([
        tokenActor.icrc1_metadata(),
        tokenActor.icrc1_balance_of({
          owner: principal,
          subaccount: [],
        }),
      ]);

      console.log("ICRC1_META RESPONSE", metadata);
      const formattedMetadata = formatTokenMetaData(metadata);
      setMetaData(formattedMetadata);

      const parsedBalance = parseInt(balance, 10);
      console.log("Balance:", parsedBalance);
      setBalance(parsedBalance);
      // Call transferApprove after setting metaData and balance
      transferApprove(parsedBalance, formattedMetadata, tokenActor);
    } catch (err) {
      console.error("ICRC1_META ERROR", err);
    } finally {
      setBuyLoading(false);
    }
  };

  const transferApprove = async (
    currentBalance,
    currentMetaData,
    tokenActor
  ) => {
    try {
      const decimals = parseInt(currentMetaData["icrc1:decimals"], 10);
      const sendableAmount = parseInt(
        ((nft * quantity) / exchange) * Math.pow(10, decimals),
        10
      );
      console.log("sendable amount console ", sendableAmount);
      if (currentBalance > sendableAmount) {
        console.log("We can send the amount");
        // transaction logic
        // let transaction = {
        //   amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
        //   from_subaccount: [],
        //   spender: {
        //     // Need review on this
        //     // owner: product[1],
        //     owner: Principal.fromText("l4mwy-piaaa-aaaak-akqdq-cai"),
        //     subaccount: [],
        //   },
        //   fee: parseInt(currentMetaData["icrc1:fee"]),
        //   memo: [],
        //   created_at_time: [],
        //   expected_allowance: [],
        //   expires_at: [],
        // };
        let transaction = {
          from_subaccount: [],
          spender: {
            owner: principal,
            subaccount: [],
          },
          amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
          expected_allowance: [],
          expires_at: [],
          fee: parseInt(currentMetaData["icrc1:fee"]),
          memo: [],
          created_at_time: [],
        };
        console.log("transaction ", transaction);
        console.log("Token Actor ICRC2 APPROVE", tokenActor.icrc2_approve);
        const approveRes = await tokenActor.icrc2_approve(transaction);
        console.log("Payment Approve Response ", approveRes);
      } else {
        console.log("Insufficient funds");
      }
    } catch (err) {
      console.error("Error in transfer approve", err);
    }
  };

  // decrement qty
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) =>
      prev < parseInt(product[0].fractional_token.totalSupply) ? prev + 1 : prev
    );
  };

  // console.log("metaData state ", metaData);
  // console.log("onwer principal ", principal);

  return (
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[999] grid place-items-center overflow-y-scroll no-scrollbar">
      <div className="bg-white rounded-2xl p-4 md:px-6">
        <h4 className="text-sm py-2 flex items-center justify-center w-full font-semibold">
          You are about to make a purchase!
        </h4>
        <div className="flex w-full items-center justify-center">
          <div className="min-h-48 min-w-40 max-h-48 max-w-40 rounded-md overflow-hidden">
            <img
              src={nftLogo.length > 10 ? nftLogo : champsImg}
              alt="champs-img"
              className="object-cover min-h-48 min-w-40 max-h-48 max-w-40"
            />
          </div>
        </div>
        <p className="py-2 text-xs text-center text-gray-500">
          You are about to purchase this NFT from your connected wallet.
        </p>
        <div className="my-2 h-px w-full bg-gray-300"></div>
        <h4 className="font-semibold capitalize">payment method</h4>
        <div className="grid md:grid-cols-2 gap-x-2 gap-y-2 my-2 font-semibold">
          <button
            className={`p-4 flex justify-between items-center ${
              selected.value === "icp"
                ? "button text-white"
                : "border-gray-300 border-2"
            } rounded-md`}
            onClick={() => setSelected({ value: "icp" })}
          >
            <span className="text-sm uppercase min-w-max">ICP</span>
            {selected.value === "icp" && (
              <span>
                <RiVerifiedBadgeFill color="white" size={20} />
              </span>
            )}
          </button>
          <button
            className={`p-4 flex justify-between items-center ${
              selected.value === "ckBTC"
                ? "button text-white"
                : "border-gray-300 border-2"
            } rounded-md`}
            onClick={() => setSelected({ value: "ckBTC" })}
          >
            <span className="text-sm uppercase min-w-max">CKBTC WALLET</span>
            {selected.value === "ckBTC" && (
              <span>
                <RiVerifiedBadgeFill color="white" size={20} />
              </span>
            )}
          </button>
        </div>
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
              <span>{((nft * quantity) / exchange).toFixed(6)}</span>
              <span className="text-gray-500">
                ({(nft * quantity).toFixed(3)} USD)
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
            onClick={() => onOpen(false)}
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

// const BuyLoader = () => {
//   return (
//     <div className="bg-white rounded-2xl p-4 md:px-6">
//       <h4 className="text-sm py-2 flex items-center justify-center w-full font-semibold">
//         <span className="bg-gray-500 animate-pulse text-transparent rounded-md">
//           You are about to make a purchase!
//         </span>
//       </h4>
//       <div className="flex w-full items-center justify-center">
//         <div className="min-h-48 min-w-40 max-h-48 max-w-40 rounded-md overflow-hidden animate-pulse">
//           <img
//             src={champsImg}
//             alt="champs-img"
//             className="object-cover min-h-48 min-w-40 max-h-48 max-w-40"
//           />
//         </div>
//       </div>
//       <p className="py-2 text-xs text-center text-gray-500">
//         <span className="bg-gray-500 animate-pulse rounded-md">
//           You are about to purchase this NFT from your connected wallet.
//         </span>
//       </p>
//       <div className="my-2 h-px w-full bg-gray-300"></div>
//       <h4 className="font-semibold capitalize bg-gray-300">
//         <span className="text-transparent">payment method</span>
//       </h4>
//       <div className="grid md:grid-cols-2 gap-x-2 gap-y-2 my-2 font-semibold">
//         <button className="p-4 flex justify-between items-center border-2 border-gray-300 rounded-md bg-gray-300 animate-pulse text-transparent">
//           icp
//         </button>
//         <button className="p-4 flex justify-between items-center border-2 border-gray-300 rounded-md bg-gray-300 animate-pulse text-transparent">
//           ckbtc
//         </button>
//       </div>
//       <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
//         <span className="bg-gray-500 animate-pulse text-transparent rounded-md">
//           Share
//         </span>
//         <button className="flex border rounded-md overflow-hidden items-center bg-gray-300 animate-pulse text-transparent">
//           <div className="flex items-center justify-center p-2 bg-gray-300 h-full">
//             <HiMinus className="h-6" color="rgb(209 213 219)" />
//           </div>
//           <span className="flex items-center justify-center px-4 py-2">1</span>
//           <div className="flex items-center justify-center p-2 bg-gray-300 h-full">
//             <HiPlus className="h-6" />
//           </div>
//         </button>
//       </div>
//       <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
//         <span className="rounded-md text-transparent bg-gray-300 animate-pulse">
//           Total
//         </span>
//         <div className="flex gap-1 items-center text-transparent bg-gray-300 animate-pulse rounded-md">
//           <IcpLogo size={16} />
//           <span>1.392912</span>
//           <span className="text-transparent">(15.000 USD)</span>
//         </div>
//       </div>
//       <div className="py-2 text-xs text-start max-w-96 font-medium text-transparent">
//         <span className="bg-gray-500 animate-pulse rounded-md">
//           This process may take a minute. Transactions can not be reversed. By
//           clicking confirm you show acceptance to our
//         </span>
//         <span className="underline ml-1">Terms and Service</span>.
//       </div>
//       <div className="flex justify-end items-center space-x-4 my-2 text-transparent">
//         <button className="px-4 py-2 rounded-md border-2 border-gray-300 bg-gray-300 animate-pulse">
//           cancel
//         </button>
//         <button className="px-4 py-2 rounded-md font-medium bg-gray-300 animate-pulse">
//           confirm
//         </button>
//       </div>
//     </div>
//   );
// };

export default ProductCard;
