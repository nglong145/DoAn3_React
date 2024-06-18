import { apiAddToCart, apiGetItem } from "../services/cart.services";

export const AddToCart_dedault = async (item, cart, setCart) => {
  try {
    await apiAddToCart(item);

    const acc = item.accountID;
    fetchAndSetCart(acc, setCart);
    // let dataCart = await apiGetItem(acc);

    // // Cập nhật local storage (nếu cần) và Recoil state
    // localStorage.setItem("cart", JSON.stringify(dataCart));
    // setCart(dataCart);
    alert("Product added to cart successfully.");
  } catch (error) {
    alert("Failed to add product to cart.");
  }
};

export const fetchAndSetCart = async (accountID, setCart) => {
  let dataCart = await apiGetItem(accountID);
  localStorage.setItem("cart", JSON.stringify(dataCart));
  setCart(dataCart);
};
