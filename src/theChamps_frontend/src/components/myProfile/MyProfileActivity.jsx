/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useCanister, useConnect } from "@connect2ic/react";
import soccer1 from "../../assets/images/soccer-1.jpeg";
import { useParams } from "react-router";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Fake activityData
/* ----------------------------------------------------------------------------------------------------- */
const activityData = [
  {
    image: soccer1,
    mintVal: "# 2156",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2157",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2158",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2159",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2160",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileActivity /> : my-profile/activity tab
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileActivity = () => {
  const { isConnected, principal } = useConnect();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const userInfo = useSelector((state) => state.auth);
  const user = userInfo.userPlugPrincipal;
  const rincipal = Principal.fromText(user);

  const [backend] = useCanister("backend");

  useEffect(() => {
    const getUsersFractionNFT = async () => {
      try {
        const res = await backend.getusersfractionnft(rincipal);

        console.log("Response from backend:", res);

        const filteredData = res.filter((item) => {
          const ownerPrincipal = item.nft?.owner?.toText();
          return ownerPrincipal === principal?.toText();
        });

        console.log("Filtered Data:", filteredData);
        setProduct(filteredData);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching user NFT", error);
      }
    };

    getUsersFractionNFT();
  }, [backend, principal]);
  useEffect(() => {
    const getalltransactions = async () => {
      try {
        const res = await backend.getalltransactions(rincipal);
        console.log("transation", res);
        console.log("Response from backend:", res);

        setProduct(res);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching user NFT", error);
      }
    };

    getalltransactions();
  }, [backend, principal]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 text-sm font-bold uppercase p-4 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] text-white rounded-lg">
        <span className="flex items-center justify-center">MINT #</span>
        <span className="flex items-center justify-center">PRICE</span>
        <span className="flex items-center justify-center">TIME</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {product.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <ActivityCard /> : Card to display activity 
/* ----------------------------------------------------------------------------------------------------- */
const ActivityCard = ({ activity }) => {
  const { image, mintVal, time, status } = activity;

  return (
    <div className="grid grid-cols-3 text-sm font-bold  bg-white border-2 p-4 rounded-lg">
      <div className="flex gap-2 items-center justify-center">
        <img
          src={image}
          alt={mintVal}
          className="max-h-16 max-w-16 rounded-md"
        />
        <p>{mintVal}</p>
      </div>
      <div className="flex items-center justify-center">3</div>
      <div className="flex items-center justify-center flex-col gap-2">
        <p>{time}</p>
        <span className="text-xs font-normal text-[#8A8A8A]">{status}</span>
      </div>
    </div>
  );
};

export default MyProfileActivity;
