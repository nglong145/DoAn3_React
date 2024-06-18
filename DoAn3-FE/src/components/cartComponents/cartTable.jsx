import React, { useState, useEffect } from "react";
import "../../styles/cartTable.css";
import { MdDelete } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

import {
  apiGetCart,
  apiUpdateCart,
  apiDeleteCart,
} from "../../services/cart.services";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, userState } from "../../store/recoil";
import { apiGetSize } from "../../services/product.services";
import { useNavigate } from "react-router-dom";
import { fetchAndSetCart } from "../../utils/cart";

const cartTable = () => {
  const account = useRecoilValue(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [productSizes, setProductSizes] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  //lấy dữ liệu giỏ hàng re-render component khi accountID thay đổi
  useEffect(() => {
    async function loadData(accountID) {
      let items = await apiGetCart(account.accountID);
      setData(items);
    }
    if (account.accountID) {
      loadData(account.accountID);
    }
  }, [account.accountID]);

  //lấy dữ liệu danh sách size theo mã sản phẩm re-render component khi dữ liệu giỏ hàng thay đổi
  useEffect(() => {
    async function loadProductSizes(productID) {
      let sizes = await apiGetSize(productID);
      setProductSizes((prevSizes) => ({ ...prevSizes, [productID]: sizes }));
    }
    data.forEach((item) => {
      item.products.forEach((product) => {
        if (!productSizes[product.productID]) {
          loadProductSizes(product.productID);
        }
      });
    });
  }, [data, productSizes]);

  //xử lý thay đổi số lượng
  const handleQuantityChange = (cartIndex, itemIndex, newQuantity) => {
    const newData = [...data];
    newData[cartIndex].cart_items[itemIndex].quantity = newQuantity;
    setData(newData);
  };

  //xử lý thay đổi size
  const handleSizeChange = (cartIndex, itemIndex, newSize) => {
    const newData = [...data];
    newData[cartIndex].cart_items[itemIndex].size = newSize;
    setData(newData);
  };

  //xử lý sự kiện checkbox
  const handleCheckboxChange = (cartIndex, itemIndex) => {
    const newSelectedItems = { ...selectedItems };
    const key = `${cartIndex}-${itemIndex}`;
    if (newSelectedItems[key]) {
      delete newSelectedItems[key];
    } else {
      newSelectedItems[key] = {
        cartIndex,
        itemIndex,
      };
    }
    setSelectedItems(newSelectedItems);
  };

  //xử lý sự kiện giảm số lượng
  const handleDecrease = (cartIndex, itemIndex) => {
    const newData = [...data];
    const currentQuantity = newData[cartIndex].cart_items[itemIndex].quantity;
    if (currentQuantity > 1) {
      newData[cartIndex].cart_items[itemIndex].quantity = currentQuantity - 1;
      setData(newData);
    }
  };

  //xử lý sự kiện tăng số lượng
  const handleIncrease = (cartIndex, itemIndex) => {
    const newData = [...data];
    newData[cartIndex].cart_items[itemIndex].quantity += 1;
    setData(newData);
  };

  //xử lý sự kiện cập nhật giỏ hàng
  const updateCart = async () => {
    if (selectedItems) {
      for (const key in selectedItems) {
        const { cartIndex, itemIndex } = selectedItems[key];
        if (data[cartIndex] && data[cartIndex].cart_items[itemIndex]) {
          const item = data[cartIndex].cart_items[itemIndex];

          const itemsToUpdate = {
            // Sử dụng đối tượng thay vì mảng
            cartID: data[cartIndex].cartID,
            cart_itemID: item.cart_itemID,
            size: item.size,
            quantity: item.quantity,
          };
          try {
            await apiUpdateCart(itemsToUpdate);

            alert("Cart updated successfully");
          } catch (error) {
            console.error("Failed to update cart", error);
            alert("Failed to update cart");
          }
        }
      }
    }
  };

  //xử lý sự kiện xoá chi tiết giỏ hàng
  const handleDelete = async (cartIndex, itemIndex) => {
    const item = data[cartIndex].cart_items[itemIndex];
    try {
      await apiDeleteCart(item.cart_itemID);
      let items = await apiGetCart(account.accountID);
      setData(items);
      //gọi lại hàm cập nhật giỏ hàng
      fetchAndSetCart(account.accountID, setCart);
      alert("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item", error);
      alert("Failed to delete item");
    }
  };

  //xử lý sự kiện chọn sản phẩm => tổng tiền
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      data.forEach((item, cartIndex) => {
        item.cart_items.forEach((cartItem, itemIndex) => {
          if (selectedItems[`${cartIndex}-${itemIndex}`]) {
            total += cartItem.price * cartItem.quantity;
          }
        });
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [data, selectedItems]);

  //xử lý sự kiện chuyển sang trang checkout
  const handleCheckout = () => {
    const itemsToCheckout = Object.values(selectedItems).map(
      ({ cartIndex, itemIndex }) => {
        const item = data[cartIndex].cart_items[itemIndex];
        return {
          ...item,
          product: data[cartIndex].products[itemIndex],
        };
      }
    );
    console.log(itemsToCheckout);
    navigate("/checkout", { state: { items: itemsToCheckout } });
  };

  return (
    <>
      <section className="cart-section">
        <div className="container">
          <div className="cart">
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Chọn</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Size</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, cartIndex) =>
                    item.products.map((product, itemIndex) => (
                      <tr key={`${cartIndex}-${itemIndex}`}>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              !!selectedItems[`${cartIndex}-${itemIndex}`]
                            }
                            onChange={() =>
                              handleCheckboxChange(cartIndex, itemIndex)
                            }
                          />
                        </td>

                        <td>
                          <img
                            src={`/assets/images/products/${item.products[itemIndex]?.images}`}
                            alt={product.product_name}
                          />
                        </td>

                        <td width="500px">
                          {product.product_name}(
                          {item.cart_items[itemIndex].size})
                        </td>

                        <td>
                          <select
                            value={item.cart_items[itemIndex]?.size}
                            onChange={(e) =>
                              handleSizeChange(
                                cartIndex,
                                itemIndex,
                                e.target.value
                              )
                            }
                          >
                            {productSizes[product.productID]?.map(
                              (sizeObject) => (
                                <option
                                  key={sizeObject.sizeID}
                                  value={sizeObject.size}
                                >
                                  {sizeObject.size}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td>
                          {item.cart_items[itemIndex]?.price.toLocaleString()} đ
                        </td>

                        <td>
                          <div className="quantityBox">
                            <input
                              className="quantityInput"
                              type="number"
                              name=""
                              id=""
                              value={item.cart_items[itemIndex]?.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  cartIndex,
                                  itemIndex,
                                  parseInt(e.target.value)
                                )
                              }
                              min="1"
                            />
                            <button
                              className="buttonMinus"
                              onClick={() =>
                                handleDecrease(cartIndex, itemIndex)
                              }
                            >
                              -
                            </button>
                            <button
                              className="buttonPlus"
                              onClick={() =>
                                handleIncrease(cartIndex, itemIndex)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td>
                          {item.cart_items[itemIndex]?.quantity > 0 ? (
                            <>
                              {(
                                item.cart_items[itemIndex]?.price *
                                item.cart_items[itemIndex]?.quantity
                              ).toLocaleString()}
                              đ
                            </>
                          ) : (
                            "0 đ"
                          )}
                        </td>
                        <td>
                          <MdDelete
                            color="blue"
                            onClick={() => handleDelete(cartIndex, itemIndex)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="updateCart">
              <button onClick={updateCart}>Cập Nhật</button>
            </div>
          </div>

          <div className="bill">
            <h1> Tổng đơn hàng</h1>
            <table>
              <tbody>
                <tr>
                  <td>Thành tiền</td>
                  <td>{totalPrice.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <td>Tổng tiền</td>
                  <td>{totalPrice.toLocaleString()} đ</td>
                </tr>
              </tbody>
            </table>
            <button className="btnShop">
              <FaArrowCircleLeft size={16} /> Tiếp tục mua hàng
            </button>
            <button className="btnCheckout" onClick={handleCheckout}>
              <FaCreditCard size={16} />
              Thanh toán
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default cartTable;
