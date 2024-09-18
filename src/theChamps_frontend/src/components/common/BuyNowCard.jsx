import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import IcpLogo from "../../assets/IcpLogo";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/useClient";
import { idlFactory } from "../../../../wallet/ledger.did";
import { host, ids } from "../../../../DevConfig";
import toast from "react-hot-toast";
import { AuthClient } from "@dfinity/auth-client";
import champsImg from "../../assets/CHAMPS.png";
import GopayLogo from "../../assets/wallet-images/Gopay.svg";

const BuyNowCard = ({
  onOpen,
  price_share,
  nftLogo,
  setSelected,
  selected,
  exchange,
  loading,
  nftdetails,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [metaData, setMetaData] = useState(null);
  // const { principal } = useConnect();
  const { isAuthenticated, principal, identity, backendActor } = useAuth();
  const [balance, setBalance] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  // const [testPrincipal, setTestPrincipal] = useState(null);
  const selectedMethodToBuy = selected.value.toLowerCase();

  // console.log(selectedMethodToBuy);

  // console.log("identity is ", identity);
  // console.log("NFTDetails ", nftdetails[0].nft.owner);
  const createTokenActor = async (canisterId) => {
    //console.log("identity : ",identity)
    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();
    // console.log("identity : ", identity);
    // const principal = identity.getPrincipal();
    // console.log("ankur :", principal.toText());

    const agent = new HttpAgent({
      identity,
      host,
    });
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

  /*   const handleConfirm = async () => {
    if (!isAuthenticated) {
      toast.error("You need to login first");
      return;
    }
    const principalId =
      selected.value === "icp"
        ? ids.ICPtokenCan
        : selected.value === "ckBTC"
        ? ids.ckBTCtokenCan
        : null;

        console.log(principalId, 'principalId')
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
  }; */

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      toast.error("You need to log in first");
      return;
    }
    const principalId = getPrincipalId(selected.value);
    if (!principalId) {
      toast.error("Invalid token selection");
      return;
    }

    // console.log(`Selected principalId: ${principalId}`);

    try {
      setBuyLoading(true);
      const tokenActor = await createTokenActor(
        Principal.fromText(principalId)
      );

      const { metadata, balance } = await fetchMetadataAndBalance(
        tokenActor,
        principal
      );

      const formattedMetadata = formatTokenMetaData(metadata);
      setMetaData(formattedMetadata);

      const parsedBalance = parseInt(balance, 10);
      console.log("Balance:", parsedBalance);
      setBalance(parsedBalance);

      transferApprove(parsedBalance, formattedMetadata, tokenActor);
    } catch (err) {
      console.error("Error during token confirmation:", err);
      toast.error("An error occurred while confirming the token");
    }
    // finally {
    //   setBuyLoading(false);
    // }
  };

  const getPrincipalId = (tokenType) => {
    switch (tokenType) {
      case "icp":
        return ids.ICPtokenCan;
      case "ckBTC":
        return ids.ckBTCtokenCan;
      default:
        return null;
    }
  };

  const fetchMetadataAndBalance = async (tokenActor, ownerPrincipal) => {
    console.log(tokenActor, ownerPrincipal.toText());
    try {
      const [metadata, balance] = await Promise.all([
        tokenActor.icrc1_metadata(),
        tokenActor.icrc1_balance_of({
          owner: ownerPrincipal,
          subaccount: [],
        }),
      ]);
      console.log("Fetched metadata:", metadata);
      return { metadata, balance };
    } catch (err) {
      console.error("Error fetching metadata and balance:", err);
      throw err;
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
        ((price_share * quantity) / exchange) * Math.pow(10, decimals),
        10
      );
      console.log("sendable amount console ", sendableAmount);
      console.log("current balance console ", currentBalance);
      if (currentBalance > sendableAmount) {
        //   console.log("We can send the amount");
        // transaction logic
        // let transaction = {
        //   amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
        //   from_subaccount: [],
        //   spender: {
        //     // Need review on this
        //     // owner: nftdetails[1],
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
            owner: Principal.fromText(ids.backendCan),
            subaccount: [],
          },
          amount: Number(sendableAmount) + Number(currentMetaData["icrc1:fee"]),
          expected_allowance: [],
          expires_at: [],
          fee: [currentMetaData["icrc1:fee"]],
          memo: [],
          created_at_time: [],
        };
        console.log("transaction ", transaction);
        // console.log("Token Actor ICRC2 APPROVE", tokenActor.icrc2_approve);
        const approveRes = await tokenActor.icrc2_approve(transaction);
        console.log("Payment Approve Response ", approveRes);
        if (approveRes.Err) {
          const errorMessage = `Insufficient funds. Balance: ${approveRes.Err.InsufficientFunds.balance}`;
          toast.error(errorMessage);
          return;
        } else {
          afterPaymentApprove(
            parseInt(approveRes?.Ok).toString(),
            sendableAmount,
            currentBalance
          );
        }
      } else {
        console.log("Insufficient Balance to purchase");
        toast.error(
          `Insufficient balance. Balance : ${currentBalance / 10 ** 8}`
        );
      }
    } catch (err) {
      console.error("Error in transfer approve", err);
    } finally {
      setBuyLoading(false);
    }
  };

  // After approve payment
  const afterPaymentApprove = async (paymentId, amount, currentBalance) => {
    console.log(
      `You are going to send ,${amount} and your payment ID is ${paymentId}`
    );
    const paymentOptions = {
      [selectedMethodToBuy]: null,
    };
    // NFTID , From , To , PaymentOptions,Total Amount
    try {
      const paymentResponse = await backendActor.buytokens(
        nftdetails[1],
        principal,
        nftdetails[0].nft.owner,
        parseInt(quantity),
        paymentOptions,
        parseInt(amount)
      );
      console.log("Payment Success Response ", paymentResponse);
    } catch (err) {
      console.error("Insufficient fund in wallet ", err);
      toast.error("Insufficient fund in wallet. Balance : ", currentBalance);
    }
  };

  // decrement qty
  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) =>
      prev < parseInt(nftdetails[0].totalSupply) ? prev + 1 : prev
    );
  };

  // console.log("metaData state ", metaData);
  // console.log("onwer principal ", principal);

  // useEffect(() => {
  //   const fetchIdentity = async () => {
  //     const authClient = await AuthClient.create();
  //     const identity = authClient.getIdentity();
  //     const principal = identity.getPrincipal();
  //     setTestPrincipal(principal);
  //   };

  //   fetchIdentity();
  // }, []);

  return (
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[999] grid place-items-center overflow-y-scroll no-scrollbar top-0">
      <div className="bg-white rounded-2xl p-4 md:px-6">
        <h4 className="text-sm py-2 flex items-center justify-center w-full font-semibold">
          You are about to make a purchase!
        </h4>
        <div className="flex w-full items-center justify-center">
          <div className="min-h-48 min-w-40 max-h-48 max-w-40 rounded-md overflow-hidden">
            <img
              src={nftLogo.length > 10 ? nftLogo : champsImg}
              alt="champs-img"
              className="object-contain min-h-48 min-w-40 max-h-48 max-w-40"
            />
          </div>
        </div>
        <p className="py-2 text-xs text-center text-gray-500">
          You are about to purchase this NFT from your connected wallet.
        </p>
        <div className="my-2 h-px w-full bg-gray-300"></div>
        <h4 className="font-semibold capitalize">payment method</h4>
        <button className="flex p-2 w-full gap-2 items-center font-semibold border-2 border-gray-300 rounded-md">
          Select payment method
        </button>
        {/* <div className="grid md:grid-cols-2 gap-x-2 gap-y-2 my-2 font-semibold">
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
        </div> */}
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
              {/* <IcpLogo size={16} /> */}
              Rp.
              <span>{((price_share * quantity) / exchange).toFixed(6)}</span>
              <span className="text-gray-500">
                ({(price_share * quantity).toFixed(3)} USD)
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

export default BuyNowCard;
