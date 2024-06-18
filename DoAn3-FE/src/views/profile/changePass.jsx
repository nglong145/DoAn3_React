import React, { useEffect, useState } from "react";
import Profile from "../layouts/profile";
import "../../styles/info.css";
import { apiChangePass } from "../../services/user.services";

function changePass() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormValues({
      password: "",
      confirmPassword: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      console.log("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Prepare data to send to the API
      const data = {
        accountID: user.accountID,
        password: formValues.password,
      };

      await apiChangePass(data);
      // setSuccess("Thông tin đã được cập nhật thành công.");
      console.log("thanh cong");
    } catch (error) {
      // setError(error.message);
      console.log("loi");
    }
  };

  return (
    <Profile>
      <div className="formChangePass">
        <div className="title">
          <h3>Thay đổi mật khẩu</h3>
        </div>
        <hr />
        <div className="boxForm">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="">Mật khẩu mới</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="">Xác nhận mật khẩu mới</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formValues.confirmPassword}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button type="submit">Đổi mật khẩu</button>
          </form>
        </div>
      </div>
    </Profile>
  );
}

export default changePass;
