import * as JWT from "jwt-decode";
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAccessToken, getAuthUser, getRefreshToken, setAuthUser } from "../helper/Storage";

// // Define the structure of the decoded token payload
// interface DecodedToken {
//   id: string;
//   is_superuser: boolean; // Assuming this property exists in the backend
//   iat: number; // Issued at timestamp
//   exp: number; // Expiration timestamp
// }
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser, getAccessToken } from "../helper/Storage";
import {jwtDecode} from "jwt-decode"; // Adjusted import for jwt-decode

interface DecodedToken {
  exp: number;
  [key: string]: any;
  id: string;
  is_superuser: boolean; // Assuming this property exists in the backend
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  role: string; // Added role to the interface
}

const Instructor: React.FC = () => {
  const [isInstructor, setIsInstructor] = React.useState<boolean>(false);
  // let isInstructor = false;
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndRefresh = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (accessToken) {
        const decodedToken = JWT.jwtDecode<DecodedToken>(accessToken);

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error("Access token has expired.");
          if (refreshToken) {
            // Refresh the access token
            try {
              const response = await fetch("http://localhost:5000/api/users/refresh-token", {
                method: "POST",
                body: JSON.stringify({ accessToken, refreshToken }),
              });

              if (response.ok) {
                const data = await response.json();

                const authUser = getAuthUser();
                setAuthUser({
                  token: {
                    accessToken: data.token.accessToken,
                    refreshToken: data.token.refreshToken,
                  },
                  id: authUser?.id || "",
                  name: authUser?.name || "",
                  email: authUser?.email || "",
                  role: authUser?.role || "",
                });

                setIsInstructor(data.role === "instructor" ? true : false);
                console.log("Access token refreshed successfully.");
              } else {
                console.error("Failed to refresh access token.");
                navigate("/login");
              }
            } catch (error) {
              console.error("Failed to refresh access token:", error);
              navigate("/login");
            }
          } else {
            console.error("Refresh token is missing.");
            navigate("/login");
          }
        } else {
          setIsInstructor(decodedToken?.role === "instructor" ? true : false);
        }
      }else {
          console.error("Access token is missing or invalid.");
          navigate("/login");
        }
      };

      checkTokenAndRefresh();
    }, [navigate]);
  
  const accessToken = getAccessToken();
  const authUser = getAuthUser();

  if (authUser && accessToken) {
    try {
      // Decode the JWT access token
      const decodedToken = jwtDecode<DecodedToken>(accessToken); // Decode into the DecodedToken type

      // Check if the token has expired
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decodedToken.exp < currentTime) {
        console.error("Access token has expired.");
        return <Navigate to="/login" />; // Redirect to login if token is expired
      }

      // Check if the user has instructor privileges (assuming is_superuser denotes this)
      isInstructor = decodedToken.role === "instructor";
    } catch (error) {
      console.error("Invalid or corrupted token:", error);
    }
  } else {
    console.error("Access token is missing or invalid.");
  }

  return <>{isInstructor ? <Outlet /> : <Navigate to="/login" />}</>;
};


// const authUser = getAuthUser();
//     const accessToken = getAccessToken();

//     if (authUser && authUser.role === "instructor") {
//       setIsInstructor(true);
//     }

//     if (getAuthUser() && getAccessToken()) {
//       try {
//         const accessToken = getAccessToken();

//         if (accessToken) {
//           // Decode the JWT access token
//           // const decodedToken = JWT.jwtDecode<DecodedToken>(accessToken);
//           const decodedToken = JwtDecode<DecodedToken>(accessToken);

//           // Check if the token has expired
//           const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//           if (decodedToken.exp < currentTime) {
//             console.error("Access token has expired.");
//             navigate("/login"); // Redirect to login if token is expired
//           }

//           // Check if the user has instructor privileges (assuming is_superuser denotes this)
//           setIsInstructor(decodedToken?.role === "instructor" ? true : false);
//         }
//       } catch (error) {
//         console.error("Invalid or corrupted token:", error);
//       }
//     } else {
//       console.error("Access token is missing or invalid.");
//     }
//   }
//   , [navigate]);


//   const authUser = getAuthUser();
//   const accessToken = getAccessToken();

//   if (authUser && authUser.role === "instructor") {
//     isInstructor = true;
//   }

//   if (getAuthUser() && getAccessToken()) {
//     try {
//       const accessToken = getAccessToken();

//       if (accessToken) {
//         // Decode the JWT access token
//         // const decodedToken = JWT.jwtDecode<DecodedToken>(accessToken);
//         const decodedToken = getAccessToken();

//         // Check if the token has expired
//         const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//         if (decodedToken.exp < currentTime) {
//           console.error("Access token has expired.");
//           return <Navigate to="/login" />; // Redirect to login if token is expired
//         }

//         // Check if the user has instructor privileges (assuming is_superuser denotes this)
//         isInstructor = (decodedToken?.role === "instructor" ? true : false);
//       }
//     } catch (error) {
//       console.error("Invalid or corrupted token:", error);
//     }
//   } else {
//     console.error("Access token is missing or invalid.");
//   }

// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { getAuthUser, getAccessToken } from "../helper/Storage";
// import * as JWT from "jwt-decode";

// // then use
// export default function Admin() {
//   const auth = getAuthUser();

//   let isAdmin = false;

//   // console.log("admin.js auth", auth);

//   if (auth && getAccessToken()) {
//     try {
//       const decodedToken = JWT.jwtDecode(getAccessToken());
//       // console.log("Decoded Token:", decodedToken);
//       isAdmin = decodedToken?.is_superuser || false;
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   } else {
//     console.error("Access token is missing or invalid.");
//   }

//   return <>{isAdmin ? <Outlet /> : <Navigate to={"/"} />}</>;
// }
export default Instructor;
