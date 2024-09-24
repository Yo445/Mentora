import React, { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import { CourseProvider } from './Context/CourseContext'; // Import the CourseProvider



export default function App(): JSX.Element {

  return (
    <CourseProvider>
      <Outlet />
    </CourseProvider>
  );
}
