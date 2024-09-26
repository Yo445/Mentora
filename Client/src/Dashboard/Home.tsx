import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Card from "../Components/Card"; // Make sure Card component can display course info
import Loader from "../Components/Shared/Loader";
import { getAuthUser } from "../helper/Storage";

// Define types for course data
interface Course {
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

interface CoursesState {
  loading: boolean;
  results: Course[];
  err: string;
  reload: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [userEmail, setUserEmail] = useState<string | null>(getAuthUser()?.email || null);

  const [courses, setCourses] = useState<CoursesState>({
    loading: false,
    results: [],
    err: "",
    reload: false,
  });


  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = () => {
      const user = getAuthUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        console.error("User is not authenticated or email is missing.");
        return;
      }
  
      setCourses({ ...courses, loading: true });
      axios
        .get("http://localhost:5000/api/courses/", {
          params: { searchTerm: "" }, // Adjust as needed for searching
        })
        .then((resp) => {
          // Ensure that resp.data.courses is an array
          const fetchedCourses = Array.isArray(resp.data.courses) ? resp.data.courses : [];
          
          // Update the courses state correctly
          setCourses({
            ...courses,
            results: fetchedCourses, // Set fetched courses
            loading: false,
          });
        })
        .catch((err) => {
          setCourses({
            ...courses,
            loading: false,
            err: "Something went wrong, please try again later!",
          });
        });
    };
  
    fetchCourses();
  }, [courses.reload]);
  

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter courses by search term
  const filteredCourses = courses.results.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("filteredCourses", filteredCourses);

  return (
    <div className="container">
      {courses.loading ? (
        <Loader />
      ) : (
        <>
          <div className="">
            <header>
              {/* Search bar */}
              <div className="container mx-auto px-6 py-3 pb-8">
                <div className="relative mt-6 max-w-lg mx-auto">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <IoIosSearch className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </header>

            <main className="my-8">
              <div className="container mx-auto px-6">
                {/* Display course cards */}
                <div className="md:flex mt-8 md:-mx-0">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                      <Card
                        key={course.id} // Unique key
                        id={course.id}
                        title={course.title}
                        description={course.description} // Pass description
                        instructor={course.instructor.name} // Pass instructor
                        students={course.students} // Pass students
                        category={course.category} // Pass category
                        difficulty={course.difficulty} // Pass difficulty
                      />
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
