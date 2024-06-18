import React from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

// rfce

export default MainLayout;
