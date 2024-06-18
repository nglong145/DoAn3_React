import { apiUser } from "../constant/api.js";

export const apiGetCategory = async () => {
  const res = await apiUser.get(`/api/Category/get-list`);
  return res?.data;
};
