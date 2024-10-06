import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Loader from "../../../Components/Shared/Loader";
import { getAccessToken } from "../../../helper/Storage";

interface Material {
  title: string;
  materialType: string;
  file?: File | null;
  url?: string;
  fileSize?: string;
}

interface CourseData {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  materials: Material[];
  loading: boolean;
  err: string;
  success: string | null;
}

export default function EditCourse() {
  const { id } = useParams();

  const [courseData, setCourseData] = useState<CourseData>({
    _id: "",
    title: "",
    description: "",
    category: "",
    difficulty: "",
    materials: [],
    loading: false,
    err: "",
    success: null,
  });

  // Fetch existing course data
  useEffect(() => {
    setCourseData({ ...courseData, loading: true });
    axios
      .get(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((resp) => {
        const course = resp.data;
        setCourseData({
          ...courseData,
          _id: course._id,
          title: course.title,
          description: course.description,
          category: course.category,
          difficulty: course.difficulty,
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
  }, [id]);

  // Handle input changes for course fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const uploadFileToMinio = async (file: File, i: number) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("materialType", courseData.materials[i].materialType);
    formData.append("title", courseData.materials[i].title);
    formData.append("courseId", courseData._id);

    try {
      const response = await axios.post("http://localhost:5000/api/uploads/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  // Submit updated course
  const updateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseData({ ...courseData, loading: true });

    const updatedMaterials = await Promise.all(
      // i want to pass index to uploadFileToMinio function
      courseData.materials.map(async (material, i) => {
        if (material.file) {
          const url = await uploadFileToMinio(material.file, i);
          return { ...material, url };
        }
        return material;
      })
    );

    axios
      .put(`http://localhost:5000/api/courses/${id}`,
        {
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          difficulty: courseData.difficulty,
          // materials: updatedMaterials,
        },
        {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
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
              
              {/* Course Category */}
            <div className="p-2">
              <select
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
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
              </select>
            </div>
              
              {/* Course Difficulty */}
            <div className="p-2">
              <select
                name="difficulty"
                value={courseData.difficulty}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                required
              >
                <option value="">Select Difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
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
                    <option value="assignment">Assignment</option>
                    <option value="quiz">Quiz</option>
                    <option value="lecture">Lecture</option>
                    <option value="reading">Reading</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Material File Upload */}
                  <input
                    type="file"
                    name="file"
                    className="block w-full rounded-md border-gray-300 shadow-sm mb-2 p-2"
                    onChange={(e) => handleMaterialChange(index, e)}
                  />
                  <button type="button" onClick={() => removeMaterial(index)} className="bg-brown text-white-500"><RiDeleteBinLine className="text-[25px] mr-1 mt-1"/> Remove Material</button>
                </div>
              ))}

              {/* Add Material Button */}
            </div>
            <button type="button" onClick={addMaterial} className="bg-[#2a2f3f] text-[ #c9dcd2] p-2 rounded-md ">Add Material</button>


            {/* Submit Button */}
            <button type="submit" className="bg-[black] text-[#ddff7d] p-2 rounded-md">Update Course</button>
          </form>
        </>
      )}
    </div>
  );
}






//     const formData = new FormData();
//     formData.append("title", courseData.title);
//     formData.append("description", courseData.description);
//     formData.append("category", courseData.category);
//     formData.append("difficulty", courseData.difficulty);
//     courseData.materials.forEach((material, index) => {
//       formData.append(`materials[${index}][title]`, material.title);
//       formData.append(`materials[${index}][materialType]`, material.materialType);
//       if (material.file) {
//         formData.append(`materials[${index}][file]`, material.file);
//       }
//     });
//     console.log('formData entries:');
// formData.forEach((value, key) => {
//   console.log(key, value);
// });
// console.log('formData:', formData.entries());