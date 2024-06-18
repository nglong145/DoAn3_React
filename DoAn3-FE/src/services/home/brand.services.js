import { apiUser } from "../../constant/api.js";

const getBrandHome = async () => {
  const res = await apiUser.get(`/api/Brand/get-list`);
  return res?.data;
};

export default getBrandHome;
