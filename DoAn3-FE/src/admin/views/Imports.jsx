import React, { useState, useEffect } from "react";
import AppLayout from "../../shared/AppLayout";
import { Table, Typography, Button, Popconfirm, Space } from "antd";
import { apiGetList } from "../services/import.services";
import ImportModel from "../components/imports/ImportModel";

const { Title } = Typography;
function Imports() {
  const [importId, setImportId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isOpenIUModal, setIsOpenIUModal] = useState(false);

  const columns = [
    { title: "STT", dataIndex: "rowNumber", key: "rowNumber", width: "50" },
    { title: "Tên nhà cung cấp", dataIndex: "suplierName", key: "suplierName" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Ngày Nhập ",
      dataIndex: "created_date",
      key: "date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Tổng số tiền",
      dataIndex: "total_amount",
      key: "total",
      render: (total) => <span>{total.toLocaleString()} đ</span>,
    },
    {
      title: "Thao tác",
      render: (record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setIsOpenIUModal(true);
              setImportId(record.import_orderID);
            }}
          >
            Xem
          </Button>
          <Popconfirm
            title="Chắc chắn xóa?"
            onConfirm={() => handleDelete(record.import_orderID)}
          >
            <Button>Xóa</Button>
          </Popconfirm>
        </Space>
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
        key: item.import_orderID || index,
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

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

  // const handleDelete = async (importId) => {
  //   try {
  //     await apiDelete(importId);
  //     fetchData();
  //   } catch (error) {
  //     console.error("Failed to delete import:", error);
  //   }
  // };

  const handleCancelIUModal = () => {
    setIsOpenIUModal(false);
  };
  return (
    <AppLayout>
      <section className="import-admin">
        <div className="importBox-header">
          <Title level={4}>Quản Lý Đơn Hàng Nhập</Title>
          <Button
            type="primary"
            onClick={() => {
              setIsOpenIUModal(true);
              setImportId("");
            }}
          >
            Thêm mới
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
        <ImportModel
          isOpenIUModal={isOpenIUModal}
          fetchData={fetchData}
          importId={importId}
          handleCancelIUModal={handleCancelIUModal}
        />
      </section>
    </AppLayout>
  );
}

export default Imports;
