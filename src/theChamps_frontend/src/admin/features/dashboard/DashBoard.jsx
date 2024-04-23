import {
  CiHashtag,
  CiReceipt,
  CiShop,
  CiViewBoard,
  CiVideoOn,
  CiMail,
} from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import Eth from "../../assets/eth.jpg";
import nft from "../../assets/nft2.jpg";
import profile2 from "../../assets/profile2.jpg";
import profile from "../../assets/profile.jpg";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import Model from "../../pages/Model";
import { Toaster, toast } from "react-hot-toast";

const DashBoard = () => {
  function openModal() {
    setIsOpen(true);
  }
  const notify = () =>
    toast.success("I have a border.", {
      style: {
        color: "#ffffff",
        fontSize: "16px",
        background: "#FC001E",
      },
    });
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4  flex-wrap  md:px-6 md:p-0 p-2 mt-6">
      <div className="flex flex-col md:flex-row  w-full justify-between">
        <div className="md:w-4/6 w-full dark:text-[#e0e0e0] text-[#676767] box-s dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-2xl p-4">
          <div className="flex justify-between items-center gap-2 mb-4">
            <h4 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
              Popular this week
            </h4>
            <h4 className="uppercase text-sm font-semibold text-gray-900 dark:text-white">
              {"See All>"}
            </h4>
          </div>
          <div className="flex flex-col md:flex-row  w-full gap-4 overflow-x-auto">
            <div
              className="md:w-1/2 w-full h-96 flex flex-col justify-between rounded-xl  "
              style={{
                backgroundImage: `url(${Eth})`,
                backgroundSize: "cover",
                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="flex  mx-2 py-2 justify-between ">
                <div className="flex gap-1 dark:bg-[#38385470] bg-[#f5f5f530] px-1  rounded-3xl items-center">
                  <div className="">
                    <img
                      className="rounded-full w-9 h-9"
                      src={profile}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-sm">#3adamfnt</h4>
                    <p className="text-[10px]">By Ritesh</p>
                  </div>
                </div>
                <div className="dark:bg-[#38385470] bg-[#ffffff96] p-2 rounded-full">
                  <IoHeart
                    className="  dark:text-[#ffffffcc] text-[#383854d5]"
                    size="24px"
                  />
                </div>
              </div>
              <div className=" dark:bg-[#38385470] bg-[#ffffff20]  mx-2  mt-auto mb-4 rounded-2xl py-2">
                <div className="flex justify-between  ">
                  <div>
                    <div className="flex flex-col mx-2">
                      <span className="font-thin text-white/80 text-[16px]">
                        Current time
                      </span>
                      <span className="font-semibold text-[16px] text-white/80">
                        24H : 24M : 24S
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col mx-2">
                      <span className="font-thin text-white/80 text-[16px]">
                        Current time
                      </span>
                      <span className="font-semibold text-[16px] text-white/80">
                        24H : 24M : 24S
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-2 mx-2 mt-3 mb-1">
                  <div className="bg-transparent">
                    <button
                      onClick={notify}
                      className="dark:bg-[#2e2e48] bg-[#fff] px-4 py-1 rounded-3xl  text-lg"
                    >
                      View artwork
                    </button>
                  </div>
                  <div className="">
                    <button className="bg-red-500 px-4 py-1 rounded-3xl text-white text-lg">
                      <Model isOpen={openModal} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="md:w-1/2 w-full h-96 flex flex-col justify-between rounded-xl  before:bg-black/80"
              style={{
                backgroundImage: `url(${nft})`,
                backgroundSize: "cover",
                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="flex  mx-2 py-2 justify-between ">
                <div className="flex gap-1 dark:bg-[#38385470] bg-[#ffffff30] px-1  rounded-3xl items-center">
                  <div className="">
                    <img
                      className="rounded-full w-9 h-9"
                      src={profile}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="text-sm">#3adamfnt</h4>
                    <p className="text-[10px]">By Ritesh</p>
                  </div>
                </div>
                <div className="dark:bg-[#38385470] bg-[#ffffff96] p-2 rounded-full">
                  <IoHeart
                    className="  dark:text-[#ffffffcc] text-[#383854d5]"
                    size="24px"
                  />
                </div>
              </div>
              <div className=" dark:bg-[#38385470] bg-[#ffffff20]  mx-2  mt-auto mb-4 rounded-2xl py-2">
                <div className="flex justify-between  ">
                  <div>
                    <div className="flex flex-col mx-2">
                      <span className="font-thin text-white/80 text-[16px]">
                        Current time
                      </span>
                      <span className="font-semibold text-[16px] text-white/80">
                        24H : 24M : 24S
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col mx-2">
                      <span className="font-thin text-white/80 text-[16px]">
                        Current time
                      </span>
                      <span className="font-semibold text-[16px] text-white/80">
                        24H : 24M : 24S
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-2 mx-2 mt-3 mb-1">
                  <div className="bg-transparent">
                    <button className="dark:bg-[#2e2e48] bg-[#fff] px-4 py-1 rounded-3xl  text-lg">
                      View artwork
                    </button>
                  </div>
                  <div className="">
                    <button className="bg-red-500 px-4 py-1 rounded-3xl text-white text-lg">
                      Place a bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/6 w-full mt-6 md:mt-0">
          <div className="w-full flex flex-col text-white   ">
            <div className="h-64 dark:text-[#e0e0e0] text-[#676767] box-s dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] justify-center rounded-2xl mx-2  flex flex-col items-center">
              <img className="rounded-full w-24 h-24" src={profile} alt="" />
              <div className="flex flex-col items-center my-4">
                <span className=" text-center ">Total Balance</span>
                <h4 className="text-4xl ">$98,987,00</h4>
                <div className="flex items-center">
                  <span className="bg-[#6565ff] dark:bg-[#fff] mx-2 text-white/80 dark:text-[#6262e0] rounded-2xl my-1 px-2 ">
                    +10.50%
                  </span>
                  <span className=" bg-[#6565ff] dark:bg-[#fff] p-1 text-white/80 dark:text-[#6262e0] rotate-45 rounded-2xl">
                    <IoIosArrowRoundUp />
                  </span>
                </div>
              </div>
            </div>
            <div className="h-48 box-s dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257]  rounded-2xl mx-2  my-2 ">
              <div className="flex mx-2 my-4">
                <div className="mx-2">
                  <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-3xl">
                    Follwing
                  </button>
                </div>
                <div>
                  <button className="px-4 py-2 dark:bg-[#8e8eb9] bg-[#c0c0c069] text-sm rounded-3xl">
                    follower
                  </button>
                </div>
              </div>
              <div className="py-2">
                <div className="flex justify-between mx-4 my-2 items-center">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="rounded-full w-8 h-8"
                        src={profile2}
                        alt=""
                      />
                    </div>
                    <div className="text-md mx-2 ">Ritesh Kumar</div>
                  </div>
                  <div className="text-green-500">+$56,415.00</div>
                </div>{" "}
                <div className="flex justify-between mx-4  my-4  items-center">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="rounded-full w-8 h-8"
                        src={profile}
                        alt=""
                      />
                    </div>
                    <div className="text-md mx-2 ">Ritesh Kumar</div>
                  </div>
                  <div className="text-red-500">-$56,415.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-2/5 w-full dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] px-4 py-4 rounded-2xl my-4">
          <h4 className="uppercase text-xl font-semibold  py-1">
            Recent transition
          </h4>
          <div className="my-3">
            <div className="flex justify-between  items-center">
              <div className="flex items-center">
                <div>
                  <img className="rounded-full w-9 h-9" src={profile2} alt="" />
                </div>
                <div className=" flex flex-col mx-2 ">
                  <span className="text-xl  font-semibold ">Ritesh Kumar</span>
                  <span className="text-sm   ">+$56,415.00</span>
                </div>
              </div>
              <div className="">
                {" "}
                <button className="px-4 py-2 bg-red-500 text-sm rounded-3xl flex items-center gap-2 text-white">
                  <span className=" rotate-45 rounded-2xl">
                    <IoIosArrowRoundDown />
                  </span>{" "}
                  Receive
                </button>
              </div>
            </div>
          </div>
          <div className="my-3">
            <div className="flex justify-between  items-center">
              <div className="flex items-center">
                <div>
                  <img className="rounded-full w-9 h-9" src={profile} alt="" />
                </div>
                <div className=" flex flex-col mx-2 ">
                  <span className="text-xl  font-semibold">Ritesh Kumar</span>
                  <span className="text-sm dark:text-white/80  ">
                    +$56,415.00
                  </span>
                </div>
              </div>
              <div className="text-white">
                {" "}
                <button className="px-4 py-2 bg-[#2e2e48] dark:bg-[#fff] dark:text-[#2e2e48] text-white  text-sm rounded-3xl flex items-center gap-2">
                  <span className=" rotate-45 rounded-2xl">
                    <IoIosArrowRoundUp />
                  </span>{" "}
                  Send
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between  items-center">
              <div className="flex items-center">
                <div>
                  <img className="rounded-full w-9 h-9" src={profile2} alt="" />
                </div>
                <div className=" flex flex-col mx-2 ">
                  <span className="text-xl  font-semibold ">Ritesh Kumar</span>
                  <span className="text-sm   ">+$56,415.00</span>
                </div>
              </div>
              <div className="text-white">
                {" "}
                <button className="px-4 py-2 bg-red-500 text-sm rounded-3xl flex items-center gap-2">
                  <span className=" rotate-45 rounded-2xl">
                    <IoIosArrowRoundDown />
                  </span>{" "}
                  Receive
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 w-full dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] px-4 py-4 rounded-2xl mx-2 my-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h4 className="text-xl font-semibold  py-1">My sales in OpenSea</h4>
            <div className="flex">
              <div className="mx-2">
                <span className="px-4 py-1 bg-[#2e2e48] dark:bg-[#fff] dark:text-[#2e2e48] text-white rounded-2xl">
                  1D
                </span>
              </div>
              <div className="mx-2">
                <span className="px-4 py-1 bg-red-500 rounded-2xl text-white">
                  1W
                </span>
              </div>
              <div className="mx-2">
                <span className="px-4 py-1 bg-[#2e2e48] dark:bg-[#fff] dark:text-[#2e2e48] text-white rounded-2xl">
                  1M
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col  items-center mt-10">
            <span className="flex items-center justify-start gap-3">
              This Week{" "}
              <span className="bg-green-600 rounded-2xl">
                <IoIosArrowRoundUp />
              </span>
            </span>
            <h4 className="text-4xl ">$98,987.00</h4>
          </div>
          <div className="mt-20 flex justify-between">
            <span className="">Sun</span>
            <span className="">Mon</span>
            <span className="">Tue</span>
            <span className="">Wed</span>
            <span className="">Thu</span>
            <span className="">Fri</span>
            <span className="">Sat</span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default DashBoard;
