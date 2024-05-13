import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import privacyPolicyData from "../Data/PrivacyPageData";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="mt-44 px-6 lg:px-24">
        <h1 className="text-5xl font-bold font-sans mb-16    ">
          <span className="  text-transparent bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
            Privacy Policy
          </span>
        </h1>
        {privacyPolicyData.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text mb-2">
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
