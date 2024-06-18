import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import CartTable from "../../components/cartComponents/cartTable.jsx";

const Cart = () => {
  const pageTitle = "giỏ hàng";
  const paths = [
    { name: "Trang Chủ", url: "/" },
    { name: "Cửa Hàng", url: "/shop" },
    { name: "Giỏ Hàng", url: "/cart" },
  ];
  return (
    <>
      <MainLayout>
        <Breadcrumb page={pageTitle} paths={paths} />
        <CartTable />
      </MainLayout>
    </>
  );
};

export default Cart;
