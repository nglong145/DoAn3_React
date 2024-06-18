import { apiAdmin } from "../constant/api";
import { apiUser } from "../constant/api.js";

export const apiGetSize = async (id) => {
  const res = await apiUser?.get(`/api/Product/getSize/${id}`);
  return res?.data;
};

export const apiGetBrand = async () => {
  const res = await apiUser.get(`/api/Brand/get-list`);
  return res?.data;
};

export const apiGetCategory = async () => {
  const res = await apiUser.get(`/api/Category/get-list`);
  return res?.data;
};

export const apiGetList = async (data) => {
  const res = await apiAdmin?.post(`/api/Product/get-list`, data);
  return res?.data;
};

export const apiGetDetailProduct = async (id) => {
  const res = await apiAdmin?.get(`/api/Product/getDetail/${id}`);
  return res?.data;
};

export const apiUpdateProduct = async (data) => {
  const res = await apiAdmin?.post(`/api/Product/update-product`, data);
  return res?.data;
};

export const apiSearchProduct = async (data) => {
  const res = await apiAdmin?.post(`/api/Product/Search`, data);
  return res?.data;
};
