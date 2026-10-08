// // src/Components/Admin/Fine/Fine.jsx

// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchFines = async () => {
//       try {
//         const response = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFines(response.data);
//       } catch (err) {
//         setError("Failed to fetch fines.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFines();
//   }, [token]);

//   const getStatusBadge = (status) => {
//     const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";
//     switch (status) {
//       case "pending":
//         return `${baseClasses} bg-yellow-200 text-yellow-800`;
//       case "overdue":
//         return `${baseClasses} bg-red-200 text-red-800`;
//       default:
//         return `${baseClasses} bg-gray-200 text-gray-800`;
//     }
//   };

//   const mainStyles = `flex-1 p-6 min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`;
//   const tableStyles = `w-full text-left ${darkMode ? "text-gray-300" : "text-gray-700"}`;

//   return (
//     <div>
//       <AdminNavbar darkMode={darkMode} />
//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />
//         <main className={mainStyles}>
//           <div className="max-w-6xl mx-auto">
//             <h1
//               className={`text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
//             >
//               Fines Overview
//             </h1>

//             {loading && (
//               <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
//                 Loading fines...
//               </p>
//             )}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && !error && (
//               <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
//                 <table className={tableStyles}>
//                   <thead className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
//                     <tr>
//                       <th className="px-6 py-4">Student Name</th>
//                       <th className="px-6 py-4">Email</th>
//                       <th className="px-6 py-4">Total Fine (Rs.)</th>
//                       <th className="px-6 py-4">Due Date</th>
//                       <th className="px-6 py-4">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {fines.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className={`text-center py-8 ${darkMode ? "text-gray-500" : "text-gray-500"}`}
//                         >
//                           No outstanding fines found.
//                         </td>
//                       </tr>
//                     ) : (
//                       fines.map((payment) => (
//                         <tr
//                           key={payment._id}
//                           className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
//                         >
//                           <td className="px-6 py-4">
//                             {payment.studentId?.firstName}{" "}
//                             {payment.studentId?.lastName}
//                           </td>
//                           <td className="px-6 py-4">
//                             {payment.studentId?.email}
//                           </td>
//                           <td className="px-6 py-4 font-semibold">
//                             {payment.totalAmount + payment.currentLateFee}
//                           </td>
//                           <td className="px-6 py-4">
//                             {payment.dueDate
//                               ? new Date(payment.dueDate).toLocaleDateString()
//                               : "N/A"}
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className={getStatusBadge(payment.status)}>
//                               {payment.status.toUpperCase()}
//                             </span>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default Fine;

// ----------------------------------------------
// src / Components / Admin / Fine / Fine.jsx;

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   FaSearch,
//   FaUser,
//   FaExclamationTriangle,
//   FaClock,
//   FaDollarSign,
// } from "react-icons/fa";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchFines = async () => {
//       try {
//         const response = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFines(response.data);
//       } catch (err) {
//         setError("Failed to fetch fines.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFines();
//   }, [token]);

//   // --- Memoized Calculations for Summary Cards ---
//   const summaryData = useMemo(() => {
//     const totalFines = fines.length;
//     const totalAmount = fines.reduce(
//       (sum, p) => sum + p.totalAmount + p.currentLateFee,
//       0,
//     );
//     const overdueFines = fines.filter((p) => p.status === "overdue").length;
//     return { totalFines, totalAmount, overdueFines };
//   }, [fines]);

//   // --- Search Logic ---
//   const filteredFines = useMemo(() => {
//     if (!searchTerm) return fines;
//     const lowerCaseTerm = searchTerm.toLowerCase();
//     return fines.filter(
//       (payment) =>
//         payment.studentId?.firstName?.toLowerCase().includes(lowerCaseTerm) ||
//         payment.studentId?.lastName?.toLowerCase().includes(lowerCaseTerm) ||
//         payment.studentId?.email?.toLowerCase().includes(lowerCaseTerm),
//     );
//   }, [fines, searchTerm]);

//   // --- Status Badge Component ---
//   const StatusBadge = ({ status }) => {
//     const styles = {
//       pending:
//         "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-700",
//       overdue:
//         "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-700",
//     };
//     const icons = {
//       pending: <FaClock className="mr-1" />,
//       overdue: <FaExclamationTriangle className="mr-1" />,
//     };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}
//       >
//         {icons[status]}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   // --- Styling Variables for Consistency ---
//   const mainBg = "bg-gray-50 dark:bg-slate-900";
//   const cardBg = "bg-white dark:bg-slate-800";
//   const textColor = "text-slate-900 dark:text-slate-100";
//   const subTextColor = "text-slate-600 dark:text-slate-400";
//   const borderColor = "border-slate-200 dark:border-slate-700";

//   return (
//     <div className="min-h-screen">
//       <AdminNavbar darkMode={darkMode} />
//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />
//         <main className={`flex-1 p-6 md:p-8 ${mainBg}`}>
//           <div className="max-w-7xl mx-auto">
//             {/* --- Header Section --- */}
//             <div className="mb-8">
//               <h1 className={`text-4xl font-bold mb-2 ${textColor}`}>
//                 Fines Management
//               </h1>
//               <p className={`text-lg ${subTextColor}`}>
//                 Monitor and manage all outstanding library fines.
//               </p>
//             </div>

//             {/* --- Summary Cards --- */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div
//                 className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${subTextColor}`}>
//                       Total Outstanding Fines
//                     </p>
//                     <p className={`text-3xl font-bold mt-1 ${textColor}`}>
//                       {summaryData.totalFines}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-4 rounded-full bg-blue-100 dark:bg-blue-900/30`}
//                   >
//                     <FaUser className="text-2xl text-blue-600 dark:text-blue-400" />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${subTextColor}`}>
//                       Total Amount
//                     </p>
//                     <p className={`text-3xl font-bold mt-1 ${textColor}`}>
//                       Rs. {summaryData.totalAmount}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-4 rounded-full bg-green-100 dark:bg-green-900/30`}
//                   >
//                     <FaDollarSign className="text-2xl text-green-600 dark:text-green-400" />
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${subTextColor}`}>
//                       Overdue Payments
//                     </p>
//                     <p className={`text-3xl font-bold mt-1 ${textColor}`}>
//                       {summaryData.overdueFines}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-4 rounded-full bg-red-100 dark:bg-red-900/30`}
//                   >
//                     <FaExclamationTriangle className="text-2xl text-red-600 dark:text-red-400" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* --- Search Bar --- */}
//             <div className={`mb-6 relative`}>
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className={`h-5 w-5 ${subTextColor}`} />
//               </div>
//               <input
//                 type="text"
//                 className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 ${cardBg} ${borderColor} placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textColor}`}
//                 placeholder="Search by student name or email..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* --- Content Area --- */}
//             <div
//               className={`${cardBg} rounded-xl shadow-lg overflow-hidden border ${borderColor}`}
//             >
//               {loading && (
//                 <div className="p-8 text-center">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   <p className={`mt-4 ${subTextColor}`}>
//                     Loading fines data...
//                   </p>
//                 </div>
//               )}
//               {error && (
//                 <div className="p-8 text-center">
//                   <p className="text-red-500">{error}</p>
//                 </div>
//               )}

//               {!loading && !error && (
//                 <>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead className={`${cardBg} border-b ${borderColor}`}>
//                         <tr>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Student
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Total Amount
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Due Date
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Status
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
//                         {filteredFines.length === 0 ? (
//                           <tr>
//                             <td colSpan="4" className="p-8 text-center">
//                               <FaUser
//                                 className={`mx-auto h-12 w-12 ${subTextColor} mb-4`}
//                               />
//                               <p className={`text-lg font-medium ${textColor}`}>
//                                 No fines found
//                               </p>
//                               <p className={`mt-1 ${subTextColor}`}>
//                                 {searchTerm
//                                   ? "Try adjusting your search."
//                                   : "There are no outstanding fines at the moment."}
//                               </p>
//                             </td>
//                           </tr>
//                         ) : (
//                           filteredFines.map((payment) => (
//                             <tr
//                               key={payment._id}
//                               className={`transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50`}
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-10 w-10">
//                                     <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center">
//                                       <FaUser className="h-5 w-5 text-gray-500 dark:text-slate-300" />
//                                     </div>
//                                   </div>
//                                   <div className="ml-4">
//                                     <div
//                                       className={`text-sm font-medium ${textColor}`}
//                                     >
//                                       {payment.studentId?.firstName}{" "}
//                                       {payment.studentId?.lastName}
//                                     </div>
//                                     <div className={`text-sm ${subTextColor}`}>
//                                       {payment.studentId?.email}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div
//                                   className={`text-sm font-semibold ${textColor}`}
//                                 >
//                                   Rs.{" "}
//                                   {payment.totalAmount + payment.currentLateFee}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className={`text-sm ${subTextColor}`}>
//                                   {payment.dueDate
//                                     ? new Date(
//                                         payment.dueDate,
//                                       ).toLocaleDateString()
//                                     : "N/A"}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <StatusBadge status={payment.status} />
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default Fine;

// -------------------------------------------

// src/Components/Admin/Fine/Fine.jsx

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   FaSearch,
//   FaUser,
//   FaExclamationTriangle,
//   FaClock,
//   FaDollarSign,
// } from "react-icons/fa";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchFines = async () => {
//       try {
//         const res = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFines(res.data);
//       } catch (err) {
//         setError("Failed to fetch fines.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFines();
//   }, [token]);

//   // ===== SUMMARY =====
//   const summaryData = useMemo(() => {
//     const totalFines = fines.length;
//     const totalAmount = fines.reduce(
//       (sum, f) => sum + f.totalAmount + f.currentLateFee,
//       0,
//     );
//     const overdueFines = fines.filter((f) => f.status === "overdue").length;
//     return { totalFines, totalAmount, overdueFines };
//   }, [fines]);

//   // ===== SEARCH =====
//   const filteredFines = useMemo(() => {
//     if (!searchTerm) return fines;
//     const term = searchTerm.toLowerCase();
//     return fines.filter(
//       (p) =>
//         p.studentId?.firstName?.toLowerCase().includes(term) ||
//         p.studentId?.lastName?.toLowerCase().includes(term) ||
//         p.studentId?.email?.toLowerCase().includes(term),
//     );
//   }, [fines, searchTerm]);

//   // ===== STATUS BADGE =====
//   const StatusBadge = ({ status }) => {
//     const styles = {
//       pending:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
//       overdue: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
//     };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
//           styles[status]
//         }`}
//       >
//         {status === "overdue" ? (
//           <FaExclamationTriangle className="mr-1" />
//         ) : (
//           <FaClock className="mr-1" />
//         )}
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen dark:bg-slate-900 transition-colors">
//       <AdminNavbar darkMode={darkMode} />

//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />

//         <main className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-slate-900">
//           <div className="max-w-7xl mx-auto">
//             {/* HEADER */}
//             <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
//               Fines Management
//             </h1>
//             <p className="text-slate-600 dark:text-slate-400 mb-8">
//               Monitor and manage all library fines
//             </p>

//             {/* SUMMARY CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               {[
//                 {
//                   label: "Total Fines",
//                   value: summaryData.totalFines,
//                   icon: <FaUser />,
//                 },
//                 {
//                   label: "Total Amount",
//                   value: `Rs. ${summaryData.totalAmount}`,
//                   icon: <FaDollarSign />,
//                 },
//                 {
//                   label: "Overdue",
//                   value: summaryData.overdueFines,
//                   icon: <FaExclamationTriangle />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-slate-500 dark:text-slate-400 text-sm">
//                         {item.label}
//                       </p>
//                       <p className="text-3xl font-bold text-slate-900 dark:text-white">
//                         {item.value}
//                       </p>
//                     </div>
//                     <div className="text-2xl text-blue-600 dark:text-blue-400">
//                       {item.icon}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SEARCH */}
//             <div className="relative mb-6">
//               <FaSearch className="absolute left-3 top-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:outline-none"
//               />
//             </div>

//             {/* TABLE */}
//             <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow overflow-hidden">
//               {loading ? (
//                 <p className="p-8 text-center text-slate-500">Loading...</p>
//               ) : error ? (
//                 <p className="p-8 text-center text-red-500">{error}</p>
//               ) : (
//                 <table className="w-full">
//                   <thead className="bg-gray-100 dark:bg-slate-700">
//                     <tr>
//                       {["Student", "Amount", "Due Date", "Status"].map((h) => (
//                         <th
//                           key={h}
//                           className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300"
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y dark:divide-slate-700">
//                     {filteredFines.length === 0 ? (
//                       <tr>
//                         <td colSpan="4" className="p-8 text-center">
//                           <p className="text-slate-500">No fines found</p>
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredFines.map((p) => (
//                         <tr
//                           key={p._id}
//                           className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
//                         >
//                           <td className="px-6 py-4 text-slate-900 dark:text-white">
//                             {p.studentId?.firstName} {p.studentId?.lastName}
//                             <div className="text-sm text-slate-500">
//                               {p.studentId?.email}
//                             </div>
//                           </td>

//                           <td className="px-6 py-4 text-slate-900 dark:text-white font-semibold">
//                             Rs. {p.totalAmount + p.currentLateFee}
//                           </td>

//                           <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
//                             {p.dueDate
//                               ? new Date(p.dueDate).toLocaleDateString()
//                               : "N/A"}
//                           </td>

//                           <td className="px-6 py-4">
//                             <StatusBadge status={p.status} />
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       <FooterAll />
//     </div>
//   );
// };

// export default Fine;

//-------------------------------------------
// src/Components/Admin/Fine/Fine.jsx

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   FaSearch,
//   FaUser,
//   FaExclamationTriangle,
//   FaClock,
//   FaDollarSign,
// } from "react-icons/fa";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchFines = async () => {
//       try {
//         const res = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFines(res.data);
//       } catch {
//         setError("Failed to fetch fines.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFines();
//   }, [token]);

//   // ===== SUMMARY =====
//   const summaryData = useMemo(() => {
//     const totalFines = fines.length;
//     const totalAmount = fines.reduce(
//       (sum, f) => sum + f.totalAmount + f.currentLateFee,
//       0,
//     );
//     const overdueFines = fines.filter((f) => f.status === "overdue").length;
//     return { totalFines, totalAmount, overdueFines };
//   }, [fines]);

//   // ===== SEARCH =====
//   const filteredFines = useMemo(() => {
//     if (!searchTerm) return fines;
//     const term = searchTerm.toLowerCase();
//     return fines.filter(
//       (p) =>
//         p.studentId?.firstName?.toLowerCase().includes(term) ||
//         p.studentId?.lastName?.toLowerCase().includes(term) ||
//         p.studentId?.email?.toLowerCase().includes(term),
//     );
//   }, [fines, searchTerm]);

//   // ===== STATUS BADGE =====
//   const StatusBadge = ({ status }) => {
//     const styles = {
//       pending: darkMode
//         ? "bg-yellow-900/40 text-yellow-200"
//         : "bg-yellow-100 text-yellow-800",
//       overdue: darkMode
//         ? "bg-red-900/40 text-red-200"
//         : "bg-red-100 text-red-800",
//     };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
//       >
//         {status === "overdue" ? (
//           <FaExclamationTriangle className="mr-1" />
//         ) : (
//           <FaClock className="mr-1" />
//         )}
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   return (
//     <div className={`${darkMode ? "bg-slate-900" : "bg-gray-50"} min-h-screen`}>
//       <AdminNavbar darkMode={darkMode} />

//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />

//         <main
//           className={`flex-1 p-6 md:p-8 ${
//             darkMode ? "bg-slate-900" : "bg-gray-50"
//           }`}
//         >
//           <div className="max-w-7xl mx-auto">
//             {/* HEADER */}
//             <h1
//               className={`text-4xl font-bold mb-2 ${
//                 darkMode ? "text-white" : "text-slate-900"
//               }`}
//             >
//               Fines Management
//             </h1>

//             <p
//               className={`mb-8 ${
//                 darkMode ? "text-slate-400" : "text-slate-600"
//               }`}
//             >
//               Monitor and manage all library fines
//             </p>

//             {/* SUMMARY CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               {[
//                 {
//                   label: "Total Fines",
//                   value: summaryData.totalFines,
//                   icon: <FaUser />,
//                 },
//                 {
//                   label: "Total Amount",
//                   value: `Rs. ${summaryData.totalAmount}`,
//                   icon: <FaDollarSign />,
//                 },
//                 {
//                   label: "Overdue",
//                   value: summaryData.overdueFines,
//                   icon: <FaExclamationTriangle />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className={`border rounded-xl p-6 shadow ${
//                     darkMode
//                       ? "bg-slate-800 border-slate-700"
//                       : "bg-white border-slate-200"
//                   }`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p
//                         className={`text-sm ${
//                           darkMode ? "text-slate-400" : "text-slate-500"
//                         }`}
//                       >
//                         {item.label}
//                       </p>
//                       <p
//                         className={`text-3xl font-bold ${
//                           darkMode ? "text-white" : "text-slate-900"
//                         }`}
//                       >
//                         {item.value}
//                       </p>
//                     </div>
//                     <div className="text-2xl text-blue-600">{item.icon}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SEARCH */}
//             <div className="relative mb-6">
//               <FaSearch className="absolute left-3 top-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none ${
//                   darkMode
//                     ? "bg-slate-800 text-white border-slate-700"
//                     : "bg-white border-slate-300"
//                 }`}
//               />
//             </div>

//             {/* TABLE */}
//             <div
//               className={`border rounded-xl shadow overflow-hidden ${
//                 darkMode
//                   ? "bg-slate-800 border-slate-700"
//                   : "bg-white border-slate-200"
//               }`}
//             >
//               {loading ? (
//                 <p className="p-8 text-center text-slate-500">Loading...</p>
//               ) : error ? (
//                 <p className="p-8 text-center text-red-500">{error}</p>
//               ) : (
//                 <table className="w-full">
//                   <thead className={darkMode ? "bg-slate-700" : "bg-gray-100"}>
//                     <tr>
//                       {["Student", "Amount", "Due Date", "Status"].map((h) => (
//                         <th
//                           key={h}
//                           className={`px-6 py-3 text-left text-xs font-semibold ${
//                             darkMode ? "text-slate-300" : "text-slate-600"
//                           }`}
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {filteredFines.map((p) => (
//                       <tr
//                         key={p._id}
//                         className={`${
//                           darkMode ? "hover:bg-slate-700" : "hover:bg-gray-50"
//                         }`}
//                       >
//                         <td
//                           className={`px-6 py-4 ${
//                             darkMode ? "text-white" : "text-slate-900"
//                           }`}
//                         >
//                           {p.studentId?.firstName} {p.studentId?.lastName}
//                           <div className="text-sm text-slate-500">
//                             {p.studentId?.email}
//                           </div>
//                         </td>

//                         <td
//                           className={`px-6 py-4 font-semibold ${
//                             darkMode ? "text-white" : "text-slate-900"
//                           }`}
//                         >
//                           Rs. {p.totalAmount + p.currentLateFee}
//                         </td>

//                         <td
//                           className={`px-6 py-4 ${
//                             darkMode ? "text-slate-400" : "text-slate-600"
//                           }`}
//                         >
//                           {p.dueDate
//                             ? new Date(p.dueDate).toLocaleDateString()
//                             : "N/A"}
//                         </td>

//                         <td className="px-6 py-4">
//                           <StatusBadge status={p.status} />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       <FooterAll />
//     </div>
//   );
// };

// export default Fine;

//--------------------------------------------------------------

// // src/Components/Admin/Fine/Fine.jsx

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   FaSearch,
//   FaUser,
//   FaExclamationTriangle,
//   FaClock,
//   FaDollarSign,
// } from "react-icons/fa";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchFines = async () => {
//       try {
//         const res = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFines(res.data);
//       } catch (err) {
//         setError("Failed to fetch fines.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFines();
//   }, [token]);

//   // ===== SUMMARY =====
//   const summaryData = useMemo(() => {
//     const totalFines = fines.length;
//     const totalAmount = fines.reduce(
//       (sum, f) => sum + f.totalAmount + f.currentLateFee,
//       0,
//     );
//     const overdueFines = fines.filter((f) => f.status === "overdue").length;
//     return { totalFines, totalAmount, overdueFines };
//   }, [fines]);

//   // ===== SEARCH =====
//   const filteredFines = useMemo(() => {
//     if (!searchTerm) return fines;
//     const term = searchTerm.toLowerCase();
//     return fines.filter(
//       (p) =>
//         p.studentId?.firstName?.toLowerCase().includes(term) ||
//         p.studentId?.lastName?.toLowerCase().includes(term) ||
//         p.studentId?.email?.toLowerCase().includes(term),
//     );
//   }, [fines, searchTerm]);

//   // ===== STATUS BADGE =====
//   const StatusBadge = ({ status }) => {
//     const styles = {
//       pending:
//         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
//       overdue: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
//     };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
//           styles[status]
//         }`}
//       >
//         {status === "overdue" ? (
//           <FaExclamationTriangle className="mr-1" />
//         ) : (
//           <FaClock className="mr-1" />
//         )}
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   // ===== Styling Classes =====
//   const mainBg = `bg-gray-50 dark:bg-slate-900`;
//   const cardBg = `bg-white dark:bg-slate-800`;
//   const textColor = `text-slate-900 dark:text-slate-100`;
//   const subTextColor = `text-slate-600 dark:text-slate-400`;
//   const borderColor = `border-slate-200 dark:border-slate-700`;
//   const hoverBg = `hover:bg-gray-50 dark:hover:bg-slate-700/50`;
//   const placeholderColor = `placeholder-slate-400 dark:placeholder-slate-500`;

//   return (
//     <div className={`min-h-screen ${mainBg}`}>
//       <AdminNavbar darkMode={darkMode} />

//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />

//         <main className={`flex-1 p-6 md:p-8 ${mainBg}`}>
//           <div className="max-w-7xl mx-auto">
//             {/* HEADER */}
//             <h1 className={`text-4xl font-bold mb-2 ${textColor}`}>
//               Fines Management
//             </h1>
//             <p className={`text-slate-600 dark:text-slate-400 mb-8`}>
//               Monitor and manage all library fines
//             </p>

//             {/* SUMMARY CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               {[
//                 {
//                   label: " Total Outstanding Fines",
//                   value: summaryData.totalFines,
//                   icon: <FaUser />,
//                 },
//                 {
//                   label: "Total Amount",
//                   value: `Rs. ${summaryData.totalAmount}`,
//                   icon: <FaDollarSign />,
//                 },
//                 {
//                   label: "Overdue Payments",
//                   value: summaryData.overdueFines,
//                   icon: <FaExclamationTriangle />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className={`${cardBg} border ${borderColor} rounded-xl p-6 shadow`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className={`text-sm ${subTextColor}`}>{item.label}</p>
//                       <p className={`text-3xl font-bold ${textColor}`}>
//                         {item.value}
//                       </p>
//                     </div>
//                     <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
//                       {React.cloneElement(item.icon, {
//                         className: "text-2xl text-blue-600 dark:text-blue-400",
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SEARCH */}
//             <div className="relative mb-6">
//               <FaSearch className={`absolute left-3 top-4 text-slate-400`} />
//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-3 rounded-lg border ${cardBg} ${borderColor} ${textColor} ${placeholderColor} focus:outline-none`}
//               />
//             </div>

//             {/* TABLE */}
//             <div
//               className={`${cardBg} border ${borderColor} rounded-xl shadow overflow-hidden`}
//             >
//               {loading ? (
//                 <p className={`p-8 text-center ${subTextColor}`}>Loading...</p>
//               ) : error ? (
//                 <p className="p-8 text-center text-red-500">{error}</p>
//               ) : (
//                 <table className="w-full">
//                   <thead className={`${cardBg} border-b ${borderColor}`}>
//                     <tr>
//                       {["Student", "Amount", "Due Date", "Status"].map((h) => (
//                         <th
//                           key={h}
//                           className={`px-6 py-3 text-left text-xs font-semibold uppercase ${subTextColor}`}
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className={`divide-y dark:divide-slate-700`}>
//                     {filteredFines.length === 0 ? (
//                       <tr>
//                         <td colSpan="4" className="p-8 text-center">
//                           <p className={`text-slate-500`}>No fines found</p>
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredFines.map((p) => (
//                         <tr key={p._id} className={`transition ${hoverBg}`}>
//                           <td className={`px-6 py-4 ${textColor}`}>
//                             {p.studentId?.firstName} {p.studentId?.lastName}
//                             <div className={`text-sm ${subTextColor}`}>
//                               {p.studentId?.email}
//                             </div>
//                           </td>
//                           <td
//                             className={`px-6 py-4 font-semibold ${textColor}`}
//                           >
//                             Rs. {p.totalAmount + p.currentLateFee}
//                           </td>
//                           <td className={`px-6 py-4 ${subTextColor}`}>
//                             {p.dueDate
//                               ? new Date(p.dueDate).toLocaleDateString()
//                               : "N/A"}
//                           </td>
//                           <td className="px-6 py-4">
//                             <StatusBadge status={p.status} />
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       <FooterAll />
//     </div>
//   );
// };

// export default Fine;

//--------------------------------------------------------------

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import {
//   FaSearch,
//   FaUser,
//   FaExclamationTriangle,
//   FaClock,
//   FaDollarSign,
//   FaCalendarAlt,
//   FaFilter,
// } from "react-icons/fa";

// const Fine = ({ darkMode }) => {
//   const [fines, setFines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [totalFine, setTotalFine] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const finesPerPage = 10; // Ya jitne fines per page dikhana chahte ho
//   const token = localStorage.getItem("token");

//   // Fine.jsx ke top me, Fine component ke andar ya bahar
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return isNaN(date) ? "N/A" : date.toLocaleDateString();
//   };

//   ///////////////////////////////////////////////////////////////////////////////////
//   // useEffect(() => {
//   //   const fetchFines = async () => {
//   //     try {
//   //       const res = await axios.get("/api/fines/admin/all", {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //       setFines(res.data);
//   //     } catch (err) {
//   //       setError("Failed to fetch fines.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchFines();
//   // }, [token]);

//   //----------------------------------------------------------------------
//   useEffect(() => {
//     if (!token) return;

//     const fetchTotalFine = async () => {
//       try {
//         const res = await axios.get("/api/fines/admin/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const finesData = res.data;

//         setFines(finesData);

//         // ✅ Declare total properly
//         let total = 0;

//         finesData.forEach((fine) => {
//           total += fine.totalAmount || 0;
//         });

//         setTotalFine(total);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching fines:", err);
//         setError("Failed to fetch total fine.");
//         setTotalFine(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTotalFine();
//     const interval = setInterval(fetchTotalFine, 60000);
//     return () => clearInterval(interval);
//   }, [token]);

//   /////////////////////////////////////////////////////////////////////////////////////////

//   // ===== SUMMARY =====
//   // const summaryData = useMemo(() => {
//   //   const totalFines = fines.length;
//   //   const totalAmount = fines.reduce(
//   //     (sum, f) => sum + (f.totalCalculatedFine || 0),
//   //     0,
//   //   );
//   //   const overdueFines = fines.filter((f) => f.status === "overdue").length;
//   //   const pendingFines = fines.filter((f) => f.status === "pending").length;
//   //   return { totalFines, totalAmount, overdueFines, pendingFines };
//   // }, [fines]);

//   // const formatDate = (dateStr) => {
//   //   const date = new Date(dateStr);
//   //   return isNaN(date) ? "N/A" : date.toLocaleDateString();
//   // };

//   // ===== SEARCH & FILTER =====
//   const filteredFines = useMemo(() => {
//     let filtered = fines;

//     // Filter by status
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((f) => f.status === statusFilter);
//     }

//     // Filter by search term
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (p) =>
//           p.studentId?.firstName?.toLowerCase().includes(term) ||
//           p.studentId?.lastName?.toLowerCase().includes(term) ||
//           p.studentId?.email?.toLowerCase().includes(term) ||
//           p.studentId?.cnic?.replace(/-/g, "").includes(term.replace(/-/g, "")),
//       );
//     }

//     return filtered;
//   }, [fines, searchTerm, statusFilter]);

//   // Pagination
//   const indexOfLastFine = currentPage * finesPerPage;
//   const indexOfFirstFine = indexOfLastFine - finesPerPage;
//   const currentFines = filteredFines.slice(indexOfFirstFine, indexOfLastFine);

//   const totalPages = Math.ceil(filteredFines.length / finesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // ===== STATUS BADGE =====
//   const StatusBadge = ({ status }) => {
//     if (status === "overdue") {
//       return (
//         <span
//           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//             darkMode ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800"
//           }`}
//         >
//           <FaExclamationTriangle className="mr-1" />
//           OVERDUE
//         </span>
//       );
//     }

//     return (
//       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-orange-600 dark:bg-gray-800 dark:text-orange-400 border border-yellow-200 dark:border-gray-600">
//         <FaClock className="mr-1" />
//         PENDING
//       </span>
//     );
//   };

//   // ===== Conditional Styling Function =====
//   const getStyles = () => ({
//     mainBg: darkMode ? "bg-gray-900" : "bg-gray-50",
//     cardBg: darkMode ? "bg-gray-800" : "bg-white",
//     textColor: darkMode ? "text-slate-100" : "text-slate-900",
//     subTextColor: darkMode ? "text-slate-400" : "text-slate-600",
//     borderColor: darkMode ? "border-gray-700" : "border-gray-200",
//     hoverBg: darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
//     iconBg1: darkMode ? "bg-blue-900/30" : "bg-blue-100",
//     iconColor1: darkMode ? "text-blue-400" : "text-blue-600",
//     iconBg2: darkMode ? "bg-emerald-900/30" : "bg-emerald-100",
//     iconColor2: darkMode ? "text-emerald-400" : "text-emerald-600",
//     iconBg3: darkMode ? "bg-red-900/30" : "bg-red-100",
//     iconColor3: darkMode ? "text-red-400" : "text-red-600",
//     inputBg: darkMode
//       ? "bg-gray-700 border-gray-600"
//       : "bg-white border-gray-300",
//     placeholderColor: darkMode
//       ? "placeholder-gray-400"
//       : "placeholder-gray-500",
//     filterBg: darkMode ? "bg-gray-700" : "bg-gray-100",
//     filterTextColor: darkMode ? "text-gray-300" : "text-gray-700",
//     filterActiveBg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
//     filterActiveText: darkMode ? "text-blue-300" : "text-blue-700",
//   });

//   const styles = getStyles();

//   return (
//     <div className="min-h-screen">
//       <AdminNavbar darkMode={darkMode} />
//       <div className="flex">
//         <AdminSidebar darkMode={darkMode} />
//         <main className={`flex-1 p-6 md:p-8 ${styles.mainBg}`}>
//           <div className="max-w-7xl mx-auto">
//             {/* Header Section */}
//             <div className="mb-8">
//               {/* Label */}
//               {/* <div className="flex items-center mb-3">
//                 <div className="h-1 w-10 rounded-full bg-black mr-3"></div>
//               </div> */}

//               {/* Title */}
//               <h1
//                 className={`text-4xl md:text-3xl font-bold leading-tight ${
//                   darkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Fines Management
//               </h1>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
//               <div
//                 className={`${styles.cardBg} rounded-xl p-6 border ${styles.borderColor} transition-all hover:shadow-xl`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${styles.subTextColor}`}>
//                       Total Outstanding Fines
//                     </p>
//                     <p
//                       className={`text-3xl font-bold mt-1 ${styles.textColor}`}
//                     >
//                       Rs. {totalFine.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className={`p-4 rounded-md ${styles.iconBg2}`}>
//                     <FaDollarSign className={`text-2xl ${styles.iconColor2}`} />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Search and Filter Bar */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="relative flex-1">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaSearch className={`h-5 w-5 ${styles.subTextColor}`} />
//                 </div>
//                 <input
//                   type="text"
//                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 ${styles.inputBg} ${styles.placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.textColor}`}
//                   placeholder="Search by student name, email..."
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <FaFilter className={`${styles.subTextColor}`} />
//                 <div className="flex rounded-md overflow-hidden">
//                   <button
//                     onClick={() => setStatusFilter("all")}
//                     className={`px-4 py-2 text-sm font-medium transition-colors ${
//                       statusFilter === "all"
//                         ? `${styles.filterActiveBg} ${styles.filterActiveText}`
//                         : `${styles.filterBg} ${styles.filterTextColor}`
//                     }`}
//                   >
//                     All
//                   </button>
//                   <button
//                     onClick={() => setStatusFilter("pending")}
//                     className={`px-4 py-2 text-sm font-medium transition-colors ${
//                       statusFilter === "pending"
//                         ? `${styles.filterActiveBg} ${styles.filterActiveText}`
//                         : `${styles.filterBg} ${styles.filterTextColor}`
//                     }`}
//                   >
//                     Pending
//                   </button>
//                   <button
//                     onClick={() => setStatusFilter("overdue")}
//                     className={`px-4 py-2 text-sm font-medium transition-colors ${
//                       statusFilter === "overdue"
//                         ? `${styles.filterActiveBg} ${styles.filterActiveText}`
//                         : `${styles.filterBg} ${styles.filterTextColor}`
//                     }`}
//                   >
//                     Overdue
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Fines Table */}
//             <div
//               className={`${styles.cardBg} rounded-xl shadow-lg overflow-hidden border ${styles.borderColor}`}
//             >
//               {loading ? (
//                 <div className="p-8 text-center">
//                   {/* <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
//                   <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
//                   <p className={`mt-4 ${styles.subTextColor}`}>
//                     Loading fines...
//                   </p>
//                 </div>
//               ) : error ? (
//                 <div className="p-8 text-center">
//                   <p className="text-red-500">{error}</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead
//                         className={`${styles.cardBg} border-b ${styles.borderColor}`}
//                       >
//                         <tr>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
//                           >
//                             Student
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
//                           >
//                             Amount
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
//                           >
//                             Due Date
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
//                           >
//                             Status
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody
//                         className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
//                       >
//                         {filteredFines.length === 0 ? (
//                           <tr>
//                             <td colSpan="4" className="p-8 text-center">
//                               <FaClock
//                                 className={`mx-auto h-12 w-12 ${styles.subTextColor} mb-4`}
//                               />
//                               <p
//                                 className={`text-lg font-medium ${styles.textColor}`}
//                               >
//                                 No fines found
//                               </p>
//                               <p className={`mt-1 ${styles.subTextColor}`}>
//                                 {searchTerm || statusFilter !== "all"
//                                   ? "Try adjusting your search or filter."
//                                   : "All fines are up to date."}
//                               </p>
//                             </td>
//                           </tr>
//                         ) : (
//                           currentFines.map((fine) => (
//                             <tr
//                               key={fine._id}
//                               className={`transition-colors ${styles.hoverBg}`}
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-10 w-10">
//                                     <div
//                                       className={`h-10 w-10 rounded-full ${darkMode ? "bg-slate-600" : "bg-slate-200"} flex items-center justify-center`}
//                                     >
//                                       <FaUser
//                                         className={`h-5 w-5 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
//                                       />
//                                     </div>
//                                   </div>
//                                   <div className="ml-4">
//                                     <div
//                                       className={`text-sm font-medium ${styles.textColor}`}
//                                     >
//                                       {fine.studentId?.firstName}{" "}
//                                       {fine.studentId?.lastName}
//                                     </div>
//                                     <div
//                                       className={`text-sm ${styles.subTextColor}`}
//                                     >
//                                       {fine.studentId?.email}
//                                     </div>
//                                     <div
//                                       className={`text-sm ${styles.subTextColor}`}
//                                     >
//                                       {fine.studentId?.cnic}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <p
//                                   className={`text-sm font-semibold ${styles.textColor}`}
//                                 >
//                                   Rs. {fine.totalAmount || 0}
//                                 </p>

//                                 {fine.currentLateFee > 0 && (
//                                   <p
//                                     className={`text-xs ${styles.subTextColor}`}
//                                   >
//                                     (Late Fee: Rs. {fine.currentLateFee})
//                                   </p>
//                                 )}
//                               </td>

//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <FaCalendarAlt
//                                     className={`mr-2 h-4 w-4 ${styles.subTextColor}`}
//                                   />
//                                   <div
//                                     className={`text-sm ${styles.subTextColor}`}
//                                   >
//                                     {formatDate(fine.dueDate)}
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <StatusBadge status={fine.status} />
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                     {/* Pagination */}
//                     {filteredFines.length > 0 && (
//                       <div className="flex justify-center mt-15 mb-5 space-x-1">
//                         <button
//                           onClick={() =>
//                             currentPage > 1 && handlePageChange(currentPage - 1)
//                           }
//                           className={`px-3 py-1 rounded-lg border ${
//                             currentPage === 1
//                               ? "text-gray-400 cursor-not-allowed"
//                               : "text-indigo-600 hover:bg-indigo-50"
//                           }`}
//                           disabled={currentPage === 1}
//                         >
//                           &lt;
//                         </button>

//                         {Array.from(
//                           { length: totalPages },
//                           (_, index) => index + 1,
//                         )
//                           .filter(
//                             (page) =>
//                               page === 1 ||
//                               page === totalPages ||
//                               (page >= currentPage - 1 &&
//                                 page <= currentPage + 1),
//                           )
//                           .map((page, idx, arr) => (
//                             <React.Fragment key={page}>
//                               {idx > 0 && arr[idx - 1] !== page - 1 && (
//                                 <span className="px-2 text-gray-400">...</span>
//                               )}
//                               <button
//                                 onClick={() => handlePageChange(page)}
//                                 className={`px-3 py-1 rounded-lg border ${
//                                   currentPage === page
//                                     ? "bg-indigo-600 text-white"
//                                     : "bg-white text-indigo-600 hover:bg-indigo-50"
//                                 }`}
//                               >
//                                 {page}
//                               </button>
//                             </React.Fragment>
//                           ))}

//                         <button
//                           onClick={() =>
//                             currentPage < totalPages &&
//                             handlePageChange(currentPage + 1)
//                           }
//                           className={`px-3 py-1 rounded-lg border ${
//                             currentPage === totalPages
//                               ? "text-gray-400 cursor-not-allowed"
//                               : "text-indigo-600 hover:bg-indigo-50"
//                           }`}
//                           disabled={currentPage === totalPages}
//                         >
//                           &gt;
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//       <FooterAll darkMode={darkMode} />
//     </div>
//   );
// };

// export default Fine;

//----------------------------------------------------------------------------------------------

import React, { useEffect, useState, useMemo, useCallback } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import FooterAll from "../../Footer/FooterAll";
import axios from "axios";
import {
  FaSearch,
  FaUser,
  FaExclamationTriangle,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaFilter,
  FaSyncAlt,
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";

const Fine = ({ darkMode }) => {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalFine, setTotalFine] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedRows, setExpandedRows] = useState({});
  const [viewMode, setViewMode] = useState("table");
  const finesPerPage = 10;
  const token = localStorage.getItem("token");

  // Format date function
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date)
      ? "N/A"
      : date.toLocaleDateString("en-PK", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  // Calculate days between two dates
  const getDaysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = d2 - d1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Toggle row expansion for table view
  const toggleRow = (fineId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [fineId]: !prev[fineId],
    }));
  };

  // Fetch fines function
  const fetchFines = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get("/api/fines/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const finesData = res.data;
      console.log("Fetched fines:", finesData); // Debug log

      // Use the payments array from response
      const finesArray = finesData.payments || [];

      setFines(finesArray);

      // Calculate total properly
      const total = finesArray.reduce((sum, fine) => {
        return sum + (fine.totalAmount || 0);
      }, 0);

      setTotalFine(total);
      setError("");
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching fines:", err);
      setError("Failed to fetch fines.");
      setTotalFine(0);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial fetch and set up interval
  useEffect(() => {
    fetchFines();

    // Set up interval for auto-refresh (every 30 seconds)
    const interval = setInterval(fetchFines, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [fetchFines]);

  // Manual refresh handler
  const handleRefresh = () => {
    fetchFines();
  };

  // Filter fines
  const filteredFines = useMemo(() => {
    if (!Array.isArray(fines)) return [];

    let filtered = fines;

    if (statusFilter !== "all") {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.studentId?.firstName?.toLowerCase().includes(term) ||
          p.studentId?.lastName?.toLowerCase().includes(term) ||
          p.studentId?.email?.toLowerCase().includes(term) ||
          p.studentId?.cnic?.replace(/-/g, "").includes(term.replace(/-/g, "")),
      );
    }

    return filtered;
  }, [fines, searchTerm, statusFilter]);

  // Pagination
  const indexOfLastFine = currentPage * finesPerPage;
  const indexOfFirstFine = indexOfLastFine - finesPerPage;
  const currentFines = filteredFines.slice(indexOfFirstFine, indexOfLastFine);
  const totalPages = Math.ceil(filteredFines.length / finesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get earliest and latest due dates for a fine
  const getDueDateRange = (fineDetails) => {
    if (!fineDetails || fineDetails.length === 0) return null;

    const dueDates = fineDetails.map((d) => new Date(d.dueDate).getTime());
    const earliest = new Date(Math.min(...dueDates));
    const latest = new Date(Math.max(...dueDates));

    return { earliest, latest };
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    if (status === "overdue") {
      return (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            darkMode ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800"
          }`}
        >
          <FaExclamationTriangle className="mr-1" />
          OVERDUE
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-orange-600 dark:bg-gray-800 dark:text-orange-400 border border-yellow-200 dark:border-gray-600">
        <FaClock className="mr-1" />
        PENDING
      </span>
    );
  };

  // Conditional Styling Function
  const getStyles = () => ({
    mainBg: darkMode ? "bg-gray-900" : "bg-gray-50",
    cardBg: darkMode ? "bg-gray-800" : "bg-white",
    textColor: darkMode ? "text-slate-100" : "text-slate-900",
    subTextColor: darkMode ? "text-slate-400" : "text-slate-600",
    borderColor: darkMode ? "border-gray-700" : "border-gray-200",
    hoverBg: darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
    iconBg1: darkMode ? "bg-blue-900/30" : "bg-blue-100",
    iconColor1: darkMode ? "text-blue-400" : "text-blue-600",
    iconBg2: darkMode ? "bg-emerald-900/30" : "bg-emerald-100",
    iconColor2: darkMode ? "text-emerald-400" : "text-emerald-600",
    iconBg3: darkMode ? "bg-red-900/30" : "bg-red-100",
    iconColor3: darkMode ? "text-red-400" : "text-red-600",
    inputBg: darkMode
      ? "bg-gray-700 border-gray-600"
      : "bg-white border-gray-300",
    placeholderColor: darkMode
      ? "placeholder-gray-400"
      : "placeholder-gray-500",
    filterBg: darkMode ? "bg-gray-700" : "bg-gray-100",
    filterTextColor: darkMode ? "text-gray-300" : "text-gray-700",
    filterActiveBg: darkMode ? "bg-blue-900/50" : "bg-blue-100",
    filterActiveText: darkMode ? "text-blue-300" : "text-blue-700",
  });

  const styles = getStyles();

  return (
    <div className="min-h-screen">
      <AdminNavbar darkMode={darkMode} />
      <div className="flex">
        <AdminSidebar darkMode={darkMode} />
        <main className={`flex-1 p-6 md:p-8 ${styles.mainBg}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header Section with Refresh Button */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1
                className={`text-4xl md:text-3xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Fines Management
              </h1>

              <div className="flex items-center gap-4">
                {/* Refresh Button */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${styles.subTextColor}`}>
                    Last: {lastUpdated.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className={`p-2 rounded-full transition-colors ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-200 text-gray-600"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    title="Refresh"
                  >
                    <FaSyncAlt
                      className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Total Fine Card */}
              <div
                // className={`${styles.cardBg} rounded-xl p-6 border ${styles.borderColor} transition-all hover:shadow-xl`}
                className={`${styles.cardBg} max-w-sm w-full mx-auto rounded-xl p-6 border ${styles.borderColor} transition-all hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${styles.subTextColor}`}>
                      Total Outstanding Fines
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 ${styles.textColor}`}
                    >
                      Rs. {totalFine.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-4 rounded-md ${styles.iconBg2}`}>
                    <FaDollarSign className={`text-2xl ${styles.iconColor2}`} />
                  </div>
                </div>
              </div>

              {/* Total Records Card */}
              <div
                // className={`${styles.cardBg} rounded-xl p-6 border ${styles.borderColor} transition-all hover:shadow-xl`}
                className={`${styles.cardBg} max-w-sm w-full mx-auto rounded-xl p-6 border ${styles.borderColor} transition-all hover:shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${styles.subTextColor}`}>
                      Total Records
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 ${styles.textColor}`}
                    >
                      {fines.length}
                    </p>
                    <p className={`text-xs mt-1 ${styles.subTextColor}`}>
                      {fines.filter((f) => f.status === "overdue").length}{" "}
                      overdue,{" "}
                      {fines.filter((f) => f.status === "pending").length}{" "}
                      pending
                    </p>
                  </div>
                  <div className={`p-4 rounded-md ${styles.iconBg1}`}>
                    <FaBook className={`text-2xl ${styles.iconColor1}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className={`h-5 w-5 ${styles.subTextColor}`} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 ${styles.inputBg} ${styles.placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.textColor}`}
                  placeholder="Search by student name, email, or CNIC..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <FaFilter className={`${styles.subTextColor}`} />
                <div className="flex rounded-md overflow-hidden">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      statusFilter === "all"
                        ? `${styles.filterActiveBg} ${styles.filterActiveText}`
                        : `${styles.filterBg} ${styles.filterTextColor}`
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter("pending")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      statusFilter === "pending"
                        ? `${styles.filterActiveBg} ${styles.filterActiveText}`
                        : `${styles.filterBg} ${styles.filterTextColor}`
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setStatusFilter("overdue")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      statusFilter === "overdue"
                        ? `${styles.filterActiveBg} ${styles.filterActiveText}`
                        : `${styles.filterBg} ${styles.filterTextColor}`
                    }`}
                  >
                    Overdue
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
                <p className={`mt-4 ${styles.subTextColor}`}>
                  Loading fines...
                </p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredFines.length === 0 ? (
              <div
                className={`${styles.cardBg} rounded-xl p-8 text-center border ${styles.borderColor}`}
              >
                <FaClock
                  className={`mx-auto h-12 w-12 ${styles.subTextColor} mb-4`}
                />
                <p className={`text-lg font-medium ${styles.textColor}`}>
                  No fines found
                </p>
                <p className={`mt-1 ${styles.subTextColor}`}>
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter."
                    : "All fines are up to date."}
                </p>
              </div>
            ) : (
              <>
                {/* Table View */}
                {viewMode === "table" && (
                  <div
                    className={`${styles.cardBg} rounded-xl shadow-lg overflow-hidden border ${styles.borderColor}`}
                  >
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead
                          className={`${styles.cardBg} border-b ${styles.borderColor}`}
                        >
                          <tr>
                            <th
                              className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                            >
                              Student
                            </th>
                            <th
                              className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                            >
                              Total Fine
                            </th>
                            <th
                              className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                            >
                              Due Date Range
                            </th>
                            <th
                              className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                        >
                          {currentFines.map((fine) => {
                            const dateRange = getDueDateRange(fine.fineDetails);

                            return (
                              <React.Fragment key={fine._id}>
                                <tr
                                  className={`transition-colors cursor-pointer ${styles.hoverBg}`}
                                  onClick={() => toggleRow(fine._id)}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <div
                                          className={`h-10 w-10 rounded-full ${darkMode ? "bg-slate-600" : "bg-slate-200"} flex items-center justify-center`}
                                        >
                                          <FaUser
                                            className={`h-5 w-5 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
                                          />
                                        </div>
                                      </div>
                                      <div className="ml-4">
                                        <div
                                          className={`text-sm font-medium ${styles.textColor}`}
                                        >
                                          {fine.studentId?.firstName}{" "}
                                          {fine.studentId?.lastName}
                                        </div>

                                        <div
                                          className={`text-sm ${styles.subTextColor}`}
                                        >
                                          {fine.studentId?.email}
                                        </div>

                                        <div
                                          className={`text-sm ${styles.subTextColor}`}
                                        >
                                          {fine.studentId?.cnic}
                                        </div>
                                        <div
                                          className={`text-sm ${styles.subTextColor}`}
                                        >
                                          @{fine.studentId?.username}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p
                                      className={`text-md font-semibold ${styles.textColor}`}
                                    >
                                      Rs.{" "}
                                      {fine.totalAmount?.toLocaleString() || 0}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-start">
                                      {/* <FaCalendarAlt
                                        className={`mr-2 h-4 w-4 mt-1 ${styles.subTextColor}`}
                                      /> */}
                                      <div>
                                        {dateRange ? (
                                          <>
                                            <div
                                              className={`text-md ${styles.textColor}`}
                                            >
                                              {formatDate(dateRange.earliest)}
                                              {dateRange.earliest.getTime() !==
                                                dateRange.latest.getTime() && (
                                                <span className="text-xs ml-1 text-gray-500">
                                                  to{" "}
                                                  {formatDate(dateRange.latest)}
                                                </span>
                                              )}
                                            </div>
                                            <div
                                              className={`text-xs text-center ${styles.subTextColor}`}
                                            >
                                              {
                                                fine.fineDetails?.filter(
                                                  (d) => {
                                                    const dueDate = new Date(
                                                      d.dueDate,
                                                    );
                                                    const today = new Date();
                                                    return (
                                                      !d.returnDate &&
                                                      dueDate < today
                                                    );
                                                  },
                                                ).length
                                              }{" "}
                                              books overdue
                                            </div>
                                          </>
                                        ) : (
                                          <div
                                            className={`text-sm ${styles.subTextColor}`}
                                          >
                                            No due dates
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <StatusBadge status={fine.status} />
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {filteredFines.length > finesPerPage && (
                      <div className="flex justify-center py-4 px-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded border border-black font-bold ${
                              currentPage === 1
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-800"
                            }`}
                          >
                            Prev
                          </button>
                          <div className="flex space-x-1">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1,
                            ).map((page) => (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded border border-black font-bold ${
                                  currentPage === page
                                    ? "bg-gray-700 text-white font-bold"
                                    : "bg-white text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
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
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination for Cards View */}
                {viewMode === "cards" &&
                  filteredFines.length > finesPerPage && (
                    <div className="flex justify-center mt-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === 1
                              ? "text-gray-400 cursor-not-allowed"
                              : `${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-700 border ${styles.borderColor}`
                          }`}
                        >
                          Previous
                        </button>
                        <div className="flex space-x-1">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-lg ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : `${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-700 border ${styles.borderColor}`
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === totalPages
                              ? "text-gray-400 cursor-not-allowed"
                              : `${styles.textColor} hover:bg-gray-100 dark:hover:bg-gray-700 border ${styles.borderColor}`
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </main>
      </div>
      <FooterAll darkMode={darkMode} />
    </div>
  );
};

export default Fine;
