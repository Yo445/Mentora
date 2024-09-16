import React, { useState, useEffect } from "react";
import Card from "../../Components/Card";
import BookDetails from "../../Components/BookDetails";

import axios from "axios";
import { getAuthUser } from "..//../helper/Storage";
import Loader from "../../Components/Shared/Loader";

const Home = () => {
  /* data */
  const cardsData = [
    {
      id: "card-1",
      title:
        "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png",
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_1.png",
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_2.png",
      ],
    },
    {
      id: "card-2",
      title:
        "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
    {
      id: "card-3",
      title:
        "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
    {
      id: "card-4",
      title:
        "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
  ];

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
          <div className="">
            <header>
              {/* search bar */}
              <div className="container mx-auto px-6 py-3">
                <div className="relative mt-6 max-w-lg mx-auto">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
            </header>

            <main className="my-8">
              <div className="container mx-auto px-6">
                <div className="md:flex mt-8 md:-mx-4">
                  {/* Back Pack Section */}
                  <div
                    className="w-full h-64 md:mx-4 rounded-[18px] overflow-hidden bg-cover bg-center md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Back Pack
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Tempore facere provident molestias ipsam sint
                          voluptatum pariatur.
                        </p>
                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                          <span>Shop Now</span>
                          <svg
                            className="h-5 w-5 mx-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Games Section */}
                  <div
                    className="w-full h-64 mt-8 md:mx-4 rounded-[18px] overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
                    }}
                  >
                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                      <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">
                          Games
                        </h2>
                        <p className="mt-2 text-gray-400">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Tempore facere provident molestias ipsam sint
                          voluptatum pariatur.
                        </p>
                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                          <span>Shop Now</span>
                          <svg
                            className="h-5 w-5 mx-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Display Cards */}
                <div className="md:flex mt-8 md:-mx-0">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cardsData.map((card) => (
                      <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        date={card.date}
                        avatars={card.avatars}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
