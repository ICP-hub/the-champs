import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
// import { Grid } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router";
import AdminLoader from "../../components/laoding-admin";
import ChampsImg from "../../../assets/CHAMPS.png";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useAuth } from "../../../auth/useClient";
import { transformTokenData } from "../../utils/functions";

// Getch userDetails
const fetchUserDetails = async (
  id,
  backendActor,
  setUserInfo,
  setIsUserDataLoading
) => {
  try {
    setIsUserDataLoading(true);
    const res = await backendActor?.getUserdetailsbyid(Principal.fromText(id));
    // console.log(res);
    setUserInfo(res.ok);
  } catch (err) {
    // console.error("Error fetching user details : ", err);
  } finally {
    setIsUserDataLoading(false);
  }
};

const UserDetail = () => {
  const { id } = useParams();
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    fetchUserDetails(id, backendActor, setUserInfo, setIsUserDataLoading);
  }, []);

  return (
    <div>{isUserDataLoading ? <AdminLoader /> : <UserData id={id} />}</div>
  );
};

const UserData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { backendActor } = useAuth();
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserDetails(id, backendActor, setUserInfo, setIsUserDataLoading);
  }, [backendActor]);

  // console.log("userInfo is :", userInfo);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-4 items-center font-bold text-lg tracking-wider">
        <TbSquareRoundedChevronLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/admin/users/")}
        />
        User List
      </div>
      <div className="rounded-md bg-card p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex items-center justify-center">
          <img
            src={userInfo?.profileimage}
            alt="user-img"
            className="h-64 w-64 rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-4">
            <label className="w-20">Name : </label>
            <h4>
              {userInfo?.firstName} {userInfo?.lastName}
            </h4>
          </span>
          <span className="flex gap-4">
            <label className="w-20">Principal : </label>
            <h4>{id}</h4>
          </span>
          <span className="flex gap-4">
            <label className="w-20">Email : </label>

            <h4>{userInfo?.email}</h4>
          </span>
          <span className="flex gap-4">
            <label className="w-20">Telegram : </label>
            <h4>{userInfo?.telegram}</h4>
          </span>
          <span className="flex gap-4">
            <label className="w-20">Twitter : </label>

            <h4>{userInfo?.twitter}</h4>
          </span>
          <span className="flex gap-4">
            <label className="w-20">Discord : </label>
            <h4>{userInfo?.discord}</h4>
          </span>
        </div>
      </div>
      <h1 className="md:text-xl font-medium">Digital Collectible owned by {id}</h1>
      <Cards id={id} />
    </div>
  );
};

const Cards = ({ id }) => {
  const [nftLoading, setNftLoading] = useState(false);
  const [nftList, setNFTList] = useState(null);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();

  useEffect(() => {
    const fetchUserNFT = async () => {
      try {
        setNftLoading(true);
        const res = await backendActor?.getusersfractionnft(
          Principal.fromText(id)
        );
        // console.log("user nft: ", res);
        setNFTList(res);
      } catch (err) {
        // console.error("Error Fetching getusersfractionnft : ", err);
      } finally {
        setNftLoading(false);
      }
    };
    fetchUserNFT();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-5 gap-x-4 gap-y-8 py-4">
      {nftLoading ? (
        <div className="col-span-full flex items-center justify-center">
          Loading User Digital Collectibles...
        </div>
      ) : nftList && nftList?.length > 0 ? (
        nftList.map((nft, index) => <NFTDetailCard key={index} nft={nft} />)
      ) : (
        <div className="col-span-full flex items-center justify-center">
          <p>Above User doesn't own any Digital Collectible</p>
        </div>
      )}
    </div>
  );
};

const NFTDetailCard = ({ nft }) => {
  const [collectionId, nftDetail, nftId] = nft;
  // console.log("nftDetail ", nftDetail);
  const tokenData = transformTokenData(nftDetail.fractional_token);
  return (
    <div className="bg-card rounded-2xl overflow-hidden flex flex-col space-x-2">
      <img
        src={
          nftDetail.nft.logo.data.length > 10
            ? nftDetail.nft.logo.data
            : ChampsImg
        }
        alt="nft-img"
      />
      <div className="p-2 text-sm font-medium space-y-2 py-4">
        <span className="flex gap-4">
          <label className="min-w-max">Digital Collectible ID :</label>
          <p>{nftId.toText()}</p>
        </span>
        <span className="flex gap-4">
          <label className="min-w-max">Collection ID :</label>
          <p>{collectionId.toText()}</p>
        </span>
        <span className="flex gap-4">
          <label>Digital Collectible Name :</label>
          <p>{tokenData.name}</p>
        </span>
        <span className="flex gap-4">
          <label>Symbol :</label>
          <p>{tokenData.symbol}</p>
        </span>
        {/* <span className="flex gap-4">
          <label>NFT Attributes :</label>
          <span className="flex flex-col gap-2">
            <p>name: {attributeName}</p>
            <p>val: {attributeVal}</p>
          </span>
        </span> */}
        <span className="flex gap-4">
          <label>Price : </label>
          <p>$ {Number(nftDetail.nft.priceinusd)}</p>
        </span>
        <span className="flex gap-4">
          <label>Price/Share :</label>
          <p>$ {nftDetail.price_per_share.toFixed(3)}</p>
        </span>
        <span className="flex gap-4">
          <label>For Sale :</label>
          <p>{nftDetail.nft.forsale ? "Yes" : "No"}</p>
        </span>
        <span className="flex gap-4">
          <label>Listed :</label>
          <p>{nftDetail.nft.listed ? "Yes" : "No"}</p>
        </span>
      </div>
    </div>
  );
};

export default UserDetail;
