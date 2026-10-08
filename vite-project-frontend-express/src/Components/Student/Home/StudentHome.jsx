// import React from "react";
// import "../../../App.css";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";

// const StudentHome = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="flex">
//         {/* <Navbar /> */}
//         <LeftSidebar />
//         <div>Student Home</div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default StudentHome;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // Fetch Books
//   const fetchStudentBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:3002/api/books");
//       setBooks(res.data.books);
//       setFilteredBooks(res.data.books);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudentBooks();
//   }, []);

//   // Search Filter
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // Pagination Logic
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   // Issue Book Handler
//   const handleIssue = async (book) => {
//     const confirmIssue = window.confirm("Do you want to issue this book?");
//     if (!confirmIssue) return;

//     try {
//       await axios.post("http://localhost:3002/api/student/issue-book", {
//         bookId: book._id,
//         studentId: "Haneef001",
//       });

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.log("Issue Error:", err);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* Search Bar */}
//           <div className="w-full mb-6">
//             <input
//               type="text"
//               placeholder="Search by Book Name or Author..."
//               className="w-full p-3 border rounded shadow-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW SECTION */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
//               {filteredBooks.slice(0, 4).map((book) => (
//                 <div
//                   key={book._id}
//                   className="rounded-lg border shadow bg-white p-3"
//                 >
//                   <img
//                     src={book.image}
//                     className="w-full h-48 object-cover rounded"
//                     alt={book.title}
//                   />
//                   <h2 className="text-lg font-bold mt-2">{book.title}</h2>
//                   <p className="text-gray-600 text-sm">Author: {book.author}</p>
//                   <p className="text-yellow-500">⭐⭐⭐⭐☆</p>

//                   <div className="flex justify-between mt-3">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       See Details
//                     </button>

//                     <button
//                       onClick={() => handleIssue(book)}
//                       className={`px-3 py-1 rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id] ? "Issued" : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE OF WHAT YOU LIKE */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {currentBooks.map((book) => (
//               <div
//                 key={book._id}
//                 className="rounded-lg border shadow bg-white p-3"
//               >
//                 <img
//                   src={book.image}
//                   className="w-full h-48 object-cover rounded"
//                   alt={book.title}
//                 />

//                 <h2 className="text-lg font-bold mt-2">{book.title}</h2>
//                 <p className="text-gray-600 text-sm">Author: {book.author}</p>
//                 <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>

//                 <div className="flex justify-between mt-3">
//                   <button
//                     onClick={() => setSelectedBook(book)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     See Details
//                   </button>

//                   <button
//                     onClick={() => handleIssue(book)}
//                     className={`px-3 py-1 rounded text-white ${
//                       issuedBooks[book._id]
//                         ? "bg-gray-500"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     {issuedBooks[book._id] ? "Issued" : "Issue"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* PAGINATION */}
//           <div className="flex justify-center mt-6 space-x-3">
//             <button
//               disabled={currentPage <= 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-4 py-2 border rounded bg-gray-100"
//             >
//               Prev
//             </button>

//             <span className="px-4 py-2 border rounded">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               disabled={currentPage >= totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-4 py-2 border rounded bg-gray-100"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* DETAILS MODAL */}
//       {selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <img
//               src={selectedBook.image}
//               className="w-full h-56 object-cover rounded"
//               alt={selectedBook.title}
//             />

//             <h2 className="text-xl font-bold mt-3">{selectedBook.title}</h2>
//             <p className="text-gray-700">Author: {selectedBook.author}</p>
//             <p className="mt-2">{selectedBook.description}</p>

//             <button
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
//               onClick={() => setSelectedBook(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // Fetch Books
//   useEffect(() => {
//     const fetchStudentBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setLoading(false);
//       }
//     };
//     fetchStudentBooks();
//   }, []);

//   // Search Filter
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // Pagination Logic
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   // Handle Issue
//   const handleIssue = async (book) => {
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm("Do you want to issue this book?");
//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id,
//       studentId: "Haneef001",
//       studentName: "Haneef Ur Rahman",
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         "http://localhost:3002/api/student/request-issue",
//         payload
//       );
//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert("Unable to send issue request. Try again.");
//     }
//   };

//   // -----------------------------------------
//   // UI STARTS
//   // -----------------------------------------

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR (center + small) */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {filteredBooks.slice(0, 2).map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   {/* Taller Image */}
//                   <div className="w-40 h-64 overflow-hidden rounded-lg">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Content properly aligned */}
//                   <div className="flex flex-col justify-between flex-1">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 text-sm mt-1">
//                         Author: {book.author}
//                       </p>

//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                         <span className="text-sm text-gray-500 ml-1">
//                           {book.rating ?? "4.0"}
//                         </span>
//                       </div>

//                       <p className="text-gray-700 mt-3 text-sm line-clamp-3">
//                         {book.description || "No description available."}
//                       </p>
//                     </div>

//                     <div className="flex gap-2 mt-3">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-1 text-sm rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE OF WHAT YOU LIKE */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           {/* Vertical cards layout */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {currentBooks
//               .filter((book) => !filteredBooks.slice(0, 2).includes(book)) // ❌ STOP repetition
//               .map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                 >
//                   <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <h2 className="text-lg font-bold text-center">
//                     {book.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm text-center mt-1">
//                     {book.author}
//                   </p>

//                   <div className="flex justify-center items-center mt-2 gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <FaStar
//                         key={i}
//                         size={14}
//                         color={
//                           i < Math.floor(book.rating || 4)
//                             ? "#FACC15"
//                             : "#E5E7EB"
//                         }
//                       />
//                     ))}
//                   </div>

//                   <p className="text-gray-700 mt-3 text-center line-clamp-3 text-sm">
//                     {book.description || "No description available."}
//                   </p>

//                   <div className="flex justify-center gap-2 mt-4">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       See Details
//                     </button>

//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-1 rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id] ? "Issued" : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* PAGINATION */}
//           <div className="flex justify-center mt-8 space-x-1">
//             <button
//               onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {Array.from({ length: totalPages }, (_, index) => index + 1)
//               .filter(
//                 (page) =>
//                   page === 1 ||
//                   page === totalPages ||
//                   (page >= currentPage - 1 && page <= currentPage + 1)
//               )
//               .map((page, idx, arr) => (
//                 <React.Fragment key={page}>
//                   {idx > 0 && arr[idx - 1] !== page - 1 && (
//                     <span className="px-2 text-gray-400">...</span>
//                   )}
//                   <button
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-1 rounded-lg border ${
//                       currentPage === page
//                         ? "bg-indigo-600 text-white"
//                         : "bg-white text-indigo-600 hover:bg-indigo-50"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 </React.Fragment>
//               ))}

//             <button
//               onClick={() =>
//                 currentPage < totalPages && setCurrentPage(currentPage + 1)
//               }
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
//             <button
//               onClick={() => setSelectedBook(null)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-3xl"
//             >
//               <AiOutlineClose />
//             </button>

//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="md:w-1/2 h-80 rounded-lg overflow-hidden">
//                 <img
//                   src={selectedBook.image}
//                   alt={selectedBook.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="flex-1">
//                 <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
//                 <p className="text-gray-600 mt-1">
//                   Author: {selectedBook.author}
//                 </p>
//                 <p className="text-gray-600">ISBN: {selectedBook.isbn}</p>
//                 <p className="text-gray-600">Edition: {selectedBook.edition}</p>
//                 <p className="text-gray-600">
//                   Publisher: {selectedBook.publisherName}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6; // 2 rows × 3 cards = 6 books per page

//   // Fetch Books
//   useEffect(() => {
//     const fetchStudentBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setLoading(false);
//       }
//     };
//     fetchStudentBooks();
//   }, []);

//   // Search Filter
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // Pagination Logic
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   // Get books for "What's New" section (first 2 books from entire filtered list)
//   const whatsNewBooks = filteredBooks.slice(0, 2);

//   // Get books for "More of What You Like" section
//   // Always show 6 books, starting from after the 2 "What's New" books
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // Handle Issue
//   const handleIssue = async (book) => {
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm("Do you want to issue this book?");
//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id,
//       studentId: "Haneef001",
//       studentName: "Haneef Ur Rahman",
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         "http://localhost:3002/api/student/request-issue",
//         payload
//       );
//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert("Unable to send issue request. Try again.");
//     }
//   };

//   // -----------------------------------------
//   // UI STARTS
//   // -----------------------------------------

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR (center + small) */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   {/* Taller Image */}
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Content properly aligned */}
//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <br />
//                       <p className="text-gray-600 text-md mt-1">
//                         <b> Author: </b> {book.author}
//                       </p>
//                       <br />
//                       <p className="text-gray-600">
//                         <b> Edition: </b> {book.edition}
//                       </p>
//                       <br />
//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                         <span className="text-sm text-gray-500 ml-1">
//                           {book.rating ?? ""}
//                         </span>
//                       </div>

//                       {/* <p className="text-gray-700 mt-3 text-sm line-clamp-3">
//                         {book.description || "No description available."}
//                       </p> */}
//                     </div>
//                     <br />
//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE OF WHAT YOU LIKE */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           {/* Grid with exactly 2 rows × 3 columns = 6 cards */}
//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <>
//               {/* First Row - 3 cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 {moreBooks.slice(0, 3).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-60 object-fit border-2 border-gray-500"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>
//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>

//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     {/* <p className="text-gray-700 mt-3 text-center line-clamp-3 text-sm">
//                       {book.description || "No description available."}
//                     </p> */}

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Second Row - 3 cards */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {moreBooks.slice(3, 6).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>
//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>

//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <p className="text-gray-700 mt-3 text-center line-clamp-3 text-sm">
//                       {book.description || "No description available."}
//                     </p>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* PAGINATION - for More of What You Like section */}
//           <div className="flex justify-center mt-8 space-x-1">
//             <button
//               onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {Array.from({ length: totalPages }, (_, index) => index + 1)
//               .filter(
//                 (page) =>
//                   page === 1 ||
//                   page === totalPages ||
//                   (page >= currentPage - 1 && page <= currentPage + 1)
//               )
//               .map((page, idx, arr) => (
//                 <React.Fragment key={page}>
//                   {idx > 0 && arr[idx - 1] !== page - 1 && (
//                     <span className="px-2 text-gray-400">...</span>
//                   )}
//                   <button
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-1 rounded-lg border ${
//                       currentPage === page
//                         ? "bg-indigo-600 text-white"
//                         : "bg-white text-indigo-600 hover:bg-indigo-50"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 </React.Fragment>
//               ))}

//             <button
//               onClick={() =>
//                 currentPage < totalPages && setCurrentPage(currentPage + 1)
//               }
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedBook && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
//             <button
//               onClick={() => setSelectedBook(null)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-3xl"
//             >
//               <AiOutlineClose />
//             </button>

//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="md:w-80 h-100 rounded-lg overflow-hidden border-2 border-dark">
//                 <img
//                   src={selectedBook.image}
//                   alt={selectedBook.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="flex-1 pt-5 text-1xl">
//                 <p className="text-gray-600">
//                   <b> Title : </b> {selectedBook.title}
//                 </p>
//                 <br />
//                 <p className="text-gray-600">
//                   <b> ISBN: </b> {selectedBook.isbn}
//                 </p>
//                 <br />

//                 <p className="text-gray-600 mt-1">
//                   <b> Author: </b> {selectedBook.author}
//                 </p>
//                 <br />
//                 <p className="text-gray-600">
//                   <b> Edition: </b> {selectedBook.edition}
//                 </p>
//                 <br />
//                 <p className="text-gray-600">
//                   <b> Publisher: </b> {selectedBook.publisherName}
//                 </p>
//                 <br />
//                 <p className="text-gray-600">
//                   <b> Category: </b> {selectedBook.category}
//                 </p>
//                 <br />
//                 <p className="text-gray-600">
//                   <b> Language: </b> {selectedBook.language}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   const [student, setStudent] = useState(null); // 👈 logged-in student data
//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };

//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudentBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setLoading(false);
//       }
//     };
//     fetchStudentBooks();
//   }, []);

//   // SEARCH FILTER
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // PAGINATION
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }

//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName} ! Do you want to issue this book?`
//     );

//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id,

//       // ------- student info from backend -------
//       studentId: student.rollNo,
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,

//       requestedAt: new Date().toISOString(),

//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         "http://localhost:3002/api/student/request-issue",
//         payload
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert("Unable to send issue request. Try again.");
//     }
//   };

//   // ----------------------------
//   // UI STARTS BELOW
//   // ----------------------------

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <br />

//                       <p className="text-gray-600 text-md mt-1">
//                         <b>Author:</b> {book.author}
//                       </p>
//                       <br />

//                       <p className="text-gray-600">
//                         <b>Edition:</b> {book.edition}
//                       </p>
//                       <br />

//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <br />
//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE OF WHAT YOU LIKE */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <>
//               {/* ROW 1 */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 {moreBooks.slice(0, 3).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-60 object-fit border-2 border-gray-500"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>

//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>

//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ROW 2 */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {moreBooks.slice(3, 6).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>

//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>

//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

//-----------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   const [student, setStudent] = useState(null);
//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };

//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudentBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setLoading(false);
//       }
//     };
//     fetchStudentBooks();
//   }, []);

//   // SEARCH FILTER
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // PAGINATION
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }

//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName} ! Do you want to issue this book?`
//     );

//     if (!confirmIssue) return;

//     try {
//       const res = await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success !== false) {
//         alert(res.data.message || "Book issued successfully!");
//         setIssuedBooks((prev) => ({
//           ...prev,
//           [book._id]: true,
//         }));
//       } else {
//         alert(res.data.message || "Cannot issue this book");
//       }
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert("Unable to issue book. Try again.");
//     }
//   };

//   // ----------------------------
//   // UI STARTS BELOW
//   // ----------------------------
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 text-md mt-1">
//                         <b>Author:</b> {book.author}
//                       </p>
//                       <p className="text-gray-600">
//                         <b>Edition:</b> {book.edition}
//                       </p>

//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE BOOKS */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>
//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {moreBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                 >
//                   <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <h2 className="text-lg font-bold text-center">
//                     {book.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm text-center mt-1">
//                     {book.author}
//                   </p>

//                   <div className="flex justify-center items-center mt-2 gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <FaStar
//                         key={i}
//                         size={14}
//                         color={
//                           i < Math.floor(book.rating || 4)
//                             ? "#FACC15"
//                             : "#E5E7EB"
//                         }
//                       />
//                     ))}
//                   </div>

//                   <div className="flex gap-3 mt-3 ml-10">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                     >
//                       See Details
//                     </button>

//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-2 text-md font-bold rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id] ? "Issued ✔️" : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({}); // currently issued map

//   const [student, setStudent] = useState(null); // logged-in student
//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };

//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };

//     if (token) fetchBooks();
//   }, [token]);

//   // ----------------------------
//   // FETCH CURRENTLY ISSUED BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const issuedMap = {};
//         res.data.issuedBooks.forEach((ib) => {
//           issuedMap[ib.bookId] = true;
//         });
//         setIssuedBooks(issuedMap);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };

//     if (token) fetchIssuedBooks();
//   }, [token]);

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }

//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName} ! Do you want to issue this book?`
//     );

//     if (!confirmIssue) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//       alert("Book issued successfully!");
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert(err.response?.data?.message || "Unable to issue book.");
//     }
//   };

//   // ----------------------------
//   // UI STARTS BELOW
//   // ----------------------------
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 text-md mt-1">
//                         <b>Author:</b> {book.author}
//                       </p>
//                       <p className="text-gray-600">
//                         <b>Edition:</b> {book.edition}
//                       </p>
//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE OF WHAT YOU LIKE */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <>
//               {/* ROW 1 */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 {moreBooks.slice(0, 3).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-60 object-fit border-2 border-gray-500"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>
//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>
//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ROW 2 */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {moreBooks.slice(3, 6).map((book) => (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                   >
//                     <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     <h2 className="text-lg font-bold text-center">
//                       {book.title}
//                     </h2>
//                     <p className="text-gray-600 text-sm text-center mt-1">
//                       {book.author}
//                     </p>
//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued✔️" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   const [student, setStudent] = useState(null);
//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };

//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ----------------------------
//   // FETCH ISSUED BOOKS
//   // ----------------------------
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

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }

//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName} ! Do you want to issue this book?`
//     );

//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id,
//       studentId: student.rollNo,
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err);
//       alert("Unable to issue book. Try again.");
//     }
//   };

//   // ----------------------------
//   // UI STARTS
//   // ----------------------------
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-xl transition"
//                 >
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div>
//                       <h2 className="text-lg font-bold leading-tight">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 text-md mt-1">
//                         <b>Author:</b> {book.author}
//                       </p>
//                       <p className="text-gray-600">
//                         <b>Edition:</b> {book.edition}
//                       </p>

//                       <div className="flex items-center mt-2 gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE BOOKS */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {moreBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col"
//                 >
//                   <div className="w-full h-64 overflow-hidden rounded-lg mb-4">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <h2 className="text-lg font-bold text-center">
//                     {book.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm text-center mt-1">
//                     {book.author}
//                   </p>

//                   <div className="flex justify-center items-center mt-2 gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <FaStar
//                         key={i}
//                         size={14}
//                         color={
//                           i < Math.floor(book.rating || 4)
//                             ? "#FACC15"
//                             : "#E5E7EB"
//                         }
//                       />
//                     ))}
//                   </div>

//                   <div className="flex gap-3 mt-3 ml-10">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                     >
//                       See Details
//                     </button>

//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-2 text-md font-bold rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id] ? "Issued ✔️" : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});

//   const [student, setStudent] = useState(null);
//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };
//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ----------------------------
//   // FETCH ISSUED BOOKS
//   // ----------------------------
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

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredBooks.length / booksPerPage)
//   );

//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName}, do you want to issue this book?`
//     );
//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id.toString(),
//       studentId: student.rollNo,
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err.response || err);
//       alert("Unable to issue book. Try again.");
//     }
//   };

//   // ----------------------------
//   // UI STARTS
//   // ----------------------------
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />
//         <div className="p-6 w-full">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* WHATS NEW */}
//           <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {whatsNewBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-3 flex gap-4 hover:shadow-xl transition"
//                 >
//                   <div className="w-50 h-64 overflow-hidden rounded-lg mt-2">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="flex flex-col justify-between flex-1 pt-5">
//                     <div className="text-left">
//                       <h2 className="text-lg font-bold leading-tight mb-2">
//                         {book.title}
//                       </h2>
//                       <p className="text-gray-600 text-md mb-2 pt-1">
//                         <b>Author:</b> {book.author}
//                       </p>
//                       <p className="text-gray-600 mb-3  pt-1">
//                         <b>Edition:</b> {book.edition}
//                       </p>

//                       <div className="flex items-center gap-1  pt-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <FaStar
//                             key={i}
//                             size={14}
//                             color={
//                               i < Math.floor(book.rating || 4)
//                                 ? "#FACC15"
//                                 : "#E5E7EB"
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex gap-3 mt-3 ml-10">
//                       <button
//                         onClick={() => setSelectedBook(book)}
//                         className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                       >
//                         See Details
//                       </button>

//                       <button
//                         onClick={() => handleIssue(book)}
//                         disabled={issuedBooks[book._id]}
//                         className={`px-3 py-2 text-md font-bold rounded text-white ${
//                           issuedBooks[book._id]
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : "bg-green-500 hover:bg-green-600"
//                         }`}
//                       >
//                         {issuedBooks[book._id] ? "Issued✅" : "Issue"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MORE BOOKS */}
//           <h1 className="text-2xl font-bold mb-4">More of What You Like ❤️</h1>
//           {loading ? (
//             <p>Loading...</p>
//           ) : moreBooks.length === 0 ? (
//             <p className="text-center text-gray-500">No more books to show.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {moreBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center"
//                 >
//                   {/* Image top */}
//                   <div className="w-70 h-65 overflow-hidden rounded-lg mb-4 border-1 border-gray-300">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-70 h-65 object-fit"
//                     />
//                   </div>

//                   {/* Text middle */}
//                   <div className="text-center mb-4">
//                     <h2 className="text-lg font-bold">{book.title}</h2>
//                     <p className="text-gray-600 mt-1">
//                       <b>Author:</b> {book.author}
//                     </p>
//                     <p className="text-gray-600 mt-1">
//                       <b>Edition:</b> {book.edition}
//                     </p>
//                     <div className="flex justify-center items-center mt-2 gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <FaStar
//                           key={i}
//                           size={14}
//                           color={
//                             i < Math.floor(book.rating || 4)
//                               ? "#FACC15"
//                               : "#E5E7EB"
//                           }
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Buttons bottom */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                     >
//                       See Details
//                     </button>

//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-2 text-md font-bold rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id] ? "Issued✅" : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* PAGINATION */}
//           {totalPages > 1 && (
//             <div className="flex justify-center gap-2 mt-10">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 border-2 border-gray-90"
//               >
//                 Prev
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded font-bold ${
//                     currentPage === i + 1
//                       ? "bg-pink-500 text-white"
//                       : "bg-gray-300"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50  border-2 border-gray-900"
//               >
//                 Next
//               </button>
//             </div>
//           )}

//           {/* OLD STYLE MODAL */}
//           {selectedBook && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-lg w-1/2 relative flex gap-4">
//                 <button
//                   className="absolute top-2 right-2 text-gray-700 text-xl"
//                   onClick={() => setSelectedBook(null)}
//                 >
//                   <AiOutlineClose />
//                 </button>

//                 <div className="w-65 h-80 overflow-hidden rounded-lg">
//                   <img
//                     src={selectedBook.image}
//                     alt={selectedBook.title}
//                     className="w-full h-full object-fit border-2 border-grey-400"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <h2 className="text-2xl font-bold mb-2 pt-3">
//                     {selectedBook.title}
//                   </h2>
//                   <p className="mb-1 pt-5">
//                     <b>Author:</b> {selectedBook.author}
//                   </p>
//                   <p className="mb-1  pt-5">
//                     <b>Edition:</b> {selectedBook.edition}
//                   </p>
//                   <p className="mb-1  pt-5">
//                     <b>Publisher:</b> {selectedBook.publisherName}
//                   </p>
//                   <p className="mb-1  pt-5">
//                     <b>Category:</b> {selectedBook.category}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//-----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [student, setStudent] = useState(null);

//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };
//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ----------------------------
//   // FETCH ISSUED BOOKS
//   // ----------------------------
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

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION (only when NOT searching)
//   // ----------------------------
//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // ISSUE HANDLER
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName}, do you want to issue this book?`
//     );
//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id.toString(),
//       studentId: student.rollNo,
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err.response || err);
//       alert("Unable to issue book. Try again.");
//     }
//   };

//   // ----------------------------
//   // WISHLIST
//   // ----------------------------
//   const handleWishlist = (book) => {
//     setWishlist((prev) => ({
//       ...prev,
//       [book._id]: !prev[book._id],
//     }));
//     alert(`${book.title} added to wishlist!`);
//   };

//   // ----------------------------
//   // UI STARTS HERE
//   // ----------------------------
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full min-h-screen flex flex-col justify-between">
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* ---------------------------------------------------- */}
//           {/* SEARCH RESULTS (LIST STYLE ONLY)                     */}
//           {/* ---------------------------------------------------- */}
//           {searchTerm !== "" && (
//             <>
//               <h1 className="text-xl font-bold mb-4">Search Results 🔍</h1>

//               {filteredBooks.length === 0 ? (
//                 <p className="text-gray-500">No books found.</p>
//               ) : (
//                 <div className="space-y-4 mb-12">
//                   {filteredBooks.map((book, index) => (
//                     <div
//                       key={book._id}
//                       className="bg-white p-4 rounded-lg shadow border flex items-center justify-between"
//                     >
//                       {/* TITLE + AUTHOR */}
//                       <h2 className="text-lg font-bold">
//                         {index + 1}. {book.title}{" "}
//                         <span className="font-normal text-gray-600">
//                           By {book.author}
//                         </span>
//                       </h2>

//                       {/* BUTTONS */}
//                       <div className="flex items-center gap-3">
//                         {issuedBooks[book._id] ? (
//                           <button className="bg-gray-600 text-white px-4 py-1 rounded">
//                             Issued
//                           </button>
//                         ) : book.copies === 0 ? (
//                           <button className="bg-orange-500 text-white px-4 py-1 rounded">
//                             Reserve
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleIssue(book)}
//                             className="bg-green-500 text-white px-4 py-1 rounded"
//                           >
//                             Available
//                           </button>
//                         )}

//                         <button
//                           onClick={() => handleWishlist(book)}
//                           className="px-3 py-1 bg-pink-500 text-white rounded"
//                         >
//                           ❤️ Wishlist
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* ---------------------------------------------------- */}
//           {/* HIDE THESE SECTIONS WHEN SEARCHING                   */}
//           {/* ---------------------------------------------------- */}
//           {searchTerm === "" && (
//             <>
//               {/* WHATS NEW */}
//               <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                   {whatsNewBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className="bg-white border rounded-xl p-3 flex gap-4 hover:shadow-xl transition"
//                     >
//                       <div className="w-50 h-64 overflow-hidden rounded-lg mt-2">
//                         <img
//                           src={book.image}
//                           alt={book.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>

//                       <div className="flex flex-col justify-between flex-1 pt-5">
//                         <div className="text-left">
//                           <h2 className="text-lg font-bold leading-tight mb-2">
//                             {book.title}
//                           </h2>
//                           <p className="text-gray-600 text-md mb-2 pt-1">
//                             <b>Author:</b> {book.author}
//                           </p>
//                           <p className="text-gray-600 mb-3 pt-1">
//                             <b>Edition:</b> {book.edition}
//                           </p>
//                         </div>

//                         <div className="flex gap-3 mt-3 ml-10">
//                           <button
//                             onClick={() => setSelectedBook(book)}
//                             className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                           >
//                             See Details
//                           </button>

//                           <button
//                             onClick={() => handleIssue(book)}
//                             disabled={issuedBooks[book._id]}
//                             className={`px-3 py-2 text-md font-bold rounded text-white ${
//                               issuedBooks[book._id]
//                                 ? "bg-gray-500 cursor-not-allowed"
//                                 : "bg-green-500 hover:bg-green-600"
//                             }`}
//                           >
//                             {issuedBooks[book._id] ? "Issued" : "Issue"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* MORE BOOKS */}
//               <h1 className="text-2xl font-bold mb-4">
//                 More of What You Like ❤️
//               </h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : moreBooks.length === 0 ? (
//                 <p className="text-center text-gray-500">
//                   No more books to show.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {moreBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center"
//                     >
//                       <div className="w-70 h-65 overflow-hidden rounded-lg mb-4 border-1 border-gray-300">
//                         <img
//                           src={book.image}
//                           alt={book.title}
//                           className="w-70 h-65 object-fit"
//                         />
//                       </div>

//                       <div className="text-center mb-4">
//                         <h2 className="text-lg font-bold">{book.title}</h2>
//                         <p className="text-gray-600 mt-1">
//                           <b>Author:</b> {book.author}
//                         </p>
//                         <p className="text-gray-600 mt-1">
//                           <b>Edition:</b> {book.edition}
//                         </p>
//                       </div>

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => setSelectedBook(book)}
//                           className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                         >
//                           See Details
//                         </button>

//                         <button
//                           onClick={() => handleIssue(book)}
//                           disabled={issuedBooks[book._id]}
//                           className={`px-3 py-2 text-md font-bold rounded text-white ${
//                             issuedBooks[book._id]
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-600"
//                           }`}
//                         >
//                           {issuedBooks[book._id] ? "Issued" : "Issue"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* FOOTER ALWAYS AT BOTTOM */}
//           <div className="mt-20">
//             <FooterAll />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function StudentHome() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null); // Modal trigger
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [student, setStudent] = useState(null);

//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };
//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ----------------------------
//   // FETCH ISSUED BOOKS
//   // ----------------------------
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

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION (only when NOT searching)
//   // ----------------------------
//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   // ----------------------------
//   // ISSUE HANDLER
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) {
//       alert("Student details not loaded yet.");
//       return;
//     }
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `${student.firstName}, do you want to issue this book?`
//     );
//     if (!confirmIssue) return;

//     const payload = {
//       bookId: book._id.toString(),
//       studentId: student.rollNo,
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,
//       requestedAt: new Date().toISOString(),
//       bookDetails: {
//         title: book.title,
//         author: book.author,
//         isbn: book.isbn,
//         edition: book.edition,
//         publisherName: book.publisherName,
//         category: book.category,
//       },
//     };

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({
//         ...prev,
//         [book._id]: true,
//       }));
//     } catch (err) {
//       console.error("Issue request failed:", err.response || err);
//       alert("Unable to issue book. Try again.");
//     }
//   };

//   // ----------------------------
//   // WISHLIST
//   // ----------------------------
//   const handleWishlist = (book) => {
//     setWishlist((prev) => ({
//       ...prev,
//       [book._id]: !prev[book._id],
//     }));
//     alert(`${book.title} added to wishlist!`);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div
//           className={`p-6 w-full min-h-screen flex flex-col ${
//             searchTerm !== "" ? "pt-30" : ""
//           } justify-between`}
//         >
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* SEARCH RESULTS */}
//           {searchTerm !== "" && (
//             <>
//               <h1 className="text-xl font-bold mb-4">Search Results 🔍</h1>
//               {filteredBooks.length === 0 ? (
//                 <p className="text-gray-500">No books found.</p>
//               ) : (
//                 <div className="space-y-4 mb-12 flex flex-col items-center">
//                   {filteredBooks.map((book, index) => (
//                     <div
//                       key={book._id}
//                       className="w-3/4 max-w-2xl bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-xl transition"
//                     >
//                       <div>
//                         <h2 className="text-lg font-bold">
//                           {index + 1}. {book.title}
//                         </h2>
//                         <p className="text-gray-600 text-sm">
//                           By {book.author}
//                         </p>

//                         {/* Stars 4 filled, 1 empty */}
//                         <div className="flex mt-1">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={
//                                 i < 4 ? "text-yellow-400" : "text-gray-300"
//                               }
//                             />
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         {issuedBooks[book._id] ? (
//                           <button className="bg-gray-600 text-white px-4 py-1 rounded">
//                             Issued
//                           </button>
//                         ) : book.copies === 0 ? (
//                           <button className="bg-orange-500 text-white px-4 py-1 rounded">
//                             Reserve
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleIssue(book)}
//                             className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
//                           >
//                             Available
//                           </button>
//                         )}

//                         <button
//                           onClick={() => handleWishlist(book)}
//                           className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
//                         >
//                           ❤️ Wishlist
//                         </button>

//                         <button
//                           onClick={() => setSelectedBook(book)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                         >
//                           See Details
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* WHATS NEW */}
//           {searchTerm === "" && (
//             <>
//               <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//                   {whatsNewBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className="bg-white border rounded-xl p-3 flex gap-4 hover:shadow-xl transition"
//                     >
//                       <div className="w-50 h-64 overflow-hidden rounded-lg mt-2">
//                         <img
//                           src={book.image}
//                           alt={book.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>

//                       <div className="flex flex-col justify-between flex-1 pt-5">
//                         <div className="text-left">
//                           <h2 className="text-lg font-bold leading-tight mb-2">
//                             {book.title}
//                           </h2>
//                           <p className="text-gray-600 text-md mb-2 pt-1">
//                             <b>Author:</b> {book.author}
//                           </p>
//                           <p className="text-gray-600 mb-3 pt-1">
//                             <b>Edition:</b> {book.edition}
//                           </p>
//                         </div>

//                         <div className="flex gap-3 mt-3 ml-10">
//                           <button
//                             onClick={() => setSelectedBook(book)}
//                             className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                           >
//                             See Details
//                           </button>

//                           <button
//                             onClick={() => handleIssue(book)}
//                             disabled={issuedBooks[book._id]}
//                             className={`px-3 py-2 text-md font-bold rounded text-white ${
//                               issuedBooks[book._id]
//                                 ? "bg-gray-500 cursor-not-allowed"
//                                 : "bg-green-500 hover:bg-green-600"
//                             }`}
//                           >
//                             {issuedBooks[book._id] ? "Issued" : "Issue"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* MORE BOOKS */}
//               <h1 className="text-2xl font-bold mb-4">
//                 More of What You Like ❤️
//               </h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : moreBooks.length === 0 ? (
//                 <p className="text-center text-gray-500">
//                   No more books to show.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {moreBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center"
//                     >
//                       <div className="w-70 h-65 overflow-hidden rounded-lg mb-4 border-1 border-gray-300">
//                         <img
//                           src={book.image}
//                           alt={book.title}
//                           className="w-70 h-65 object-fit"
//                         />
//                       </div>

//                       <div className="text-center mb-4">
//                         <h2 className="text-lg font-bold">{book.title}</h2>
//                         <p className="text-gray-600 mt-1">
//                           <b>Author:</b> {book.author}
//                         </p>
//                         <p className="text-gray-600 mt-1">
//                           <b>Edition:</b> {book.edition}
//                         </p>
//                       </div>

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => setSelectedBook(book)}
//                           className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded"
//                         >
//                           See Details
//                         </button>

//                         <button
//                           onClick={() => handleIssue(book)}
//                           disabled={issuedBooks[book._id]}
//                           className={`px-3 py-2 text-md font-bold rounded text-white ${
//                             issuedBooks[book._id]
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-600"
//                           }`}
//                         >
//                           {issuedBooks[book._id] ? "Issued" : "Issue"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* MODAL */}
//           {selectedBook && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//               <div className="bg-white p-6 rounded-xl w-3/4 max-w-lg relative">
//                 <button
//                   onClick={() => setSelectedBook(null)}
//                   className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
//                 >
//                   <AiOutlineClose size={24} />
//                 </button>
//                 <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
//                 <p className="text-gray-700 mb-1">
//                   <b>Author:</b> {selectedBook.author}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <b>Edition:</b> {selectedBook.edition}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <b>Publisher:</b> {selectedBook.publisherName}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <b>ISBN:</b> {selectedBook.isbn}
//                 </p>
//                 <p className="text-gray-700 mb-1">
//                   <b>Category:</b> {selectedBook.category}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* FOOTER */}
//           <div className="mt-20">
//             <FooterAll />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//---------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import FooterAll from "../../Footer/FooterAll";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function StudentHome({ darkMode }) {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const [wishlist, setWishlist] = useState({});
//   const [student, setStudent] = useState(null);

//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT DATA
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Error loading student data:", err);
//       }
//     };
//     if (token) fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // FETCH BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/api/books");
//         setBooks(res.data.books || []);
//         setFilteredBooks(res.data.books || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setLoading(false);
//       }
//     };
//     fetchBooks();
//   }, []);

//   // ----------------------------
//   // FETCH ISSUED BOOKS
//   // ----------------------------
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         const issuedObj = {};
//         res.data.issuedBooks.forEach((b) => {
//           const id = b.bookId._id || b.bookId;
//           issuedObj[id.toString()] = true;
//         });

//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // Add a new useEffect for reserved books
//   useEffect(() => {
//     const fetchReservedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         const reservedObj = {};
//         res.data.reservations.forEach((r) => {
//           const id = r.bookId._id || r.bookId;
//           reservedObj[id.toString()] = true;
//         });

//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       }
//     };
//     fetchReservedBooks();
//   }, [token]);

//   // ----------------------------
//   // SEARCH FILTER
//   // ----------------------------
//   useEffect(() => {
//     const results = books.filter(
//       (book) =>
//         book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author?.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, books]);

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const whatsNewBooks = filteredBooks.slice(0, 2);
//   const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
//   const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
//   const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

//   const totalPages = Math.ceil((filteredBooks.length - 2) / booksPerPage);

//   //-------------------------------------------------------------------------------
//   // ----------------------------
//   // ISSUE / RESERVE HANDLER (with safe reservation check)
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) return;

//     const bookId = book._id;

//     // Check if already issued or reserved
//     if (issuedBooks[bookId]) {
//       alert(`You have already issued "${book.title}"!`);
//       return;
//     }
//     if (reservedBooks[bookId]) {
//       alert(`You have already reserved "${book.title}"!`);
//       return;
//     }

//     const payload = {
//       studentName: `${student.firstName} ${student.lastName}`,
//       studentEmail: student.email,
//       batchNo: student.batchNo,
//       degree: student.degree,
//       program: student.program,
//       cnic: student.cnic,
//     };

//     try {
//       // Reserve flow (no copies)
//       if (book.availableCopies === 0) {
//         const confirmReserve = window.confirm(
//           `The book "${book.title}" is currently unavailable. Do you want to reserve it?`,
//         );
//         if (!confirmReserve) return;

//         const res = await axios.post(
//           `http://localhost:3002/api/books/issue/${bookId}`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         if (res.data.type === "reserved") {
//           setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
//           alert(`⏳ "${book.title}" reserved successfully!`);
//         } else if (res.data.type === "alreadyReserved") {
//           setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
//           alert(`You have already reserved "${book.title}".`);
//         }

//         return;
//       }

//       // Issue flow (availableCopies > 0)
//       const confirmIssue = window.confirm(
//         `Do you want to issue the book "${book.title}"?`,
//       );
//       if (!confirmIssue) return;

//       const res = await axios.post(
//         `http://localhost:3002/api/books/issue/${bookId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       if (res.data.type === "issued") {
//         // Instead of { [bookId]: true }
//         setIssuedBooks((prev) => ({
//           ...prev,
//           [bookId]: true,
//         }));

//         alert(`✅ "${book.title}" issued successfully!`);
//         fetchIssuedBooks(); // refresh the list
//       }
//     } catch (err) {
//       console.error("Issue/Reserve error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Action failed");
//     }
//   };

//   // ----------------------------
//   // FETCH WISHLIST FOR CURRENT STUDENT
//   // ----------------------------

//   useEffect(() => {
//     if (token) fetchWishlist();
//   }, [token]);

//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get("http://localhost:3002/api/wishlist", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const wishlistMap = {};
//       res.data.wishlist.forEach((item) => {
//         wishlistMap[item.bookId] = true; // ✅ bookId only
//       });

//       setWishlist(wishlistMap);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   };

//   const handleWishlist = async (book) => {
//     const isInWishlist = wishlist[book._id];

//     const confirmMsg = isInWishlist
//       ? "Are you sure you want to remove this book from wishlist?"
//       : "Are you sure you want to add this book to wishlist?";

//     if (!window.confirm(confirmMsg)) return;

//     try {
//       await axios.post(
//         "http://localhost:3002/api/wishlist",
//         {
//           bookId: book._id,
//           action: isInWishlist ? "remove" : "add",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setWishlist((prev) => {
//         const updated = { ...prev };
//         if (isInWishlist) {
//           delete updated[book._id];
//         } else {
//           updated[book._id] = true;
//         }
//         return updated;
//       });

//       alert(
//         isInWishlist
//           ? "❌ Book removed from wishlist"
//           : "❤️ Book added to wishlist",
//       );
//     } catch (error) {
//       console.error("Wishlist error:", error);
//       alert("Wishlist action failed");
//     }
//   };

//   // ----------------------------
//   // UI STARTS HERE
//   // ----------------------------
//   return (
//     <>
//       <Navbar darkMode={darkMode} />
//       <div className="flex">
//         <LeftSidebar darkMode={darkMode} />
//         <div
//           className={`p-6 w-full min-h-screen flex flex-col ${
//             searchTerm ? "pt-30" : ""
//           }`}
//         >
//           {/* SEARCH BAR */}
//           <div className="w-full flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search books..."
//               // className="w-2/3 md:w-1/2 p-3 border rounded-lg shadow-sm text-center"
//               className={`w-2/3 md:w-1/2 p-3 border rounded-lg shadow-sm text-center transition-colors duration-300 ${
//                 darkMode
//                   ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
//                   : "bg-white text-black border-gray-300"
//               }`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* SEARCH RESULTS */}
//           {searchTerm !== "" && (
//             <>
//               <h1 className="text-xl font-bold mb-4">Search Results 🔍</h1>
//               {filteredBooks.length === 0 ? (
//                 <p className="text-gray-500">No books found.</p>
//               ) : (
//                 <div className="space-y-4 mb-12 flex flex-col items-center">
//                   {filteredBooks.map((book, index) => (
//                     <div
//                       key={book._id}
//                       className="w-4/5 max-w-3xl bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-xl transition"
//                     >
//                       <div>
//                         <h2 className="text-lg font-bold">
//                           {index + 1}. {book.title}
//                         </h2>
//                         <p className="text-gray-600 text-sm">
//                           By {book.author}
//                         </p>

//                         {/* Stars */}
//                         <div className="flex mt-1">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={
//                                 i < 4 ? "text-yellow-400" : "text-gray-300"
//                               }
//                             />
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         {issuedBooks[book._id] ? (
//                           <button
//                             disabled
//                             className={`px-4 py-1 rounded text-white cursor-not-allowed ${
//                               issuedBooks[book._id] === true
//                                 ? "bg-gray-600"
//                                 : issuedBooks[book._id] === "reserved"
//                                   ? "bg-yellow-500"
//                                   : "bg-gray-600"
//                             }`}
//                           >
//                             {issuedBooks[book._id] === true
//                               ? "Issued"
//                               : issuedBooks[book._id] === "reserved"
//                                 ? "Reserved✅"
//                                 : "Issued✅"}
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleIssue(book)}
//                             className={`px-4 py-1 rounded text-white ${
//                               book.availableCopies === 0
//                                 ? "bg-orange-500 hover:bg-orange-600"
//                                 : "bg-green-500 hover:bg-green-600"
//                             }`}
//                           >
//                             {book.availableCopies === 0 ? "Reserve" : "Issue"}
//                           </button>
//                         )}

//                         <button
//                           onClick={() => handleWishlist(book)}
//                           className={`px-3 py-1 rounded text-white font-bold transition ${
//                             wishlist[book._id]
//                               ? "bg-red-500 hover:bg-red-600"
//                               : "bg-pink-500 hover:bg-pink-600"
//                           }`}
//                         >
//                           {wishlist[book._id]
//                             ? "❤️ In Wishlist"
//                             : "🤍 Wishlist"}
//                         </button>

//                         <button
//                           onClick={() => setSelectedBook(book)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                         >
//                           See Details
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* WHATS NEW */}
//           {searchTerm === "" && (
//             <>
//               <h1 className="text-2xl font-bold mb-4">What's New 📚</h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//                   {whatsNewBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ${
//                         darkMode
//                           ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
//                           : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
//                       }`}
//                     >
//                       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>

//                       <div className="relative flex flex-col md:flex-row h-full">
//                         {/* Enhanced Book Image */}
//                         <div className="relative overflow-hidden md:w-48 lg:w-56">
//                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <img
//                             src={book.image}
//                             alt={book.title}
//                             className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                           />
//                           <div className="absolute top-3 left-3">
//                             <span
//                               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                 darkMode
//                                   ? "bg-indigo-500/20 text-indigo-300"
//                                   : "bg-indigo-100 text-indigo-800"
//                               }`}
//                             >
//                               New
//                             </span>
//                           </div>
//                         </div>

//                         {/* Enhanced Book Information */}
//                         <div className="flex-1 p-6 flex flex-col">
//                           <div className="flex-1">
//                             <h3
//                               className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {book.title}
//                             </h3>

//                             <div className="space-y-3 mb-4">
//                               <div className="flex items-center gap-2">
//                                 <svg
//                                   className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                                   />
//                                 </svg>
//                                 <span
//                                   className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                                 >
//                                   by {book.author}
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-2">
//                                 <svg
//                                   className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                                   />
//                                 </svg>
//                                 <span
//                                   className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                                 >
//                                   Edition {book.edition}
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-2">
//                                 <svg
//                                   className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
//                                   />
//                                 </svg>
//                                 <span
//                                   className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                                 >
//                                   {book.category}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-center mb-4">
//                               {[...Array(5)].map((_, i) => (
//                                 <svg
//                                   key={i}
//                                   className={`w-5 h-5 ${
//                                     i < 4 ? "text-yellow-400" : "text-gray-300"
//                                   }`}
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                               ))}
//                               <span
//                                 className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                               >
//                                 4.0
//                               </span>
//                             </div>
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
//                             <button
//                               onClick={() => setSelectedBook(book)}
//                               className={`group relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                                 darkMode
//                                   ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border-2 border-slate-600 hover:border-slate-500 hover:shadow-lg"
//                                   : "bg-white text-slate-800 hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 hover:shadow-lg"
//                               }`}
//                             >
//                               <svg
//                                 className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
//                                   darkMode ? "text-slate-400" : "text-slate-600"
//                                 }`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                 />
//                               </svg>
//                               <span>View Details</span>
//                             </button>

//                             <button
//                               onClick={() => handleIssue(book)}
//                               disabled={
//                                 issuedBooks[book._id] || reservedBooks[book._id]
//                               }
//                               className={`group relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
//                                 issuedBooks[book._id]
//                                   ? darkMode
//                                     ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
//                                     : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
//                                   : reservedBooks[book._id]
//                                     ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 cursor-not-allowed border-2 border-amber-600 shadow-md"
//                                     : book.availableCopies === 0
//                                       ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-2 border-orange-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                                       : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-2 border-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                               }`}
//                             >
//                               {/* Button Icon */}
//                               {issuedBooks[book._id] ? (
//                                 <svg
//                                   className="w-4 h-4 text-emerald-400"
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                               ) : reservedBooks[book._id] ? (
//                                 <svg
//                                   className="w-4 h-4 text-amber-900"
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                               ) : book.availableCopies === 0 ? (
//                                 <svg
//                                   className="w-4 h-4 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                   />
//                                 </svg>
//                               ) : (
//                                 <svg
//                                   className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                                   />
//                                 </svg>
//                               )}

//                               {/* Button Text with better contrast */}
//                               <span className="drop-shadow-sm">
//                                 {issuedBooks[book._id]
//                                   ? "Issued"
//                                   : reservedBooks[book._id]
//                                     ? "Reserved"
//                                     : book.availableCopies === 0
//                                       ? "Reserve"
//                                       : "Issue"}
//                               </span>

//                               {/* Enhanced Shimmer effect */}
//                               {!issuedBooks[book._id] &&
//                                 !reservedBooks[book._id] && (
//                                   <div className="absolute inset-0 -top-2 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
//                                 )}

//                               {/* Subtle pulse effect for available books */}
//                               {!issuedBooks[book._id] &&
//                                 !reservedBooks[book._id] &&
//                                 book.availableCopies > 0 && (
//                                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
//                                 )}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* MORE BOOKS */}
//               <h1 className="text-2xl font-bold mb-4">
//                 More of What You Like ❤️
//               </h1>
//               {loading ? (
//                 <p>Loading...</p>
//               ) : moreBooks.length === 0 ? (
//                 <p className="text-center text-gray-500">
//                   No more books to show.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {moreBooks.map((book) => (
//                     <div
//                       key={book._id}
//                       className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col ${
//                         darkMode
//                           ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
//                           : "bg-gradient-to-br from-white to-gray-50 border border-gray-400"
//                       }`}
//                     >
//                       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>

//                       {/* Enhanced Book Image */}
//                       <div className="relative overflow-hidden p-6">
//                         <div className="relative mx-auto w-55 h-64 rounded-xl  overflow-hidden shadow-lg">
//                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <img
//                             src={book.image}
//                             alt={book.title}
//                             className="w-full h-full object-fit border border-gray-500 transition-transform duration-500 group-hover:scale-105"
//                           />
//                         </div>
//                       </div>

//                       {/* Book Information */}
//                       <div className="flex-1 px-6 pb-6 flex flex-col">
//                         <div className="text-center mb-4">
//                           <h3
//                             className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
//                           >
//                             {book.title}
//                           </h3>

//                           <div className="space-y-2 mb-4">
//                             <div className="flex items-center justify-center gap-2">
//                               <svg
//                                 className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                                 />
//                               </svg>
//                               <span
//                                 className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                               >
//                                 {book.author}
//                               </span>
//                             </div>

//                             <div className="flex items-center justify-center gap-2">
//                               <svg
//                                 className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                                 />
//                               </svg>
//                               <span
//                                 className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//                               >
//                                 Edition {book.edition}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Rating Stars */}
//                           <div className="flex items-center justify-center mb-4">
//                             {[...Array(5)].map((_, i) => (
//                               <svg
//                                 key={i}
//                                 className={`w-5 h-5 ${
//                                   i < 4 ? "text-yellow-400" : "text-gray-300"
//                                 }`}
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                               </svg>
//                             ))}
//                             <span
//                               className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                             >
//                               4.0
//                             </span>
//                           </div>
//                         </div>

//                         {/* Professional Action Buttons */}
//                         <div className="flex gap-3 mt-auto">
//                           <button
//                             onClick={() => setSelectedBook(book)}
//                             className={`group relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                               darkMode
//                                 ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border-2 border-slate-600 hover:border-slate-500"
//                                 : "bg-white text-slate-800 hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400"
//                             }`}
//                           >
//                             <svg
//                               className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
//                                 darkMode ? "text-slate-400" : "text-slate-600"
//                               }`}
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                               />
//                             </svg>
//                             <span>Details</span>
//                           </button>

//                           <button
//                             onClick={() => handleIssue(book)}
//                             disabled={
//                               issuedBooks[book._id] || reservedBooks[book._id]
//                             }
//                             className={`group relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
//                               issuedBooks[book._id]
//                                 ? darkMode
//                                   ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
//                                   : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
//                                 : reservedBooks[book._id]
//                                   ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 cursor-not-allowed border-2 border-amber-600 shadow-md"
//                                   : book.availableCopies === 0
//                                     ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-2 border-orange-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                                     : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-2 border-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                             }`}
//                           >
//                             {/* Button Icon */}
//                             {issuedBooks[book._id] ? (
//                               <svg
//                                 className="w-4 h-4 text-emerald-400"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             ) : reservedBooks[book._id] ? (
//                               <svg
//                                 className="w-4 h-4 text-amber-900"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             ) : book.availableCopies === 0 ? (
//                               <svg
//                                 className="w-4 h-4 text-white"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                 />
//                               </svg>
//                             ) : (
//                               <svg
//                                 className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                                 />
//                               </svg>
//                             )}

//                             {/* Button Text */}
//                             <span className="drop-shadow-sm">
//                               {issuedBooks[book._id]
//                                 ? "Issued"
//                                 : reservedBooks[book._id]
//                                   ? "Reserved"
//                                   : book.availableCopies === 0
//                                     ? "Reserve"
//                                     : "Issue"}
//                             </span>

//                             {/* Shimmer effect for active buttons */}
//                             {!issuedBooks[book._id] &&
//                               !reservedBooks[book._id] && (
//                                 <div className="absolute inset-0 -top-2 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
//                               )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* MODAL */}
//           {selectedBook && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//               <div
//                 className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ${
//                   darkMode
//                     ? "bg-gradient-to-br from-slate-900 to-slate-800"
//                     : "bg-gradient-to-br from-white to-gray-50"
//                 }`}
//               >
//                 <div className="flex flex-col md:flex-row h-full">
//                   {/* Book Image Section */}
//                   <div className="relative md:w-2/5 lg:w-1/3 p-6 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
//                     <div className="relative group">
//                       <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
//                       <div className="relative overflow-hidden rounded-xl shadow-2xl">
//                         <img
//                           src={selectedBook.image}
//                           alt={selectedBook.title}
//                           className="w-80 h-80 object-fit"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Book Details Section */}
//                   <div className="flex-1 p-6 md:p-8 flex flex-col">
//                     {/* Header with Close Button */}
//                     <div className="flex items-start justify-between mb-6">
//                       <div>
//                         <h2
//                           className={`text-2xl md:text-3xl font-bold mb-2 ${
//                             darkMode ? "text-white" : "text-gray-900"
//                           }`}
//                         >
//                           {selectedBook.title}
//                         </h2>
//                         <div className="flex items-center gap-2">
//                           {[...Array(5)].map((_, i) => (
//                             <svg
//                               key={i}
//                               className={`w-5 h-5 ${
//                                 i < 4 ? "text-yellow-400" : "text-gray-300"
//                               }`}
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           ))}
//                           <span
//                             className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                           >
//                             4.0
//                           </span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setSelectedBook(null)}
//                         className={`p-2 rounded-xl transition-colors ${
//                           darkMode
//                             ? "text-gray-400 hover:text-white hover:bg-slate-700"
//                             : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                         }`}
//                       >
//                         <svg
//                           className="w-6 h-6"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                           />
//                         </svg>
//                       </button>
//                     </div>

//                     {/* Book Information */}
//                     <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
//                       <div
//                         className={`p-4 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               Author
//                             </p>
//                             <p
//                               className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.author}
//                             </p>
//                           </div>
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               Edition
//                             </p>
//                             <p
//                               className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.edition}
//                             </p>
//                           </div>
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               Publisher
//                             </p>
//                             <p
//                               className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.publisherName}
//                             </p>
//                           </div>
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               ISBN
//                             </p>
//                             <p
//                               className={`text-base font-mono ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.isbn}
//                             </p>
//                           </div>
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               Category
//                             </p>
//                             <p
//                               className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.category}
//                             </p>
//                           </div>
//                           <div>
//                             <p
//                               className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
//                             >
//                               Language
//                             </p>
//                             <p
//                               className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
//                             >
//                               {selectedBook.language}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => handleIssue(selectedBook)}
//                         disabled={
//                           issuedBooks[selectedBook._id] ||
//                           reservedBooks[selectedBook._id]
//                         }
//                         className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                           issuedBooks[selectedBook._id]
//                             ? darkMode
//                               ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
//                               : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
//                             : reservedBooks[selectedBook._id]
//                               ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 cursor-not-allowed border-2 border-amber-600 shadow-md"
//                               : selectedBook.availableCopies === 0
//                                 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-2 border-orange-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                                 : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-2 border-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                         }`}
//                       >
//                         {/* Button Icon */}
//                         {issuedBooks[selectedBook._id] ? (
//                           <svg
//                             className="w-5 h-5 text-emerald-400"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : reservedBooks[selectedBook._id] ? (
//                           <svg
//                             className="w-5 h-5 text-amber-900"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : selectedBook.availableCopies === 0 ? (
//                           <svg
//                             className="w-5 h-5 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             className="w-5 h-5 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                             />
//                           </svg>
//                         )}

//                         {/* Button Text */}
//                         <span>
//                           {issuedBooks[selectedBook._id]
//                             ? "Issued"
//                             : reservedBooks[selectedBook._id]
//                               ? "Reserved"
//                               : selectedBook.availableCopies === 0
//                                 ? "Reserve Book"
//                                 : "Issue Book"}
//                         </span>
//                       </button>

//                       <button
//                         onClick={() => handleWishlist(selectedBook)}
//                         className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                           wishlist[selectedBook._id]
//                             ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 border-2 border-red-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                             : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 border-2 border-pink-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                         }`}
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         <span>
//                           {wishlist[selectedBook._id]
//                             ? "In Wishlist"
//                             : "Add to Wishlist"}
//                         </span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* PAGINATION */}
//           <div className="flex justify-center items-center gap-2 mt-6">
//             {/* PREV BUTTON */}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 rounded border border-black font-bold ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-black cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Prev
//             </button>

//             {/* PAGE NUMBERS */}
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded border border-black font-bold ${
//                   currentPage === i + 1
//                     ? "bg-pink-500 text-white font-bold"
//                     : "bg-white text-black hover:bg-gray-200"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             {/* NEXT BUTTON */}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 rounded border border-black font-bold ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-black cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <FooterAll darkMode={darkMode} />
//     </>
//   );
// }

//----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import FooterAll from "../../Footer/FooterAll";
import LeftSidebar from "../Sidebar/LeftSidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

export default function StudentHome({ darkMode }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Separate search states for each field
  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [bookNameSearch, setBookNameSearch] = useState(""); // Assuming this is different from title
  const [mainSearch, setMainSearch] = useState(""); // Main search state

  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState({});
  const [reservedBooks, setReservedBooks] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [student, setStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Add these with your other state variables
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);
  const [categorySearch, setCategorySearch] = useState(""); // Add this new state

  const token = localStorage.getItem("token");
  const booksPerPage = 6;
  const getId = (id) => id?.toString();

  // ----------------------------
  // FETCH LOGGED-IN STUDENT DATA
  // ----------------------------
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:3002/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data.user);
      } catch (err) {
        console.error("Error loading student data:", err);
      }
    };
    if (token) fetchStudent();
  }, [token]);

  // ----------------------------
  // FETCH BOOKS
  // ----------------------------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/books");
        setBooks(res.data.books || []);
        setFilteredBooks(res.data.books || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // ----------------------------
  // FETCH ISSUED BOOKS
  // ----------------------------
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

  // ----------------------------
  // FETCH RESERVED BOOKS
  // ----------------------------
  const fetchReservedBooks = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://localhost:3002/api/books/student/reserved-books",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const reservedObj = {};
      res.data.reservations.forEach((r) => {
        const id = r.bookId._id || r.bookId;
        reservedObj[id.toString()] = true;
      });

      setReservedBooks(reservedObj);
    } catch (err) {
      console.error("Error fetching reserved books:", err);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
    fetchReservedBooks();
  }, [token]);

  // ----------------------------
  // SEARCH FILTER WITH MULTIPLE OPTIONS
  // ----------------------------
  // ----------------------------
  // 2. REPLACE YOUR OLD LOGIC WITH THIS UPDATED ONE
  // ----------------------------

  // Updated useEffect hook
  useEffect(() => {
    let results = [...books]; // Start with all books

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const lowercasedSearch = mainSearch.toLowerCase();
      results = results.filter(
        (book) =>
          book.title?.toLowerCase().includes(lowercasedSearch) ||
          book.author?.toLowerCase().includes(lowercasedSearch) ||
          book.isbn?.toLowerCase().includes(lowercasedSearch) ||
          book.category?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply title search if it exists (from filter options)
    if (titleSearch) {
      const lowercasedSearch = titleSearch.toLowerCase();
      results = results.filter((book) =>
        book.title?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply author search if it exists (from filter options)
    if (authorSearch) {
      const lowercasedSearch = authorSearch.toLowerCase();
      results = results.filter((book) =>
        book.author?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply ISBN search if it exists (from filter options)
    if (isbnSearch) {
      const lowercasedSearch = isbnSearch.toLowerCase();
      results = results.filter((book) =>
        book.isbn?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply CATEGORY search if it exists (from filter options)
    if (categorySearch) {
      // bookNameSearch ki jagah categorySearch
      const lowercasedSearch = categorySearch.toLowerCase();
      results = results.filter((book) =>
        book.category?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply alphabet filter if it exists
    if (alphabetFilter) {
      results = results.filter((book) => {
        if (!book.title) return false;
        const firstChar = book.title.charAt(0).toUpperCase();
        return firstChar === alphabetFilter.toUpperCase();
      });
    }

    setFilteredBooks(results);
    setCurrentPage(1);
  }, [
    mainSearch,
    titleSearch,
    authorSearch,
    isbnSearch,
    categorySearch, // bookNameSearch ki jagah categorySearch
    alphabetFilter,
    books,
  ]);

  // Updated clearAllSearches function
  const clearAllSearches = () => {
    setMainSearch("");
    setTitleSearch("");
    setAuthorSearch("");
    setIsbnSearch("");
    setCategorySearch(""); // bookNameSearch ki jagah categorySearch
    setAlphabetFilter("");
  };

  // Updated hasActiveSearch check
  const hasActiveSearch =
    mainSearch ||
    titleSearch ||
    authorSearch ||
    isbnSearch ||
    categorySearch || // bookNameSearch ki jagah categorySearch
    alphabetFilter;

  // ----------------------------
  // PAGINATION
  // ----------------------------
  const whatsNewBooks = filteredBooks.slice(0, 2);
  const moreBooksStartIndex = 2 + (currentPage - 1) * booksPerPage;
  const moreBooksEndIndex = moreBooksStartIndex + booksPerPage;
  const moreBooks = filteredBooks.slice(moreBooksStartIndex, moreBooksEndIndex);

  const totalPages = Math.ceil((filteredBooks.length - 2) / booksPerPage);

  // ----------------------------
  // ISSUE / RESERVE HANDLER (with safe reservation check)
  // ----------------------------
  // const handleIssue = async (book) => {
  //   if (!student) return;

  //   const bookId = book._id;

  //   // Check if already issued or reserved
  //   if (issuedBooks[bookId]) {
  //     alert(`You have already issued "${book.title}"!`);
  //     return;
  //   }
  //   if (reservedBooks[bookId]) {
  //     alert(`You have already reserved "${book.title}"!`);
  //     return;
  //   }

  //   const payload = {
  //     studentName: `${student.firstName} ${student.lastName}`,
  //     studentEmail: student.email,
  //     batchNo: student.batchNo,
  //     degree: student.degree,
  //     program: student.program,
  //     cnic: student.cnic,
  //   };

  //   try {
  //     // Reserve flow (no copies)
  //     if (book.availableCopies === 0) {
  //       const confirmReserve = window.confirm(
  //         `The book "${book.title}" is currently unavailable. Do you want to reserve it?`,
  //       );
  //       if (!confirmReserve) return;

  //       const res = await axios.post(
  //         `http://localhost:3002/api/books/issue/${bookId}`,
  //         payload,
  //         { headers: { Authorization: `Bearer ${token}` } },
  //       );

  //       if (res.data.type === "reserved") {
  //         setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
  //         alert(`⏳ "${book.title}" reserved successfully!`);
  //         fetchReservedBooks();
  //       } else if (res.data.type === "alreadyReserved") {
  //         setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
  //         alert(`You have already reserved "${book.title}".`);
  //       }

  //       return;
  //     }

  //     // Issue flow (availableCopies > 0)
  //     const confirmIssue = window.confirm(
  //       `Do you want to issue the book "${book.title}"?`,
  //     );
  //     if (!confirmIssue) return;

  //     const res = await axios.post(
  //       `http://localhost:3002/api/books/issue/${bookId}`,
  //       payload,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     if (res.data.type === "issued") {
  //       // Instead of { [bookId]: true }
  //       setIssuedBooks((prev) => ({
  //         ...prev,
  //         [bookId]: true,
  //       }));

  //       alert(`✅ "${book.title}" issued successfully!`);
  //       fetchIssuedBooks(); // refresh the list
  //     }
  //   } catch (err) {
  //     console.error("Issue/Reserve error:", err.response?.data || err);
  //     alert(err.response?.data?.message || "Action failed");
  //   }
  // };
  //----------------------------------------------------------------------------------
  // ----------------------------
  // ISSUE / RESERVE HANDLER (Optimistic Update)
  // ----------------------------
  // const handleIssue = async (book) => {
  //   if (!student) return;

  //   const bookId = book._id;

  //   // Check if already issued or reserved using current state
  //   if (issuedBooks[bookId]) {
  //     alert(`You have already issued "${book.title}"!`);
  //     return;
  //   }
  //   if (reservedBooks[bookId]) {
  //     alert(`You have already reserved "${book.title}"!`);
  //     return;
  //   }

  //   const payload = {
  //     studentName: `${student.firstName} ${student.lastName}`,
  //     studentEmail: student.email,
  //     batchNo: student.batchNo,
  //     degree: student.degree,
  //     program: student.program,
  //     cnic: student.cnic,
  //   };

  //   try {
  //     // --- Reserve flow (no copies) ---
  //     if (book.availableCopies === 0) {
  //       const confirmReserve = window.confirm(
  //         `The book "${book.title}" is currently unavailable. Do you want to reserve it?`,
  //       );
  //       if (!confirmReserve) return;

  //       // 1. Optimistic UI Update FIRST
  //       setReservedBooks((prev) => ({ ...prev, [bookId]: true }));

  //       // 2. Make the API call
  //       const res = await axios.post(
  //         `http://localhost:3002/api/books/issue/${bookId}`,
  //         payload,
  //         { headers: { Authorization: `Bearer ${token}` } },
  //       );

  //       // 3. Handle success or specific API errors
  //       if (res.data.type === "reserved") {
  //         alert(`⏳ "${book.title}" reserved successfully!`);
  //       } else if (res.data.type === "alreadyReserved") {
  //         alert(`You have already reserved "${book.title}".`);
  //       } else {
  //         // If the API returns an unexpected response, revert the optimistic update
  //         throw new Error(
  //           res.data.message ||
  //             "An unexpected error occurred during reservation.",
  //         );
  //       }
  //       return; // End the function for the reserve flow
  //     }

  //     // --- Issue flow (availableCopies > 0) ---
  //     const confirmIssue = window.confirm(
  //       `Do you want to issue the book "${book.title}"?`,
  //     );
  //     if (!confirmIssue) return;

  //     // 1. Optimistic UI Update FIRST
  //     setIssuedBooks((prev) => ({ ...prev, [bookId]: true }));

  //     // 2. Make the API call
  //     const res = await axios.post(
  //       `http://localhost:3002/api/books/issue/${bookId}`,
  //       payload,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     // 3. Handle success
  //     if (res.data.type === "issued") {
  //       alert(`✅ "${book.title}" issued successfully!`);
  //     } else {
  //       // If the API returns an unexpected response, revert the optimistic update
  //       throw new Error(
  //         res.data.message || "An unexpected error occurred during issuance.",
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Issue/Reserve error:", err.response?.data || err);

  //     // IMPORTANT: REVERT the optimistic update on failure
  //     if (book.availableCopies === 0) {
  //       setReservedBooks((prev) => {
  //         const newState = { ...prev };
  //         delete newState[bookId];
  //         return newState;
  //       });
  //     } else {
  //       setIssuedBooks((prev) => {
  //         const newState = { ...prev };
  //         delete newState[bookId];
  //         return newState;
  //       });
  //     }

  //     alert(
  //       err.response?.data?.message ||
  //         err.message ||
  //         "Action failed. Please try again.",
  //     );
  //   }
  // };

  //-----------------------------------------------------------------------------
  const handleIssue = async (book) => {
    if (!student) return;

    // const bookId = book._id;
    const bookId = book._id.toString();

    // Check if already issued or reserved
    if (issuedBooks[bookId]) {
      alert(`You have already issued "${book.title}"!`);
      return;
    }
    if (reservedBooks[bookId]) {
      alert(`You have already reserved "${book.title}"!`);
      return;
    }

    const payload = {
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      batchNo: student.batchNo,
      degree: student.degree,
      program: student.program,
      cnic: student.cnic,
    };

    try {
      // --- Reserve flow (agar book available nahi hai) ---
      if (book.availableCopies === 0) {
        const confirmReserve = window.confirm(
          `The book "${book.title}" is currently unavailable. Do you want to reserve it?`,
        );
        if (!confirmReserve) return;

        const res = await axios.post(
          `http://localhost:3002/api/books/issue/${bookId}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res.data.type === "reserved") {
          alert(`⏳ "${book.title}" reserved successfully!`);

          setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
        } else if (res.data.type === "alreadyReserved") {
          alert(`You have already reserved "${book.title}".`);
          setReservedBooks((prev) => ({ ...prev, [bookId]: true }));
        }

        return;
      }

      // --- Issue flow (agar book available hai) ---
      const confirmIssue = window.confirm(
        `Do you want to issue the book "${book.title}"?`,
      );
      if (!confirmIssue) return;

      // Sirf API call karo, state update pehle mat karo
      const res = await axios.post(
        `http://localhost:3002/api/books/issue/${bookId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // SUCCESSFUL RESPONSE KE BAAD HI STATE UPDATE KARO
      if (res.data.type === "issued") {
        alert(`✅ "${book.title}" issued successfully!`);
        setIssuedBooks((prev) => ({ ...prev, [bookId]: true }));
        // 🔥 UPDATE BOOK COPIES INSTANTLY
        setBooks((prevBooks) =>
          prevBooks.map((b) =>
            b._id === bookId
              ? { ...b, availableCopies: b.availableCopies - 1 }
              : b,
          ),
        );
      }
    } catch (err) {
      console.error("Issue/Reserve error:", err.response?.data || err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Action failed. Please try again.",
      );
    }
  };

  // ----------------------------
  // FETCH WISHLIST FOR CURRENT STUDENT
  // ----------------------------

  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const wishlistMap = {};
      res.data.wishlist.forEach((item) => {
        wishlistMap[item.bookId] = true; // ✅ bookId only
      });

      setWishlist(wishlistMap);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleWishlist = async (book) => {
    const isInWishlist = wishlist[book._id];

    const confirmMsg = isInWishlist
      ? "Are you sure you want to remove this book from wishlist?"
      : "Are you sure you want to add this book to wishlist?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.post(
        "http://localhost:3002/api/wishlist",
        {
          bookId: book._id,
          action: isInWishlist ? "remove" : "add",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setWishlist((prev) => {
        const updated = { ...prev };
        if (isInWishlist) {
          delete updated[book._id];
        } else {
          updated[book._id] = true;
        }
        return updated;
      });

      alert(
        isInWishlist
          ? "❌ Book removed from wishlist"
          : "❤️ Book added to wishlist",
      );
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Wishlist action failed");
    }
  };

  // ----------------------------
  // UI STARTS HERE
  // ----------------------------
  return (
    <>
      <Navbar darkMode={darkMode} />
      <div className="flex">
        <LeftSidebar darkMode={darkMode} />
        <div className="p-6 w-full min-h-screen flex flex-col">
          {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
          <div className="w-full flex justify-center mb-6">
            <div className="relative w-full max-w-2xl">
              <div className="flex">
                {/* Search Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch
                      className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
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

                {/* Filter Button */}
                <button
                  className={`px-4 py-3 rounded-r-xl border-l-0 transition-colors ${
                    darkMode
                      ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-gray-600"
                      : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-gray-300"
                  }`}
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>

              {/* Filter Options (Hidden by default) */}
              {showFilterOptions && (
                <div
                  className={`absolute z-10 mt-2 w-full rounded-xl shadow-lg p-4 ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Book title..."
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                        }`}
                        value={titleSearch}
                        onChange={(e) => setTitleSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Author
                      </label>
                      <input
                        type="text"
                        placeholder="Author name..."
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                        }`}
                        value={authorSearch}
                        onChange={(e) => setAuthorSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Web, Data Science..."
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                        }`}
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        ISBN
                      </label>
                      <input
                        type="text"
                        placeholder="ISBN..."
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                        }`}
                        value={isbnSearch}
                        onChange={(e) => setIsbnSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* ALPHABETICAL FILTER - ADDED HERE */}
                  <div
                    className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <label
                      className={`block text-xs font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Browse by Letter
                    </label>
                    <div className="flex flex-wrap gap-1 mb-2">
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

                      {/* Show first 10 letters */}
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

                      {/* Show remaining letters when expanded */}
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

                      {/* Numbers */}
                      {showMoreAlphabets &&
                        "0123456789".split("").map((number) => (
                          <button
                            key={number}
                            onClick={() => setAlphabetFilter(number)}
                            className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                              alphabetFilter === number
                                ? darkMode
                                  ? "bg-blue-600 text-white"
                                  : "bg-blue-500 text-white"
                                : darkMode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {number}
                          </button>
                        ))}

                      {/* See More/Less Button */}
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

          {/* SEARCH RESULTS */}
          {hasActiveSearch && (
            <>
              <h1
                className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Search Results 🔍
                {filteredBooks.length > 0 && (
                  <span className="text-sm font-normal ml-2">
                    ({filteredBooks.length} books found)
                  </span>
                )}
              </h1>
              {filteredBooks.length === 0 ? (
                <div
                  className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  <p className="text-lg mb-2">
                    No books found matching your search criteria.
                  </p>
                  <p>Try adjusting your search terms or browse by letter.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-12 flex flex-col items-center">
                  {filteredBooks.map((book, index) => (
                    <div
                      key={book._id}
                      className={`w-4/5 max-w-3xl p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-xl transition ${
                        darkMode ? "bg-gray-800 text-white" : "bg-white"
                      }`}
                    >
                      <div>
                        <h2 className="text-lg font-bold">
                          {index + 1}. {book.title}
                        </h2>
                        <p
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                          By {book.author}
                        </p>
                        {book.isbn && (
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            ISBN: {book.isbn}
                          </p>
                        )}

                        {/* Stars */}
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* {issuedBooks[book._id] ? (
                          <button
                            disabled
                            className={`px-4 py-1 rounded text-white cursor-not-allowed ${
                              issuedBooks[book._id] === true
                                ? "bg-gray-600"
                                : issuedBooks[book._id] === "reserved"
                                  ? "bg-yellow-500"
                                  : "bg-gray-600"
                            }`}
                          >
                            {issuedBooks[book._id] === true
                              ? "Issued"
                              : issuedBooks[book._id] === "reserved"
                                ? "Reserved✅"
                                : "Issued✅"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleIssue(book)}
                            className={`px-4 py-1 rounded text-white ${
                              book.availableCopies === 0
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {book.availableCopies === 0 ? "Reserve" : "Issue"}
                          </button>
                        )} */}
                        {issuedBooks[getId(book._id)] ||
                        reservedBooks[getId(book._id)] ? (
                          <button
                            disabled
                            className={`px-4 py-1 rounded text-white cursor-not-allowed ${
                              issuedBooks[getId(book._id)]
                                ? "bg-gray-600"
                                : "bg-yellow-500"
                            }`}
                          >
                            {issuedBooks[getId(book._id)]
                              ? "Issued"
                              : "Reserved"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleIssue(book)}
                            className={`px-4 py-1 rounded text-white ${
                              book.availableCopies === 0
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {book.availableCopies === 0 ? "Reserve" : "Issue"}
                          </button>
                        )}
                        <button
                          onClick={() => handleWishlist(book)}
                          className={`px-3 py-1 rounded text-white font-bold transition ${
                            wishlist[book._id]
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-pink-500 hover:bg-pink-600"
                          }`}
                        >
                          {wishlist[book._id]
                            ? "❤️ In Wishlist"
                            : "🤍 Wishlist"}
                        </button>

                        <button
                          onClick={() => setSelectedBook(book)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* WHATS NEW */}
          {!hasActiveSearch && (
            <>
              <h1
                className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                What's New
              </h1>
              {loading ? (
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Loading...
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {whatsNewBooks.map((book) => (
                    <div
                      key={book._id}
                      className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ${
                        darkMode
                          ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                          : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>

                      <div className="relative flex flex-col md:flex-row h-full">
                        {/* Enhanced Book Image */}
                        <div className="relative overflow-hidden md:w-48 lg:w-56 aspect-[3/4]">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute top-3 left-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                darkMode
                                  ? "bg-indigo-500/20 text-indigo-300"
                                  : "bg-indigo-100 text-indigo-800"
                              }`}
                            >
                              New
                            </span>
                          </div>
                        </div>

                        {/* Enhanced Book Information */}
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {book.title}
                            </h3>

                            <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-2">
                                <svg
                                  className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <span
                                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                >
                                  by {book.author}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <svg
                                  className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
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
                                <span
                                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                >
                                  Edition {book.edition}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <svg
                                  className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                                <span
                                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                                >
                                  {book.category}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center mb-4">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < 4 ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span
                                className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                4.0
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                            <button
                              onClick={() => setSelectedBook(book)}
                              className={`group relative flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                darkMode
                                  ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border-2 border-slate-600 hover:border-slate-500 hover:shadow-lg"
                                  : "bg-white text-slate-800 hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 hover:shadow-lg"
                              }`}
                            >
                              <svg
                                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                                  darkMode ? "text-slate-400" : "text-slate-600"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span>Details</span>
                            </button>

                            <button
                              onClick={() => handleIssue(book)}
                              disabled={
                                issuedBooks[getId(book._id)]
                                  ? true
                                  : reservedBooks[getId(book._id)]
                              }
                              className={`group relative flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
                                issuedBooks[getId(book._id)]
                                  ? darkMode
                                    ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
                                    : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
                                  : reservedBooks[getId(book._id)]
                                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900 cursor-not-allowed border-2 border-amber-600 shadow-md"
                                    : book.availableCopies === 0
                                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-2 border-orange-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                      : "bg-blue-500 text-white hover:from-blue-700 hover:to-indigo-700 border-2 border-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                              }`}
                            >
                              {/* Button Icon */}
                              {issuedBooks[getId(book._id)] ? (
                                <svg
                                  className="w-3 h-3 text-emerald-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <circle cx="10" cy="10" r="5" />
                                </svg>
                              ) : reservedBooks[getId(book._id)] ? (
                                <svg
                                  className="w-3 h-3 text-amber-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <circle cx="10" cy="10" r="5" />
                                </svg>
                              ) : book.availableCopies === 0 ? (
                                <svg
                                  className="w-3 h-3 text-yellow-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <circle cx="10" cy="10" r="5" />
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                              )}

                              {/* Button Text with better contrast */}
                              <span className="drop-shadow-sm">
                                {issuedBooks[getId(book._id)]
                                  ? "Issued"
                                  : reservedBooks[getId(book._id)]
                                    ? "Reserved"
                                    : book.availableCopies === 0
                                      ? "Reserve"
                                      : "Issue"}
                              </span>

                              {/* Enhanced Shimmer effect */}
                              {!issuedBooks[getId(book._id)] &&
                                !reservedBooks[getId(book._id)] && (
                                  <div className="absolute inset-0 -top-2 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                                )}

                              {/* Subtle pulse effect for available books */}
                              {!issuedBooks[getId(book._id)] &&
                                !reservedBooks[getId(book._id)] &&
                                book.availableCopies > 0 && (
                                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
                                )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MORE BOOKS */}
              <h1
                className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                More of What You Like
              </h1>
              {loading ? (
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Loading...
                </p>
              ) : moreBooks.length === 0 ? (
                <p
                  className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  No more books to show.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {moreBooks.map((book) => (
                    <div
                      key={book._id}
                      className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col ${
                        darkMode
                          ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                          : "bg-gradient-to-br from-white to-gray-50 border border-gray-400"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>

                      {/* Enhanced Book Image */}
                      <div className="relative overflow-hidden p-6">
                        <div className="relative mx-auto w-55 h-64 rounded-xl  overflow-hidden shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-fit border border-gray-500 transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Book Information */}
                      <div className="flex-1 px-6 pb-6 flex flex-col">
                        <div className="text-center mb-4">
                          <h3
                            className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {book.title}
                          </h3>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-center gap-2">
                              <svg
                                className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <span
                                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                              >
                                {book.author}
                              </span>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                              <svg
                                className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
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
                              <span
                                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                              >
                                Edition {book.edition}
                              </span>
                            </div>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex items-center justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  i < 4 ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span
                              className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              4.0
                            </span>
                          </div>
                        </div>

                        {/* Professional Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <button
                            onClick={() => setSelectedBook(book)}
                            className={`group relative flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              darkMode
                                ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border-2 border-slate-600 hover:border-slate-500"
                                : "bg-white text-slate-800 hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400"
                            }`}
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                                darkMode ? "text-slate-400" : "text-slate-600"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>Details</span>
                          </button>

                          <button
                            onClick={() => handleIssue(book)}
                            disabled={
                              issuedBooks[getId(book._id)]
                                ? true
                                : reservedBooks[getId(book._id)]
                            }
                            className={`group relative flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
                              issuedBooks[getId(book._id)]
                                ? darkMode
                                  ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
                                  : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
                                : reservedBooks[getId(book._id)]
                                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-not-allowed border border-amber-700"
                                  : book.availableCopies === 0
                                    ? "bg-orange-500 text-white border border-orange-500 hover:bg-orange-600 transition"
                                    : "bg-blue-500 text-white border border-blue-700 hover:bg-blue-700 transition"
                            }`}
                          >
                            {issuedBooks[getId(book._id)] ? (
                              <svg
                                className="w-3 h-3 text-emerald-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <circle cx="10" cy="10" r="5" />
                              </svg>
                            ) : reservedBooks[getId(book._id)] ? (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <circle cx="10" cy="10" r="5" />
                              </svg>
                            ) : book.availableCopies === 0 ? (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <circle cx="10" cy="10" r="5" />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 text-white transition-transform duration-200 group-hover:scale-110"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            )}

                            {/* Button Text */}
                            <span className="drop-shadow-sm">
                              {issuedBooks[getId(book._id)]
                                ? "Issued"
                                : reservedBooks[getId(book._id)]
                                  ? "Reserved"
                                  : book.availableCopies === 0
                                    ? "Reserve"
                                    : "Issue"}
                            </span>

                            {/* Shimmer effect for active buttons */}
                            {!issuedBooks[getId(book._id)] &&
                              !reservedBooks[getId(book._id)] && (
                                <div className="absolute inset-0 -top-2 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                              )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {/* MODAL */}
          {selectedBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-900 to-slate-800"
                    : "bg-gradient-to-br from-white to-gray-50"
                }`}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Book Image Section */}
                  <div className="relative md:w-2/5 lg:w-1/3 p-4 flex items-center justify-center">
                    <div className="w-full max-w-[240px] aspect-[3/4] relative overflow-hidden rounded-xl shadow-2xl">
                      <img
                        src={selectedBook.image}
                        alt={selectedBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Book Details Section */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    {/* Header with Close Button */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2
                          className={`text-2xl md:text-3xl font-bold mb-2 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {selectedBook.title}
                        </h2>
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span
                            className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            4.0
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedBook(null)}
                        className={`p-2 rounded-xl transition-colors ${
                          darkMode
                            ? "text-gray-400 hover:text-white hover:bg-slate-700"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Book Information */}
                    {/* <div className="flex-1 space-y-4 mb-6 overflow-y-auto"> */}
                    <div className="space-y-4 mb-6">
                      <div
                        className={`p-4 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Author
                            </p>
                            <p
                              className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.author}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Edition
                            </p>
                            <p
                              className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.edition}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Publisher
                            </p>
                            <p
                              className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.publisherName}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              ISBN
                            </p>
                            <p
                              className={`text-base font-mono ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.isbn}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Category
                            </p>
                            <p
                              className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.category}
                            </p>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Language
                            </p>
                            <p
                              className={`text-base ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {selectedBook.language}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {/* <div className="flex gap-3"> */}
                    <div className="flex flex-col sm:flex-row gap-9">
                      <button
                        onClick={() => handleIssue(selectedBook)}
                        disabled={
                          selectedBook &&
                          (issuedBooks[getId(selectedBook._id)] ||
                            reservedBooks[getId(selectedBook._id)])
                        }
                        className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          issuedBooks[getId(selectedBook._id)]
                            ? darkMode
                              ? "bg-emerald-900/30 text-emerald-300 cursor-not-allowed border-2 border-emerald-700/50"
                              : "bg-emerald-100 text-emerald-700 cursor-not-allowed border-2 border-emerald-300"
                            : reservedBooks[getId(selectedBook._id)]
                              ? "bg-amber-500 text-white cursor-not-allowed border border-amber-700"
                              : selectedBook.availableCopies === 0
                                ? "bg-orange-500 text-white border border-orange-500 hover:bg-orange-600 transition"
                                : "bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition"
                        }`}
                      >
                        {/* Button Icon */}
                        {issuedBooks[getId(selectedBook._id)] ? (
                          <svg
                            className="w-3 h-3 text-emerald-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <circle cx="10" cy="10" r="5" />
                          </svg>
                        ) : reservedBooks[getId(selectedBook._id)] ? (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <circle cx="10" cy="10" r="5" />
                          </svg>
                        ) : selectedBook.availableCopies === 0 ? (
                          <svg
                            className="w-3 h-3 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <circle cx="10" cy="10" r="5" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        )}

                        {/* Button Text */}
                        <span>
                          {issuedBooks[getId(selectedBook._id)]
                            ? "Issued"
                            : reservedBooks[getId(selectedBook._id)]
                              ? "Reserved"
                              : selectedBook.availableCopies === 0
                                ? "Reserve Book"
                                : "Issue Book"}
                        </span>
                      </button>

                      <button
                        onClick={() => handleWishlist(selectedBook)}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          wishlist[getId(selectedBook._id)]
                            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 border-2 border-red-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 border-2 border-pink-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {wishlist[getId(selectedBook._id)]
                            ? "In Wishlist"
                            : "Add to Wishlist"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {/* PREV BUTTON */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border border-black font-bold ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border border-black font-bold ${
                  currentPage === i + 1
                    ? "bg-gray-700 text-white font-bold"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT BUTTON */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border border-black font-bold ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-gray-600 hover:bg-gray-800"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <FooterAll darkMode={darkMode} />
    </>
  );
}
