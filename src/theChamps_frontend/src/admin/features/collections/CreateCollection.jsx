import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CreateCollections = () => {
  const navigate = useNavigate();
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
    <div className="mx-4 md:py-8 md:px-6 p-2  flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl mt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          <div className="flex gap-4 items-center">
            <TbSquareRoundedChevronLeft
              onClick={() => navigate(-1)}
              className="w-6 h-6 cursor-pointer"
            />
            Create Collection
          </div>
        </h1>
      </div>
      <form className="space-y-4">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Creator Name*
            </label>
            <input
              type="text"
              id="name"
              required
              name="name"
              value={formData.name}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Collection Name
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Tiny Description* <br />{" "}
            <span className="text-sm">Less than 7 words</span>
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Collection Description*
            <br />{" "}
            <span className="text-sm">Less than 500 words, 2-3 paragraphs</span>
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Keywords*
            <br />{" "}
            <span className="text-sm">
              A space separated list of relevant keywords. Non-relevant keywords
              will be removed. Too many non-relevant keywords and we will reject
              your entry
            </span>
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Website URL*
          </label>
          <input
            type="text"
            id="name"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handlechange}
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          />
        </div>
        <h1 className="text-xl mt-8 mb-2">Social Links</h1>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Telegram
            </label>
            <input
              type="text"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Discord
            </label>
            <input
              type="text"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Twitter
            </label>
            <input
              type="text"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Medium
            </label>
            <input
              type="text"
              id="name"
              required
              name="lastname"
              value={formData.lastname}
              onChange={handlechange}
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg  dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            />
          </div>
        </div>
        <h1 className="text-xl">Images</h1>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Avatar - square image (which will be cropped to a circle).* <br />
            <span className="text-sm">
              Please provide at 150x150 as a JPG or PNG
            </span>
          </label>
          <section className="container">
            <div
              {...getRootProps({
                className:
                  "dropzone dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] border boder-[#565674] p-4 rounded-lg",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
            <aside className="flex flex-wrap mt-4">{thumbs}</aside>
          </section>
          <span className="text-sm">
            Image should be a square .jpg, .png, .svg, or .gif
          </span>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Collection Banner <br />
            <span className="text-sm">
              Images should be 1200px wide and 200px high. (If larger will be
              cropped around to fit).
            </span>
          </label>
          <section className="container">
            <div
              {...getRootProps({
                className:
                  "dropzone dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] border boder-[#565674] p-4 rounded-lg",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
            <aside className="flex flex-wrap mt-4">{thumbs}</aside>
          </section>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Collection Image*
            <br />
            <span className="text-sm">Please provide at 350x200 as a JPG</span>
          </label>
          <section className="container">
            <div
              {...getRootProps({
                className:
                  "dropzone dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] border boder-[#565674] p-4 rounded-lg",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
            <aside className="flex flex-wrap mt-4">{thumbs}</aside>
          </section>
          <span className="text-sm">
            Image should be a square .jpg, .png, .svg, or .gif
          </span>
        </div>
        <h1 className="text-xl ">Payment Information</h1>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Creator fee (% royalty on secondary sales)* <br />{" "}
            <span className="text-sm">
              The Creator Royalty is the percentage royalty you will take from
              secondary sales in the market. We recommend 2.5% or less for most
              projects.
            </span>
          </label>
          <select
            name="roylity"
            id=""
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
          >
            <option value="">Select Royality</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Wallet address to receive ICP* <br />{" "}
            <span className="text-sm">
              This must be a wallet address, not principal ID. This is where you
              will receive primary sale proceeds (ICP), and secondary market
              royalties (ICP).
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
            Wallet address to receive NFTs* <br />{" "}
            <span className="text-sm">
              This must be a wallet address, not principal ID. This is where you
              will receive team NFTs and surplus NFTs from your launch
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
          <button className="uppercase bg-[#fff] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl   ">
            cancle
          </button>
          <button className="uppercase bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            save & next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollections;
