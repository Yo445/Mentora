import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import Loader from "../Components/Shared/Loader";
import { IoIosSearch } from "react-icons/io";

// Define types for book and card data
interface CardData {
  id: string;
  title: string;
  date: string;
  avatars: string[];
}

interface Book {
  title: string;
  [key: string]: any; // Add specific properties if known
}

interface BooksState {
  loading: boolean;
  results: Book[];
  err: string;
  reload: boolean;
}

const Home: React.FC = () => {
  // Card data
  const cardsData: CardData[] = [
    {
      id: "card-1",
      title: "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_0.png",
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_1.png",
        "https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_4_2.png",
      ],
    },
    {
      id: "card-2",
      title: "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
    {
      id: "card-2",
      title: "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
    {
      id: "card-2",
      title: "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
    {
      id: "card-2",
      title: "What does success as a UX designer look like and how to get there systematically",
      date: "March 28, 2020",
      avatars: [],
    },
  ];

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string | null>(getAuthUser()?.email || null);

  const [books, setBooks] = useState<BooksState>({
    loading: false,
    results: [],
    err: "",
    reload: false,
  });

  useEffect(() => {
    const fetchBooks = () => {
      const user = getAuthUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        console.error("User is not authenticated or email is missing.");
        return;
      }

      setBooks((prevBooks) => ({ ...prevBooks, loading: true }));
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

  const handleCardClick = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
              <div className="container mx-auto px-6 py-3 pb-8">
                <div className="relative mt-6 max-w-lg mx-auto">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <IoIosSearch className="h-5 w-5 text-gray-500"/>
                  </span>
                  <input
                    className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </header>

            <main className="my-8">
              <div className="container mx-auto px-6">
              

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
