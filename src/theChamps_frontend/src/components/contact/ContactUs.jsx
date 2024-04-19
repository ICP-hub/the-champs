import ContactForm from "./ContactForm";
import { Player } from "@lottiefiles/react-lottie-player";
import ContactAnimation from "../../assets/animations/contactus.json";
import FancyHeader from "../common/FancyHeader";
import "./contact.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { motion } from "framer-motion";
const ContactUs = () => {
  return (
    <>
      <Header />
      <motion.div
        className=" md:px-24 mt-44 max-md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="py-6 contact-wrapper">
          <div className="max-w-[470px]">
            <FancyHeader fancy="Talk to our team to get started" />
            <p>
              Please provide us with information about your company and we’ll
              get in touch shortly.
            </p>
          </div>
          <div className="grid lg:grid-cols-2">
            <ContactForm />
            <Player
              src={ContactAnimation}
              className="player contact-aside min-h-[500px] min-w-[500px] max-lg:order-first"
              loop
              autoplay
            />
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ContactUs;
