import React, { useState, useEffect } from "react";
import AppLayout from "../../shared/AppLayout";
import { Table, Typography, Button, Flex } from "antd";
import { apiGetList } from "../services/category.services";
import CategoryModel from "../components/category/CategoryModel.jsx";
import CategoryDelete from "../components/category/CategoryDelete.jsx";

function Category() {
  const [cateid, setCateid] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [isOpenIUModal, setIsOpenIUModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "rowNumber",
      key: "rowNumber",
      width: "50",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "category_image",
      key: "category_image",
      render: (image) => (
        <img
          src={`/assets/images/categories/${image}`}
          alt="Category"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thao tác",

      render: (record) => (
        <Flex justify="center">
          <Button
            onClick={() => {
              setIsOpenIUModal(true);
              setCateid(record.categoryID);
            }}
          >
            Sửa
          </Button>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => {
              setIsOpenDeleteModal(true);
              setCateid(record.categoryID);
            }}
          >
            Xóa
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
        key: item.categoryID || index, // đảm bảo mỗi hàng có key duy nhất
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
    fetchData();
  }, [JSON.stringify(tableParams)]);

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

  const handleCancelDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <AppLayout>
        <section className="category_admin">
          <div className="categoryBox-header">
            <Typography.Title level={4}>Quản Lý Danh Mục</Typography.Title>
            <Button
              type="primary"
              onClick={() => {
                setIsOpenIUModal(true);
                setCateid("");
              }}
            >
              Thêm mới
            </Button>
          </div>

          <Table
            dataSource={data}
            columns={columns}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
          <CategoryModel
            isOpenIUModal={isOpenIUModal}
            fetchData={fetchData}
            cateid={cateid}
            handleCancelIUModal={handleCancelIUModal}
          />
          <CategoryDelete
            isOpenDeleteModal={isOpenDeleteModal}
            fetchData={fetchData}
            handleCancelDeleteModal={handleCancelDeleteModal}
            cateid={cateid}
          />
        </section>
      </AppLayout>
    </>
  );
}

export default Category;
