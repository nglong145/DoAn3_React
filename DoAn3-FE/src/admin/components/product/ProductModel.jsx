import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Upload,
  Select,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  apiGetDetailProduct,
  apiGetCategory,
  apiGetBrand,
  apiGetSize,
  apiUpdateProduct,
} from "../../services/product.services";

function ProductModel({
  isOpenIUModal,
  handleCancelIUModal,
  productId,
  fetchData,
}) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({ message, description });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const dataPost = { ...values, sizes };

      await apiUpdateProduct(dataPost);
      openNotificationWithIcon(
        "success",
        "Thông báo",
        "Cập nhật sản phẩm thành công!"
      );

      handleCancelIUModal();
      fetchData();
    } catch (error) {
      openNotificationWithIcon(
        "warning",
        "Thông báo",
        "Thông tin sản phẩm chưa đầy đủ!"
      );
    }
  };

  //xử lý sự kiện đóng modal
  const handleCancel = () => {
    handleCancelIUModal();
  };

  //xử lý sự kiện upload ảnh
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const uploadProps = {
    name: "file",
    action: "https://localhost:44312/api/Product/upload",
    headers: { authorization: `Bearer ${admin.token}` },
    onChange(info) {
      if (info.file.status === "done") {
        form.setFieldValue("images", info.fileList[0].response.filePath);
      }
    },
  };

  const fetchProductData = async (productId) => {
    try {
      const data = await apiGetDetailProduct(productId);
      form.setFieldsValue(data);
      setSizes(data.sizes || []);

      setUploadedImages(data.productImages);
      // form.setFieldsValue(data.productImages);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  // xử lý gọi api lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const data = await apiGetCategory();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // xử lý gọi api lấy danh sách thương hiệu
  const fetchBrands = async () => {
    try {
      const data = await apiGetBrand();
      setBrands(data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  // xử lý gọi api lấy danh sách size
  const fetchSizes = async (id) => {
    try {
      const data = await apiGetSize(id);
      setSizes(data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  useEffect(() => {
    form.resetFields();
    if (productId) {
      fetchProductData(productId);
      fetchSizes(productId);
    }
    fetchCategories();
    fetchBrands();
  }, [productId]);

  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        title="Thông tin sản phẩm"
        visible={isOpenIUModal}
        cancelText="Hủy bỏ"
        okText="Lưu lại"
        width="60vw"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu lại
          </Button>,
        ]}
      >
        <Form
          // {...formItemLayout}
          form={form}
          style={{ maxWidth: "100%" }}
          scrollToFirstError
        >
          <Form.Item name="productID" label="Mã sản phẩm">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="product_name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Tên sản phẩm không được để trống!",
                whitespace: true,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="categoryID"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option
                  key={category.categoryID}
                  value={category.categoryID}
                >
                  {category.category_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brandID"
            label="Thương hiệu"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select>
              {brands.map((brand) => (
                <Select.Option key={brand.brandID} value={brand.brandID}>
                  {brand.brand_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Giá không được để trống!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu!" }]}
          >
            <Select>
              <Select.Option value="noibat">Nổi bật</Select.Option>
              <Select.Option value="banhang">Bán hàng</Select.Option>
              <Select.Option value="nghiban">Nghỉ bán</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm" name="images">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>

        <Table
          dataSource={sizes}
          columns={columns}
          pagination={false}
          rowKey="sizeName"
        />
      </Modal>
    </>
  );
}

export default ProductModel;
