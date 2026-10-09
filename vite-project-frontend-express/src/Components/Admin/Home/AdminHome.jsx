// import React, { useEffect, useState } from "react";
// import "../../../App.css";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import { FaBook, FaClock, FaUsers } from "react-icons/fa";
// import HomeAllBooks from "../Books/HomeAllBooks";
// import axios from "axios";

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalBooks: 0,
//     issuedBooks: 0,
//   });

//   const [bookFilter, setBookFilter] = useState("all"); // all / issued / available

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // Total Students
//       const { data: studentsData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Total Books
//       const { data: booksData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Issued Books
//       const { data: issuedData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books/admin/issued-books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setStats({
//         totalStudents: studentsData.users?.length || 0,
//         totalBooks: booksData.books?.length || 0,
//         issuedBooks: issuedData.issuedBooks?.length || 0,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Handler for clicking top boxes
//   const handleBoxClick = (type) => {
//     if (type === "students") {
//       setBookFilter("all"); // Students box doesn't filter books
//     } else if (type === "books") {
//       setBookFilter("all");
//     } else if (type === "issued") {
//       setBookFilter("issued");
//     }
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 p-6">
//           <h1 className="text-3xl font-bold mb-4 text-indigo-700">
//             Welcome to Admin Home
//           </h1>

//           {/* Top Stats Boxes */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Total Students */}
//             <div
//               onClick={() => handleBoxClick("students")}
//               className="cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-4 rounded-xl flex flex-col items-center justify-center shadow-lg text-center"
//             >
//               <FaUsers size={28} className="mb-2" />
//               <h2 className="text-xl font-bold">{stats.totalStudents}</h2>
//               <p className="text-sm">Total Students</p>
//             </div>

//             {/* Total Books */}
//             <div
//               onClick={() => handleBoxClick("books")}
//               className="cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-4 rounded-xl flex flex-col items-center justify-center shadow-lg text-center"
//             >
//               <FaBook size={28} className="mb-2" />
//               <h2 className="text-xl font-bold">{stats.totalBooks}</h2>
//               <p className="text-sm">Total Books</p>
//             </div>

//             {/* Issued Books */}
//             <div
//               onClick={() => handleBoxClick("issued")}
//               className="cursor-pointer transform hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-4 rounded-xl flex flex-col items-center justify-center shadow-lg text-center"
//             >
//               <FaClock size={28} className="mb-2" />
//               <h2 className="text-xl font-bold">{stats.issuedBooks}</h2>
//               <p className="text-sm">Issued Books</p>
//             </div>
//           </div>

//           {/* All Books Table / Filtered */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <HomeAllBooks filter={bookFilter} />
//           </div>
//         </div>
//       </div>

//       <FooterAll />
//     </div>
//   );
// };

// export default AdminHome;

//------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import "../../../App.css";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import { FaBook, FaClock, FaUsers } from "react-icons/fa";
// import axios from "axios";

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalBooks: 0,
//     issuedBooks: 0,
//   });
//   const [recentIssued, setRecentIssued] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   // ...
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // Total Students
//       const { data: studentsData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Total Books
//       const { data: booksData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Issued Books
//       const { data: issuedData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books/admin/issued-books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setStats({
//         totalStudents: studentsData.users?.length || 0,
//         totalBooks: booksData.books?.length || 0,
//         issuedBooks:
//           issuedData.issuedBooks?.filter((b) => !b.returnDate).length || 0,
//       });

//       // Recent 5 NOT returned books
//       const recent5 = (issuedData.issuedBooks || [])
//         .filter((b) => !b.returnDate) // ✅ only not returned
//         .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
//         .slice(0, 5);

//       setRecentIssued(recent5);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 p-6">
//           {/* <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//             Admin Dashboard
//           </h1> */}

//           {/* Top Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center justify-center shadow-lg text-center hover:scale-105 transition-transform">
//               <FaUsers size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.totalStudents}</h2>
//               <p className="text-sm mt-1">Total Students</p>
//             </div>

//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center justify-center shadow-lg text-center hover:scale-105 transition-transform">
//               <FaBook size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.totalBooks}</h2>
//               <p className="text-sm mt-1">Total Books</p>
//             </div>

//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center justify-center shadow-lg text-center hover:scale-105 transition-transform">
//               <FaClock size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.issuedBooks}</h2>
//               <p className="text-sm mt-1">Issued Books</p>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 text-blue-800">
//               Recently Issued Books
//             </h2>
//             {recentIssued.length === 0 ? (
//               <p className="text-gray-500">No recent activity found.</p>
//             ) : (
//               <ul className="divide-y divide-gray-200">
//                 {recentIssued.map((item) => (
//                   <li
//                     key={item._id}
//                     className="py-3 flex justify-between items-center"
//                   >
//                     <div>
//                       <p className="font-medium">
//                         {item.studentId?.firstName} {item.studentId?.lastName}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         {item.bookId?.title} | Issued:{" "}
//                         {formatDate(item.issueDate)}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded text-md font-semibold ${
//                         item.returnDate
//                           ? "bg-green-200 text-green-700"
//                           : "bg-yellow-200 text-yellow-600"
//                       }`}
//                     >
//                       {item.returnDate ? "Returned" : "Issued"}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default AdminHome;

//------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import "../../../App.css";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import { FaBook, FaClock, FaUsers } from "react-icons/fa";
// import axios from "axios";

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalBooks: 0,
//     issuedBooks: 0,
//   });

//   const [recentIssued, setRecentIssued] = useState([]);

//   // ✅ Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // Total Students
//       const { data: studentsData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Total Books
//       const { data: booksData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Issued Books
//       const { data: issuedData } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/books/admin/issued-books",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setStats({
//         totalStudents: studentsData.users?.length || 0,
//         totalBooks: booksData.books?.length || 0,
//         issuedBooks:
//           issuedData.issuedBooks?.filter((b) => !b.returnDate).length || 0,
//       });

//       // ✅ All NOT returned books (sorted latest first)
//       const notReturned = (issuedData.issuedBooks || [])
//         .filter((b) => !b.returnDate)
//         .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

//       setRecentIssued(notReturned);
//       setCurrentPage(1); // reset page
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // ✅ Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentIssued = recentIssued.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(recentIssued.length / itemsPerPage);

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />

//         <div className="flex-1 p-6">
//           {/* Top Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition">
//               <FaUsers size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.totalStudents}</h2>
//               <p className="text-sm">Total Students</p>
//             </div>

//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition">
//               <FaBook size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.totalBooks}</h2>
//               <p className="text-sm">Total Books</p>
//             </div>

//             <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-5 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition">
//               <FaClock size={28} className="mb-2" />
//               <h2 className="text-2xl font-bold">{stats.issuedBooks}</h2>
//               <p className="text-sm">Issued Books</p>
//             </div>
//           </div>

//           {/* Recent Issued Books */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 text-blue-800">
//               Recently Issued Books
//             </h2>

//             {recentIssued.length === 0 ? (
//               <p className="text-gray-500">No recent activity found.</p>
//             ) : (
//               <>
//                 <ul className="divide-y divide-gray-200">
//                   {currentIssued.map((item) => (
//                     <li
//                       key={item._id}
//                       className="py-3 flex justify-between items-center"
//                     >
//                       <div>
//                         <p className="font-medium">
//                           {item.studentId?.firstName} {item.studentId?.lastName}
//                         </p>
//                         <p className="text-gray-500 text-sm">
//                           {item.bookId?.title} | Issued:{" "}
//                           {formatDate(item.issueDate)}
//                         </p>
//                       </div>

//                       <span className="px-3 py-1 rounded text-sm font-semibold bg-yellow-200 text-yellow-700">
//                         Issued
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* ✅ Pagination */}
//                 {totalPages >= 1 && (
//                   <div className="flex justify-center mt-10 gap-2">
//                     <button
//                       disabled={currentPage === 1}
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//                     >
//                       &lt;
//                     </button>

//                     {Array.from({ length: totalPages }, (_, i) => (
//                       <button
//                         key={i + 1}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-3 py-1 rounded ${
//                           currentPage === i + 1
//                             ? "bg-indigo-600 text-white"
//                             : "bg-gray-300 hover:bg-gray-400"
//                         }`}
//                       >
//                         {i + 1}
//                       </button>
//                     ))}

//                     <button
//                       disabled={currentPage === totalPages}
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//                     >
//                       &gt;
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <FooterAll />
//     </div>
//   );
// };

// export default AdminHome;

//------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import "../../../App.css";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import FooterAll from "../../Footer/FooterAll";
import {
  FaBook,
  FaClock,
  FaUsers,
  FaUserCheck,
  FaArchive,
  FaTags,
  FaHandHoldingHeart,
} from "react-icons/fa";
import axios from "axios";

const AdminHome = ({ darkMode }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeUsers: 0,
    totalBooks: 0,
    totalBookCopies: 0, // New state for total copies
    totalCategories: 0, // New state for total categories
    issuedBooks: 0,
    bookRequests: 0,
  });

  const [recentIssued, setRecentIssued] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Fetch all students
      const { data: studentsData } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ Active users (assuming isOnline flag)
      const activeCount =
        studentsData.users?.filter((user) => user.isOnline).length || 0;

      // ✅ Total Books
      const { data: booksData } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/books",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ Calculate total physical copies
      const totalCopies = booksData.books?.reduce(
        (sum, book) => sum + (book.totalCopies || 0),
        0,
      );

      // ✅ Calculate total unique categories
      const categoriesSet = new Set();
      booksData.books?.forEach((book) => {
        if (book.category) {
          categoriesSet.add(book.category);
        }
      });
      const totalCategories = categoriesSet.size;

      // ✅ Issued Books
      const { data: issuedData } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/books/admin/issued-books",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ Book Requests
      const { data: requestsData } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/books/admin/requests",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const pendingRequests = (requestsData.requests || []).filter(
        (request) => request.status === "Pending",
      ).length;

      const notReturned = (issuedData.issuedBooks || [])
        .filter((b) => !b.returnDate)
        .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

      setStats({
        totalStudents: studentsData.users?.length || 0,
        activeUsers: activeCount,
        totalBooks: booksData.books?.length || 0,
        totalBookCopies: totalCopies,
        totalCategories: totalCategories, // Set the new state
        issuedBooks: notReturned.length,
        bookRequests: pendingRequests,
      });

      setRecentIssued(notReturned);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ✅ Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssued = recentIssued.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recentIssued.length / itemsPerPage);

  return (
    <div>
      <AdminNavbar darkMode={darkMode} />
      <div className="flex">
        <AdminSidebar darkMode={darkMode} />

        <div className="flex-1 p-6 justify-center items-center">
          {/* Top Stats Cards */}
          <div className="flex justify-center gap-6 mb-8 px-6">
            {/* Total Students Card */}
            <div className="w-56 h-30 bg-[#EFF6FF] border border-[#3B82F6] rounded-2xl flex items-center px-6 shadow-md">
              <div className="flex flex-col items-center justify-center mr-4">
                <p className="text-sm font-sans text-center text-gray-600 mb-1 font-bold">
                  Total Students
                </p>
                <h2 className="text-4xl font-sans text-blue-500">
                  {stats.totalStudents}
                </h2>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                <FaUsers size={30} className="text-blue-500" />
              </div>
            </div>

            {/* Active Loans Card */}
            <div className="w-56 h-30 bg-[#F0FDF4] border border-[#6BD569] rounded-2xl flex items-center px-6 hover:shadow-md">
              <div className="flex flex-col items-center justify-center mr-6">
                <p className="text-sm font-bold font-sans text-gray-600 mb-1">
                  Active Loans
                </p>
                <h2 className="text-4xl font-sans text-[#6BD569]">
                  {stats.issuedBooks}
                </h2>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                <FaClock size={30} className="text-[#6BD569]" />
              </div>
            </div>

            {/* Categories Card */}
            <div className="w-56 h-30 bg-[#FEF2F2] border border-[#BC2E2E] rounded-2xl flex items-center px-6 hover:shadow-md">
              <div className="flex flex-col items-center justify-center mr-6">
                <p className="text-sm  font-bold font-sans text-gray-600 mb-1">
                  Categories
                </p>
                <h2 className="text-4xl font-sans text-orange-800">
                  {stats.totalCategories}
                </h2>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                <FaTags size={30} className="text-orange-700" />
              </div>
            </div>

            {/* Book Requests Card */}
            <div className="w-58 h-30 bg-[#FEFCE8] border border-[#BC832E] rounded-2xl flex items-center px-6 hover:shadow-md">
              <div className="flex flex-col items-center justify-center mr-2">
                <p className="text-sm font-bold text-center font-sans text-gray-600 mb-1">
                  New Book Requests
                </p>
                <h2 className="text-4xl font-sans text-[#BC832E]">
                  {stats.bookRequests}
                </h2>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                <FaHandHoldingHeart size={30} className="text-[#BC832E]" />
              </div>
            </div>
          </div>

          {/* Recent Issued Books */}
          <div className="shadow-lg rounded-xl p-6 border border-gray-200">
            <header className="mb-6">
              <div className="max-w-7xl mx-auto">
                {/* Label */}
                {/* <div className="flex items-center mb-2">
                  <div className="h-1 w-8 rounded-full bg-black mr-3"></div>
                </div> */}

                {/* Title Row */}
                <div className="flex items-center gap-3">
                  {/* Title */}
                  <h2
                    className={`text-2xl font-bold leading-tight ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Recently Issued Books
                  </h2>
                </div>
              </div>
            </header>

            {recentIssued.length === 0 ? (
              <p className="text-gray-500">No recent activity found.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {currentIssued.map((item) => (
                    <li
                      key={item._id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {item.studentId?.firstName} {item.studentId?.lastName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {item.bookId?.title} | Issued:{" "}
                          {formatDate(item.issueDate)}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded text-sm font-semibold bg-green-100 opacity-90 text-green-700 inline-flex items-center">
                        <span className="w-2 h-2 bg-green-700 rounded-full mr-2"></span>
                        Issued
                      </span>
                    </li>
                  ))}
                </ul>

                {/* ✅ Pagination */}
                {totalPages >= 1 && (
                  <div className="flex justify-center mt-10 gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className={`px-3 py-1 rounded border border-black font-bold ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
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

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
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
              </>
            )}
          </div>
        </div>
      </div>

      <FooterAll darkMode={darkMode} />
    </div>
  );
};

export default AdminHome;
