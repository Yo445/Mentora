import React, { useState } from 'react';
import { GoPaperAirplane } from 'react-icons/go';
import { TiStarFullOutline } from 'react-icons/ti';
import { GoZap } from 'react-icons/go';
import { useCourseContext } from '../Context/CourseContext'; // Import useCourseContext from context

const CourseDetails: React.FC = () => {
  const { course } = useCourseContext(); // Get course data from context
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  const handleEnroll = () => {
    if (course) {
      setShowAlert(true); // Show the alert when enrolled
      // You can add more logic like sending a request to enroll the user
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  // Early return if course is not available
  if (!course) {
    return (
      <div className="container mx-auto px-6 py-3">
        <h2 className="text-red-500">No course found. Please select a course.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-3">
      {showAlert && (
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
          <div className="p-6 border-l-4 border-green-500 rounded-r-xl bg-green-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <div className="text-sm text-green-600">
                  <p>You have successfully enrolled in <strong>{course.title}</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-7xl pt-16 sm:pt-24">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
            <div className="space-y-8">
              <div className="space-y-4 bg-black p-4 rounded-[10px]">
                <div className="space-y-2">
                  <div className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full">
                    <GoZap className="mt-1 mr-2" />
                    {course.difficulty}
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#2a2f3f] sm:text-3xl md:text-4xl">
                    <span className="font-extrabold text-[#ddff7d]">{course.title}</span>
                    <br />
                  </h1>
                </div>
                <h3 className="text-xl mt-5 text-white">
                  by <span>{course.instructor}</span>
                </h3>
                <p className="text-base text-[gray] sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {course.description}
                </p>
                <div className="flex items-center space-x-2">
                  <h2 className="text-white">Ratings</h2>
                  <h3 className="text-[#cda400] flex items-center">
                    3.5 <TiStarFullOutline />
                  </h3>
                </div>
              </div>

              <div className="border-t border-gray-700"></div>

              <div className="flex space-x-4 items-center text-white">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <button
                      onClick={handleEnroll}
                      className="flex overflow-hidden ring-[5px] ring-black w-[5.1rem] hover:w-[6.5rem] items-center gap-2 cursor-pointer bg-black text-white px-5 py-2 rounded-full transition-all ease-in-out hover:scale hover:scale-105 font-[revert] active:scale-100 shadow-lg hover:text-[#ddff7d]"
                    >
                      Enroll
                      <GoPaperAirplane fontSize={"22px"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full col-span-6">
            <div className="px-6 h-96 lg:h-100% w-full max-w-2xl col-span-6 flex items-center mx-auto rounded-[10px]">
              <div className="w-[100%] h-[104%] rounded-[10px]">
                <div className="w-[100%] h-[100%] bg-white rounded-[10px] overflow-hidden">
                  <iframe
                    className="rounded-[10px]"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/mr15Xzb1Ook?autoplay=0&mute=0&controls=0"
                    id="widget2"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
