import React, { useState, useEffect } from "react";
import AppLayout from "../../shared/AppLayout";
import {
  Table,
  Typography,
  Button,
  Popconfirm,
  Space,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  apiGetList,
  apiDeleteOrder,
  apiSearchOrder,
} from "../services/order.services";
import OrdersModel from "../components/orders/OrdersModel";

const { RangePicker } = DatePicker;
const { Title } = Typography;

function Orders() {
  const [orderId, setOrderId] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const [isOpenIUModal, setIsOpenIUModal] = useState(false);

  const [dateRange, setDateRange] = useState([null, null]);

  const columns = [
    { title: "STT", dataIndex: "rowNumber", key: "rowNumber", width: "50" },
    { title: "Tên người đặt ", dataIndex: "fullName", key: "fullName" },

    {
      title: "Ngày đặt hàng ",
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
      title: "Trạng thái",
      dataIndex: ["orderStatus", 0, "status_name"],
      key: "status_name",
    },
    {
      title: "Thanh toán",
      dataIndex: ["payments", 0, "paymentMethod"],
      key: "paymentMethod",
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
              setOrderId(record.orderID);
            }}
          >
            Xem
          </Button>
          <Popconfirm
            title="Chắc chắn xóa?"
            onConfirm={() => handleDelete(record.orderID)}
          >
            <Button>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchDataSearch = async () => {
    const [dateFrom, dateTo] = dateRange;

    let results;
    if (dateFrom && dateTo) {
      results = await apiSearchOrder({
        page: tableParams.pagination?.current,
        pageSize: tableParams.pagination?.pageSize,
        dFrom: dateFrom.toISOString(),
        dTo: dateTo.toISOString(),
      });
    } else {
      // Nếu không có khoảng ngày, truyền null hoặc không truyền dFrom và dTo
      results = await apiSearchOrder({
        page: tableParams.pagination?.current,
        pageSize: tableParams.pagination?.pageSize,
        // dFrom: null,
        // dTo: null,
      });
    }
    setData(
      results.data.map((item, index) => ({
        ...item,
        key: item.orderID || index,
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    // fetchData();
    fetchDataSearch();
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

  const handleDelete = async (id) => {
    try {
      await apiDeleteOrder(id);
      fetchDataSearch();
      openNotificationWithIcon("success", "Xóa đơn hàng thành công!");
    } catch (error) {
      openNotificationWithIcon("error", "Xóa đơn hàng thất bại!");
    }
  };

  const handleCancelIUModal = () => {
    setIsOpenIUModal(false);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <>
      <AppLayout>
        <section className="order-admin">
          <div className="orderBox-header">
            <Typography.Title level={4}>Quản Lý Đơn Hàng</Typography.Title>
          </div>
          <Row style={{ marginBottom: 16 }}>
            <Col>
              <RangePicker onChange={handleDateRangeChange} />
            </Col>
            <Col>
              <Button type="primary" onClick={fetchDataSearch}>
                Tìm kiếm
              </Button>

              <Button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  // Xóa khoảng ngày và tải lại toàn bộ dữ liệu
                  setDateRange([null, null]);
                  fetchDataSearch();
                }}
              >
                Hiển thị lại toàn bộ
              </Button>
            </Col>
          </Row>

          <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
          <OrdersModel
            isOpenIUModal={isOpenIUModal}
            fetchData={fetchDataSearch}
            orderId={orderId}
            handleCancelIUModal={handleCancelIUModal}
          />
        </section>
      </AppLayout>
    </>
  );
}

export default Orders;
