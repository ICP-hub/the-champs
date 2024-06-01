import { IoMdCart, IoMdHeart, IoMdImages } from "react-icons/io";
import IconWrapper from "../IconWrapper";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdFormatListBulletedAdd } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { useCanister, useConnect } from "@connect2ic/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Principal } from "@dfinity/principal";

const ProfileSection = () => {
  const navigate = useNavigate();
  const commonLinkStyle =
    "px-6 py-3 hover:bg-gray-200 flex gap-4 items-center cursor-pointer w-full";
  const commonHeadingStyle =
    "text-sm font-bold uppercase text-gray-500 text-left min-w-max px-4 pt-3";
  const userInfo = useSelector((state) => state.auth);
  const { principal, disconnect, isConnected } = useConnect();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminChecked, setIsAdminChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backend] = useCanister("backend");

  console.log(backend);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.error("Error checking connection:", error);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (isConnected && principal) {
        try {
          const res = await backend.checkisadmin(
            Principal?.fromText(principal)
          );
          setIsAdmin(res);
          console.log("admin is ", res);
        } catch (error) {
          console.error("Error checking isAdmin:", error);
          setIsAdmin(false);
        } finally {
          setLoading(false);
          setIsAdminChecked(true);
        }
      } else {
        setIsAdminChecked(false);
      }
    };

    checkIsAdmin();
  }, [isConnected, backend, principal]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="border-2 rounded-2xl overflow-hidden">
          <h1 className={commonHeadingStyle}>Nfts</h1>
          <div className="flex flex-col w-full">
            <button
              to="/my-profile"
              className={commonLinkStyle}
              onClick={() => navigate("/my-profile", { state: "My NFTs" })}
            >
              <IconWrapper>
                <IoMdImages size={28} />
              </IconWrapper>
              <span className="font-medium">Collected</span>
            </button>
            {/* <div className={commonLinkStyle}>
              <IconWrapper>
                <IoMdCart size={28} />
              </IconWrapper>
              <span className="font-medium">Selling</span>
            </div> */}
          </div>
        </div>
        <div className="border-2 rounded-2xl overflow-hidden">
          <h1 className={commonHeadingStyle}>Profile</h1>
          <button
            className={commonLinkStyle}
            onClick={() => navigate("/my-profile", { state: "Profile" })}
          >
            <IconWrapper>
              <FaUserPen size={28} />
            </IconWrapper>
            <span className="font-medium">Update Profile</span>
          </button>
          <button
            className={commonLinkStyle}
            onClick={() => navigate("/my-profile", { state: "Favourites" })}
          >
            <IconWrapper>
              <IoMdHeart size={28} />
            </IconWrapper>
            <span className="font-medium">Favourites</span>
          </button>
          <button
            className={commonLinkStyle}
            onClick={() => navigate("/my-profile", { state: "Activity" })}
          >
            <IconWrapper>
              <MdFormatListBulletedAdd size={28} />
            </IconWrapper>
            <span className="font-medium">Activity</span>
          </button>
        </div>
        {loading ? (
          <div className="border-2 rounded-2xl overflow-hidden animate-pulse">
            <h1 className={commonHeadingStyle}></h1>
            <div className={commonLinkStyle}>
              <IconWrapper>
                <MdDashboard size={28} />
              </IconWrapper>
              <span className="font-medium animate-pulse"></span>
            </div>
          </div>
        ) : isAdmin ? (
          <Link to="/admin" className="border-2 rounded-2xl overflow-hidden">
            <h1 className={commonHeadingStyle}>Admin</h1>
            <div className={commonLinkStyle}>
              <IconWrapper>
                <MdDashboard size={28} />
              </IconWrapper>
              <span className="font-medium">Dashboard</span>
            </div>
          </Link>
        ) : null}

        <div className="h-28 w-full"></div>
      </div>
    </>
  );
};

export default ProfileSection;
