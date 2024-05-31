import React from "react";
import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import IcpLogo from "../../assets/IcpLogo";
import ReadMore from "./ReadMore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useCanister, useConnect } from "@connect2ic/react";
import toast from "react-hot-toast";
import useClipboard from "react-use-clipboard";
import IconWrapper from "../common/IconWrapper";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";

const SidebarMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { principal, disconnect, isConnected } = useConnect();
  const [isCopied, setCopied] = useClipboard(principal, {
    successDuration: 1000,
  });

  // const [realBal, setRealBal] = useState(0);
  const navigate = useNavigate();

  // Redux : authSlice
  // const userInfo = useSelector((state) => state.auth);
  // const user = userInfo?.userPlugPrincipal;
  // const rincipal = Principal?.fromText(user);
  // Effect for displaying real balance : Filter keep icp for now : Modify as required
  // useEffect(
  //   function () {
  //     if (assets) {
  //       assets.map((wallet) => {
  //         if (wallet.name === "ICP") {
  //           setRealBal(wallet.amount);
  //         }
  //       });
  //     }
  //   },
  //   [principal]
  // );

  // console.log(userInfo);

  return (
    <div className="py-4 mt-24 ">
      {/* Your sidebar content goes here */}
      <h2 className="text-md px-4   mb-4 text-gray-500 text-left ">
        Connected Wallet
      </h2>
      <div className=" w-full hover:bg-gray-200">
        <div className="sm:flex px-4 py-2 items-center justify-between w-[90%]">
          <div className="w-12  h-12 rounded-full border border-gray-700 flex items-center justify-center">
            <Avatar
              size={40}
              name={principal}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className=" text-left">
            <p>USER ID</p>
            <p className="text-gray-500">
              <ReadMore text={principal || ""} maxLength={15} />
            </p>
          </div>
          <button
            className="text-[#FF7D57]"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115.77 122.88"
              width="20"
              height="15"
              className="gradient-icon"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#FC001E" />
                  <stop offset="100%" stopColor="#FF7D57" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M11.68,1.95C8.95-0.7,4.6-0.64,1.95,2.08c-2.65,2.72-2.59,7.08,0.13,9.73l54.79,53.13l4.8-4.93l-4.8,4.95 c2.74,2.65,7.1,2.58,9.75-0.15c0.08-0.08,0.15-0.16,0.22-0.24l53.95-52.76c2.73-2.65,2.79-7.01,0.14-9.73 c-2.65-2.72-7.01-2.79-9.73-0.13L61.65,50.41L11.68,1.95L11.68,1.95z"
              />
            </svg>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="inset-0 z-50  mt-32 flex items-start justify-center  bg-opacity-50">
          <div className="  p-6 rounded-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 hover:text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div
              className=" pt-1 bg-white text-gray-700 rounded-2xl "
              style={{ boxShadow: " 4px 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
              <div className=" p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 115.77 122.88"
                  width="20"
                  height="20"
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
                    d=" M16.08,59.26A8,8,0,0,1,0,59.26a59,59,0,0,1,97.13-45V8a8,8,0,1,1,16.08,0V33.35a8,8,0,0,1-8,8L80.82,43.62a8,8,0,1,1-1.44-15.95l8-.73A43,43,0,0,0,16.08,59.26Zm22.77,19.6a8,8,0,0,1,1.44,16l-10.08.91A42.95,42.95,0,0,0,102,63.86a8,8,0,0,1,16.08,0A59,59,0,0,1,22.3,110v4.18a8,8,0,0,1-16.08,0V89.14h0a8,8,0,0,1,7.29-8l25.31-2.3Z"
                  />
                </svg>
                Refresh
              </div>

              <button
                className=" p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full cursor-pointer "
                onClick={() => {
                  setCopied();
                  toast.success("Address copied successfully");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 115.77 122.88"
                  width="20"
                  height="20"
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
                    d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"
                  />
                </svg>
                Copy Address
              </button>

              <div className="  p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 115.77 122.88"
                  width="20"
                  height="20"
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
                    d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"
                  />
                </svg>
                View In Explorer
              </div>
              <div className=" p-2 px-4 flex gap-8 mt-2 items-center text-lg hover:bg-gray-200 w-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 115.77 122.88"
                  width="20"
                  height="20"
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
                    d=" M23.71,111.63a32.57,32.57,0,0,1-3.49-.43l-6.12-.88-3.78-.63c-1.22-.22-2.45-.46-3.66-.73s-2.47-.58-3.53-.86l-1.44-.39V84.06l6.69.55,4.91.29,5.15.23,5.22.16,5.07.1,4.72,0c1.43,0,2.68,0,3.76-.14a22.78,22.78,0,0,0,3-.45,9.46,9.46,0,0,0,2.09-.71,4.65,4.65,0,0,0,1.26-.86,2.7,2.7,0,0,0,.63-1,4.47,4.47,0,0,0,.24-1.55V79.15a3.09,3.09,0,0,0-1.2-2.72,5.5,5.5,0,0,0-1.63-.8,7,7,0,0,0-2-.27h-6.9a49.84,49.84,0,0,1-13.82-1.75A27.5,27.5,0,0,1,8.5,68.25a22,22,0,0,1-6.43-9.72A42.4,42.4,0,0,1,0,44.51V40.22A35.58,35.58,0,0,1,2.29,27a23.85,23.85,0,0,1,7-9.67,32.26,32.26,0,0,1,6.92-4.57,28.29,28.29,0,0,1,7.49-2.25V0H45.52V10.07a91.3,91.3,0,0,1,9.93,1.43l1.84.32c1.53.27,3.05.56,4.56.88s2.78.59,4.08.9l1.48.36V37.64l-2.1-.18c-2.08-.18-4.19-.34-6.31-.47-2.31-.15-4.67-.27-7.08-.38s-4.9-.19-7.09-.24c-2,0-4.17-.07-6.44-.07-1.19,0-2.29,0-3.29.12a26.91,26.91,0,0,0-2.88.36,8.23,8.23,0,0,0-2,.63,4.82,4.82,0,0,0-1.34.92,3,3,0,0,0-.71,1.18,6.19,6.19,0,0,0-.29,2v1.3a5.49,5.49,0,0,0,.36,2.12,3.47,3.47,0,0,0,1,1.33,4.92,4.92,0,0,0,1.91.9,13.07,13.07,0,0,0,3.25.35H43a39.54,39.54,0,0,1,8.77.92,26.84,26.84,0,0,1,7.35,2.79A24.48,24.48,0,0,1,69,61.4a28.62,28.62,0,0,1,2.46,6.79,34.51,34.51,0,0,1,.82,7.57v4.3A51.37,51.37,0,0,1,71.1,91.38,26.08,26.08,0,0,1,67.61,100a22.65,22.65,0,0,1-5.7,6,24.53,24.53,0,0,1-7.62,3.63l-.73.2a43,43,0,0,1-8,1.74v11.35H23.71V111.63Z"
                  />
                </svg>
                Check Payment
              </div>
              <div className="border-[1px] mt-4 border-gray-200 w-full m-0"></div>
              <div className=" p-2 px-4 flex gap-8 mb-2 items-center text-lg hover:bg-gray-200 hover:rounded-b-2xl w-full overflow-hidden cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 115.77 122.88"
                  width="20"
                  height="20"
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
                    d="M2.892,56.036h8.959v-1.075V37.117c0-10.205,4.177-19.484,10.898-26.207v-0.009 C29.473,4.177,38.754,0,48.966,0C59.17,0,68.449,4.177,75.173,10.901l0.01,0.009c6.721,6.723,10.898,16.002,10.898,26.207v17.844 v1.075h7.136c1.59,0,2.892,1.302,2.892,2.891v61.062c0,1.589-1.302,2.891-2.892,2.891H2.892c-1.59,0-2.892-1.302-2.892-2.891 V58.927C0,57.338,1.302,56.036,2.892,56.036L2.892,56.036z M26.271,56.036h45.387v-1.075V36.911c0-6.24-2.554-11.917-6.662-16.03 l-0.005,0.004c-4.111-4.114-9.787-6.669-16.025-6.669c-6.241,0-11.917,2.554-16.033,6.665c-4.109,4.113-6.662,9.79-6.662,16.03 v18.051V56.036L26.271,56.036z M49.149,89.448l4.581,21.139l-12.557,0.053l3.685-21.423c-3.431-1.1-5.918-4.315-5.918-8.111 c0-4.701,3.81-8.511,8.513-8.511c4.698,0,8.511,3.81,8.511,8.511C55.964,85.226,53.036,88.663,49.149,89.448L49.149,89.448z"
                  />
                </svg>
                <button
                  onClick={() => {
                    disconnect();

                    toast.success("Logout successfully");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <p className="text-center gap-1  flex items-center justify-center w-full my-4 mt-6 px-4">
        <IcpLogo size={18} /> {userInfo?.userPlugBalance}
      </p> */}

      {/* <div className="flex items-center justify-center ">
        <button className="mt-4  font-bold text-[#6D01F6] border-2 border-[#6D01F6]  py-2 px-4 rounded-md w-[90%]">
          Link volt
        </button>
      </div> */}
      {/* <div className="border-[1px] mt-4 border-gray-200 w-full m-0"></div> */}

      <div className="flex items-center justify-center">
        <div className="p-4 text-left text-md rounded-2xl border border-gray-200 w-[90%]  ">
          <p className=" mb-2 text-gray-400">NFTs</p>
          <Link
            to="/collections/collection"
            className="flex gap-8 items-center text-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115.77 122.88"
              width="25"
              height="25"
              className="gradient-icon"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#FC001E" />
                  <stop offset="100%" stopColor="#FF7D57" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M5.535,15.447h98.221c1.527,0,2.891,0.62,3.883,1.611c0.99,0.991,1.611,2.396,1.611,3.882v70.134 c0,1.528-0.621,2.891-1.611,3.883c-0.082,0.082-0.166,0.165-0.289,0.247c-0.951,0.868-2.23,1.363-3.635,1.363H5.494 c-1.528,0-2.892-0.619-3.883-1.61S0,92.562,0,91.075V20.941c0-1.528,0.62-2.891,1.611-3.882s2.396-1.611,3.883-1.611H5.535 L5.535,15.447z M28.218,34.489c4.354,0,7.882,3.528,7.882,7.882s-3.528,7.883-7.882,7.883c-4.354,0-7.882-3.529-7.882-7.883 C20.335,38.018,23.864,34.489,28.218,34.489L28.218,34.489z M61.389,68.316l15.766-27.258l16.748,42.363l-78.165-0.001v-5.254 l6.57-0.327l6.567-16.093l3.282,11.496h9.855l8.537-22.004L61.389,68.316L61.389,68.316z M21.891,6.525 c-1.817,0-3.263-1.486-3.263-3.263C18.628,1.445,20.115,0,21.891,0h97.726c1.816,0,3.262,1.487,3.262,3.263v68.895 c0,1.818-1.486,3.264-3.262,3.264c-1.818,0-3.264-1.487-3.264-3.264V6.567H21.891V6.525L21.891,6.525z M102.723,21.974H6.567 v68.027h96.155V21.974L102.723,21.974z"
              />
            </svg>
            Collected
          </Link>
          <button
            onClick={() => navigate("/my-profile", { state: "2" })}
            className="flex gap-8 mt-4 items-center text-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115.77 122.88"
              width="25"
              height="25"
              className=""
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#FC001E" />
                  <stop offset="100%" stopColor="#FF7D57" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M3.93,7.86A3.93,3.93,0,0,1,3.93,0H14.15l.39,0A18.28,18.28,0,0,1,24.1,2.49a14.69,14.69,0,0,1,6.41,9.1c.32,1.41.66,2.82,1,4.23H119a3.92,3.92,0,0,1,3.93,3.92,4,4,0,0,1-.19,1.22L112.52,62.08a3.92,3.92,0,0,1-3.8,3H44.66c1.44,5.21,2.76,8,4.7,9.34,2.27,1.52,6.31,1.63,13,1.52h.07v0h45.17a3.93,3.93,0,1,1,0,7.86H62.46v0c-8.27.15-13.38-.09-17.46-2.84s-6.36-7.55-8.57-16.3l-13.51-51a7.19,7.19,0,0,0-3-4.49,10.8,10.8,0,0,0-5.51-1.3H3.93ZM96,88.34a9.6,9.6,0,1,1-9.6,9.6,9.6,9.6,0,0,1,9.6-9.6Zm-42.1,0a9.6,9.6,0,1,1-9.6,9.6,9.6,9.6,0,0,1,9.6-9.6ZM78,23.67V38h32.45l3.53-14.28Zm0,22.14V57.22h27.69l2.82-11.41ZM70.11,57.22V45.81H39.63q1.57,5.7,3,11.41Zm0-19.27V23.67H33.54c1.26,4.76,2.58,9.52,3.91,14.28Z"
              />
            </svg>
            selling
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="p-4 text-left text-md rounded-2xl border border-gray-200 w-[90%] ">
          <p className=" mb-2 text-gray-400">Profile</p>
          <button
            className="flex gap-8 items-center text-lg cursor-pointer"
            onClick={() => navigate("/my-profile", { state: "1" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115.77 122.88"
              width="30"
              height="25"
              className="gradient-icon"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#FC001E" />
                  <stop offset="100%" stopColor="#FF7D57" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient)"
                d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41 c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95 C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"
              />
            </svg>
            Favorites
          </button>
          <button
            onClick={() => navigate("/my-profile", { state: "3" })}
            className="flex gap-8 mt-4 items-center text-lg cursor-pointer"
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#FC001E" />
                  <stop offset="100%" stopColor="#FF7D57" />
                </linearGradient>
              </defs>
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none"
                fill="url(#gradient)"
              >
                <path
                  d="M1429 4896 c-20 -7 -49 -22 -65 -34 -16 -11 -228 -220 -470 -464
-482 -484 -470 -469 -462 -579 10 -142 160 -230 296 -174 24 11 126 105 295
273 l257 256 0 -1895 0 -1895 26 -53 c45 -90 140 -134 238 -110 67 16 138 85
154 151 9 35 12 520 12 1925 l0 1878 258 -257 c169 -169 270 -263 294 -273
177 -73 358 110 279 280 -13 27 -172 192 -482 502 -395 392 -470 463 -504 472
-51 14 -81 13 -126 -3z"
                />
                <path
                  d="M3561 4895 c-61 -19 -118 -78 -136 -139 -13 -43 -15 -305 -15 -1930
l0 -1881 -257 257 c-142 141 -272 263 -290 272 -35 18 -128 21 -166 7 -40 -16
-99 -73 -118 -116 -23 -49 -24 -113 -4 -163 11 -25 160 -182 478 -500 436
-437 465 -463 514 -478 61 -18 111 -12 168 21 22 13 241 225 486 472 487 489
475 473 467 584 -10 142 -160 230 -296 174 -24 -11 -126 -105 -294 -273 l-258
-256 0 1896 0 1896 -28 53 c-48 92 -153 136 -251 104z"
                />
              </g>
            </svg>
            Activity
          </button>
          <Link to="/admin" className="flex gap-8 py-4 items-center">
            <IconWrapper>
              <MdDashboard size={28} />
            </IconWrapper>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarMain;
