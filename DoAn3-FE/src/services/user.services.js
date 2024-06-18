import { apiUser } from "../constant/api";

export const apiRegister = async (data) => {
  try {
    const res = await apiUser?.post(`/api/User/register`, data);
    return res?.data;
  } catch (error) {
    // Kiểm tra nếu có phản hồi lỗi từ API và lấy thông điệp lỗi
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Đã xảy ra lỗi trong quá trình đăng ký.");
    }
  }
};

export const apiGetInfo = async (id, data) => {
  const res = await apiUser?.get(`/api/User/get-by-id/${id}`, data);
  return res?.data;
};

export const apiUpdateUser = async (data) => {
  try {
    const res = await apiUser?.put(`/api/User/update-user`, data);
    return res?.data;
  } catch (error) {
    // Kiểm tra nếu có phản hồi lỗi từ API và lấy thông điệp lỗi
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Đã xảy ra lỗi trong quá trình đăng ký.");
    }
  }
};

export const apiChangePass = async (data) => {
  try {
    const res = await apiUser?.put(`/api/User/change-password`, data);
    return res?.data;
  } catch (error) {
    // Kiểm tra nếu có phản hồi lỗi từ API và lấy thông điệp lỗi
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Đã xảy ra lỗi.");
    }
  }
};
