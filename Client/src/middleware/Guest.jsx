import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

export default function Guest() {
return <>{!getAuthUser() ? <Outlet /> : <Navigate to={"/"} />}</>;
}
