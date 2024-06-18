import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import getBlogs from "../../../services/home/blog.services";
import "../../../styles/home/blog.css";
const blog = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    async function loadData() {
      const data = await getBlogs();
      setBlogList(data);
    }
    loadData();
  }, []);

  return (
    <>
      <section className="blogSection">
        <div className="container">
          <h1>Bài viết nổi bật</h1>
          <div className="slider-container">
            <Slider {...settings}>
              {blogList.map((item) => (
                <div key={item.blogID} className="boxBlog">
                  <a href="">
                    <div className="BoxImage">
                      <img
                        src={`/public/assets/images/blogs/${item.image_blog}`}
                        alt=""
                        width="360"
                        height="250"
                      />
                    </div>
                    <div className="BoxText">
                      <a href="#">{item.title}</a>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default blog;
