import ContactForm from "./ContactForm";
import { Player } from "@lottiefiles/react-lottie-player";
import ContactAnimation from "../../assets/animations/contactus.json";
import FancyHeader from "../common/FancyHeader";
import "./contact.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { motion } from "framer-motion";
import image from "../../assets/images/nft-4.png";
import { scrollToTop } from "../common/BackToTop";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    // console.log("hello");
    scrollToTop();
  }, []);

  return (
    <>
      <Header />
      <motion.div
        className="container mx-auto p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-12 grid lg:grid-cols-2">
          <div>
            <FancyHeader fancy="Talk to our team to get started" />
            <p>
              Please provide us with information about your company and we’ll
              get in touch shortly.
            </p>
            <ContactForm />
          </div>
          <div className="max-lg:order-first">
            <img src={image} alt="about" />
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ContactUs;
