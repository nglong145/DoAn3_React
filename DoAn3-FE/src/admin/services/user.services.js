import { apiAdmin } from "../constant/api.js";

export const apiAdminLogin = async (data) => {
  const res = await apiAdmin?.post(`/api/User/admin-login`, data);
  return res?.data;
};
