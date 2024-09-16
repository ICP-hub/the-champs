import "./profilecard.css";
import { MdEdit, MdOutlineMailOutline } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiDiscordLogoLight,
  PiTelegramLogo,
  PiTwitterLogo,
  PiUserCircleLight,
  PiVoicemail,
} from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";

import UserLogo from "../../assets/images/userlogo.png";
import { useEffect, useState } from "react";
// import { useCanister, useConnect } from "@connect2ic/react";
// import { Principal } from "@dfinity/principal";
import { Bars, InfinitySpin } from "react-loader-spinner";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import useClipboard from "react-use-clipboard";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";
import { useAuth } from "../../auth/useClient";
import { Navigate } from "react-router";

const containerVariants = {
  hidden: { opacity: 0, x: 400, transition: { duration: 0.4 } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -400, transition: { duration: 0.4 } },
};

const MyProfileDetails = () => {
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  const userInfo = useSelector((state) => state.auth);
  const [isCopied, setCopied] = useClipboard(userInfo?.userPlugPrincipal, {
    successDuration: 1000,
  });
  const [editMode, setEditMode] = useState(false);
  // const { isConnected, principal } = useConnect();
  const { principal, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  // const principal = Principal.toString();
  console.log("principal is", principal);

  const [formData, setFormData] = useState({
    id: principal,
    twitter: "",
    email: "",
    discord: "",
    profileimage: "",
    lastName: "",
    telegram: "",
    firstName: "",
  });

  const [image, setImage] = useState(formData.profileimage);

  function imageToFileBlob(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  }
  const handlepofileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSizeInBytes = 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      console.error(
        "Selected file is too large. Please select an image file less than or equal to 1 MB."
      );
      toast.error("Please select an image file less than or equal to 1 MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image.");
      return;
    }

    try {
      const logoBlob = await imageToFileBlob(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        profileimage: logoBlob,
      }));
      console.log("blob is for logo", logoBlob);
    } catch (error) {
      console.error("Error converting image to blob:", error);
    }
  };
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const getuserDetail = async () => {
    try {
      const data = await backendActor?.getUserdetailsbycaller();
      if (data.ok) {
        setFormData(data.ok);
      }
      if (data.err) {
        setEditMode(true);
      }
      setLoading(false);
      setIsLoading(false);
      console.log("data", data);
      console.log("user is ", formData);
    } catch (error) {
      console.log("reeegdf");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getuserDetail();
      console.log("fdhfhgfhgh");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center h-56 justify-center">
          <InfinitySpin
            visible={true}
            width="200"
            color="#FC001E"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <div className="card">
          <div className="relative overflow-hidden w-32 h-32 group flex">
            {formData?.profileimage ? (
              <img
                src={formData?.profileimage}
                alt="User Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar
                size={125}
                className="w-full h-full object-cover"
                name={principal}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            )}
            {editMode && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={handlepofileChange}
                />
                <span
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full text-sm font-medium text-white bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <p>Edit image</p>
                </span>
              </>
            )}
          </div>
          <AnimatePresence>
            {editMode ? (
              <EditForm
                formData={formData}
                setFormData={setFormData}
                setEditMode={setEditMode}
              />
            ) : (
              <ProfileInfo
                userInfo={userInfo}
                formData={formData}
                handleEdit={handleEdit}
                isLoading={isLoading}
                isCopied={isCopied}
                setCopied={setCopied}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

const ProfileInfo = ({
  userInfo,
  formData,
  handleEdit,
  isLoading,
  isCopied,
  setCopied,
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVariants}
    className="infos"
  >
    <div className="name">
      {/* <h2 className="flex items-center gap-2">
        {" "}
        <span className="line-clamp-1">
          {" "}
          {userInfo.userPlugPrincipal ? userInfo.userPlugPrincipal : ""}
        </span>
        {userInfo.userPlugPrincipal ? (
          <button
            onClick={() => {
              setCopied();
              toast.success("Principal copied successfully");
            }}
            className="text-gray-400"
          >
            {isCopied ? (
              <RiCheckLine className="w-5 h-5 text-emerald-500" />
            ) : (
              <RiFileCopyLine className="w-5 h-5 text-gray-600" />
            )}
          </button>
        ) : (
          ""
        )}
      </h2> */}
      {/* <h4>@User principal</h4> */}
    </div>
    <ul className="flex flex-col">
      <li className="flex gap-4 py-2">
        <PiUserCircleLight size={24} color="#1DA1F2" />
        <h4>
          {isLoading
            ? "loading...."
            : `${formData?.firstName} ${formData?.lastName}`}
        </h4>
      </li>
      <li className="flex gap-4 py-2">
        <PiTwitterLogo size={24} color="#1DA1F2" />
        {formData?.twitter ? (
          <h4>{isLoading ? "Loading..." : `${formData?.twitter}`}</h4>
        ) : (
          <span className="text-gray-400 ">https://twitter.com/username</span>
        )}
      </li>
      <li className="flex gap-4 py-2">
        <MdOutlineMailOutline size={24} color="#1DA1F2" />
        <h4>{isLoading ? "Loading ..." : `${formData?.email}`}</h4>
      </li>
      <li className="flex gap-4 py-2">
        <PiTelegramLogo size={24} color="#24A1DE" />
        {formData?.telegram ? (
          <h4>{isLoading ? "Loading..." : `${formData?.telegram}`}</h4>
        ) : (
          <span className="text-gray-400 ">https://t.me/username</span>
        )}
      </li>
      <li className="flex gap-4 py-2">
        <PiDiscordLogoLight size={24} color="#7289da" />
        {formData?.discord ? (
          <h4>{isLoading ? "Loading..." : `${formData?.discord}`}</h4>
        ) : (
          <span className="text-gray-400 ">https://discord.com/username</span>
        )}
      </li>
    </ul>
    <div className="links py-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="follow"
        onClick={handleEdit}
      >
        Edit Profile
      </motion.button>
    </div>
  </motion.div>
);

const EditForm = ({ formData, setFormData, setEditMode }) => {
  const [loading, setLoading] = useState(false);
  // const [backend] = useCanister("backend");
  const { backendActor } = useAuth();
  console.log("backendActor", backendActor);
  // const { isConnected, principal } = useConnect();
  const { isAuthenticated, principal } = useAuth();
  const userInfo = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.profileimage.trim())
      newErrors.profileimage = "Profile image is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        if (validateForm()) {
          setLoading(true);
          const User = {
            profileimage: formData.profileimage || "",
            firstName: formData.firstName || "",
            lastName: formData.lastName || "",
            email: formData.email || "",
            twitter: formData.twitter || "",
            discord: formData.discord || "",
            telegram: formData.telegram || "",
          };

          console.log("record is", User);
          setErrors({});
          const user = await backendActor?.updateUser(User);

          if (user.ok) {
            console.log("Updated:", user.ok);
            toast.success("Profile Updated successfully");
          } else {
            console.error("Error updating user:", user);
          }
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Login to Update Profile");
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="infos md:w-6/12 w-full"
    >
      <div className="flex flex-col">
        <div>
          {/* <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiUserCircleLight size={24} color="white" />
            </span>
            <input
              type="text"
              name="id"
              className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[1.3rem]"
              value={
                userInfo.userPlugPrincipal ? userInfo.userPlugPrincipal : ""
              }
              placeholder="USER ID "
              onChange={handleChange}
              disabled={loading}
              readOnly
            />
          </div> */}
          {/* <h4 className="text-[0.8rem]">@User Principal</h4> */}
        </div>
        <div className="py-2 flex flex-col gap-2 w-full">
          <div className="flex gap-4 max-lg:flex-col">
            <div className="w-full">
              <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden w-full">
                <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
                  <RxAvatar size={24} color="white" />
                </span>
                <input
                  type="text"
                  name="firstName"
                  className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[0.9rem]"
                  value={formData.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="w-full">
              <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden w-full">
                <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
                  <RxAvatar size={24} color="white" />
                </span>
                <input
                  type="text"
                  name="lastName"
                  className="focus:outline-none outline-none bg-transparent pl-12 text-[0.9rem]"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <MdOutlineMailOutline size={24} color="white" />
            </span>
            <input
              type="text"
              name="email"
              className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[0.9rem]"
              value={formData.email}
              placeholder="test@gmail.com1"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
          <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiTelegramLogo size={24} color="white" />
            </span>
            <input
              type="text"
              name="telegram"
              className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[0.9rem]"
              value={formData.telegram}
              placeholder="https://t.me/username"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          {errors.telegram && (
            <span className="text-red-500 text-sm">{errors.telegram}</span>
          )}
          <div className="py-2 border border-gray-400 rounded-md relative overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiTwitterLogo size={24} color="white" />
            </span>
            <input
              type="text"
              name="twitter"
              className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[0.9rem]"
              value={formData.twitter}
              placeholder="https://twitter.com/username"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          {errors.twitter && (
            <span className="text-red-500 text-sm">{errors.twitter}</span>
          )}
          <div className="py-2 border border-gray-400 rounded-md relative overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiDiscordLogoLight size={24} color="white" />
            </span>
            <input
              type="text"
              name="discord"
              placeholder="https://discord.com/username"
              className="focus:outline-none bg-transparent outline-none pl-12 w-full text-[0.9rem]"
              value={formData.discord}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          {errors.discord && (
            <span className="text-red-500 text-sm">{errors.discord}</span>
          )}
        </div>
        {errors.profileimage && (
          <span className="text-red-500 text-sm">{errors.profileimage}</span>
        )}
        <div className="links py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`follow ${loading ? "opacity-50 " : " "}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfileDetails;
