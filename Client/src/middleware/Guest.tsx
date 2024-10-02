import React, { useEffect, useMemo } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

export default function Guest(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      navigate('/dashboard')
    }
  }, [navigate]);
  return <Outlet />;
};
