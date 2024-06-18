import React from "react";
import "../styles/AppLayout/Sidebar.css";
import { Menu } from "antd";
import { useNavigate } from "react-router";

function Sidebar() {
  const navigate = useNavigate();
  const handleMenuClick = (item) => {
    if (item.key === "/logout") {
      handleLogout();
    } else {
      navigate(item.key);
    }
  };
  const handleLogout = () => {
    // Thực hiện các bước đăng xuất ở đây, chẳng hạn xoá token hoặc thông tin đăng nhập khỏi localStorage.
    // Sau đó, chuyển hướng về trang đăng nhập.
    // Ví dụ:
    localStorage.removeItem("admin"); // Xoá thông tin đăng nhập của admin khỏi localStorage
    navigate("/admin/login"); // Chuyển hướng về trang đăng nhập
  };
  return (
    <>
      <div className="sidebar">
        <Menu
          onClick={handleMenuClick}
          items={[
            {
              label: "Trang Chủ",
              key: "/admin/dashboard",
            },
            {
              label: "Danh Mục",
              key: "/admin/category",
            },
            {
              label: "Sản Phẩm",
              key: "/admin/product",
            },
            {
              label: "Đơn Hàng Nhập",
              key: "/admin/import",
            },
            {
              label: "Đơn Hàng",
              key: "/admin/order",
            },
            {
              label: "Đăng xuất",
              key: "/logout",
            },
          ]}
        ></Menu>
      </div>
    </>
  );
}

export default Sidebar;
