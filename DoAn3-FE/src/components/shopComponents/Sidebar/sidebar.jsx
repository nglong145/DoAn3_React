import React from "react";
import "../../../styles/shop/sidebar.css";

const listPrices = [
  {
    id: 1,
    text: "Dưới 500,000₫",
    isChecked: false,
  },
  {
    id: 2,
    text: "500,000₫ - 1,000,000₫",
    isChecked: false,
  },
  {
    id: 3,
    text: "1,000,000₫ - 1,500,000₫",
    isChecked: false,
  },
  {
    id: 4,
    text: "1,500,000₫ - 2,000,000₫",
    isChecked: false,
  },
];

const listBrands = [
  {
    id: 1,
    text: "Nike",
    isChecked: false,
  },
  {
    id: 2,
    text: "Adidas",
    isChecked: false,
  },
  {
    id: 3,
    text: "Puma",
    isChecked: false,
  },
  {
    id: 4,
    text: "Mizuno",
    isChecked: false,
  },
  {
    id: 5,
    text: "New Balance",
    isChecked: false,
  },
  {
    id: 6,
    text: "Converse",
    isChecked: false,
  },
];

const sidebar = () => {
  return (
    <>
      <section className="sidebar-section">
        <div className="brand-container">
          <div className="title">
            <h1>Thương hiệu</h1>
          </div>
          <div className="listBrand">
            {listBrands.map((item) => (
              <label htmlFor={item.id}>
                <input key={item.id} type="checkbox" id={item.id} />
                {item.text}
              </label>
            ))}
          </div>
        </div>

        <hr />

        <div className="price-container">
          <div className="title">
            <h1>Giá</h1>
          </div>
          <div className="listPrice">
            {listPrices.map((item) => (
              <label htmlFor={item.id}>
                <input key={item.id} type="checkbox" id={item.id} />
                {item.text}
              </label>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default sidebar;
