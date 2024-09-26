
// Define interfaces for user and token data
interface User {
  token: { accessToken: string, refreshToken: string };
  id: string;
  name: string;
  email: string;
  role: string;
}

// Store user and token in localStorage
export const setAuthUser = (data: User): void => {
  localStorage.setItem("AuthUser", JSON.stringify(data));
  localStorage.setItem("accessToken", data.token.accessToken); // Change key to 'accessToken' for consistency
  localStorage.setItem("refreshToken", data.token.refreshToken);
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

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const getToken = (): { accessToken: string | null, refreshToken: string | null } => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return { accessToken, refreshToken };
}