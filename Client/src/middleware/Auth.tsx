import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
import Dashboard from "../Dashboard/Dashboard";

const Auth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = getAuthUser();
    
    // Redirect to login if there is no authenticated user
    if (!authUser) {
      navigate("/login");
    } else {
      // Redirect based on user role
      if (authUser.role === "student") {
        navigate("/dashboard/students");
      } else if (authUser.role === "instructor") {
        navigate("/dashboard/instructor");
      }
    }
  }, [navigate]);

  return <Dashboard />;
};

export default Auth;
