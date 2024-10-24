import axios from 'axios'; // Ensure you have axios installed
import React, { useEffect, useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdPlayLesson } from "react-icons/md";
import { useParams } from "react-router-dom"; // Import useParams
import { getAccessToken } from '../../../helper/Storage'; // Import getAccessToken function



const CourseMat: React.FC = () => {
  const { id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [materials, setMaterials] = useState<any[]>([]); // State to hold materials
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null); // State to hold selected material

  useEffect(() => {
    // Function to fetch course materials when component mounts
    const fetchCourseMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setMaterials(response.data.materials); // Assume the API response contains materials
      } catch (error) {
        console.error("Error fetching course materials:", error);
      }
    };

    fetchCourseMaterials();
  }, [id]);

  // const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessage(e.target.value);
  // };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(parseInt(e.target.value));
  }

  // const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("Message submitted:", message);
  //   setMessage(""); // Clear the message after sending
  // };

  const handleReviewSubmit = async () => {
    try {
      
      const reviewData = {
        rating,
        comment: review,
      };

      const response = await axios.post(
        `http://localhost:5000/api/courses/${id}/review`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          },
        }
      );
      setReview(""); // Clear review input
      setRating(5); // Reset rating
      setIsModalOpen(false); // Close modal after submitting
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || (error as any).message;
      if (errorMessage === "Already reviewed this course") {
        setMessage("You have already reviewed this course.");
      } else {
        setMessage("An error occurred while submitting your review.");
      }
      console.error("Error submitting review:", errorMessage);
    }
  };

  const handleDismissMessage = () => {
    setMessage("");
  };

  const handleViewMaterial = (material: any) => {
    setSelectedMaterial(material); // Set the selected material to display
  };

  console.log(materials);
  console.log(selectedMaterial);

  return (
    <>
      {/* {message && <div className="bg-red-100 text-red-800 p-3 mb-4">{message}</div>} */}

      <div className="relative flex items-center justify-center mt-4">
        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <FaGraduationCap className="mr-1 pb-2 text-[40px]" />
          Course Material
        </h1>
        <button onClick={() => setIsModalOpen(true)}
          className="absolute font-semibold text-center group right-0 flex items-center mt-5 rounded-2xl w-48 h-12 cursor-pointer border border-[black] bg-[black] group hover:bg-[black] active:bg-[#ddff7d] active:border-[#ddff7d]"
        >
          <div className="bg-[#ddff7d] rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <h1 className="text-[26px] w-8 text-[black] text-center">+</h1>
          </div>
          <p className="translate-x-[4em] text-[#ddff7d]">Add Review</p>
        </button>
      </div>

      {/* Show error message if it exists */}
      {message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
          <span className="block sm:inline">{message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={handleDismissMessage}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 5.652a1 1 0 011.414 0l.003.002a1 1 0 010 1.415l-4.645 4.644a1 1 0 01-1.414 0L5.651 7.067a1 1 0 010-1.414l.002-.003a1 1 0 011.414 0L10 8.293l4.348-4.641z" />
            </svg>
          </span>
        </div>
      )}

      <ul className="bg-white shadow overflow-hidden rounded-[14px] w-full mx-auto mt-11">
        {/* Lessons */}
        {materials.map((material, index) => (
          <li key={index} className="border border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="flex text-lg leading-6 font-medium text-gray-900">
                  <MdPlayLesson className=" mt-1 mr-1" />
                  {material.title} {/* Display material title */}
                </h3>
                <p className="flex mt-1 max-w-2xl text-sm text-gray-500">
                  <BsStopwatchFill className=" mt-1 mr-1" /> {material.duration}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Status: <span className="text-green-600">Active</span>
                </p>
                <button
                  onClick={() => handleViewMaterial(material)} // Open material on click
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 shadow flex justify-center items-center mt-40">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#ddff7d]">Add Your Review</h2>
            <select value={rating} onChange={handleRatingChange} className="w-full p-2 border rounded-lg mb-4">
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very Good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Fair</option>
              <option value={1}>1 - Poor</option>
            </select>
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
      {/* {isModalOpen && (
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
      )} */}

      {/* Material Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 shadow flex justify-center items-center mt-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedMaterial.title}</h2>
            <div>
              {/* Render material based on its type */}
              {selectedMaterial.fileType === 'video' && (
                <video controls className="w-full">
                  <source src={selectedMaterial.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {selectedMaterial.fileType === 'audio' && (
                <audio controls className="w-full">
                  <source src={selectedMaterial.url} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              )}
              {selectedMaterial.fileType === 'application' && (
                <iframe src={selectedMaterial.url} className="w-full h-96" title="PDF Viewer" />
              )}
              {selectedMaterial.fileType === 'image' && (
                <>
                  <img src={selectedMaterial.url} alt={selectedMaterial.title} className="w-full" />
                  <a href={selectedMaterial.url} className="text-blue-600">Download Image</a>
                </>
              )}
              {selectedMaterial.fileType === 'zip' && (
                <a href={selectedMaterial.url} download className="text-blue-600">Download ZIP</a>
              )}
              {selectedMaterial.fileType === 'doc' && (
                <a href={selectedMaterial.url} download className="text-blue-600">Download DOC</a>
              )}
              {selectedMaterial.fileType === 'other' && (
                <a href={selectedMaterial.url} download className="text-blue-600">Download File</a>
              )}
            </div>
            <button
              onClick={() => setSelectedMaterial(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseMat;
