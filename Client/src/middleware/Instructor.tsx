import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser, getAccessToken } from "../helper/Storage";
import * as JWT from "jwt-decode";

// Define the structure of the decoded token payload
interface DecodedToken {
  id: string;
  is_superuser: boolean; // Assuming this property exists in the backend
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}

const Instructor: React.FC = () => {
  let isInstructor = false;

  if (getAuthUser() && getAccessToken()) {
    try {
      const accessToken = getAccessToken();

      if (accessToken) {
        // Decode the JWT access token
        const decodedToken = JWT.jwtDecode<DecodedToken>(accessToken);

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error("Access token has expired.");
          return <Navigate to="/login" />; // Redirect to login if token is expired
        }

        // Check if the user has instructor privileges (assuming is_superuser denotes this)
        isInstructor = decodedToken.is_superuser || false;
      }
    } catch (error) {
      console.error("Invalid or corrupted token:", error);
    }
  } else {
    console.error("Access token is missing or invalid.");
  }

  return <>{isInstructor ? <Outlet /> : <Navigate to="/" />}</>;
};



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
