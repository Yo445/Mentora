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
    <div className="flex flex-col w-fit mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12 lg:pb-8 lg:pt-10">
      <div className="bg-[black] rounded-[26px] w-fit mx-auto flex flex-col justify-center gap-y-4">
        <div className="w-full flex flex-col justify-between gap-y-5 max-w-[25rem] mx-auto p-2 rounded-[22px]">
          <div className="flex flex-col gap-y-2 rounded-[22px] bg-[#aeca9e] w-[15em] h-[200px] p-4"  >
             {/* #a1c0b0 
             #9eb796
            #aeca9e

             */}
          <h4 className="text-2xl font-bold text-black  lg:text-left">Professional UI/UX Design Service</h4>
          </div>
          <div className="flex flex-col gap-y-2">
            {/* <h4 className="text-2xl font-bold text-black  lg:text-left">Professional UI/UX Design Service</h4> */}
            {/* <p className="text-black dark:text-white text-sm lg:text-left">Our expert designers craft stunning user
              interfaces and seamless experiences tailored to your needs.</p> */}
            <button className="flex item-start bg-[#2a2f3f] text-[#ddff7d] w-fit px-5 py-1 rounded-full">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
export default Card;
