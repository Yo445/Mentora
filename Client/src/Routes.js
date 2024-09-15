import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/Shared/NotFound";
import Home from "./Dashboard/Pages/Home";
import Loader from "./Components/Shared/Loader";
import Guest from "./middleware/Guest";
import Auth from "./middleware/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        element: <Guest />, // Guest users only
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Register />,
          },
        ],
      },
      {
        element: <Auth />, // Authenticated users only
        children: [
    
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/load",
        element: <Loader />,
      },
    ],
  },
]);
