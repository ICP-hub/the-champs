import React from "react";
import MyProfileContainerMain from "../components/myProfile/MyProfileContainerMain";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";

const MyProfilePage = () => {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MyProfileContainerMain />
      </motion.div>
      <Footer />
    </>
  );
};

export default MyProfilePage;
