import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

const UploadNFTImg = () => {
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
    <div className="mx-4 md:py-8 md:px-6 p-2 flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff]  dark:shadow-[#323257] rounded-t-2xl mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Upload Asset</h1>
        <p>
          The maximum collection size we currently support is 10 GB. For
          collections larger than this, please email us at support@toniqlabs.com
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Types of Upload
            <br />{" "}
          </label>
          <div className="w-full flex items-center  mt-3">
            <input
              type="radio"
              name="open"
              id=""
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              I'm uploading the final pieces of artwork
            </label>
          </div>
          <div className="w-full flex items-center  mt-3">
            <input
              type="radio"
              name="open"
              id=""
              className="w-5 h-6  bg-[#475be8] border "
            />
            <label htmlFor="" className="mx-2 text-lg ">
              I'm uploading the asset layers to generate the artwork
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="name"
            className="md:text-lg text-sm pt-4 font-semibold"
          >
            Do you wish to upload more than 50 assets?*
          </label>
          <select
            name=""
            id=""
            required
            className="w-full px-2 py-4 dark:bg-[#3d3d5f] bg-white  dark:border-[#914fe66a] focus:outline-none rounded-lg  border boder-[#565674]"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="w-full">
          <label htmlFor="name" className="md:text-lg text-sm font-semibold">
            Upload Metadata
          </label>
          <div className="flex gap-4 mt-4 items-start">
            <section className="">
              <div
                {...getRootProps({
                  className:
                    "dropzone dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a] border boder-[#565674] px-3 py-3 rounded-lg",
                })}
              >
                <input {...getInputProps()} />
                <p className="">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
              <aside className="flex flex-wrap mt-4">{thumbs}</aside>
            </section>
            <button className="uppercase  shadow-md  py-3 px-2 rounded-xl border dark:bg-[#3d3d5f] bg-white dark:border-[#914fe66a] ">
              Download metadata templet
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="name"
            className="md:text-lg text-sm mb-4 pb-4 font-semibold"
          >
            Upload Thumbnail <br />{" "}
            <span className="text-sm mt-4 pt-4">
              Thumbnails are displayed when viewing NFTs on the collection page.
              Creators are welcome to generate and upload their own thumbnails.
              For static image collections Toniq Mint will auto-generate
              thumbnails if no files are uploaded (most common). For non-static
              (mp4, html) collections, creators should upload their own.
              Thumbnails requirements: 1) Less than 1.9 MB each 2) type: png,
              jpeg, gif 3) size: 300x300 4) file name exactly matches full asset
              file name.
            </span>
          </label>
          <div className="flex gap-4 mt-4 items-start">
            <section className="">
              <div
                {...getRootProps({
                  className:
                    "dropzone dark:bg-[#3d3d5f] bg-white  border dark:border-[#914fe66a] border boder-[#565674] px-2 py-3 rounded-lg",
                })}
              >
                <input {...getInputProps()} />
                <p className="">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
              <aside className="flex flex-wrap mt-4">{thumbs}</aside>
            </section>
            <button className="uppercase  shadow-md  px-2 py-3 rounded-xl dark:bg-[#3d3d5f]   dark:border-[#914fe66a] border boder-[#565674]">
              Download metadata templet
            </button>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button className="uppercase bg-[#fff] text-sm md:text-[16px] shadow-md dark:bg-[#2e2e48] border border-[#FC001E]  flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl  ">
            cancel
          </button>

          <button className="uppercase text-sm md:text-[16px] bg-gradient-to-r from-[#FC001E] to-[#FF7D57] shadow-md   flex items-center justify-start gap-3 py-2 px-2 md:px-4 md:py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] ">
            save & next
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadNFTImg;
