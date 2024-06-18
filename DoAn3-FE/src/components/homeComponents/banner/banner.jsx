import React from "react";
import banner1 from "../../../../public/assets/images/sliders/banner-s1.png";
import banner2 from "../../../../public/assets/images/sliders/banner-s2.png";
import banner3 from "../../../../public/assets/images/sliders/banner-s3.png";
import "../banner/banner.css";

const imgBanner = [
  {
    id: 1,
    img: banner1,
    title: "GIAO HÀNG NHANH",
    content:
      "Giao hàng nhanh trong 1-2 ngày (Miễn Ship khi Chuyển khoản trước)",
  },
  {
    id: 2,
    img: banner2,
    title: "CAM KẾT CHẤT LƯỢNG",
    content: "Hàng chính hãng 100%, fake đền gấp 10",
  },
  {
    id: 3,
    img: banner3,
    title: "HỖ TRỢ MUA HÀNG ",
    content: "Tư vấn tận tình, hỗ trợ đổi hàng",
  },
];

const banner = () => {
  return (
    <>
      <div className="section-banner">
        {imgBanner.map((item, index) => (
          <div className="bannerItem" key={index}>
            <div className="image">
              <img src={item.img} alt="" />
            </div>
            <div className="title">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default banner;
