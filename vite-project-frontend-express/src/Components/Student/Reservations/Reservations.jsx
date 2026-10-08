// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Reservations({ darkMode }) {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // =============================
//   // FETCH RESERVED BOOKS
//   // =============================
//   useEffect(() => {
//     const fetchReservations = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         // Only pending reservations are returned from backend
//         setReservations(res.data.reservations || []);
//         setCurrentPage(1); // reset pagination
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReservations();
//   }, [token]);

//   // =============================
//   // CANCEL RESERVATION
//   // =============================
//   const handleCancel = async (reservationId, title) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to cancel the reservation for "${title}"?`,
//     );
//     if (!confirmed) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/cancel-reservation/${reservationId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       // Remove from state
//       setReservations((prev) =>
//         prev.filter((resv) => resv._id !== reservationId),
//       );

//       alert("Reservation cancelled ✅");
//     } catch (err) {
//       console.error("Cancel reservation error:", err);
//       alert("Failed to cancel reservation ❌");
//     }
//   };

//   // =============================
//   // PAGINATION
//   // =============================
//   const totalPages = Math.max(1, Math.ceil(reservations.length / booksPerPage));
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedReservations = reservations.slice(
//     startIndex,
//     startIndex + booksPerPage,
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />

//         <div className="p-6 w-full min-h-screen">
//           <h1 className="text-2xl font-bold mb-6">My Reserved Books 📚</h1>

//           {loading ? (
//             <p>Loading...</p>
//           ) : reservations.length === 0 ? (
//             <p className="text-gray-500">No reserved books found.</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {paginatedReservations.map((resv) => {
//                   const book = resv.bookId;

//                   return (
//                     <div
//                       key={resv._id}
//                       className="bg-white border rounded-xl p-4 hover:shadow-xl transition flex flex-col items-center relative"
//                     >
//                       {/* CANCEL ICON TOP RIGHT */}
//                       <button
//                         onClick={() => handleCancel(resv._id, book.title)}
//                         aria-label="Cancel reservation"
//                         className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 shadow-sm transition"
//                       >
//                         <AiOutlineClose size={18} />
//                       </button>

//                       {/* BOOK IMAGE */}
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-60 h-60 object-fit rounded mb-3"
//                       />

//                       {/* BOOK DETAILS */}
//                       <h2 className="font-bold text-center">{book.title}</h2>
//                       <p className="mt-2">{book.author}</p>
//                       <p className="mt-1 text-gray-500">
//                         Status:{" "}
//                         <span className="font-semibold capitalize">
//                           {resv.status}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-400 mt-1">
//                         Reserved on:{" "}
//                         {new Date(resv.reservationDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* PAGINATION */}
//               <div className="flex justify-center items-center gap-2 mt-10">
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

//----------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";

// export default function Reservations({ darkMode }) {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 6;

//   // =============================
//   // FETCH RESERVED BOOKS
//   // =============================
//   useEffect(() => {
//     const fetchReservations = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get(
//           "http://localhost:3002/api/books/student/reserved-books",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         // Only pending reservations are returned from backend
//         setReservations(res.data.reservations || []);
//         setCurrentPage(1); // reset pagination
//       } catch (err) {
//         console.error("Error fetching reserved books:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReservations();
//   }, [token]);

//   // =============================
//   // CANCEL RESERVATION
//   // =============================
//   const handleCancel = async (reservationId, title) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to cancel the reservation for "${title}"?`,
//     );
//     if (!confirmed) return;

//     try {
//       await axios.post(
//         `http://localhost:3002/api/books/cancel-reservation/${reservationId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       // Remove from state
//       setReservations((prev) =>
//         prev.filter((resv) => resv._id !== reservationId),
//       );

//       alert("Reservation cancelled ✅");
//     } catch (err) {
//       console.error("Cancel reservation error:", err);
//       alert("Failed to cancel reservation ❌");
//     }
//   };

//   // =============================
//   // PAGINATION
//   // =============================
//   const totalPages = Math.max(1, Math.ceil(reservations.length / booksPerPage));
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const paginatedReservations = reservations.slice(
//     startIndex,
//     startIndex + booksPerPage,
//   );

//   return (
//     <>
//       <Navbar />

//       <div className="flex">
//         <LeftSidebar />

//         {/* MAIN CONTENT */}
//         <div className="p-6 w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
//           <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//             My Reserved Books 📚
//           </h1>

//           {loading ? (
//             <p className="text-gray-600 dark:text-gray-300">Loading...</p>
//           ) : reservations.length === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400">
//               No reserved books found.
//             </p>
//           ) : (
//             <>
//               {/* CARDS */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {paginatedReservations.map((resv) => {
//                   const book = resv.bookId;

//                   return (
//                     <div
//                       key={resv._id}
//                       className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
//                              rounded-xl p-4 hover:shadow-xl transition
//                              flex flex-col items-center relative"
//                     >
//                       {/* CANCEL ICON */}
//                       <button
//                         onClick={() => handleCancel(resv._id, book.title)}
//                         aria-label="Cancel reservation"
//                         className="absolute top-3 right-3 w-8 h-8 rounded-full
//                                bg-gray-100 dark:bg-gray-700
//                                text-gray-600 dark:text-gray-300
//                                hover:bg-red-100 hover:text-red-600
//                                dark:hover:bg-red-900/40 dark:hover:text-red-400
//                                shadow-sm transition flex items-center justify-center"
//                       >
//                         <AiOutlineClose size={18} />
//                       </button>

//                       {/* BOOK IMAGE */}
//                       <img
//                         src={book.image}
//                         alt={book.title}
//                         className="w-60 h-60 object-cover rounded mb-3
//                                border border-gray-300 dark:border-gray-600"
//                       />

//                       {/* BOOK DETAILS */}
//                       <h2 className="font-bold text-center text-gray-900 dark:text-white">
//                         {book.title}
//                       </h2>

//                       <p className="mt-2 text-gray-700 dark:text-gray-300">
//                         {book.author}
//                       </p>

//                       <p className="mt-1 text-gray-500 dark:text-gray-400">
//                         Status:{" "}
//                         <span className="font-semibold capitalize text-gray-800 dark:text-gray-200">
//                           {resv.status}
//                         </span>
//                       </p>

//                       <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
//                         Reserved on:{" "}
//                         {new Date(resv.reservationDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* PAGINATION */}
//               <div className="flex justify-center items-center gap-2 mt-10">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1 rounded border font-bold transition
//                 ${
//                   currentPage === 1
//                     ? "bg-gray-300 text-black cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                     : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
//                 }`}
//                 >
//                   Prev
//                 </button>

//                 {[...Array(totalPages)].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1 rounded border font-bold transition ${
//                       currentPage === i + 1
//                         ? "bg-pink-500 text-white"
//                         : "bg-white text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-1 rounded border font-bold transition
//                 ${
//                   currentPage === totalPages
//                     ? "bg-gray-300 text-black cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                     : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
//                 }`}
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

//----------------------------------------------------------------------------

// src/components/Reservations/Reservations.js
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

// =============================
// UTILITY: Helper for conditional classes
// =============================
const cn = (...classes) => classes.filter(Boolean).join(" ");

// =============================
// INLINE COMPONENT: InlineAlert
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
// INLINE COMPONENT: SkeletonCard
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
// INLINE COMPONENT: ReservationCard
// =============================
const ReservationCard = React.memo(({ reservation, onCancel, darkMode }) => {
  const book = reservation.bookId;
  const { status, reservationDate } = reservation;

  const formattedDate = useMemo(() => {
    return new Date(reservationDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [reservationDate]);

  if (!book) return null;

  // Enhanced status styles for better visibility
  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return {
          // Status badge colors
          badgeBg: darkMode ? "bg-emerald-700/80" : "bg-emerald-600/90",
          badgeText: darkMode ? "text-emerald-100" : "text-white",
          badgeBorder: darkMode ? "border-emerald-500" : "border-emerald-400",
          // Status button colors (different from badge)
          buttonBg: darkMode ? "bg-emerald-800/90" : "bg-emerald-700",
          buttonText: darkMode ? "text-emerald-100" : "text-white",
          buttonBorder: darkMode ? "border-emerald-600" : "border-emerald-500",
          icon: AiOutlineCheckCircle,
          statusText: "Issued",
        };
      default:
        return {
          // Status badge colors
          badgeBg: darkMode
            ? // ? "bg-[#D1AA49]" : "bg-[#D49237]",
              "bg-amber-500/20"
            : "bg-amber-100",

          // badgeText: darkMode ? "text-[#7B5E00]" : "text-[#7B5E00]",
          // badgeBorder: darkMode ? "border-amber-500" : "border-amber-400",
          badgeText: darkMode ? "text-amber-300" : "text-amber-800",
          badgeBorder: darkMode ? "border-amber-500" : "border-amber-300",

          // Status button colors (different from badge)
          buttonBg: darkMode ? "bg-amber-800/90" : "bg-amber-700",
          buttonText: darkMode ? "text-amber-100" : "text-white",
          buttonBorder: darkMode ? "border-amber-600" : "border-amber-500",
          icon: AiOutlineClockCircle,
          statusText: "Pending",
        };
    }
  };

  const {
    badgeBg,
    badgeText,
    badgeBorder,
    icon: Icon,
    statusText,
  } = getStatusStyles(status);

  // Updated card styles
  const cardStyles = cn(
    "group/card flex flex-row rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out overflow-hidden border min-h-[320px]",
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-400",
  );

  // Updated image container styles - ensure image fills container completely
  const imageContainerStyles = cn(
    "relative w-2/4 overflow-hidden flex items-center",
    darkMode ? "bg-gray-700" : "bg-gray-100",
  );

  // Updated text section styles
  // const textSectionStyles = cn("flex-1 p-4 flex flex-col justify-between");
  const textSectionStyles = cn("flex-1 p-4 flex flex-col");

  return (
    <li className="group/card w-full">
      <div className={cardStyles}>
        {/* Text Section */}
        <div className={textSectionStyles}>
          <div className="overflow-hidden">
            {/* Enhanced status badge with better visibility */}
            <span
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-2 border shadow-sm",
                badgeBg,
                badgeText,
                badgeBorder,
              )}
            >
              <Icon size={14} className="mr-1.5" />
              {statusText}
            </span>
            <h3
              className={cn(
                "font-bold text-xl md:text-2xl mb-2 mt-1 leading-tight line-clamp-2",
                darkMode ? "text-white" : "text-gray-900",
              )}
            >
              {book.title}
            </h3>

            {/* Updated content with more gaps between elements */}
            <div className="space-y-4 mb-2 mt-4">
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

            {/* Star Rating - added gap with category */}
            <div className="flex items-center mb-1 mt-4">
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

          {/* Updated bottom section - reduced gap between stars and date */}
          <div className="flex items-center justify-between gap-2 mt-3">
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
          </div>
        </div>

        {/* Image Section with Cross Button - fixed height issue */}
        <div className={imageContainerStyles}>
          {/* Cross button for canceling reservation */}
          <button
            onClick={() => onCancel(reservation._id, book.title)}
            aria-label={`Cancel reservation for ${book.title}`}
            className={cn(
              "absolute top-0 right-0 z-20 p-2.5 rounded-md transition-all duration-300 shadow-lg backdrop-blur-md",
              darkMode
                ? "bg-gray-900/90 text-white  hover:bg-red-600/90  hover:text-white hover:shadow-red-500/25"
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
            // className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
            className="max-h-[320px] w-full object-fit transition-transform duration-700 group-hover/card:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </li>
  );
});

// =============================
// INLINE COMPONENT: Pagination
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
export default function Reservations({ darkMode }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const fetchReservations = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3002/api/books/student/reserved-books",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setReservations(res.data.reservations || []);
        setCurrentPage(1);
      } catch (err) {
        setAlert({
          message: "Failed to fetch reservations.",
          type: "error",
          show: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [token]);

  const handleCancel = useCallback(
    async (reservationId, title) => {
      const confirmed = window.confirm(`Cancel reservation for "${title}"?`);
      if (!confirmed) return;
      try {
        await axios.post(
          `http://localhost:3002/api/books/cancel-reservation/${reservationId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setReservations((prev) =>
          prev.filter((resv) => resv._id !== reservationId),
        );
        setAlert({
          message: `Reservation cancelled.`,
          type: "success",
          show: true,
        });
      } catch (err) {
        setAlert({
          message: "Failed to cancel reservation.",
          type: "error",
          show: true,
        });
      }
    },
    [token],
  );

  const paginatedData = useMemo(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(reservations.length / booksPerPage),
    );
    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedReservations = reservations.slice(
      startIndex,
      startIndex + booksPerPage,
    );
    return { totalPages, paginatedReservations };
  }, [reservations, currentPage, booksPerPage]);

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
              <h1 className={titleStyles}>Your Reservations</h1>
              <p className={subtitleStyles}>
                A curated collection of books awaiting your arrival.
              </p>
            </header> */}
            <header className="mb-10 ">
              <div className="max-w-7xl mx-auto px-4 md:px-1">
                {/* <div className="flex items-center gap-1"> */}
                <h1
                  className={cn(
                    "text-4xl md:text-3xl font-bold leading-tight",
                    darkMode ? "text-white" : "text-gray-900",
                  )}
                >
                  Book Reservations
                </h1>
                {/* </div> */}
              </div>
            </header>

            {alert.show && (
              <InlineAlert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert({ ...alert, show: false })}
                darkMode={darkMode}
              />
            )}

            {loading ? (
              <ul className="grid grid-cols-1 gap-6 list-none">
                {[...Array(booksPerPage)].map((_, i) => (
                  <SkeletonCard key={i} darkMode={darkMode} />
                ))}
              </ul>
            ) : reservations.length === 0 ? (
              <div className="text-center py-24">
                <p
                  className={cn(
                    "text-3xl font-light",
                    darkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  No active reservations.
                </p>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none auto-rows-fr">
                  {paginatedData.paginatedReservations.map((resv) => (
                    <ReservationCard
                      key={resv._id}
                      reservation={resv}
                      onCancel={handleCancel}
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
