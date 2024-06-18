import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import Detail from "../../components/detailComponents/Detail.jsx";
import ProductSimilar from "../../components/detailComponents/productSimilar.jsx";

function Product() {
  return (
    <MainLayout>
      <Detail />
      <ProductSimilar />
    </MainLayout>
  );
}

export default Product;
