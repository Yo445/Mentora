import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Shared/Loader";
import { getdecodedToken, getToken } from "../helper/Storage";

const Wishlist = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setWishlistBooks(response.data);
      } catch (err) {
        setError("Something went wrong, please try again later!");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);


  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlists/${getdecodedToken().WishlistId}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setWishlistBooks(wishlistBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError("Failed to remove book from wishlist.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500 justify-center">{error}</p>
      ) : (
        <div className="relative h-[600px] from-indigo-600 via-indigo-700">
          <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0cafa7]">
              Your Wishlist
            </h1>

            {/* Scrollable Table */}
            <div className="shadow-lg rounded-lg overflow-hidden mx-3 md:mx-4 h-[500px] overflow-y-scroll">
              <table className="w-full table-fixed  h-full">
                <thead>
                  <tr className="bg-[#ddd]">
                    <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Book img
                    </th>
                    <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Book title
                    </th>
                    <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Author
                    </th>
                    <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Genre
                    </th>
                    <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white overflow-y-scroll">
                  {wishlistBooks.map((book) => (
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
                          className="bg-red-500 text-white py-2 px-4 rounded text-xs"
                          onClick={() => handleRemoveFromWishlist(book.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
