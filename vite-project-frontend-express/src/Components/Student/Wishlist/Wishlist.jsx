// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Wishlist() {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT
//   // ----------------------------
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/wishlist",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Yaha populate ho chuka book object milega
//         const books = res.data.wishlist
//           .map((item) => item.bookId)
//           .filter((b) => b !== null); // agar koi book delete ho gaya ho toh null remove kar de

//         setWishlistBooks(books);
//       } catch (err) {
//         console.error("Wishlist fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlist();
//   }, [token]);

//   //----------------------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Student fetch error:", err);
//       }
//     };

//     fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) return;
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `Do you want to issue the book "${book.title}"?`
//     );
//     if (!confirmIssue) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         { studentId: student._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       alert("Book issued successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to issue book.");
//     }
//   };

//   // ----------------------------
//   // HANDLE REMOVE FROM WISHLIST
//   // ----------------------------
//   const handleRemove = async (bookId) => {
//     const confirmRemove = window.confirm(
//       "Do you want to remove this book from your wishlist?"
//     );
//     if (!confirmRemove) return;

//     try {
//       await axios.post(
//         "http://localhost:3002/api/books/wishlist",
//         { bookId, action: "remove" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // UI update
//       setWishlistBooks((prev) => prev.filter((b) => b._id !== bookId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to remove from wishlist.");
//     }
//   };

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedBooks = wishlistBooks.slice(
//     startIndex,
//     startIndex + booksPerPage
//   );
//   const totalPages = Math.ceil(wishlistBooks.length / booksPerPage);

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />
//         <div className="p-6 w-full min-h-screen">
//           <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : wishlistBooks.length === 0 ? (
//             <p className="text-gray-500">Your wishlist is empty.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {paginatedBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center relative"
//                 >
//                   {/* REMOVE */}
//                   <button
//                     onClick={() => handleRemove(book._id)}
//                     className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
//                   >
//                     <AiOutlineClose size={20} />
//                   </button>

//                   {/* IMAGE */}
//                   <div className="w-65 h-65 overflow-hidden rounded-lg mb-4 border border-gray-300">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* DETAILS */}
//                   <div className="text-center mb-4">
//                     <h2 className="text-lg font-bold pt-2">{book.title}</h2>
//                     <p className="text-gray-600 mt-1 pt-1">
//                       <b>Author:</b> {book.author}
//                     </p>
//                     <p className="text-gray-600 mt-1 pt-1">
//                       <b>Edition:</b> {book.edition}
//                     </p>
//                     <p className="flex justify-center pt-2">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={
//                             i < 4 ? "text-yellow-400" : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </p>
//                   </div>

//                   {/* ACTION */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded hover:bg-blue-600"
//                     >
//                       See Details
//                     </button>
//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-2 text-md font-bold rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : book.availableCopies === 0
//                           ? "bg-orange-500 hover:bg-orange-600"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id]
//                         ? "Issued"
//                         : book.availableCopies === 0
//                         ? "Reserve"
//                         : "Issue"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* MODAL */}
//           {selectedBook && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
//               <div className="bg-white rounded-xl w-full max-w-3xl flex overflow-hidden relative">
//                 <div className="w-80 h-full overflow-hidden pl-6 p-2">
//                   <img
//                     src={selectedBook.image}
//                     alt={selectedBook.title}
//                     className="w-70 h-full object-cover border-2 border-gray-500"
//                   />
//                 </div>
//                 <div className="w-1/2 p-6 flex flex-col justify-between relative pl-8">
//                   <button
//                     onClick={() => setSelectedBook(null)}
//                     className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-50"
//                   >
//                     <AiOutlineClose size={24} />
//                   </button>

//                   <div>
//                     <h2 className="text-2xl font-bold mb-2">
//                       {selectedBook.title}
//                     </h2>
//                     <p className="text-gray-700 mb-1  pt-3">
//                       <b>Author:</b> {selectedBook.author}
//                     </p>
//                     <p className="text-gray-700 mb-1  pt-3">
//                       <b>Edition:</b> {selectedBook.edition}
//                     </p>
//                     <p className="text-gray-700 mb-1  pt-3">
//                       <b>Publisher:</b> {selectedBook.publisherName}
//                     </p>
//                     <p className="text-gray-700 mb-1  pt-3">
//                       <b>ISBN:</b> {selectedBook.isbn}
//                     </p>
//                     <p className="text-gray-700 mb-1  pt-3">
//                       <b>Category:</b> {selectedBook.category}
//                     </p>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       onClick={() => handleIssue(selectedBook)}
//                       disabled={issuedBooks[selectedBook._id]}
//                       className={`px-4 py-2 rounded text-white font-bold w-full ${
//                         issuedBooks[selectedBook._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[selectedBook._id] ? "Issued" : "Issue Book"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* PAGINATION */}
//           {wishlistBooks.length > booksPerPage && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded border border-black font-bold ${
//                   currentPage === 1
//                     ? "bg-gray-300 text-black cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Prev
//               </button>

//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded border border-black font-bold ${
//                     currentPage === i + 1
//                       ? "bg-pink-500 text-white font-bold"
//                       : "bg-white text-black hover:bg-gray-200"
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
//                 className={`px-3 py-1 rounded border border-black font-bold ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 text-black cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//---------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Wishlist() {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const token = localStorage.getItem("token");

//   // ----------------------------
//   // FETCH WISHLIST
//   // ----------------------------
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!token) {
//         console.error("No token found in localStorage");
//         return;
//       }

//       try {
//         console.log(
//           "Fetching wishlist with token:",
//           token.substring(0, 20) + "..."
//         );
//         const res = await axios.get("http://localhost:3002/api/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allBooks = await axios.get("http://localhost:3002/api/books");
//         const books = res.data.wishlist
//           .map((item) => allBooks.data.books.find((b) => b._id === item.bookId))
//           .filter((b) => b !== undefined);

//         setWishlistBooks(books);
//       } catch (err) {
//         console.error("Wishlist fetch error:", err);
//         if (err.response) {
//           console.error("Error response:", err.response.data);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlist();
//   }, [token]);

//   // ----------------------------
//   // FETCH LOGGED-IN STUDENT
//   // ----------------------------
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error("Student fetch error:", err);
//       }
//     };

//     fetchStudent();
//   }, [token]);

//   // ----------------------------
//   // HANDLE ISSUE
//   // ----------------------------
//   const handleIssue = async (book) => {
//     if (!student) return;
//     if (issuedBooks[book._id]) return;

//     const confirmIssue = window.confirm(
//       `Do you want to issue the book "${book.title}"?`
//     );
//     if (!confirmIssue) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         { studentId: student._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       alert("Book issued successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to issue book.");
//     }
//   };

//   // ----------------------------
//   // HANDLE REMOVE FROM WISHLIST
//   // ----------------------------
//   const handleRemove = async (bookId) => {
//     const confirmRemove = window.confirm(
//       "Do you want to remove this book from your wishlist?"
//     );
//     if (!confirmRemove) return;

//     try {
//       await axios.post(
//         "http://localhost:3002/api/wishlist",
//         { bookId, action: "remove" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setWishlistBooks((prev) => prev.filter((b) => b._id !== bookId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to remove from wishlist.");
//     }
//   };

//   // ----------------------------
//   // HANDLE ADD TO WISHLIST
//   // ----------------------------
//   const handleWishlist = async (book) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3002/api/wishlist",
//         { bookId: book._id, action: "add" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.added) {
//         setWishlistBooks((prev) => [...prev, book]);
//         alert("Book added to wishlist!");
//       } else {
//         // Already in wishlist → make sure button shows "In Wishlist"
//         if (!wishlistBooks.some((b) => b._id === book._id)) {
//           setWishlistBooks((prev) => [...prev, book]);
//         }
//         alert("Already in wishlist");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update wishlist");
//     }
//   };

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedBooks = wishlistBooks.slice(
//     startIndex,
//     startIndex + booksPerPage
//   );
//   const totalPages = Math.ceil(wishlistBooks.length / booksPerPage);

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />
//         <div className="p-6 w-full min-h-screen">
//           <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : wishlistBooks.length === 0 ? (
//             <p className="text-gray-500">Your wishlist is empty.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {paginatedBooks.map((book) => (
//                 <div
//                   key={book._id}
//                   className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center relative"
//                 >
//                   {/* REMOVE */}
//                   <button
//                     onClick={() => handleRemove(book._id)}
//                     className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
//                   >
//                     <AiOutlineClose size={20} />
//                   </button>

//                   {/* IMAGE */}
//                   <div className="w-65 h-65 overflow-hidden rounded-lg mb-4 border border-gray-300">
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* DETAILS */}
//                   <div className="text-center mb-4">
//                     <h2 className="text-lg font-bold pt-2">{book.title}</h2>
//                     <p className="text-gray-600 mt-1 pt-1">
//                       <b>Author:</b> {book.author}
//                     </p>
//                     <p className="text-gray-600 mt-1 pt-1">
//                       <b>Edition:</b> {book.edition}
//                     </p>
//                     <p className="flex justify-center pt-2">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={
//                             i < 4 ? "text-yellow-400" : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </p>
//                   </div>

//                   {/* ACTIONS */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="bg-blue-500 text-white text-md font-bold px-3 py-2 rounded hover:bg-blue-600"
//                     >
//                       See Details
//                     </button>
//                     <button
//                       onClick={() => handleIssue(book)}
//                       disabled={issuedBooks[book._id]}
//                       className={`px-3 py-2 text-md font-bold rounded text-white ${
//                         issuedBooks[book._id]
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : book.availableCopies === 0
//                           ? "bg-orange-500 hover:bg-orange-600"
//                           : "bg-green-500 hover:bg-green-600"
//                       }`}
//                     >
//                       {issuedBooks[book._id]
//                         ? "Issued"
//                         : book.availableCopies === 0
//                         ? "Reserve"
//                         : "Issue"}
//                     </button>
//                     <button
//                       onClick={() => handleWishlist(book)}
//                       className={`px-3 py-2 text-md font-bold rounded ${
//                         wishlistBooks.some((b) => b._id === book._id)
//                           ? "bg-pink-500 text-white"
//                           : "bg-gray-300 text-black"
//                       }`}
//                     >
//                       {wishlistBooks.some((b) => b._id === book._id)
//                         ? "In Wishlist"
//                         : "Add to Wishlist"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PAGINATION */}
//           {wishlistBooks.length > booksPerPage && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded border border-black font-bold ${
//                   currentPage === 1
//                     ? "bg-gray-300 text-black cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Prev
//               </button>

//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded border border-black font-bold ${
//                     currentPage === i + 1
//                       ? "bg-pink-500 text-white font-bold"
//                       : "bg-white text-black hover:bg-gray-200"
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
//                 className={`px-3 py-1 rounded border border-black font-bold ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 text-black cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//---------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Wishlist() {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const token = localStorage.getItem("token");

//   // =============================
//   // FETCH WISHLIST
//   // =============================
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:3002/api/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allBooks = await axios.get("http://localhost:3002/api/books");

//         const books = res.data.wishlist
//           .map((item) => allBooks.data.books.find((b) => b._id === item.bookId))
//           .filter(Boolean);

//         setWishlistBooks(books);
//       } catch (err) {
//         console.error("Wishlist fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [token]);

//   // =============================
//   // FETCH STUDENT
//   // =============================
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStudent();
//   }, [token]);

//   // =============================
//   // ISSUE BOOK
//   // =============================
//   const handleIssue = async (book) => {
//     if (!student || issuedBooks[book._id]) return;

//     if (!window.confirm(`Issue "${book.title}"?`)) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         { studentId: student._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       alert("Book issued successfully!");
//     } catch (err) {
//       alert("Issue failed");
//     }
//   };

//   // =============================
//   // TOGGLE WISHLIST (ADD / REMOVE)
//   // =============================
//   const handleWishlistToggle = async (book) => {
//     const isInWishlist = wishlistBooks.some((b) => b._id === book._id);

//     const confirmMsg = isInWishlist
//       ? `Remove "${book.title}" from wishlist?`
//       : `Add "${book.title}" to wishlist?`;

//     if (!window.confirm(confirmMsg)) return;

//     try {
//       await axios.post(
//         "http://localhost:3002/api/wishlist",
//         {
//           bookId: book._id,
//           action: isInWishlist ? "remove" : "add",
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (isInWishlist) {
//         setWishlistBooks((prev) => prev.filter((b) => b._id !== book._id));
//         alert("Removed from wishlist ❌");
//       } else {
//         setWishlistBooks((prev) => [...prev, book]);
//         alert("Added to wishlist ❤️");
//       }
//     } catch (err) {
//       alert("Wishlist update failed");
//     }
//   };

//   // =============================
//   // FETCH ISSUED BOOKS
//   // =============================
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const issuedObj = {};
//         res.data.issuedBooks.forEach((ib) => {
//           issuedObj[ib.bookId] = true;
//         });

//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // =============================
//   // PAGINATION
//   // =============================
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedBooks = wishlistBooks.slice(
//     startIndex,
//     startIndex + booksPerPage
//   );
//   const totalPages = Math.ceil(wishlistBooks.length / booksPerPage);

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full min-h-screen">
//           <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : wishlistBooks.length === 0 ? (
//             <p className="text-gray-500">Your wishlist is empty.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {paginatedBooks.map((book) => {
//                 const isInWishlist = wishlistBooks.some(
//                   (b) => b._id === book._id
//                 );

//                 return (
//                   <div
//                     key={book._id}
//                     className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center"
//                   >
//                     {/* IMAGE */}
//                     <img
//                       src={book.image}
//                       alt={book.title}
//                       className="w-60 h-60 object-cover rounded mb-3"
//                     />

//                     {/* DETAILS */}
//                     <h2 className="font-bold">{book.title}</h2>
//                     <p>{book.author}</p>

//                     <div className="flex my-2">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={
//                             i < 4 ? "text-yellow-400" : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="flex gap-2 mt-3">
//                       {issuedBooks[book._id] ? (
//                         <button
//                           disabled
//                           className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
//                         >
//                           Issued
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleIssue(book)}
//                           className="bg-green-500 text-white px-3 py-1 rounded"
//                         >
//                           Issue
//                         </button>
//                       )}

//                       <button
//                         onClick={() => handleWishlistToggle(book)}
//                         className={`px-3 py-1 rounded font-bold text-white ${
//                           isInWishlist
//                             ? "bg-red-500 hover:bg-red-600"
//                             : "bg-pink-500 hover:bg-pink-600"
//                         }`}
//                       >
//                         {isInWishlist ? "❤️ In Wishlist" : "🤍 Wishlist"}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       <FooterAll />
//     </>
//   );
// }

//---------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Wishlist({ darkMode }) {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedBook, setSelectedBook] = useState(null);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   const token = localStorage.getItem("token");

//   // =============================
//   // FETCH WISHLIST
//   // =============================
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:3002/api/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allBooks = await axios.get("http://localhost:3002/api/books");

//         const books = res.data.wishlist
//           .map((item) => allBooks.data.books.find((b) => b._id === item.bookId))
//           .filter(Boolean);

//         setWishlistBooks(books);
//         setCurrentPage(1); // reset to first page when data changes
//       } catch (err) {
//         console.error("Wishlist fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [token]);

//   // =============================
//   // FETCH STUDENT
//   // =============================
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchStudent();
//   }, [token]);

//   // =============================
//   // ISSUE BOOK
//   // =============================
//   const handleIssue = async (book) => {
//     if (!student || issuedBooks[book._id]) return;

//     if (!window.confirm(`Issue "${book.title}"?`)) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/issue/${book._id}`,
//         { studentId: student._id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       setIssuedBooks((prev) => ({ ...prev, [book._id]: true }));
//       alert("Book issued successfully!");
//     } catch (err) {
//       alert("Issue failed");
//     }
//   };

//   // =============================
//   // TOGGLE WISHLIST (ADD / REMOVE)
//   // =============================
//   const handleWishlistToggle = async (book) => {
//     const isInWishlist = wishlistBooks.some((b) => b._id === book._id);

//     const confirmMsg = isInWishlist
//       ? `Remove "${book.title}" from wishlist?`
//       : `Add "${book.title}" to wishlist?`;

//     if (!window.confirm(confirmMsg)) return;

//     try {
//       await axios.post(
//         "http://localhost:3002/api/wishlist",
//         {
//           bookId: book._id,
//           action: isInWishlist ? "remove" : "add",
//         },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       if (isInWishlist) {
//         setWishlistBooks((prev) => {
//           const next = prev.filter((b) => b._id !== book._id);
//           // keep currentPage within bounds if last item on page was removed
//           const nextTotalPages = Math.max(
//             1,
//             Math.ceil(next.length / booksPerPage),
//           );
//           setCurrentPage((p) => Math.min(p, nextTotalPages));
//           return next;
//         });
//         alert("Removed from wishlist ❌");
//       } else {
//         setWishlistBooks((prev) => {
//           const next = [...prev, book];
//           const nextTotalPages = Math.max(
//             1,
//             Math.ceil(next.length / booksPerPage),
//           );
//           setCurrentPage((p) => Math.min(p, nextTotalPages));
//           return next;
//         });
//         alert("Added to wishlist ❤️");
//       }
//     } catch (err) {
//       alert("Wishlist update failed");
//     }
//   };

//   // =============================
//   // FETCH ISSUED BOOKS
//   // =============================
//   useEffect(() => {
//     const fetchIssuedBooks = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/issued-books",
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         const issuedObj = {};
//         res.data.issuedBooks.forEach((ib) => {
//           const bookId = ib.bookId._id || ib.bookId; // ensure _id is used
//           issuedObj[bookId] = true;
//         });

//         setIssuedBooks(issuedObj);
//       } catch (err) {
//         console.error("Error fetching issued books:", err);
//       }
//     };
//     fetchIssuedBooks();
//   }, [token]);

//   // =============================
//   // PAGINATION
//   // =============================
//   const totalPages = Math.max(
//     1,
//     Math.ceil(wishlistBooks.length / booksPerPage),
//   );
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedBooks = wishlistBooks.slice(
//     startIndex,
//     startIndex + booksPerPage,
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full min-h-screen">
//           <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : wishlistBooks.length === 0 ? (
//             <p className="text-gray-500">Your wishlist is empty.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {paginatedBooks.map((book) => {
//                   const isInWishlist = wishlistBooks.some(
//                     (b) => b._id === book._id,
//                   );

//                   return (
//                     <div
//                       key={book._id}
//                       // className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center relative"
//                       className={`border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center relative
//     ${darkMode ? "bg-gray-800 border-gray-500" : "bg-white border-gray-200"}`}
//                     >
//                       {/* CROSS ICON TOP RIGHT (inside border) */}
//                       <button
//                         onClick={() => {
//                           if (
//                             window.confirm(
//                               `Remove "${book.title}" from wishlist?`,
//                             )
//                           ) {
//                             handleWishlistToggle(book);
//                           }
//                         }}
//                         aria-label="Remove from wishlist"
//                         className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 shadow-sm transition"
//                       >
//                         <AiOutlineClose size={18} />
//                       </button>

//                       {/* IMAGE */}
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-60 h-60 object-fit rounded mb-3"
//                       />

//                       {/* DETAILS */}
//                       <h2 className="font-bold text-center">{book.title}</h2>
//                       <p className="mt-2">{book.author}</p>

//                       <div className="flex my-2 mt-2">
//                         {[...Array(5)].map((_, i) => (
//                           <FaStar
//                             key={i}
//                             className={
//                               i < 4 ? "text-yellow-400" : "text-gray-300"
//                             }
//                           />
//                         ))}
//                       </div>

//                       {/* ACTIONS */}
//                       <div className="flex gap-2 mt-3">
//                         {issuedBooks[book._id] ? (
//                           <button
//                             disabled
//                             className="bg-gray-500 text-white px-5 py-2 rounded cursor-not-allowed font-bold"
//                           >
//                             Issued
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleIssue(book)}
//                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//                           >
//                             Issue
//                           </button>
//                         )}

//                         <button
//                           onClick={() => setSelectedBook(book)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                         >
//                           Details
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {/* MODAL */}
//               {selectedBook && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
//                   <div className="bg-white rounded-xl w-full max-w-3xl flex overflow-hidden relative">
//                     {/* IMAGE LEFT */}
//                     <div className="w-1/2 flex justify-center items-center p-4 bg-gray-100">
//                       <img
//                         src={selectedBook.image}
//                         alt={selectedBook.title}
//                         className="w-72 h-85 object-fit rounded-lg border-2 border-gray-300"
//                       />
//                     </div>

//                     {/* TEXT + BUTTONS RIGHT */}
//                     <div className="w-1/2 p-6 flex flex-col justify-between relative">
//                       {/* CLOSE BUTTON */}
//                       <button
//                         onClick={() => setSelectedBook(null)}
//                         className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 z-50"
//                       >
//                         <AiOutlineClose size={24} />
//                       </button>

//                       {/* BOOK INFO */}
//                       <div>
//                         <h2 className="text-2xl text-black font-bold mb-2">
//                           {selectedBook.title}
//                         </h2>
//                         <p className="text-gray-700 mb-1 pt-2">
//                           <b>Author:</b> {selectedBook.author}
//                         </p>
//                         <p className="text-gray-700 mb-1 pt-2">
//                           <b>Edition:</b> {selectedBook.edition}
//                         </p>
//                         <p className="text-gray-700 mb-1 pt-2">
//                           <b>Publisher:</b> {selectedBook.publisherName}
//                         </p>
//                         <p className="text-gray-700 mb-1 pt-2">
//                           <b>ISBN:</b> {selectedBook.isbn}
//                         </p>
//                         <p className="text-gray-700 mb-1 pt-2">
//                           <b>Category:</b> {selectedBook.category}
//                         </p>

//                         {/* STAR RATING */}
//                         <div className="flex mt-2 pt-2">
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

//                       {/* ACTION BUTTONS */}
//                       <div className="flex gap-3 mt-4">
//                         {/* ISSUE BUTTON */}
//                         <button
//                           onClick={() => handleIssue(selectedBook)}
//                           disabled={issuedBooks[selectedBook._id]}
//                           className={`px-4 py-2 rounded text-white font-bold flex-1 ${
//                             issuedBooks[selectedBook._id]
//                               ? "bg-gray-500 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-600"
//                           }`}
//                         >
//                           {issuedBooks[selectedBook._id]
//                             ? "Issued"
//                             : "Issue Book"}
//                         </button>

//                         {/* WISHLIST BUTTON */}
//                         <button
//                           onClick={() => handleWishlistToggle(selectedBook)}
//                           className={`px-4 py-2 rounded text-white font-bold flex-1 transition ${
//                             wishlistBooks.some(
//                               (b) => b._id === selectedBook._id,
//                             )
//                               ? "bg-red-500 hover:bg-red-600"
//                               : "bg-pink-500 hover:bg-pink-600"
//                           }`}
//                         >
//                           {wishlistBooks.some((b) => b._id === selectedBook._id)
//                             ? "❤️ In Wishlist"
//                             : "🤍 Wishlist"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* PAGINATION */}
//               <div className="flex justify-center items-center gap-2 mt-10">
//                 {/* PREV BUTTON */}
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1 rounded border border-black font-bold ${
//                     currentPage === 1
//                       ? "bg-gray-300 text-black cursor-not-allowed"
//                       : "bg-black text-white hover:bg-gray-800"
//                   }`}
//                 >
//                   Prev
//                 </button>

//                 {/* PAGE NUMBERS */}
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1 rounded border border-black font-bold ${
//                       currentPage === i + 1
//                         ? "bg-pink-500 text-white font-bold"
//                         : "bg-white text-black hover:bg-gray-200"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 {/* NEXT BUTTON */}
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-1 rounded border border-black font-bold ${
//                     currentPage === totalPages
//                       ? "bg-gray-300 text-black cursor-not-allowed"
//                       : "bg-black text-white hover:bg-gray-800"
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <FooterAll />
//     </>
//   );
// }

//---------------------------------------------------------------------------

// // src/components/Student/Wishlist/Wishlist.jsx
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   AiOutlineClose,
//   AiOutlineCalendar,
//   AiOutlineCheckCircle,
//   AiOutlineClockCircle,
// } from "react-icons/ai";
// import { FaBookOpen } from "react-icons/fa";

// // =============================
// // UTILITY: Helper for conditional classes
// // =============================
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // =============================
// // INLINE COMPONENT: InlineAlert (Copied from Reservations.jsx)
// // =============================
// const InlineAlert = ({ message, type, onClose, darkMode }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const alertStyles =
//     type === "success"
//       ? cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-emerald-900/80 text-white border border-emerald-700/50"
//             : "bg-white/80 text-gray-800 border border-emerald-200/50",
//         )
//       : cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-red-900/80 text-white border border-red-700/50"
//             : "bg-white/80 text-gray-800 border border-red-200/50",
//         );

//   return (
//     <div className={alertStyles}>
//       <span className="flex-1 text-center font-medium">{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
//         aria-label="Close notification"
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// // =============================
// // INLINE COMPONENT: SkeletonCard (Copied from Reservations.jsx)
// // =============================
// const SkeletonCard = ({ darkMode }) => (
//   <div
//     className={cn(
//       "animate-pulse flex rounded-2xl overflow-hidden",
//       darkMode ? "bg-gray-800" : "bg-gray-200",
//     )}
//   >
//     <div className="flex-1 p-6 md:p-8 space-y-4">
//       <div
//         className={cn(
//           "h-5 rounded-full w-20",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//       <div
//         className={cn(
//           "h-8 rounded w-3/4",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//       <div
//         className={cn(
//           "h-4 rounded w-1/2",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//     </div>
//     <div
//       className={cn(
//         "w-1/3 md:w-2/5 lg:w-1/2",
//         darkMode ? "bg-gray-700" : "bg-gray-300",
//       )}
//     ></div>
//   </div>
// );

// // =============================
// // INLINE COMPONENT: WishlistCard (Fixed Layout)
// // =============================
// const WishlistCard = React.memo(
//   ({ book, onIssue, onRemove, darkMode, isIssued, isReserved }) => {
//     const addedDate = book.addedDate || new Date();

//     const formattedDate = useMemo(() => {
//       return new Date(addedDate).toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     }, [addedDate]);

//     if (!book) return null;

//     const getStatusStyles = () => {
//       if (isIssued) {
//         return {
//           bg: darkMode ? "bg-emerald-900/50" : "bg-emerald-100",
//           text: darkMode ? "text-emerald-300" : "text-emerald-800",
//           border: darkMode ? "border-emerald-700" : "border-emerald-200",
//           icon: AiOutlineCheckCircle,
//           statusText: "Issued",
//         };
//       }
//       if (isReserved) {
//         return {
//           bg: darkMode ? "bg-amber-900/50" : "bg-amber-100",
//           text: darkMode ? "text-amber-300" : "text-amber-800",
//           border: darkMode ? "border-amber-700" : "border-amber-200",
//           icon: AiOutlineClockCircle,
//           statusText: "Reserved",
//         };
//       }
//       return {
//         bg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
//         text: darkMode ? "text-blue-300" : "text-blue-800",
//         border: darkMode ? "border-blue-700" : "border-blue-200",
//         icon: FaBookOpen,
//         statusText: "Available",
//       };
//     };

//     const { bg, text, border, icon: Icon, statusText } = getStatusStyles();

//     // FIX 1: Set a fixed height on the card and ensure it's a flex container.
//     const cardStyles = cn(
//       "group/card flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden group-hover/card:-translate-y-1 border-2 h-80", // Added h-80
//       darkMode ? "bg-gray-800 border-gray-300" : "bg-white border-gray-700",
//     );

//     const imageContainerStyles = cn(
//       "w-full md:w-1/3 lg:w-2/5 h-48 md:h-auto relative overflow-hidden flex items-center justify-center",
//       darkMode ? "bg-gray-700" : "bg-gray-100",
//     );

//     const getActionButtonProps = () => {
//       if (isIssued || isReserved) {
//         return { text: statusText, disabled: true };
//       }
//       return {
//         text: book.availableCopies > 0 ? "Issue" : "Reserve",
//         disabled: false,
//       };
//     };

//     const { text: actionText, disabled } = getActionButtonProps();

//     return (
//       <li className="group/card">
//         <div className={cardStyles}>
//           {/* Text Section */}
//           {/* FIX 2: Make the text section a flex column that grows and justifies content between */}
//           <div className="flex-1 p-4 md:p-4 flex flex-col justify-between">
//             <div>
//               <span
//                 className={cn(
//                   "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border",
//                   bg,
//                   text,
//                   border,
//                 )}
//               >
//                 <Icon size={14} className="mr-1.5" />
//                 {statusText}
//               </span>
//               <h3
//                 className={cn(
//                   "font-bold text-2xl mb-2 leading-tight line-clamp-2", // Added line-clamp-2 for long titles
//                   darkMode ? "text-white" : "text-gray-900",
//                 )}
//               >
//                 {book.title}
//               </h3>
//               <p
//                 className={cn(
//                   "text-sm font-light line-clamp-1", // Added line-clamp-1 for long author names
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 by {book.author}
//               </p>
//             </div>

//             {/* FIX 3: Use mt-auto to push this section to the bottom */}
//             <div className="flex items-center justify-between mt-auto gap-8">
//               {" "}
//               {/* Added gap-8 for more spacing */}
//               {/* FIX 4: Date container with proper styling to prevent wrapping */}
//               <div
//                 className={cn(
//                   "flex items-center text-sm whitespace-nowrap flex-shrink-0", // Added whitespace-nowrap and flex-shrink-0
//                   darkMode ? "text-gray-400" : "text-gray-500",
//                 )}
//               >
//                 <AiOutlineCalendar className="mr-2 flex-shrink-0" size={16} />
//                 <span className="whitespace-nowrap">{formattedDate}</span>
//               </div>
//               {/* FIX 5: Group buttons for better spacing */}
//               <div className="flex items-center gap-4 flex-shrink-0">
//                 {" "}
//                 {/* Added flex-shrink-0 */}
//                 <button
//                   onClick={() => onIssue(book)}
//                   disabled={disabled}
//                   className={cn(
//                     "px-3 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap", // Added whitespace-nowrap
//                     disabled
//                       ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600 text-white",
//                   )}
//                 >
//                   {actionText}
//                 </button>
//                 <button
//                   onClick={() => onRemove(book)}
//                   aria-label={`Remove ${book.title} from wishlist`}
//                   className={cn(
//                     "p-2 rounded-full transition-all border-2 duration-300 hover:bg-red-100 hover:text-red-600 flex-shrink-0", // Added flex-shrink-0
//                     darkMode
//                       ? "bg-gray-700 text-gray-300 border-gray-300 hover:bg-red-900/40 hover:text-red-400"
//                       : "bg-gray-100 text-gray-600 border-gray-500 hover:bg-red-100 hover:text-red-600",
//                   )}
//                 >
//                   <AiOutlineClose size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className={imageContainerStyles}>
//             <img
//               src={
//                 book.image ||
//                 "https://via.placeholder.com/400x600.png?text=No+Cover"
//               }
//               alt={`Cover of the book "${book.title}"`}
//               className="h-full w-100 object-fit transition-transform duration-700 group-hover/card:scale-105" // Changed object-fit to object-cover
//               loading="lazy"
//             />
//           </div>
//         </div>
//       </li>
//     );
//   },
// );
// // =============================
// // INLINE COMPONENT: Pagination (Copied from Reservations.jsx)
// // =============================
// const Pagination = ({ currentPage, totalPages, setCurrentPage, darkMode }) => {
//   if (totalPages <= 1) return null;

//   const buttonStyle = (disabled) =>
//     cn(
//       "text-sm font-semibold uppercase tracking-wide transition-all duration-300",
//       disabled
//         ? "text-gray-400 cursor-not-allowed"
//         : cn(
//             "hover:text-indigo-600",
//             darkMode ? "text-white hover:text-indigo-400" : "text-gray-900",
//           ),
//     );

//   const pageNumberStyle = (isActive) =>
//     cn(
//       "relative px-1 py-2 text-sm font-medium transition-all duration-300",
//       isActive
//         ? cn("text-indigo-600", darkMode ? "dark:text-indigo-400" : "")
//         : cn(
//             "hover:text-gray-900",
//             darkMode ? "text-gray-400 hover:text-white" : "text-gray-600",
//           ),
//     );

//   return (
//     <div className="flex justify-center items-center gap-6 mt-16 font-sans">
//       <button
//         onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//         disabled={currentPage === 1}
//         className={buttonStyle(currentPage === 1)}
//       >
//         Prev
//       </button>

//       <div className="flex gap-2">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={pageNumberStyle(currentPage === i + 1)}
//           >
//             {i + 1}
//             {currentPage === i + 1 && (
//               <span
//                 className={cn(
//                   "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
//                   darkMode ? "bg-indigo-400" : "bg-indigo-600",
//                 )}
//               ></span>
//             )}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//         disabled={currentPage === totalPages}
//         className={buttonStyle(currentPage === totalPages)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// // =============================
// // MAIN COMPONENT
// // =============================
// export default function Wishlist({ darkMode }) {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ message: "", type: "", show: false });
//   const token = localStorage.getItem("token");
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6; // Same as Reservations

//   // --- Handlers ---
//   const showAlert = useCallback(
//     (message, type) => setAlert({ show: true, message, type }),
//     [],
//   );
//   const hideAlert = useCallback(
//     () => setAlert({ show: false, message: "", type: "" }),
//     [],
//   );

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       setLoading(true);
//       try {
//         const [wishlistRes, issuedRes, reservedRes, studentRes] =
//           await Promise.all([
//             axios.get("http://localhost:3002/api/wishlist", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//             axios.get("http://localhost:3002/api/books/student/issued-books", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//             axios.get(
//               "http://localhost:3002/api/books/student/reserved-books",
//               { headers: { Authorization: `Bearer ${token}` } },
//             ),
//             axios.get("http://localhost:3002/auth/me", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//           ]);
//         const allBooksRes = await axios.get("http://localhost:3002/api/books");
//         const books = wishlistRes.data.wishlist
//           .map((item) => ({
//             ...allBooksRes.data.books.find((b) => b._id === item.bookId),
//             addedDate: item.addedDate,
//           }))
//           .filter(Boolean);
//         setWishlistBooks(books);
//         setStudent(studentRes.data.user);
//         const issuedObj = {};
//         issuedRes.data.issuedBooks.forEach((ib) => {
//           const bookId = ib.bookId._id || ib.bookId;
//           issuedObj[bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//         const reservedObj = {};
//         reservedRes.data.reservations.forEach((r) => {
//           const bookId = r.bookId._id || r.bookId;
//           reservedObj[bookId] = true;
//         });
//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         showAlert("Failed to load data.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [token, showAlert]);

//   // --- Event Handlers ---
//   const handleIssue = useCallback(
//     async (book) => {
//       if (!student) return;
//       const bookId = book._id;
//       if (issuedBooks[bookId]) {
//         showAlert(`You have already issued "${book.title}"!`, "error");
//         return;
//       }
//       if (reservedBooks[bookId]) {
//         showAlert(`You have already reserved "${book.title}"!`, "error");
//         return;
//       }
//       const payload = {
//         studentName: `${student.firstName} ${student.lastName}`,
//         studentEmail: student.email,
//         batchNo: student.batchNo,
//         degree: student.degree,
//         program: student.program,
//         cnic: student.cnic,
//       };
//       const confirmIssue = (msg, action) =>
//         window.confirm(msg) ? action() : null;
//       try {
//         if (book.availableCopies === 0) {
//           confirmIssue(
//             `The book "${book.title}" is unavailable. Reserve it?`,
//             async () => {
//               const res = await axios.post(
//                 `http://localhost:3002/api/books/issue/${bookId}`,
//                 payload,
//                 { headers: { Authorization: `Bearer ${token}` } },
//               );
//               if (res.data.type === "reserved") {
//                 setReservedBooks((p) => ({ ...p, [bookId]: true }));
//                 showAlert(`"${book.title}" reserved!`, "success");
//               }
//             },
//           );
//         } else {
//           confirmIssue(`Issue "${book.title}"?`, async () => {
//             const res = await axios.post(
//               `http://localhost:3002/api/books/issue/${bookId}`,
//               payload,
//               { headers: { Authorization: `Bearer ${token}` } },
//             );
//             if (res.data.type === "issued") {
//               setIssuedBooks((p) => ({ ...p, [bookId]: true }));
//               showAlert(`"${book.title}" issued!`, "success");
//             }
//           });
//         }
//       } catch (err) {
//         showAlert(err.response?.data?.message || "Action failed", "error");
//       }
//     },
//     [student, issuedBooks, reservedBooks, token, showAlert],
//   );

//   const handleRemove = useCallback(
//     async (book) => {
//       if (!window.confirm(`Remove "${book.title}" from wishlist?`)) return;
//       try {
//         await axios.post(
//           "http://localhost:3002/api/wishlist",
//           { bookId: book._id, action: "remove" },
//           { headers: { Authorization: `Bearer ${token}` } },
//         );
//         setWishlistBooks((prev) => prev.filter((b) => b._id !== book._id));
//         showAlert("Removed from wishlist.", "success");
//       } catch (err) {
//         showAlert("Wishlist update failed.", "error");
//       }
//     },
//     [token, showAlert],
//   );

//   // --- Memoized Calculations ---
//   const paginatedData = useMemo(() => {
//     const totalPages = Math.max(
//       1,
//       Math.ceil(wishlistBooks.length / booksPerPage),
//     );
//     const startIndex = (currentPage - 1) * booksPerPage;
//     const paginatedBooks = wishlistBooks.slice(
//       startIndex,
//       startIndex + booksPerPage,
//     );
//     return { totalPages, paginatedBooks };
//   }, [wishlistBooks, currentPage, booksPerPage]);

//   const mainStyles = cn(
//     "flex-1 p-4 md:p-8 min-h-screen",
//     darkMode
//       ? "bg-gradient-to-br from-gray-900 to-gray-800"
//       : "bg-gradient-to-br from-gray-50 to-gray-100",
//   );
//   const titleStyles = cn(
//     "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r",
//     darkMode
//       ? "from-indigo-400 to-purple-400"
//       : "from-indigo-600 to-purple-600",
//   );
//   const subtitleStyles = cn(
//     "mt-4 text-lg max-w-2xl mx-auto",
//     darkMode ? "text-gray-400" : "text-gray-600",
//   );

//   return (
//     <>
//       <Navbar darkMode={darkMode} />
//       <div className="flex">
//         <LeftSidebar darkMode={darkMode} />
//         <main className={mainStyles}>
//           <section className="max-w-7xl mx-auto">
//             <header className="mb-12 text-center">
//               <h1 className={titleStyles}>My Wishlist</h1>
//               <p className={subtitleStyles}>Books you've saved for later.</p>
//             </header>
//             {alert.show && (
//               <InlineAlert
//                 message={alert.message}
//                 type={alert.type}
//                 onClose={hideAlert}
//                 darkMode={darkMode}
//               />
//             )}
//             {loading ? (
//               <p
//                 className={cn(
//                   "text-center",
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 Loading your wishlist...
//               </p>
//             ) : wishlistBooks.length === 0 ? (
//               <div className="text-center py-24">
//                 <p
//                   className={cn(
//                     "text-3xl font-light",
//                     darkMode ? "text-gray-400" : "text-gray-500",
//                   )}
//                 >
//                   Your wishlist is empty.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none">
//                   {paginatedData.paginatedBooks.map((book) => (
//                     <WishlistCard
//                       key={book._id}
//                       book={book}
//                       isIssued={issuedBooks[book._id]}
//                       isReserved={reservedBooks[book._id]}
//                       onIssue={handleIssue}
//                       onRemove={handleRemove}
//                       darkMode={darkMode}
//                     />
//                   ))}
//                 </ul>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={paginatedData.totalPages}
//                   setCurrentPage={setCurrentPage}
//                   darkMode={darkMode}
//                 />
//               </>
//             )}
//           </section>
//         </main>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//-----------------------------------------------------------------------------------------

// // src/components/Student/Wishlist/Wishlist.jsx
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   AiOutlineClose,
//   AiOutlineCalendar,
//   AiOutlineCheckCircle,
//   AiOutlineClockCircle,
// } from "react-icons/ai";
// import { FaBookOpen } from "react-icons/fa";

// // =============================
// // UTILITY: Helper for conditional classes
// // =============================
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // =============================
// // INLINE COMPONENT: InlineAlert (Copied from Reservations.jsx)
// // =============================
// const InlineAlert = ({ message, type, onClose, darkMode }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const alertStyles =
//     type === "success"
//       ? cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-emerald-900/80 text-white border border-emerald-700/50"
//             : "bg-white/80 text-gray-800 border border-emerald-200/50",
//         )
//       : cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-red-900/80 text-white border border-red-700/50"
//             : "bg-white/80 text-gray-800 border border-red-200/50",
//         );

//   return (
//     <div className={alertStyles}>
//       <span className="flex-1 text-center font-medium">{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
//         aria-label="Close notification"
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// // =============================
// // INLINE COMPONENT: SkeletonCard (Copied from Reservations.jsx)
// // =============================
// const SkeletonCard = ({ darkMode }) => (
//   <div
//     className={cn(
//       "animate-pulse flex rounded-2xl overflow-hidden",
//       darkMode ? "bg-gray-800" : "bg-gray-200",
//     )}
//   >
//     <div className="flex-1 p-6 md:p-8 space-y-4">
//       <div
//         className={cn(
//           "h-5 rounded-full w-20",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//       <div
//         className={cn(
//           "h-8 rounded w-3/4",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//       <div
//         className={cn(
//           "h-4 rounded w-1/2",
//           darkMode ? "bg-gray-700" : "bg-gray-300",
//         )}
//       ></div>
//     </div>
//     <div
//       className={cn(
//         "w-1/3 md:w-2/5 lg:w-1/2",
//         darkMode ? "bg-gray-700" : "bg-gray-300",
//       )}
//     ></div>
//   </div>
// );

// // =============================
// // INLINE COMPONENT: WishlistCard (Fixed Layout)
// // =============================
// const WishlistCard = React.memo(
//   ({ book, onIssue, onRemove, darkMode, isIssued, isReserved }) => {
//     const addedDate = book.addedDate || new Date();

//     const formattedDate = useMemo(() => {
//       return new Date(addedDate).toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     }, [addedDate]);

//     if (!book) return null;

//     const getStatusStyles = () => {
//       if (isIssued) {
//         return {
//           bg: darkMode ? "bg-emerald-900/50" : "bg-emerald-100",
//           text: darkMode ? "text-emerald-300" : "text-emerald-800",
//           border: darkMode ? "border-emerald-700" : "border-emerald-200",
//           icon: AiOutlineCheckCircle,
//           statusText: "Issued",
//         };
//       }
//       if (isReserved) {
//         return {
//           bg: darkMode ? "bg-amber-900/50" : "bg-amber-100",
//           text: darkMode ? "text-amber-300" : "text-amber-800",
//           border: darkMode ? "border-amber-700" : "border-amber-200",
//           icon: AiOutlineClockCircle,
//           statusText: "Reserved",
//         };
//       }
//       return {
//         bg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
//         text: darkMode ? "text-blue-300" : "text-blue-800",
//         border: darkMode ? "border-blue-700" : "border-blue-200",
//         icon: FaBookOpen,
//         statusText: "Available",
//       };
//     };

//     const { bg, text, border, icon: Icon, statusText } = getStatusStyles();

//     // FIX 1: Set a fixed height on the card and ensure it's a flex container.
//     const cardStyles = cn(
//       "group/card flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden group-hover/card:-translate-y-1 border-2 h-80", // Added h-80
//       darkMode ? "bg-gray-800 border-gray-300" : "bg-white border-gray-700",
//     );

//     const imageContainerStyles = cn(
//       "w-full md:w-1/3 lg:w-2/5 h-48 md:h-auto relative overflow-hidden flex items-center justify-center",
//       darkMode ? "bg-gray-700" : "bg-gray-100",
//     );

//     const getActionButtonProps = () => {
//       if (isIssued || isReserved) {
//         return { text: statusText, disabled: true };
//       }
//       return {
//         text: book.availableCopies > 0 ? "Issue" : "Reserve",
//         disabled: false,
//       };
//     };

//     const { text: actionText, disabled } = getActionButtonProps();

//     return (
//       <li className="group/card">
//         <div className={cardStyles}>
//           {/* Text Section */}
//           {/* FIX 2: Make the text section a flex column that grows and justifies content between */}
//           <div className="flex-1 p-4 md:p-4 flex flex-col justify-between">
//             <div>
//               <span
//                 className={cn(
//                   "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border",
//                   bg,
//                   text,
//                   border,
//                 )}
//               >
//                 <Icon size={14} className="mr-1.5" />
//                 {statusText}
//               </span>
//               <h3
//                 className={cn(
//                   "font-bold text-2xl mb-2 leading-tight line-clamp-2", // Added line-clamp-2 for long titles
//                   darkMode ? "text-white" : "text-gray-900",
//                 )}
//               >
//                 {book.title}
//               </h3>
//               <p
//                 className={cn(
//                   "text-sm font-light line-clamp-1", // Added line-clamp-1 for long author names
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 by {book.author}
//               </p>
//             </div>

//             {/* FIX 3: Use mt-auto to push this section to the bottom */}
//             <div className="flex items-center justify-between mt-auto gap-8">
//               {" "}
//               {/* Added gap-8 for more spacing */}
//               {/* FIX 4: Date container with proper styling to prevent wrapping */}
//               <div
//                 className={cn(
//                   "flex items-center text-sm whitespace-nowrap flex-shrink-0", // Added whitespace-nowrap and flex-shrink-0
//                   darkMode ? "text-gray-400" : "text-gray-500",
//                 )}
//               >
//                 <AiOutlineCalendar className="mr-2 flex-shrink-0" size={16} />
//                 <span className="whitespace-nowrap">{formattedDate}</span>
//               </div>
//               {/* FIX 5: Group buttons for better spacing */}
//               <div className="flex items-center gap-4 flex-shrink-0">
//                 {" "}
//                 {/* Added flex-shrink-0 */}
//                 <button
//                   onClick={() => onIssue(book)}
//                   disabled={disabled}
//                   className={cn(
//                     "px-3 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap", // Added whitespace-nowrap
//                     disabled
//                       ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                       : "bg-green-500 hover:bg-green-600 text-white",
//                   )}
//                 >
//                   {actionText}
//                 </button>
//                 <button
//                   onClick={() => onRemove(book)}
//                   aria-label={`Remove ${book.title} from wishlist`}
//                   className={cn(
//                     "p-2 rounded-full transition-all border-2 duration-300 hover:bg-red-100 hover:text-red-600 flex-shrink-0", // Added flex-shrink-0
//                     darkMode
//                       ? "bg-gray-700 text-gray-300 border-gray-300 hover:bg-red-900/40 hover:text-red-400"
//                       : "bg-gray-100 text-gray-600 border-gray-500 hover:bg-red-100 hover:text-red-600",
//                   )}
//                 >
//                   <AiOutlineClose size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className={imageContainerStyles}>
//             <img
//               src={
//                 book.image ||
//                 "https://via.placeholder.com/400x600.png?text=No+Cover"
//               }
//               alt={`Cover of the book "${book.title}"`}
//               className="h-full w-100 object-fit transition-transform duration-700 group-hover/card:scale-105" // Changed object-fit to object-cover
//               loading="lazy"
//             />
//           </div>
//         </div>
//       </li>
//     );
//   },
// );
// // =============================
// // INLINE COMPONENT: Pagination (Copied from Reservations.jsx)
// // =============================
// const Pagination = ({ currentPage, totalPages, setCurrentPage, darkMode }) => {
//   if (totalPages <= 1) return null;

//   const buttonStyle = (disabled) =>
//     cn(
//       "text-sm font-semibold uppercase tracking-wide transition-all duration-300",
//       disabled
//         ? "text-gray-400 cursor-not-allowed"
//         : cn(
//             "hover:text-indigo-600",
//             darkMode ? "text-white hover:text-indigo-400" : "text-gray-900",
//           ),
//     );

//   const pageNumberStyle = (isActive) =>
//     cn(
//       "relative px-1 py-2 text-sm font-medium transition-all duration-300",
//       isActive
//         ? cn("text-indigo-600", darkMode ? "dark:text-indigo-400" : "")
//         : cn(
//             "hover:text-gray-900",
//             darkMode ? "text-gray-400 hover:text-white" : "text-gray-600",
//           ),
//     );

//   return (
//     <div className="flex justify-center items-center gap-6 mt-16 font-sans">
//       <button
//         onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//         disabled={currentPage === 1}
//         className={buttonStyle(currentPage === 1)}
//       >
//         Prev
//       </button>

//       <div className="flex gap-2">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={pageNumberStyle(currentPage === i + 1)}
//           >
//             {i + 1}
//             {currentPage === i + 1 && (
//               <span
//                 className={cn(
//                   "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
//                   darkMode ? "bg-indigo-400" : "bg-indigo-600",
//                 )}
//               ></span>
//             )}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//         disabled={currentPage === totalPages}
//         className={buttonStyle(currentPage === totalPages)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// // =============================
// // MAIN COMPONENT
// // =============================
// export default function Wishlist({ darkMode }) {
//   const [wishlistBooks, setWishlistBooks] = useState([]);
//   const [issuedBooks, setIssuedBooks] = useState({});
//   const [reservedBooks, setReservedBooks] = useState({});
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ message: "", type: "", show: false });
//   const token = localStorage.getItem("token");
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6; // Same as Reservations

//   // --- Handlers ---
//   const showAlert = useCallback(
//     (message, type) => setAlert({ show: true, message, type }),
//     [],
//   );
//   const hideAlert = useCallback(
//     () => setAlert({ show: false, message: "", type: "" }),
//     [],
//   );

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;
//       setLoading(true);
//       try {
//         const [wishlistRes, issuedRes, reservedRes, studentRes] =
//           await Promise.all([
//             axios.get("http://localhost:3002/api/wishlist", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//             axios.get("http://localhost:3002/api/books/student/issued-books", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//             axios.get(
//               "http://localhost:3002/api/books/student/reserved-books",
//               { headers: { Authorization: `Bearer ${token}` } },
//             ),
//             axios.get("http://localhost:3002/auth/me", {
//               headers: { Authorization: `Bearer ${token}` },
//             }),
//           ]);
//         const allBooksRes = await axios.get("http://localhost:3002/api/books");
//         const books = wishlistRes.data.wishlist
//           .map((item) => ({
//             ...allBooksRes.data.books.find((b) => b._id === item.bookId),
//             addedDate: item.addedDate,
//           }))
//           .filter(Boolean);
//         setWishlistBooks(books);
//         setStudent(studentRes.data.user);
//         const issuedObj = {};
//         issuedRes.data.issuedBooks.forEach((ib) => {
//           const bookId = ib.bookId._id || ib.bookId;
//           issuedObj[bookId] = true;
//         });
//         setIssuedBooks(issuedObj);
//         const reservedObj = {};
//         reservedRes.data.reservations.forEach((r) => {
//           const bookId = r.bookId._id || r.bookId;
//           reservedObj[bookId] = true;
//         });
//         setReservedBooks(reservedObj);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         showAlert("Failed to load data.", "error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [token, showAlert]);

//   // --- Event Handlers ---
//   const handleIssue = useCallback(
//     async (book) => {
//       if (!student) return;
//       const bookId = book._id;
//       if (issuedBooks[bookId]) {
//         showAlert(`You have already issued "${book.title}"!`, "error");
//         return;
//       }
//       if (reservedBooks[bookId]) {
//         showAlert(`You have already reserved "${book.title}"!`, "error");
//         return;
//       }
//       const payload = {
//         studentName: `${student.firstName} ${student.lastName}`,
//         studentEmail: student.email,
//         batchNo: student.batchNo,
//         degree: student.degree,
//         program: student.program,
//         cnic: student.cnic,
//       };
//       const confirmIssue = (msg, action) =>
//         window.confirm(msg) ? action() : null;
//       try {
//         if (book.availableCopies === 0) {
//           confirmIssue(
//             `The book "${book.title}" is unavailable. Reserve it?`,
//             async () => {
//               const res = await axios.post(
//                 `http://localhost:3002/api/books/issue/${bookId}`,
//                 payload,
//                 { headers: { Authorization: `Bearer ${token}` } },
//               );
//               if (res.data.type === "reserved") {
//                 setReservedBooks((p) => ({ ...p, [bookId]: true }));
//                 showAlert(`"${book.title}" reserved!`, "success");
//               }
//             },
//           );
//         } else {
//           confirmIssue(`Issue "${book.title}"?`, async () => {
//             const res = await axios.post(
//               `http://localhost:3002/api/books/issue/${bookId}`,
//               payload,
//               { headers: { Authorization: `Bearer ${token}` } },
//             );
//             if (res.data.type === "issued") {
//               setIssuedBooks((p) => ({ ...p, [bookId]: true }));
//               showAlert(`"${book.title}" issued!`, "success");
//             }
//           });
//         }
//       } catch (err) {
//         showAlert(err.response?.data?.message || "Action failed", "error");
//       }
//     },
//     [student, issuedBooks, reservedBooks, token, showAlert],
//   );

//   const handleRemove = useCallback(
//     async (book) => {
//       if (!window.confirm(`Remove "${book.title}" from wishlist?`)) return;
//       try {
//         await axios.post(
//           "http://localhost:3002/api/wishlist",
//           { bookId: book._id, action: "remove" },
//           { headers: { Authorization: `Bearer ${token}` } },
//         );
//         setWishlistBooks((prev) => prev.filter((b) => b._id !== book._id));
//         showAlert("Removed from wishlist.", "success");
//       } catch (err) {
//         showAlert("Wishlist update failed.", "error");
//       }
//     },
//     [token, showAlert],
//   );

//   // --- Memoized Calculations ---
//   const paginatedData = useMemo(() => {
//     const totalPages = Math.max(
//       1,
//       Math.ceil(wishlistBooks.length / booksPerPage),
//     );
//     const startIndex = (currentPage - 1) * booksPerPage;
//     const paginatedBooks = wishlistBooks.slice(
//       startIndex,
//       startIndex + booksPerPage,
//     );
//     return { totalPages, paginatedBooks };
//   }, [wishlistBooks, currentPage, booksPerPage]);

//   const mainStyles = cn(
//     "flex-1 p-4 md:p-8 min-h-screen",
//     darkMode
//       ? "bg-gradient-to-br from-gray-900 to-gray-800"
//       : "bg-gradient-to-br from-gray-50 to-gray-100",
//   );
//   const titleStyles = cn(
//     "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r",
//     darkMode
//       ? "from-indigo-400 to-purple-400"
//       : "from-indigo-600 to-purple-600",
//   );
//   const subtitleStyles = cn(
//     "mt-4 text-lg max-w-2xl mx-auto",
//     darkMode ? "text-gray-400" : "text-gray-600",
//   );

//   return (
//     <>
//       <Navbar darkMode={darkMode} />
//       <div className="flex">
//         <LeftSidebar darkMode={darkMode} />
//         <main className={mainStyles}>
//           <section className="max-w-7xl mx-auto">
//             <header className="mb-12 text-center">
//               <h1 className={titleStyles}>My Wishlist</h1>
//               <p className={subtitleStyles}>Books you've saved for later.</p>
//             </header>
//             {alert.show && (
//               <InlineAlert
//                 message={alert.message}
//                 type={alert.type}
//                 onClose={hideAlert}
//                 darkMode={darkMode}
//               />
//             )}
//             {loading ? (
//               <p
//                 className={cn(
//                   "text-center",
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 Loading your wishlist...
//               </p>
//             ) : wishlistBooks.length === 0 ? (
//               <div className="text-center py-24">
//                 <p
//                   className={cn(
//                     "text-3xl font-light",
//                     darkMode ? "text-gray-400" : "text-gray-500",
//                   )}
//                 >
//                   Your wishlist is empty.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none">
//                   {paginatedData.paginatedBooks.map((book) => (
//                     <WishlistCard
//                       key={book._id}
//                       book={book}
//                       isIssued={issuedBooks[book._id]}
//                       isReserved={reservedBooks[book._id]}
//                       onIssue={handleIssue}
//                       onRemove={handleRemove}
//                       darkMode={darkMode}
//                     />
//                   ))}
//                 </ul>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={paginatedData.totalPages}
//                   setCurrentPage={setCurrentPage}
//                   darkMode={darkMode}
//                 />
//               </>
//             )}
//           </section>
//         </main>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//----------------------------------------------------------------------------------------

// src/components/Student/Wishlist/Wishlist.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FooterAll from "../../Footer/FooterAll";
import axios from "axios";
import {
  AiOutlineClose,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";

// =============================
// UTILITY: Helper for conditional classes
// =============================
const cn = (...classes) => classes.filter(Boolean).join(" ");

// =============================
// INLINE COMPONENT: InlineAlert (Copied from Reservations.jsx)
// =============================
const InlineAlert = ({ message, type, onClose, darkMode }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles =
    type === "success"
      ? cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
          darkMode
            ? "bg-emerald-900/80 text-white border border-emerald-700/50"
            : "bg-white/80 text-gray-800 border border-emerald-200/50",
        )
      : cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
          darkMode
            ? "bg-red-900/80 text-white border border-red-700/50"
            : "bg-white/80 text-gray-800 border border-red-200/50",
        );

  return (
    <div className={alertStyles}>
      <span className="flex-1 text-center font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

// =============================
// INLINE COMPONENT: SkeletonCard (Copied from Reservations.jsx)
// =============================
const SkeletonCard = ({ darkMode }) => (
  <div
    className={cn(
      "animate-pulse flex rounded-2xl overflow-hidden",
      darkMode ? "bg-gray-800" : "bg-gray-200",
    )}
  >
    <div className="flex-1 p-6 md:p-8 space-y-4">
      <div
        className={cn(
          "h-5 rounded-full w-20",
          darkMode ? "bg-gray-700" : "bg-gray-300",
        )}
      ></div>
      <div
        className={cn(
          "h-8 rounded w-3/4",
          darkMode ? "bg-gray-700" : "bg-gray-300",
        )}
      ></div>
      <div
        className={cn(
          "h-4 rounded w-1/2",
          darkMode ? "bg-gray-700" : "bg-gray-300",
        )}
      ></div>
    </div>
    <div
      className={cn(
        "w-1/3 md:w-2/5 lg:w-1/2",
        darkMode ? "bg-gray-700" : "bg-gray-300",
      )}
    ></div>
  </div>
);

// =============================
// INLINE COMPONENT: WishlistCard (Fixed Layout)
// =============================
const WishlistCard = React.memo(
  ({ book, onIssue, onRemove, darkMode, isIssued, isReserved }) => {
    const addedDate = book.addedDate || new Date();

    const formattedDate = useMemo(() => {
      return new Date(addedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }, [addedDate]);

    if (!book) return null;

    const getStatusStyles = () => {
      if (isIssued) {
        return {
          bg: darkMode ? "bg-emerald-900/50" : "bg-[#F0FDF4]",
          text: darkMode ? "text-emerald-300" : "text-[#6BD569]",
          border: darkMode ? "border-emerald-700" : "border-emerald-200",
          icon: AiOutlineCheckCircle,
          statusText: "Issued",
        };
      }
      if (isReserved) {
        return {
          bg: darkMode ? "bg-amber-900/50" : "bg-amber-100",
          text: darkMode ? "text-amber-300" : "text-amber-800",
          border: darkMode ? "border-amber-700" : "border-amber-200",
          icon: AiOutlineClockCircle,
          statusText: "Reserved",
        };
      }
      return {
        bg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
        text: darkMode ? "text-blue-300" : "text-blue-800",
        border: darkMode ? "border-blue-700" : "border-blue-200",
        icon: FaBookOpen,
        statusText: "Available",
      };
    };

    const { bg, text, border, icon: Icon, statusText } = getStatusStyles();

    // FIX 1: Increased height and removed responsive flex direction changes
    // const cardStyles = cn(
    //   "group/card flex flex-row rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out overflow-hidden border h-72", // Increased height to h-72 and removed md:flex-row
    //   darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
    // );
    const cardStyles = cn(
      "group/card flex flex-row sm:flex-reverse rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out border min-h-[340px]",
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-400",
    );

    // FIX 2: Increased image width and removed padding around image
    const imageContainerStyles = cn(
      "relative w-1/2 object-fit overflow-hidden flex items-center justify-center", // Fixed width to w-1/2 and removed responsive classes
      darkMode ? "bg-gray-700" : "bg-gray-100",
    );

    // FIX 3: Adjusted text section width
    const textSectionStyles = cn(
      "flex-1 p-4 flex flex-col justify-between", // Removed flex-shrink-0 and adjusted padding
    );

    const getActionButtonProps = () => {
      if (isIssued || isReserved) {
        return { text: statusText, disabled: true };
      }
      return {
        text: book.availableCopies > 0 ? "Issue" : "Reserve",
        disabled: false,
      };
    };

    const { text: actionText, disabled } = getActionButtonProps();

    return (
      <li className="group/card w-full">
        <div className={cardStyles}>
          {/* Text Section */}
          <div className={textSectionStyles}>
            <div className="overflow-hidden">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border",
                  bg,
                  text,
                  border,
                )}
              >
                <Icon size={12} className="mr-1" />
                {statusText}
              </span>
              <h3
                className={cn(
                  "font-bold text-lg md:text-xl mb-1 mt-4 leading-tight line-clamp-2",
                  darkMode ? "text-white" : "text-gray-900",
                )}
              >
                {book.title}
              </h3>

              {/* --- Updated content with more gap between title and author --- */}
              <div className="space-y-4 mb-4 mt-3">
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

              {/* Star Rating */}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
              {/* Date */}
              <div
                className={cn(
                  "flex items-center text-xs whitespace-nowrap",
                  darkMode ? "text-gray-400" : "text-gray-500",
                )}
              >
                <AiOutlineCalendar className="mr-1 flex-shrink-0" size={14} />
                <span className="whitespace-nowrap">{formattedDate}</span>
              </div>

              {/* Button */}
              <div className="flex sm:justify-end">
                <button
                  onClick={() => onIssue(book)}
                  disabled={disabled}
                  className={cn(
                    "w-full sm:w-auto px-3 py-2 rounded-md font-bold transition-all duration-300 text-md whitespace-nowrap",
                    disabled
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white",
                  )}
                >
                  {actionText}
                </button>
              </div>
            </div>
          </div>

          {/* Image Section with Cross Button */}
          <div className={imageContainerStyles}>
            {/* Cross button with proper styling for visibility and hover effect */}
            <button
              onClick={() => onRemove(book)}
              aria-label={`Remove ${book.title} from wishlist`}
              className={cn(
                "absolute top-0 right-0 z-20 p-2.5 rounded-md transition-all duration-300 shadow-lg backdrop-blur-md",
                darkMode
                  ? "bg-gray-900/90 text-white  hover:bg-red-600/90 hover:border-red-500 hover:text-white hover:shadow-red-500/25"
                  : "bg-gray-300 text-black  hover:bg-red-500/95  hover:text-white hover:shadow-red-500/25",
                "hover:scale-110 active:scale-95",
              )}
            >
              <AiOutlineClose size={18} className="drop-shadow-sm" />
            </button>
            <img
              src={
                book.image ||
                "https://via.placeholder.com/400x600.png?text=No+Cover"
              }
              alt={`Cover of the book "${book.title}"`}
              className="h-full w-full object-fit transition-transform duration-700 group-hover/card:scale-105" // Changed to object-cover to fill the container
              loading="lazy"
            />
          </div>
        </div>
      </li>
    );
  },
);

// =============================
// INLINE COMPONENT: Pagination (Copied from Reservations.jsx)
// =============================
const Pagination = ({ currentPage, totalPages, setCurrentPage, darkMode }) => {
  if (totalPages <= 1) return null;

  const buttonStyle = (disabled) =>
    cn(
      "text-sm font-semibold uppercase tracking-wide transition-all duration-300",
      disabled
        ? "text-gray-400 cursor-not-allowed"
        : cn(
            "hover:text-indigo-600",
            darkMode ? "text-white hover:text-indigo-400" : "text-gray-900",
          ),
    );

  const pageNumberStyle = (isActive) =>
    cn(
      "relative px-1 py-2 text-sm font-medium transition-all duration-300",
      isActive
        ? cn("text-indigo-600", darkMode ? "dark:text-indigo-400" : "")
        : cn(
            "hover:text-gray-900",
            darkMode ? "text-gray-400 hover:text-white" : "text-gray-600",
          ),
    );

  return (
    <div className="flex justify-center items-center gap-6 mt-16 font-sans">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={buttonStyle(currentPage === 1)}
      >
        Prev
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={pageNumberStyle(currentPage === i + 1)}
          >
            {i + 1}
            {currentPage === i + 1 && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                  darkMode ? "bg-indigo-400" : "bg-indigo-600",
                )}
              ></span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={buttonStyle(currentPage === totalPages)}
      >
        Next
      </button>
    </div>
  );
};

// =============================
// MAIN COMPONENT
// =============================
export default function Wishlist({ darkMode }) {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState({});
  const [reservedBooks, setReservedBooks] = useState({});
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // Same as Reservations

  // --- Handlers ---
  const showAlert = useCallback(
    (message, type) => setAlert({ show: true, message, type }),
    [],
  );
  const hideAlert = useCallback(
    () => setAlert({ show: false, message: "", type: "" }),
    [],
  );

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [wishlistRes, issuedRes, reservedRes, studentRes] =
          await Promise.all([
            axios.get("http://localhost:3002/api/wishlist", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3002/api/books/student/issued-books", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              "http://localhost:3002/api/books/student/reserved-books",
              { headers: { Authorization: `Bearer ${token}` } },
            ),
            axios.get("http://localhost:3002/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        const allBooksRes = await axios.get("http://localhost:3002/api/books");
        const books = wishlistRes.data.wishlist
          .map((item) => ({
            ...allBooksRes.data.books.find((b) => b._id === item.bookId),
            addedDate: item.addedDate,
          }))
          .filter(Boolean);
        setWishlistBooks(books);
        setStudent(studentRes.data.user);
        const issuedObj = {};
        issuedRes.data.issuedBooks.forEach((ib) => {
          const bookId = ib.bookId._id || ib.bookId;
          issuedObj[bookId] = true;
        });
        setIssuedBooks(issuedObj);
        const reservedObj = {};
        reservedRes.data.reservations.forEach((r) => {
          const bookId = r.bookId._id || r.bookId;
          reservedObj[bookId] = true;
        });
        setReservedBooks(reservedObj);
      } catch (err) {
        console.error("Fetch error:", err);
        showAlert("Failed to load data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, showAlert]);

  // --- Event Handlers ---
  const handleIssue = useCallback(
    async (book) => {
      if (!student) return;
      const bookId = book._id;
      if (issuedBooks[bookId]) {
        showAlert(`You have already issued "${book.title}"!`, "error");
        return;
      }
      if (reservedBooks[bookId]) {
        showAlert(`You have already reserved "${book.title}"!`, "error");
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
      const confirmIssue = (msg, action) =>
        window.confirm(msg) ? action() : null;
      try {
        if (book.availableCopies === 0) {
          confirmIssue(
            `The book "${book.title}" is unavailable. Reserve it?`,
            async () => {
              const res = await axios.post(
                `http://localhost:3002/api/books/issue/${bookId}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } },
              );
              if (res.data.type === "reserved") {
                setReservedBooks((p) => ({ ...p, [bookId]: true }));
                showAlert(`"${book.title}" reserved!`, "success");
              }
            },
          );
        } else {
          confirmIssue(`Issue "${book.title}"?`, async () => {
            const res = await axios.post(
              `http://localhost:3002/api/books/issue/${bookId}`,
              payload,
              { headers: { Authorization: `Bearer ${token}` } },
            );
            if (res.data.type === "issued") {
              setIssuedBooks((p) => ({ ...p, [bookId]: true }));
              showAlert(`"${book.title}" issued!`, "success");
            }
          });
        }
      } catch (err) {
        showAlert(err.response?.data?.message || "Action failed", "error");
      }
    },
    [student, issuedBooks, reservedBooks, token, showAlert],
  );

  const handleRemove = useCallback(
    async (book) => {
      if (!window.confirm(`Remove "${book.title}" from wishlist?`)) return;
      try {
        await axios.post(
          "http://localhost:3002/api/wishlist",
          { bookId: book._id, action: "remove" },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setWishlistBooks((prev) => prev.filter((b) => b._id !== book._id));
        showAlert("Removed from wishlist.", "success");
      } catch (err) {
        showAlert("Wishlist update failed.", "error");
      }
    },
    [token, showAlert],
  );

  // --- Memoized Calculations ---
  const paginatedData = useMemo(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(wishlistBooks.length / booksPerPage),
    );
    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedBooks = wishlistBooks.slice(
      startIndex,
      startIndex + booksPerPage,
    );
    return { totalPages, paginatedBooks };
  }, [wishlistBooks, currentPage, booksPerPage]);

  const mainStyles = cn(
    "flex-1 p-4 md:p-8 min-h-screen",
    darkMode
      ? "bg-gradient-to-br from-gray-900 to-gray-800"
      : "bg-gradient-to-br from-gray-50 to-gray-100",
  );
  // const titleStyles = cn(
  //   "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r",
  //   darkMode
  //     ? "from-indigo-400 to-purple-400"
  //     : "from-indigo-600 to-purple-600",
  // );
  // const subtitleStyles = cn(
  //   "mt-4 text-lg max-w-2xl mx-auto",
  //   darkMode ? "text-gray-400" : "text-gray-600",
  // );

  return (
    <>
      <Navbar darkMode={darkMode} />
      <div className="flex">
        <LeftSidebar darkMode={darkMode} />
        <main className={mainStyles}>
          <section className="max-w-7xl mx-auto">
            {/* <header className="mb-12 text-center">
              <h1 className={titleStyles}>My Wishlist</h1>
              <p className={subtitleStyles}>Books you've saved for later.</p>
            </header> */}
            <header className="mb-10">
              <div className="max-w-7xl mx-auto px-4 md:px-2">
                {/* Title Row */}
                <div className="flex items-center gap-3">
                  {/* Title */}
                  <h1
                    className={cn(
                      "text-3xl md:text-3xl font-bold leading-tight",
                      darkMode ? "text-white" : "text-gray-900",
                    )}
                  >
                    My Wishlist
                  </h1>
                </div>
              </div>
            </header>

            {alert.show && (
              <InlineAlert
                message={alert.message}
                type={alert.type}
                onClose={hideAlert}
                darkMode={darkMode}
              />
            )}
            {loading ? (
              <p
                className={cn(
                  "text-center",
                  darkMode ? "text-gray-400" : "text-gray-600",
                )}
              >
                Loading your wishlist...
              </p>
            ) : wishlistBooks.length === 0 ? (
              <div className="text-center py-24">
                <p
                  className={cn(
                    "text-3xl font-light",
                    darkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  Your wishlist is empty.
                </p>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none">
                  {paginatedData.paginatedBooks.map((book) => (
                    <WishlistCard
                      key={book._id}
                      book={book}
                      isIssued={issuedBooks[book._id]}
                      isReserved={reservedBooks[book._id]}
                      onIssue={handleIssue}
                      onRemove={handleRemove}
                      darkMode={darkMode}
                    />
                  ))}
                </ul>
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginatedData.totalPages}
                  setCurrentPage={setCurrentPage}
                  darkMode={darkMode}
                />
              </>
            )}
          </section>
        </main>
      </div>
      <FooterAll />
    </>
  );
}
