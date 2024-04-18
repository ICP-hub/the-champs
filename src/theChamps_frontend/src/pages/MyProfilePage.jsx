import React from "react";
import MyProfileContainerMain from "../components/myProfile/MyProfileContainerMain";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MyProfilePage = () => {
  return (
    <>
      <Header />

      <div className="mt-44">
        <MyProfileContainerMain />
      </div>
      <Footer />
    </>
  );
};

export default MyProfilePage;
