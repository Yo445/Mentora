import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Auth: React.FC = () => {
  const authUser = getAuthUser(); // Store result of getAuthUser() once

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Auth;
