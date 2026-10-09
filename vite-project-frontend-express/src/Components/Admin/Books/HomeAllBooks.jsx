import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const HomeAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.books) {
        setBooks(res.data.books);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books!");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (book) => {
    setSelectedBook(selectedBook?._id === book._id ? null : book);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookId.toString().includes(searchTerm)
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 max-w-7xl mx-auto dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Books
      </h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Title, Author or Book ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 w-2/3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden flex flex-row h-60 transition hover:shadow-lg"
          >
            {/* Image Left */}
            <div className="flex-shrink-0 md:w-1/2 h-full bg-gray-100">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 flex items-center justify-center h-full">
                  No Image
                </span>
              )}
            </div>

            {/* Info Right */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold leading-snug break-words">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 break-words">
                  {book.author}
                </p>
                <div className="flex items-center mt-1 gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      color={
                        i < Math.floor(book.rating || 4) ? "#FACC15" : "#E5E7EB"
                      }
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleShowDetails(book)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm w-full"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600 hover:bg-indigo-50"
          }`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-lg border ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-lg border ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600 hover:bg-indigo-50"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative border border-gray-300">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-600 text-3xl font-bold transition"
            >
              <AiOutlineClose />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              {selectedBook.image && (
                <div className="flex-shrink-0 md:w-1/2 h-80">
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-2xl font-bold leading-snug">
                  {selectedBook.title}
                </h2>
                <p className="text-gray-600 break-words">
                  Author: {selectedBook.author}
                </p>
                <p className="text-gray-600">ISBN: {selectedBook.isbn}</p>
                <p className="text-gray-600">Edition: {selectedBook.edition}</p>
                <p className="text-gray-600">
                  Language: {selectedBook.language}
                </p>
                <p className="text-gray-600">
                  Publisher: {selectedBook.publisherName}
                </p>
                <p className="text-gray-600">
                  Category: {selectedBook.category}
                </p>
                <p className="text-gray-600">
                  Total Copies: {selectedBook.totalCopies}
                </p>
                <p className="text-gray-600">
                  Available Copies: {selectedBook.availableCopies}
                </p>
                <div className="flex items-center mt-1 gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      color={
                        i < Math.floor(selectedBook.rating || 4)
                          ? "#FACC15"
                          : "#E5E7EB"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeAllBooks;
