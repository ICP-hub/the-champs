import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { TbDisabled, TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
const CreateCollections = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedRoyalty, setSelectedRoyalty] = useState("");
  const userid = Principal.fromText(
    "5gojq-7zyol-kqpfn-vett2-e6at4-2wmg5-wyshc-ptyz3-t7pos-okakd-7qe"
  );

  const options = [];
  for (let i = 1; i <= 50; i += 0.5) {
    options.push({ value: i.toFixed(1), label: `${i}%` });
  }

  const sendback = () => {
    navigate(-1);
  };
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

  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    principal: "",
    record: {
      maxLimit: "",
      logo: {
        data: "",
        logo_type: "",
      },
      banner: {
        data: "",
        logo_type: "",
      },
      name: "",
      symbol: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData };

    // Handle both top-level and nested field updates
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
    // Extract file extension
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    // Map common image file extensions to MIME types
    const extensionToTypeMap = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      // Add more mappings as needed
    };

    // Look up MIME type based on file extension
    const mimeType = extensionToTypeMap[fileExtension];
    if (mimeType) {
      return mimeType;
    } else {
      // If MIME type is not found, default to the file's type
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
        },
      });
      console.log("blob is ", logoBlob);
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
      const { principal, record } = formData;
      const parsedRecord = {
        ...record,
        maxLimit: parseInt(record.maxLimit),
      };
      const result = await backend.createcollection(
        Principal.fromText(principal),
        parsedRecord
      );
      console.log("Collection creation result:", result);

      if (result.ok) {
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
          <div className="w-full">
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
            htmlFor="logoData"
            className="md:text-lg text-sm font-semibold"
          >
            Banner img Img
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
