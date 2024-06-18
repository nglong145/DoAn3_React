import { apiUser } from "../constant/api.js";

export const apiGetFeatures = async () => {
  const res = await apiUser?.get(`/api/Product/getFeatures`);
  return res?.data;
};

export const apiGetShopByCategory = async (data) => {
  const res = await apiUser?.post(`/api/Product/getShopByCategory`, data);
  return res?.data;
};

export const apiGetDetail = async (id) => {
  const res = await apiUser?.get(`/api/Product/getDetail/${id}`);
  return res?.data;
};

export const apiGetSize = async (id) => {
  const res = await apiUser?.get(`/api/Product/getSize/${id}`);
  return res?.data;
};

export const apiGetSimilar = async (id) => {
  const res = await apiUser?.get(`/api/Product/getSimilar/${id}`);
  return res?.data;
};
