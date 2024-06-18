import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminState } from "../admin/store/adminRecoil";

const ProtectedComponent = ({ children }) => {
  const admin = useRecoilValue(adminState);

  let location = useLocation();
  if (admin && admin.token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};

export default ProtectedComponent;
