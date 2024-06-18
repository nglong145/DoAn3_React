import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import MainLayout from "../layouts/MainLayout.jsx";
import { apiLogin } from "../../services/login.services.js";
import { apiGetItem } from "../../services/cart.services.js";
import { userState, cartState } from "../../store/recoil.js";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!username) {
      formIsValid = false;
      errors["username"] = "Tài khoản không được rỗng!";
    } else if (username.length < 3) {
      formIsValid = false;
      errors["username"] = "Độ dài tối thiểu của tài khoản phải là 3!";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Mật khẩu không được rỗng!";
    }

    setErrors(errors);
    return formIsValid;
  };

  const onFinish = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const values = { username, password };
      let data = await apiLogin(values);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);

        const acc = data.accountID;
        let dataCart = await apiGetItem(acc);
        localStorage.setItem("cart", JSON.stringify(dataCart));
        setCart(dataCart);
        navigate("/");
      } else {
        setStatus("Đăng nhập thất bại, vui lòng thử lại.");
      }
    }
  };

  return (
    <>
      <MainLayout>
        <section className="login">
          <div className="container">
            <div className="content">
              <div className="login-part">
                <h1>
                  <span>ĐĂNG NHẬP</span>
                </h1>
                <div>{status}</div>
                <form onSubmit={onFinish}>
                  <label htmlFor="username">Tên đăng nhập *</label>

                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      validateForm("username", e.target.value);
                    }}
                  />

                  <label htmlFor="password">Mật khẩu *</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validateForm("password", e.target.value);
                    }}
                  />

                  <div className="form-bot">
                    <div className="checkbox-remmember">
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Ghi nhớ mật khẩu</label>
                    </div>
                    <a href="">Quên mật khẩu?</a>
                  </div>
                  <button type="submit">ĐĂNG NHẬP</button>
                  <div className="connectButton">
                    <hr />
                    <div>hoặc</div>
                  </div>
                  <div className="linkRegister">
                    <Link to="/register">ĐĂNG KÝ</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Login;
