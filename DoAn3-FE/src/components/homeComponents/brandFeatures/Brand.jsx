import React, { useState, useEffect } from "react";
import getBrand from "../../../services/home/brand.services";
import "../../../styles/home/brand.css";

function Brand() {
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    async function loadData() {
      const data = await getBrand();
      setBrandList(data);
    }
    loadData();
  }, []);

  return (
    <>
      <section className="brandFeatures">
        <div className="container">
          <div className="features-title">
            <h1>Thương hiệu nổi bật</h1>
          </div>

          <div className="features-brand">
            <div className="brand-list">
              {brandList.map((item, index) => (
                <div className="brandItem" key={index}>
                  <div className="brandItem-top">
                    <img
                      src={`/public/assets/images/brands/${item.brand_image}`}
                      alt={item.brand_name}
                    />
                  </div>
                  <div className="brandItem-bot">
                    <p>{item.brand_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Brand;
