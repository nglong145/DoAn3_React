import { apiUser } from "../constant/api.js";

export const apiGetReview = async (data) => {
  const res = await apiUser?.post(`/api/Review/getReview`, data);
  return res?.data;
};

export const apiCreateReview = async (data) => {
  const res = await apiUser?.post(`/api/Review/create-review`, data);
  return res?.data;
};

export const apiUploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await apiUser.post("/api/Review/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
