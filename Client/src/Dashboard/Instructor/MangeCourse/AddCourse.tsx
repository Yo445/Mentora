import axios from "axios";
import React, { useState } from "react";
import { AiTwotoneFileAdd } from "react-icons/ai";
import { TbLayoutGridAdd } from "react-icons/tb";
import Loader from "../../../Components/Shared/Loader";
import { getAccessToken, getAuthUser } from "../../../helper/Storage";

// Define types for course material and state
interface Material {
  title: string;
  materialType: string;
  file: File | null;
  uploadedUrl?: string; // Add uploaded URL to track the uploaded material
}

interface CourseData {
  title: string;
  description: string;
  instructorId: string; // Changed to instructorId
  materials: Material[];
  loading: boolean;
  err: string;
  success: string | null;
}

export default function AddCourse() {
  const auth = getAuthUser();
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    instructorId: auth ? auth.id : "", // Store instructor ID directly
    materials: [],
    loading: false,
    err: "",
    success: null,
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle adding materials
  const handleMaterialChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedMaterials = [...courseData.materials];

    if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
      updatedMaterials[index] = { ...updatedMaterials[index], file: e.target.files[0] };
    } else {
      updatedMaterials[index] = { ...updatedMaterials[index], [name]: value };
    }

    setCourseData({ ...courseData, materials: updatedMaterials });
  };

  // Add new empty material entry
  const addMaterial = () => {
    setCourseData({
      ...courseData,
      materials: [...courseData.materials, { title: "", materialType: "", file: null }],
    });
  };

  // Function to upload material
  const uploadMaterial = async (material: Material): Promise<string | null> => {
    const formData = new FormData();
    formData.append("title", material.title);
    formData.append("materialType", material.materialType);
    if (material.file) {
      formData.append("file", material.file);
    } else {
      console.error("No file attached to upload.");
      return null;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/uploads", formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.uploadedUrl; // Assuming the API returns the URL of the uploaded material
    } catch (error) {
      console.error("Failed to upload material:", error);
      return null;
    }
  };

  // Submit the form and upload course
  const createCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseData({ ...courseData, loading: true });

    // Upload each material first
    const uploadedMaterials = await Promise.all(
      courseData.materials.map(async (material) => {
        const uploadedUrl = await uploadMaterial(material);
        return { ...material, uploadedUrl };
      })
    );

    // Filter out failed uploads (if any)
    const successfulUploads = uploadedMaterials.filter(
      (material) => material.uploadedUrl !== null
    );

    // Prepare the course form data
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("instructorId", courseData.instructorId); // Append instructor ID directly

    // Append successful material URLs to FormData
    successfulUploads.forEach((material, index) => {
      formData.append(`materials[${index}][title]`, material.title);
      formData.append(`materials[${index}][materialType]`, material.materialType);
      formData.append(`materials[${index}][uploadedUrl]`, material.uploadedUrl!);
    });

    try {
      await axios.post("http://localhost:5000/api/courses/", formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCourseData({
        ...courseData,
        title: "",
        description: "",
        instructorId: auth?.id || "",
        materials: [],
        loading: false,
        success: "Course added successfully",
        err: "",
      });
    } catch (error) {
      setCourseData({
        ...courseData,
        loading: false,
        err: "Failed to add course. Please try again.",
        success: null,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {courseData.loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
            <AiTwotoneFileAdd className="mr-1 text-[35px]" />
            Add Your Course
          </h1>

          <form onSubmit={createCourse} className="grid grid-cols-1 gap-6">
            {courseData.err && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {courseData.err}
              </div>
            )}

            {courseData.success && (
              <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded">
                {courseData.success}
              </div>
            )}

            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={courseData.title}
              onChange={handleChange}
              className="p-2 rounded-md"
              required
            />

            <textarea
              name="description"
              rows={5}
              placeholder="Course Description"
              value={courseData.description}
              onChange={handleChange}
              className="p-2 rounded-md"
              required
            />

            <h1 className="text-2xl font-bold text-[black] mb-3 mx-auto flex justify-center">
              <TbLayoutGridAdd className="mr-1 text-[35px]" />
              Course Materials
            </h1>

            {courseData.materials.map((material, index) => (
              <div key={index} className="material-section">
                <input
                  type="text"
                  name="title"
                  placeholder="Material Title"
                  value={material.title}
                  onChange={(e) => handleMaterialChange(index, e)}
                  className="p-2 rounded-md"
                  required
                />

                <select
                  name="materialType"
                  value={material.materialType}
                  onChange={(e) => handleMaterialChange(index, e)}
                  className="p-2 rounded-md ml-3"
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

                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleMaterialChange(index, e)}
                  className="p-2 rounded-md"
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addMaterial}
              className="p-2 rounded-md bg-[#2a2f3f] text-[#c9dcd2]"
            >
              Add More Materials
            </button>

            <button type="submit" className="bg-[black] text-[#ddff7d] p-2 rounded-md">
              Add Course
            </button>
          </form>
        </>
      )}
    </div>
  );
}


// import axios from "axios";
// import React, { useState } from "react";
// import { AiTwotoneFileAdd } from "react-icons/ai";
// import { TbLayoutGridAdd } from "react-icons/tb";
// import Loader from "../../../Components/Shared/Loader";
// import { getAccessToken, getAuthUser } from "../../../helper/Storage";

// // Define types for course material and state
// interface Material {
//   title: string;
//   materialType: string;
//   file: File | null;
//   uploadedUrl?: string; // Add uploaded URL to track the uploaded material
// }

// interface CourseData {
//   title: string;
//   description: string;
//   instructor: {
//     id: string;
//   };
//   materials: Material[];
//   loading: boolean;
//   err: string;
//   success: string | null;
// }

// export default function AddCourse() {
//   const auth = getAuthUser();
//   const [courseData, setCourseData] = useState<CourseData>({
//     title: "",
//     description: "",
//     instructor: { id: auth ? auth.id : "" },
//     materials: [],
//     loading: false,
//     err: "",
//     success: null,
//   });

//   // Handle input change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setCourseData({ ...courseData, [name]: value });
//   };

//   // Handle adding materials
//   const handleMaterialChange = (
//     index: number,
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     const updatedMaterials = [...courseData.materials];

//     if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
//       updatedMaterials[index] = { ...updatedMaterials[index], file: e.target.files[0] };
//     } else {
//       updatedMaterials[index] = { ...updatedMaterials[index], [name]: value };
//     }

//     setCourseData({ ...courseData, materials: updatedMaterials });
//   };

//   // Add new empty material entry
//   const addMaterial = () => {
//     setCourseData({
//       ...courseData,
//       materials: [...courseData.materials, { title: "", materialType: "", file: null }],
//     });
//   };

//   // Function to upload material
//   const uploadMaterial = async (material: Material): Promise<string | null> => {
//     const formData = new FormData();
//     formData.append("title", material.title);
//     formData.append("materialType", material.materialType);
//     if (material.file) {
//       formData.append("file", material.file);
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/uploads", formData, {
//         headers: {
//           Authorization: `Bearer ${getAccessToken()}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data.uploadedUrl; // Assuming the API returns the URL of the uploaded material
//     } catch (error) {
//       console.error("Failed to upload material:", error);
//       return null;
//     }
//   };

//   // Submit the form and upload course
//   const createCourse = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setCourseData({ ...courseData, loading: true });

//     // Upload each material first
//     // const uploadedMaterials = await Promise.all(
//     //   courseData.materials.map(async (material) => {
//     //     const uploadedUrl = await uploadMaterial(material);
//     //     return { ...material, uploadedUrl };
//     //   })
//     // );

//     // Filter out failed uploads (if any)
//     // const successfulUploads = uploadedMaterials.filter(
//     //   (material) => material.uploadedUrl !== null
//     // );

//     // Create course without uploading materials directly
//     const formData = new FormData();
//     formData.append("title", courseData.title);
//     formData.append("description", courseData.description);
//     formData.append("instructor", courseData.instructor.id);

//     // // Append successful material URLs to FormData
//     // successfulUploads.forEach((material, index) => {
//     //   formData.append(`materials[${index}][title]`, material.title);
//     //   formData.append(`materials[${index}][materialType]`, material.materialType);
//     //   formData.append(`materials[${index}][uploadedUrl]`, material.uploadedUrl!);
//     // });

//     try {
//       await axios.post("http://localhost:5000/api/courses/", formData, {
//         headers: {
//           Authorization: `Bearer ${getAccessToken()}`,
//           // "Content-Type": "multipart/form-data",
//         },
//       });

//       setCourseData({
//         ...courseData,
//         title: "",
//         description: "",
//         instructor: { id: auth?.id || "" },
//         materials: [],
//         loading: false,
//         success: "Course added successfully",
//         err: "",
//       });
//     } catch (error) {
//       setCourseData({
//         ...courseData,
//         loading: false,
//         err: "Failed to add course. Please try again.",
//         success: null,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {courseData.loading ? (
//         <Loader />
//       ) : (
//         <>
//           <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
//             <AiTwotoneFileAdd className="mr-1 text-[35px]" />
//             Add Your Course
//           </h1>

//           <form onSubmit={createCourse} className="grid grid-cols-1 gap-6">
//             {courseData.err && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {courseData.err}
//               </div>
//             )}

//             {courseData.success && (
//               <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded">
//                 {courseData.success}
//               </div>
//             )}

//             <input
//               type="text"
//               name="title"
//               placeholder="Course Title"
//               value={courseData.title}
//               onChange={handleChange}
//               className="p-2 rounded-md"
//               required
//             />

//             <textarea
//               name="description"
//               rows={5}
//               placeholder="Course Description"
//               value={courseData.description}
//               onChange={handleChange}
//               className="p-2 rounded-md"
//               required
//             />

//             <h1 className="text-2xl font-bold text-[black] mb-3 mx-auto flex justify-center">
//               <TbLayoutGridAdd className="mr-1 text-[35px]" />
//               Course Materials
//             </h1>

//             {courseData.materials.map((material, index) => (
//               <div key={index} className="material-section">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Material Title"
//                   value={material.title}
//                   onChange={(e) => handleMaterialChange(index, e)}
//                   className="p-2 rounded-md"
//                   required
//                 />

//                 <select
//                   name="materialType"
//                   value={material.materialType}
//                   onChange={(e) => handleMaterialChange(index, e)}
//                   className="p-2 rounded-md ml-3"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="video">Video</option>
//                   <option value="audio">Audio</option>
//                   <option value="pdf">PDF</option>
//                   <option value="image">Image</option>
//                   <option value="zip">ZIP</option>
//                   <option value="doc">Document</option>
//                   <option value="other">Other</option>
//                 </select>

//                 <input
//                   type="file"
//                   name="file"
//                   onChange={(e) => handleMaterialChange(index, e)}
//                   className="p-2 rounded-md"
//                   required
//                 />
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addMaterial}
//               className="p-2 rounded-md bg-[#2a2f3f] text-[#c9dcd2]"
//             >
//               Add More Materials
//             </button>

//             <button type="submit" className="bg-[black] text-[#ddff7d] p-2 rounded-md">
//               Add Course
//             </button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// }
