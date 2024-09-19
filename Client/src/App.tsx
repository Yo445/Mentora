import React, { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';


export default function App(): JSX.Element {

  return (
    <>
      <Dashboard />
    </>
  );
}
