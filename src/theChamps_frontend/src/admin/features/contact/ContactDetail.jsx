import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { Grid, TailSpin } from "react-loader-spinner";
import AdminLoader from "../../components/laoding-admin";
const ContactDetail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });

  const getAllCollections = async () => {
    try {
      const data = await backend.getContact(param.slug);
      if (data.ok) {
        setFormData({
          name: data.ok.name,
          contact_number: data.ok.contact_number,
          message: data.ok.message,
          email: data.ok.email,
        });
        setMessages(data.ok);
        console.log(data.ok);
      }
      setIsLoading(false);
      console.log("data", data);
    } catch (error) {
      console.log("reeegdf", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllCollections();
    }, 1000);
    return () => clearTimeout(timer);
  }, [backend]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log(messages.id);
      const res = await backend.deleteContact(messages.id);
      
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-t-2xl p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          <div className="flex gap-4 items-center">
            <TbSquareRoundedChevronLeft
              onClick={() => navigate(-1)}
              className="w-6 h-6 cursor-pointer"
            />
            message detail
          </div>
        </h1>
      </div>
      {isLoading ? (
        <AdminLoader />
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label
                htmlFor="name"
                className="md:text-lg text-sm font-semibold"
              >
                Name
              </label>
              <input
                readOnly
                type="text"
                className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
                value={formData.name}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="name"
                className="md:text-lg text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
                value={formData?.email}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="logoData"
              className="md:text-lg text-sm font-semibold"
            >
              Contact Number
            </label>
            <input
              type="text"
              readOnly
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.contact_number}
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="logoType"
              className="md:text-lg text-sm font-semibold"
            >
              Message <br />
            </label>
            <textarea
              cols="30"
              rows="10"
              type="text"
              readOnly
              className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
              value={formData.message}
              required
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="uppercase bg-[#fff] shadow-md dark:bg-[#2e2e48] border border-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl   "
              onClick={handleDelete}
            >
              {loading ? (
                <div className="flex gap-3 items-center">
                  Delete message
                  <TailSpin
                    height="15"
                    width="15"
                    color="black"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                </div>
              ) : (
                "Delete message"
              )}
            </button>
            {/* <button
              type="submit"
              className="uppercase bg-red-500 shadow-md dark:bg-red-500  flex items-center justify-start gap-3 px-4 py-2 rounded-xl text-[#ffffff] bg:text-[#e1e1e1] "
            >
              {loading ? (
                <div className="flex gap-3 items-center">
                  Update message
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
                "Update message"
              )}
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactDetail;
