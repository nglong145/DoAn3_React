import React, { useEffect, useState } from "react";
import "../../../styles/home/productFeatures.css";
import { FaCartPlus } from "react-icons/fa";
import { apiGetFeatures } from "../../../services/product.services";
import { Link } from "react-router-dom";

import { AddToCart_dedault } from "../../../utils/cart";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartState, userState } from "../../../store/recoil";

const ProductFeatures = () => {
  const account = useRecoilValue(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const [product, SetProduct] = useState([]);

  const handleAddToCart_default = async (productid) => {
    const dataCart = {
      accountID: account.accountID,
      productID: productid,
      quantity: 1,
      size: "42",
    };
    AddToCart_dedault(dataCart, cart, setCart);
  };

  useEffect(() => {
    async function loadData() {
      const data = await apiGetFeatures();
      SetProduct(data);
    }
    loadData();
  }, [product]);
  return (
    <>
      <section className="productFeatures">
        <div className="container">
          <div className="features-title">
            <h1>Sản Phẩm Nổi Bật</h1>
          </div>

          <div className="features-product">
            <div className="product-list">
              {product.map((item, index) => (
                <div className="productItem" key={index}>
                  <div className="productItem-top">
                    <img
                      src={`assets/images/products/${item.images}`}
                      width="100%"
                      height="180px"
                      alt=""
                    />
                  </div>

                  <div className="productItem-bot">
                    <div className="product-info">
                      <Link to={"/product/" + item.productID} key={index}>
                        {item.product_name}
                      </Link>
                    </div>

                    <div className="priceCart">
                      <span> {item.price.toLocaleString()}₫</span>
                      <FaCartPlus
                        size={24}
                        className="cartButton"
                        onClick={() => handleAddToCart_default(item.productID)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductFeatures;
