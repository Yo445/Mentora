import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Student: React.FC = () => {
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const authUser = getAuthUser();
    setIsStudent(authUser?.role === "student");
  }, []); // Empty dependency array ensures this runs only once

  return isStudent ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Student;
