import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StudentBooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books");
        setBooks(res.data.books);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load books ❌");
      }
    };
    fetchBooks();
  }, []);
  const token = localStorage.getItem("token");

  const handleIssueOrReserve = async (bookId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/books/issue/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to issue/reserve");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#1F2A4F]">
        Available Books
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500">Edition: {book.edition}</p>
            <p className="text-sm text-gray-500">
              Copies: {book.availableCopies}
            </p>

            <button
              onClick={() => handleIssueOrReserve(book._id)}
              className="mt-3 bg-[#4A427B] text-white px-4 py-1 rounded hover:bg-[#1F2A4F]"
            >
              {/* {book.availableCopies > 0 ? "Issue Book" : "Reserve Book"} */}
              <button>
                {book.availableCopies > 0 ? "Issue Book" : "Reserve Book"}
              </button>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentBooksList;
