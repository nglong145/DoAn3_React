import React from "react";
import "../shop/shop.css";
import MainLayout from "../layouts/MainLayout.jsx";
import Sidebar from "../../components/shopComponents/Sidebar/sidebar.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import ShopProduct from "../../components/shopComponents/shopProduct/shopProduct.jsx";

const Shop = () => {
  const pageTitle = "cửa hàng";
  const paths = [
    { name: "Trang Chủ", url: "/" },
    { name: "Cửa Hàng", url: "/shop" },
  ];
  return (
    <>
      <MainLayout>
        <div className="title">
          <Breadcrumb page={pageTitle} paths={paths} />
          <div className="box">
            <div className="result">
              <p>Hiển thị 1–48 của 241 kết quả</p>
            </div>
            <div className="searchFilter">
              <select name="" id="">
                <option value="">Mặc định</option>
                <option value="">Thứ tự theo giá: cao xuống thấp</option>
                <option value="">Thứ tự theo giá: thấp đến cao</option>
                <option value="">Sản phẩm bán chạy</option>
              </select>
            </div>
          </div>
        </div>

        <div className="main">
          <Sidebar />
          <ShopProduct />
        </div>
      </MainLayout>
    </>
  );
};

export default Shop;
