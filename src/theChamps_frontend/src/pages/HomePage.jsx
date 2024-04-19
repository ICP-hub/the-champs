import React from "react";
import HomepageContainerMain from "../components/home/HomePageContainerMain";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <Header />
      <motion.div
        className="mt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HomepageContainerMain />;
      </motion.div>
      <Footer />
    </>
  );
};

export default HomePage;
