import { apiAdmin } from "../constant/api";

export const apiGetList = async (data) => {
  const res = await apiAdmin?.post(`/api/Order/get-list`, data);
  return res?.data;
};

export const apiGetDetailOrder = async (id) => {
  const res = await apiAdmin?.get(`/api/Order/getDetail/${id}`);
  return res?.data;
};

export const apiUpdateOrder = async (data) => {
  const res = await apiAdmin?.post(`/api/Order/update-order`, data);
  return res?.data;
};

export const apiDeleteOrder = async (id) => {
  const res = await apiAdmin?.delete(`/api/Order/delete-order/${id}`);
  return res?.data;
};

export const apiSearchOrder = async (data) => {
  const res = await apiAdmin?.post(`/api/Order/Search`, data);
  return res?.data;
};
