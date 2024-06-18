import React, { useState, useEffect } from "react";
import MainLayout from "./MainLayout";
import { apiGetInfo } from "../../services/user.services";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DefaultImg from "/assets/images/avatar/default.jpg";
import "../layouts/profile.css";
import { Link, useLocation } from "react-router-dom";
import { userState } from "../../store/recoil";
import { useRecoilValue } from "recoil";

function profile({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const user = useRecoilValue(userState);
  const location = useLocation();
  // để khi click vào url nào thì cái sidebar của url đấy được hiển thị

  const pageTitle = "Trang Cá Nhân";
  const paths = [
    { name: "Trang Chủ", url: "/" },
    { name: "Tài khoản", url: "/profile" },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await apiGetInfo(user.accountID);
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [user]);

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <MainLayout>
        <Breadcrumb page={pageTitle} paths={paths} />

        <section className="profile">
          <div className="sidebar">
            <div className="boxInfo">
              <div className="image">
                {userInfo.avatar == null ? (
                  <img src={DefaultImg} alt="" width="30" height="30" />
                ) : (
                  <img
                    src={`/assets/images/avatar/${userInfo.avatar}`}
                    alt="Avatar"
                  />
                )}
              </div>

              <div className="userInfo">
                <h3>Hi, {userInfo.fullName}</h3>
                <p>{userInfo.email}</p>
              </div>
            </div>

            <div className="boxPath">
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/password"
                    className={
                      location.pathname === "/profile/password" ? "active" : ""
                    }
                  >
                    Thay đổi mật khẩu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/view-order"
                    className={
                      location.pathname === "/profile/view-order"
                        ? "active"
                        : ""
                    }
                  >
                    Đơn hàng
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="content">{children}</div>
        </section>
      </MainLayout>
    </>
  );
}

export default profile;
