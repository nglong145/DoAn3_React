import { apiAdmin } from "../constant/api";

export const apiGetList = async (data) => {
  const res = await apiAdmin?.post(`/api/Category/get-list`, data);
  return res?.data;
};

export const apiGetDetail = async (id) => {
  const res = await apiAdmin?.get(`/api/Category/getDetail/${id}`);
  return res?.data;
};

export const apiCreate = async (data) => {
  const res = await apiAdmin?.post(`/api/Category/create-category`, data);
  return res?.data;
};

export const apiUpdate = async (data) => {
  const res = await apiAdmin?.put(`/api/Category/update-category`, data);
  return res?.data;
};

export const apiDelete = async (id) => {
  const res = await apiAdmin?.delete(`/api/Category/delete-category/${id}`);
  return res?.data;
};
