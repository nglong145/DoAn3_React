import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Popconfirm,
  notification,
  DatePicker,
  Image,
  Select,
} from "antd";
import moment from "moment";
import {
  apiGetDetailOrder,
  apiUpdateOrder,
} from "../../services/order.services";
import "../../styles/import.css";

const { RangePicker } = DatePicker;
function OrdersModel({
  isOpenIUModal,
  handleCancelIUModal,
  fetchData,
  orderId,
}) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };

  useEffect(() => {
    if (orderId) {
      apiGetDetailOrder(orderId).then((data) => {
        const status_name = data.orderStatus[0].status_name;
        const description = data.orderStatus[0].description;
        const status = data.payments[0].status;

        form.setFieldsValue({
          ...data,
          created_date: data.created_date ? moment(data.created_date) : null,
          status_name,
          description,
          status,
        });
        setItems(data.list_json_orderitems || []);
        setProducts(data.products);
      });
    } else {
      form.resetFields();
      setItems([]);
    }
  }, [orderId]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        orderID: orderId,
        orderStatus: [{ status_name: values.status_name }],
        payments: [{ status: values.status }],
      };
      await apiUpdateOrder(data);
      openNotificationWithIcon(
        "success",
        "Cập nhật trạng thái đơn hàng thành công!"
      );
      handleCancelIUModal();
      fetchData();
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Cập nhật trạng thái đơn hàng thất bại"
      );
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productID",
      key: "productName",
      render: (productID) => {
        const item = products.find((item) => item.productID === productID);
        return item ? <p>{item.product_name} </p> : null;
      },
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "productID",
      key: "productImages",
      render: (productID) => {
        const item = products.find((item) => item.productID === productID);
        return <img src={`/assets/images/products/${item.images}`} readOnly />;
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} đ</span>,
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        className="orderModal"
        title={"Cập nhật đơn hàng "}
        visible={isOpenIUModal}
        onCancel={handleCancelIUModal}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="orderID" rules={[{ required: true }]}>
            <Input value={form.orderID} disabled />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Tên người đặt hàng"
            rules={[{ required: true }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="delivery_address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input value={form.delivery_address} readOnly />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input value={form.phone} readOnly />
          </Form.Item>

          <Form.Item name="status_name" label="Trạng thái">
            <Select>
              <Select.Option value="Đặt hàng">Đặt hàng</Select.Option>
              <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
              <Select.Option value="Hủy ">Hủy </Select.Option>
              <Select.Option value="Đang giao hàng ">
                Đang giao hàng
              </Select.Option>
              <Select.Option value="Giao hàng thành công ">
                Giao hàng thành công
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="thanh toán">
            <Select>
              <Select.Option value="Chưa thanh toán">
                Chưa thanh toán
              </Select.Option>
              <Select.Option value=" Thanh toán thành công">
                Thanh toán thành công
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="created_date"
            label="Ngày nhập"
            rules={[{ required: true }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>

          <Form.Item name="description" label="Ghi chú đơn hàng">
            <Input readOnly />
          </Form.Item>

          <Form.Item
            name="total_amount"
            label="Tổng số tiền"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} readOnly />
          </Form.Item>
          <Form.Item label="Chi tiết đơn hàng">
            <Table
              className="orderTable"
              columns={columns}
              dataSource={items}
              pagination={false}
              rowKey="key"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default OrdersModel;
