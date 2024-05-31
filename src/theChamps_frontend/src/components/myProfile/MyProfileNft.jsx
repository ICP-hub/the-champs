import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useParams } from "react-router";
import { useBalance, useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import ReadMore from "../common/ReadMore";
import { motion } from "framer-motion";
import placeHolderImg from "../../assets/CHAMPS.png";
import IconWrapper from "../common/IconWrapper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProducrCardLgLoader from "../productcomponent/ProducrCardLgLoader";
import ProductCardLoader from "../productcomponent/ProductCardLoader";
import CommonModal from "../common/CommonModal";
const MyProfileNFT = () => {
  const { isConnected, principal } = useConnect();
  const { id } = useParams();
  const [backend] = useCanister("backend");
  const [productInFavourites, setProductInFavourites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [assets] = useBalance();
  const [product, setProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = useSelector((state) => state.auth);
  const user = userInfo?.userPlugPrincipal;
  const rincipal = Principal?.fromText(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const getUsersFractionNFT = async () => {
      try {
        const res = await backend.getusersfractionnft(rincipal);
        const filteredData = res.filter((item) => {
          const ownerPrincipal = item[1].nft?.owner?.toText();
          return ownerPrincipal === rincipal?.toText();
        });
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
      toast.error("Please login first");
    }
  };

  const handleSearch = (e) => {
    setSearch(true);
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = product.filter((item) =>
      item[1]?.fractional_token?.name
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const displayProducts = search ? searchResults : product;

  return (
    <>
      <div className="flex text-xl mb-6 items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-1">
        <CiSearch size={24} />
        <input
          type="text"
          placeholder="Search Our NFTs"
          className="bg-transparent outline-none w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="">
        {loading ? (
          <div className="grid lg:grid-cols-3  gap-4  mb-4 xl:grid-cols-3  max-lg:grid-cols-2  max-sm:grid-cols-1 ">
            {Array.from({ length: 9 }, (_, index) => (
              <ProductCardLoader key={index} />
            ))}
          </div>
        ) : product.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {displayProducts.map((item, index) => (
                <div key={index}>
                  <div
                    className="border rounded-xl overflow-hidden"
                    style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="overflow-hidden">
                      <Link
                        to={`/collection/${item[0]?.toText()}/${
                          item[1]?.nft?.id
                        }`}
                      >
                        <motion.img
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          src={
                            placeHolderImg || item[1]?.fractional_token?.logo
                          }
                          alt=""
                          className="rounded-t-lg h-full object-cover cursor-pointer overflow-hidden"
                        />
                      </Link>
                    </div>
                    <div className="p-2 mx-2">
                      <div className="flex justify-between font-bold items-center">
                        <h2 className="text-lg font-semibold mb-2">
                          {item[1]?.fractional_token?.name}
                        </h2>
                      </div>
                      <p className="text-gray-500 text-sm">
                        <ReadMore
                          text={
                            item[1]?.fractional_token?.owner?.toText() || ""
                          }
                          maxLength={20}
                        />
                      </p>
                      <div className="flex justify-between mb-4">
                        <p className="mt-4 py-2 rounded-md w-[50%]">
                          {parseInt(item[1]?.fractional_token?.fee) || 0}
                        </p>
                        <button
                          className="mt-4 button bg-opacity-100 text-white rounded-md w-[50%] text-md flex items-center justify-center"
                          onClick={toggleModal}
                        >
                          Transfer
                        </button>
                      </div>
                    </div>
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
                  {isModalOpen && (
                    <>
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleModal}
                      ></div>
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <CommonModal
                          tokencanisterid={item[0]}
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
                </div>
              ))}
            </div>
            <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
              <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 == z-[1]">
                No More NFT found
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-8 px-6 lg:px-24 flex justify-center items-center">
            <button className="px-4 py-2 border border-red-500 cursor-pointer rounded-lg w-48 == z-[1]">
              No NFT found
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProfileNFT;
