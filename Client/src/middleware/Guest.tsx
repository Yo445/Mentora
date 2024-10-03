import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

export default function Guest(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = getAuthUser();

    // If the user is authenticated
    if (authUser) {
      if (authUser.role === 'student') {
        navigate('/dashboard/students'); // Redirect to student dashboard
        return; // Exit after navigating
      }
      
      if (authUser.role === 'instructor') {
        navigate('/dashboard/instructor'); // Redirect to instructor dashboard
        return; // Exit after navigating
      }

    }
  }, [navigate]);

  return <Outlet />;
}
