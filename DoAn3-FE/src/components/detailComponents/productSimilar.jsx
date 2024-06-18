import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/detail.css";
import { FaCartPlus } from "react-icons/fa";
import Slider from "react-slick";
import { apiGetSimilar } from "../../services/product.services";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../store/recoil";
import { cartState } from "../../store/recoil";
import { AddToCart_dedault } from "../../utils/cart";

function productSimilar() {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const { proid } = useParams();
  const [productSimilar, setProductSimilar] = useState([]);
  const account = useRecoilValue(userState);
  const [cart, setCart] = useRecoilState(cartState);
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
    async function loadProductSimilar(id) {
      let result = await apiGetSimilar(id);
      setProductSimilar(result);
    }
    loadProductSimilar(proid);
  }, [proid]);

  return (
    <>
      <section className="productSimilar">
        <h1>Sản Phẩm Tương Tự</h1>

        <div className="list-productSimilar">
          <Slider {...settings}>
            {productSimilar.map((item, index) => (
              <div key={index} className="productItem">
                <div className="productItem-top">
                  <Link to={"/product/" + item.productID} key={index}>
                    <img
                      src={`/assets/images/products/${item.images}`}
                      alt=""
                    />
                  </Link>
                </div>

                <div className="productItem-bot">
                  <div className="product-info">
                    <p>
                      <Link to={"/product/" + item.productID} key={index}>
                        {item.product_name}
                      </Link>
                    </p>
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
          </Slider>
        </div>
      </section>
    </>
  );
}

export default productSimilar;
