import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetShopByCategory } from "../../../services/product.services";
import ReactPaginate from "react-paginate";
import { FaCartPlus } from "react-icons/fa";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../../../store/recoil";
import { cartState } from "../../../store/recoil";

import { AddToCart_dedault } from "../../../utils/cart";

function shopProduct_category() {
  const { id } = useParams();

  const account = useRecoilValue(userState);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const [cart, setCart] = useRecoilState(cartState);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleAddToCart = async (productid) => {
    const dataCart = {
      accountID: account.accountID,
      productID: productid,
      quantity: 1,
      size: "42",
    };
    AddToCart_dedault(dataCart, cart, setCart);
  };

  useEffect(() => {
    async function loadData(id) {
      let items = await apiGetShopByCategory({
        page: page,
        pageSize: pageSize,
        cate: id,
      });
      setData(items.data);
      setPageCount(Math.ceil(items.totalItems / pageSize));
    }
    loadData(id);
  }, [page, id]);
  return (
    <>
      <section className="shopProduct-section">
        <div className="container">
          <div className="list-product">
            {data.map((item, index) => (
              <div className="product-item" key={index}>
                <div className="productItem-image">
                  <img
                    src={`/assets/images/products/${item.images}`}
                    width="100%"
                    height="180px"
                    alt=""
                  />
                </div>

                <div className="productItem-title">
                  <div className="product-info">
                    <Link to={"/product/" + item.productID}>
                      {item.product_name}
                    </Link>
                  </div>

                  <div className="priceCart">
                    <span> {item.price.toLocaleString()}₫</span>
                    <FaCartPlus
                      size={24}
                      className="cartButton"
                      onClick={() => handleAddToCart(item.productID)}
                    />
                  </div>
                </div>
              </div>
            ))}
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
      </section>
    </>
  );
}

export default shopProduct_category;
