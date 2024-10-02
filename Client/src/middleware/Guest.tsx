import React, { useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

export default function Guest(): JSX.Element {
  // Memoize the result of getAuthUser to prevent unnecessary recalculations and renders
  const authUser = useMemo(() => getAuthUser(), []);

  return (
    <>
      {!authUser ? <Outlet /> : <Navigate to={"dashboard"} />}
    </>
  );
}
