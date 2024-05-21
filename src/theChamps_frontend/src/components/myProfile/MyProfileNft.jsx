import { useEffect, useState } from "react";
import CommonModal from "../common/CommonModal";
import { RiErrorWarningFill, RiErrorWarningLine } from "react-icons/ri";
import { useParams } from "react-router";
import { useBalance, useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";
import { Bars, TailSpin } from "react-loader-spinner";
import { CiHeart } from "react-icons/ci";
import ReadMore from "../common/ReadMore";
import { motion } from "framer-motion";
import placeHolderImg from "../../assets/CHAMPS.png";
import IconWrapper from "../common/IconWrapper";

const MyProfileNFT = () => {
  const { isConnected, principal } = useConnect();
  const { id } = useParams();
  const [backend] = useCanister("backend");

  const [favourites, setFavourites] = useState([]);
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [assets] = useBalance();
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const getUsersFractionNFT = async () => {
      try {
        const canister_id = Principal.fromText("2vxsx-fae");
        const res = await backend.getusersfractionnft(canister_id);

        // Log the entire response to understand its structure
        console.log("Response from backend:", res);

        // Filter the response data to find items with matching owner
        const filteredData = res.flatMap((innerArray) =>
          innerArray.filter((item) => {
            if (item?.nft?.owner) {
              console.log("Item:", item);
              console.log("Item owner:", item?.nft?.owner?.toText());
              console.log("Principal:", principal.toText());
              return item?.nft?.owner?.toText() === principal.toText();
            }
            return false;
          })
        );

        // Log the filtered data
        console.log("Filtered Data:", filteredData);

        // Set the filtered data to product
        setProduct(filteredData);

        setLoading(false);
      } catch (error) {
        console.log("Error while fetching user NFT", error);
      }
    };

    getUsersFractionNFT();
  }, [backend, principal]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isModalOpen]);
  const handleBuyNow = () => {
    if (isConnected) {
      const icpWallet = assets?.find((wallet) => wallet.name === "ICP");
      if (icpWallet?.amount <= 0) {
        setShowModal(true);
      } else {
        toast.success("Proceeding to buy");
      }
    } else {
      toast.success("Please login first");
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="flex items-center h-56 justify-center">
            <Bars
              height="120"
              width="120"
              color="#FC001E"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {product.map((product, index) => (
              <div className="">
                {" "}
                <div
                  key={index}
                  className="border rounded-xl overflow-hidden"
                  style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="overflow-hidden">
                    <Link to={`/collections/${id}/${product[0]?.nft?.id}`}>
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        src={
                          product[0]?.fractional_token?.logo || placeHolderImg
                        }
                        alt=""
                        className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden"
                      />
                    </Link>
                  </div>
                  <div className="p-2 mx-2">
                    <div className="flex justify-between font-bold items-center">
                      <h2 className="text-lg font-semibold mb-2">
                        {product[0]?.fractional_token?.name}
                      </h2>
                    </div>
                    <p className="text-gray-500 text-sm">
                      <ReadMore
                        text={
                          product[0]?.fractional_token?.owner?.toText() || ""
                        }
                        maxLength={20}
                      />
                    </p>
                    <div className="flex justify-between mb-4">
                      <p className="mt-4 py-2 rounded-md w-[50%]">
                        {parseInt(product[0]?.fractional_token?.fee) || 0}
                      </p>
                      <button
                        className="mt-4 button bg-opacity-100 text-white rounded-md w-[50%] text-md flex items-center justify-center"
                        onClick={toggleModal}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>

                  {/* Modal for insufficient balance */}
                  {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                      <div className="bg-white p-4 rounded-lg flex flex-col space-x-5 space-y-8 items-center justify-center">
                        <IconWrapper>
                          <RiErrorWarningLine size={36} />
                        </IconWrapper>
                        <p>
                          You don't have sufficient balance to buy this NFT.
                        </p>
                        <button
                          className="mt-2 px-4 py-2 button bg-blue-500 text-white rounded-lg"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <button className="p-4 border" onClick={toggleModal}>
        open modal
      </button> */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <CommonModal
              toggleModal={toggleModal}
              title="Transfer NFT"
              message="Please enter the address or Principal you want to send the NFT to"
              warningText="Beware, not all wallets support all tokens"
              inputPlaceholder="Address or Principal of receiver"
              confirmText="Transfer"
              cancelText="Back"
            />
          </div>
        </>
      )}
    </>
  );
};

export default MyProfileNFT;
