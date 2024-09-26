import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import NotFound from "./Components/Shared/NotFound";
import CourseDetails from "./Dashboard/Student Pages/CourseDetails";
import MangeCourse from "./Dashboard/Instructor/MangeCourse/MangeCourse";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Dashboard/Home";
import AddCourse from "./Dashboard/Instructor/MangeCourse/AddCourse";
import Editcourse from "./Dashboard/Instructor/MangeCourse/Editcourse";
import StudentReviews from "./Dashboard/Instructor/StudentReviews";
import CourseMat from "./Dashboard/Student Pages/CourseMat";
import Enrollments from "./Dashboard/Student Pages/Enrollments";
import LandingPage from "./Home/LandingPage";
import Auth from "./middleware/Auth";
import Guest from "./middleware/Guest";

// Define routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //for Un Auth Users
      {
        element: <Guest />,
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
        ],
      },

      //for Auth Users
      {
        element: <Auth />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              // {
              //   index: true,
              //   element: <Navigate to="home" replace />,
              // },
              {
                path: "",
                element: <Home />,
              },
              {
                path: "course/:id",
                element: <CourseDetails />,
              },
              {
                path: "manage-course",
                element: <MangeCourse />,
                children: [
                  {
                    path: "",
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
              {
                path: "course-mat/:id",
                element: <CourseMat />,
              },
              {
                path: "enroll",
                element: <Enrollments />,
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
