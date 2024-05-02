import React, { useEffect, useState } from "react";
import { CountryInput, Input, TelInput } from "../common/Inputs";
import UserSendAPI from "../../api/UserSendApi";
import { TailSpin } from "react-loader-spinner";

const ContactForm = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    additionalDetails: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { sendUserContact, isLoading } = UserSendAPI();
  const [formSubmited, setFormSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle country change separately
  const handleCountryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log(formData);
    sendUserContact(formData, setFormSubmited);
    // setFormData(initialFormData); // Reset form data after submission

    setFormSubmited(false);
  };

  useEffect(() => {
    if (formSubmited) {
      setFormData(initialFormData);
    }
  }, [formSubmited]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-lg:order-last flex flex-col gap-5 pt-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={handleChange}
          name="firstName"
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
          name="lastName"
          required
        />
      </div>
      {/* Render other inputs */}
      {Object.keys(initialFormData)
        .filter(
          (key) =>
            key !== "firstName" &&
            key !== "lastName" &&
            key !== "country" &&
            key !== "additionalDetails" &&
            key !== "phoneNumber"
        ) // Exclude country from the loop
        .map((key) => (
          <Input
            key={key}
            label={key.replace(/([A-Z])/g, " $1").trim()}
            type={key === "email" ? "email" : "text"}
            placeholder={`Enter your ${key.toLowerCase()}`}
            value={formData[key]}
            onChange={handleChange}
            name={key}
            required={
              key === "email" ||
              key === "firstName" ||
              key === "lastName" ||
              key === "companyName"
            }
          />
        ))}
      <TelInput />
      <CountryInput value={formData.country} onChange={handleCountryChange} />
      <div>
        <label>Additional Details</label>
        <textarea
          type="text"
          placeholder="Provide more details(optional)"
          value={formData.additionalDetails}
          onChange={handleChange}
          name="additionalDetails"
          rows={3}
          maxLength={1000}
          className="inputbox mt-1 px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:border-indigo-500 block w-full shadow-sm bg-transparent"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] max-w-max px-4 py-2 text-white rounded-lg min-w-40"
      >
        {isLoading ? (
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="#524C42"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="flex items-center justify-center"
          />
        ) : (
          "Submit Details"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
