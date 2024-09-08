import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Auth = () => {

  return getAuthUser() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Auth;