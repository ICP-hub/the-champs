import React, { useState, useEffect } from "react";
import nftgeek from "../assets/icons/Nftgeek.svg";
import toniq from "../assets/icons/toniq.svg";
import Card from "../components/common/Card";
import { IoArrowBack } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import ReadMore from "../components/common/ReadMore";
import nft from "../assets/nft.png";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MyProfileActivity from "../components/myProfile/MyProfileActivity";
import { Link, useParams } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import { useCanister, useTransfer, useConnect } from "@connect2ic/react";
import { TailSpin } from "react-loader-spinner";
import placeholderimg from "../assets/CHAMPS.png";
import { RadioGroup } from "@headlessui/react";
import IcpLogo from "../assets/IcpLogo";
import toast from "react-hot-toast";
import BuyNowModal from "../components/common/BuyNowCard";
import IconWrapper from "../components/common/IconWrapper";
import { RiErrorWarningLine } from "react-icons/ri";

const plans = [
  {
    name: "ICP",
    value: "icp",
  },
  {
    name: "Fiat Payment",
    value: "fiat-payment",
  },
  {
    name: "CKBTC Wallet",
    value: "ckBTC",
  },
  // {
  //   name: "Pay with paypal",
  //   value: "paypal-payment",
  // },
];
const usePaymentTransfer = (fee) => {
  // Receiver address will be in .env file : for now dev id
  const [transfer] = useTransfer({
    to: "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
    amount: Number(fee),
  });

  return transfer;
};

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const { index, id } = useParams();
  const [backend] = useCanister("backend");
  const [nft, getNft] = useState("");
  const [confirm, setConfirm] = useState(true);
  let [selected, setSelected] = useState(plans[0]);
  const { principal, disconnect } = useConnect();
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState();
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [license, setLicense] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [exchange, setExchange] = useState(1);

  const paymentAddressForTransfer = usePaymentTransfer(
    parseInt(nft[0]?.fractional_token?.fee)
  );
  const getNftDetails = async () => {
    try {
      const canister_id = Principal.fromText(id);

      const res = await backend.getcollectionwisefractionalnft(canister_id);

      const nftDetails = res.filter((item) => item[1].toText() === index);

      getNft(nftDetails);
      console.log(nftDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const buyTokens = async () => {
    try {
      const paymentMethod = selectedPlan.value;
      let paymentOpt = null;
      if (paymentMethod == "ckEth") {
        paymentOpt = { cketh: null };
      } else if (paymentMethod == "SOL") {
        paymentOpt = { solana: "test" };
      } else if (paymentMethod == "ckBTC") {
        paymentOpt = { ckbtc: null };
      } else {
        paymentOpt = { icp: null };
      }
      setLoading(true);

      console.log(paymentOpt, paymentMethod, "paymentmethod");

      const res = await backend.buytokens(
        nft[0][1],
        nft[0][0]?.fractional_token?.owner,
        principal,

        1,
        paymentOpt,
        nft[0][0]?.nft?.priceinusd?.toFixed(4) / exchange
      );

      console.log(res, "hello");
      if (res) {
        setLoading(false);
        toast.success("nft purchased successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Disable scroll when modal is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    getNftDetails();

    // Cleanup: Enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, backend, nft]);

  const handleConfirm = () => {
    // Call usePaymentTransfer function only if the selected plan is "Plug Wallet"

    paymentAddressForTransfer(); // Call the usePaymentTransfer function

    buyTokens();

    setOpen(!open);
    setConfirm(true);
  };

  const handler = () => {
    setOpen(!open);
    setConfirm(true);
  };

  const addToFavourites = async () => {
    try {
      setLoading(true);
      const canister_id = Principal.fromText(id);
      const res = await backend.addfavourite(
        canister_id,
        parseInt(nft[0].nft.id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getFavourites = async () => {
    try {
      const res = await backend.getfavourites();

      setFavourites(res);
    } catch (error) {
      console.log(error);
    }
  };

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

    try {
      const res = await backend.get_exchange_rates(
        { class: paymentOpt, symbol: "usd" }, // Assuming paymentOpt is for USD (dollar)
        { class: paymentOpt1, symbol: "icp" } // Assuming paymentOpt1 is for ICP (Internet Computer Protocol)
      );
      console.log(res);
      const exchangeRate =
        parseInt(res?.ok?.rate) / Math.pow(10, res?.ok?.metadata?.decimals);
      console.log(exchangeRate);
      setExchange(exchangeRate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExchangeRate();
    getFavourites();

    // if (favourites != null) {
    //   const isProductInWishlist = favourites.some(
    //     (item) => item[0].id === nft[0].nft.id && item[1].toText() === id
    //   );
    //   setProductInFavourites(isProductInWishlist);
    // }
  }, [nft, favourites]);

  return (
    <>
      {!open && <Header />}

      {loading2 ? (
        <div>
          <div class="md:mt-24 mt-8 left-0 right-0 gap-8 px-6 lg:px-24">
            <div class="space-y-4 animate-pulse"></div>

            <div class="md:flex gap-8 mt-8 space-y-4 md:space-y-0">
              <div class="md:w-1/4 w-full mb-16 space-y-4">
                <div class="h-full bg-gray-200 rounded w-full animate-pulse"></div>
              </div>

              <div class="gap-8 md:w-3/4 space-y-4">
                <div class="flex items-center gap-4">
                  <div class="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
                <div class="flex items-center justify-between mt-10 space-y-4 md:space-y-0">
                  <div class="space-y-2">
                    <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                  <div class="text-center">
                    <div class="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
                <div class="flex justify-between mt-6 space-y-4 md:space-y-0">
                  <div class="flex">
                    <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div>
                    <div class="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
                <div class="w-full flex items-center justify-center mt-5 mb-8">
                  <div class="w-full rounded-2xl border-[1px] border-gray-400 p-6 space-y-4">
                    <div class="md:flex justify-start gap-2">
                      <div class="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                    <div class="mt-6 break-words space-y-2">
                      <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
              <TailSpin color="#FC001E" height={80} width={80} />
            </div>
          )}

          <div className="md:mt-24 mt-8 left-0 right-0 gap-8 px-6 lg:px-24">
            <BuyNowModal
              isOpen={open}
              onClose={() => setOpen(false)}
              nft={nft}
              plans={plans}
              selected={setSelectedPlan}
              handleConfirm={handleConfirm}
              handler={handler}
              exchange={exchange}
            />
            {license && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className=" z-10 bg-white p-4 w-[30%] rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
                  <IconWrapper>
                    <RiErrorWarningLine size={36} />
                  </IconWrapper>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                  <button
                    className="mt-2 px-4 py-2 button bg-blue-500 text-white rounded-lg"
                    onClick={() => setLicense(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="md:flex gap-8">
              <div className="md:w-1/4 w-full  mb-16 ">
                <Card
                  nftgeek={nftgeek}
                  toniq={toniq}
                  logo={nft[0][0]?.fractional_token?.logo}
                />
              </div>
              <div className=" gap-8 md:w-3/4  ">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/collection/${id}`}
                    className="text-xl font-medium flex items-center gap-2"
                  >
                    <IoArrowBack />
                    Back to Collections
                  </Link>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <div className="">
                    <h1 className="text-3xl font-bold font-sans   ">
                      <span className=" text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
                        {nft[0][0]?.fractional_token?.name}
                      </span>
                    </h1>
                    <p
                      className="
            text-gray-500 text-sm mt-4"
                    >
                      By {id}
                    </p>
                  </div>
                  <div className="text-center ">
                    {productInFavourites ? (
                      <button>
                        {" "}
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
                        {" "}
                        <CiHeart size={32} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between  mt-6">
                  <div className=" flex">
                    <span className="text-2xl flex font-semibold items-center gap-1">
                      {nft[0][0]?.nft?.priceinusd?.toFixed(4) / exchange}
                      <span>ICP</span>
                      <span className="text-lg text-gray-500">
                        ({nft[0][0]?.nft?.priceinusd?.toFixed(4)} USD){" "}
                      </span>
                    </span>
                  </div>
                  <div>
                    <button
                      className="   button bg-opacity-100 text-white   rounded-md  px-5 py-2 text-md flex items-center justify-center"
                      onClick={() => setOpen(!open)}
                    >
                      {" "}
                      Buy now
                    </button>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center mt-5 mb-8">
                  <div className=" w-full   rounded-2xl   border-[1px] border-gray-400 ">
                    <div className="m-6">
                      <div className="md:flex justify-start gap-2 ">
                        <p className="font-bold text-lg ">Details</p>
                        <div className="flex mb-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.6158 16.792L12.8218 16.547C12.8759 16.4826 12.942 16.4294 13.0166 16.3905C13.0912 16.3517 13.1727 16.3279 13.2565 16.3206C13.3402 16.3132 13.4246 16.3225 13.5048 16.3478C13.585 16.3731 13.6594 16.4139 13.7238 16.468L14.2148 16.88C14.2793 16.934 14.3324 17.0002 14.3713 17.0748C14.4101 17.1494 14.4339 17.2309 14.4413 17.3146C14.4486 17.3984 14.4393 17.4828 14.4141 17.563C14.3888 17.6432 14.3479 17.7176 14.2938 17.782L12.2348 20.233C11.9341 20.5904 11.559 20.8778 11.1356 21.075C10.7123 21.2723 10.2509 21.3747 9.78384 21.375C9.03118 21.3746 8.30265 21.1095 7.72584 20.626L5.27384 18.568C4.91615 18.2669 4.62861 17.8912 4.43135 17.4673C4.23408 17.0434 4.13186 16.5815 4.13184 16.114C4.13184 15.362 4.39784 14.635 4.88384 14.059L8.58684 9.649V9.646C9.13361 8.99722 9.9154 8.59181 10.7607 8.5187C11.606 8.44559 12.4458 8.71074 13.0958 9.256L14.5518 10.479C14.8218 10.706 14.8568 11.111 14.6298 11.382L14.2208 11.87C14.1116 11.9999 13.9553 12.0812 13.7862 12.096C13.6171 12.1108 13.449 12.0579 13.3188 11.949L11.8598 10.725C11.5997 10.5082 11.2644 10.403 10.927 10.4324C10.5896 10.4618 10.2775 10.6234 10.0588 10.882L6.35284 15.295C6.16084 15.525 6.05184 15.816 6.05184 16.117C6.05184 16.495 6.22184 16.853 6.50984 17.096L8.96084 19.154C9.08918 19.2626 9.23776 19.3448 9.39801 19.3957C9.55827 19.4467 9.72702 19.4654 9.89453 19.4508C10.0621 19.4362 10.225 19.3886 10.3741 19.3107C10.5231 19.2328 10.6552 19.1262 10.7628 18.997L12.6158 16.792ZM13.1438 7.208L12.9368 7.453C12.8278 7.58285 12.6716 7.6641 12.5027 7.67892C12.3337 7.69373 12.1658 7.64089 12.0358 7.532L11.5438 7.12C11.4795 7.06591 11.4264 6.99967 11.3876 6.92506C11.3489 6.85044 11.3252 6.76893 11.3179 6.68516C11.3107 6.6014 11.32 6.51702 11.3454 6.43687C11.3708 6.35671 11.4117 6.28234 11.4658 6.218L13.5248 3.767C13.8255 3.4096 14.2007 3.12222 14.624 2.92496C15.0474 2.7277 15.5088 2.62533 15.9758 2.625C16.7278 2.625 17.4578 2.891 18.0338 3.374L20.4848 5.432C20.8425 5.73311 21.1301 6.10876 21.3273 6.53266C21.5246 6.95656 21.6268 7.41845 21.6268 7.886C21.6272 8.63839 21.3607 9.36653 20.8748 9.941L17.1728 14.351V14.354C16.6261 15.0028 15.8443 15.4082 14.999 15.4813C14.1537 15.5544 13.3139 15.2893 12.6638 14.744L11.2068 13.521C11.077 13.4114 10.9959 13.2549 10.9813 13.0856C10.9667 12.9164 11.0197 12.7482 11.1288 12.618L11.5388 12.13C11.6479 12.0001 11.8041 11.9189 11.973 11.9041C12.1419 11.8893 12.3098 11.9421 12.4398 12.051L13.8988 13.275C14.1594 13.4914 14.4947 13.5963 14.8321 13.5669C15.1695 13.5375 15.4817 13.3762 15.7008 13.118L19.4068 8.705C19.5988 8.475 19.7068 8.184 19.7068 7.883C19.7068 7.505 19.5378 7.147 19.2498 6.904L16.7978 4.846C16.6695 4.73751 16.521 4.65548 16.3608 4.60463C16.2007 4.55378 16.0321 4.53511 15.8647 4.5497C15.6973 4.5643 15.5344 4.61186 15.3855 4.68966C15.2365 4.76745 15.1044 4.87395 14.9968 5.003L13.1438 7.208Z"
                              fill="black"
                              fill-opacity="0.87"
                            />
                          </svg>
                          <p className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold cursor-pointer">
                            view-on-chain
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-2">
                          <FaRegUserCircle />
                          <p className="text-sm font-bold">owner : </p>
                          <span className="text-sm  text-transparent truncate w-20 bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold">
                            {nft[0][0]?.nft?.owner.toText()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <CiMemoPad />
                          <span
                            className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold cursor-pointer"
                            onClick={() => {
                              setLicense(true);
                            }}
                          >
                            License
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 break-words">
                        {nft[0][0]?.nft?.metadata[0]?.description && (
                          <ReadMore
                            text={nft[0][0]?.nft?.metadata[0]?.description}
                            maxLength={100}
                            readmore={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <MyProfileActivity /> */}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

const Cards = () => {
  return (
    <>
      <div className=" h-36 rounded-2xl shadow-lg ">
        <p className="w-full bg-gray-200 rounded-t-lg text-center text-sm h-8 flex items-center justify-center ">
          Flower
        </p>
        <p className="w-full text-center flex items-center justify-center h-28 font-bold">
          Diamond
        </p>
      </div>
    </>
  );
};
export default ProductDetails;
