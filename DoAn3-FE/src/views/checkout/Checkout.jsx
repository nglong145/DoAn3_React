import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
import CheckoutCom from "../../components/checkoutComponents/CheckoutCpn.jsx";

function Checkout() {
  const pageTitle = "thanh toán";
  const paths = [
    { name: "Trang Chủ", url: "/" },
    { name: "Cửa Hàng", url: "/shop" },
    { name: "Giỏ Hàng", url: "/cart" },
    { name: "Thanh Toán", url: "/checkout" },
  ];
  return (
    <>
      <MainLayout>
        <Breadcrumb page={pageTitle} paths={paths} />
        <CheckoutCom />
      </MainLayout>
    </>
  );
}

export default Checkout;
