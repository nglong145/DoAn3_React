import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../../services/user.services";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!fullName) {
      formIsValid = false;
      errors["fullName"] = "Họ tên không được rỗng!";
    }

    if (!username) {
      formIsValid = false;
      errors["username"] = "Tên đăng nhập không được rỗng!";
    } else if (username.length < 3) {
      formIsValid = false;
      errors["username"] = "Độ dài tối thiểu của tên đăng nhập phải là 3!";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Mật khẩu không được rỗng!";
    } else if (password.length < 6) {
      formIsValid = false;
      errors["password"] = "Mật khẩu phải có ít nhất 6 ký tự!";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email không được rỗng!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Email không hợp lệ!";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const values = { fullName, username, password, email };
      try {
        let data = await apiRegister(values);

        if (data != null) {
          setSuccessMessage("Đăng ký thành công!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/login");
          }, 3000);
        } else {
          setErrors({ apiError: Response.message });
        }
      } catch (error) {
        setErrors({ apiError: error.message });
      }
    }
  };

  return (
    <>
      <MainLayout>
        <div className="register">
          <div className="container">
            <div className="content">
              <div className="register-part">
                <h1>ĐĂNG KÝ</h1>
                {successMessage && (
                  <div className="success">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <label htmlFor="fullName">Họ tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {errors.fullName && (
                    <div className="error">{errors.fullName}</div>
                  )}
                  <label htmlFor="username">Tên đăng nhập</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <div className="error">{errors.username}</div>
                  )}
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                  {errors.apiError && (
                    <div className="error">{errors.apiError}</div>
                  )}
                  <button type="submit">ĐĂNG KÝ</button>
                  <div className="connectButton">
                    <hr />
                    <div>hoặc</div>
                  </div>
                  <div className="linkLogin">
                    <Link to="/login">ĐĂNG NHẬP</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Register;
