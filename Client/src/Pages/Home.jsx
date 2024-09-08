import React, { useState, useEffect } from "react";
import BookCard from "../Components/BookCard";
import BookDetails from "../Components/BookDetails";
import "../App.css";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import Loader from "../Components/Shared/Loader";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState(getAuthUser());

  const [books, setBooks] = useState({
    loading: false,
    results: [],
    err: "",
    reload: false,
  });

  useEffect(() => {
    const fetchBooks = () => {
      if (getAuthUser()) {
        setUserEmail(getAuthUser());
      } else {
        console.error("User is not authenticated or email is missing.");
        return;
      }

      setBooks({ ...books, loading: true });
      axios
        .get("http://localhost:5000/api/books/", {
          params: { searchTerm: "" },
        })
        .then((resp) => {
          setBooks({ ...books, results: resp.data, loading: false });
        })
        .catch((err) => {
          setBooks({
            ...books,
            loading: false,
            err: "Something went wrong, please try again later!",
          });
        });
    };

    fetchBooks();
  }, [books.reload]); // Trigger when 'reload' changes

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.results.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-body">
      {books.loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center mt-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-1/2"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {!getAuthUser() && (
            <div className="flex justify-center items-center">
              <div
                className="flex inline-flex justify-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 my-2 rounded "
                role="alert"
              >
                <span className="block sm:inline pl-2">
                  You should log in first to display books.
                </span>
                <span
                  className="inline cursor-pointer pl-2"
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
            </div>
          )}

          <div className="flex justify-center mt-8">
            <div className="home-container flex flex-wrap justify-center">
              <div className={`subcontainer ${showModal ? "show" : ""}`}>
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => handleCardClick(book)}
                  />
                ))}

                {showModal && selectedBook && (
                  <BookDetails book={selectedBook} closeModal={closeModal} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
