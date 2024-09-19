import React, { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";

interface CourseMatProps {
  // Define your props here
  title: string;
}

const CourseMat: React.FC<CourseMatProps> = ({ title }) => {

  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add submit logic here
    console.log("Message submitted:", message);
    setMessage(""); // Clear the message after sending
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <FaGraduationCap className="mr-1 pb-2 text-[40px]" />
          Course Material
        </h1>
      </div>
      <ul className="bg-white shadow overflow-hidden rounded-[14px] w-100% mx-auto mt-11">
        <li className="border border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="flex text-lg leading-6 font-medium text-gray-900">
                <MdPlayLesson className=" mt-1 mr-1" />
                Lesson 1
              </h3>
              <p className="flex mt-1 max-w-2xl text-sm text-gray-500">
                <BsStopwatchFill className=" mt-1 mr-1" /> 1:10:00
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Status: <span className="text-green-600">Active</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View
              </a>
            </div>
          </div>
        </li>
        <li className="border border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="flex text-lg leading-6 font-medium text-gray-900">
                <MdPlayLesson className=" mt-1 mr-1" />
                Lesson 2
              </h3>
              <p className="flex mt-1 max-w-2xl text-sm text-gray-500">
                <BsStopwatchFill className=" mt-1 mr-1" /> 1:10:00
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Status: <span className="text-green-600">Active</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View
              </a>
            </div>
          </div>
        </li>
        <li className="border border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="flex text-lg leading-6 font-medium text-gray-900">
                <MdPlayLesson className=" mt-1 mr-1" />
                Lesson 3
              </h3>
              <p className="flex mt-1 max-w-2xl text-sm text-gray-500">
                <BsStopwatchFill className=" mt-1 mr-1" /> 1:10:00
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Status: <span className="text-green-600">Active</span>
              </p>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View
              </a>
            </div>
          </div>
        </li>
      </ul>
      <div className="flex items-center my-2 mx-1">
      <textarea
        id="chat"
        rows={1}
        value={message}
        onChange={handleMessageChange}
        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
      ></textarea>
      <button
        type="submit"
        onClick={handleSubmit}
        className="flex justify-center items-center aspect-square h-9 bg-primary-500 inline-flex justify-center p-2 text-white rounded-full cursor-pointer hover:bg-primary-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
          />
        </svg>
      </button>
    </div>
    </>
  );
};

export default CourseMat;
