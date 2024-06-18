import { apiAdmin } from "../constant/api";

export const apiGetList = async (data) => {
  const res = await apiAdmin?.post(`/api/Import/get-list`, data);
  return res?.data;
};

export const apiGetDetail = async (id) => {
  const res = await apiAdmin?.get(`/api/Import/getDetail/${id}`);
  return res?.data;
};

export const apiCreate = async (data) => {
  const res = await apiAdmin?.post(`/api/Import/create-import`, data);
  return res?.data;
};
