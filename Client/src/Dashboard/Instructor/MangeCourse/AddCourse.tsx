import axios from "axios";
import React, { useState } from "react";
import { AiTwotoneFileAdd } from "react-icons/ai";
import { TbLayoutGridAdd } from "react-icons/tb";
import Loader from "../../../Components/Shared/Loader";
import { getAccessToken } from "../../../helper/Storage";

interface Material {
  title: string;
  materialType: string;
  file: File | null;
  uploadedUrl?: string;
}

interface CourseData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  materials: Material[];
  loading: boolean;
  err: string;
  success: string | null;
}

export default function AddCourse() {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    materials: [],
    loading: false,
    err: "",
    success: null,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle adding materials
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

  // Add new empty material entry
  const addMaterial = () => {
    setCourseData({
      ...courseData,
      materials: [...courseData.materials, { title: "", materialType: "", file: null }],
    });
  };

  // Upload material function
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
    const successfulUploads = uploadedMaterials.filter((material) => material.uploadedUrl !== null);

    // Send the course data as JSON
    const coursePayload = {
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      difficulty: courseData.difficulty,
      materials: successfulUploads.map((material) => ({
        title: material.title,
        materialType: material.materialType,
        uploadedUrl: material.uploadedUrl,
      })),
    };

    try {
      await axios.post("http://localhost:5000/api/courses", coursePayload, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      setCourseData({
        ...courseData,
        title: "",
        description: "",
        category: "",
        difficulty: "",
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

            <select
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="p-2 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="DevOps">DevOps</option>
              <option value="Other">Other</option>
              {/* More options */}
            </select>

            <select
              name="difficulty"
              value={courseData.difficulty}
              onChange={handleChange}
              className="p-2 rounded-md"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

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
                  {/* More options */}
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
// import { getAccessToken } from "../../../helper/Storage";

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
//   category: string;
//   difficulty: string;
//   materials: Material[];
//   loading: boolean;
//   err: string;
//   success: string | null;
// }

// export default function AddCourse() {
//   const [courseData, setCourseData] = useState<CourseData>({
//     title: "",
//     description: "",
//     category: "",
//     difficulty: "",
//     materials: [],
//     loading: false,
//     err: "",
//     success: null,
//   });

//   // Handle input change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
//     } else {
//       console.error("No file attached to upload.");
//       return null;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/uploads", formData, {
//         headers: {
//           Authorization: Bearer ${getAccessToken()},
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
//     const uploadedMaterials = await Promise.all(
//       courseData.materials.map(async (material) => {
//         const uploadedUrl = await uploadMaterial(material);
//         return { ...material, uploadedUrl };
//       })
//     );

//     // Filter out failed uploads (if any)
//     const successfulUploads = uploadedMaterials.filter(
//       (material) => material.uploadedUrl !== null
//     );

//     // Prepare the course form data
//     const formData = new FormData();
//     formData.append("title", courseData.title);
//     formData.append("description", courseData.description);
//     formData.append("category", courseData.category);
//     formData.append("difficulty", courseData.difficulty);

//     // Append successful material URLs to FormData
//     successfulUploads.forEach((material, index) => {
//       formData.append(materials[${index}][title], material.title);
//       formData.append(materials[${index}][materialType], material.materialType);
//       formData.append(materials[${index}][uploadedUrl], material.uploadedUrl!);
//     });

//     try {
//       await axios.post("http://localhost:5000/api/courses/", {
//         title: courseData.title,
//         description: courseData.description,
//         category: courseData.category,
//         difficulty: courseData.difficulty,
//       }, {
//         headers: {
//           Authorization: Bearer ${getAccessToken()}
//         },
//       });

//       setCourseData({
//         ...courseData,
//         title: "",
//         description: "",
//         category: "",
//         difficulty: "",
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


//             <select
//               id="category"
//               name="category"
//               value={courseData.category}
//               onChange={handleChange}
//               className="p-2 rounded-md"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Web Development">Web Development</option>
//               <option value="Mobile Development">Mobile Development</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Machine Learning">Machine Learning</option>
//               <option value="Artificial Intelligence">Artificial Intelligence</option>
//               <option value="Blockchain">Blockchain</option>
//               <option value="Cybersecurity">Cybersecurity</option>
//               <option value="Cloud Computing">Cloud Computing</option>
//               <option value="DevOps">DevOps</option>
//               <option value="Other">Other</option>
//             </select>

//             <select
//               name="difficulty"
//               value={courseData.difficulty}
//               onChange={handleChange}
//               className="p-2 rounded-md"
//               required
//             >
//               <option value="">Select Difficulty</option>
//               <option value="beginner">Beginner</option>
//               <option value="intermediate">Intermediate</option>
//               <option value="advanced">Advanced</option>
//             </select>



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