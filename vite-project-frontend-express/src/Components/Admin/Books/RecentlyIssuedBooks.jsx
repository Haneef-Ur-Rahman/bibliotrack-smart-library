import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";

const RecentlyIssuedBooks = ({ darkMode }) => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [mainSearch, setMainSearch] = useState("");
  const [studentNameSearch, setStudentNameSearch] = useState("");
  const [studentUsernameSearch, setStudentUsernameSearch] = useState("");
  const [bookTitleSearch, setBookTitleSearch] = useState("");
  const [bookIsbnSearch, setBookIsbnSearch] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  // --- FILTERING LOGIC ---
  // Agar aapke paas pehle se `filteredData` variable hai, toh use hata kar yeh `useEffect` aur `useState` paste karen.
  const [filteredData, setFilteredData] = useState(issuedBooks);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    let results = [...issuedBooks]; // Start with all issued books

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const term = mainSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(term) ||
          item.studentId?.lastName?.toLowerCase().includes(term) ||
          item.studentId?.username?.toLowerCase().includes(term) ||
          item.bookId?.title?.toLowerCase().includes(term) ||
          item.bookId?.isbn.includes(term),
      );
    }

    // Apply student name search if it exists (from filter options)
    if (studentNameSearch) {
      const term = studentNameSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(term) ||
          item.studentId?.lastName?.toLowerCase().includes(term),
      );
    }

    // Apply student username search if it exists (from filter options)
    if (studentUsernameSearch) {
      const term = studentUsernameSearch.toLowerCase();
      results = results.filter((item) =>
        item.studentId?.username?.toLowerCase().includes(term),
      );
    }

    // Apply book title search if it exists (from filter options)
    if (bookTitleSearch) {
      const term = bookTitleSearch.toLowerCase();
      results = results.filter((item) =>
        item.bookId?.title?.toLowerCase().includes(term),
      );
    }

    // Apply book ISBN search if it exists (from filter options)
    if (bookIsbnSearch) {
      const term = bookIsbnSearch.toLowerCase();
      results = results.filter((item) => item.bookId?.isbn.includes(term));
    }

    // Apply alphabet filter if it exists (by book title)
    if (alphabetFilter) {
      const filteredByAlphabet = results.filter((item) => {
        const firstLetter = item.bookId.title.charAt(0).toUpperCase();
        return firstLetter === alphabetFilter;
      });
      setFilteredData(filteredByAlphabet);
    } else {
      setFilteredData(results);
    }
  }, [
    issuedBooks,
    mainSearch,
    studentNameSearch,
    studentUsernameSearch,
    bookTitleSearch,
    bookIsbnSearch,
  ]);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3002/api/books/admin/issued-books",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // ✅ Only keep books that are NOT returned
      const notReturnedBooks = data.issuedBooks.filter((b) => !b.returnDate);
      setIssuedBooks(notReturnedBooks);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch issued books ❌");
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // --- ADVANCED SEARCH STATE VARIABLES ---
  useEffect(() => {
    let results = [...issuedBooks]; // Start with all issued books

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const term = mainSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(term) ||
          item.studentId?.lastName?.toLowerCase().includes(term) ||
          item.studentId?.username?.toLowerCase().includes(term) ||
          item.bookId?.title?.toLowerCase().includes(term) ||
          item.bookId?.isbn.includes(term),
      );
    }

    // Apply student name search if it exists (from filter options)
    if (studentNameSearch) {
      const term = studentNameSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(term) ||
          item.studentId?.lastName?.toLowerCase().includes(term),
      );
    }

    // Apply student username search if it exists (from filter options)
    if (studentUsernameSearch) {
      const term = studentUsernameSearch.toLowerCase();
      results = results.filter((item) =>
        item.studentId?.username?.toLowerCase().includes(term),
      );
    }

    // Apply book title search if it exists (from filter options)
    if (bookTitleSearch) {
      const term = bookTitleSearch.toLowerCase();
      results = results.filter((item) =>
        item.bookId?.title?.toLowerCase().includes(term),
      );
    }

    // Apply book ISBN search if it exists (from filter options)
    if (bookIsbnSearch) {
      const term = bookIsbnSearch.toLowerCase();
      results = results.filter((item) => item.bookId?.isbn.includes(term));
    }

    // Apply alphabet filter if it exists (by book title)
    if (alphabetFilter) {
      results = results.filter((item) => {
        if (!item.bookId?.title) return false;
        const firstChar = item.bookId.title.charAt(0).toUpperCase();
        return firstChar === alphabetFilter.toUpperCase();
      });
    }

    setFilteredData(results);
    setCurrentPage(1); // Reset to first page on any filter change
  }, [
    mainSearch,
    studentNameSearch,
    studentUsernameSearch,
    bookTitleSearch,
    bookIsbnSearch,
    alphabetFilter,
    issuedBooks,
  ]);

  // --- HELPER FUNCTIONS ---
  // Updated clearAllSearches function
  const clearAllSearches = () => {
    setMainSearch("");
    setStudentNameSearch("");
    setStudentUsernameSearch("");
    setBookTitleSearch("");
    setBookIsbnSearch("");
    setAlphabetFilter("");
  };

  // Updated hasActiveSearch check ( agar aapko kahin use karna ho toh )
  const hasActiveSearch =
    mainSearch ||
    studentNameSearch ||
    studentUsernameSearch ||
    bookTitleSearch ||
    bookIsbnSearch ||
    alphabetFilter;

  // 📄 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
      <div className="flex justify-center mb-4">
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
                placeholder="Search student / book..."
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
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="First or last name..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={studentNameSearch}
                    onChange={(e) => setStudentNameSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Student Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={studentUsernameSearch}
                    onChange={(e) => setStudentUsernameSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="Book title..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={bookTitleSearch}
                    onChange={(e) => setBookTitleSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Book ISBN
                  </label>
                  <input
                    type="text"
                    placeholder="ISBN..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${
                      darkMode
                        ? "bg-slate-700 text-white border-slate-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={bookIsbnSearch}
                    onChange={(e) => setBookIsbnSearch(e.target.value)}
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
                  Browse by Book Title First Letter
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

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No issued books found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white">
                <tr>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Book</th>
                  <th className="px-4 py-2">Issue Date</th>
                  <th className="px-4 py-2 text-center">Details</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <React.Fragment key={item._id}>
                    {/* <tr className="border-b hover:bg-gray-50"> */}
                    <tr
                      className={`border-b transition-colors duration-300 hover:bg-gray-50 hover:text-black ${
                        darkMode
                          ? "bg-gray-900 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <td className="px-2 py-2">
                        {item.studentId?.firstName} {item.studentId?.lastName}
                      </td>
                      <td
                        className="px-4 py-2 max-w-[220px] truncate"
                        title={item.bookId?.title}
                      >
                        {item.bookId?.title}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.issueDate).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleRow(item._id)}
                          className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        >
                          <AiOutlineEye />
                        </button>
                      </td>
                    </tr>

                    {/* Details View */}
                    {expandedRow === item._id && (
                      <tr>
                        <td colSpan="4" className="p-0">
                          <div
                            className={`max-w-4xl mx-auto my-2 ${darkMode ? "bg-slate-900" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}
                          >
                            {/* Header Section */}
                            <div
                              className={`px-6 py-4 border-b ${darkMode ? "border-slate-800 bg-slate-900/50" : "border-gray-100 bg-gray-50"}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3
                                      className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      Student Details
                                    </h3>
                                    <p
                                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      Borrowing Information
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setExpandedRow(null)}
                                  className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-slate-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Student Information Section */}
                                <div>
                                  <div className="flex items-center gap-2 mb-4">
                                    <div
                                      className={`w-2 h-2 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-600"}`}
                                    ></div>
                                    <h4
                                      className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      Student Information
                                    </h4>
                                  </div>

                                  <div className="space-y-3">
                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        Username
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.username}
                                      </p>
                                    </div>

                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        Email
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.email}
                                      </p>
                                    </div>

                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        CNIC
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.cnic}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Academic & Book Information Section */}
                                <div>
                                  <div className="flex items-center gap-2 mb-4">
                                    <div
                                      className={`w-2 h-2 rounded-full ${darkMode ? "bg-purple-400" : "bg-purple-600"}`}
                                    ></div>
                                    <h4
                                      className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      Academic & Book Details
                                    </h4>
                                  </div>

                                  <div className="space-y-3">
                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        Degree
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.degree}
                                      </p>
                                    </div>

                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        Program
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.program}
                                      </p>
                                    </div>

                                    <div
                                      className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                    >
                                      <p
                                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                      >
                                        Roll Number
                                      </p>
                                      <p
                                        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                      >
                                        {item.studentId?.rollNo}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Book Information Section */}
                              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-4">
                                  <div
                                    className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-600"}`}
                                  ></div>
                                  <h4
                                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    Borrowed Book
                                  </h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div
                                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                  >
                                    <p
                                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                    >
                                      Book ISBN
                                    </p>
                                    <p
                                      className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.isbn}
                                    </p>
                                  </div>

                                  <div
                                    className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}
                                  >
                                    <p
                                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
                                    >
                                      Author
                                    </p>
                                    <p
                                      className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.author}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
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
        </>
      )}
    </div>
  );
};

export default RecentlyIssuedBooks;
