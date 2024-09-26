
// Define interfaces for user and token data
interface User {
  token: { accessToken: string,
            refreshToken: string
  };
  [key: string]: any; // Adjust according to the actual user properties
}

interface DecodedToken {
  exp: number; // Expiry time in seconds
  [key: string]: any; // Other token properties
}

// Store user and token in localStorage
export const setAuthUser = (data: User): void => {
  localStorage.setItem("AuthUser", JSON.stringify(data));
  localStorage.setItem("accessToken", data.token.accessToken); // Change key to 'accessToken' for consistency
};

// Retrieve user from localStorage
export const getAuthUser = (): User | null => {
  const user = localStorage.getItem('AuthUser');
  if (user) {
    try {
      const parsedUser: User = JSON.parse(user);
      return parsedUser;
    } catch (error) {
      console.error('Error parsing user data:', error);
      removeAuthUser();
      return null;
    }
  }
  return null;
};

// Remove user and token from localStorage
export const removeAuthUser = (): void => {
  localStorage.removeItem('AuthUser');
  localStorage.removeItem('accessToken'); 
};

// Retrieve access token from localStorage
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken"); 
};

// Decode the stored token and return the payload
// export const getDecodedToken = (): DecodedToken | null => {
//   const token = getAccessToken(); // Get token from storage
//   if (!token) return null;

//   try {
//     return jwtDecode<DecodedToken>(token);
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };


// Check if the stored token is expired
// export const isTokenExpired = (): boolean => {
  // const decodedToken = getDecodedToken();
//   if (!decodedToken) return true;

//   const currentTime = Date.now() / 1000; // Current time in seconds
//   return decodedToken.exp < currentTime;
// };

// // Get the raw token from localStorage
export const getToken = (): string | null => {
  return getAccessToken(); // Directly call getAccessToken for consistency
};
