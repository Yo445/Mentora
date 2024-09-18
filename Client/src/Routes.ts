import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App'; // No need to change this import
import Guest from "./middleware/Guest";
import LandingPage from "./Home/LandingPage";
import Dashboard from './Dashboard/Dashboard';
import Home from "./Dashboard/Pages/Home";
import Auth from "./middleware/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NotFound from "./Components/Shared/NotFound";
import Loader from "./Components/Shared/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Change nothing here, App is correctly referenced
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        element: <Guest />,
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
            path: "home",
            element: <Home />,
          },
          {
            element: <Auth />,
            children: [],
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
