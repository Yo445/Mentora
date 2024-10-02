import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Instructor: React.FC = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser?.role !== "instructor") {
      navigate('/login')
    }
  }, [navigate]);

  return <Outlet />;
};

export default Instructor;
