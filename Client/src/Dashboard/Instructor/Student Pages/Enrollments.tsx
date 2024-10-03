import axios from 'axios'; // Ensure you have axios installed
import React, { useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import { Link } from 'react-router-dom'; // Import Link for navigation
import Loader from "../../../Components/Shared/Loader";
import { getAccessToken } from '../../../helper/Storage';

interface Enrollment {
    _id: string; // Unique identifier for the course
    courseId: string; // Course name
    studentId: string; // Instructor name
}

interface CourseProps {
    _id: string | number;
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


const Enrollments: React.FC = () => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]); // State to hold the enrolled courses
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [courses, setCourses] = useState<CourseProps[]>([]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/courses`,
                    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
                ); // Replace with your actual API endpoint
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    if (loading) {
        return <Loader />; // Loading message or spinner
    }

    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="relative flex items-center justify-center mt-4">
                <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
                    <GiNotebook className="mr-1 text-[35px]" />
                    Your Enrollments
                </h1>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-20">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <tr key={course._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">{course.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">{course.instructor.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`${course._id}`}> {/* Link to the course material page */}
                                        <button className="px-4 flex py-2 font-medium text-[black] bg-[#ddff7d] hover:bg-[black] focus:outline-none hover:text-[#ddff7d] focus:shadow-outline-black active:bg-[#ddff7d] active:text-[black] transition duration-150 ease-in-out rounded-lg">
                                            <MdSwitchAccessShortcutAdd className="text-25 mr-2 mt-1" />
                                            Go to Course
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                No enrollments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Enrollments;
