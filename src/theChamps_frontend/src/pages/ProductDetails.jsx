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

const plans = [
  {
    name: "Plug Wallet",
    value: "plug-wallet",
  },
  {
    name: "Fiat Payment",
    value: "fiat-payment",
  },
  // {
  //   name: "Pay with paypal",
  //   value: "paypal-payment",
  // },
];
const usePaymentTransfer = () => {
  // Receiver address will be in .env file : for now dev id
  const [transfer] = useTransfer({
    to: "uktss-xp5gu-uwif5-hfpwu-rujms-foroa-4zdkd-ofspf-uqqre-wxqyj-cqe",
    amount: Number(0),
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

  const paymentAddressForTransfer = usePaymentTransfer(20);
  const getNftDetails = async () => {
    try {
      const canister_id = Principal.fromText(id);
      const id1 = parseInt(index);

      const res = await backend.getcollectionwisefractionalnft(canister_id);

      getNft(res[index]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyTokens = async () => {
    try {
      const canister_id = Principal.fromText("dzh22-nuaaa-aaaaa-qaaoa-cai");
      const canister_id2 = Principal.fromText("d6g4o-amaaa-aaaaa-qaaoq-cai");
      const user_id = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
      const user_id2 = Principal.fromText(user_id);

      console.log("hello");
      const res = await backend.buytokens(
        user_id2,
        canister_id2,
        canister_id,
        1
      );

      console.log(res, "hello");
    } catch (error) {
      console.log(error);
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
    if (selected.value === "plug-wallet") {
      paymentAddressForTransfer(); // Call the usePaymentTransfer function

      buyTokens();
    }
    setOpen(!open);
    setConfirm(true);
  };

  const handler = () => {
    setOpen(!open);
    setConfirm(true);
  };
  return (
    <>
      <Header />
      <div className="md:mt-44 mt-44 left-0 right-0 gap-8 px-6 lg:px-24">
        {open && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
            <div className=" mt-16  md:w-[28%]  relative z-50 rounded-xl bg-white p-8 pb-4  ">
              <p className="text-center font-bold text-sm">
                You are about to make a purchase!
              </p>
              <div className="flex items-center justify-center mt-4">
                <img
                  src={placeholderimg}
                  alt=""
                  className="w-1/2 h-40  rounded-lg shadow-md
                    "
                />
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm">
                You are about to purchase this NFT from your connected wallet.
              </p>
              <div className="border-[1px] mt-2 mb-4 border-gray-200 w-full"></div>
              <RadioGroup>
                <RadioGroup.Label className="text-black xl:text-sm  text-xs font-semibold uppercase tracking-wider w-full">
                  Payment Method
                </RadioGroup.Label>
                <div className="grid xl:grid-cols-2 grid-cols-2 gap-4 pt-2  max-sm:flex max-sm:flex-col font-medium">
                  {plans.map((plan) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan}
                      className={({ active, checked }) =>
                        `border-2 p-3 rounded-xl text-sm uppercase ${
                          checked
                            ? " button text-white  border-none "
                            : "bg-white"
                        }`
                      }
                    >
                      {({ checked }) => (
                        <RadioGroup.Label className="flex justify-between w-full ml-2 items-center">
                          <p>{plan.name}</p>
                          {checked && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-6 w-6"
                            >
                              <circle
                                cx={12}
                                cy={12}
                                r={12}
                                fill="#fff"
                                opacity="0.2"
                              />
                              <path
                                d="M7 13l3 3 7-7"
                                stroke="#fff"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </RadioGroup.Label>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex items-center justify-between font-bold text-sm mt-4">
                <p>TOTAL:</p>
                <p>$5.54</p>
              </div>
              <div className="mt-2 text-center text-gray-400 text-xs">
                This process may take a minute. Transactions can not be
                reversed. By clicking confirm you show acceptance to our{" "}
                <span className="text-[#FC001E] underline">
                  {" "}
                  Terms and Service
                </span>
                .
              </div>
              <div className="flex items-center justify-end mt-4 text-md text-gray-400 font-medium">
                <button className="mr-8" onClick={handler}>
                  Cancel
                </button>

                <button className="text-[#FC001E] " onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="md:flex gap-8">
          <div className="md:w-1/4 w-full  mb-16 ">
            <Card nftgeek={nftgeek} toniq={toniq} />
          </div>
          <div className=" gap-8 md:w-3/4  ">
            <div className="flex items-center gap-4">
              <IoArrowBack />
              <Link to="/collection" className="text-xl font-medium">
                Back to Collections
              </Link>
            </div>
            <div className="flex items-center justify-between mt-10">
              <div className="">
                <h1 className="text-3xl font-bold font-sans   ">
                  <span className=" text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
                    {nft?.fractional_token?.name}
                  </span>
                </h1>
                <p
                  className="
            text-gray-500 text-sm mt-4"
                >
                  By {nft?.fractional_token?.owner.toText()}
                </p>
              </div>
              <div className="text-center ">
                <CiHeart size={28} />
              </div>
            </div>
            <div className="flex justify-between  mt-6">
              <div className="">
                <span className="font-medium">$24</span>
                <s className="ml-1 text-gray-400 text-xs">70</s>
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
                      <p className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold">
                        view-on-chain
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <FaRegUserCircle />
                      <p className="text-sm font-bold">owner : </p>
                      <span className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold">
                        xu4ui-cp5wm...
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <CiMemoPad />
                      <span className="text-sm  text-transparent  bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text font-bold">
                        License
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <ReadMore
                      text={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                      }
                      maxLength={200}
                      readmore={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MyProfileActivity />
      </div>
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
