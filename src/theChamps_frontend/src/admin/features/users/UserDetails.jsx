import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
// import { Grid } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router";
import AdminLoader from "../../components/laoding-admin";
import ChampsImg from "../../../assets/CHAMPS.png";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";

const UserDetail = () => {
  const { id } = useParams();
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [backend] = useCanister("backend");
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsUserDataLoading(true);
        const res = await backend.getUserdetailsbyid(Principal.fromText(id));
        console.log(res);
        setUserInfo(res.ok);
      } catch (err) {
        console.error("Error fetching user details : ", err);
      } finally {
        setIsUserDataLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div>
      {isUserDataLoading ? (
        <AdminLoader />
      ) : (
        <UserData id={id} userInfo={userInfo} />
      )}
    </div>
  );
};

const UserData = ({ id, userInfo }) => {
  const navigate = useNavigate();
  console.log("userInfo is :", userInfo);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex gap-4 items-center font-bold text-lg tracking-wider">
        <TbSquareRoundedChevronLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/admin/users/")}
        />
        User List
      </div>
      <div className="rounded-md bg-card p-6 flex flex-col md:flex-row gap-8">
        <div className="flex items-center justify-center">
          <img
            src={userInfo?.profileImage}
            alt="user-img"
            className="h-64 min-w-max rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-4">
            <label>Name : </label>
            <h4>
              {userInfo?.firstName} {userInfo?.lastName}
            </h4>
          </span>
          <span className="flex gap-4">
            <label>Principal : </label>
            <h4>{id}</h4>
          </span>
          <span className="flex gap-4">
            <label>Email : </label>

            <h4>{userInfo?.email}</h4>
          </span>
          <span className="flex gap-4">
            <label>Telegram : </label>
            <h4>{userInfo?.telegram}</h4>
          </span>
          <span className="flex gap-4">
            <label>Twitter : </label>

            <h4>{userInfo?.twitter}</h4>
          </span>
          <span className="flex gap-4">
            <label>Discord : </label>
            <h4>{userInfo?.discord}</h4>
          </span>
        </div>
      </div>
      <h1 className="text-2xl font-medium">NFTs owned by {id}</h1>
      <Cards id={id} />
    </div>
  );
};

const Cards = ({ id }) => {
  const [nftLoading, setNftLoading] = useState(false);
  const [nftList, setNFTList] = useState(null);
  const [backend] = useCanister("backend");

  useEffect(() => {
    const fetchUserNFT = async () => {
      try {
        setNftLoading(true);
        const res = await backend.getusersfractionnft(Principal.fromText(id));
        console.log("user nft: ", res);
        setNFTList(res);
      } catch (err) {
        console.error("Error Fetching getusersfractionnft : ", err);
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
          Loading User NFTs...
        </div>
      ) : nftList && nftList.length > 0 ? (
        nftList.map((nft, index) => <NFTDetailCard key={index} nft={nft} />)
      ) : (
        <div className="col-span-full flex items-center justify-center">
          <p>Above User doesn't own any NFT</p>
        </div>
      )}
    </div>
  );
};

const NFTDetailCard = ({ nft }) => {
  const [collectionId, nftDetail, nftId] = nft;
  console.log("nftDetail ", nftDetail);
  // const metadataItem = nftDetail?.metadata[0];
  // const keyValData = metadataItem?.key_val_data[0];
  // const attributeName = keyValData?.key;
  // const attributeVal = keyValData?.val?.TextContent;

  return (
    <div className="bg-card rounded-2xl overflow-hidden flex flex-col space-x-2">
      <img
        src={
          nftDetail?.fractional_token?.logo.length > 0
            ? nftDetail?.fractional_token?.logo
            : ChampsImg
        }
        alt="nft-img"
      />
      <div className="p-2 text-sm font-medium space-y-2 py-4">
        <span className="flex gap-4">
          <label className="min-w-max">NFT ID :</label>
          <p>{nftId.toText()}</p>
        </span>
        <span className="flex gap-4">
          <label className="min-w-max">Collection ID :</label>
          <p>{collectionId.toText()}</p>
        </span>
        <span className="flex gap-4">
          <label>NFT Name :</label>
          <p>{nftDetail?.fractional_token?.name}</p>
        </span>
        <span className="flex gap-4">
          <label>Symbol :</label>
          <p>{nftDetail?.fractional_token?.symbol}</p>
        </span>
        {/* <span className="flex gap-4">
          <label>NFT Attributes :</label>
          <span className="flex flex-col gap-2">
            <p>name: {attributeName}</p>
            <p>val: {attributeVal}</p>
          </span>
        </span> */}
        <span className="flex gap-4">
          <label>Total Share :</label>
          <p>{Number(nftDetail.fractional_token.totalSupply)}</p>
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
