import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {},
});

export const cartState = atom({
  key: "cartState",
  default: JSON.parse(localStorage.getItem("cart")) || [],
});
