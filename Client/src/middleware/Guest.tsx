import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

// export default function Guest(): JSX.Element {

// // return <>{!getAuthUser() ? <Outlet /> : <Navigate to={"/dashboard"} />}</>; // / f
// }
