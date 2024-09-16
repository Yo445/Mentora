import React, { useState } from 'react';
import './App.css';
import SideBar from './Components/Shared/SideBar';
import { Outlet } from 'react-router-dom';
import Login from './Components/Auth/Login';
import LandingPage from './Home/LandingPage';
import Dashboard from './Dashboard/Dashboard';

export default function App() {

  return (
    <>
      <Outlet />
    </>
  );
}
