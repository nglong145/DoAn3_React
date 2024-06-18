import React, { useEffect, useState } from "react";
import "../../../styles/home/categories.css";
import { apiGetCategory } from "../../../services/category.services";
import { Link } from "react-router-dom";

const Categories = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function loadData() {
      const categories = await apiGetCategory();
      setdata(categories);
    }
    loadData();
  }, []);

  return (
    <>
      <section className="categories">
        <div className="container">
          <div className="categories-title">
            <h1> Danh Mục Bán Chạy</h1>
          </div>

          <div className="categories-table">
            {data.map((item, index) => (
              <div className="category-item" key={index}>
                <Link to={`/shop/category/${item.categoryID}`}>
                  <img
                    src={`/assets/images/categories/${item.category_image}`}
                    alt={item.category_name}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
