import React from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoZap } from "react-icons/go";

interface MangeCourseProps {
    // Define your props here

}

const MangeCourse: React.FC<MangeCourseProps> = ({ }) => {
    return (
        <><div className="relative flex items-center justify-center mt-4">
            <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
                <IoSettings className="mr-1  text-[35px]" />
                Manage Your Courses
            </h1>
            <Link
                className="absolute right-0 flex items-center mt-5 rounded-lg w-36 h-10 cursor-pointer border border-[black] bg-[black] group hover:bg-[black] active:bg-[#ddff7d] active:border-[#ddff7d]"
                to={"/add"}
            >
                <span className="text-[#ddff7d] font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300 hover:text-none">
                    Add one
                </span>
                <span className="absolute right-0 h-full w-10 rounded-lg bg-[#ddff7d] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                    <h1 className="text-[26px] w-8 text-[black] text-center">+</h1>
                </span>
            </Link>
        </div>
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
                <tbody className="bg-white divide-y divide-gray-200 ">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">Data Analysis</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">2000 student</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div
                                className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full"
                            >
                                <GoZap className="mt-1 mr-2" />
                                Easy
                            </div>
                        </td>
                        <td className="px-6 py-4 flex whitespace-nowrap">
                            <Link to={"edit"} className="w-9 h-9 text-center transition ease-in-out rounded-full flex items-center dark:hover:bg-[#6a2be266] ">
                                <FaRegEdit className="text-[25px] text-[#6a2be2]" />
                            </Link>
                            <button className="ml-2 w-9 h-9 text-center transition ease-in-out rounded-full flex items-center dark:hover:bg-[#a52a2a8f] ">
                                <RiDeleteBinLine className=" text-[25px] text-[brown]" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default MangeCourse;
