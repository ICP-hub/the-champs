import React from "react";
import HomepageContainerMain from "../components/home/HomePageContainerMain";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="mt-28">
        <HomepageContainerMain />;
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
