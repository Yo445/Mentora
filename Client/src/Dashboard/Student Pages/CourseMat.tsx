import React, { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

interface CourseMatProps {
  title: string;
}

const CourseMat: React.FC<CourseMatProps> = ({ title }) => {
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Message submitted:", message);
    setMessage(""); // Clear the message after sending
  };

  const handleReviewSubmit = () => {
    console.log("Review submitted:", review);
    setReview("");
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <>
      <div className="relative flex items-center justify-center mt-4">
        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <FaGraduationCap className="mr-1 pb-2 text-[40px]" />
          Course Material
        </h1>
        <button
          className="absolute right-0 flex items-center mt-5 rounded-lg w-36 h-10 cursor-pointer border border-[black] bg-[black] group hover:bg-[black] active:bg-[#ddff7d] active:border-[#ddff7d]"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-[#ddff7d] font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300 hover:text-none">
          Add Review
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-[#ddff7d] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <h1 className="text-[26px] w-8 text-[black] justify-center text-center">+</h1>
          </span>
        </button>
      </div>

      <ul className="bg-white shadow overflow-hidden rounded-[14px] w-full mx-auto mt-11">
        {/* Lessons */}
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
        {/* Additional Lessons Here */}
      </ul>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 shadow flex justify-center items-center mt-40">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#ddff7d]">Add Your Review</h2>
            <textarea
              rows={3}
              value={review}
              onChange={handleReviewChange}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Write your review..."
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#2a2f3f] text-white rounded-lg"
                onClick={handleReviewSubmit}
              >
                <IoSend color="#ddff7d" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseMat;