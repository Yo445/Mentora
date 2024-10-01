// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect } from "react";
// import { FaGraduationCap } from "react-icons/fa6";
// import { MdReviews, MdSettingsSuggest } from "react-icons/md";
// import { RiHome6Fill } from "react-icons/ri";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { getAccessToken, getAuthUser, getRefreshToken, removeAuthUser, setAuthUser } from "../../helper/Storage";
// import { jwtDecode } from "jwt-decode";




// interface DecodedToken {
//   [key: string]: any;
//   id: string;
//   iat: number; // Issued at timestamp
//   exp: number; // Expiration timestamp
//   // Removed role from this interface
// }

// // Define props for the sidebar
// interface SideBarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }

// export default function SideBar({
//   isOpen,
//   toggleSidebar,
// }: SideBarProps): JSX.Element {



//   // let isInstructor = false;
//   const navigate = useNavigate();
//   const accessToken = getAccessToken();
//   const authUser = getAuthUser();
//   const refreshToken = getRefreshToken();

//   // useEffect(() => {
//   //   const checkTokenAndRefresh = async () => {
//   //     if (accessToken) {
//   //       const decodedToken = JWT.jwtDecode<DecodedToken>(accessToken);

//   //       // Check if the token has expired
//   //       const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   //       if (decodedToken.exp < currentTime) {
//   //         console.error("Access token has expired.");
//   //         if (refreshToken) {
//   //           // Refresh the access token
//   //           try {
//   //             const response = await fetch("http://localhost:5000/api/users/refresh-token", {
//   //               method: "POST",
//   //               body: JSON.stringify({ accessToken, refreshToken }),
//   //             });

//   //             if (response.ok) {
//   //               const data = await response.json();

//   //               const authUser = getAuthUser();
//   //               setAuthUser({
//   //                 token: {
//   //                   accessToken: data.token.accessToken,
//   //                   refreshToken: data.token.refreshToken,
//   //                 },
//   //                 id: authUser?.id || "",
//   //                 name: authUser?.name || "",
//   //                 email: authUser?.email || "",
//   //               });

//   //               console.log("Access token refreshed successfully.");
//   //             } else {
//   //               console.error("Failed to refresh access token.");
//   //               navigate("/login");
//   //             }
//   //           } catch (error) {
//   //             console.error("Failed to refresh access token:", error);
//   //             navigate("/login");
//   //           }
//   //         } else {
//   //           console.error("Refresh token is missing.");
//   //           navigate("/login");
//   //         }
//   //       }
//   //     } else {
//   //       console.error("Access token is missing or invalid.");
//   //       navigate("/login");
//   //     }
//   //   };

//   //   checkTokenAndRefresh();
//   // }, [navigate]);



//   // if (authUser && accessToken) {
//   //   try {
//   //     // Decode the JWT access token
//   //     const decodedToken = jwtDecode<DecodedToken>(accessToken); // Decode into the DecodedToken type

//   //     // Check if the token has expired
//   //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   //     if (decodedToken.exp < currentTime) {
//   //       console.error("Access token has expired.");
//   //       return <Navigate to="/login" />; // Redirect to login if token is expired
//   //     }

//   //   } catch (error) {
//   //     console.error("Error decoding token:", error);
//   //   }
//   // }








//   let isInstructor = false;


//   if (authUser && authUser.role === "instructor") {
//     isInstructor = true;
//   }

//   let isStudent = false;

//   if (authUser && authUser.role === "student") {
//     isStudent = true;
//   }

//   //Logout Function
//   const Logout = () => {
//     removeAuthUser();
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="fixed w-full z-30 flex bg-white dark:bg-[#202330] p-2 items-center justify-center h-16 px-10">
//         <div className="logo ml-12 dark:text-[#e8eeec] transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
//           Mentoria
//         </div>
//         <div className="grow h-full flex items-center justify-center"></div>
//         <div className="flex-none h-full text-center flex items-center justify-center">
//           <div className="flex space-x-3 items-center px-3">
//             <button onClick={Logout} className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full p-3 rounded-full flex">
//               <h3 className="mr-2">Logout</h3>
//               <FontAwesomeIcon className="mt-1" icon={faRightFromBracket} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <aside className={`w-60 ${isOpen ? "translate-x-none" : "-translate-x-48"} fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#000]`}>
//         <div className={`max-toolbar ${isOpen ? "translate-x-0" : "translate-x-24 scale-x-0"} w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#000] bg-[#000] absolute top-4 rounded-full h-12`}>
//           <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-[#ddff7d] dark:to-[#272129] pl-10 pr-2 py-1 rounded-full text-black">
//             <div className="transform ease-in-out duration-300 mr-12">Mentoria</div>
//           </div>
//         </div>

//         <div onClick={toggleSidebar} className="-right-6 transition transform ease-in-out duration-500 flex border-4 dark:border-[#201c1e] bg-[#202330] dark:hover:bg-[#c9dcd2] absolute top-2 p-3 rounded-full text-white hover:rotate-45">
//           <img src={require('../../assets/img/logo.png')} alt="" className="w-8 h-8" />
//         </div>

//         <div className={`max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "flex" : "hidden"}`}>
//           {
//           isStudent && (
//             <>
//               <Link to="" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
//                 <RiHome6Fill fontSize={"20px"} />
//                 <div>Home</div>
//               </Link>

//               <Link to="enroll" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
//                 <FaGraduationCap fontSize={"20px"} />
//                 <div>Enrollments</div>
//               </Link>
//             </>
//           )}


//           {isInstructor &&(
//             <>
//               <Link to="manage-course" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
//                 <MdSettingsSuggest fontSize={"22px"} />
//                 <div>Manage Courses</div>
//               </Link>

//               <Link to="reviews" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] bg-[#000] p-2 pl-8 rounded-full flex flex-row items-center space-x-3">
//                 <MdReviews fontSize={"20px"} />
//                 <div>Reviews</div>
//               </Link>
//             </>
//           )}
//         </div>

//         <div className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "hidden" : "flex"}`}>
//           {
//           isStudent && (
//             <>
//               <Link to="" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
//                 <RiHome6Fill fontSize={"20px"} />
//               </Link>

//               <Link to="enroll" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
//                 <FaGraduationCap fontSize={"20px"} />
//               </Link>
//             </>
//           )}

//           {isInstructor && (
//             <>
//               <Link to="manage-course" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
//                 <MdSettingsSuggest fontSize={"22px"} />
//               </Link>

//               <Link to="reviews" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
//                 <MdReviews fontSize={"20px"} />
//               </Link>
//             </>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { MdReviews, MdSettingsSuggest } from "react-icons/md";
import { RiHome6Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAccessToken, getAuthUser, getRefreshToken, removeAuthUser, setAuthUser } from "../../helper/Storage";
import { jwtDecode } from "jwt-decode";



interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface DecodedToken {
  exp: number;  // Expiration time
  iat: number;  // Issued at time
  sub: string;  // Subject (e.g., user ID)
  // Add other properties based on your JWT structure
}


interface User {
  id: string; // Required
  name?: string; // Optional
  email?: string; // Optional
  role?: string; // Optional
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export default function SideBar({
  isOpen,
  toggleSidebar,
}: SideBarProps): JSX.Element {
  const navigate = useNavigate();
  const authUser = getAuthUser();
  
  const roles = {
    instructor: authUser?.role === "instructor",
    student: authUser?.role === "student",
  };

  // Logout Function
  const logout = () => {
    removeAuthUser();
    navigate("/login"); // Assuming this is the route for your login page
  };

// Inside your SideBar component
// useEffect(() => {
//   const checkTokenAndRefresh = async () => {
//     const accessToken = getAccessToken(); // Call the function to get the access token
//     const refreshToken = getRefreshToken(); // Call the function to get the refresh token

//     if (accessToken) {
//       const decodedToken = jwtDecode<DecodedToken>(accessToken);
//       const currentTime = Math.floor(Date.now() / 1000);
//       if (decodedToken.exp < currentTime) {
//         // If token has expired
//         if (refreshToken) {
//           // Attempt to refresh
//           try {
//             const response = await fetch("http://localhost:5000/api/users/refresh-token", {
//               method: "POST",
//               body: JSON.stringify({ refreshToken }), // Only send refresh token
//               headers: {
//                 "Content-Type": "application/json"
//               }
//             });

//             if (response.ok) {
//               const data = await response.json();
              
//               // Check for missing properties and handle them
//               setAuthUser({
//                 id: authUser?.id || "default-id", // Provide a default value for id if undefined
//                 name: authUser?.name || "Anonymous",
//                 email: authUser?.email || "no-email@domain.com",
//                 role: authUser?.role || "guest",
//                 token: {
//                   accessToken: data.token.accessToken,
//                   refreshToken: data.token.refreshToken,
//                 },
//               });
//             } else {
//               console.error("Failed to refresh access token.");
//               navigate("/login");
//             }
//           } catch (error) {
//             console.error("Failed to refresh access token:", error);
//             navigate("/login");
//           }
//         } else {
//           console.error("Refresh token is missing.");
//           navigate("/login");
//         }
//       }
//     } else {
//       console.error("Access token is missing or invalid.");
//       navigate("/login");
//     }
//   };

//   checkTokenAndRefresh();
// }, [authUser, navigate]); // Update dependencies



  return (
    <>
      <div className="fixed w-full z-30 flex bg-white dark:bg-[#202330] p-2 items-center justify-between h-16 px-10">
        <div className="logo ml-12 dark:text-[#e8eeec]">
          Mentoria
        </div>
        <button onClick={logout} className="flex items-center text-white hover:underline">
          <h3 className="mr-2">Logout</h3>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>

      <aside className={`w-60 ${isOpen ? "translate-x-0" : "-translate-x-48"} fixed transition-transform duration-1000 z-50 flex h-screen bg-[#000]`}>
        <div className={`max-toolbar ${isOpen ? "translate-x-0" : "translate-x-24 scale-x-0"} w-full -right-6 transition-transform duration-300 flex items-center justify-between border-4 border-white dark:border-[#000] bg-[#000] absolute top-4 rounded-full h-12`}>
          <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-[#ddff7d] dark:to-[#272129] pl-10 pr-2 py-1 rounded-full text-black">
            <div className="transform duration-300 mr-12">Mentoria</div>
          </div>
        </div>

        <div onClick={toggleSidebar} className="-right-6 transition-transform duration-500 flex border-4 dark:border-[#201c1e] bg-[#202330] dark:hover:bg-[#c9dcd2] absolute top-2 p-3 rounded-full text-white hover:rotate-45">
          <img src={require('../../assets/img/logo.png')} alt="Logo" className="w-8 h-8" />
        </div>

        <div className={`max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "flex" : "hidden"}`}>
          {/* {roles.student && (
            <> */}
              <Link to="" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] p-2 pl-8 rounded-full flex items-center space-x-3">
                <RiHome6Fill fontSize={"20px"} />
                <div>Home</div>
              </Link>

              <Link to="enroll" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] p-2 pl-8 rounded-full flex items-center space-x-3">
                <FaGraduationCap fontSize={"20px"} />
                <div>Enrollments</div>
              </Link>
            {/* </>
          )} */}

          {roles.instructor && (
            <>
              <Link to="manage-course" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] p-2 pl-8 rounded-full flex items-center space-x-3">
                <MdSettingsSuggest fontSize={"22px"} />
                <div>Manage Courses</div>
              </Link>

              <Link to="reviews" className="hover:ml-4 w-full text-white dark:hover:text-[#ddff7d] p-2 pl-8 rounded-full flex items-center space-x-3">
                <MdReviews fontSize={"20px"} />
                <div>Reviews</div>
              </Link>
            </>
          )}
        </div>

        <div className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isOpen ? "hidden" : "flex"}`}>
          {/* {roles.student && (
            <> */}
              <Link to="" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
                <RiHome6Fill fontSize={"20px"} />
              </Link>

              <Link to="enroll" className="hover:ml-4 justify-end pr-5 text-white dark:hover:text-[#ddff7d] w-full bg-[#000] p-3 rounded-full flex">
                <FaGraduationCap fontSize={"20px"} />
              </Link>
            {/* </>
          )} */}

          {roles.instructor && (
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
