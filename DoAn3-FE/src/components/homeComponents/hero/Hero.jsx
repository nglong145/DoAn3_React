import React from "react";
import "../hero/Hero.css";
import slider1 from "../../../../public/assets/images/sliders/banner2.webp";
import slider2 from "../../../../public/assets/images/sliders/banner3.webp";
import slider3 from "../../../../public/assets/images/sliders/banner4.webp";
import slider4 from "../../../../public/assets/images/sliders/banner5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="banner-slider-container">
            <Slider {...settings}>
              <div>
                <img src={slider1} width="100%" height="370px" alt="" />
              </div>
              <div>
                <img src={slider2} width="100%" height="370px" alt="" />
              </div>
              <div>
                <img src={slider3} width="100%" height="370px" alt="" />
              </div>
              <div>
                <img src={slider4} width="100%" height="370px" alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
