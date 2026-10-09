// // src/components/RecentlyIssuedBooks.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const RecentlyIssuedBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", res.data); // 🔍 for debugging

//       // Handle different response formats
//       const booksData = res.data.books || res.data || [];

//       // Sort by `time` or fallback to `createdAt`
//       const sortedBooks = booksData.sort(
//         (a, b) =>
//           new Date(b.time || b.createdAt) - new Date(a.time || a.createdAt)
//       );

//       setBooks(sortedBooks);
//     } catch (err) {
//       console.error("Error fetching recent books:", err.response || err);
//       toast.error("Failed to fetch recent books!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 underline decoration-4 decoration-indigo-700">
//         📚 Recently Issued Books
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading books...</p>
//       ) : books.length === 0 ? (
//         <p className="text-center text-gray-600">No books found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-800">
//               <th className="py-2 px-4 border-b">Book ID</th>
//               <th className="py-2 px-4 border-b">ISBN</th>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Edition</th>
//               <th className="py-2 px-4 border-b">Author</th>
//               <th className="py-2 px-4 border-b">Total Quantity</th>
//               <th className="py-2 px-4 border-b">Available Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book._id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{book.bookId}</td>
//                 <td className="py-2 px-4 border-b">{book.isbn}</td>
//                 <td className="py-2 px-4 border-b">{book.title}</td>
//                 <td className="py-2 px-4 border-b">{book.edition}</td>
//                 <td className="py-2 px-4 border-b">{book.author}</td>
//                 <td className="py-2 px-4 border-b">{book.totalCopies}</td>
//                 <td className="py-2 px-4 border-b">{book.availableCopies}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default RecentlyIssuedBooks;

//-------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RecentlyAddedBooks = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchRecentBooks = async () => {
//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books/recent");
//         // backend ab { success, count, books } return karega
//         setBooks(res.data.books || []);
//       } catch (err) {
//         console.error("Error fetching recent books:", err);
//       }
//     };
//     fetchRecentBooks();
//   }, []);

//   return (
//     <div>
//       <h2>Recently Added Books</h2>
//       {books.length === 0 && <p>No books found.</p>}
//       <ul>
//         {books.map((b) => (
//           <li key={b._id}>
//             <img src={b.image} alt={b.title} width={50} />
//             <strong>{b.title}</strong> by {b.author} | Total: {b.totalCopies} |
//             Available: {b.availableCopies}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentlyAddedBooks;

//--------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RecentlyAddedBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchRecentBooks = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books/recent");
//         if (res.data.success) {
//           setBooks(res.data.books || []);
//         } else {
//           setBooks([]);
//           setError("No books found.");
//         }
//       } catch (err) {
//         console.error("Error fetching recent books:", err);
//         setError("Failed to fetch books. Server error.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecentBooks();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 underline decoration-4">
//         📚 Recently Added Books
//       </h2>

//       {loading && <p className="text-center text-gray-600">Loading books...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && books.length === 0 && (
//         <p className="text-center text-gray-600">No books found.</p>
//       )}

//       <ul className="space-y-4">
//         {books.map((book) => (
//           <li
//             key={book._id}
//             className="flex items-center space-x-4 p-3 border rounded shadow-sm hover:bg-indigo-50 transition"
//           >
//             {book.image && (
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-16 h-20 object-cover rounded"
//               />
//             )}
//             <div>
//               <p className="font-semibold text-indigo-800">{book.title}</p>
//               <p className="text-gray-700 text-sm">Author: {book.author}</p>
//               <p className="text-gray-700 text-sm">Category: {book.category}</p>
//               <p className="text-gray-600 text-xs">
//                 Total: {book.totalCopies} | Available: {book.availableCopies}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentlyAddedBooks;

//-----------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RecentlyAddedBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books"); // existing BookList route
//         if (res.data.books) {
//           // Sort by createdAt descending (recent first)
//           const sortedBooks = res.data.books.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           );
//           setBooks(sortedBooks);
//         } else {
//           setBooks([]);
//           setError("No books found.");
//         }
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setError("Failed to fetch books. Server error.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center text-dark underline decoration-4">
//         Recently Added Books
//       </h2>

//       {loading && <p className="text-center text-gray-600">Loading books...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && books.length === 0 && (
//         <p className="text-center text-gray-600">No books found.</p>
//       )}

//       <ul className="space-y-6">
//         {books.map((book) => (
//           <li
//             key={book._id}
//             className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-xl overflow-hidden border border-blue-400 transition-transform duration-300 hover:shadow-2xl hover:scale-105"
//           >
//             {book.image && (
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="w-full md:w-48 h-52 object-cover border-b md:border-b-0 md:border-r border-gray-200 transform transition-transform duration-300 hover:scale-110"
//               />
//             )}
//             <div className="p-4 flex-1 text-center md:text-left space-y-3">
//               <h3 className="text-xl font-bold text-indigo-800">
//                 {book.title}
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 <strong>Edition:</strong> {book.edition}
//               </p>
//               <p className="text-gray-700 text-sm">
//                 <strong>Author:</strong> {book.author}
//               </p>
//               <p className="text-gray-700 text-sm">
//                 <strong>Category:</strong> {book.category}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 <strong>Total:</strong> {book.totalCopies} |{" "}
//                 <strong>Available:</strong> {book.availableCopies}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentlyAddedBooks;

//-----------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentlyAddedBooks = ({ darkMode }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/books");
        if (res.data.books) {
          const sortedBooks = res.data.books.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setBooks(sortedBooks);
        } else {
          setBooks([]);
          setError("No books found.");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(books.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* <h2 className="text-3xl font-bold mb-6 text-center text-dark ">
        Recently Added Books
      </h2> */}

      {loading && <p className="text-center text-gray-600">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-gray-600">No books found.</p>
      )}

      <ul className="space-y-6">
        {currentBooks.map((book) => (
          <li
            key={book._id}
            className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                : "bg-gradient-to-br from-white to-gray-50 border border-gray-400"
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative flex flex-col md:flex-row">
              {/* Enhanced Book Image */}
              {book.image && (
                <div className="relative overflow-hidden md:w-58">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 md:h-full object-fit transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium truncate">
                      {book.title}
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Book Information */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
                        }`}
                      >
                        {book.category}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
                        }`}
                      >
                        {book.edition}
                      </span>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div
                    className={`flex flex-row items-center p-2 gap-1 rounded-lg ${
                      book.availableCopies > 0
                        ? darkMode
                          ? "bg-green-500/10 border border-green-500/20"
                          : "bg-green-50 border border-green-200"
                        : darkMode
                          ? "bg-red-500/10 border border-red-500/20"
                          : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${
                        book.availableCopies > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${
                        book.availableCopies > 0
                          ? darkMode
                            ? "text-green-400"
                            : "text-green-700"
                          : darkMode
                            ? "text-red-400"
                            : "text-red-700"
                      }`}
                    >
                      {book.availableCopies > 0 ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  by <span className="font-medium">{book.author}</span>
                </p>

                {/* Book Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                  >
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                    >
                      ISBN
                    </p>
                    <p
                      className={`text-sm font-mono font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {book.isbn}
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                  >
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                    >
                      Publisher
                    </p>
                    <p
                      className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {book.publisherName}
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                  >
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                    >
                      Language
                    </p>
                    <p
                      className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {book.language}
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                  >
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                    >
                      Availability
                    </p>
                    <p
                      className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {book.availableCopies}/{book.totalCopies}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Availability
                    </span>
                    <span
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {Math.round(
                        (book.availableCopies / book.totalCopies) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    <div
                      className={`h-2 rounded-full ${
                        book.availableCopies > 0
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      }`}
                      style={{
                        width: `${(book.availableCopies / book.totalCopies) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Pagination Controls with < and > */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border border-black font-bold ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded border border-black font-bold ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white font-bold"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border border-black font-bold ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyAddedBooks;
