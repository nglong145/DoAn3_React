import React, { useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  notification,
  Upload,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import {
  apiGetDetail,
  apiCreate,
  apiUpdate,
} from "../../services/category.services";
import TextArea from "antd/es/input/TextArea";

const formItemLayout = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function CategoryModel(props) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, content) => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const dataPost = {
          ...values,
        };
        if (props.cateid) {
          props.handleCancelIUModal();
          await apiUpdate(dataPost);
          props.fetchData();
          openNotificationWithIcon(
            "success",
            "Cập nhật người dùng thành công!"
          );
        } else {
          props.handleCancelIUModal();
          await apiCreate(dataPost);
          props.fetchData();
          openNotificationWithIcon("success", "Thêm người dùng thành công!");
        }
      })
      .catch(() => {
        openNotificationWithIcon("warning", "Thông tin người dùng chưa đủ!");
      });
  };

  const handleCancel = () => {
    props.handleCancelIUModal();
  };

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const upload_props = {
    name: "file",
    action: "https://localhost:44312/api/Category/upload",
    headers: {
      authorization: "Bearer " + admin.token,
    },
    onChange(info) {
      if (info.file.status === "done") {
        form.setFieldValue(
          "category_image",
          info.fileList[0].response.filePath
        );
      }
    },
  };

  const fetchData = async (cateid) => {
    let data = await apiGetDetail(cateid);
    form.setFieldsValue(data);
  };

  useEffect(() => {
    form.resetFields();
    if (props.cateid !== "") {
      fetchData(props.cateid);
    }
  }, [props.cateid]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Thông tin danh mục"
        visible={props.isOpenIUModal}
        cancelText={"Hủy bỏ"}
        okText={"Lưu lại"}
        width={"60vw"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(child) => {
          return (
            <>
              <hr
                style={{
                  color: "#F8F3F3",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              />
              <Flex justify={"flex-end"} align="center" gap={8}>
                {child}
              </Flex>
            </>
          );
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{ maxWidth: "100%" }}
          scrollToFirstError
        >
          <Form.Item name="categoryID" label="Mã danh mục">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="category_name"
            label="Tên danh mục"
            rules={[
              {
                required: true,
                message: "Tên danh mục không được để trống!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ảnh danh mục" name="category_image">
            <Upload {...upload_props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CategoryModel;
