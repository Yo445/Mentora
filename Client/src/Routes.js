import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Guest from "./middleware/Guest";
import LandingPage from "./Home/LandingPage";
import Dashboard from './Dashboard/Dashboard';
import Home from "./Dashboard/Pages/Home";
import Auth from "./middleware/Auth";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NotFound from "./Components/Shared/NotFound";
import Loader from "./Components/Shared/Loader";
import CourseDetails from "./Components/CourseDetails";

// Define routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      // {
      //   element: <Guest />,
      //   children: [
      //     {
      //       path: "login",
      //       element: <Login />,
      //     },
      //     {
      //       path: "signup",
      //       element: <Register />,
      //     },
      //   ],
      // },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "course",
            element: <CourseDetails />,
          },
          
          {
            element: <Auth />,
            children: [
              // Add protected routes here if needed
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
