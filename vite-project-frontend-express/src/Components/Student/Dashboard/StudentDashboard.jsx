// import React, { useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";

// import {
//   FaListAlt,
//   FaBookReader,
//   FaUndoAlt,
//   FaRegPaperPlane,
// } from "react-icons/fa";

// // Dummy Components (replace later with real components)
// const AllBooks = () => <h2 className="text-xl font-semibold">All Books</h2>;
// const IssuedBooks = () => (
//   <h2 className="text-xl font-semibold">Books Issued</h2>
// );
// const ReturnedBooks = () => (
//   <h2 className="text-xl font-semibold">Books Returned</h2>
// );
// const RequestNewBook = () => (
//   <h2 className="text-xl font-semibold">Request New Book</h2>
// );

// const StudentDashboard = () => {
//   const [activeSection, setActiveSection] = useState("all"); // Default = All Books

//   const renderContent = () => {
//     switch (activeSection) {
//       case "all":
//         return <AllBooks />;
//       case "issued":
//         return <IssuedBooks />;
//       case "returned":
//         return <ReturnedBooks />;
//       case "request":
//         return <RequestNewBook />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Layout */}
//       <div className="flex min-h-screen">
//         {/* Left Sidebar */}
//         <LeftSidebar
//           setActiveSection={setActiveSection}
//           activeSection={activeSection}
//         />

//         {/* Dashboard Content */}
//         <div className="flex-1 p-6 bg-gray-50">
//           {/* Top Buttons Row */}
//           <div className="flex flex-wrap justify-between gap-4 mb-6">
//             <button
//               onClick={() => setActiveSection("all")}
//               className={`flex items-center gap-2 font-semibold rounded-xl shadow-md p-3 transition-all duration-200 ${
//                 activeSection === "all"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaListAlt /> All Books
//             </button>
//             <button
//               onClick={() => setActiveSection("issued")}
//               className={`flex items-center gap-2 font-semibold rounded-xl shadow-md p-3 transition-all duration-200 ${
//                 activeSection === "issued"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaBookReader /> Books Issued
//             </button>
//             <button
//               onClick={() => setActiveSection("returned")}
//               className={`flex items-center gap-2 font-semibold rounded-xl shadow-md p-3 transition-all duration-200 ${
//                 activeSection === "returned"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaUndoAlt /> Books Returned
//             </button>
//             <button
//               onClick={() => setActiveSection("request")}
//               className={`flex items-center gap-2 font-semibold rounded-xl shadow-md p-3 transition-all duration-200 ${
//                 activeSection === "request"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaRegPaperPlane /> Request New Book
//             </button>
//           </div>

//           {/* Content Area */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//       {/* Footer */}

//       <FooterAll />
//     </>
//   );
// };

// export default StudentDashboard;

//----------------------------------------------------------------------------------------------

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FooterAll from "../../Footer/FooterAll";
import StudentAllBooks from "./StudentAllBooks";
import StudentIssuedBooks from "./StudentIssuedBooks";
import StudentBooksToReturn from "./StudentBooksToReturn";
import StudentRequestNexBooks from "./StudentRequestNexBooks";
import {
  FaListAlt,
  FaBookReader,
  FaUndoAlt,
  FaRegPaperPlane,
} from "react-icons/fa";

const StudentDashboard = ({ darkMode }) => {
  const [activeSection, setActiveSection] = useState("all"); // Default = All Books

  const renderContent = () => {
    switch (activeSection) {
      case "all":
        return <StudentAllBooks darkMode={darkMode} />;
      case "issued":
        return <StudentIssuedBooks darkMode={darkMode} />;
      case "returned":
        return <StudentBooksToReturn darkMode={darkMode} />;
      case "request":
        return <StudentRequestNexBooks darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} />

      <div className="flex min-h-screen">
        <LeftSidebar darkMode={darkMode} />

        {/* Dashboard Content */}
        <div
          className={`flex-1 transition-colors mt-3 duration-300 ${darkMode ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 via-white to-indigo-50"}`}
        >
          {/* Navigation Tabs */}
          <div className="px-4 py-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
              {/* All Books */}
              <button
                onClick={() => setActiveSection("all")}
                className={`group relative flex flex-row items-center justify-center gap-3  px-2 py-8 rounded-2xl transition-all duration-300 overflow-hidden ${
                  activeSection === "all"
                    ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white shadow-2xl transform"
                    : darkMode
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-700 hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${
                    activeSection === "all"
                      ? "bg-white shadow-lg"
                      : darkMode
                        ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                        : "bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      activeSection === "all"
                        ? "text-blue-500 scale-110"
                        : darkMode
                          ? "text-indigo-400 group-hover:text-indigo-300"
                          : "text-indigo-600 group-hover:text-indigo-700"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-base whitespace-nowrap">
                  All Books
                </span>
                {activeSection === "all" && (
                  <div className="absolute -bottom-1 left-1/2 transform w-10 h-1 bg-white rounded-full shadow-lg"></div>
                )}
              </button>

              {/* Books Issued */}
              <button
                onClick={() => setActiveSection("issued")}
                className={`group relative flex flex-row items-center justify-center gap-3  px-2 py-8 rounded-2xl transition-all duration-300 overflow-hidden ${
                  activeSection === "issued"
                    ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white shadow-2xl transform"
                    : darkMode
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-700 hover:from-emerald-50 hover:to-teal-50 border border-gray-200 hover:border-emerald-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${
                    activeSection === "issued"
                      ? "bg-white/20 shadow-lg"
                      : darkMode
                        ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                        : "bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200"
                  }`}
                >
                  <FaBookReader className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base whitespace-nowrap">
                  Books Issued
                </span>
                {activeSection === "issued" && (
                  <div className="absolute -bottom-1 left-1/2 transform w-10 h-1 bg-white rounded-full shadow-lg"></div>
                )}
              </button>

              {/* Books to Return */}
              <button
                onClick={() => setActiveSection("returned")}
                className={`group relative flex flex-row items-center justify-center gap-3  px-2 py-8 rounded-2xl transition-all duration-300 overflow-hidden ${
                  activeSection === "returned"
                    ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white shadow-2xl transform"
                    : darkMode
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-700 hover:from-orange-50 hover:to-amber-50 border border-gray-200 hover:border-orange-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${
                    activeSection === "returned"
                      ? "bg-white/20 shadow-lg"
                      : darkMode
                        ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                        : "bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200"
                  }`}
                >
                  <FaUndoAlt className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base whitespace-nowrap">
                  Books to Return
                </span>
                {activeSection === "returned" && (
                  <div className="absolute -bottom-1 left-1/2 transform  w-10 h-1 bg-white rounded-full shadow-lg"></div>
                )}
              </button>

              {/* Request New Book */}
              <button
                onClick={() => setActiveSection("request")}
                className={`group relative flex flex-row items-center justify-center gap-3 px-2 py-8 rounded-2xl transition-all duration-300 overflow-hidden ${
                  activeSection === "request"
                    ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white shadow-2xl transform"
                    : darkMode
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-700 hover:from-purple-50 hover:to-pink-50 border border-gray-200 hover:border-purple-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 ${
                    activeSection === "request"
                      ? "bg-white/20 shadow-lg"
                      : darkMode
                        ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                        : "bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200"
                  }`}
                >
                  <FaRegPaperPlane className="w-4 h-4" />
                </div>
                <span className="font-semibold text-base whitespace-nowrap">
                  Request New Book
                </span>
                {activeSection === "request" && (
                  <div className="absolute -bottom-1 left-1/2 transform  w-10 h-1 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="px-8 pb-8 mt-3">
            <div
              className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      <FooterAll />
    </>
  );
};

export default StudentDashboard;
