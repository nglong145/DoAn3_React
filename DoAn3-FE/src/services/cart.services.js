import { apiUser } from "../constant/api.js";

export const apiAddToCart = async (data) => {
  const res = await apiUser?.post(`/api/Cart/create-cart`, data);
  return res?.data;
};

export const apiGetCart = async (accountid) => {
  const res = await apiUser?.get(`/api/Cart/getList/${accountid}`);
  return res?.data;
};

export const apiUpdateCart = async (data) => {
  const res = await apiUser?.put(`/api/Cart/update-cart`, data);
  return res?.data;
};

export const apiGetItem = async (accountid) => {
  const res = await apiUser?.get(`/api/Cart/getItem/${accountid}`);
  return res?.data;
};

export const apiDeleteCart = async (id) => {
  const res = await apiUser?.delete(`/api/Cart/delete-cart/${id}`);
  return res?.data;
};
