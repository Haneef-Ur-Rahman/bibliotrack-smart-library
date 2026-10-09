// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";

// export default function StudentBooksToReturn() {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [allBooks, setAllBooks] = useState([]);
//   const token = localStorage.getItem("token");

//   // Fetch all books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
//         setAllBooks(res.data.books || []);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // Fetch issued books
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/books/student/issued-books`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // Merge issuedBooks with allBooks to get title & ISBN
//         const merged = res.data.issuedBooks.map((ib) => {
//           const bookDetails = allBooks.find((b) => b._id === ib.bookId) || {};
//           return { ...ib, bookDetails };
//         });

//         // Filter books whose due date has passed
//         const today = moment();
//         const toReturn = merged.filter((book) => {
//           const dueDate = moment(book.requestedAt).add(3, "months");
//           return today.isAfter(dueDate);
//         });

//         setIssuedBooks(toReturn);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token, allBooks]);

//   // Date formatting
//   const formatDate = (date) => moment(date).format("MMMM D, YYYY");

//   const calculateDueDate = (issueDate) =>
//     formatDate(moment(issueDate).add(3, "months"));

//   const calculateFine = (dueDate) => {
//     const today = moment();
//     const due = moment(dueDate, "MMMM D, YYYY");
//     if (today.isAfter(due)) {
//       const weeksLate = today.diff(due, "weeks");
//       return weeksLate * 100;
//     }
//     return 0;
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Books to Return 📚
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[900px] border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white text-center">
//               <th className="border border-gray-300 px-4 py-2">#</th>
//               <th className="border border-gray-300 px-4 py-2">Book Name</th>
//               <th className="border border-gray-300 px-4 py-2">ISBN</th>
//               <th className="border border-gray-300 px-4 py-2">Issue Date</th>
//               <th className="border border-gray-300 px-4 py-2">Due Date</th>
//               <th className="border border-gray-300 px-4 py-2">Fine (PKR)</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {issuedBooks.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   No books to return.
//                 </td>
//               </tr>
//             ) : (
//               issuedBooks.map((book, index) => {
//                 const dueDate = calculateDueDate(book.requestedAt);
//                 const fine = calculateFine(dueDate);
//                 return (
//                   <tr
//                     key={book.bookId}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//                   >
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {index + 1}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.bookDetails?.title || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {book.bookDetails?.isbn || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {formatDate(book.requestedAt)}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {dueDate}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-red-600 text-center">
//                       {fine > 0 ? fine : "-"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       {book.paid ? "Paid" : "Unpaid"}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//-----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";

// export default function StudentBooksToReturn() {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [allBooks, setAllBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8; // 8 entries per page
//   const token = localStorage.getItem("token");

//   // ---------------- Fetch all books ----------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
//         setAllBooks(res.data.books || []);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ---------------- Fetch issued books ----------------
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/books/student/issued-books`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const merged = res.data.issuedBooks.map((ib) => {
//           const bookId =
//             typeof ib.bookId === "string" ? ib.bookId : ib.bookId._id;
//           const bookDetails = allBooks.find((b) => b._id === bookId) || {};
//           return { ...ib, bookDetails };
//         });

//         // Books whose due date passed
//         const today = moment();
//         const toReturn = merged.filter((book) => {
//           const dueDate = moment(book.requestedAt).add(3, "months");
//           return today.isAfter(dueDate);
//         });

//         setIssuedBooks(toReturn);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };

//     fetchIssuedBooks();
//   }, [token, allBooks]); // keep dependency on allBooks

//   // ---------------- Date & Fine ----------------
//   const formatDate = (date) => moment(date).format("MMMM D, YYYY");
//   const calculateDueDate = (issueDate) =>
//     formatDate(moment(issueDate).add(3, "months"));
//   const calculateFine = (dueDate) => {
//     const today = moment();
//     const due = moment(dueDate, "MMMM D, YYYY");
//     if (today.isAfter(due)) {
//       const weeksLate = today.diff(due, "weeks");
//       return weeksLate * 100;
//     }
//     return 0;
//   };

//   // ---------------- Search Filter ----------------
//   const filteredBooks = issuedBooks.filter(
//     (book) =>
//       book.bookDetails?.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       book.bookDetails?.isbn.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ---------------- Pagination ----------------
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Books to Return 📚
//       </h2>

//       {/* Search Bar */}
//       <div className="w-full flex justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by Book Name or ISBN..."
//           className="w-2/3 md:w-1/2 p-3 border rounded-lg shadow-sm text-center"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[900px] border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white text-center">
//               <th className="border border-gray-300 px-4 py-2">#</th>
//               <th className="border border-gray-300 px-4 py-2">Book Name</th>
//               <th className="border border-gray-300 px-4 py-2">ISBN</th>
//               <th className="border border-gray-300 px-4 py-2">Issue Date</th>
//               <th className="border border-gray-300 px-4 py-2">Due Date</th>
//               <th className="border border-gray-300 px-4 py-2">Fine (PKR)</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {currentBooks.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   No books to return.
//                 </td>
//               </tr>
//             ) : (
//               currentBooks.map((book, index) => {
//                 const dueDate = calculateDueDate(book.requestedAt);
//                 const fine = calculateFine(dueDate);
//                 return (
//                   <tr
//                     key={book.bookId}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//                   >
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {index + 1 + (currentPage - 1) * booksPerPage}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.bookDetails?.title || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {book.bookDetails?.isbn || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {formatDate(book.requestedAt)}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {dueDate}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-red-600 text-center">
//                       {fine > 0 ? fine : "-"}
//                     </td>
//                     {/* <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       {fine > 0 ? "Unpaid" : "Paid"}
//                     </td> */}
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       <span
//                         className={`px-3 py-1 rounded text-white whitespace-nowrap ${
//                           fine === 0 ? "bg-green-500" : "bg-red-600"
//                         }`}
//                       >
//                         {fine === 0 ? "No Fine" : "Unpaid"}
//                       </span>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded border ${
//             currentPage === 1
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-black text-white"
//           }`}
//         >
//           Prev
//         </button>
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded border ${
//               currentPage === i + 1
//                 ? "bg-pink-500 text-white"
//                 : "bg-white text-black hover:bg-gray-200"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded border ${
//             currentPage === totalPages
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-black text-white"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

//-----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import moment from "moment";

// export default function StudentBooksToReturn() {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [allBooks, setAllBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8;
//   const token = localStorage.getItem("token");

//   // ---------------- Fetch all books ----------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
//         setAllBooks(res.data.books || []);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ---------------- Fetch issued books ----------------
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/books/student/issued-books`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // Merge with book details
//         const merged = res.data.issuedBooks.map((ib) => {
//           const bookId =
//             typeof ib.bookId === "string" ? ib.bookId : ib.bookId._id;
//           const bookDetails = allBooks.find((b) => b._id === bookId) || {};
//           return { ...ib, bookDetails };
//         });

//         // Only overdue books
//         const today = moment();
//         const overdueBooks = merged.filter((book) => {
//           const dueDate = moment(book.requestedAt).add(3, "months");
//           return today.isAfter(dueDate);
//         });

//         setIssuedBooks(overdueBooks);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token, allBooks]);

//   // ---------------- Date & Fine ----------------
//   const formatDate = (date) => moment(date).format("MMMM D, YYYY");
//   const calculateDueDate = (issueDate) =>
//     formatDate(moment(issueDate).add(3, "months"));
//   const calculateFine = (dueDate) => {
//     const today = moment();
//     const due = moment(dueDate, "MMMM D, YYYY");
//     if (today.isAfter(due)) {
//       const weeksLate = today.diff(due, "weeks");
//       return weeksLate * 100;
//     }
//     return 0;
//   };

//   // ---------------- Search Filter ----------------
//   const filteredBooks = issuedBooks.filter(
//     (book) =>
//       book.bookDetails?.title
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       book.bookDetails?.isbn.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ---------------- Pagination ----------------
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
//         Books to Return ⚠️
//       </h2>

//       {/* Search Bar */}
//       <div className="w-full flex justify-center mb-4">
//         <input
//           type="text"
//           placeholder="Search by Book Name or ISBN..."
//           className="w-2/3 md:w-1/2 p-3 border rounded-lg shadow-sm text-center"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[900px] border-collapse border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-red-600 text-white text-center">
//               <th className="border border-gray-300 px-4 py-2">#</th>
//               <th className="border border-gray-300 px-4 py-2">Book Name</th>
//               <th className="border border-gray-300 px-4 py-2">ISBN</th>
//               <th className="border border-gray-300 px-4 py-2">Issue Date</th>
//               <th className="border border-gray-300 px-4 py-2">Due Date</th>
//               <th className="border border-gray-300 px-4 py-2">Fine (PKR)</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {currentBooks.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   No books to return.
//                 </td>
//               </tr>
//             ) : (
//               currentBooks.map((book, index) => {
//                 const dueDate = calculateDueDate(book.requestedAt);
//                 const fine = calculateFine(dueDate);
//                 return (
//                   <tr
//                     key={book.bookId}
//                     className={fine > 0 ? "bg-red-50" : "bg-yellow-50"}
//                   >
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {index + 1 + (currentPage - 1) * booksPerPage}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.bookDetails?.title || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {book.bookDetails?.isbn || "N/A"}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {formatDate(book.requestedAt)}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       {dueDate}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-red-600 text-center">
//                       {fine > 0 ? fine : 0}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       <span
//                         className={`px-3 py-1 rounded text-white whitespace-nowrap ${
//                           fine === 0 ? "bg-yellow-500" : "bg-red-600"
//                         }`}
//                       >
//                         {fine === 0 ? "Return Pending" : "Overdue"}
//                       </span>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded border ${
//             currentPage === 1
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-black text-white"
//           }`}
//         >
//           Prev
//         </button>
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded border ${
//               currentPage === i + 1
//                 ? "bg-pink-500 text-white"
//                 : "bg-white text-black hover:bg-gray-200"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded border ${
//             currentPage === totalPages
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-black text-white"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

//-----------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaSearch } from "react-icons/fa"; // Search icon

export default function StudentBooksToReturn({ darkMode }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [mainSearch, setMainSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const token = localStorage.getItem("token");

  // ---------------- Fetch all books ----------------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books`);
        setAllBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // ---------------- Fetch issued books ----------------
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      if (!token || allBooks.length === 0) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/books/student/issued-books`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const issuedBooksWithFine = await Promise.all(
          res.data.issuedBooks.map(async (ib) => {
            // DEBUG: Log the raw data to see what fields are available
            console.log("Raw issued book data:", ib);

            // Get the fine and due date from the API
            const fineRes = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/fines/calculate/${ib._id}`,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            // DEBUG: Log the API response
            console.log("Fine API response:", fineRes.data);

            const bookId = ib.bookId._id || ib.bookId;
            const bookDetails = allBooks.find((b) => b._id === bookId) || {};

            // Try to find the issue date from multiple possible fields
            const issueDate = ib.requestedAt || ib.issueDate || ib.createdAt;

            // DEBUG: Log the issue date we found
            console.log("Issue date found:", issueDate);

            return {
              ...ib,
              bookDetails,
              fine: fineRes.data.fine,
              dueDate: fineRes.data.dueDate,
              // Use the found issue date for consistency
              requestedAt: issueDate,
            };
          }),
        );

        // Only show books with fines (overdue books)
        const overdueBooks = issuedBooksWithFine.filter((book) => {
          return book.fine > 0;
        });

        setIssuedBooks(overdueBooks);
      } catch (err) {
        console.error("Error fetching issued books:", err);
      }
    };

    fetchIssuedBooks();
  }, [token, allBooks]);

  // ---------------- Date & Fine ----------------
  // This function just formats the date with better error handling
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return moment(dateString).format("MMMM D, YYYY");
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  // These functions now just get the data fetched from the API
  const getDueDate = (book) => formatDate(book.dueDate);
  const getFine = (book) => book.fine || 0;

  // ---------------- Search Filter ----------------
  //////////////// Filtering logic based on search term (title, author, ISBN) ////////////////
  useEffect(() => {
    let results = [...issuedBooks];

    if (mainSearch) {
      const s = mainSearch.toLowerCase();
      results = results.filter(
        (book) =>
          book.bookDetails?.title?.toLowerCase().includes(s) ||
          book.bookDetails?.author?.toLowerCase().includes(s) ||
          book.bookDetails?.isbn?.toLowerCase().includes(s) ||
          book.bookDetails?.category?.toLowerCase().includes(s),
      );
    }

    if (titleSearch) {
      const s = titleSearch.toLowerCase();
      results = results.filter((book) =>
        book.bookDetails?.title?.toLowerCase().includes(s),
      );
    }

    if (authorSearch) {
      const s = authorSearch.toLowerCase();
      results = results.filter((book) =>
        book.bookDetails?.author?.toLowerCase().includes(s),
      );
    }

    if (isbnSearch) {
      const s = isbnSearch.toLowerCase();
      results = results.filter((book) =>
        book.bookDetails?.isbn?.toLowerCase().includes(s),
      );
    }

    if (categorySearch) {
      const s = categorySearch.toLowerCase();
      results = results.filter((book) =>
        book.bookDetails?.category?.toLowerCase().includes(s),
      );
    }

    if (alphabetFilter) {
      results = results.filter(
        (book) =>
          book.bookDetails?.title?.charAt(0).toUpperCase() ===
          alphabetFilter.toUpperCase(),
      );
    }

    setFilteredBooks(results);
    setCurrentPage(1);
  }, [
    mainSearch,
    titleSearch,
    authorSearch,
    isbnSearch,
    categorySearch,
    alphabetFilter,
    issuedBooks,
  ]);

  const clearAllSearches = () => {
    setMainSearch("");
    setTitleSearch("");
    setAuthorSearch("");
    setIsbnSearch("");
    setCategorySearch("");
    setAlphabetFilter("");
  };

  // ---------------- Pagination ----------------
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    // <div className="bg-white shadow-lg rounded-xl p-6">
    <div
      className={`shadow-lg rounded-xl p-6 transition-colors border border-gray-300 duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* <h2 className="text-2xl font-bold mb-4 text-center">
        Books to Return 📚
      </h2> */}

      {/* --- Advanced Search Section --- */}
      <div className="w-full flex justify-center mb-6">
        <div className="relative w-full max-w-2xl">
          <div className="flex">
            {/* SEARCH INPUT WITH ICON */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch
                  className={darkMode ? "text-gray-400" : "text-gray-500"}
                />
              </div>
              <input
                type="text"
                placeholder="Search books by title, author, ISBN..."
                className={`w-full pl-10 pr-4 py-3 rounded-l-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                }`}
                value={mainSearch}
                onChange={(e) => setMainSearch(e.target.value)}
              />
            </div>

            {/* FILTER ICON BUTTON */}
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className={`px-4 py-3 rounded-r-xl border-l-0 ${
                darkMode
                  ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white"
                  : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18v2.586l-6.414 6.414V17l-4 4v-6.586L3 6.586V4z"
                />
              </svg>
            </button>
          </div>

          {showFilterOptions && (
            <div
              className={`absolute z-10 mt-2 w-full rounded-xl shadow-lg p-4 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* INPUTS WITH HEADINGS */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Book title..."
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Author name..."
                    value={authorSearch}
                    onChange={(e) => setAuthorSearch(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Web, Data Science..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    ISBN
                  </label>
                  <input
                    type="text"
                    placeholder="ISBN..."
                    value={isbnSearch}
                    onChange={(e) => setIsbnSearch(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* ALPHABET FILTER */}
              <div
                className={`mt-4 pt-4 border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <label
                  className={`block text-xs font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Browse by Letter
                </label>

                <div className="flex flex-wrap gap-1 mb-2">
                  {/* ALL */}
                  <button
                    onClick={() => setAlphabetFilter("")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      !alphabetFilter
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All
                  </button>

                  {/* A–J */}
                  {"ABCDEFGHIJ".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setAlphabetFilter(letter)}
                      className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                        alphabetFilter === letter
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}

                  {/* K–Z */}
                  {showMoreAlphabets &&
                    "KLMNOPQRSTUVWXYZ".split("").map((letter) => (
                      <button
                        key={letter}
                        onClick={() => setAlphabetFilter(letter)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === letter
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {letter}
                      </button>
                    ))}

                  {/* NUMBERS */}
                  {showMoreAlphabets &&
                    "0123456789".split("").map((num) => (
                      <button
                        key={num}
                        onClick={() => setAlphabetFilter(num)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === num
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                  {/* SEE MORE / LESS */}
                  <button
                    onClick={() => setShowMoreAlphabets(!showMoreAlphabets)}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {showMoreAlphabets ? "See Less" : "See More..."}
                  </button>
                </div>
              </div>

              {/* CLEAR */}
              <div className="flex justify-end mt-3">
                <button
                  onClick={clearAllSearches}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className={`inline-block min-w-full rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"} min-h-[400px]`}
        >
          <table className="min-w-full  border border-gray-500">
            <thead>
              <tr
                className={`${darkMode ? "bg-slate-900" : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]"} text-white`}
              >
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Book Name
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  Fine (PKR)
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className={`px-6 py-12 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className={`w-12 h-12 ${darkMode ? "text-slate-600" : "text-gray-400"} mb-3`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h3
                        className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-1`}
                      >
                        No books to return
                      </h3>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        You don't have any books due for return
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentBooks.map((book, index) => {
                  const dueDate = getDueDate(book); // Pass the whole book object
                  const fine = getFine(book); // Pass the whole book object
                  const isOverdue = fine > 0;

                  return (
                    <tr
                      key={book.bookId}
                      className={`transition-all duration-200 hover:${darkMode ? "bg-slate-700/50" : "bg-gray-50"} border-b-4 ${
                        darkMode
                          ? "border-slate-600 hover:border-slate-500"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <td
                        className={`px-6 py-4 text-center text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        {index + 1 + (currentPage - 1) * booksPerPage}
                      </td>
                      <td className={`px-6 py-4`}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {book.bookDetails?.image ? (
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={book.bookDetails.image}
                                alt={book.bookDetails.title}
                              />
                            ) : (
                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}
                              >
                                <svg
                                  className={`w-5 h-5 ${darkMode ? "text-slate-500" : "text-gray-400"}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div
                              className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {book.bookDetails?.title || "N/A"}
                            </div>
                            <div
                              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              {book.bookDetails?.author || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-sm font-mono ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        {book.bookDetails?.isbn || "N/A"}
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        <div className="flex items-center justify-center">
                          {/* <svg
                            className={`w-4 h-4 mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg> */}
                          {formatDate(book.requestedAt)}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        <div className="flex items-center justify-center">
                          {/* <svg
                            className={`w-4 h-4 mr-2 ${isOverdue ? "text-red-500" : darkMode ? "text-gray-400" : "text-gray-500"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg> */}
                          {dueDate}
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-sm font-semibold ${isOverdue ? "text-red-500" : darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        {fine > 0 ? (
                          <div className="flex items-center justify-center">
                            PKR {fine}
                          </div>
                        ) : (
                          <span className="flex items-center justify-center">
                            <svg
                              className="w-4 h-4 mr-1 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            No Fine
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            isOverdue
                              ? "bg-red-400 text-white dark:bg-red-500 dark:text-white shadow-sm"
                              : "bg-blue-600 text-white dark:bg-blue-700 dark:text-white shadow-sm"
                          }`}
                        >
                          {/* Small dot, consistent with other pills */}
                          <span className="w-1 h-1 rounded-full mr-1.5 bg-white inline-block"></span>
                          {isOverdue ? "Unpaid" : "Return Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? "bg-gray-600 text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
