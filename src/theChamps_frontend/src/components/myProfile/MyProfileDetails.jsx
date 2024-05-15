import "./profilecard.css";
import { MdEdit } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiDiscordLogoLight,
  PiTelegramLogo,
  PiTwitterLogo,
  PiUserCircleLight,
} from "react-icons/pi";

import UserLogo from "../../assets/images/userlogo.png";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, x: 400, transition: { duration: 0.4 } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -400, transition: { duration: 0.4 } },
};

const MyProfileDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "Username",
    telegram: "https://t.me/username",
    twitter: "https://twitter.com/username",
    discord: "https://discord.com/username",
  });
  const [image, setImage] = useState(UserLogo);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="card">
      <div className="relative overflow-hidden w-32 h-32 group">
        <img
          src={image}
          alt="User Logo"
          className="w-full h-full object-cover"
        />
        {editMode && (
          <>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleImageChange}
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
          <ProfileInfo formData={formData} handleEdit={handleEdit} />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileInfo = ({ formData, handleEdit }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVariants}
    className="infos"
  >
    <div className="name">
      <h2>{formData.username}</h2>
      <h4>@User principal</h4>
    </div>
    <ul className="flex flex-col">
      <li className="flex gap-4 py-2">
        <PiTelegramLogo size={24} color="#24A1DE" />
        <h4>{formData.telegram}</h4>
      </li>
      <li className="flex gap-4 py-2">
        <PiTwitterLogo size={24} color="#1DA1F2" />
        <h4>{formData.twitter}</h4>
      </li>
      <li className="flex gap-4 py-2">
        <PiDiscordLogoLight size={24} color="#7289da" />
        <h4>{formData.discord}</h4>
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = () => {
    setEditMode(false);
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
          <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiUserCircleLight size={24} color="white" />
            </span>
            <input
              type="text"
              name="username"
              className="focus:outline-none outline-none pl-12 w-full text-[1.3rem]"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <h4 className="text-[0.8rem]">@User Principal</h4>
        </div>
        <div className="py-2 flex flex-col gap-2 w-full">
          <div className="py-2 border border-gray-400 rounded-md relative flex gap-2 overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiTelegramLogo size={24} color="white" />
            </span>
            <input
              type="text"
              name="telegram"
              className="focus:outline-none outline-none pl-12 w-full text-[0.9rem]"
              value={formData.telegram}
              onChange={handleChange}
            />
          </div>
          <div className="py-2 border border-gray-400 rounded-md relative overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiTwitterLogo size={24} color="white" />
            </span>
            <input
              type="text"
              name="twitter"
              className="focus:outline-none outline-none pl-12 w-full text-[0.9rem]"
              value={formData.twitter}
              onChange={handleChange}
            />
          </div>
          <div className="py-2 border border-gray-400 rounded-md relative overflow-hidden">
            <span className="button absolute top-0 bottom-0 flex items-center justify-center p-2">
              <PiDiscordLogoLight size={24} color="white" />
            </span>
            <input
              type="text"
              name="discord"
              className="focus:outline-none outline-none pl-12 w-full text-[0.9rem]"
              value={formData.discord}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="links py-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="follow"
            onClick={handleSubmitForm}
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfileDetails;
