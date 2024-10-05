import axios from "axios";
import React, { useEffect, useState } from 'react';
import { GoZap } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../Components/Shared/Loader';
import { getAccessToken, getAuthUser } from '../../../helper/Storage';

// Define types for course data
interface CourseProps {
  id: string | number;
  title: string;
  description: string;
  instructor: {
    name: string;
    id: string;
  };
  students: string[];
  category: string;
  difficulty: string;
  materials: {
    title: string;
    url: string;
    fileType: string;
    fileSize: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  loading: boolean;
  result: CourseProps | null;
  err: string;
}

const Alert: React.FC<{ message: string; type: "success" | "error"; onClose: () => void }> = ({ message, type, onClose }) => {
  const alertClasses = type === "success" 
    ? "bg-green-100 border border-green-400 text-green-700"
    : "bg-red-100 border border-red-400 text-red-700";

  return (
    <div className={`flex p-4 rounded-lg ${alertClasses} mb-4`} role="alert">
      <div className="flex-shrink-0">
        <svg
          className={`w-5 h-5 ${type === "success" ? "text-green-600" : "text-red-600"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d={type === "success" ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.464a1 1 0 010 1.414l-3.536 3.536a1 1 0 01-1.414-1.414L10.586 9l-3.536-3.536a1 1 0 111.414-1.414l3.536 3.536z"}
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm">{message}</p>
      </div>
      <button onClick={onClose} className="ml-auto bg-transparent text-gray-500 hover:text-gray-700">
        &times;
      </button>
    </div>
  );
};

const CourseDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string | null>(getAuthUser()?.email || null);
  const [course, setCourse] = useState<CourseState>({
    loading: false,
    result: null,
    err: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(() => {
    // Retrieve the enrollment status from localStorage
    return localStorage.getItem(`enrolled-${id}`) === "true";
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  // Fetch course details when component loads
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setCourse({ loading: true, result: null, err: "" });

      try {
        // Fetch course details
        const courseResp = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse({ loading: false, result: courseResp.data, err: "" });
      } catch (err) {
        setCourse({ loading: false, result: null, err: "Something went wrong, please try again later!" });
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Check enrollment status after fetching course details
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        await axios.get(`http://localhost:5000/api/courses/${id}/enroll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // If the request succeeds, it means the user is not enrolled
        setIsEnrolled(false);
      } catch (error) {
        // If a 400 error occurs, the user is already enrolled
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          setIsEnrolled(true);
        }
      }
    };

    checkEnrollmentStatus();
  }, [id]);

  // Function to handle enrollment
  const handleEnroll = async () => {
    const token = getAccessToken();
    if (!token) {
      setEnrollError("User is not authenticated.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/courses/${id}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEnrolled(true);
      localStorage.setItem(`enrolled-${id}`, "true"); // Store the enrollment status in localStorage
      setAlertMessage(`You have successfully enrolled in ${course.result?.title}.`);
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      navigate(`/dashboard/students/enroll/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setEnrollError("You are already enrolled in this course.");
        setAlertMessage("You are already enrolled in this course.");
        setAlertType("error");
        setShowAlert(true);
        setIsEnrolled(true); // Set enrollment status to true if already enrolled
      } else {
        setEnrollError("Enrollment failed. Please try again.");
        setAlertMessage("Enrollment failed. Please try again.");
        setAlertType("error");
        setShowAlert(true);
        console.error(error);
      }
    }
  };

  if (course.loading) {
    return <Loader />;
  }

  if (course.err) {
    return <div>{course.err}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-3">
      {showAlert && alertMessage && alertType && (
        <Alert 
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}

      {course.result && (
        <div className="mx-auto max-w-7xl pt-16 sm:pt-24">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div className="space-y-8">
                <div className="space-y-4 bg-black p-4 rounded-[10px]">
                  <div className="space-y-2">
                    <div className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full">
                      <GoZap className="mt-1 mr-2" />
                      {course.result.difficulty}
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#2a2f3f] sm:text-3xl md:text-4xl">
                      <span className="font-extrabold text-[#ddff7d]">{course.result.title}</span>
                      <br />
                    </h1>
                  </div>
                  <h3 className="text-xl mt-5 text-white">
                    by <span>{course.result.instructor.name}</span>
                  </h3>
                  <p className="text-sm text-gray-400">{course.result.category}</p>
                  <p className="text-base text-gray-300">{course.result.description}</p>
                  <button
                    className={`bg-[#ddff7d] hover:bg-[#c0cc1e] text-black rounded-lg px-5 py-2 ${
                      isEnrolled ? "hidden" : ""
                    }`}
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </button>
                  {isEnrolled && (
                    <span className="text-green-500 font-bold">You are already enrolled!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 px-10">
              <img
                className="w-full rounded-lg"
                src="https://img-c.udemycdn.com/course/750x422/1565838_e54e_12.jpg"
                alt="Course visual"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
