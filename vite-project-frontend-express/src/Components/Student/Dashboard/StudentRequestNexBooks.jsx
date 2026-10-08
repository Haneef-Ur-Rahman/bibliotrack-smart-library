// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import {
//   PlusCircle,
//   BookOpen,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// const StudentRequestNewBooks = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState("request");
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     bookTitle: "",
//     author: "",
//     edition: "",
//     category: "",
//     isbn: "",
//   });

//   // 🔐 Token
//   const token = localStorage.getItem("token");

//   // ================= FETCH MY REQUESTS =================
//   const fetchRequests = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:3002/api/books/my-requests",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setRequests(data.requests || []);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load requests");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // ================= FORM CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ================= SUBMIT REQUEST =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.bookTitle || !formData.author) {
//       return toast.error("Book title and author are required");
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.post("/api/books/request-book", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(data.message || "Request submitted");

//       setFormData({
//         bookTitle: "",
//         author: "",
//         edition: "",
//         category: "",
//         isbn: "",
//       });

//       await fetchRequests();
//       setActiveTab("status");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= STATUS UI =================
//   const getStatusIcon = (status) => {
//     if (status === "Approved")
//       return <CheckCircle className="w-5 h-5 text-green-500" />;
//     if (status === "Rejected")
//       return <XCircle className="w-5 h-5 text-red-500" />;
//     return <Clock className="w-5 h-5 text-yellow-500" />;
//   };

//   const getStatusBadgeClass = (status) => {
//     if (status === "Approved")
//       return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
//     if (status === "Rejected")
//       return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
//     return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
//   };

//   // ================= UI =================
//   return (
//     <div
//       className={`flex-1 p-6 ${
//         darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Book Requests 📚
//         </h1>

//         {/* TABS */}
//         <div className="flex justify-center mb-8 border-b">
//           <button
//             onClick={() => setActiveTab("request")}
//             className={`py-2 px-6 border-b-2 ${
//               activeTab === "request"
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-500"
//             }`}
//           >
//             <PlusCircle className="inline w-5 h-5 mr-2" />
//             New Request
//           </button>

//           <button
//             onClick={() => setActiveTab("status")}
//             className={`py-2 px-6 border-b-2 ${
//               activeTab === "status"
//                 ? "border-blue-500 text-blue-600"
//                 : "border-transparent text-gray-500"
//             }`}
//           >
//             <BookOpen className="inline w-5 h-5 mr-2" />
//             My Requests
//           </button>
//         </div>

//         {/* ================= REQUEST FORM ================= */}
//         {activeTab === "request" && (
//           <div
//             className={`p-8 rounded-xl shadow ${
//               darkMode ? "bg-slate-800" : "bg-white"
//             }`}
//           >
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <input
//                 name="bookTitle"
//                 value={formData.bookTitle}
//                 onChange={handleChange}
//                 placeholder="Book Title *"
//                 className="w-full p-3 border rounded"
//               />
//               <input
//                 name="author"
//                 value={formData.author}
//                 onChange={handleChange}
//                 placeholder="Author *"
//                 className="w-full p-3 border rounded"
//               />
//               <input
//                 name="edition"
//                 value={formData.edition}
//                 onChange={handleChange}
//                 placeholder="Edition"
//                 className="w-full p-3 border rounded"
//               />
//               <input
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 placeholder="Category"
//                 className="w-full p-3 border rounded"
//               />
//               <input
//                 name="isbn"
//                 value={formData.isbn}
//                 onChange={handleChange}
//                 placeholder="ISBN"
//                 className="w-full p-3 border rounded"
//               />

//               <button
//                 disabled={loading}
//                 className="w-full py-3 bg-blue-600 text-white rounded"
//               >
//                 {loading ? "Submitting..." : "Submit Request"}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* ================= STATUS LIST ================= */}
//         {activeTab === "status" && (
//           <div className="space-y-4">
//             {requests.length === 0 ? (
//               <div className="text-center p-10 bg-white rounded shadow">
//                 <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//                 No requests found
//               </div>
//             ) : (
//               requests.map((r) => (
//                 <div
//                   key={r._id}
//                   className="p-5 bg-white rounded shadow flex justify-between"
//                 >
//                   <div>
//                     <h3 className="font-bold">{r.bookTitle}</h3>
//                     <p className="text-sm text-gray-600">By {r.author}</p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusBadgeClass(
//                       r.status,
//                     )}`}
//                   >
//                     {getStatusIcon(r.status)}
//                     {r.status}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentRequestNewBooks;

//-----------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  PlusCircle,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  FileText,
  Loader,
} from "lucide-react";

const StudentRequestNewBooks = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("request");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingRequests, setFetchingRequests] = useState(false);

  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    edition: "",
    category: "",
    isbn: "",
  });

  // 🔐 Token
  const token = localStorage.getItem("token");

  // ================= FETCH MY REQUESTS =================
  const fetchRequests = async () => {
    setFetchingRequests(true);
    try {
      const { data } = await axios.get(
        "http://localhost:3002/api/books/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRequests(data.requests || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load requests");
    } finally {
      setFetchingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= FORM CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= SUBMIT REQUEST =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bookTitle || !formData.author) {
      return toast.error("Book title and author are required");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/books/request-book", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message || "Request submitted");

      setFormData({
        bookTitle: "",
        author: "",
        edition: "",
        category: "",
        isbn: "",
      });

      await fetchRequests();
      setActiveTab("status");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= STATUS UI =================
  const getStatusIcon = (status) => {
    if (status === "Approved") return <CheckCircle className="w-5 h-5" />;
    if (status === "Rejected") return <XCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const getStatusBadgeClass = (status) => {
    if (status === "Approved")
      return darkMode
        ? "bg-green-900/30 text-green-400 border-green-800"
        : "bg-green-100 text-green-700 border-green-200";
    if (status === "Rejected")
      return darkMode
        ? "bg-red-900/30 text-red-400 border-red-800"
        : "bg-red-100 text-red-700 border-red-200";
    return darkMode
      ? "bg-amber-900/30 text-amber-400 border-amber-800"
      : "bg-amber-100 text-amber-700 border-amber-200";
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ================= UI =================
  return (
    <div
      className={`flex-1 p-4 md:p-6 ${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Requests</h1>
          <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
            Request new books for the library and track their status
          </p>
        </div> */}

        <div className="flex mb-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-slate-700">
          {/* New Request Tab */}
          <button
            onClick={() => setActiveTab("request")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium transition-all duration-300 rounded-l-xl ${
              activeTab === "request"
                ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white shadow-md"
                : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            New Request
          </button>

          {/* My Requests Tab */}
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-300 rounded-r-xl ${
              activeTab === "status"
                ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white shadow-md"
                : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            My Requests
          </button>
        </div>

        {/* ================= REQUEST FORM ================= */}
        {activeTab === "request" && (
          <div
            className={`p-6 md:p-8 rounded-xl shadow-md ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Request a New Book</h2>
              <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                Fill in the details below to request a book for the library
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="bookTitle"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="bookTitle"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="edition"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    Edition
                  </label>
                  <input
                    id="edition"
                    name="edition"
                    value={formData.edition}
                    onChange={handleChange}
                    placeholder="e.g., 5th Edition"
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="isbn"
                    className={`block mb-2 font-medium ${
                      darkMode ? "text-slate-300" : "text-gray-700"
                    }`}
                  >
                    ISBN
                  </label>
                  <input
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="Enter ISBN number"
                    className={`w-full p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    loading
                      ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white shadow-md hover:shadow-lg"
                  } text-white flex items-center`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STATUS LIST ================= */}
        {activeTab === "status" && (
          <div className="space-y-6">
            {fetchingRequests ? (
              <div className="flex justify-center items-center p-12">
                <div className="flex flex-col items-center">
                  <Loader className="w-10 h-10 animate-spin text-blue-500 mb-3" />
                  <p
                    className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}
                  >
                    Loading your requests...
                  </p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div
                className={`text-center p-12 rounded-xl ${
                  darkMode ? "bg-slate-800" : "bg-white"
                } shadow-md border ${darkMode ? "border-slate-700" : "border-gray-200"}`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-slate-700" : "bg-gray-100"
                  }`}
                >
                  <BookOpen
                    className={`w-10 h-10 ${
                      darkMode ? "text-slate-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  No book requests yet
                </h3>
                <p
                  className={`max-w-md mx-auto mb-6 ${
                    darkMode ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  Start building your library collection by requesting books
                  you'd like to read. Our team will review your requests
                  promptly.
                </p>
                <button
                  onClick={() => setActiveTab("request")}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Make Your First Request
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your Book Requests</h2>
                  <span
                    className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}
                  >
                    {requests.length}{" "}
                    {requests.length === 1 ? "request" : "requests"}
                  </span>
                </div>

                <div className="grid gap-6">
                  {requests.map((r) => (
                    <div
                      key={r._id}
                      className={`relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl ${
                        darkMode ? "bg-slate-800" : "bg-white"
                      } border ${darkMode ? "border-slate-700" : "border-gray-200"}`}
                    >
                      {/* Status indicator on the left */}
                      <div
                        className={`absolute top-0 left-0 h-full w-1 ${
                          r.status === "Approved"
                            ? "bg-green-500"
                            : r.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-amber-500"
                        }`}
                      ></div>

                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-lg ${
                                  darkMode ? "bg-slate-700" : "bg-gray-100"
                                }`}
                              >
                                <BookOpen
                                  className={`w-6 h-6 ${
                                    darkMode
                                      ? "text-slate-400"
                                      : "text-gray-600"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-1">
                                  {r.bookTitle}
                                </h3>
                                <p
                                  className={`mb-2 ${
                                    darkMode
                                      ? "text-slate-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  By {r.author}
                                  {r.edition && (
                                    <span className="ml-2 text-sm font-normal">
                                      ({r.edition})
                                    </span>
                                  )}
                                </p>

                                {r.isbn && (
                                  <div
                                    className={`inline-flex items-center text-sm mb-3 ${
                                      darkMode
                                        ? "text-slate-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <span className="font-medium mr-1">
                                      ISBN:
                                    </span>{" "}
                                    {r.isbn}
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-4 mt-4">
                                  <div
                                    className={`flex items-center text-sm ${
                                      darkMode
                                        ? "text-slate-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Requested on {formatDate(r.createdAt)}
                                  </div>
                                  {r.category && (
                                    <div
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                        darkMode
                                          ? "bg-slate-700 text-slate-300"
                                          : "bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {r.category}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="flex flex-col items-end">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                                  r.status === "Approved"
                                    ? darkMode
                                      ? "bg-green-900/30 text-green-400 border border-green-800"
                                      : "bg-green-100 text-green-700 border border-green-200"
                                    : r.status === "Rejected"
                                      ? darkMode
                                        ? "bg-red-900/30 text-red-400 border border-red-800"
                                        : "bg-red-100 text-red-700 border border-red-200"
                                      : darkMode
                                        ? "bg-amber-900/30 text-amber-400 border border-amber-800"
                                        : "bg-amber-100 text-amber-700 border border-amber-200"
                                }`}
                              >
                                {getStatusIcon(r.status)}
                                <span className="ml-2">{r.status}</span>
                              </span>

                              {/* Status timeline */}
                              <div className="mt-3 text-right">
                                <div
                                  className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}
                                >
                                  {r.status === "Approved" &&
                                    "Your request was approved"}
                                  {r.status === "Rejected" &&
                                    "Your request was not approved"}
                                  {r.status === "Pending" &&
                                    "Your request is under review"}
                                </div>
                              </div>
                            </div>

                            {r.adminNote && (
                              <div
                                className={`max-w-xs p-3 rounded-lg ${
                                  darkMode ? "bg-slate-700/50" : "bg-gray-50"
                                } border-l-4 ${
                                  r.status === "Approved"
                                    ? "border-green-500"
                                    : r.status === "Rejected"
                                      ? "border-red-500"
                                      : "border-amber-500"
                                }`}
                              >
                                <div
                                  className={`text-xs font-medium mb-1 ${
                                    r.status === "Approved"
                                      ? "text-green-500"
                                      : r.status === "Rejected"
                                        ? "text-red-500"
                                        : "text-amber-500"
                                  }`}
                                >
                                  Admin Note
                                </div>
                                <p
                                  className={`text-sm ${
                                    darkMode
                                      ? "text-slate-300"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {r.adminNote}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRequestNewBooks;
