/* profile */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getdecodedToken, getToken } from "../helper/Storage";

export default function Profile({}) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const userId = getdecodedToken().id;

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/borrows/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, [userId]);

  const handleRelease = async (borrowId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/borrows/${borrowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      // setBorrowedBooks(borrowedBooks.filter(borrow => borrow.id !== borrowId));
      setBorrowedBooks(
        borrowedBooks.filter(({ borrowId: id }) => id !== borrowId)
      );

      // alert("Book released successfully!");
    } catch (error) {
      console.error("Error releasing book:", error);
      alert("Error releasing book. Please try again.");
    }
  };


  return (
    <section className="w-full overflow-hidden dark:bg-gray-900 rounded-[26px]">
      <div className="w-full mx-auto bg-[#c5e0dd]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%">
          <rect fill="#ffffff" width="540" height="450" />
          <defs>
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2="100%"
              gradientTransform="rotate(222,648,379)"
            >
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#0cafa7" />
            </linearGradient>
            <pattern
              patternUnits="userSpaceOnUse"
              id="b"
              width="300"
              height="250"
              x="0"
              y="0"
              viewBox="0 0 1080 900"
            >
              <g fillOpacity="0.5">
                <polygon fill="#444" points="90 150 0 300 180 300" />
                <polygon points="90 150 180 0 0 0" />
                <polygon fill="#AAA" points="270 150 360 0 180 0" />
                <polygon fill="#DDD" points="450 150 360 300 540 300" />
                <polygon fill="#999" points="450 150 540 0 360 0" />
                <polygon points="630 150 540 300 720 300" />
                <polygon fill="#DDD" points="630 150 720 0 540 0" />
                <polygon fill="#444" points="810 150 720 300 900 300" />
                <polygon fill="#FFF" points="810 150 900 0 720 0" />
                <polygon fill="#DDD" points="990 150 900 300 1080 300" />
                <polygon fill="#444" points="990 150 1080 0 900 0" />
                <polygon fill="#DDD" points="90 450 0 600 180 600" />
                <polygon points="90 450 180 300 0 300" />
                <polygon fill="#666" points="270 450 180 600 360 600" />
                <polygon fill="#AAA" points="270 450 360 300 180 300" />
                <polygon fill="#DDD" points="450 450 360 600 540 600" />
                <polygon fill="#999" points="450 450 540 300 360 300" />
                <polygon fill="#999" points="630 450 540 600 720 600" />
                <polygon fill="#FFF" points="630 450 720 300 540 300" />
                <polygon points="810 450 720 600 900 600" />
                <polygon fill="#DDD" points="810 450 900 300 720 300" />
                <polygon fill="#AAA" points="990 450 900 600 1080 600" />
                <polygon fill="#444" points="990 450 1080 300 900 300" />
                <polygon fill="#222" points="90 750 0 900 180 900" />
                <polygon points="270 750 180 900 360 900" />
                <polygon fill="#DDD" points="270 750 360 600 180 600" />
                <polygon points="450 750 540 600 360 600" />
                <polygon points="630 750 540 900 720 900" />
                <polygon fill="#444" points="630 750 720 600 540 600" />
                <polygon fill="#AAA" points="810 750 720 900 900 900" />
                <polygon fill="#666" points="810 750 900 600 720 600" />
                <polygon fill="#999" points="990 750 900 900 1080 900" />
                <polygon fill="#999" points="180 0 90 150 270 150" />
                <polygon fill="#444" points="360 0 270 150 450 150" />
                <polygon fill="#FFF" points="540 0 450 150 630 150" />
                <polygon points="900 0 810 150 990 150" />
                <polygon fill="#222" points="0 300 -90 450 90 450" />
                <polygon fill="#FFF" points="0 300 90 150 -90 150" />
                <polygon fill="#FFF" points="180 300 90 450 270 450" />
                <polygon fill="#666" points="180 300 270 150 90 150" />
                <polygon fill="#222" points="360 300 270 450 450 450" />
                <polygon fill="#FFF" points="360 300 450 150 270 150" />
                <polygon fill="#444" points="540 300 450 450 630 450" />
                <polygon fill="#222" points="540 300 630 150 450 150" />
                <polygon fill="#AAA" points="720 300 630 450 810 450" />
                <polygon fill="#666" points="720 300 810 150 630 150" />
                <polygon fill="#FFF" points="900 300 810 450 990 450" />
                <polygon fill="#999" points="900 300 990 150 810 150" />
                <polygon points="0 600 -90 750 90 750" />
                <polygon fill="#666" points="0 600 90 450 -90 450" />
                <polygon fill="#AAA" points="180 600 90 750 270 750" />
                <polygon fill="#444" points="180 600 270 450 90 450" />
                <polygon fill="#444" points="360 600 270 750 450 750" />
                <polygon fill="#999" points="360 600 450 450 270 450" />
                <polygon fill="#666" points="540 600 630 450 450 450" />
                <polygon fill="#222" points="720 600 630 750 810 750" />
                <polygon fill="#FFF" points="900 600 810 750 990 750" />
                <polygon fill="#222" points="900 600 990 450 810 450" />
                <polygon fill="#DDD" points="0 900 90 750 -90 750" />
                <polygon fill="#444" points="180 900 270 750 90 750" />
                <polygon fill="#FFF" points="360 900 450 750 270 750" />
                <polygon fill="#AAA" points="540 900 630 750 450 750" />
                <polygon fill="#FFF" points="720 900 810 750 630 750" />
                <polygon fill="#222" points="900 900 990 750 810 750" />
                <polygon fill="#222" points="1080 300 990 450 1170 450" />
                <polygon fill="#FFF" points="1080 300 1170 150 990 150" />
                <polygon points="1080 600 990 750 1170 750" />
                <polygon fill="#666" points="1080 600 1170 450 990 450" />
                <polygon fill="#DDD" points="1080 900 1170 750 990 750" />
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" fill="url(#a)" width="100%" height="100%" />
          <rect x="0" y="0" fill="url(#b)" width="100%" height="100%" />
        </svg>
        <div className="w-full mx-auto flex justify-center">
          <img
            src="https://avatar.iran.liara.run/public/20"
            alt="User Profile"
            className="rounded-full object-cover xl:w-[10rem] xl:h-[10rem] lg:w-[10rem] lg:h-[10rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[6rem] xs:h-[6rem] outline outline-2 outline-offset-2 outline-[#befffc] shadow-xl relative top-[-5rem]"
          />
        </div>
        <div className="h-[350px] w-full flex gap-4 justify-center items-center ">
          <div className="from-indigo-600 via-indigo-700 ">
            <div className="flex flex-col gap-4 justify-center items-center w-full  top-[-20]">
              <h1 className="text-1xl md:text-3xl font-bold text-[deeppink]">
                Your Borrowed Books
              </h1>
              {/* Borrowed books table */}
<div className="shadow-lg rounded-lg overflow-hidden mx-3 md:mx-4 h-[300px] overflow-y-scroll mb-5">
              <table className="w-full table-fixed  h-[300px]">
                <thead>
                  <tr className="bg-[#ddd]">
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Book img
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Book title
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Author
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Genre
                      </th>
                      <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {borrowedBooks.map(({ borrowId, book }) => (
                      <tr key={book.id}>
                        <td className="py-4 px-6 border-b border-gray-200">
                        <img
                          src={
                            book.coverImage === "https://placehold.co/150x200"
                              ? book.coverImage
                              : `/Server/uploads/profile/${book.coverImage}`
                          }
                          alt="Book Cover"
                          className="w-16 h-24 object-cover"
                        />
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {book.title}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          {book.author}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          {book.genre}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          <button
                            className="bg-red-500 text-white py-2 px-8 rounded-[5px] text-xs"
                            onClick={() => handleRelease(borrowId)}
                          >
                            Release
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
