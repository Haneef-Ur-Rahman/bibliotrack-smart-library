// import React, { useState } from "react";
// // import AllStudents from "./AllStudents";
// import AllStudents from "./AllStudents";

// import RecentlyAddedStudents from "./RecentlyAddedStudents";
// import AddStudent from "./AddStudent";

// const StudentManagement = () => {
//   const [activeTab, setActiveTab] = useState("all");

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg min-h-screen">
//       <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700 underline decoration-4 decoration-indigo-700 underline-offset-4">
//         🎓 Student Management
//       </h2>

//       {/* Tab Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {[
//           { key: "all", label: "All Students" },
//           { key: "recent", label: "Recently Added" },
//           { key: "add", label: "Add Student" },
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-5 py-2 rounded-md font-semibold transition ${
//               activeTab === tab.key
//                 ? "bg-indigo-600 text-white shadow"
//                 : "bg-gray-100 text-gray-700 hover:bg-indigo-50"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Render Sections */}
//       <div>
//         {activeTab === "all" && <AllStudents />}
//         {activeTab === "recent" && <RecentlyAddedStudents />}
//         {activeTab === "add" && <AddStudent />}
//       </div>
//     </div>
//   );
// };

// export default StudentManagement;

//--------------------------------------------------------------

// import React, { useState } from "react";
// import AllStudents from "./AllStudents";
// import RecentlyAddedStudents from "./RecentlyAddedStudents";
// import AddStudent from "./AddStudent";
// import { FaUsers, FaUserPlus, FaClock } from "react-icons/fa";

// const StudentManagement = () => {
//   const [activeTab, setActiveTab] = useState("all");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "all":
//         return <AllStudents />;
//       case "recent":
//         return <RecentlyAddedStudents />;
//       case "add":
//         return <AddStudent />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-b from-[#28156F] to-[#d6d6f5]">
//       <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
//         <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700 underline decoration-4 decoration-indigo-700 underline-offset-4">
//           🎓 Student Management
//         </h2>

//         {/* Buttons Row - Same Style as AdminBooks */}
//         <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
//           {/* All Students Button */}
//           <button
//             onClick={() => setActiveTab("all")}
//             className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-full sm:w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//               activeTab === "all"
//                 ? "bg-blue-700 text-white animated-border"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             <FaUsers size={22} /> All Students
//           </button>

//           {/* Recently Added Button */}
//           <button
//             onClick={() => setActiveTab("recent")}
//             className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-full sm:w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//               activeTab === "recent"
//                 ? "bg-[#4A427B] text-white animated-border"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             <FaClock size={20} /> Recently Added
//           </button>

//           {/* Add Student Button */}
//           <button
//             onClick={() => setActiveTab("add")}
//             className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-full sm:w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//               activeTab === "add"
//                 ? "bg-green-600 text-white animated-border"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             <FaUserPlus size={22} /> Add Student
//           </button>
//         </div>

//         {/* Render Section Below */}
//         <div className="bg-white shadow-lg rounded-xl p-6">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentManagement;

//--------------------------------------------------------------

import React, { useState } from "react";
// import "./App.css";
// import "../../../App.css";
// import AdminNavbar from "./Components/Admin/Navbar/AdminNavbar";
// import AdminSidebar from "./Components/Admin/Sidebar/AdminSidebar";
// // import FooterAll from "./Components/Footer/FooterAll";
// import FooterAll from "../../Footer/FooterAll";
// import "../../../App.css";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import FooterAll from "../../Footer/FooterAll";

// Components
// import AllStudents from "./Components/Admin/Navbar/AllStudents";
// import AllStudents from "../Navbar/AllStudents";
// import RecentlyAddedStudents from "./Components/Admin/Students/RecentlyAddedStudents";
// import AddStudent from "./Components/Admin/Students/AddStudent";
// import { FaUserGraduate, FaClock, FaPlusCircle } from "react-icons/fa";
// import "../../../App.css";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import AllStudents from "../Students/AllStudents";
// import RecentlyAddedStudents from "./RecentlyAddedStudents";
// import StudentStatus from "./StudentStatus";
// import AddStudent from "../Students/AddStudent";

// function StudentManagement() {
//   const [activeTab, setActiveTab] = useState("all");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "all":
//         return <AllStudents />;
//       case "recent":
//         return <RecentlyAddedStudents />;
//       case "add":
//         return <AddStudent />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <AdminNavbar />

//       <div className="flex">
//         {/* Sidebar */}
//         <AdminSidebar />

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           {/* Page Title */}
//           {/* <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 underline decoration-4 decoration-indigo-700 underline-offset-4">
//             🎓 Student Management
//           </h2> */}

//           {/* Tabs (like book buttons) */}
//           <div className="flex justify-between items-center gap-6 mb-6">
//             {/* All Students */}
//             <button
//               onClick={() => setActiveTab("all")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "all"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaUserGraduate size={22} /> All Students
//             </button>

//             {/* Recently Added */}
//             <button
//               onClick={() => setActiveTab("recent")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "recent"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaClock size={20} /> Recently Added
//             </button>

//             {/* Add Student */}
//             <button
//               onClick={() => setActiveTab("add")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/3 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "add"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaPlusCircle size={22} /> Add Student
//             </button>
//           </div>

//           {/* Section Content */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             {renderContent()}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <FooterAll />
//     </div>
//   );
// }

// export default StudentManagement;

//--------------------------------------------------------------

// import {
//   FaUserGraduate,
//   FaClock,
//   FaPlusCircle,
//   FaChartBar,
// } from "react-icons/fa";
// import "../../../App.css";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import AllStudents from "../Students/AllStudents";
// import RecentlyAddedStudents from "./RecentlyAddedStudents";
// import StudentStatus from "./StudentStatus";
// import AddStudent from "../Students/AddStudent";

// function StudentManagement({ darkMode }) {
//   const [activeTab, setActiveTab] = useState("all");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "all":
//         return <AllStudents darkMode={darkMode} />;
//       case "status":
//         return <StudentStatus darkMode={darkMode} />;
//       case "recent":
//         return <RecentlyAddedStudents darkMode={darkMode} />;
//       case "add":
//         return <AddStudent darkMode={darkMode} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={
//         darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
//       }
//     >
//       {/* Navbar */}
//       <AdminNavbar darkMode={darkMode} />

//       <div className="flex">
//         {/* Sidebar */}
//         <AdminSidebar />

//         {/* Main Content */}
//         <div className="flex-1 p-6 ">
//           {/* Tabs */}
//           <div className="flex justify-between items-center gap-6 mb-6">
//             {/* All Students */}
//             <button
//               onClick={() => setActiveTab("all")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "all"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaUserGraduate size={22} /> All Students
//             </button>

//             {/* Student Status */}
//             <button
//               onClick={() => setActiveTab("status")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "status"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaChartBar size={22} /> Student Status
//             </button>

//             {/* Recently Added */}
//             <button
//               onClick={() => setActiveTab("recent")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "recent"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaClock size={20} /> Recently Added
//             </button>

//             {/* Add Student */}
//             <button
//               onClick={() => setActiveTab("add")}
//               className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-md text-base w-1/4 h-20 transition-all duration-200 overflow-hidden ${
//                 activeTab === "add"
//                   ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white animated-border"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               <FaPlusCircle size={22} /> Add Student
//             </button>
//           </div>

//           {/* Section Content */}
//           <div className="shadow-lg rounded-xl p-6">{renderContent()}</div>
//         </div>
//       </div>

//       {/* Footer */}
//       <FooterAll />
//     </div>
//   );
// }

// export default StudentManagement;

//--------------------------------------------------------------

import {
  FaUserGraduate,
  FaClock,
  FaPlusCircle,
  FaChartBar,
} from "react-icons/fa";
import "../../../App.css";
import AdminNavbar from "../Navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import FooterAll from "../../Footer/FooterAll";
import AllStudents from "../Students/AllStudents";
import RecentlyAddedStudents from "./RecentlyAddedStudents";
import StudentStatus from "./StudentStatus";
import AddStudent from "../Students/AddStudent";

function StudentManagement({ darkMode }) {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllStudents darkMode={darkMode} />;
      case "status":
        return <StudentStatus darkMode={darkMode} />;
      case "recent":
        return <RecentlyAddedStudents darkMode={darkMode} />;
      case "add":
        return <AddStudent darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }
    >
      {/* Navbar */}
      <AdminNavbar darkMode={darkMode} />

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar darkMode={darkMode} />

        {/* Main Content */}
        <div className="flex-1 p-6 ">
          {/* Tabs */}
          {/* <div className="flex justify-between items-center gap-6 mb-6"> */}
          {/* All Students */}
          {/* <button
              onClick={() => setActiveTab("all")}
              className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-lg text-base w-1/4 h-20 transition-all duration-300 overflow-hidden ${
                activeTab === "all"
                  ? "bg-blue-500 text-white shadow-blue-500/50 transform -translate-y-1"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-400 hover:shadow-xl hover:-translate-y-1"
                    : "bg-white text-gray-700 border border-gray-500 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <span
                className={`p-2 rounded-lg ${activeTab === "all" ? "bg-white/20" : darkMode ? "bg-gray-700" : "bg-blue-50 text-blue-600"}`}
              >
                <FaUserGraduate size={20} />
              </span>
              <span>All Students</span>
            </button> */}

          {/* Student Status */}
          {/* <button
              onClick={() => setActiveTab("status")}
              className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-lg text-base w-1/4 h-20 transition-all duration-300 overflow-hidden ${
                activeTab === "status"
                  ? "bg-blue-500 text-white shadow-purple-500/50 transform -translate-y-1"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-400 hover:shadow-xl hover:-translate-y-1"
                    : "bg-white text-gray-700 border border-gray-500 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <span
                className={`p-2 rounded-lg ${activeTab === "status" ? "bg-white/20" : darkMode ? "bg-gray-700" : "bg-purple-50 text-purple-600"}`}
              >
                <FaChartBar size={20} />
              </span>
              <span>Student Status</span>
            </button> */}

          {/* Recently Added */}
          {/* <button
              onClick={() => setActiveTab("recent")}
              className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-lg text-base w-1/4 h-20 transition-all duration-300 overflow-hidden ${
                activeTab === "recent"
                  ? "bg-blue-500 text-white shadow-amber-500/50 transform -translate-y-1"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-400 hover:shadow-xl hover:-translate-y-1"
                    : "bg-white text-gray-700 border border-gray-500 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <span
                className={`p-2 rounded-lg ${activeTab === "recent" ? "bg-white/20" : darkMode ? "bg-gray-700" : "bg-amber-50 text-amber-600"}`}
              >
                <FaClock size={20} />
              </span>
              <span>Recently Added</span>
            </button> */}

          {/* Add Student */}
          {/* <button
              onClick={() => setActiveTab("add")}
              className={`relative flex items-center justify-center gap-3 font-semibold rounded-xl shadow-lg text-base w-1/4 h-20 transition-all duration-300 overflow-hidden ${
                activeTab === "add"
                  ? "bg-blue-500 text-white shadow-emerald-500/50 transform -translate-y-1"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-400 hover:shadow-xl hover:-translate-y-1"
                    : "bg-white text-gray-700 border border-gray-500 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <span
                className={`p-2 rounded-lg ${activeTab === "add" ? "bg-white/20" : darkMode ? "bg-gray-700" : "bg-emerald-50 text-emerald-600"}`}
              >
                <FaPlusCircle size={20} />
              </span>
              <span>Add Student</span>
            </button> */}
          {/* </div> */}
          {/* Tabs */}
          <div className="flex justify-between items-center gap-4 mb-6">
            {/* All Students */}
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 w-1/4 border transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaUserGraduate size={24} className="text-black" />
              </span>
              <span className="text-left">All Students</span>
            </button>

            {/* Student Status */}
            <button
              onClick={() => setActiveTab("status")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 w-1/4 border transition-all duration-300 ${
                activeTab === "status"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaChartBar size={24} className="text-black" />
              </span>
              <span className="text-left">Student Status</span>
            </button>

            {/* Recently Added */}
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 w-1/4 border transition-all duration-300 ${
                activeTab === "recent"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaClock size={24} className="text-black" />
              </span>
              <span className="text-left">Recently Added</span>
            </button>

            {/* Add Student */}
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center gap-4 font-semibold rounded-xl text-base p-4 h-23 w-1/4 border transition-all duration-300 ${
                activeTab === "add"
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white transform scale-105"
                  : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:scale-105"
              }`}
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-md bg-white">
                <FaPlusCircle size={24} className="text-black" />
              </span>
              <span className="text-left">Add Student</span>
            </button>
          </div>

          {/* Section Content */}
          <div className="shadow-lg rounded-xl p-3">{renderContent()}</div>
        </div>
      </div>

      {/* Footer */}
      <FooterAll darkMode={darkMode} />
    </div>
  );
}

export default StudentManagement;
