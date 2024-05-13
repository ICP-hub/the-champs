import { IoMdCart, IoMdHeart, IoMdImages } from "react-icons/io";
import IconWrapper from "../IconWrapper";
import { Link } from "react-router-dom";
import { MdDashboard, MdFormatListBulletedAdd } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";

const ProfileSection = () => {
  const commonLinkStyle =
    "px-6 py-3 hover:bg-gray-200 flex gap-4 items-center cursor-pointer";
  const commonHeadingStyle =
    "text-sm font-bold uppercase text-gray-500 text-left min-w-max px-4 pt-3";

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="border-2 rounded-2xl">
          <h1 className={commonHeadingStyle}>Nfts</h1>
          <div className="flex flex-col w-full">
            <Link to="/my-profile" className={commonLinkStyle}>
              <IconWrapper>
                <IoMdImages size={28} />
              </IconWrapper>
              <span className="font-medium">Collected</span>
            </Link>
            <div className={commonLinkStyle}>
              <IconWrapper>
                <IoMdCart size={28} />
              </IconWrapper>
              <span className="font-medium">Selling</span>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-2xl">
          <h1 className={commonHeadingStyle}>Profile</h1>
          <Link to="/my-profile" className={commonLinkStyle}>
            <IconWrapper>
              <FaUserPen size={28} />
            </IconWrapper>
            <span className="font-medium">Update Profile</span>
          </Link>
          <div className={commonLinkStyle}>
            <IconWrapper>
              <IoMdHeart size={28} />
            </IconWrapper>
            <span className="font-medium">Favourites</span>
          </div>
          <div className={commonLinkStyle}>
            <IconWrapper>
              <MdFormatListBulletedAdd size={28} />
            </IconWrapper>
            <span className="font-medium">Activity</span>
          </div>
        </div>
        <div className="border-2 rounded-2xl">
          <h1 className={commonHeadingStyle}>Admin</h1>
          <div className={commonLinkStyle}>
            <IconWrapper>
              <MdDashboard size={28} />
            </IconWrapper>
            <span className="font-medium">Dashboard</span>
          </div>
        </div>
        <div className="h-28 w-full"></div>
      </div>
    </>
  );
};

export default ProfileSection;
