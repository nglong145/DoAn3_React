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
} from "antd";
import moment from "moment";
import { apiGetDetail, apiCreate } from "../../services/import.services";

import "../../styles/import.css";
import TextArea from "antd/es/input/TextArea";

function ImportModel({
  isOpenIUModal,
  handleCancelIUModal,
  fetchData,
  importId,
}) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [items, setItems] = useState([]);

  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };

  useEffect(() => {
    if (importId) {
      apiGetDetail(importId).then((data) => {
        form.setFieldsValue({
          ...data,
          created_date: moment(data.created_date),
        });
        setItems(data.list_json_importitems || []);
      });
    } else {
      form.resetFields();
      setItems([]);
    }
  }, [importId]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data = { ...values, list_json_importitems: items };
      await apiCreate(data);
      handleCancelIUModal();
      fetchData();
      openNotificationWithIcon("success", "Thêm đơn hàng nhập thành công!");
    } catch (error) {
      openNotificationWithIcon("error", "Lỗi!");
    }
  };

  //xử lý sự kiện cập nhật tổng tiền khi thay đổi giá tiền
  useEffect(() => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    form.setFieldsValue({ total_amount: totalAmount });
  }, [items, form]);

  const handleAddItem = () => {
    setItems([
      ...items,
      { key: items.length, productName: "", quantity: 0, price: 0, size: "" },
    ]);
  };

  const handleRemoveItem = (key) => {
    setItems(items.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "productName",
      render: (text, index) => (
        <TextArea
          value={text}
          onChange={(e) =>
            handleItemChange(index, "product_name", e.target.value)
          }
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleItemChange(index, "quantity", value)}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, index) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleItemChange(index, "price", value)}
        />
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text, index) => (
        <Input
          value={text}
          onChange={(e) => handleItemChange(index, "size", e.target.value)}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleRemoveItem(record.key)}
        >
          <Button type="link">Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  return (
    <Modal
      className="importModal"
      title={importId ? "Sửa đơn hàng nhập" : "Thêm mới đơn hàng nhập"}
      visible={isOpenIUModal}
      onCancel={handleCancelIUModal}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="suplierName"
          label="Tên nhà cung cấp"
          rules={[{ required: true }]}
        >
          <Input value={form.suplierName} />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="created_date"
          label="Ngày nhập"
          rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="total_amount"
          label="Tổng số tiền"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Chi tiết sản phẩm">
          <Button
            type="dashed"
            onClick={handleAddItem}
            style={{ width: "100%", marginBottom: 16 }}
          >
            Thêm sản phẩm
          </Button>
          <Table
            className="importTable"
            columns={columns}
            dataSource={items}
            pagination={false}
            rowKey="key"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ImportModel;
