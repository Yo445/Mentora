import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser, getAccessToken } from "../helper/Storage";
import {jwtDecode} from "jwt-decode"; // Adjusted import for jwt-decode

// Define the structure of the decoded token payload
interface DecodedToken {
  id: string;
  is_superuser: boolean; // Assuming this property exists in the backend
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
  role: string; // Added role to the interface
}

const Instructor: React.FC = () => {
  let isInstructor = false;

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

export default Instructor;
