import React, { useEffect, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";
import axios from 'axios'; // Ensure you have axios installed
import { Link } from 'react-router-dom'; // Import Link for navigation

interface Enrollment {
    id: string; // Unique identifier for the course
    name: string; // Course name
    instructor: string; // Instructor name
}

const Enrollments: React.FC = () => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]); // State to hold the enrolled courses
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get('/api/enrollments'); // Replace with your actual API endpoint
                setEnrollments(response.data); // Assuming the response contains an array of enrollments
            } catch (error) {
                console.error("Error fetching enrollments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading message or spinner
    }

    return (
        <>
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
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">{enrollment.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">{enrollment.instructor}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/course-mat/${enrollment.id}`}> {/* Link to the course material page */}
                                    <button className="px-4 flex py-2 font-medium text-[black] bg-[#ddff7d] hover:bg-[black] focus:outline-none hover:text-[#ddff7d] focus:shadow-outline-black active:bg-[#ddff7d] active:text-[black] transition duration-150 ease-in-out rounded-lg">
                                        <MdSwitchAccessShortcutAdd className="text-25 mr-2 mt-1" />
                                        Go to Course
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Enrollments;
