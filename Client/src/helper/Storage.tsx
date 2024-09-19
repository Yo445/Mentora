import jwtDecode from 'jwt-decode';

// Define interfaces for user and token data
interface User {
  token: string;
  [key: string]: any; // Adjust according to the actual user properties
}

interface DecodedToken {
  exp: number; // Expiry time in seconds
  [key: string]: any; // Other token properties
}

export const setAuthUser = (data: User): void => {
  localStorage.setItem("AuthUser", JSON.stringify(data));
  localStorage.setItem("Token", JSON.stringify(data.token));
};

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

export const removeAuthUser = (): void => {
  if (localStorage.getItem('AuthUser')) {
    localStorage.removeItem('AuthUser');
    localStorage.removeItem('Token');
  }
};

// export const getDecodedToken = (): DecodedToken | null => {
//   const token = localStorage.getItem('Token');
//   if (!token) return null;

//   try {
//     return jwtDecode<DecodedToken>(token);
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// export const isTokenExpired = (): boolean => {
//   const decodedToken = getDecodedToken();
//   if (!decodedToken) return true;

//   const currentTime = Date.now() / 1000; // Current time in seconds
//   return decodedToken.exp < currentTime;
// };

export const getToken = (): string | null => {
  const token = localStorage.getItem('Token');
  return token ? JSON.parse(token) : null;
};
