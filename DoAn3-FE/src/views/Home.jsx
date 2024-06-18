import React from "react";
import MainLayout from "../views/layouts/MainLayout.jsx";
import Hero from "../components/homeComponents/hero/Hero.jsx";
import Categories from "../components/homeComponents/categories/Categories.jsx";
import ProFeatures from "../components/homeComponents/ProductFeatures/ProductFeatures.jsx";
import Banner from "../components/homeComponents/banner/banner.jsx";
import Blog from "../components/homeComponents/blog/blog.jsx";
import Brand from "../components/homeComponents/brandFeatures/Brand.jsx";

const App = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <MainLayout>
        <Hero />
        <Banner />
        <Brand />
        <Categories />
        <ProFeatures />
        <Blog />
      </MainLayout>
    </>
  );
};

export default App;
