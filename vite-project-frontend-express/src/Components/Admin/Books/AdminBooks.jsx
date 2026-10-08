// // import React from "react";
// // import "./App.css";
// // import AdminSidebar from "./AdminSidebar";
// // import AdminNavbar from "./AdminNavbar";
// // import { FaBook, FaPlusCircle, FaClock } from "react-icons/fa";

// // function AdminBooks() {
// //   return (
// //     <div>
// //       <AdminNavbar />
// //       <div className="flex">
// //         <AdminSidebar />
// //         <div className="flex justify-between items-center gap-6 px-4">
// //           {/* Recently Issued Books */}
// //           <button className="flex items-center justify-center gap-3 bg-[#1F2A4F] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#2d3b6a] transition-all duration-200 text-lg w-1/3">
// //             <FaClock size={20} /> Recently Issued Books
// //           </button>

// //           {/* Recently Added */}
// //           <button className="flex items-center justify-center gap-3 bg-[#4A427B] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#5a52a0] transition-all duration-200 text-lg w-1/3">
// //             <FaBook size={20} /> Recently Added
// //           </button>

// //           {/* Add Book */}
// //           <button className="flex items-center justify-center gap-3 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-green-700 transition-all duration-200 text-lg w-1/3">
// //             <FaPlusCircle size={22} /> Add Book
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminBooks;

// //-----------------------------------------------------------------------
// import React from "react";
// import "./App.css";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import { FaBook, FaPlusCircle, FaClock } from "react-icons/fa";

// function AdminBooks() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminNavbar />
//       <div className="flex">
//         {/* Sidebar */}
//         <AdminSidebar />

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           {/* Buttons Row */}
//           <div className="flex justify-between items-center gap-6 mb-8">
//             {/* Recently Issued Books */}
//             <button className="flex items-center justify-center gap-3 bg-[#1F2A4F] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#2d3b6a] transition-all duration-200 text-lg w-1/3">
//               <FaClock size={20} /> Recently Issued Books
//             </button>

//             {/* Recently Added */}
//             <button className="flex items-center justify-center gap-3 bg-[#4A427B] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#5a52a0] transition-all duration-200 text-lg w-1/3">
//               <FaBook size={20} /> Recently Added
//             </button>

//             {/* Add Book */}
//             <button className="flex items-center justify-center gap-3 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-green-700 transition-all duration-200 text-lg w-1/3">
//               <FaPlusCircle size={22} /> Add Book
//             </button>
//           </div>

//           {/* You can place your book list or table here */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-[#1F2A4F]">
//               Books Section
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminBooks;

//-----------------------------------------------------------------------

// import React, { useState } from "react";
// import "./App.css";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import { FaBook, FaPlusCircle, FaClock } from "react-icons/fa";

// // Import components
// import RecentlyIssuedBooks from "./RecentlyIssuedBooks";
// import RecentlyAddedBooks from "./RecentlyAddedBooks";
// import AddBooks from "./AddBooks";
// import FooterAll from "./FooterAll";
// import BookList from "./BookList";

// function AdminBooks() {
//   const [activeSection, setActiveSection] = useState("issued");

//   const renderContent = () => {
//     switch (activeSection) {
//       case "issued":
//         return <RecentlyIssuedBooks />;
//       case "added":
//         return <RecentlyAddedBooks />;
//       case "add":
//         return <AddBooks />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 p-6">
//           {/* Buttons Row */}
//           <div className="flex justify-between items-center gap-6 mb-6">
//             <button
//               onClick={() => setActiveSection("issued")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "issued"
//                   ? "bg-[#1F2A4F] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaClock size={20} /> Recently Issued Books
//             </button>

//             <button
//               onClick={() => setActiveSection("added")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "added"
//                   ? "bg-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaBook size={20} /> Recently Added
//             </button>

//             <button
//               onClick={() => setActiveSection("add")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "add"
//                   ? "bg-green-600 text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaPlusCircle size={22} /> Add Book
//             </button>
//           </div>

//           {/* Render Section Below */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// }

// export default AdminBooks;

//-----------------------------------------------------------------------

// import React, { useState } from "react";
// import "../../../App.css";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import { FaBook, FaPlusCircle, FaClock, FaListAlt } from "react-icons/fa";

// // Import components
// import RecentlyIssuedBooks from "./RecentlyIssuedBooks";
// import RecentlyAddedBooks from "./RecentlyAddedBooks";
// import AddBooks from "./AddBooks";
// import FooterAll from "../../Footer/FooterAll";
// import BookList from "./BookList";

// function AdminBooks() {
//   // 🔹 Default active section changed to "all"
//   const [activeSection, setActiveSection] = useState("all");

//   const renderContent = () => {
//     switch (activeSection) {
//       case "all":
//         return <BookList />;
//       case "issued":
//         return <RecentlyIssuedBooks />;
//       case "added":
//         return <RecentlyAddedBooks />;
//       case "add":
//         return <AddBooks />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 p-6">
//           {/* Buttons Row */}
//           <div className="flex justify-between items-center gap-6 mb-6">
//             {/* 🔹 All Books Button (Default Active) */}
//             <button
//               onClick={() => setActiveSection("all")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "all"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaListAlt size={22} /> All Books
//             </button>

//             <button
//               onClick={() => setActiveSection("issued")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "issued"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaClock size={20} /> Recently Issued
//             </button>

//             <button
//               onClick={() => setActiveSection("added")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "added"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaBook size={20} /> Recently Added
//             </button>

//             <button
//               onClick={() => setActiveSection("add")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeSection === "add"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaPlusCircle size={22} /> Add Book
//             </button>
//           </div>

//           {/* Render Section Below */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// }

// export default AdminBooks;

//-----------------------------------------------------------------------

import React, { useState } from "react";
import "../../../App.css";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import {
  FaBook,
  FaPlusCircle,
  FaClock,
  FaListAlt,
  FaRegPaperPlane,
} from "react-icons/fa";

import RecentlyIssuedBooks from "./RecentlyIssuedBooks";
import RecentlyAddedBooks from "./RecentlyAddedBooks";
import AddBooks from "./AddBooks";
import FooterAll from "../../Footer/FooterAll";
import BookList from "./BookList";
import NewBookRequest from "./NewBookRequest";

function AdminBooks({ darkMode }) {
  const [activeSection, setActiveSection] = useState("all");

  const renderContent = () => {
    switch (activeSection) {
      case "all":
        return <BookList darkMode={darkMode} />;
      case "issued":
        return <RecentlyIssuedBooks darkMode={darkMode} />;
      case "added":
        return <RecentlyAddedBooks darkMode={darkMode} />;
      case "add":
        return <AddBooks darkMode={darkMode} />;
      case "requests":
        return <NewBookRequest darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AdminNavbar darkMode={darkMode} />
      <div className="flex">
        <AdminSidebar darkMode={darkMode} />
        <div className="flex-1 p-6">
          {/* Buttons Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {/* All Books */}
            <button
              onClick={() => setActiveSection("all")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 border transition-all duration-300 ${
                activeSection === "all"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-400 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              {/* Icon */}
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaListAlt size={24} className="text-black" />
              </span>

              {/* Text */}
              <span className="text-left">All Books</span>
            </button>

            {/* Recently Issued */}
            <button
              onClick={() => setActiveSection("issued")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 border transition-all duration-300 ${
                activeSection === "issued"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-400 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaClock size={24} className="text-black" />
              </span>
              <span className="text-left">Recently Issued</span>
            </button>

            {/* Recently Added */}
            <button
              onClick={() => setActiveSection("added")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 border transition-all duration-300 ${
                activeSection === "added"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-400 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center text-center justify-center rounded-md bg-white">
                <FaBook size={24} className="text-black" />
              </span>
              <span className="text-left">Recently Added</span>
            </button>

            {/* Book Requests */}
            <button
              onClick={() => setActiveSection("requests")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 border transition-all duration-300 ${
                activeSection === "requests"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-400 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaRegPaperPlane size={24} className="text-black" />
              </span>
              <span className="text-left">Book Requests</span>
            </button>

            {/* Add Book */}
            <button
              onClick={() => setActiveSection("add")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 border transition-all duration-300 ${
                activeSection === "add"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 border-gray-400 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaPlusCircle size={24} className="text-black" />
              </span>
              <span className="text-left">Add Book</span>
            </button>
          </div>

          {/* Render Section */}
          <div
            className={`shadow-lg rounded-xl p-6 transition-colors duration-300 border ${
              darkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-black border-gray-200"
            }`}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      <FooterAll darkMode={darkMode} />
    </div>
  );
}

export default AdminBooks;
