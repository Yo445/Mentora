import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
import Dashboard from "../Dashboard/Dashboard";

const Auth: React.FC = () => {

  const navigate =useNavigate();
  useEffect(() => {
    const authUser = getAuthUser();
    if(!authUser)
    {
      navigate('/login')
    }
  }, [navigate]);
  
  return <Dashboard />;
};

export default Auth;


