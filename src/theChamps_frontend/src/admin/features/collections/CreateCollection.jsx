import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { TbDisabled, TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useCanister, useConnect, useDialog } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import Toggle from "react-toggle";
// import { useCanister } from "@connect2ic/react";
// import * as nft from "../../../.dfx/local/canisters/theChamps_nft";

const CreateCollections = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedRoyalty, setSelectedRoyalty] = useState("");

  // const userid = Principal.fromText(
  //   "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  // );

  // console.log("nft is backend", nft);
  const sendback = () => {
    navigate(-1);
  };
  const { principal, isConnected } = useConnect();

  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    logo: {
      data: "",
      logo_type: "",
    },
    banner: {
      data: "",
      logo_type: "",
    },
    description: "",
    name: "",
    symbol: "",
    maxLimit: "",
    featured: false,
  });
  const handleCheeseChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      featured: !prevFormData.featured,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const getFileType = (file) => {
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    const extensionToTypeMap = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
    };

    const mimeType = extensionToTypeMap[fileExtension];
    if (mimeType) {
      return mimeType;
    } else {
      return file.type;
    }
  };

  const handleLogoDataChange = async (e) => {
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
      const fileType = getFileType(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        logo: {
          data: logoBlob,
          logo_type: fileType,
        },
      }));
      console.log("blob is for logo", logoBlob);
    } catch (error) {
      console.error("Error converting image to blob:", error);
    }
  };

  const handleBannerDataChange = async (e) => {
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
      const bannerBlob = await imageToFileBlob(file);
      const fileType = getFileType(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        banner: {
          data: bannerBlob,
          logo_type: fileType,
        },
      }));
      console.log("blob is for banner", bannerBlob);
    } catch (error) {
      // Handle potential errors during file processing here (optional)
      console.error("Error converting image to blob:", error);
      toast.error(
        "An error occurred while processing the image. Please try again."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isConnected) {
      try {
        setLoading(true);

        if (!formData.logo.data || !formData.banner.data) {
          console.error("Logo or banner data is missing.");
          return;
        }

        console.log("formData:", formData);
        console.log("Submitting collection creation request...");
        const result = await backend.createcollection(
          formData.logo,
          formData.banner,
          formData.description,
          formData.name,
          formData.symbol,
          parseInt(formData.maxLimit),
          formData.featured
        );

        console.log("Collection creation result:", result);

        if (result.principal) {
          console.log("Collection created successfully!", result);
          toast.success("Collection created successfully!");
        }
      } catch (error) {
        console.error("Error creating collection:", error);
        toast.error("Error creating collection. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Login to Continue...");
      navigate("/");
    }
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4">
          {/* <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Principal
            </label>
            <input
              type="text"
              id="principal"
              name="principal"
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.principal}
              onChange={handleChange}
              required
              isabled={loading}
            />
          </div> */}
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Collection Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="md:text-lg text-sm font-semibold">
              Max Limit
            </label>
            <input
              type="number"
              id="maxLimit"
              name="maxLimit"
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.maxLimit}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="description"
            className="md:text-lg text-sm font-semibold"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="logoData"
            className="md:text-lg text-sm font-semibold"
          >
            Logo Img
          </label>
          <input
            type="file"
            id="logoData"
            name="logoData"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            onChange={handleLogoDataChange}
            required
            disabled={loading}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="bannerData"
            className="md:text-lg text-sm font-semibold"
          >
            Banner Img
          </label>
          <input
            type="file"
            id="bannerData"
            name="bannerData"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            onChange={handleBannerDataChange}
            required
            disabled={loading}
          />
        </div>

        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Symbol
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            value={formData.symbol}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="w-full flex gap-5 pt-5 items-center">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Featured
          </label>
          <Toggle
            className=" px-3 py-2  focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            id="featured"
            defaultChecked={formData.featured}
            onChange={handleCheeseChange}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={sendback}
            disabled={loading}
            className={`uppercase bg-[#fff] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl ${
              loading && "opacity-50"
            } `}
          >
            cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className={`uppercase bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ${
              loading && "opacity-50"
            } `}
          >
            {loading ? (
              <div className="flex gap-3 items-center ">
                Creating Collection
                <TailSpin
                  height="15"
                  width="15"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              </div>
            ) : (
              "Create Collection"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollections;
