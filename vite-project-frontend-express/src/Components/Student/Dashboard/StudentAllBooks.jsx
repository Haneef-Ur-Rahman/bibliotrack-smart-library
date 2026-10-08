// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentAllBooks() {
//   const [books, setBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const token = localStorage.getItem("token");

//   // Fetch all books
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // Fetch issued books for logged-in student
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const issuedObj = {};
//         res.data.issuedBooks.forEach((b) => {
//           issuedObj[b.bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   const getStatus = (book) => {
//     if (issuedBooks[book._id]) return "Issued";
//     if (book.copies === 0) return "Reserved";
//     return "Issue";
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-6">All Books 📚</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white">
//               <th className="border border-gray-300 px-4 py-2 text-left">#</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Book Name
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 ISBN
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Author
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-center">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book, index) => (
//               <tr
//                 key={book._id}
//                 className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//               >
//                 <td className="border border-gray-300 px-4 py-2">
//                   {index + 1}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {book.title}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {book.isbn}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {book.author}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                   {getStatus(book) === "Issued" && (
//                     <span className="text-white bg-gray-600 px-3 py-1 rounded">
//                       Issued ✅
//                     </span>
//                   )}
//                   {getStatus(book) === "Reserved" && (
//                     <span className="text-white bg-orange-500 px-3 py-1 rounded">
//                       Reserved
//                     </span>
//                   )}
//                   {getStatus(book) === "Issue" && (
//                     <span className="text-white bg-green-500 px-3 py-1 rounded">
//                       Not Issued
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//             {books.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   No books found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentAllBooks() {
//   const [books, setBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const [loadingBookId, setLoadingBookId] = useState(null);
//   const token = localStorage.getItem("token");

//   // ---------------- Fetch all books ----------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
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
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const issuedObj = {};
//         res.data.issuedBooks.forEach((b) => {
//           issuedObj[b.bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // ---------------- Fetch reserved books ----------------
//   useEffect(() => {
//     const fetchReservedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const reservedObj = {};
//         res.data.reservations.forEach((r) => {
//           reservedObj[r.bookId._id || r.bookId] = true;
//         });
//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       }
//     };
//     fetchReservedBooks();
//   }, [token]);

//   // ---------------- Determine button status ----------------
//   const getButtonState = (book) => {
//     if (issuedBooks[book._id])
//       return { text: "Issued", disabled: true, color: "bg-gray-400" };
//     if (reservedBooks[book._id])
//       return { text: "Reserved", disabled: true, color: "bg-gray-400" };
//     if (book.availableCopies === 0)
//       return { text: "Reserve", disabled: false, color: "bg-orange-500" };
//     return { text: "Issue", disabled: false, color: "bg-green-500" };
//   };

//   // ---------------- Handle Issue / Reserve click ----------------
//   const handleAction = async (book) => {
//     if (!token) return;
//     setLoadingBookId(book._id);

//     try {
//       const res = await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (book.availableCopies === 0) {
//         // Reserved
//         setReservedBooks((prev) => ({ ...prev, [book._id]: true }));
//       } else {
//         // Issued
//         setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Action failed");
//       console.error(err);
//     } finally {
//       setLoadingBookId(null);
//     }
//   };

//   // ---------------- Render ----------------
//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-6">All Books 📚</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white">
//               <th className="border border-gray-300 px-4 py-2 text-left">#</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Book Name
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 ISBN
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Author
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-center">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   No books found.
//                 </td>
//               </tr>
//             )}
//             {books.map((book, index) => {
//               const btn = getButtonState(book);
//               return (
//                 <tr
//                   key={book._id}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//                 >
//                   <td className="border border-gray-300 px-4 py-2">
//                     {index + 1}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.title}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.isbn}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.author}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <button
//                       disabled={btn.disabled || loadingBookId === book._id}
//                       onClick={() => handleAction(book)}
//                       className={`px-4 py-1 rounded text-white font-semibold ${
//                         btn.color
//                       } ${
//                         btn.disabled ? "cursor-not-allowed" : "hover:opacity-90"
//                       }`}
//                     >
//                       {loadingBookId === book._id ? "Processing..." : btn.text}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentAllBooks() {
//   const [books, setBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const [loadingBookId, setLoadingBookId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8; // Same as StudentHome
//   const token = localStorage.getItem("token");

//   // ---------------- Fetch all books ----------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
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
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const issuedObj = {};
//         res.data.issuedBooks.forEach((b) => {
//           issuedObj[b.bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // ---------------- Fetch reserved books ----------------
//   useEffect(() => {
//     const fetchReservedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const reservedObj = {};
//         res.data.reservations.forEach((r) => {
//           reservedObj[r.bookId._id || r.bookId] = true;
//         });
//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       }
//     };
//     fetchReservedBooks();
//   }, [token]);

//   // ---------------- Search Filter ----------------
//   const filteredBooks = books.filter(
//     (book) =>
//       book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ---------------- Pagination ----------------
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   // ---------------- Button Status ----------------
//   const getButtonState = (book) => {
//     if (issuedBooks[book._id])
//       return { text: "Issued", disabled: true, color: "bg-gray-500" };
//     if (reservedBooks[book._id])
//       return { text: "Reserved", disabled: true, color: "bg-gray-500" };
//     if (book.availableCopies === 0)
//       return { text: "Reserve", disabled: false, color: "bg-orange-500" };
//     return { text: "Issue", disabled: false, color: "bg-green-500" };
//   };

//   // ---------------- Handle Issue / Reserve ----------------
//   const handleAction = async (book) => {
//     if (!token) return;
//     setLoadingBookId(book._id);

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (book.availableCopies === 0) {
//         setReservedBooks((prev) => ({ ...prev, [book._id]: true }));
//       } else {
//         setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Action failed");
//     } finally {
//       setLoadingBookId(null);
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center">All Books 📚</h2>

//       {/* Search */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by Title or Author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border px-4 py-2 w-2/3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Books Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white">
//               <th className="border border-gray-300 px-4 py-2 text-left">#</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Title
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Author
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 ISBN
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-center">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentBooks.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   No books found.
//                 </td>
//               </tr>
//             ) : (
//               currentBooks.map((book, index) => {
//                 const btn = getButtonState(book);
//                 return (
//                   <tr
//                     key={book._id}
//                     className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//                   >
//                     <td className="border border-gray-300 px-4 py-2">
//                       {indexOfFirstBook + index + 1}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.title}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.author}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {book.isbn}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">
//                       <button
//                         disabled={btn.disabled || loadingBookId === book._id}
//                         onClick={() => handleAction(book)}
//                         className={`px-4 py-1 rounded text-white font-semibold ${
//                           btn.color
//                         } ${
//                           btn.disabled
//                             ? "cursor-not-allowed"
//                             : "hover:opacity-90"
//                         }`}
//                       >
//                         {loadingBookId === book._id
//                           ? "Processing..."
//                           : btn.text}
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-2 mt-6">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded border font-bold ${
//             currentPage === 1
//               ? "bg-gray-300 text-black cursor-not-allowed"
//               : "bg-black text-white hover:bg-gray-800"
//           }`}
//         >
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded border font-bold ${
//               currentPage === i + 1
//                 ? "bg-pink-500 text-white font-bold"
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
//           className={`px-3 py-1 rounded border font-bold ${
//             currentPage === totalPages
//               ? "bg-gray-300 text-black cursor-not-allowed"
//               : "bg-black text-white hover:bg-gray-800"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentAllBooks() {
//   const [books, setBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 8; // 8 entries per page

//   // ---------------- Fetch all books ----------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
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
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const issuedObj = {};
//         res.data.issuedBooks.forEach((b) => {
//           issuedObj[b.bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // ---------------- Fetch reserved books ----------------
//   useEffect(() => {
//     const fetchReservedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const reservedObj = {};
//         res.data.reservations.forEach((r) => {
//           reservedObj[r.bookId._id || r.bookId] = true;
//         });
//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       }
//     };
//     fetchReservedBooks();
//   }, [token]);

//   // ---------------- Determine button/status ----------------
//   const getButtonState = (book) => {
//     if (issuedBooks[book._id]) return { text: "Issued", color: "bg-gray-500" };
//     if (reservedBooks[book._id] || book.availableCopies === 0)
//       return { text: "Reserved", color: "bg-orange-500" };
//     return { text: "Not Issued", color: "bg-green-500" };
//   };

//   // ---------------- Pagination ----------------
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(books.length / booksPerPage);

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-2xl font-bold mb-6">All Books 📚</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-[#1F2A4F] text-white">
//               <th className="border border-gray-300 px-4 py-2 text-left">#</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Book Name
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 ISBN
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left">
//                 Author
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-center">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentBooks.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   No books found.
//                 </td>
//               </tr>
//             )}
//             {currentBooks.map((book, index) => {
//               const btn = getButtonState(book);
//               return (
//                 <tr
//                   key={book._id}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
//                 >
//                   <td className="border border-gray-300 px-4 py-2">
//                     {index + 1}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.title}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.isbn}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {book.author}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <span
//                       className={`px-4 py-1 rounded text-white font-semibold ${btn.color}`}
//                     >
//                       {btn.text}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
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

//--------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function StudentAllBooks({ darkMode }) {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState({});
  const [reservedBooks, setReservedBooks] = useState({});
  const [mainSearch, setMainSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  const [filteredBooks, setFilteredBooks] = useState([]);

  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; // 8 entries per page

  // ---------------- Fetch all books ----------------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/books");
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // ---------------- Fetch issued books ----------------
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          "http://localhost:3002/api/books/student/issued-books",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const issuedObj = {};
        res.data.issuedBooks.forEach((b) => {
          const id = b.bookId._id || b.bookId;
          issuedObj[id.toString()] = true;
        });

        setIssuedBooks(issuedObj);
      } catch (err) {
        console.error("Error fetching issued books:", err);
      }
    };
    fetchIssuedBooks();
  }, [token]);

  // ---------------- Fetch reserved books ----------------
  useEffect(() => {
    const fetchReservedBooks = async () => {
      if (!token) return;
      try {
        const res = await axios.get(
          "http://localhost:3002/api/books/student/reserved-books",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const reservedObj = {};
        res.data.reservations.forEach((r) => {
          reservedObj[r.bookId._id || r.bookId] = true;
        });
        setReservedBooks(reservedObj);
      } catch (err) {
        console.error("Error fetching reserved books:", err);
      }
    };
    fetchReservedBooks();
  }, [token]);

  // ---------------- Determine button/status ----------------
  // const getButtonState = (book) => {
  //   if (issuedBooks[book._id]) {
  //     return { text: "Issued✔️", color: "bg-gray-500" };
  //   }
  //   if (reservedBooks[book._id]) {
  //     return { text: "Reserved✔️", color: "bg-orange-500" };
  //   }
  //   return {
  //     text: book.availableCopies === 0 ? "Reserve" : "Issue",
  //     color: book.availableCopies === 0 ? "bg-orange-500" : "bg-green-500",
  //   };
  // };
  // // ---------------- Determine button/status ----------------
  // const getButtonState = (book) => {
  //   // Book is already issued to this user
  //   if (issuedBooks[book._id]) {
  //     return {
  //       text: "Issued",
  //       color: "bg-green-500",
  //       textColor: "text-white",
  //       icon: "check-circle",
  //       disabled: true,
  //     };
  //   }

  //   // Book is reserved by this user
  //   if (reservedBooks[book._id]) {
  //     return {
  //       text: "Reserved",
  //       color: "bg-gradient-to-r from-amber-500 to-orange-500",
  //       textColor: "text-white",
  //       icon: "bookmark",
  //       disabled: true,
  //     };
  //   }

  //   // Book is available for issuing
  //   if (book.availableCopies > 0) {
  //     return {
  //       text: "Issue Book",
  //       color: "bg-blue-500",
  //       textColor: "text-white",
  //       icon: "plus-circle",
  //       disabled: false,
  //     };
  //   }

  //   // Book is out of stock but can be reserved
  //   return {
  //     text: "Reserve Book",
  //     color: "bg-gradient-to-r from-orange-500 to-red-500",
  //     textColor: "text-white",
  //     icon: "clock",
  //     disabled: false,
  //   };
  // };
  //------------------------------------------------------------------
  const getButtonState = (book) => {
    if (issuedBooks[book._id]) {
      return {
        status: "issued",
        text: "Issued",
        color: "bg-green-500",
        textColor: "text-white",
        disabled: true,
      };
    }

    if (reservedBooks[book._id]) {
      return {
        status: "reserved",
        text: "Reserved",
        color: "bg-gradient-to-r from-amber-500 to-orange-500",
        textColor: "text-white",
        disabled: true,
      };
    }

    if (book.availableCopies > 0) {
      return {
        status: "available",
        text: "Issue Book",
        color: "bg-blue-500",
        textColor: "text-white",
        disabled: false,
      };
    }

    return {
      status: "outofstock",
      text: "Reserve Book",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      textColor: "text-white",
      disabled: false,
    };
  };

  // ---------------- Filtered Books ----------------
  useEffect(() => {
    let results = [...books];

    if (mainSearch) {
      const s = mainSearch.toLowerCase();
      results = results.filter(
        (book) =>
          book.title?.toLowerCase().includes(s) ||
          book.author?.toLowerCase().includes(s) ||
          book.isbn?.toLowerCase().includes(s) ||
          book.category?.toLowerCase().includes(s),
      );
    }

    if (titleSearch) {
      const s = titleSearch.toLowerCase();
      results = results.filter((b) => b.title?.toLowerCase().includes(s));
    }

    if (authorSearch) {
      const s = authorSearch.toLowerCase();
      results = results.filter((b) => b.author?.toLowerCase().includes(s));
    }

    if (isbnSearch) {
      const s = isbnSearch.toLowerCase();
      results = results.filter((b) => b.isbn?.toLowerCase().includes(s));
    }

    if (categorySearch) {
      const s = categorySearch.toLowerCase();
      results = results.filter((b) => b.category?.toLowerCase().includes(s));
    }

    if (alphabetFilter) {
      results = results.filter(
        (b) =>
          b.title?.charAt(0).toUpperCase() === alphabetFilter.toUpperCase(),
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
    books,
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
    // <div
    //   className={`shadow-lg rounded-xl border p-6 ${
    //     darkMode
    //       ? "bg-gray-800 border-gray-700 text-white"
    //       : "bg-white border-gray-500"
    //   } `}
    // >
    <div
      className={`w-full max-w-full overflow-hidden shadow-lg rounded-xl  p-7${
        darkMode ? "bg-gray-800  text-white" : "bg-white "
      }`}
    >
      {/* <h2 className="text-2xl font-bold mb-4">All Books 📚</h2> */}

      {/* Search Bar */}
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
          className={`w-full rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"} min-h-[400px]`}
        >
          <table className="w-full border border-gray-500 dark:border-slate-700">
            <thead>
              <tr
                className={`${darkMode ? "bg-slate-900" : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]"} text-white`}
              >
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Book Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <h3
                        className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-1`}
                      >
                        No books found
                      </h3>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {currentBooks.map((book, index) => {
                const btn = getButtonState(book);
                return (
                  <tr
                    key={book._id}
                    className={`transition-colors duration-200 hover:${darkMode ? "bg-slate-700/50" : "bg-gray-50"} border-b-2 ${
                      darkMode ? "border-slate-600" : "border-gray-200"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                    >
                      {index + 1 + indexOfFirstBook}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {book.image ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={book.image}
                              alt={book.title}
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
                            className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"} truncate max-w-[200px]`}
                          >
                            {book.title}
                          </div>
                          <div
                            className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {book.edition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`px-4 py-3 truncate text-sm font-mono ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                    >
                      {book.isbn}
                    </td>
                    <td
                      className={`px-4 py-3 truncate text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                    >
                      {book.author}
                    </td>
                    <td className="px-4 py-3 truncate text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${btn.color} ${btn.textColor}`}
                      >
                        {/* <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            btn.text === "Available"
                              ? "bg-blue-500"
                              : btn.text === "Issued"
                                ? "bg-green-700"
                                : btn.text === "Reserved"
                                  ? "bg-blue-400"
                                  : "bg-yellow-600"
                          }`}
                        ></span> */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            btn.status === "issued"
                              ? "bg-green-700"
                              : btn.status === "reserved"
                                ? "bg-amber-400"
                                : btn.status === "available"
                                  ? "bg-blue-700"
                                  : "bg-amber-700"
                          }`}
                        ></span>

                        {btn.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border transition-colors duration-300 ${
            currentPage === 1
              ? darkMode
                ? "bg-gray-700 cursor-not-allowed text-gray-400" // dark mode disabled
                : "bg-gray-300 cursor-not-allowed text-gray-600" // light mode disabled
              : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700" // dark mode active
                : "bg-black text-white hover:bg-gray-800" // light mode active
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border transition-colors duration-300 ${
              currentPage === i + 1
                ? "bg-gray-600 text-white" // active button stays same in both modes
                : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600" // dark mode inactive buttons
                  : "bg-white text-black hover:bg-gray-200" // light mode inactive buttons
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
          className={`px-3 py-1 rounded border transition-colors duration-300 ${
            currentPage === totalPages
              ? darkMode
                ? "bg-gray-700 cursor-not-allowed text-gray-400" // dark mode disabled
                : "bg-gray-300 cursor-not-allowed text-gray-600" // light mode disabled
              : darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700" // dark mode active
                : "bg-black text-white hover:bg-gray-800" // light mode active
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
