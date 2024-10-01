import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoZap } from "react-icons/go";
import axios from "axios";
import { getAuthUser, getAccessToken } from "../../../helper/Storage";
import Loader from './../../../Components/Shared/Loader';

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

const ManageCourse: React.FC = () => {
    const auth = getAuthUser();
    const navigate = useNavigate();

    const [courseState, setCourseState] = useState<CoursesState>({
        loading: false,
        results: [],
        err: "",
        reload: false,
    });

    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setCourseState(prevState => ({ ...prevState, loading: true }));
            try {
                const resp = await axios.get("http://localhost:5000/api/courses/", {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });

                if (Array.isArray(resp.data)) {
                    setCourseState(prevState => ({
                        ...prevState,
                        results: resp.data,
                        loading: false,
                    }));
                } else {
                    setCourseState(prevState => ({
                        ...prevState,
                        loading: false,
                        err: "There are no Courses added ",
                    }));
                    setShowAlert(true);
                }
            } catch (err) {
                setCourseState(prevState => ({
                    ...prevState,
                    loading: false,
                    err: "Something went wrong, please try again later!",
                }));
                setShowAlert(true);
            }
        };

        fetchCourses();
    }, [courseState.reload]);

    const deleteCourse = async (id: string | number) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setCourseState(prevState => ({
                    ...prevState,
                    reload: !prevState.reload,
                }));
            } catch (err) {
                setCourseState(prevState => ({
                    ...prevState,
                    loading: false,
                    err: "Something went wrong, please try again later!",
                }));
                setShowAlert(true);
            }
        }
    };

    return (
        <>
            {courseState.loading ? (
                <Loader />
            ) : (
                <>
                    {/* Header */}
                    <div className="relative flex items-center justify-center mt-4 mb-10">
                        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
                            <IoSettings className="mr-1 text-[35px]" />
                            Manage Your Courses
                        </h1>
                        {/* Add course btn */}
                        <Link to={"/dashboard/manage-course/add"}
                            className="absolute font-semibold text-center group right-0 flex items-center mt-5 rounded-2xl w-48 h-12 cursor-pointer border border-[black] bg-[black] group hover:bg-[black] active:bg-[#ddff7d] active:border-[#ddff7d]"
                        >
                            <div className="bg-[#ddff7d] rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                                <h1 className="text-[26px] w-8 text-[black] text-center">+</h1>
                            </div>
                            <p className="translate-x-[4em] text-[#ddff7d]">Add Course</p>
                        </Link>
                    </div>

                    {/* Error alert message */}
                    {courseState.err && showAlert && (
                        <div className="mt-10 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <strong className="font-bold">Note: </strong>
                            <span className="block sm:inline">{courseState.err}</span>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="absolute top-0 mb-1 right-0 px-4 py-3 text-blue-500 font-bold text-xl">x
                            </button>
                        </div>
                    )}
                    <table className="min-w-full divide-y divide-gray-200 mt-20 rounded-full">
                        <thead className="rounded-[20px]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applicants
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Difficulty
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courseState.results.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">
                                        {course.students.length} students
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full">
                                            <GoZap className="mt-1 mr-2" />
                                            {course.difficulty}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex whitespace-nowrap">
                                        <Link
                                            to={`edit/${course.id}`}
                                            className="w-9 h-9 text-center transition ease-in-out rounded-full flex items-center dark:hover:bg-[#6a2be266]"
                                        >
                                            <FaRegEdit className="text-[25px] text-[#6a2be2]" />
                                        </Link>
                                        <button
                                            onClick={() => deleteCourse(course.id)}
                                            className="ml-2 w-9 h-9 text-center transition ease-in-out rounded-full flex items-center dark:hover:bg-[#a52a2a8f]"
                                        >
                                            <RiDeleteBinLine className="text-[25px] text-[brown]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default ManageCourse;
