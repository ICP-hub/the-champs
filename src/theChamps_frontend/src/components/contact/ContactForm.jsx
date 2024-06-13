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
  const [phone, setPhone] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email =
        "Invalid email format. Please enter a valid email address.";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name can only contain letters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name can only contain letters.";
    }

    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Invalid phone number format. Please enter digits only.";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      formData.phoneNumber = phone.getNumber();
      sendUserContact(formData, setFormSubmited);
    }
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
        <div>
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            required
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>
        <div>
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            required
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
      </div>
      {["email"].map((key) => (
        <div key={key}>
          <Input
            label={key.replace(/([A-Z])/g, " $1").trim()}
            type={key === "email" ? "email" : "text"}
            placeholder={`Enter your ${key.toLowerCase()}`}
            value={formData[key]}
            onChange={handleChange}
            name={key}
            required={key === "email"}
          />
          {errors[key] && (
            <span className="text-red-500 text-sm">{errors[key]}</span>
          )}
        </div>
      ))}
      <TelInput setPhone={setPhone} required />
      <CountryInput value={formData.country} onChange={handleCountryChange} />
      {errors.country && (
        <span className="text-red-500 text-sm">{errors.country}</span>
      )}
      <div>
        <label>Additional Details</label>
        <textarea
          type="text"
          placeholder="Provide more details "
          value={formData.additionalDetails}
          onChange={handleChange}
          name="additionalDetails"
          rows={3}
          required
          maxLength={1000}
          className="inputbox mt-1 px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:border-indigo-500 block w-full shadow-sm bg-transparent"
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
