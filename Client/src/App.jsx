import React, { useState } from 'react';
import './App.css';
import SideBar from './Components/Shared/SideBar';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ${
          isSidebarOpen ? 'ml-12 md:ml-60' : 'ml-12'
        }`}
      >
        <div className="flex flex-wrap my-5 -mx-2">
          <div className="w-full lg:w-1/3 p-2">
            {/* Add your content or outlet here */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
