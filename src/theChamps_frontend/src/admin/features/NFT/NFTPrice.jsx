import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const NFTPrice = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedRoyalty, setSelectedRoyalty] = useState("");
  const [formData, setFormdata] = useState({
    name: "",
    lastname: " ",
  });

  const options = [];
  for (let i = 1; i <= 50; i += 0.5) {
    options.push({ value: i.toFixed(1), label: `${i}%` });
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { ease: "easeInOut" },
      }}
      className="flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff]  dark:shadow-[#323257] rounded-t-2xl mt-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pricing Group</h1>
      </div>
      <form className="space-y-4">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Group Name*
            </label>
            <input
              type="text"
              id="name"
              required
              name="name"
              value={formData.name}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Group Start Date*
            </label>
            <input
              type="date"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Group Start Time (UTC)*
            </label>
            <input
              type="time"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Group End Date*
            </label>
            <input
              type="date"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Group End Time (UTC)*
            </label>
            <input
              type="time"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Price (ICP)*
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Public/Private*
            <br />{" "}
            <span className="text-sm">
              Select public if everyone should be included in this pricing
              group. Select private if you want to grant exclusive access to a
              list of wallet addresses.
            </span>
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-3 py-2  focus:outline-none rounded-lg dark:bg-[#3d3d5f] border dark:border-[#914fe66a]"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Bulk Purchases*
            <br />{" "}
            <span className="text-sm">
              Would you like bulk purchases options? (recommended to improve
              code performance)
            </span>
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-3 py-2  focus:outline-none rounded-lg dark:bg-[#3d3d5f] border dark:border-[#914fe66a]"
          >
            <option value="yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Individual wallet limit
            <br />{" "}
            <span className="text-sm">
              The maximum number of NFTs a user can purchase from this group.
              Leave blank for no limit.
            </span>
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Group limit
            <br />{" "}
            <span className="text-sm">
              The maximum number of NFTs that can be purchased by this group.
              Leave blank for no limit. For Example: A private group of 100
              members has an individual wallet limit of 1 and a group limit of
              90. Of the 100 members, up to 90 can purchase 1 NFT each.
            </span>
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
            cancel
          </button>
          <button className="uppercase text-sm md:text-[16px] bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3  py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            Continue
          </button>
          <button className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-red-500 to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            save & next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NFTPrice;
