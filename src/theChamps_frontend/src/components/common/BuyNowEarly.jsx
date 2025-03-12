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
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from 'uuid';
const BuyNowEarly = ({ onOpen, totalSupply, nftCanId, nftId, sharesLeft }) => {
  console.log("nft can id", nftCanId);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [numOfTokens, setNumOfTokens] = useState(1);
  const { isAuthenticated, principal, identity, backendActor } = useAuth();
  const [buyLoading, setBuyLoading] = useState(false);
  const [NFTDetail, setNFTDetail] = useState(null);
  const [isNftLoading, setIsNFTLoading] = useState(true);
  const [purchaseLoad, setPurchaseLoad] = useState(false);
  const [orderConf, setOrderConf] = useState(false);
  const navigate = useNavigate();

  // decrement qty
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
    setNumOfTokens((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < sharesLeft ? prev + 1 : prev));
    setNumOfTokens((prev) => (prev < sharesLeft ? prev + 1 : prev));
  };

  const fetchNFTDetail = async () => {
    try {
      setIsNFTLoading(true);
      const res = await backendActor.getNFTdetails(
        Principal.fromText(id),
        nftId
      );
      console.log("Response getFractionalNFTDetails : ", res);
      setNFTDetail(res);
    } catch (err) {
      console.error("Error fecthing fractionalNFTdetails : ", err);
    } finally {
      setIsNFTLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTDetail();
  }, []);

  // Buy tokens

  const handleConfirm = async () => {
    try {
      setPurchaseLoad(true);

      const payload = {
        qty: quantity,
        success_url: `${window.location.origin}/success`,
        failed_url: `${window.location.origin}/failed`,
      };

      console.log("🚀 Sending payload to Payment API:", payload);

      //  Step 1: Call Payment API
      const paymentResponse = await fetch(
        "https://champproxyserv.netlify.app/.netlify/functions/api/invoice/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "idempotencykey": uuidv4(),
          },
          body: JSON.stringify(payload),
        }
      );

      if (paymentResponse.status !== 200) {
        console.error("❌ Payment API Error: Status", paymentResponse.status);
        toast.error("Your payment failed. Please try again.");
        return;
      }

      const paymentData = await paymentResponse.json();
      console.log("Payment API Response:", paymentData);

      if (!paymentData.success) {
        console.error("❌ Payment Gateway Error:", paymentData);
        toast.error("Your payment failed. Please try again.");
        return;
      }

      console.log(" Invoice URL:", paymentData.invoice_url);
      //  Step 2: 
      const invoice_id = paymentData.invoice_id
      const invoiceId = invoice_id;
      console.log("📤 Sending Invoice to Backend:", invoiceId);

      const backendResponse = await backendActor.createInvoice(
        invoiceId,
        quantity,
        Principal.fromText(id),
        nftId,
        nftCanId,
        principal,
      );

      if ("err" in backendResponse) {
        console.error("❌ Backend Error:", backendResponse.err);
        toast.error("Failed to create invoice. Please contact support.");
        return;
      }

      console.log(" Invoice Stored in Backend:", backendResponse.ok);

      // Step 3: 
      if (backendResponse.ok && paymentData.success) {
        window.open(paymentData.invoice_url, "_blank");
        localStorage.setItem("invoice_id", invoiceId);

        //  Step 4: 
        colseAllModals();
        toast.success("Invoice created successfully! Redirecting...");
      } else {
        console.error("❌ Error: Backend or Payment API response was not OK");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("🚨 Error processing invoice:", err);
      toast.error(`Failed to proceed: ${err.message}`);
    } finally {
      setPurchaseLoad(false);
    }
  };

  // const handleConfirm = async () => {
  //   console.log({
  //     collectionCanister: Principal.fromText(id),
  //     nft_id: nftId,
  //     nft_canister_id: nftCanId,
  //     principal,
  //     quantity,
  //   });
  //   try {
  //     setPurchaseLoad(true);
  //     const response = await backendActor.createInvoice(
  //       window.location.origin,
  //       quantity,
  //       Principal.fromText(id),
  //       nftId,
  //       nftCanId,
  //       principal,
  //     );
  //     console.log(window.location.origin,'window.location.origin');
  //     console.log("response nft purchase", response);
  //     console.log(response.ok.invoice_id);

  //     onOpen(false);
  //     if (response.ok.success && response.ok.invoice_url) {
  //       window.open(response.ok.invoice_url, "_blank");
  //       // setOrderConf(true);
  //     }
  //     localStorage.setItem("invoice_id", response.ok.invoice_id);
  //   } catch (err) {
  //     console.error("error while purchasing nft", err);
  //     toast.error("Failed to proceed");
  //   } finally {
  //     setPurchaseLoad(false);
  //   }
  // };

  const colseAllModals = () => {
    onOpen(false);
    setOrderConf(false);
  };

  console.log(NFTDetail);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#0009] z-[170]">
      {!orderConf ? (
        <div className="flex flex-col justify-center px-6 bg-white md:rounded-2xl md:p-8 max-md:h-full max-md:w-full max-sm:space-y-4">
          {isNftLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {" "}
              <h4 className="flex items-center justify-center w-full py-2 text-sm font-semibold">
                You are about to make a purchase!
              </h4>
              <div className="flex items-center justify-center w-full">
                <div className="overflow-hidden rounded-md min-h-48 min-w-40 max-h-48 max-w-40">
                  <img
                    src={
                      NFTDetail?.logo?.data?.length > 10
                        ? NFTDetail?.logo?.data
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
              <div className="w-full h-px my-2 bg-gray-300"></div>
              {/* <h4 className="font-semibold capitalize">payment method</h4>
            <button className="flex items-center w-full gap-2 p-2 font-semibold border-2 border-gray-300 rounded-md">
              Select payment method
            </button> */}
              <div className="flex items-center justify-between my-2 text-sm font-semibold uppercase">
                <p>Available Share</p>
                <p>{sharesLeft}</p>
              </div>
              <div className="flex items-center justify-between my-2 text-sm font-semibold uppercase">
                <span>AMOUNT OF SHARES</span>
                <div className="flex items-center overflow-hidden border rounded-md">
                  <button
                    className="flex items-center justify-center h-full p-2 bg-gray-200"
                    onClick={handleDecrement}
                  >
                    <HiMinus className="h-6" />
                  </button>
                  <span className="flex items-center justify-center px-4 py-2">
                    {quantity}
                  </span>
                  <button
                    className="flex items-center justify-center h-full p-2 bg-gray-200"
                    onClick={handleIncrement}
                  >
                    <HiPlus className="h-6" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between my-2 text-sm font-semibold uppercase">
                <span>Total</span>
                <div className="flex items-center gap-1">
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
              <div className="py-2 text-xs font-medium text-center text-gray-500 max-w-96">
                This process may take a minute. Transactions can not be
                reversed. By clicking confirm you show acceptance to our
                <Link
                  to="/Terms-and-services"
                  className="text-[#FC001E] underline ml-1"
                >
                  Terms and Service
                </Link>
                .
              </div>
              <div className="flex items-center justify-center my-2 space-x-4 md:justify-end">
                <button
                  className="px-4 py-2 border-2 border-gray-300 rounded-md"
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
