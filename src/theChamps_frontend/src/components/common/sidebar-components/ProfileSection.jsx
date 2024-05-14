import { IoMdCart, IoMdHeart, IoMdImages } from "react-icons/io";
import IconWrapper from "../IconWrapper";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdFormatListBulletedAdd } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";

const ProfileSection = () => {
  const navigate = useNavigate();
  const commonLinkStyle =
    "px-6 py-3 hover:bg-gray-200 flex gap-4 items-center cursor-pointer w-full";
  const commonHeadingStyle =
    "text-sm font-bold uppercase text-gray-500 text-left min-w-max px-4 pt-3";

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
            <div className={commonLinkStyle}>
              <IconWrapper>
                <IoMdCart size={28} />
              </IconWrapper>
              <span className="font-medium">Selling</span>
            </div>
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
        <Link to="/admin" className="border-2 rounded-2xl overflow-hidden">
          <h1 className={commonHeadingStyle}>Admin</h1>
          <div className={commonLinkStyle}>
            <IconWrapper>
              <MdDashboard size={28} />
            </IconWrapper>
            <span className="font-medium">Dashboard</span>
          </div>
        </Link>
        <div className="h-28 w-full"></div>
      </div>
    </>
  );
};

export default ProfileSection;
