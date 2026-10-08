import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";

const StudentStatus = ({ darkMode }) => {
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
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchIssuedBooks(); // call fetch every 1 minute
    }, 60000); // 60000 ms = 1 minute

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3002/api/books/admin/issued-books",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Only keep not returned books
      const notReturned = data.issuedBooks.filter((b) => !b.returnDate);

      // Fetch due dates for each issued book
      const booksWithDueDates = await Promise.all(
        notReturned.map(async (book) => {
          // Get the due date from the same API used in StudentIssuedBooks
          const fineRes = await axios.get(
            `http://localhost:3002/api/fines/calculate/${book._id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );

          return {
            ...book,
            dueDate: fineRes.data.dueDate, // Add due date from API
            fine: fineRes.data.fine, // add this line to include fine amount in the book object
          };
        }),
      );

      // If book details are not fully populated, fetch them
      if (
        booksWithDueDates.length > 0 &&
        !booksWithDueDates[0].bookId?.category
      ) {
        // Fetch all books to get complete details
        const booksResponse = await axios.get(
          "http://localhost:3002/api/books",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        // Create a map of book IDs to book objects for quick lookup
        const booksMap = {};
        booksResponse.data.books.forEach((book) => {
          booksMap[book._id] = book;
        });

        // Update each issued book with complete book details
        const updatedIssuedBooks = booksWithDueDates.map((item) => {
          // Handle case where bookId might be a string ID rather than an object
          if (typeof item.bookId === "string") {
            return {
              ...item,
              bookId: booksMap[item.bookId] || {
                _id: item.bookId,
                title: "Unknown Book",
              },
            };
          }
          // Handle case where bookId is an object but missing details
          else if (item.bookId && !item.bookId.category) {
            return {
              ...item,
              bookId: booksMap[item.bookId._id] || item.bookId,
            };
          }
          return item;
        });

        setIssuedBooks(updatedIssuedBooks || []);
      } else {
        setIssuedBooks(booksWithDueDates || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch issued books ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issuedId) => {
    try {
      const book = issuedBooks.find((b) => b._id === issuedId);
      if (book.fine && book.fine > 0 && !book.paid) {
        toast.error("Cannot return: Student has pending fine!");
        return;
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:3002/api/books/return/${issuedId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(data.message);

      // Remove returned book from state immediately
      setIssuedBooks((prev) => prev.filter((b) => b._id !== issuedId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to return book ❌");
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Format date as "Feb 12th, 2026"
  const formatIssueDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    return (
      date.toLocaleString("en-US", { month: "short" }) +
      ` ${day}${daySuffix}, ${date.getFullYear()}`
    );
  };

  // Add this function near your formatIssueDate function
  const CalculateReturnDate = (issueDate, dueDate) => {
    // If dueDate is available from API, use it
    if (dueDate) {
      return new Date(dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Fallback to client-side calculation (only if API doesn't provide dueDate)
    const date = new Date(issueDate);
    date.setMonth(date.getMonth() + 3);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // --- ADVANCED SEARCH STATE VARIABLES ---
  useEffect(() => {
    let results = [...issuedBooks]; // Start with all issued books

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const lowercasedSearch = mainSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(lowercasedSearch) ||
          item.studentId?.lastName?.toLowerCase().includes(lowercasedSearch) ||
          item.studentId?.username?.toLowerCase().includes(lowercasedSearch) ||
          item.bookId?.title?.toLowerCase().includes(lowercasedSearch) ||
          item.bookId?.isbn?.includes(lowercasedSearch),
      );
    }

    // Apply student name search if it exists (from filter options)
    if (studentNameSearch) {
      const lowercasedSearch = studentNameSearch.toLowerCase();
      results = results.filter(
        (item) =>
          item.studentId?.firstName?.toLowerCase().includes(lowercasedSearch) ||
          item.studentId?.lastName?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply student username search if it exists (from filter options)
    if (studentUsernameSearch) {
      const lowercasedSearch = studentUsernameSearch.toLowerCase();
      results = results.filter((item) =>
        item.studentId?.username?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply book title search if it exists (from filter options)
    if (bookTitleSearch) {
      const lowercasedSearch = bookTitleSearch.toLowerCase();
      results = results.filter((item) =>
        item.bookId?.title?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply book ISBN search if it exists (from filter options)
    if (bookIsbnSearch) {
      const lowercasedSearch = bookIsbnSearch.toLowerCase();
      results = results.filter((item) =>
        item.bookId?.isbn?.includes(lowercasedSearch),
      );
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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    // <div className="p-5 flex-1 overflow-auto text-base">
    <div className="p-1 flex-1 min-w-0 overflow-y-auto text-base">
      {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-700">
        Student Status
      </h1> */}

      {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
      <div className="mb-4 w-full max-w-2xl mx-auto">
        <div className="relative w-full">
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

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No issued books found.</p>
      ) : (
        // <div className="overflow-x-auto w-full">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="min-w-[900px] border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-2 py-2">Book</th>
                <th className="px-4 py-2"> Issue & Due Dates </th>
                <th className="px-4 py-2">Fine</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <React.Fragment key={item._id}>
                  <tr
                    className={`border-b-2 border-t-2 border-gray-400 transition-colors duration-200 hover:bg-opacity-50 ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-800/50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? "bg-blue-900/50" : "bg-blue-100"
                          }`}
                        >
                          <svg
                            className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
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
                        <div>
                          <p
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {item.studentId?.firstName}{" "}
                            {item.studentId?.lastName}
                          </p>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                          >
                            @{item.studentId?.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div
                        className={`max-w-xs ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        <p className="font-medium truncate">
                          {item.bookId?.title}
                        </p>
                        <p
                          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {item.bookId?.author}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <b>Issued: </b> {formatIssueDate(item.issueDate)}
                        </span>
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <b> Due: </b>{" "}
                          {CalculateReturnDate(item.issueDate, item.dueDate)}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.returnDate
                              ? darkMode
                                ? "bg-green-900/50 text-green-300"
                                : "bg-green-100 text-green-800"
                              : item.fine && item.fine > 0 && !item.paid
                                ? darkMode
                                  ? "bg-red-900/50 text-red-300"
                                  : "bg-red-100 text-red-800"
                                : darkMode
                                  ? "bg-blue-900/50 text-blue-300"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <span className="w-1 h-1 mr-1 rounded-full bg-current"></span>
                          {item.returnDate
                            ? "Returned"
                            : item.fine && item.fine > 0 && !item.paid
                              ? "Pending"
                              : "OK"}
                        </span>
                        {item.fine && item.fine > 0 && (
                          <span
                            className={`text-sm font-semibold ${darkMode ? "text-red-400" : "text-red-600"}`}
                          >
                            {item.fine}/-
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleRow(item._id)}
                          className={`p-2 rounded-lg transition-colors border border-gray-400 ${
                            darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          title="View Details"
                        >
                          <AiOutlineEye size={18} />
                        </button>

                        <button
                          disabled={
                            item.returnDate ||
                            (item.fine && item.fine > 0 && !item.paid)
                          }
                          onClick={() => handleReturn(item._id)}
                          className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1 ${
                            item.returnDate ||
                            (item.fine && item.fine > 0 && !item.paid)
                              ? darkMode
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : darkMode
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                          title="Return Book"
                        >
                          <span
                            className={`inline-block w-2.5 h-2.5 rounded-full ${
                              item.returnDate ||
                              (item.fine && item.fine > 0 && !item.paid)
                                ? "bg-gray-400"
                                : "bg-green-500"
                            }`}
                          />
                          Return
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Details */}
                  {expandedRow === item._id && (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <div
                          className={`relative overflow-hidden transition-all duration-500 ${
                            darkMode
                              ? "bg-gradient-to-b from-gray-800 to-gray-900"
                              : "bg-gradient-to-b from-gray-50 to-white"
                          }`}
                        >
                          {/* Decorative top border */}
                          <div
                            className={`h-1 ${darkMode ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`}
                          ></div>

                          <div className="p-6 max-w-5xl mx-auto">
                            {/* Header with title */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    darkMode
                                      ? "bg-indigo-900/50"
                                      : "bg-indigo-100"
                                  }`}
                                >
                                  <svg
                                    className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <h3
                                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                                >
                                  Book Issue Details
                                </h3>
                              </div>
                              <button
                                onClick={() => setExpandedRow(null)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  darkMode
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <span className="flex items-center gap-2">
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                  Close
                                </span>
                              </button>
                            </div>

                            {/* Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Student Information */}
                              <div
                                className={`p-4 rounded-xl ${darkMode ? "bg-gray-800/50" : "bg-white/80"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <div
                                    className={`w-2 h-2 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-600"}`}
                                  ></div>
                                  <h4
                                    className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    Student Information
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Name
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.studentId?.firstName}{" "}
                                      {item.studentId?.lastName}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Roll No
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.studentId?.rollNo}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Degree
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.studentId?.degree}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Program
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.studentId?.program}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Email
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.studentId?.email}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Book Information */}
                              <div
                                className={`p-4 rounded-xl ${darkMode ? "bg-gray-800/50" : "bg-white/80"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <div
                                    className={`w-2 h-2 rounded-full ${darkMode ? "bg-purple-400" : "bg-purple-600"}`}
                                  ></div>
                                  <h4
                                    className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    Book Information
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Title
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.title}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Author
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.author}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      ISBN
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.isbn}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Category
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {item.bookId?.category || "Not specified"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Issue Information */}
                              <div
                                className={`p-4 rounded-xl ${darkMode ? "bg-gray-800/50" : "bg-white/80"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                              >
                                <div className="flex items-center gap-2 mb-4">
                                  <div
                                    className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-600"}`}
                                  ></div>
                                  <h4
                                    className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    Issue Information
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Issue Date
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {formatIssueDate(item.issueDate)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Return Date
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {CalculateReturnDate(
                                        item.issueDate,
                                        item.dueDate,
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Status
                                    </span>
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        item.returnDate
                                          ? darkMode
                                            ? "bg-green-900/50 text-green-300"
                                            : "bg-green-100 text-green-800"
                                          : item.fine &&
                                              item.fine > 0 &&
                                              !item.paid
                                            ? darkMode
                                              ? "bg-red-900/50 text-red-300"
                                              : "bg-red-100 text-red-800"
                                            : darkMode
                                              ? "bg-yellow-900/50 text-yellow-300"
                                              : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      <span className="w-2 h-2 mr-1 rounded-full bg-current"></span>
                                      {item.returnDate
                                        ? "Returned"
                                        : item.fine &&
                                            item.fine > 0 &&
                                            !item.paid
                                          ? "Fine Pending"
                                          : "Issued"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Fine
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${item.fine && item.fine > 0 ? (darkMode ? "text-red-400" : "text-red-600") : darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      {item.fine || 0} pkr
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer with additional info */}
                            <div
                              className={`mt-6 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                  <span
                                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                  >
                                    {item.returnDate
                                      ? "Book returned successfully"
                                      : `Book should be returned by ${CalculateReturnDate(item.issueDate)}`}
                                  </span>
                                </div>
                                <div
                                  className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                                >
                                  Issue ID: {item._id}
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

          {/* Pagination */}
          {/* <div className="flex justify-center mt-4 gap-2"> */}
          {/* Pagination — OUTSIDE overflow-x-auto */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
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
        </div>
      )}
    </div>
  );
};

export default StudentStatus;
