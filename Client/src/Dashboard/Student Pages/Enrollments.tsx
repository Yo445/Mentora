import React from "react";
import { GiNotebook } from "react-icons/gi";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";

interface EnrollmentsProps {
    // Define your props here
    title: string;
}

const Enrollments: React.FC<EnrollmentsProps> = ({ title }) => {
    return (
        <><div className="relative flex items-center justify-center mt-4">
        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <GiNotebook className="mr-1  text-[35px]" />
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
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">UI/UX</td>
                    <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">Mohamed Ali</td>
 
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button className="px-4 flex py-2 font-medium text-[black] bg-[#ddff7d] hover:bg-[black] focus:outline-none hover:text-[#ddff7d] focus:shadow-outline-black active:bg-[#ddff7d] active:text-[black] transition duration-150 ease-in-out rounded-lg">
                            <MdSwitchAccessShortcutAdd className="text-25 mr-2 mt-1"/> 
                                Go to Course
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </>
    );
};

export default Enrollments;
