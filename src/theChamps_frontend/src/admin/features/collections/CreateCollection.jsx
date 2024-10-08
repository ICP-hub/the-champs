import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { TbDisabled, TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import { useCanister, useConnect, useDialog } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import Toggle from "react-toggle";
import TextHint from "../../components/admin-text-hint";
import { useAuth } from "../../../auth/useClient";
// import { useCanister } from "@connect2ic/react";
// import * as nft from "../../../.dfx/local/canisters/theChamps_nft";

const CreateCollections = ({ handleCreate, setFormSubmitted, isNew }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedRoyalty, setSelectedRoyalty] = useState("");
  const [collId, setCollId] = useState("");
  const [errorField, setErrorField] = useState(null);
  // const { principal, isConnected } = useConnect();
  const { principal, isAuthenticated } = useAuth();
  const { backendActor } = useAuth();
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

  // const userid = Principal.fromText(
  //   "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  // );

  // console.log("nft is backend", nft);

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
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer], { type: files.type });
        // console.log(blob);
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
      // console.error(
      //   "Selected file is too large. Please select an image file less than or equal to 1 MB."
      // );
      toast.error("Please select an image file less than or equal to 1 MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      // console.error("Selected file is not an image.");
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
      // console.log("blob is for logo", logoBlob);
    } catch (error) {
      // console.error("Error converting image to blob:", error);
    }
  };

  const handleBannerDataChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSizeInBytes = 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      // console.error(
      //   "Selected file is too large. Please select an image file less than or equal to 1 MB."
      // );
      toast.error("Please select an image file less than or equal to 1 MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      // console.error("Selected file is not an image.");
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
      // console.log("blob is for banner", bannerBlob);
    } catch (error) {
      // Handle potential errors during file processing here (optional)
      // console.error("Error converting image to blob:", error);
      toast.error(
        "An error occurred while processing the image. Please try again."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (isConnected) {
    try {
      setLoading(true);
      if (!formData.logo.data || !formData.banner.data) {
        // console.error("Logo or banner data is missing.");
        return;
      }
      // console.log("formData:", formData);
      // console.log("Submitting collection creation request...");
      const result = await backendActor?.createcollection(
        { data: formData.logo.data, logo_type: formData.logo.logo_type },
        { data: formData.banner.data, logo_type: formData.banner.logo_type },
        formData.description,
        formData.name,
        formData.symbol,
        parseInt(formData.maxLimit),
        formData.featured
      );
      // console.log("Collection creation result:", result);
      if (result.principal) {
        // console.log("Collection created successfully!", result);
      }
      toast.success("Collection created successfully!");
      handleCreate();
      setFormSubmitted((prev) => !prev);
    } catch (error) {
      // console.error("Error creating collection:", error);
      toast.error("Error creating collection. Please try again.");
    } finally {
      setLoading(false);
    }
    // }
  };

  // Get removed collection
  const getOldCollection = async () => {
    const isValidPrincipalId = (id) => {
      const principalIdRegex =
        /^[a-z0-9-]{5,}-[a-z0-9-]{5,}-[a-z0-9-]{5,}-[a-z0-9-]{5,}-[a-z0-9-]{3,}$/;
      return principalIdRegex.test(id);
    };
    try {
      setLoading(true);
      if (!collId.trim()) {
        setErrorField("Please Enter the collection ID");
        return;
      }
      if (!isValidPrincipalId(collId)) {
        setErrorField("Invalid Principal ID format");
        return;
      }
      const id = Principal.fromText(collId);
      const res = await backendActor?.add_collection_to_map(id);
      toast.success(res);
      handleCreate();
      setFormSubmitted((prev) => !prev);
    } catch (err) {
      // console.log("Error getting old collection :", err);
      toast.error("Error adding collection");
    } finally {
      setLoading(false);
    }
  };

  // Remove error msg
  useEffect(() => {
    setErrorField("");
  }, [collId]);

  return (
    <div className="flex flex-col bg-card shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          <div className="flex gap-4 items-center">
            <TbSquareRoundedChevronLeft
              onClick={handleCreate}
              className="w-6 h-6 cursor-pointer"
            />
            Create Collection
          </div>
        </h1>
      </div>
      {isNew ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="name"
                  className="md:text-lg text-sm font-semibold"
                >
                  Collection Name
                </label>
                <TextHint text="Enter the name of the collection." />
              </div>
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
              <div className="flex items-center gap-2">
                <label
                  htmlFor="maxLimit"
                  className="md:text-lg text-sm font-semibold"
                >
                  Max Limit
                </label>
                <TextHint text="Please specify the maximum number of collectibles that can be created in this collection." />
              </div>
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
            <div className="flex items-center gap-2">
              <label
                htmlFor="description"
                className="md:text-lg text-sm font-semibold"
              >
                Description
              </label>
              <TextHint text="Provide a description for the collection." />
            </div>
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
            <div className="flex items-center gap-2">
              <label
                htmlFor="logoData"
                className="md:text-lg text-sm font-semibold"
              >
                Logo Img
              </label>
              <TextHint text="Upload the logo image for the collection." />
            </div>
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
            <div className="flex items-center gap-2">
              <label
                htmlFor="bannerData"
                className="md:text-lg text-sm font-semibold"
              >
                Banner Img
              </label>
              <TextHint text="Upload the banner image for the collection." />
            </div>
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
            <div className="flex items-center gap-2">
              <label
                htmlFor="symbol"
                className="md:text-lg text-sm font-semibold"
              >
                Symbol
              </label>
              <TextHint text="Enter the symbol for the collection." />
            </div>
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
            <label
              htmlFor="featured"
              className="md:text-lg text-sm font-semibold"
            >
              Featured
            </label>
            <TextHint text="Toggle if this collection is featured." />
            <Toggle
              className=" px-3 py-2  focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              id="featured"
              defaultChecked={formData.featured}
              onChange={handleCheeseChange}
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={handleCreate}
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
      ) : (
        <div className="w-full">
          <span className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label className="md:text-lg text-sm font-semibold">
                Collection ID
              </label>
              <TextHint text="Enter the id of the collection you want to retrieve" />
            </div>
            {errorField && (
              <p className="text-red-400 text-xs font-medium">{errorField}</p>
            )}
          </span>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            value={collId}
            onChange={(e) => setCollId(e.target.value)}
            required
            disabled={loading}
          />
          <span className="flex justify-end mt-4">
            <button
              className={`px-4 py-2 text-white rounded-md ${
                !loading ? "button" : "bg-gray-600"
              }`}
              onClick={getOldCollection}
            >
              {loading ? (
                <div className="flex gap-3 items-center ">
                  Adding Collection
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
                "Add Collection"
              )}
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default CreateCollections;
