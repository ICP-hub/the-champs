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

const CreateCollections = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedRoyalty, setSelectedRoyalty] = useState("");
  const { principal } = useConnect();
  // const userid = Principal.fromText(
  //   "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  // );

  const sendback = () => {
    navigate(-1);
  };

  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    record: {
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
      maxLimit: 0,
      featured: false,
    },
  });

  const handleCheeseChange = () => {
    setFormData({
      ...formData,
      record: {
        ...formData.record,
        featured: !formData.record.featured,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData };
    const parts = name.split(".");
    if (parts.length === 1) {
      updatedFormData[name] = value;
    } else {
      const [recordField, nestedField] = parts;
      updatedFormData.record[nestedField] = value;
    }

    setFormData(updatedFormData);
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

      setFormData({
        ...formData,
        record: {
          ...formData.record,
          logo: {
            ...formData.record.logo,
            data: logoBlob,
            logo_type: fileType,
          },
          banner: {
            ...formData.record.logo,
            data: logoBlob,
            logo_type: fileType,
          },
        },
      });
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
        record: {
          ...prevFormData.record,
          banner: {
            ...prevFormData.record.banner,
            data: bannerBlob,
            logo_type: fileType,
          },
        },
      }));
      console.log("blob is for banner", bannerBlob);
    } catch (error) {
      console.error("Error converting image to blob:", error);
    }
  };
  const handleLogoTypeChange = (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      record: {
        ...prevState.record,
        logo: {
          ...prevState.record.logo,
          logo_type: value,
        },
      },
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { record } = formData;
      const parsedRecord = {
        ...record,
        maxLimit: parseInt(record.maxLimit),
      };
      if (!parsedRecord.logo.data) {
        console.error("Logo data is missing.");
        return;
      }
      console.log("data is ", formData);
      const result = await backend.createcollection(
        parsedRecord.logo,
        parsedRecord.banner,
        parsedRecord.description,
        parsedRecord.name,
        parsedRecord.symbol,
        parsedRecord.maxLimit,
        parsedRecord.featured
      );
      console.log("Collection creation result:", result);

      if (result.principal) {
        console.log("Collection created successfully!", result);
        toast.success("Collection created successfully!");
      } else {
        console.error("Collection creation failed:", result);
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setLoading(false);
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
              name="record.name"
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.record.name}
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
              name="record.maxLimit"
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.record.maxLimit}
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
            name="record.description"
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
            name="record.symbol"
            className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
            value={formData.record.symbol}
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
            defaultChecked={formData.record.featured}
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
            cancle
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
