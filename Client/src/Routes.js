import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Guest from "./middleware/Guest";
import LandingPage from "./Home/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Pages/Home";
import Auth from "./middleware/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NotFound from "./Components/Shared/NotFound";
import Loader from "./Components/Shared/Loader";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="start" replace />,
      },
      {
        path: "start",
        element: <LandingPage />,
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
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "", // home
            element: <Home />,
          },
          // {
          //   path: "signup",
          //   element: <Register />,
          // },
          {
            element: <Auth />, // Authenticated users only
            children: [
        
            ],
          },
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
