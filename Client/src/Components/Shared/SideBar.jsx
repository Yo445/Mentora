import React from "react";
import { RiHome6Fill } from "react-icons/ri";
import { TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div class = "fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
        <div class = "logo ml-12 dark:text-white  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
        Mentoria
        </div>
        <div className="grow h-full flex items-center justify-center"></div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
              John Doe
            </div>
          </div>
        </div>
      </div>

      <aside
        className={`w-60 ${
          isOpen ? "translate-x-none" : "-translate-x-48"
        } fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]`}
      >
        <div
          className={`max-toolbar ${
            isOpen ? "translate-x-0" : "translate-x-24 scale-x-0"
          } w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12`}
        >

          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-1 rounded-full text-white">
            <div className="transform ease-in-out duration-300 mr-12">
              {/* <div className="flex"><span><img src={logo} className="w-7 h-5 "/></span>entoria</div> */}
              Mentoria
            </div>
          </div>
        </div>

        <div
          onClick={toggleSidebar}
          className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg> */}
          <img src={logo} alt="" className="w-6 h-6" />
        </div>

        {/* Max Sidebar */}
        <div
          className={`max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
            <div>Home</div>
          </div>
          <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
            <div>Login</div>
          </div>
          <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
            <div>Graph</div>
          </div>
        </div>

        {/* Mini Sidebar */}
        <div
          className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${
            isOpen ? "hidden" : "flex"
          }`}
        >
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full flex">
            {/* Icon */}
            <RiHome6Fill />
          </div>
          <Link to={"login"} className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full flex">
            {/* Icon */}
            <TbLogin2 />
          </Link>
          <div className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full flex">
            {/* Icon */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
