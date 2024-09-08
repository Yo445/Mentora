import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/Shared/NotFound";
import Home from "./Pages/Home";
import Loader from "./Components/Shared/Loader";
import Wishlist from './Pages/Wishlist';
import Guest from "./middleware/Guest";
import Auth from "./middleware/Auth";
import Login from "./Components/Auth/Login";
import Profile from "./Pages/Profile";
import AddBook from './Pages/AddBook';
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
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "add-book",
            element: <AddBook />,
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
