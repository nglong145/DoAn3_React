import { apiUser } from "../constant/api";

export const apiLogin = async (data) => {
  const res = await apiUser?.post(`/api/User/login`, data);
  return res?.data;
};
