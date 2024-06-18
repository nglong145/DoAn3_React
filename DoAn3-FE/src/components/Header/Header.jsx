import React, { useEffect, useState } from "react";
import Logo from "../../../public/assets/images/logo.png";
import DefaultImg from "/assets/images/avatar/default.jpg";
import "../../styles/Header.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../store/recoil";
import { cartState } from "../../store/recoil";

import { apiGetCategory } from "../../services/category.services";

import { apiGetItem } from "../../services/cart.services";

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useNavigate();

  const userValues = useRecoilValue(userState);

  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function loadCategory() {
      const data = await apiGetCategory();
      setCategories(data);
    }
    loadCategory();
  }, []);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    setUser(JSON.parse(userLocal));
  }, [setUser]);

  useEffect(() => {
    const cartLocal = localStorage.getItem("cart");
    if (cartLocal) {
      setCart(JSON.parse(cartLocal));
    }
  }, [user]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("cart");
    setCart(null);
    navigate("/");
  };

  useEffect(() => {
    if (userValues !== null) {
      const sl = cart.length;
      setAmount(sl);
    } else {
      setAmount(0);
    }
  }, [cart]);

  return (
    <div>
      <header>
        <div className="header">
          <div className="header-left">
            <div className="logo">
              <Link to="/">
                <img src={Logo} width="50" height="50" alt="" />
                <p>Trivela</p>
              </Link>
            </div>
          </div>

          <div className="header-middle">
            <ul>
              <li>
                <Link to="/"></Link>
              </li>
              <li style={{ padding: "18px 0" }}>
                <Link to="/">
                  Đồ Thể Thao
                  <FaAngleDown />
                  <ul className="submenu">
                    {categories.map((cate, index) => (
                      <li key={index}>
                        <Link to={`/shop/category/${cate.categoryID}`}>
                          {cate.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>

              <li>
                <Link to="/">Bài Viết</Link>
              </li>
              <li>
                {user ? (
                  <div className="userBox" style={{ padding: "5px 0 15px" }}>
                    <div className="avatar">
                      {userValues.avatar == null ? (
                        <img src={DefaultImg} alt="" width="30" height="30" />
                      ) : (
                        <img
                          src={`/assets/images/avatar/${userValues.avatar}`}
                          alt=""
                          width="30"
                          height="30"
                        />
                      )}
                    </div>
                    <p>{userValues.name}</p>
                    <ul className="subMenu">
                      <li>
                        <Link to="/profile">Tài khoản</Link>
                      </li>
                      <li>
                        <Link style={{ cursor: "pointer" }} onClick={logout}>
                          đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">Tài khoản</Link>
                )}
              </li>
            </ul>
          </div>

          <div className="header-right">
            <div className="header-search">
              <form action="#">
                <input type="text" placeholder="Tìm kiếm" />
                <div className="search-button">
                  <FaSearch className="search-icon" size={18} />
                </div>
              </form>
            </div>
            <div className="header-cart">
              {user ? (
                <Link to="/cart" className="cart">
                  <FaShoppingCart size={24} />
                </Link>
              ) : (
                <Link to="/login" className="cart">
                  <FaShoppingCart size={24} />
                </Link>
              )}
              {/* <Link to="/cart" className="cart">
                <FaShoppingCart size={24} />
              </Link> */}
              <span>{amount}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
