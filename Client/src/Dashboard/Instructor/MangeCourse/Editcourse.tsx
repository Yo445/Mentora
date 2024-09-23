import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../Components/Shared/Loader";
import { getToken } from "../../../helper/Storage";
import { AiTwotoneEdit } from "react-icons/ai";
import { PiNotePencilDuotone } from "react-icons/pi";
import { TbLayoutGridAdd } from "react-icons/tb";

interface Material {
  title: string;
  materialType: string;
  file?: File | null;
}

interface CourseData {
  title: string;
  description: string;
  instructor: string;
  materials: Material[];
  loading: boolean;
  err: string;
  success: string | null;
}

export default function EditCourse({ courseId }: { courseId: string }) {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    instructor: "",
    materials: [],
    loading: false,
    err: "",
    success: null,
  });

  // Fetch existing course data
  useEffect(() => {
    setCourseData({ ...courseData, loading: true });
    axios
      .get(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        const course = resp.data;
        setCourseData({
          ...courseData,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          materials: course.materials || [],
          loading: false,
        });
      })
      .catch(() => {
        setCourseData({
          ...courseData,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, [courseId]);

  // Handle input changes for course fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle material changes
  const handleMaterialChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedMaterials = [...courseData.materials];

    if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
      updatedMaterials[index] = { ...updatedMaterials[index], file: e.target.files[0] };
    } else {
      updatedMaterials[index] = { ...updatedMaterials[index], [name]: value };
    }

    setCourseData({ ...courseData, materials: updatedMaterials });
  };

  // Add new material field
  const addMaterial = () => {
    setCourseData({
      ...courseData,
      materials: [...courseData.materials, { title: "", materialType: "", file: null }],
    });
  };

  // Remove a material
  const removeMaterial = (index: number) => {
    const updatedMaterials = [...courseData.materials];
    updatedMaterials.splice(index, 1);
    setCourseData({ ...courseData, materials: updatedMaterials });
  };

  // Submit updated course
  const updateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseData({ ...courseData, loading: true });

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("instructor", courseData.instructor);
    courseData.materials.forEach((material, index) => {
      formData.append(`materials[${index}][title]`, material.title);
      formData.append(`materials[${index}][materialType]`, material.materialType);
      if (material.file) {
        formData.append(`materials[${index}][file]`, material.file);
      }
    });

    axios
      .put(`http://localhost:5000/api/courses/${courseId}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(() => {
        setCourseData({
          ...courseData,
          loading: false,
          success: "Course updated successfully",
          err: "",
        });
      })
      .catch(() => {
        setCourseData({
          ...courseData,
          loading: false,
          err: "Failed to update course. Please try again.",
          success: null,
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      {courseData.loading ? (
        <Loader />
      ) : (
        <>
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
            <PiNotePencilDuotone className="mr-1 text-[35px]" />
            Edit Your Course
          </h1>

          <form onSubmit={updateCourse} className="grid grid-cols-1 gap-6">
            {/* Error Alert */}
            {courseData.err && (
              <div className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" role="alert">
                <span>{courseData.err}</span>
                <button
                  onClick={(e) => {
                    const parent = e.currentTarget.parentNode as HTMLElement | null;
                    parent?.remove();
                  }}
                  className="text-red-700 text-[20px]"
                >
                  &times;
                </button>
              </div>
            )}
            {/* Success Alert */}
            {courseData.success && (
              <div className="flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded" role="alert">
                <span>{courseData.success}</span>
                <button
                  onClick={(e) => {
                    const parent = e.currentTarget.parentNode as HTMLElement | null;
                    parent?.remove();
                  }}
                  className="text-red-700 text-[20px]"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Course Title */}
            <div className="p-2">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Course Title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                value={courseData.title}
                onChange={handleChange}
              />
            </div>

            {/* Course Description */}
            <div className="p-2">
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Course Description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                value={courseData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Instructor Info */}
            <div className="p-2">
              <input
                type="text"
                id="instructor"
                name="instructor"
                placeholder="Instructor Name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                value={courseData.instructor}
                onChange={handleChange}
                required
              />
            </div>

            {/* Course Materials */}
            <div>
              <h1 className="text-2xl font-bold text-[black] mb-3 mx-auto flex justify-center">
            <TbLayoutGridAdd className="mr-1 text-[35px]" />
            Course Materials
          </h1>
              {courseData.materials.map((material, index) => (
                <div key={index} className="border p-4 rounded-md mb-4">
                  {/* Material Title */}
                  <input
                    type="text"
                    name="title"
                    placeholder="Material Title"
                    value={material.title}
                    onChange={(e) => handleMaterialChange(index, e)}
                    className="block w-full rounded-md border-gray-300 shadow-sm mb-2 p-2"
                  />
                  {/* Material Type */}
                  <select
                    name="materialType"
                    value={material.materialType}
                    onChange={(e) => handleMaterialChange(index, e)}
                    className="block w-full rounded-md border-gray-300 shadow-sm mb-2 p-2"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                    <option value="zip">ZIP</option>
                    <option value="doc">Document</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Material File Upload */}
                  <input
                    type="file"
                    name="file"
                    className="block w-full rounded-md border-gray-300 shadow-sm mb-2 p-2"
                    onChange={(e) => handleMaterialChange(index, e)}
                  />
                  <button type="button" onClick={() => removeMaterial(index)} className="text-red-500">Remove Material</button>
                </div>
              ))}

              {/* Add Material Button */}
            </div>
            <button type="button" onClick={addMaterial} className="bg-green-500 text-white p-2 rounded-md ">Add Material</button>


            {/* Submit Button */}
            
              <button type="submit" className="bg-[black] text-[#ddff7d] p-2 rounded-md">Update Course</button>
            
          </form>
        </>
      )}
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "../../../Components/Shared/Loader";
// import { getToken } from "../../../helper/Storage";
// import { PiNotePencilDuotone } from "react-icons/pi";

// // Define TypeScript types for form data and component state
// interface CourseData {
//   title: string;
//   description: string;
//   instructor: string;
//   loading: boolean;
//   err: string;
//   success: string | null;
// }

// export default function Editcourse() {
//   const [courseData, setCourseData] = useState<CourseData>({
//     title: "",
//     description: "",
//     instructor: "",
//     loading: false,
//     err: "",
//     success: null,
//   });

//   // Get Courses (if needed in the future)
//   useEffect(() => {
//     setCourseData({ ...courseData, loading: true });
//     axios
//       .get("http://localhost:5000/api/courses/", {
//         headers: {
//           Authorization: `Bearer ${getToken()}`,
//         },
//       })
//       .then((resp) => {
//         setCourseData({ ...courseData, loading: false });
//       })
//       .catch(() => {
//         setCourseData({
//           ...courseData,
//           loading: false,
//           err: "Something went wrong, please try again later!",
//         });
//       });
//   }, []); //courseData.reload

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setCourseData({ ...courseData, [name]: value });
//   };

//   // Submit new course
//   const createCourse = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setCourseData({ ...courseData, loading: true });

//     axios
//       .post(
//         "http://localhost:5000/api/courses/",
//         {
//           title: courseData.title,
//           description: courseData.description,
//           instructor: courseData.instructor,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       )
//       .then(() => {
//         setCourseData({
//           ...courseData,
//           title: "",
//           description: "",
//           instructor: "",
//           loading: false,
//           success: "Course added successfully",
//           err: "",
//         });
//       })
//       .catch(() => {
//         setCourseData({
//           ...courseData,
//           loading: false,
//           err: "Failed to add course. Please try again.",
//           success: null,
//         });
//       });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {courseData.loading ? (
//         <Loader  />
//       ) : (
//         <>
//           {/* Page Title */}
//           <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
//             <PiNotePencilDuotone className="mr-1  text-[35px]" />
//             Update Course
//           </h1>

//           <form onSubmit={createCourse} className="grid grid-cols-1 gap-6">
//             {/* Error Alert */}
//             {courseData.err && (
//               <div
//               className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded"
//               role="alert"
//             >
//               <span>{courseData.err}</span>
//               <button
//                 onClick={(e) => {
//                   const parent = e.currentTarget
//                     .parentNode as HTMLElement | null;
//                   parent?.remove();
//                 }}
//                 className="text-red-700 text-[20px]"
//               >
//                 &times;
//               </button>
//             </div>
//             )}
//             {/* Success Alert */}
//             {courseData.success && (
//               <div
//                 className="flex inline-flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded"
//                 role="alert"
//               >
//                 <span className="block sm:inline pl-2">{courseData.success}</span>
//                 <button
//                 onClick={(e) => {
//                   const parent = e.currentTarget
//                     .parentNode as HTMLElement | null;
//                   parent?.remove();
//                 }}
//                 className="text-red-700 text-[20px]"
//               >
//                 &times;
//               </button>
//               </div>
//             )}

//             {/* Course Title */}
//             <div className="p-2">
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="Course Title"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
//                 style={{ backgroundColor: "#f6f6f6" }}
//                 value={courseData.title}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Course Description */}
//             <div className="p-2">
//               <textarea
//                 id="description"
//                 name="description"
//                 rows={5}
//                 placeholder="Course Description"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
//                 style={{ backgroundColor: "#f6f6f6" }}
//                 value={courseData.description}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             {/* Instructor Info */}
//             <div className="p-2">
//               <input
//                 type="text"
//                 id="instructor"
//                 name="instructor"
//                 placeholder="Instructor Name"
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
//                 style={{ backgroundColor: "#f6f6f6" }}
//                 value={courseData.instructor}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="p-2">
//               <button
//                 type="submit"
//                 className="block w-full bg-[#20b2aa] hover:bg-[#15635f] text-white font-bold py-3 px-4 rounded-full"
//               >
//                 Add Course
//               </button>
//             </div>
//           </form>
//         </>
//       )}
//     </div>
//   );
// }