import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdReviews } from "react-icons/md";
import Loader from "../../Components/Shared/Loader";

interface Review {
  email: string;
  message: string;
}

interface Course {
  id: string;
  name: string;
  reviews: Review[];
}

const StudentReviews: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(true); // State to manage alert visibility

  // Fetch courses and their reviews
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await axios.get("/api/courses");
        const coursesData: Course[] = await Promise.all(
          coursesResponse.data.map(async (course: Course) => {
            const reviewsResponse = await axios.get(`/api/courses/${course.id}/reviews`);
            return {
              ...course,
              reviews: reviewsResponse.data,
            };
          })
        );
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses or reviews.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const hasReviews = courses.some(course => course.reviews.length > 0);

  return (
    <>
      {/* Alert for no reviews */}
      {!hasReviews && showAlert && (
        <div className="mt-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Note:</strong>
          <span className="block sm:inline"> There are no reviews available.</span>
          <button
            onClick={() => setShowAlert(false)} // Dismiss alert
            className="absolute top-0 right-0 px-4 py-3 text-red-500 font-bold text-xl"
          >
            x
          </button>
        </div>
      )}

      <div className="relative flex items-center justify-center mt-4">
        <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
          <MdReviews className="mr-1 text-[35px]" />
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
              Review Message
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <React.Fragment key={course.id}>
              {course.reviews.map((review, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">{review.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[coral]">{review.message}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StudentReviews;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdReviews } from "react-icons/md";
// import Loader from "../../Components/Shared/Loader";

// interface Review {
//   email: string;
//   message: string;
// }

// interface Course {
//   id: string;
//   name: string;
//   reviews: Review[];
// }

// const StudentReviews: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch courses and their reviews
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const coursesResponse = await axios.get("/api/courses");
//         const coursesData: Course[] = await Promise.all(
//           coursesResponse.data.map(async (course: Course) => {
//             const reviewsResponse = await axios.get(`/api/courses/${course.id}/reviews`);
//             return {
//               ...course,
//               reviews: reviewsResponse.data,
//             };
//           })
//         );
//         setCourses(coursesData);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch courses or reviews.");
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <div className="relative flex items-center justify-center mt-4">
//         <h1 className="absolute flex font-bold tracking-tight text-[#2a2f3f] sm:text-2xl md:text-3xl mt-3">
//           <MdReviews className="mr-1 text-[35px]" />
//           Students Reviews
//         </h1>
//       </div>

//       <table className="min-w-full divide-y divide-gray-200 mt-20">
//         <thead>
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Course Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Student Email
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Review Message
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {courses.map((course) => (
//             <div key={course.id}>
//               {course.reviews.map((review, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap text-[darkcyan]">{course.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[darkmagenta]">{review.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-[coral]">{review.message}</td>
//                 </tr>
//               ))}
//             </div>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default StudentReviews;
