import React from "react";

import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import BackToTopButton, { scrollToTop } from "./BackToTop";
import { Link } from "react-router-dom";
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Footer.
/* ----------------------------------------------------------------------------------------------------- */
const Footer = () => {
  return (
    <div className="tracking-wider">
      <div className="container mx-auto flex max-md:flex-col items-center">
        <div className="flex mt-auto flex-col gap-2 w-2/3 p-6 md:p-8">
          <Link
            to={"/"}
            className="text-3xl font-bold font-orbitron  text-transparent mb-8 bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text"
          >
            Champs
          </Link>
          <p className="sm:w-1/2 text-sm text-gray-500">
            {/* Join our Discord channel or follow us on Twitter to keep up to
                date with our latest work and announcements. */}
            Follow us on social media to keep up to date with our latest work
            and announcements.
          </p>

          <div className="flex gap-2 items-center">
            <p className="p-1  ">
              <RiTwitterFill size={20} />
            </p>

            <p className="p-1 ">
              <BsInstagram size={16} />
            </p>
            <p className="p-1  ">
              <FaYoutube size={20} />
            </p>
          </div>
        </div>
        <div className="flex md:gap-16 max-md:flex-col max-md:gap-2 mr-4 ">
          <div className="flex flex-col gap-4 max-md:gap-2">
            <p className="font-semibold text-lg">Quick links</p>
            <span className="text-gray-500 text-md flex flex-col items-start gap-2">
              <Link to="/about" onClick={scrollToTop}>
                About{" "}
              </Link>
              <Link to="/collections" onClick={scrollToTop}>
                Collections
              </Link>

              <Link to="/faq" onClick={scrollToTop}>
                FAQs
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-4 max-md:gap-2">
            <p className="font-semibold text-lg">Community</p>
            <span className="text-gray-500 text-md flex flex-col items-start gap-1">
              <Link to="/contact" onClick={scrollToTop}>
                Get in touch
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex justify-between max-md:flex-col p-6 md:p-8">
          <p>
            Copyright &copy; {new Date().getFullYear()} Champs All rights
            reserved
          </p>
          <span className="flex gap-4">
            <span className="gradient-text">
              <Link to="/privacy-policy" onClick={scrollToTop}>
                Privacy Policy
              </Link>
            </span>
            <span className="gradient-text">
              <Link to="/Terms-and-services" onClick={scrollToTop}>
                Terms and Services
              </Link>
            </span>
            <BackToTopButton />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
