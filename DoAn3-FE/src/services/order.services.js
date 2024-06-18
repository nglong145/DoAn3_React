import { apiUser } from "../constant/api.js";

export const apiOrder = async (data) => {
  const res = await apiUser?.post(`/api/Order/create-order`, data);
  return res?.data;
};
