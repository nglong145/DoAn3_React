import { atom } from "recoil";
const storedAdmin = JSON.parse(localStorage.getItem("admin")) || {};
export const adminState = atom({
  key: "adminState",
  default: storedAdmin,
});
