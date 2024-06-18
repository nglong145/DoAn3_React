import React from "react";
import "../../../styles/shop/shopProduct.css";
import { FaCartPlus } from "react-icons/fa";
import pro1 from "../../../../public/assets/images/products/product1.jpeg";
import pro2 from "../../../../public/assets/images/products/product1.jpeg";
import pro3 from "../../../../public/assets/images/products/product1.jpeg";
import pro4 from "../../../../public/assets/images/products/product1.jpeg";
import pro5 from "../../../../public/assets/images/products/product1.jpeg";
import pro6 from "../../../../public/assets/images/products/product1.jpeg";

const product = [
  {
    id: 1,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro1,
  },

  {
    id: 2,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro2,
  },

  {
    id: 3,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro3,
  },

  {
    id: 4,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro4,
  },

  {
    id: 5,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro5,
  },

  {
    id: 6,
    name: "Giày Nike Air Force 1 07 Triple White CW2288-111",
    price: "122.000",
    img: pro6,
  },
];

const shopProduct = () => {
  return (
    <>
      <section className="shopProduct-section">
        <div className="container">
          <div className="list-product">
            {product.map((item) => (
              <div className="product-item">
                <div className="productItem-image">
                  <img src={item.img} width="100%" height="180px" alt="" />
                </div>

                <div className="productItem-title">
                  <div className="product-info">
                    <p>{item.name}</p>
                    <p>{item.price} ₫</p>
                  </div>

                  <div className="cart">
                    <FaCartPlus size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <span>
              <a href="">1</a>
            </span>
            <span>
              <a href="">2</a>
            </span>
            <span>
              <a href="">3</a>
            </span>
            <span>
              <a href="">4</a>
            </span>

            <span>
              <a href="">5</a>
            </span>
            <span>
              <a href="">&gt;</a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default shopProduct;
