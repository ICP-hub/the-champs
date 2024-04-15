import React from "react";

import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Component Footer.
/* ----------------------------------------------------------------------------------------------------- */
const Footer = () => {
  return (
    <div className=" pt-[50px] md:pt-[100px]">
      <div className="tracking-wider py-6 border-t border-slate-200 ">
        <div className="  px-6 lg:px-24">
          <div className="container mx-auto max-md:p-2 flex  max-md:flex-col py-4 ">
            <div className="flex mt-auto flex-col gap-2 w-2/3">
              <h1 className="text-3xl font-bold font-orbitron  text-transparent mb-8 bg-gradient-to-r from-[#FC001E] to-[#FF7D57] bg-clip-text">
                Champs
              </h1>
              <p className="sm:w-1/2 text-sm text-gray-500">
                Join our Discord channel or follow us on Twitter to keep up to
                date with our latest work and announcements.
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
                  <p>About </p>
                  <p>Collection</p>
                  <p>Roadmap</p>
                  <p>FAQs</p>
                </span>
              </div>
              <div className="flex flex-col gap-4 max-md:gap-2">
                <p className="font-semibold text-lg">Community</p>
                <span className="text-gray-500 text-md flex flex-col items-start gap-1">
                  <p>How does it works!</p>
                  <p>Blockchain</p>
                  <p>Get in touch</p>
                </span>
              </div>
            </div>
          </div>

          <div className="container mx-auto text-gray-500 py-4 max-md:px-2 text-sm mb-6 ">
            <div className="flex justify-between max-md:flex-col">
              <p>
                Copyright &copy; {new Date().getFullYear()} Champs All rights
                reserved
              </p>
              <span className="flex gap-4">
                <p>Privacy Policy</p>
                <p>Terms and Service</p>
                <MdOutlineKeyboardArrowUp size={24} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
