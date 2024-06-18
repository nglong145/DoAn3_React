import { apiUser } from "../../constant/api.js";

const getBlogHome = async () => {
  const res = await apiUser.get(`/api/Blog/get-home`);
  return res?.data;
};

export default getBlogHome;
