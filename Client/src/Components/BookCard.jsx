import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { getToken, getdecodedToken } from "../helper/Storage";

const BookCard = ({ book, onClick }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the book is already in the wishlist
    const fetchWishlistStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        // Check if the book is in the wishlist
        const inWishlist = response.data.some(
          (wishlistBook) => wishlistBook.id === book.id
        );
        setIsInWishlist(inWishlist);
      } catch (err) {
        console.error("Error fetching wishlist status:", err);
      }
    };

    fetchWishlistStatus();
  }, [book.id]);

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(
          `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}/${book.id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        await axios.post(
          `http://localhost:5000/api/wishlists/addToWishlist`,
          {
            bookId: book.id,
            wishlistId: getdecodedToken().WishlistId,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  const bookImg =
    book.coverImage === "https://placehold.co/150x200"
      ? book.coverImage
      : `/Server/uploads/profile/${book.coverImage}`;

  return (
    <div className="img-container">
      <button
        className="wishlist-btn absolute top-2 right-2 p-2 text-[25px] text-[#ff146d] z-1"
        onClick={handleWishlistToggle}
      >
        {isInWishlist ? <TiHeartFullOutline /> : <TiHeartOutline />}
      </button>
      <div className="img-subcontainer">
        <img
          src={bookImg}
          className="book-img"
          alt={book.title}
          onClick={() => onClick(book)}
        />
      </div>
      <div className="card-content flex">
        <h3 className="booktitle">{book.title}</h3>
        <div className="bookwrapper flex">
          <p className="default">- by </p>
          <p className="author">{book.author}</p>
        </div>
        <p className="genre">{book.genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
