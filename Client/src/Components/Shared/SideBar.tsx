import React from "react";
import { RiHome6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { MdSettingsSuggest, MdReviews } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAuthUser, getAccessToken, removeAuthUser } from "../../helper/Storage";

// Define the interface for token payload
interface MyTokenPayload {
  is_superuser?: boolean;
  // Add other properties from your token as needed
}

// Define props for the sidebar
interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({
  isOpen,
  toggleSidebar,
}: SideBarProps): JSX.Element {
  const navigate = useNavigate();
  let isInstructor = false;

  // Check for auth user and access token
  if (getAuthUser() && getAccessToken()) {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        // const decodedToken = jwtDecode<MyTokenPayload>(accessToken);
        const decodedToken = getAuthUser();
        isInstructor = (decodedToken?.role === "instructor" ? true : false);
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

 //Logout Function
  const Logout = () => {
    removeAuthUser();
    navigate("/");
};

  return (
    <>
      <div className="fixed w-full z-30 flex bg-white dark:bg-[#202330] p-2 items-center justify-center h-16 px-10">
        <div className="logo ml-12 dark:text-[#e8eeec] transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
          Mentoria
        </div>
        <div className="grow h-full flex items-center justify-center"></div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <button onClick={Logout} className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full p-3 rounded-full flex">
              <h3 className="mr-2">Logout</h3>
              <FontAwesomeIcon className="mt-1" icon={faRightFromBracket} />
            </button>
          </div>
        </div>
      </div>

      <aside className={`w-60 ${isOpen ? "translate-x-none" : "-translate-x-48"} fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#000]`}>
        <div className={`max-toolbar ${isOpen ? "translate-x-0" : "translate-x-24 scale-x-0"} w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#000] bg-[#000] absolute top-4 rounded-full h-12`}>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-[#ddff7d] dark:to-[#272129] pl-10 pr-2 py-1 rounded-full text-black">
            <div className="transform ease-in-out duration-300 mr-12">Mentoria</div>
          </div>
        </div>

        <div onClick={toggleSidebar} className="-right-6 transition transform ease-in-out duration-500 flex border-4 dark:border-[#201c1e] bg-[#202330] dark:hover:bg-[#c9dcd2] absolute top-2 p-3 rounded-full text-white hover:rotate-45">
          <img src={logo} alt="" className="w-8 h-8" />
        </div>

        <div className={`max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "flex" : "hidden"}`}>
          <Link to="/" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
            <RiHome6Fill fontSize={"20px"} />
            <div>Home</div>
          </Link>

          <Link to="enroll" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
            <FaGraduationCap fontSize={"20px"} />
            <div>Enrollments</div>
          </Link>

          {isInstructor && (
            <>
              <Link to="manage-course" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
              <MdSettingsSuggest fontSize={"22px"} />
                <div>Manage Courses</div>
              </Link>

              <Link to="reviews" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
                <MdReviews fontSize={"20px"} />
                <div>Reviews</div>
              </Link>
            </>
          )}
        </div>

        <div className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "hidden" : "flex"}`}>
          <Link to="" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
            <RiHome6Fill fontSize={"20px"} />
          </Link>

          <Link to="enroll" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
            <FaGraduationCap fontSize={"20px"} />
          </Link>

          {isInstructor && (
            <>
              <Link to="manage-course" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
                <MdSettingsSuggest fontSize={"22px"} />
              </Link>

              <Link to="reviews" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
                <MdReviews fontSize={"20px"} />
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
