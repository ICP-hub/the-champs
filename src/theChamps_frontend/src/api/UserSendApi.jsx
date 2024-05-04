import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import toast from "react-hot-toast";

const UserSendAPI = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(false);
  //createContact
  const sendUserContact = async (userData, setFormSubmited) => {
    const data = {
      country: userData.country,
      name: userData.firstName + " " + userData.lastName,
      email: userData.email,
      contact_number: userData.phoneNumber,
      message: userData.additionalDetails,
    };

    try {
      setIsLoading(true);
      const res = await backend.createContact(data);
      console.log("Response form sendUserContact", res);
      setFormSubmited(true);
      toast.success("Submitted Successfully! We'll contact you soon!");
    } catch (err) {
      console.log("Error sending email info", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendUserContact, isLoading };
};

export default UserSendAPI;
