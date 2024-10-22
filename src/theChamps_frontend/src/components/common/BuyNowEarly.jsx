import { TailSpin } from "react-loader-spinner";
import champsImg from "../../assets/CHAMPS.png";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useClient";
import { Principal } from "@dfinity/principal";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import OrderConfirmation from "../../pages/OrderConfirmation";
import { Link } from "react-router-dom";

const BuyNowEarly = ({ onOpen, totalSupply, nftCanId, nftId, sharesLeft }) => {
  console.log("nft can id", nftCanId);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, principal, identity, backendActor } = useAuth();
  const [buyLoading, setBuyLoading] = useState(false);
  const [NFTDetail, setNFTDetail] = useState(null);
  const [isNftLoading, setIsNFTLoading] = useState(true);
  const [purchaseLoad, setPurchaseLoad] = useState(false);
  const [orderConf, setOrderConf] = useState(false);

  // decrement qty
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < sharesLeft ? prev + 1 : prev));
  };

  const fetchNFTDetail = async () => {
    try {
      setIsNFTLoading(true);
      const res = await backendActor.getNFTdetails(
        Principal.fromText(id),
        nftId
      );
      // console.log("Response getFractionalNFTDetails : ", res);
      setNFTDetail(res);
    } catch (err) {
      // console.error("Error fecthing fractionalNFTdetails : ", err);
    } finally {
      setIsNFTLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTDetail();
  }, []);

  // Buy tokens
  const handleConfirm = async () => {
    console.log({
      collectionCanister: Principal.fromText(id),
      nft_id: nftId,
      nft_canister_id: nftCanId,
      principal,
      quantity,
    });
    try {
      setPurchaseLoad(true);
      const response = await backendActor.buytokens(
        Principal.fromText(id),
        nftId,
        nftCanId,
        principal,
        quantity
      );
      // console.log("response nft purchase", response);
      // onOpen(false);
      setOrderConf(true);
    } catch (err) {
      console.error("error while purchasing nft", err);
      toast.error("Failed to proceed");
    } finally {
      setPurchaseLoad(false);
    }
  };

  const colseAllModals = () => {
    onOpen(false);
    setOrderConf(false);
  };

  console.log(NFTDetail);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#0009] z-[170]">
      {!orderConf ? (
        <div className="bg-white md:rounded-2xl px-6 md:p-8 max-md:h-full max-md:w-full flex justify-center flex-col max-sm:space-y-4">
          {isNftLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {" "}
              <h4 className="text-sm py-2 flex items-center justify-center w-full font-semibold">
                You are about to make a purchase!
              </h4>
              <div className="flex w-full items-center justify-center">
                <div className="min-h-48 min-w-40 max-h-48 max-w-40 rounded-md overflow-hidden">
                  <img
                    src={
                      NFTDetail.logo.data.length > 10
                        ? NFTDetail.logo.data
                        : champsImg
                    }
                    alt="champs-img"
                    className="object-contain min-h-48 min-w-40 max-h-48 max-w-40"
                  />
                </div>
              </div>
              <p className="py-2 text-xs text-center text-gray-500">
                You are about to purchase this Digital Collectible from your
                connected wallet.
              </p>
              <div className="my-2 h-px w-full bg-gray-300"></div>
              {/* <h4 className="font-semibold capitalize">payment method</h4>
            <button className="flex p-2 w-full gap-2 items-center font-semibold border-2 border-gray-300 rounded-md">
              Select payment method
            </button> */}
              <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
                <p>Available Share</p>
                <p>{sharesLeft}</p>
              </div>
              <div className="flex justify-between items-center font-semibold my-2 text-sm uppercase">
                <span>AMOUNT OF SHARES</span>
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
                <div className="flex gap-1 items-center">
                  Rp.
                  {/* <span>{((price_share * quantity) / exchange).toFixed(6)}</span>
            <span className="text-gray-500">
              ({(price_share * quantity).toFixed(3)} USD)
            </span> */}
                  <span>
                    {((NFTDetail.priceinusd / sharesLeft) * quantity).toFixed(
                      6
                    )}
                  </span>
                </div>
              </div>
              <div className="py-2 text-xs text-center max-w-96 font-medium text-gray-500">
                This process may take a minute. Transactions can not be
                reversed. By clicking confirm you show acceptance to our
                
                <Link to='/Terms-and-services' className="text-[#FC001E] underline ml-1">
                  Terms and Service
                </Link>
                .
              </div>
              <div className="flex justify-center md:justify-end items-center space-x-4 my-2">
                <button
                  className="px-4 py-2 rounded-md border-2 border-gray-300"
                  onClick={() => (purchaseLoad ? null : onOpen(false))}
                >
                  cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-md font-medium text-white flex items-center justify-center gap-2 ${
                    purchaseLoad ? "bg-gray-400" : "button"
                  }`}
                  onClick={purchaseLoad ? null : handleConfirm}
                >
                  {purchaseLoad ? "buying..." : "confirm"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <OrderConfirmation action={colseAllModals} />
      )}
    </div>
  );
};

export default BuyNowEarly;
