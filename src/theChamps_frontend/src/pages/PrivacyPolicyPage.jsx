import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import privacyPolicyData from "../Data/PrivacyPageData";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6 md:p-8 mt-12">
        <h1 className="text-5xl font-bold font-sans mb-16    ">
          <span className="  text-transparent bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
            Privacy Policy
          </span>
        </h1>
        <p className="font-semibold mb-4">
          Effective Date: 05/08/2024 This Policy defines the scope of privacy
          and degree of confidentiality protecting the information provided by
          users during registration and normal use of thechampsdigital.com
          (“Site”), TheChamps’ services and programs. This website is owned and
          operated by Global Sportainment Network (PT Global Spirit Nusantara)
          “TheChamps” and is intended for use by individuals that are residents
          of the Republic of Indonesia. This website and its contents are
          designed to comply with applicable laws and regulations. By using the
          Site, user provides his/her consent that TheChamps has the authority
          to collect, use and disclose the user’s personal information according
          to the rules of this Policy. This Privacy Policy contains the rules
          upon which such information is collected and used, and also the
          reasons for disclosure of such information. These rules apply to any
          personal information collected by TheChamps.
        </p>
        {privacyPolicyData.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-medium text-gray-700 mb-2">
              {section.heading}
            </h2>
            <p className="mb-4">{section.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
