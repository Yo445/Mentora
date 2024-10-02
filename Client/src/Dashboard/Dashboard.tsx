import React, { useState } from "react";
import SideBar from "../Components/Shared/SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`content transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ${isSidebarOpen ? "ml-12 md:ml-60" : "ml-12"}`}
      >
        <div className="flex flex-wrap p-0">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
