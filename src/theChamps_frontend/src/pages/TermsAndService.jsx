import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import termsAndServiceData from "../Data/TermAndServiceData";

const TermsAndService = () => {
  return (
    <>
      <Header />
      <div className="mt-12 container mx-auto p-6 md:p-8">
        <h1 className="text-5xl font-bold font-sans mb-16">
          <span className="text-transparent bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
            Terms And Service
          </span>
        </h1>
        <p className="font-semibold mb-4">
          Effective Date: 05/08/2024 This Agreement governs the terms of use for
          the TheChamps website. This website is owned and operated by Global
          Sportainment Network (PT Global Spirit Nusantara) “TheChamps” and is
          intended for use by individuals that are residents of the Republic of
          Indonesia. This website and its contents are designed to comply with
          applicable laws and regulations. TheChamps retains the right to revise
          and change the Terms of Use at any time without notification of the
          User. The User agrees that to gain full and updated information on the
          Terms of Use he/she should periodically review this section. The
          User’s ongoing use of the Site after publication of any possible
          changes to the current Terms indicates the User’s consent with the
          effective changes. The User has no right to interfere in the Site
          security provision or, in any other similar way, to use the Site or
          other system resources, networks and services accessible through or
          connected to the Site in a corrupt manner. The User agrees to use the
          Site entirely within the lawful and intended limits.
        </p>
        {termsAndServiceData.map((section, index) => (
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

export default TermsAndService;
