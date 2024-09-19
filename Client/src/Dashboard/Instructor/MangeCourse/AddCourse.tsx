import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Components/Shared/Loader";
import { getToken } from "../../../helper/Storage";

// Define TypeScript types for form data and component state
interface CourseData {
  title: string;
  description: string;
  instructor: string;
  loading: boolean;
  err: string;
  success: string | null;
}

export default function AddCourse() {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    instructor: "",
    loading: false,
    err: "",
    success: null,
  });

  // Get Courses (if needed in the future)
  useEffect(() => {
    setCourseData({ ...courseData, loading: true });
    axios
      .get("http://localhost:5000/api/courses/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        setCourseData({ ...courseData, loading: false });
      })
      .catch(() => {
        setCourseData({
          ...courseData,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, []); //courseData.reload

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Submit new course
  const createCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseData({ ...courseData, loading: true });

    axios
      .post(
        "http://localhost:5000/api/courses/",
        {
          title: courseData.title,
          description: courseData.description,
          instructor: courseData.instructor,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        setCourseData({
          ...courseData,
          title: "",
          description: "",
          instructor: "",
          loading: false,
          success: "Course added successfully",
          err: "",
        });
      })
      .catch(() => {
        setCourseData({
          ...courseData,
          loading: false,
          err: "Failed to add course. Please try again.",
          success: null,
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      {courseData.loading ? (
        <Loader />
      ) : (
        <>
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
            Add Your Course
          </h1>

          <form onSubmit={createCourse} className="grid grid-cols-1 gap-6">
            {/* Error Alert */}
            {courseData.err && (
              <div
              className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded"
              role="alert"
            >
              <span>{courseData.err}</span>
              <button
                onClick={(e) => {
                  const parent = e.currentTarget
                    .parentNode as HTMLElement | null;
                  parent?.remove();
                }}
                className="text-red-700 text-[20px]"
              >
                &times;
              </button>
            </div>
            )}
            {/* Success Alert */}
            {courseData.success && (
              <div
                className="flex inline-flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded"
                role="alert"
              >
                <span className="block sm:inline pl-2">{courseData.success}</span>
                <button
                onClick={(e) => {
                  const parent = e.currentTarget
                    .parentNode as HTMLElement | null;
                  parent?.remove();
                }}
                className="text-red-700 text-[20px]"
              >
                &times;
              </button>
              </div>
            )}

            {/* Course Title */}
            <div className="p-2">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Course Title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
                value={courseData.title}
                onChange={handleChange}
              />
            </div>

            {/* Course Description */}
            <div className="p-2">
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Course Description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
                value={courseData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Instructor Info */}
            <div className="p-2">
              <input
                type="text"
                id="instructor"
                name="instructor"
                placeholder="Instructor Name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
                value={courseData.instructor}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="p-2">
              <button
                type="submit"
                className="block w-full bg-[#20b2aa] hover:bg-[#15635f] text-white font-bold py-3 px-4 rounded-full"
              >
                Add Course
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
