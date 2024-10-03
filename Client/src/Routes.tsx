import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NotFound from "./Components/Shared/NotFound";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Home";
import AddCourse from "./Dashboard/Instructor/MangeCourse/AddCourse";
import Editcourse from "./Dashboard/Instructor/MangeCourse/Editcourse";
import MangeCourse from "./Dashboard/Instructor/MangeCourse/MangeCourse";
import StudentReviews from "./Dashboard/Instructor/StudentReviews";
import CourseDetails from "./Dashboard/Instructor/Student Pages/CourseDetails";
import CourseMat from "./Dashboard/Instructor/Student Pages/CourseMat";
import Enrollments from "./Dashboard/Instructor/Student Pages/Enrollments";
import LandingPage from "./Home/LandingPage";
import Auth from "./middleware/Auth";
import Guest from "./middleware/Guest";
import Instructor from "./middleware/Instructor";
import Layout from "./Layout";
import Student from "./middleware/Student";

// Define routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //for Un Auth Users
      {
        // path:"guest",
        element: <Guest />,
        children: [
          {
            path: "",
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
        ],
      },

      //for Auth Users
      {
        element: <Auth />,
        path: "dashboard",
        children: [

          //Student routes
          {
            path: 'students',
            element: <Student />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "course/:id",
                element: <CourseDetails />,
              },
              {
                path: "enroll",
                element: <Layout />,
                children: [
                  {
                    index: true,
                    element: <Enrollments />,
                  },
                  {

                    path: ":id",
                    element: <CourseMat />,
                  },
                ],
              },
            ],
          },

          //Instructor Routes
          {
            path: 'instructor',
            element: <Instructor />,
            children: [
              {
                index: true,
                element: <Navigate to= "reviews" replace />,
              },
              {
                path: "manage-course",
                element: <Layout />,
                children: [
                  {
                    index: true,
                    element: <MangeCourse />,
                  },
                  {
                    path: "add",
                    element: <AddCourse />,
                  },
                  {
                    path: "edit/:id",
                    element: <Editcourse />,
                  },
                ],
              },
              {

                path: "reviews",
                element: <StudentReviews />,
              },
            ],
          },
        ],


      },

      //for Not found Links
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
