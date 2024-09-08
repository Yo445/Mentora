import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { BiSolidImageAdd } from "react-icons/bi";
import { Alert } from "react-bootstrap";
import { getAuthUser, getToken } from "../helper/Storage";
import axios from "axios";
import Loader from "../Components/Shared/Loader";

export default function AddBook() {
  const [bookData, setBookData] = useState({
    loading: false,
    title: "",
    description: "",
    genre: "",
    author: "",
    err: "",
    success: null,
    reload: false,
  });
  const coverImage = useRef(null);

  // Get Books
  useEffect(() => {
    setBookData({ ...bookData, loading: true });
    axios
      .get("http://localhost:5000/api/books/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((resp) => {
        setBookData({ ...bookData, results: resp.data, loading: false });
      })
      .catch(() => {
        setBookData({
          title: "",
          description: "",
          genre: "",
          author: "",
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, []);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Create Book on Submit
  const createBook = (e) => {
    e.preventDefault();
    setBookData({ ...bookData, loading: true });
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("description", bookData.description);
    formData.append("genre", bookData.genre);
    formData.append("author", bookData.author);

    if (coverImage.current && coverImage.current.files && coverImage.current.files[0]) {
      formData.append("coverImage", coverImage.current.files[0]);
    }

    axios
      .post("http://localhost:5000/api/books/", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setBookData({ ...bookData, success: "Book Added Successfully" });
        if (coverImage.current) {
          coverImage.current.value = ""; // Clear the input value
        }
      })
      .catch(() => {
        setBookData({
          ...bookData,
          success: null,
          err: "Something went wrong, please try again later!",
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      {bookData.loading ? (
        <Loader />
      ) : (
        <>
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-[black] mb-6 mx-auto flex justify-center">
            Add Your Book
          </h1>

          <form onSubmit={createBook} className="grid grid-cols-1 gap-6">
            {/* Error Alert */}
            {bookData.err && (
              <div
                className="flex inline-flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded"
                role="alert"
              >
                <span className="block sm:inline pl-2">{bookData.err}</span>
                <span
                  className="inline"
                  onClick={(e) => e.currentTarget.parentNode.remove()}
                >
                  <svg
                    className="fill-current h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {/* Success Alert */}
            {bookData.success && (
              <div
                className="flex inline-flex justify-between bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 my-2 rounded"
                role="alert"
              >
                <span className="block sm:inline pl-2">{bookData.success}</span>
                <span
                  className="inline"
                  onClick={(e) => e.currentTarget.parentNode.remove()}
                >
                  <svg
                    className="fill-current h-6 w-6"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {/* Title */}
            <div className="p-2">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Book Title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                style={{ backgroundColor: "#f6f6f6" }}
                value={bookData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Book Description"
                  className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                  style={{ backgroundColor: "#f6f6f6" }}
                  onChange={handleChange}
                  value={bookData.description}
                ></textarea>
              </div>

              {/* Book Img Upload */}
              <div>
                <label
                  htmlFor="img"
                  className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                      <BiSolidImageAdd fontSize={"100px"} />
                    </div>
                    <p className="text-gray-500">
                      Choose or drag book image here
                    </p>
                    <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
                  </div>
                </label>
                <input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  ref={coverImage}
                />
              </div>
            </div>

            <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Author Name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                  style={{ backgroundColor: "#f6f6f6" }}
                  onChange={handleChange}
                  value={bookData.author}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  placeholder="Genre"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                  style={{ backgroundColor: "#f6f6f6" }}
                  onChange={handleChange}
                  value={bookData.genre}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-2">
              <button
                type="submit"
                className="block w-full bg-[#20b2aa] hover:bg-[#15635f] text-white font-bold py-3 px-4 rounded-full"
              >
                Add Book
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
