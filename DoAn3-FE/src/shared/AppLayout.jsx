import React from "react";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import "../admin/styles/App.css";
import { Space } from "antd";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <Space className="MainSection">
        <Sidebar />
        {children}
      </Space>
    </>
  );
}

export default AppLayout;
