import Home from "../views/Home";
import Login from "../views/loggin-register/Login";
import Shop from "../views/shop/Shop";
import ShopCate from "../views/shop/shopCategory";
import Product from "../views/detailProduct/Product";
import Cart from "../views/cart/Cart";
import CheckOut from "../views/checkout/Checkout";
import Profile from "../views/profile/info";
import ChangPass from "../views/profile/changePass";
import ViewOrder from "../views/profile/viewOrder";
import { createBrowserRouter } from "react-router-dom";
import Register from "../views/loggin-register/Register";

import ProtectedComponent from "../shared/ProtectedComponent";

import AdminLogin from "../admin/views/AdminLogin";
import Dashboard from "../admin/views/Dashboard";
import Category from "../admin/views/Category";
import ProductAdmin from "../admin/views/Product";
import OrderAdmin from "../admin/views/Orders";
import ImportAdmin from "../admin/views/Imports";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/shop",
    element: <Shop />,
  },

  {
    path: "/shop/category/:id",
    element: <ShopCate />,
  },

  {
    path: "/product/:proid",
    element: <Product />,
  },

  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/password",
    element: <ChangPass />,
  },
  {
    path: "/profile/view-order",
    element: <ViewOrder />,
  },

  // route admin
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedComponent>
        <Dashboard />
      </ProtectedComponent>
    ),
  },

  {
    path: "/admin/category",
    element: (
      <ProtectedComponent>
        <Category />
      </ProtectedComponent>
    ),
  },

  {
    path: "/admin/product",
    element: (
      <ProtectedComponent>
        <ProductAdmin />
      </ProtectedComponent>
    ),
  },

  {
    path: "/admin/order",
    element: (
      <ProtectedComponent>
        <OrderAdmin />
      </ProtectedComponent>
    ),
  },

  {
    path: "/admin/import",
    element: (
      <ProtectedComponent>
        <ImportAdmin />
      </ProtectedComponent>
    ),
  },
]);

export default routers;
