import React from "react";
import "../Footer/Footer.css";
import certify from "../../../public/assets/images/certify.png";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="info">
            <h3>Công ty TNHH MTV Trivela Việt Nam</h3>
            <h3>- Mã số thuế: 0110087123</h3>
            <h3>- Địa chỉ đăng ký kinh doanh:</h3>
            <h3>
              Số 22 ngõ 55 phố Chính Kinh, Quận Thanh Xuân, Thành phố Hà Nội.
            </h3>
          </div>

          <div className="policy">
            <h3>Về chúng tôi</h3>
            <h3>Chính sách bảo mật</h3>
            <h3>Đổi trả và Thanh toán</h3>
            <h3>Chính sách bảo hành</h3>
            <h3>Giải đáp thắc mắc</h3>
          </div>

          <div className="contact">
            <h3>Email: trivela.vn@gmail.com</h3>
            <h3>Liên hệ: 092323212</h3>
          </div>

          <div className="certify">
            <img src={certify} width="250px" alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
