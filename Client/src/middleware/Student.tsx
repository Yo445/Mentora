import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Student: React.FC = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser?.role !== "student") {
      navigate('/login')
    }
  }, [navigate]); // Empty dependency array ensures this runs only once

  return <Outlet />;
};

export default Student;