import * as JWT from "jwt-decode";
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAccessToken, getAuthUser, getRefreshToken, setAuthUser } from "../helper/Storage";

// interface DecodedToken {
//   exp: number;
//   role: string;
//   [key: string]: any;
// }

const Instructor: React.FC = () => {
  let isInstructor = false;
  const authUser = getAuthUser();

  if (authUser && authUser.role === "instructor") {
    isInstructor = true;
  }
  return <>{isInstructor ? <Outlet /> : <Navigate to="/" />}</>;
};
export default Instructor;

