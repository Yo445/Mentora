import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { getToken, getdecodedToken } from "../helper/Storage";

const Card = ({ id, title, date, avatars }) => {
  // const [isInWishlist, setIsInWishlist] = useState(false);

  // useEffect(() => {
  //   // Check if the book is already in the wishlist
  //   const fetchWishlistStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getToken()}`,
  //           },
  //         }
  //       );
  //       // Check if the book is in the wishlist
  //       const inWishlist = response.data.some(
  //         (wishlistBook) => wishlistBook.id === book.id
  //       );
  //       setIsInWishlist(inWishlist);
  //     } catch (err) {
  //       console.error("Error fetching wishlist status:", err);
  //     }
  //   };

  //   fetchWishlistStatus();
  // }, [book.id]);

  // const handleWishlistToggle = async () => {
  //   try {
  //     if (isInWishlist) {
  //       // Remove from wishlist
  //       await axios.delete(
  //         `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}/${book.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getToken()}`,
  //           },
  //         }
  //       );
  //       setIsInWishlist(false);
  //     } else {
  //       // Add to wishlist
  //       await axios.post(
  //         `http://localhost:5000/api/wishlists/addToWishlist`,
  //         {
  //           bookId: book.id,
  //           wishlistId: getdecodedToken().WishlistId,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getToken()}`,
  //           },
  //         }
  //       );
  //       setIsInWishlist(true);
  //     }
  //   } catch (err) {
  //     console.error("Error updating wishlist:", err);
  //   }
  // };

  // const bookImg =
  //   book.coverImage === "https://placehold.co/150x200"
  //     ? book.coverImage
  //     : `/Server/uploads/profile/${book.coverImage}`;

  return (
    <div id={id} className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h3 className="text-gray-800 dark:text-gray-100 leading-7 font-semibold w-11/12">{title}</h3>
      </div>
      <div>
        {avatars && (
          <div className="mb-3 flex items-center flex-no-wrap">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`w-6 h-6 bg-cover rounded-md ${index > 0 ? '-ml-2' : ''}`}
              >
                <img
                  src={avatar}
                  alt={`read by ${index + 1}`}
                  className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <p className="text-sm">{date}</p>
          <button
            className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="edit note"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-pencil"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
