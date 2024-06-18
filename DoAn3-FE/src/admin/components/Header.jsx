import React from "react";
import "../styles/AppLayout/Header.css";
import { Badge, Image, Space, Typography } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";

function Header() {
  return (
    <>
      <div className="Header">
        <Image src="/assets/images/logo.png" width={50}></Image>
        <Typography.Title>Trivela Admin</Typography.Title>
        <Space>
          <Badge count={20} dot>
            <MailOutlined style={{ fontSize: 24 }} />
          </Badge>
          <Badge count={20}>
            <BellFilled style={{ fontSize: 24 }} />
          </Badge>
        </Space>
      </div>
    </>
  );
}

export default Header;
