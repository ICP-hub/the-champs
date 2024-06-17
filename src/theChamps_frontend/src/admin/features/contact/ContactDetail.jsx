import React, { useState, useEffect } from "react";
import { TbSquareRoundedChevronLeft } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import AdminLoader from "../../components/laoding-admin";
import { useAuth } from "../../../auth/useClient";

const ContactDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { backendActor } = useAuth();
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
      const data = await backendActor?.getContact(slug);
      if (data.ok) {
        setFormData({
          name: data.ok.name,
          contact_number: data.ok.contact_number,
          message: data.ok.message,
          email: data.ok.email,
        });
        setMessages(data.ok);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching contact:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllCollections();
    }, 1000);
    return () => clearTimeout(timer);
  }, [backendActor]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await backendActor.deleteContact(messages.id);
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setLoading(false);
      navigate("/admin/message");
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
            Message Detail
          </div>
        </h1>
      </div>
      {isLoading ? (
        <AdminLoader />
      ) : (
        <form className="space-y-4" onSubmit={handleDelete}>
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
                htmlFor="email"
                className="md:text-lg text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-3 py-2 mt-2 focus:outline-none rounded-lg dark:bg-[#3d3d5f] bg-white border dark:border-[#914fe66a]"
                value={formData.email}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="contact_number"
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
              htmlFor="message"
              className="md:text-lg text-sm font-semibold"
            >
              Message
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
              type="submit"
              className="uppercase bg-[#fff] shadow-md dark:bg-[#2e2e48] border border-red-500 flex items-center justify-start gap-3 px-4 py-2 rounded-xl"
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
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactDetail;
