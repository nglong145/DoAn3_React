import React, { useState, useEffect } from "react";
import "../../styles/checkout.css";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, cartState } from "../../store/recoil";
import { apiGetInfo } from "../../services/user.services";
import { apiOrder } from "../../services/order.services";
import { fetchAndSetCart } from "../../utils/cart";

function CheckoutCpn() {
  const location = useLocation();
  const items = location.state?.items || [];
  const user = useRecoilValue(userState);
  const [cart, setCart] = useRecoilState(cartState);

  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = await apiGetInfo(user.accountID);

      setFormValues({
        fullName: userData.fullName || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
      });
    };
    fetchUserInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customerID: user.accountID,
      fullName: formValues.fullName,
      phone: formValues.phoneNumber,
      delivery_address: formValues.address,
      total_amount: items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      list_json_orderitems: items.map((item) => ({
        productID: item.product.productID,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
      orderStatus: [
        {
          description: formValues.note,
        },
      ],
      payments: [
        {
          paymentMethod: paymentMethod,
        },
      ],
    };

    try {
      const response = await apiOrder(order);

      if (response !== "") {
        fetchAndSetCart(user.accountID, setCart);
        alert("Đặt hàng thành công");
      } else {
        alert("Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi đặt hàng", error);
    }
  };
  return (
    <>
      <section className="checkoutSection">
        <div className="container">
          <form onSubmit={handleSubmit} className="formCheckout">
            <div className="infoCheckout-wrapper">
              <div className="infoPayment">
                <h1>Thông tin thanh toán</h1>
                <label htmlFor="name">Họ tên người nhận *</label> <br />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ tên người nhập"
                  value={formValues.fullName}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại người nhập"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
                <label htmlFor="address">Địa chỉ *</label> <br />
                <input
                  type="text"
                  name="address"
                  placeholder="Nhập địa chỉ người nhận"
                  value={formValues.address}
                  onChange={handleChange}
                />
              </div>

              <div className="infoBonus">
                <h1>Thông tin bổ sung</h1>
                <label htmlFor="note">Ghi chú đơn hàng (tùy chọn)</label>
                <br />
                <textarea
                  name="note"
                  rows="5"
                  value={formValues.note}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="infoBill-wrapper">
              <h1>Đơn hàng của bạn</h1>
              <div className="infoBill">
                <table>
                  <thead>
                    <tr>
                      <th>Sản Phẩm</th>
                      <th width="25%" style={{ textAlign: "center" }}>
                        Tạm Tính
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.product.product_name} - {item.size} ×
                          {item.quantity}
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          {(item.price * item.quantity).toLocaleString()} ₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ fontWeight: 700 }}>Tạm Tính</td>
                      <td style={{ fontWeight: 700 }}>
                        {items
                          .reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                          .toLocaleString()}
                        ₫
                      </td>
                    </tr>

                    <tr>
                      <th>Tổng</th>
                      <th>
                        {items
                          .reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                          .toLocaleString()}
                        ₫
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="payment">
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Chuyển khoản ngân hàng"
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="">Chuyển khoản ngân hàng</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Thanh toán khi nhận hàng"
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="">Thanh toán khi nhận hàng</label>
                  </li>
                </ul>
              </div>
              <button type="submit">Đặt hàng</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CheckoutCpn;
