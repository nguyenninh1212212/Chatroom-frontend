import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateProps {
  children: React.ReactNode;
}

const PrivateRoutersrs: React.FC<PrivateProps> = ({ children }) => {
  const token = Cookies.get("token");

  const location = useLocation();

  if (token && location.pathname === "/auth/login") {
    return <Navigate to="/" replace />;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutersrs;
