import React from "react";
import { Flex, Modal, notification } from "antd";
import { apiDelete } from "../../services/category.services";

function CategoryDelete(props) {
  const [api, contextHolder] = notification.useNotification();

  const handleOk = async () => {
    props.handleCancelDeleteModal();
    await apiDelete(props.cateid);
    props.fetchData();
    openNotificationWithIcon("success");
  };
  const handleCancel = () => {
    props.handleCancelDeleteModal();
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Thông báo",
      description: "Xóa người dùng thành công!",
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Xóa người dùng"
        visible={props.isOpenDeleteModal}
        cancelText={"Hủy bỏ"}
        okText={"Xóa"}
        width={"40vw"}
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
        <div>Bạn có muốn xóa người dùng không?</div>
      </Modal>
    </>
  );
}

export default CategoryDelete;
