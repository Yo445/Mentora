import { jwtDecode } from "jwt-decode";

export const setAuthUser = (data) => {
    localStorage.setItem("AuthUser", JSON.stringify(data));
    localStorage.setItem("Token", JSON.stringify(data.token));
};

export const getAuthUser = () => {
    const user = localStorage.getItem('AuthUser');
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser;
        } catch (error) {
            console.error('Error parsing user data:', error);
            removeAuthUser();
        }
}};

export const removeAuthUser = () =>{
    if(localStorage.getItem('AuthUser')) {
        localStorage.removeItem('AuthUser');
        localStorage.removeItem('Token');
    }
}

export const getdecodedToken = () => {
    const token = localStorage.getItem('Token');
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isTokenExpired = () => {
    const decodedToken = getdecodedToken();
    if (!decodedToken) return true;

    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
};

export const getToken = () => {
    const token = JSON.parse(localStorage.getItem('Token'));
    return token;
}
