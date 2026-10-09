// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function RecentlyAddedStudents() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Sort by createdAt descending
//       const sortedStudents = data.users.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setStudents(sortedStudents);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//         Recently Added Students
//       </h1>

//       <div className="flex flex-col gap-6">
//         {students.map((student) => (
//           <div
//             key={student._id}
//             className="border rounded-lg shadow p-5 bg-white transition-transform transform hover:scale-105 hover:shadow-xl max-w-4xl mx-auto"
//           >
//             <div className="grid grid-cols-3 gap-6 text-base">
//               <p>
//                 <b>Full Name:</b> {student.firstName} {student.lastName}
//               </p>
//               <p>
//                 <b>CNIC:</b> {student.cnic}
//               </p>
//               <p>
//                 <b>Email:</b> {student.email}
//               </p>

//               <p>
//                 <b>Username:</b> {student.username}
//               </p>
//               <p>
//                 <b>Degree:</b> {student.degree}
//               </p>
//               <p>
//                 <b>Program:</b> {student.program}
//               </p>
//               <p>
//                 <b>Batch No:</b> {student.batchNo}
//               </p>
//               <p>
//                 <b>Roll No:</b> {student.rollNo}
//               </p>
//               <p>
//                 <b>Registered On:</b>{" "}
//                 {new Date(student.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function RecentlyAddedStudents() {
//   const [students, setStudents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 5;

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const sortedStudents = data.users.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setStudents(sortedStudents);
//       setCurrentPage(1); // reset to first page
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   // Pagination
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//         Recently Added Students
//       </h1>

//       <div className="flex flex-col gap-6 items-center w-full">
//         {currentStudents.map((student) => (
//           <div
//             key={student._id}
//             className="border rounded-lg shadow p-5 bg-white transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-4xl"
//           >
//             <div className="grid grid-cols-3 gap-6 text-base w-full">
//               <p className="w-full">
//                 <b>Full Name:</b> {student.firstName} {student.lastName}
//               </p>
//               <p className="w-full">
//                 <b>CNIC:</b> {student.cnic}
//               </p>
//               <p className="w-full">
//                 <b>Email:</b> {student.email}
//               </p>

//               <p className="w-full">
//                 <b>Username:</b> {student.username}
//               </p>
//               <p className="w-full">
//                 <b>Degree:</b> {student.degree}
//               </p>
//               <p className="w-full">
//                 <b>Program:</b> {student.program}
//               </p>

//               <p className="w-full">
//                 <b>Batch No:</b> {student.batchNo}
//               </p>
//               <p className="w-full">
//                 <b>Roll No:</b> {student.rollNo}
//               </p>
//               <p className="w-full">
//                 <b>Registered On:</b>{" "}
//                 {new Date(student.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}

//         {/* Pagination */}
//         <div className="flex justify-center mt-6 gap-2 w-full max-w-4xl">
//           <button
//             disabled={currentPage === 1}
//             onClick={handlePrev}
//             className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//           >
//             &lt;
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === i + 1
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={handleNext}
//             className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//--------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function RecentlyAddedStudents({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainSearch, setMainSearch] = useState("");
  const [fullNameSearch, setFullNameSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [usernameSearch, setUsernameSearch] = useState("");
  const [cnicSearch, setCnicSearch] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  // --- FILTERING LOGIC ---
  // Agar aapke paas pehle se `filteredStudents` variable hai, toh use hata kar yeh `useEffect` aur `useState` paste karen.
  const [filteredStudents, setFilteredStudents] = useState(students);
  const studentsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const sortedStudents = data.users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setStudents(sortedStudents);
      setCurrentPage(1); // reset to first page
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students ❌");
    }
  };

  // --- ADVANCED SEARCH STATE VARIABLES ---
  useEffect(() => {
    let results = [...students]; // Start with all students

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const search = mainSearch.trim().toLowerCase();
      results = results.filter((s) => {
        const firstName = s.firstName?.toLowerCase() || "";
        const lastName = s.lastName?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`.trim();
        const email = s.email?.toLowerCase() || "";
        const username = s.username?.toLowerCase() || "";
        const cnic = s.cnic?.toLowerCase() || "";

        return (
          firstName.includes(search) ||
          lastName.includes(search) ||
          fullName.includes(search) ||
          email.includes(search) ||
          username.includes(search) ||
          cnic.includes(search)
        );
      });
    }

    // Apply full name search if it exists (from filter options)
    if (fullNameSearch) {
      const search = fullNameSearch.trim().toLowerCase();
      results = results.filter((s) => {
        const firstName = s.firstName?.toLowerCase() || "";
        const lastName = s.lastName?.toLowerCase() || "";
        const fullName = `${firstName} ${lastName}`.trim();

        return (
          firstName.includes(search) ||
          lastName.includes(search) ||
          fullName.includes(search)
        );
      });
    }

    // Apply email search if it exists (from filter options)
    if (emailSearch) {
      const search = emailSearch.trim().toLowerCase();
      results = results.filter((s) => {
        const email = s.email?.toLowerCase() || "";
        return email.includes(search);
      });
    }

    // Apply username search if it exists (from filter options)
    if (usernameSearch) {
      const search = usernameSearch.trim().toLowerCase();
      results = results.filter((s) => {
        const username = s.username?.toLowerCase() || "";
        return username.includes(search);
      });
    }

    // Apply CNIC search if it exists (from filter options)
    if (cnicSearch) {
      const search = cnicSearch.trim().toLowerCase();
      results = results.filter((s) => {
        const cnic = s.cnic?.toLowerCase() || "";
        return cnic.includes(search);
      });
    }

    // Apply alphabet filter if it exists
    if (alphabetFilter) {
      results = results.filter((s) => {
        if (!s.firstName) return false;
        const firstChar = s.firstName.charAt(0).toUpperCase();
        return firstChar === alphabetFilter.toUpperCase();
      });
    }

    setFilteredStudents(results);
    setCurrentPage(1); // Reset to first page on any filter change
  }, [
    mainSearch,
    fullNameSearch,
    emailSearch,
    usernameSearch,
    cnicSearch,
    alphabetFilter,
    students,
  ]);

  // --- HELPER FUNCTIONS ---
  // Updated clearAllSearches function
  const clearAllSearches = () => {
    setMainSearch("");
    setFullNameSearch("");
    setEmailSearch("");
    setUsernameSearch("");
    setCnicSearch("");
    setAlphabetFilter("");
  };

  // Updated hasActiveSearch check ( agar aapko kahin use karna ho toh )
  const hasActiveSearch =
    mainSearch ||
    fullNameSearch ||
    emailSearch ||
    usernameSearch ||
    cnicSearch ||
    alphabetFilter;

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-2">
      {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="flex">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-l-lg border transition
          ${
            darkMode
              ? "bg-slate-800 border-slate-600 text-white placeholder-gray-400"
              : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500"
          }
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        `}
                value={mainSearch}
                onChange={(e) => setMainSearch(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <button
              className={`px-4 py-2 rounded-r-lg border-l-0 transition-colors ${
                darkMode
                  ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-slate-600"
                  : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-gray-300"
              }`}
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <svg
                className="w-4 h-4"
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
              className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg p-4 ${
                darkMode
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="First or last name..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={fullNameSearch}
                    onChange={(e) => setFullNameSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={usernameSearch}
                    onChange={(e) => setUsernameSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    CNIC
                  </label>
                  <input
                    type="text"
                    placeholder="CNIC..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={cnicSearch}
                    onChange={(e) => setCnicSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* ALPHABETICAL FILTER */}
              <div
                className={`mt-4 pt-4 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}
              >
                <label
                  className={`block text-xs font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Browse by First Letter
                </label>
                <div className="flex flex-wrap gap-1 mb-2">
                  <button
                    onClick={() => setAlphabetFilter("")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      !alphabetFilter
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-500 text-white"
                        : darkMode
                          ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All
                  </button>

                  {"ABCDEFGHIJ".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setAlphabetFilter(letter)}
                      className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                        alphabetFilter === letter
                          ? darkMode
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-500 text-white"
                          : darkMode
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}

                  {showMoreAlphabets &&
                    "KLMNOPQRSTUVWXYZ".split("").map((letter) => (
                      <button
                        key={letter}
                        onClick={() => setAlphabetFilter(letter)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === letter
                            ? darkMode
                              ? "bg-indigo-600 text-white"
                              : "bg-indigo-500 text-white"
                            : darkMode
                              ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {letter}
                      </button>
                    ))}

                  {showMoreAlphabets &&
                    "0123456789".split("").map((number) => (
                      <button
                        key={number}
                        onClick={() => setAlphabetFilter(number)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === number
                            ? darkMode
                              ? "bg-indigo-600 text-white"
                              : "bg-indigo-500 text-white"
                            : darkMode
                              ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                  <button
                    onClick={() => setShowMoreAlphabets(!showMoreAlphabets)}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      darkMode
                        ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
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
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
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

      <div className="flex flex-col gap-6 items-center w-full">
        {currentStudents.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          currentStudents.map((student) => (
            <div
              key={student._id}
              className={`group relative border rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] w-full max-w-4xl overflow-hidden ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700"
                  : "bg-gradient-to-br from-white to-gray-50 text-black border-gray-200"
              }`}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              <div className="relative flex items-start gap-8">
                {/* Enhanced Profile Section */}
                <div className="flex-shrink-0">
                  <div
                    className={`relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${
                      darkMode
                        ? "bg-gradient-to-br from-blue-600 to-purple-600"
                        : "bg-blue-900"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-20"></div>
                    <svg
                      className="relative w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Enhanced User Data Section */}
                <div className="flex-1">
                  {/* Header Section */}
                  <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-blue-900 dark:text-blue-800 bg-clip-text">
                          {student.firstName} {student.lastName}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              darkMode
                                ? "bg-blue-900/50 text-blue-300"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {student.rollNo}
                          </span>
                          <span
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            Active Student
                          </span>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          darkMode
                            ? "bg-green-900/50 text-green-300"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        ENROLLED
                      </div>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-900"}`}
                        ></div>
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          Personal
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Identity
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {student.cnic}
                          </p>
                        </div>
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Email
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {student.email}
                          </p>
                        </div>
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Username
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            @{student.username}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-900"}`}
                        ></div>
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          Academic
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Degree
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {student.degree}
                          </p>
                        </div>
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Program
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {student.program}
                          </p>
                        </div>
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Batch
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {student.batchNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-2 h-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-900"}`}
                        ></div>
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          Timeline
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Registration
                          </label>
                          <p
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {new Date(student.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <div className="group/item">
                          <label
                            className={`text-xs font-medium uppercase tracking-wider block mb-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Status
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span
                              className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              Currently Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2 w-full max-w-4xl">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
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
            onClick={handleNext}
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
    </div>
  );
}
