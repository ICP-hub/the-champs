import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import herobg from "../../assets/herobg.jpg";
import profile from "../../assets/user.jpg";
import { IoCopyOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { Link } from "react-router-dom";
const NFTList = () => {
  const [copied, setCopied] = useState(false);
  const textToCopy =
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe";
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const sampleData = [
    {
      title: "Product 1",
      category: "Category A",
      status: "Active",
      price: "$10",
      inventory: 100,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=740&t=st=1713351871~exp=1713352471~hmac=ed679c41842035c86855182a5cdfd9b4317fac54471101d127d87f9cdd467412", // Sample NFT image link
      slug: "product-1",
    },
    {
      title: "Product 2",
      category: "Category B",
      status: "Paused",
      price: "$20",
      inventory: 50,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
    {
      title: "Product 2",
      category: "Category B",
      status: "Paused",
      price: "$20",
      inventory: 50,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
    {
      title: "Product 2",
      category: "Category B",
      status: "Paused",
      price: "$20",
      inventory: 50,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
    {
      title: "Product 2",
      category: "Category B",
      status: "Paused",
      price: "$20",
      inventory: 50,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
    {
      title: "Product 2",
      category: "Category B",
      status: "Paused",
      price: "$20",
      inventory: 50,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
  ];
  return (
    <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl mt-6">
      <h1 className="text-xl  mx-4 mb-6 font-semibold"> NFT Collection Name</h1>
      <div>
        <div className="flex w-full gap-4 mb-6">
          <div className="flex w-full items-center gap-2 bg-[#fff] text-xl md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500 py-2 px-4 rounded-2xl">
            <FiSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search Ls of Collections..."
              className="w-full bg-[#fff] text-sm md:text-[16px]  dark:bg-[#2e2e48] outline-none"
            />
          </div>
          <div className="flex items-center justify-end gap-2 bg-[#fff] text-xl md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500 py-2 px-4 rounded-2xl">
            Filter <LuFilter />
          </div>
        </div>
        <div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
            {sampleData.map((item, index) => (
              <div>
                <div
                  className=" w-full h-80 flex flex-col justify-between rounded-xl  "
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <div className="flex  mx-2 py-2 justify-between ">
                    <div className="flex gap-1 dark:bg-[#38385470] bg-[#ffffff30] px-1  rounded-3xl items-center">
                      <div className="">
                        <img
                          className="rounded-full w-9 h-9"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <h4 className="text-sm"> Collection Name</h4>
                      </div>
                    </div>
                    <div className="dark:bg-[#38385470] bg-[#ffffff30] p-2 rounded-full">
                      <h1>Creator Name*</h1>
                    </div>
                  </div>
                  <div className=" dark:bg-[#38385470] bg-[#ffffff30]  mx-2 p-1 mt-auto mb-2 rounded-2xl ">
                    <div className="flex justify-between  ">
                      <div>
                        <div className="flex flex-col mx-2">
                          <span className="  text-[16px]">Website URL*</span>
                          <span className="font-semibold text-[16px] ">
                            <a href="https://t4vpt-6qaaa-aaaak-aff6q-cai.icp0.io/">
                              Link
                            </a>
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col mx-2">
                          <span className="  text-[16px]">Creator fee</span>
                          <span className="font-semibold text-[16px] ">3%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 mx-2  my-2">
                      <div className="bg-transparent">
                        <Link
                          to={`/users/:sdf/collection-detail/${item.slug}`}
                          className="uppercase dark:bg-[#2e2e48] bg-[#fff]  flex items-center justify-start gap-3 px-2 py-1 rounded-xl  bg:text-[#e1e1e1]"
                        >
                          View
                        </Link>
                      </div>
                      <div className="">
                        <Link
                          to={`/users/:sdf/update-collections`}
                          className="uppercase bg-red-500  shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-2 py-1 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
                        >
                          detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTList;
