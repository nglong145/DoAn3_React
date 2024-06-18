import React, { useState, useEffect } from "react";
import "../../styles/detail.css";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { apiGetDetail, apiGetSize } from "../../services/product.services";
import {
  apiGetReview,
  apiCreateReview,
  apiUploadFile,
} from "../../services/review.services";

import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartState } from "../../store/recoil";
import { userState } from "../../store/recoil";
import ReactPaginate from "react-paginate";

import { AddToCart_dedault } from "../../utils/cart";
function Detail() {
  const { proid } = useParams();
  const [data, setData] = useState({});
  const [img, setImg] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [cart, setCart] = useRecoilState(cartState);
  const account = useRecoilValue(userState);
  // const { accountID, avatar } = account;

  const [reviews, setReviews] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const [slideIndex, setSlideIndex] = useState(1);
  const [tab, setTab] = useState(1);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    async function loadDetail(id) {
      let result = await apiGetDetail(proid);
      let sizeList = await apiGetSize(proid);

      const cate = { name: result.categories[0].category_name };
      const bra = { name: result.brands[0].brand_name };

      setBrand(bra);
      setCategory(cate);

      setSizes(sizeList);
      setData(result);
    }
    loadDetail(proid);
  }, [proid]);

  //xử lý dữ liệu phần đánh giá
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function loadData(proid) {
      let items = await apiGetReview({
        page: page,
        pageSize: pageSize,
        proid: proid,
      });
      setReviews(items.data);
      setPageCount(Math.ceil(items.totalItems / pageSize));
    }
    loadData(proid);
  }, [page, proid]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImagePath = "";
      if (file) {
        const uploadResponse = await apiUploadFile(file);
        uploadedImagePath = uploadResponse.filePath;
      }

      const dataReview = {
        productID: proid,
        customerID: account.accountID,
        rating: rating,
        review_text: reviewText,
        review_image: uploadedImagePath,
      };

      await apiCreateReview(dataReview);

      console.log("thanhcong");

      // hàm này sẽ gọi api get review sau khi thêm, Sau đó setState lại cho reviews để component re-render lại
      const items = await apiGetReview({
        page: page,
        pageSize: pageSize,
        proid: proid,
      });
      setReviews(items.data);
      setPageCount(Math.ceil(items.totalItems / pageSize));
    } catch (error) {
      console.log("that bai");
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  // Định dạng ngày và giờ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleTypeInput = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (value > 1 && value !== "") return;
    else console.log("gia tri khong phu hop");
  };

  // xử lý phần thêm giỏ hàng
  const handleAddToCart = async (productid) => {
    const dataCart = {
      accountID: account.accountID,
      productID: productid,
      quantity: quantity,
      size: selectedSize,
    };
    AddToCart_dedault(dataCart, cart, setCart);
  };

  return (
    <>
      <section className="detail">
        <div className="containerInfo">
          <div className="product-gallery">
            <div className="images">
              <img src={`/assets/images/products/${data.images}`} alt="" />
            </div>
          </div>

          <div className="product-detail">
            <div className="navLinkDetail">
              <Link to={`/shop/category/${data.categoryID}`}>
                {category.name}
              </Link>
              <span>-</span>
              <Link to={`/shop/category/${data.categoryID}`}>{brand.name}</Link>
            </div>
            <strong className="productName  ">{data.product_name}</strong>
            <p>Kích thước</p>
            <div className="listSizes">
              {sizes.map((item, index) => (
                <div
                  key={index}
                  className={`size-option ${
                    selectedSize === item.size ? "optSelected" : ""
                  }`}
                  onClick={() => handleSizeClick(item.size)}
                >
                  {item.size}
                </div>
              ))}
            </div>
            <div className="quantityBox">
              <input
                className="quantityInput"
                type="number"
                name=""
                id=""
                value={quantity}
                onChange={handleTypeInput}
              />
              <button className="buttonMinus" onClick={handleDecrease}>
                -
              </button>
              <button className="buttonPlus" onClick={handleIncrease}>
                +
              </button>
            </div>
            <div className="product-button">
              <button
                className="button-addToCart"
                onClick={() => handleAddToCart(data.productID)}
                style={{ backgroundColor: "rgb(25, 135, 84)" }}
              >
                Thêm vào giỏ hàng
              </button>
              {/* <button className="button-buyNow">Mua Ngay</button> */}
            </div>
          </div>
        </div>

        <div className="containerDescription">
          <ul className="product-info-menu">
            <li
              onClick={() => setTab(1)}
              className={`p-info-list ${tab === 1 ? "active" : ""}`}
            >
              Mô Tả
            </li>

            <li
              onClick={() => setTab(2)}
              className={`p-info-list ${tab === 2 ? "active" : ""}`}
            >
              Bình Luận
            </li>
          </ul>

          <div className={`info-content ${tab === 1 ? "active" : ""}`}>
            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
            {/* dangerouslySetInnerHTML: là thuộc tính của React dùng để chèn HTML
            thô
            {{ __html: data.description }}Đối tượng JavaScript với thuộc tính __html chứa chuỗi HTML muốn chèn */}
          </div>

          <div className={`info-content ${tab === 2 ? "active" : ""}`}>
            <div className="reviewBox">
              <div className="reviewPart">
                <div className="reviewPart-list">
                  {reviews.length === 0 ? (
                    <div className="messageReview">
                      <p>Không có bình luận</p>
                    </div>
                  ) : (
                    reviews.map((item, index) => (
                      <div className="itemReview" key={index}>
                        <div className="infoReview">
                          <div className="image">
                            <img
                              src={`/assets/images/avatar/${item.users[0].avatar}`}
                              alt=""
                            />
                          </div>
                          <div className="info">
                            <p>{item.users[0].fullName}</p>
                            <p>
                              {[...Array(item.rating)].map((_, index) => (
                                <FaStar key={index} color="yellow" />
                              ))}
                            </p>
                            <p>{formatDate(item.created_date)}</p>
                          </div>
                        </div>

                        <div className="contentReview">
                          <div className="image">
                            <img
                              src={`/assets/images/reviews/${item.review_image}`}
                              alt=""
                            />
                          </div>
                          <div className="text">
                            <p>{item.review_text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    activeLinkClassName="active-page"
                  />
                </div>
              </div>

              <div className="commentPart">
                {account ? (
                  <>
                    <div className="user">
                      <div className="image">
                        <img
                          src={`/assets/images/avatar/${account.avatar}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="formReview">
                      <form onSubmit={handleSubmit}>
                        <select value={rating} onChange={handleRatingChange}>
                          <option value="">Chọn đánh giá</option>
                          <option value="1">1 - Tệ</option>
                          <option value="2">2 - Không hài lòng</option>
                          <option value="3">3 - Bình thường </option>
                          <option value="4">4 - Hài lòng</option>
                          <option value="5">5 - Tuyệt vời</option>
                        </select>
                        <input type="file" onChange={handleFileChange} />
                        <textarea
                          rows="10"
                          value={reviewText}
                          onChange={handleReviewTextChange}
                          placeholder="Viết đánh giá của bạn..."
                        ></textarea>
                        <button type="submit">Gửi</button>
                      </form>
                    </div>
                  </>
                ) : (
                  <p>ban chua dang nhap</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
