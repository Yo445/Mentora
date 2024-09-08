import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FaBookMedical, FaRegUserCircle } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { removeAuthUser, getAuthUser, isTokenExpired } from "../../helper/Storage";
import "../components.css";
import { FaBookBookmark } from "react-icons/fa6";


const SideBar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            if (isTokenExpired()) {
                removeAuthUser();
                navigate("/");
            }
        };

        // Check token expiration on component mount
        checkToken();

        // Optionally, set an interval to periodically check token expiration
        const interval = setInterval(checkToken, 60000); // Check every 60 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [navigate]);

    const handleLogout = () => {
        removeAuthUser();
        navigate("/login");
    };

    return (
        <div className="user-dashboard__sidebar">
            {/* User Links */}
            <div className="user-dashboard__sidebar-links">
                {/* Logo Home */}
                <Link to={"home"} className="brand-logo">
                    <FontAwesomeIcon
                        icon={faBook}
                        fontSize={"36px"}
                        color="lightseagreen"
                    />
                </Link>

                <br />
                {/* Home */}
                <Link to={"home"} className="user-dashboard__sidebar-link">
                    <FontAwesomeIcon icon={faHouse} fontSize={"24px"} />
                </Link>

                {
                    /* Authenticated Routes */
                    getAuthUser() && (
                        <div>
                            {/* Add Book */}
                            <Link to={"add-book"} className="user-dashboard__sidebar-link">
                                <FaBookMedical fontSize={"24px"} />
                            </Link>

                            {/* Wishlist */}
                            <Link to={"wishlist"} className="user-dashboard__sidebar-link">
                                <FaBookBookmark fontSize={"24px"} />
                            </Link>
                        </div>
                    )
                }
            </div>
            {/* Bottom Links */}
            <div className="user-dashboard__sidebar-bottom">
                {
                    /* Unauthenticated Routes */
                    !getAuthUser() && (
                        // Login
                        <Link to={"login"} className="user-dashboard__sidebar-link">
                            <IoMdLogIn fontSize={"30px"} />
                        </Link>
                    )
                }

                {
                    /* Authenticated Routes */
                    getAuthUser() && (
                        <>
                            {/* Logout */}
                            <Link
                                to={"login"}
                                className="user-dashboard__sidebar-link"
                                onClick={handleLogout}
                            >
                                <IoMdLogOut fontSize={"30px"} color="" />
                            </Link>
                            {/* Profile */}
                            <Link to={"profile"} className="user-dashboard__sidebar-link">
                                <FaRegUserCircle fontSize={"30px"} />
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SideBar;


// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBook, faHouse } from "@fortawesome/free-solid-svg-icons";
// import { FaBookMedical } from "react-icons/fa";
// import { FaBookBookmark } from "react-icons/fa6";
// import { IoMdLogIn } from "react-icons/io";
// import { FaRegUserCircle } from "react-icons/fa";
// import { IoMdLogOut } from "react-icons/io";
// import { removeAuthUser, getAuthUser } from "../../helper/Storage";
// import { useNavigate } from "react-router-dom";

// import "../components.css";

// const Logout = () => {
//   removeAuthUser();
//   useNavigate("/login");
// };

// export default function SideBar() {
//   return (
//     <div className="user-dashboard__sidebar">
//       {/* User Links */}
//       <div className="user-dashboard__sidebar-links">
//         {/* Logo Home */}
//         <Link to={"home"} className="brand-logo">
//           <FontAwesomeIcon
//             icon={faBook}
//             fontSize={"36px"}
//             color="lightseagreen"
//           />
//         </Link>

//         <br />
//         {/* Home */}
//         <Link to={"home"} className="user-dashboard__sidebar-link">
//           <FontAwesomeIcon icon={faHouse} fontSize={"24px"} />
//         </Link>

//         {
//           /* Authenticated Routes */
//           getAuthUser() && (
//             <div>
//               {/* Add Book */}
//               <Link to={"add-book"} className="user-dashboard__sidebar-link">
//                 <FaBookMedical fontSize={"24px"} />
//               </Link>

//               {/* Wishlist */}
//               <Link to={"wishlist"} className="user-dashboard__sidebar-link">
//                 <FaBookBookmark fontSize={"24px"} />
//               </Link>
//             </div>
//           )
//         }
//       </div>
//       {/* Bottom Links */}
//       <div className="user-dashboard__sidebar-bottom">
//         {
//           /* Unauthenticated Routes */
//           !getAuthUser() && (
//             // Login
//             <Link to={"login"} className="user-dashboard__sidebar-link">
//               <IoMdLogIn fontSize={"30px"} />
//             </Link>
//           )
//         }

//         {
//           /* Authenticated Routes */
//           getAuthUser() && (
//             <>
//               {/* Logout */}
//               <Link
//                 to={"login"}
//                 className="user-dashboard__sidebar-link"
//                 onClick={Logout}
//               >
//                 <IoMdLogOut fontSize={"30px"} color="" />
//               </Link>
//               {/* Profile */}
//               <Link to={"profile"} className="user-dashboard__sidebar-link">
//                 <FaRegUserCircle fontSize={"30px"} />
//               </Link>
//             </>
//           )
//         }
//       </div>
//     </div>
//   );
// }
