import React, { useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AboutPageContainerMain from "../components/about/AboutPageContainerMain";
import { State } from "country-state-city";

const About = () => {
  return (
    <>
      <Header />
      <AboutPageContainerMain />
      <Footer />
    </>
  );
};

export default About;
