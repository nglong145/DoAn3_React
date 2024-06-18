import React, { useState, useEffect } from "react";
import Profile from "../layouts/profile";
import { apiGetInfo, apiUpdateUser } from "../../services/user.services";
import "../../styles/info.css";
import { apiUser } from "../../constant/api";
import { useRecoilState } from "recoil";
import { userState } from "../../store/recoil";

function info() {
  const [user, setUser] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState({});

  const [formValues, setFormValues] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    file: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const data = await apiGetInfo(user.accountID);
      setUserInfo(data);

      setFormValues({
        fullName: data.fullName || "",
        username: data.username || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        file: null,
      });
    };
    fetchUserInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let avatarFileName = userInfo.avatar;

      if (formValues.file) {
        const formData = new FormData();
        formData.append("file", formValues.file);
        const uploadResponse = await apiUser.post(
          "/api/User/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        avatarFileName = uploadResponse.data.filePath;
      }

      // Prepare data to send to the API
      const data = {
        accountID: userInfo.accountID,
        fullName: formValues.fullName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        avatar: avatarFileName,
      };

      const dataRecoil = {
        ...user,
        name: formValues.fullName,
        avatar: avatarFileName,
      };

      await apiUpdateUser(data);
      // setSuccess("Thông tin đã được cập nhật thành công.");
      localStorage.setItem("user", JSON.stringify(dataRecoil));
      setUser(dataRecoil);
      console.log("thanh cong");
    } catch (error) {
      // setError(error.message);
      console.log("loi");
    }
  };

  return (
    <>
      <Profile>
        <section className="profileInfo">
          <div className="title">
            <h3>Thông tin tài khoản</h3>
          </div>
          <hr />
          <div className="boxDetail">
            <table>
              <tbody>
                <tr>
                  <td>Họ tên</td>
                  <td>{userInfo.fullName}</td>
                </tr>

                <tr>
                  <td>Tài khoản</td>
                  <td>{userInfo.username}</td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{userInfo.email}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>
                  <td>{userInfo.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>{userInfo.address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="title">
            <h3>Thay đổi thông tin</h3>
          </div>
          <hr />
          <div className="boxForm">
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="">Họ tên</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Ảnh đại diện</label>
                    </td>
                    <td>
                      <input type="file" name="file" onChange={handleChange} />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Email</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Số điện thoại</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label htmlFor="">Địa chỉ</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <button type="submit">Cập nhật thông tin</button>
            </form>
          </div>
        </section>
      </Profile>
    </>
  );
}

export default info;
