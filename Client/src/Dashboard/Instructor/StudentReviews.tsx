import React from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { MdReviews } from "react-icons/md";

interface StudentReviewsProps {
    // Define your props here
}

const StudentReviews: React.FC<StudentReviewsProps> = ({  }) => {
    return (
        <><div className="relative flex items-center justify-center mt-4">
        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <MdReviews className="mr-1  text-[35px]" />
          Students Reviews
        </h1>
      </div>
        <table className="min-w-full divide-y divide-gray-200 mt-20">
            <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        messege Reviews
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">UI/UX</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">jane@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[coral]">Amazing course</td>
                </tr>
            </tbody>
        </table>
        </>
    );
};

export default StudentReviews;
