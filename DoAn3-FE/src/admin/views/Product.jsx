import React, { useState, useEffect } from "react";
import AppLayout from "../../shared/AppLayout";
import { Table, Typography, Button, Flex, Input } from "antd";
import { apiGetList, apiSearchProduct } from "../services/product.services";
import "../styles/product.css";
import ProductModel from "../components/product/ProductModel";

function Product() {
  const [proid, setProid] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [isOpenIUModal, setIsOpenIUModal] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "rowNumber",
      key: "rowNumber",
      width: "50",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "images",
      key: "imageMain",
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={`/assets/images/products/${images}`}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        ) : null,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} đ</span>,
    },
    {
      title: "Thao tác",

      render: (record) => (
        <Flex justify="center">
          <Button
            onClick={() => {
              setIsOpenIUModal(true);
              setProid(record.productID);
            }}
          >
            Sửa
          </Button>
        </Flex>
      ),
    },
  ];

  const fetchData = async () => {
    let results = await apiGetList({
      page: tableParams.pagination?.current,
      pageSize: tableParams.pagination?.pageSize,
    });
    setData(
      results.data.map((item, index) => ({
        ...item,
        key: item.productID || index, // đảm bảo mỗi hàng có key duy nhất
      }))
    );
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: results.totalItems,
      },
    }));
  };

  const fetchDataSearch = async () => {
    let results = await apiSearchProduct({
      page: tableParams.pagination?.current,
      pageSize: tableParams.pagination?.pageSize,
      keyword: searchTerm,
    });
    setData(
      results.data.map((item, index) => ({
        ...item,
        key: item.productID || index,
      }))
    );
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: results.totalItems,
      },
    }));
  };

  useEffect(() => {
    fetchDataSearch();
  }, [JSON.stringify(tableParams), searchTerm]);

  const handleTableChange = (pagination) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setData([]);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCancelIUModal = () => {
    setIsOpenIUModal(false);
  };

  return (
    <>
      <AppLayout>
        <section className="product-admin">
          <div className="productBox-header">
            <Typography.Title level={4}>Quản Lý Sản Phẩm</Typography.Title>
            <Input.Search
              placeholder="Tìm kiếm sản phẩm"
              onSearch={(value) => setSearchTerm(value)}
              style={{ width: 200 }}
            />
          </div>

          <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
          <ProductModel
            isOpenIUModal={isOpenIUModal}
            fetchData={fetchData}
            productId={proid}
            handleCancelIUModal={handleCancelIUModal}
          />
        </section>
      </AppLayout>
    </>
  );
}

export default Product;
