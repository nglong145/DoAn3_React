import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { apiAdminLogin } from "../services/user.services";
import { useRecoilState } from "recoil";
import { adminState } from "../store/adminRecoil";
import "../../admin/styles/login.css";

function login() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useRecoilState(adminState);
  const [error, setError] = useState("");

  const onChangeInput = () => {
    setError("");
  };

  const onFinish = async (values) => {
    let data = await apiAdminLogin(values);
    if (data && data.message) {
      setError(data.message);
    } else {
      localStorage.setItem("admin", JSON.stringify(data));
      setAdmin(data);
      navigate("/admin/dashboard");
    }
  };

  return (
    <section className="adminLogin">
      <div
        className="loginForm-container"
        style={{
          marginTop: "10%",
          border: "1px solid #666699",
          width: "700px",
          padding: "20px",
        }}
      >
        <h1>ĐĂNG NHẬP HỆ THỐNG</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              { required: true, message: "Tài khoản không được rỗng!" },
              { min: 3, message: "Độ dài tối thiểu của tài khoản phải là 3!" },
            ]}
          >
            <Input onChange={() => onChangeInput()} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được rỗng!" },
              { min: 4, message: "Độ dài tối thiểu của mật khẩu phải là 6!" },
              { max: 20, message: "Độ dài tối đa của mật khẩu là 20!" },
            ]}
          >
            <Input.Password onChange={() => onChangeInput()} />
          </Form.Item>

          {error !== "" ? (
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ color: "red" }}
            >
              <label>{error}</label>
            </Form.Item>
          ) : (
            ""
          )}

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Ghi nhớ</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default login;
