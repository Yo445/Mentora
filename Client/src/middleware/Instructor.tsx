import React, { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Instructor: React.FC = () => {
  // Memoize the value of authUser to avoid unnecessary re-renders
  const authUser = useMemo(() => getAuthUser(), []);

  // Check if the authUser exists and if the role is "instructor"
  const isInstructor = authUser?.role === "instructor";

  // If the user is an instructor, render the child routes (Outlet), otherwise redirect to login
  return isInstructor ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Instructor;
