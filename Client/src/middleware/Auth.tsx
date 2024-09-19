import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Auth: React.FC = () => {
  return getAuthUser() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Auth;
