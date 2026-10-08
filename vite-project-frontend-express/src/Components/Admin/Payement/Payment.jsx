// // src/Components/Admin/Payment/Payment.jsx (Completely Updated)

// import React, { useEffect, useState, useMemo } from "react";
// import AdminSidebar from "../Sidebar/AdminSidebar";
// import AdminNavbar from "../Navbar/AdminNavbar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { FaSearch, FaUser, FaCheckCircle, FaSpinner } from "react-icons/fa";

// const Payment = ({ darkMode }) => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [verifyingId, setVerifyingId] = useState(null);
//   const token = localStorage.getItem("token");

//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/fines/admin/payment-requests", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRequests(response.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch payment requests.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [token]);

//   const handleVerifyRequest = async (requestId) => {
//     if (
//       !window.confirm(
//         "Are you sure you have verified this payment? This will clear the student's fines.",
//       )
//     )
//       return;

//     setVerifyingId(requestId);
//     try {
//       await axios.post(
//         `/api/fines/admin/verify-request/${requestId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       // Refresh the list
//       fetchRequests();
//       alert("Payment verified and fines cleared successfully!");
//     } catch (err) {
//       setError("Failed to verify payment.");
//       console.error(err);
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   const summaryData = useMemo(() => {
//     const totalPending = requests.length;
//     const totalAmount = requests.reduce(
//       (sum, r) => sum + r.paymentId.totalAmount + r.paymentId.currentLateFee,
//       0,
//     );
//     return { totalPending, totalAmount };
//   }, [requests]);

//   const filteredRequests = useMemo(() => {
//     if (!searchTerm) return requests;
//     const lowerCaseTerm = searchTerm.toLowerCase();
//     return requests.filter(
//       (req) =>
//         req.studentId?.firstName?.toLowerCase().includes(lowerCaseTerm) ||
//         req.studentId?.lastName?.toLowerCase().includes(lowerCaseTerm) ||
//         req.studentId?.email?.toLowerCase().includes(lowerCaseTerm) ||
//         req.paymentId?.challanNumber?.toLowerCase().includes(lowerCaseTerm),
//     );
//   }, [requests, searchTerm]);

//   // --- Styling Variables (same as before) ---
//   const mainBg = "bg-gray-50 dark:bg-slate-900";
//   const cardBg = "bg-white dark:bg-slate-800";
//   const textColor = "text-slate-900 dark:text-slate-100";
//   const subTextColor = "text-slate-600 dark:text-slate-400";
//   const borderColor = "border-slate-200 dark:border-slate-700";
//   const hoverBg = "hover:bg-gray-50 dark:hover:bg-slate-700/50";

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
//                 Payment Verification Queue
//               </h1>
//               <p className={`text-lg ${subTextColor}`}>
//                 Verify payment confirmations submitted by students.
//               </p>
//             </div>

//             {/* --- Summary Cards --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div
//                 className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${subTextColor}`}>
//                       Pending Verifications
//                     </p>
//                     <p className={`text-3xl font-bold mt-1 ${textColor}`}>
//                       {summaryData.totalPending}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-4 rounded-full bg-teal-100 dark:bg-teal-900/30`}
//                   >
//                     <FaUser className="text-2xl text-teal-600 dark:text-teal-400" />
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`text-sm font-medium ${subTextColor}`}>
//                       Total Pending Amount
//                     </p>
//                     <p className={`text-3xl font-bold mt-1 ${textColor}`}>
//                       Rs. {summaryData.totalAmount}
//                     </p>
//                   </div>
//                   <div
//                     className={`p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30`}
//                   >
//                     <FaDollarSign className="text-2xl text-emerald-600 dark:text-emerald-400" />
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
//                 className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 ${cardBg} ${borderColor} placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${textColor}`}
//                 placeholder="Search by student name, email, or challan number..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* --- Content Area --- */}
//             <div
//               className={`${cardBg} rounded-xl shadow-lg overflow-hidden border ${borderColor}`}
//             >
//               {loading && (
//                 <div className="p-8 text-center">
//                   {" "}
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>{" "}
//                   <p className={`mt-4 ${subTextColor}`}>
//                     Loading requests...
//                   </p>{" "}
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
//                             Challan Details
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Requested On
//                           </th>
//                           <th
//                             className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${subTextColor}`}
//                           >
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                         {filteredRequests.length === 0 ? (
//                           <tr>
//                             <td colSpan="4" className="p-8 text-center">
//                               <FaCheckCircle
//                                 className={`mx-auto h-12 w-12 ${subTextColor} mb-4`}
//                               />
//                               <p className={`text-lg font-medium ${textColor}`}>
//                                 No Pending Requests
//                               </p>
//                               <p className={`mt-1 ${subTextColor}`}>
//                                 {searchTerm
//                                   ? "Try adjusting your search."
//                                   : "All payment requests are up to date."}
//                               </p>
//                             </td>
//                           </tr>
//                         ) : (
//                           filteredRequests.map((req) => (
//                             <tr
//                               key={req._id}
//                               className={`transition-colors ${hoverBg}`}
//                             >
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                   <div className="flex-shrink-0 h-10 w-10">
//                                     <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
//                                       <FaUser className="h-5 w-5 text-slate-500 dark:text-slate-300" />
//                                     </div>
//                                   </div>
//                                   <div className="ml-4">
//                                     <div
//                                       className={`text-sm font-medium ${textColor}`}
//                                     >
//                                       {req.studentId?.firstName}{" "}
//                                       {req.studentId?.lastName}
//                                     </div>
//                                     <div className={`text-sm ${subTextColor}`}>
//                                       {req.studentId?.email}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <p
//                                   className={`text-sm font-semibold ${textColor}`}
//                                 >
//                                   Rs.{" "}
//                                   {req.paymentId.totalAmount +
//                                     req.paymentId.currentLateFee}
//                                 </p>
//                                 <p className={`text-xs ${subTextColor}`}>
//                                   Challan: {req.paymentId.challanNumber}
//                                 </p>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className={`text-sm ${subTextColor}`}>
//                                   {new Date(
//                                     req.requestedAt,
//                                   ).toLocaleDateString()}
//                                 </div>
//                               </td>
//                               <td className="px-6 py-4 whitespace-nowrap">
//                                 <button
//                                   onClick={() => handleVerifyRequest(req._id)}
//                                   disabled={verifyingId === req._id}
//                                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                                 >
//                                   {verifyingId === req._id ? (
//                                     <>
//                                       <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />{" "}
//                                       Verifying...
//                                     </>
//                                   ) : (
//                                     <>
//                                       <FaCheckCircle className="-ml-1 mr-2 h-4 w-4" />{" "}
//                                       Verify
//                                     </>
//                                   )}
//                                 </button>
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

// export default Payment;

//--------------------------------------------------------------

// src/Components/Admin/Payment/Payment.jsx

import React, { useEffect, useState, useMemo } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";
import FooterAll from "../../Footer/FooterAll";
import axios from "axios";
import {
  FaSearch,
  FaUser,
  FaCheckCircle,
  FaSpinner,
  FaDollarSign,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = ({ darkMode }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [verifyingId, setVerifyingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10; // ya jitna dikhana chahte ho

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/fines/admin/payment-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Payment.jsx response:", response.data);
      // ✅ response.data.payments is the actual array
      setRequests(response.data.payments || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch payment requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRequests();

    // Set interval for auto-refresh every 1 minute
    const interval = setInterval(() => {
      fetchRequests();
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [token]);

  // Reset current page to 1 whenever search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleVerifyRequest = async (requestId) => {
    if (
      !window.confirm(
        "Are you sure you have verified this payment? This will clear the student's fines.",
      )
    )
      return;

    setVerifyingId(requestId);
    try {
      await axios.post(
        `/api/fines/admin/verify-request/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      fetchRequests();
      // alert("Payment verified and fines cleared successfully!");
      toast.success("Payment verified and fines cleared successfully!");
    } catch (err) {
      setError("Failed to verify payment.");
      console.error(err);
    } finally {
      setVerifyingId(null);
    }
  };

  const summaryData = useMemo(() => {
    const totalPending = requests.length;

    const totalAmount = requests.reduce(
      (sum, r) => sum + (r.totalAmount || 0),
      0,
    );

    return { totalPending, totalAmount };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    if (!searchTerm) return requests;
    const lowerCaseTerm = searchTerm.toLowerCase();
    return requests.filter(
      (req) =>
        req.studentId?.firstName?.toLowerCase().includes(lowerCaseTerm) ||
        req.studentId?.lastName?.toLowerCase().includes(lowerCaseTerm) ||
        req.studentId?.email?.toLowerCase().includes(lowerCaseTerm) ||
        req.studentId?.cnic?.toLowerCase().includes(lowerCaseTerm) ||
        req.studentId?.username?.toLowerCase().includes(lowerCaseTerm) ||
        req.paymentId?.challanNumber?.toLowerCase().includes(lowerCaseTerm),
    );
  }, [requests, searchTerm]);

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest,
  );
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // --- Conditional Styling Function ---
  const getStyles = () => ({
    mainBg: darkMode ? "bg-gray-900" : "bg-gray-50",
    cardBg: darkMode ? "bg-gray-800" : "bg-white",
    textColor: darkMode ? "text-slate-100" : "text-slate-900",
    subTextColor: darkMode ? "text-slate-400" : "text-slate-600",
    borderColor: darkMode ? "border-gray-700" : "border-gray-200",
    hoverBg: darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
    iconBg1: darkMode ? "bg-teal-900/30" : "bg-teal-100",
    iconColor1: darkMode ? "text-blue-500" : "text-blue-500",
    iconBg2: darkMode ? "bg-emerald-900/30" : "bg-emerald-100",
    iconColor2: darkMode ? "text-orange-400" : "text-orange-400",
    avatarBg: darkMode ? "bg-slate-600" : "bg-slate-200",
    avatarIconColor: darkMode ? "text-slate-300" : "text-slate-500",
    codeBg: darkMode
      ? "bg-slate-700 text-slate-300"
      : "bg-gray-100 text-gray-800",
    spinnerBorder: darkMode ? "border-emerald-500" : "border-green-500",
  });

  const styles = getStyles();

  return (
    <div className="min-h-screen">
      <AdminNavbar darkMode={darkMode} />
      <div className="flex">
        <AdminSidebar darkMode={darkMode} />
        <main className={`flex-1 p-6 md:p-8 ${styles.mainBg}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              {/* Label */}
              {/* <div className="flex items-center mb-3">
                <div className="h-1 w-10 rounded-full bg-black mr-3"></div>
              </div> */}

              {/* Title */}
              <h1
                className={`text-4xl md:text-3xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Payment Verification Queue
              </h1>

              {/* Subtitle */}
              {/* <p
                className={`text-lg mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Verify payment confirmations submitted by students.
              </p> */}
            </div>

            {/* --- Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className={`${styles.cardBg} rounded-xl hover:shadow-lg p-6 border ${styles.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${styles.subTextColor}`}>
                      Pending Verifications
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 ${styles.textColor}`}
                    >
                      {summaryData.totalPending}
                    </p>
                  </div>
                  <div className={`p-4 rounded-md ${styles.iconBg1}`}>
                    <FaUser className={`text-2xl ${styles.iconColor1}`} />
                  </div>
                </div>
              </div>
              <div
                className={`${styles.cardBg} rounded-xl hover:shadow-lg p-6 border ${styles.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${styles.subTextColor}`}>
                      Total Pending Amount
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 ${styles.textColor}`}
                    >
                      Rs. {summaryData.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-4 rounded-md ${styles.iconBg2}`}>
                    <FaDollarSign className={`text-2xl ${styles.iconColor2}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* --- Search Bar --- */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className={`h-5 w-5 ${styles.subTextColor}`} />
              </div>
              <input
                type="text"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 ${styles.cardBg} ${styles.borderColor} placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${styles.textColor}`}
                placeholder="Search by student name, email, or challan number..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* --- Content Area --- */}
            <div
              className={`${styles.cardBg} rounded-xl hover:shadow-lg overflow-hidden border ${styles.borderColor}`}
            >
              {loading && (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                  <p className={`mt-4 ${styles.subTextColor}`}>
                    Loading requests...
                  </p>
                </div>
              )}
              {error && (
                <div className="p-8 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              {!loading && !error && (
                <>
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
                            Challan Details
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                          >
                            Requested On
                          </th>
                          <th
                            className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${styles.subTextColor}`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                      >
                        {filteredRequests.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="p-8 text-center">
                              <FaCheckCircle
                                className={`mx-auto h-12 w-12 ${styles.subTextColor} mb-4`}
                              />
                              <p
                                className={`text-lg font-medium ${styles.textColor}`}
                              >
                                No Pending Requests
                              </p>
                              <p className={`mt-1 ${styles.subTextColor}`}>
                                {searchTerm
                                  ? "Try adjusting your search."
                                  : "All payment requests are up to date."}
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredRequests.map((req) => (
                            <tr
                              key={req._id}
                              className={`transition-colors ${styles.hoverBg}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <div
                                      className={`h-10 w-10 rounded-full ${styles.avatarBg} flex items-center justify-center`}
                                    >
                                      <FaUser
                                        className={`h-5 w-5 ${styles.avatarIconColor}`}
                                      />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div
                                      className={`text-sm font-medium ${styles.textColor}`}
                                    >
                                      {req.studentId?.firstName || "N/A"}{" "}
                                      {req.studentId?.lastName || ""}
                                    </div>
                                    <div
                                      className={`text-sm ${styles.subTextColor}`}
                                    >
                                      <div>{req.studentId?.email || "N/A"}</div>
                                      <div>{req.studentId?.cnic || "N/A"}</div>
                                      <div>
                                        @{req.studentId?.username || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <p
                                  className={`text-sm font-semibold ${styles.textColor}`}
                                >
                                  Rs. {req.totalAmount?.toLocaleString() || 0}
                                </p>

                                <p className={`text-xs ${styles.subTextColor}`}>
                                  Challan:{" "}
                                  {req.paymentId?.challanNumber || "N/A"}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div
                                  className={`text-sm ${styles.subTextColor}`}
                                >
                                  {new Date(req.requestedAt).toLocaleDateString(
                                    "en-GB",
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleVerifyRequest(req._id)}
                                  disabled={verifyingId === req._id}
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-green-600 bg-green-100 hover:bg-emerald-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                  {verifyingId === req._id ? (
                                    <>
                                      <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />{" "}
                                      Verifying...
                                    </>
                                  ) : (
                                    <>
                                      <span className="inline-block -ml-1 mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></span>{" "}
                                      Verify
                                    </>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    {filteredRequests.length > 5 && (
                      <div className="flex justify-center mt-6 space-x-1">
                        <button
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded border border-black font-bold ${
                            currentPage === 1
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          Prev
                        </button>

                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1,
                        )
                          .filter(
                            (page) =>
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1),
                          )
                          .map((page, idx, arr) => (
                            <React.Fragment key={page}>
                              {idx > 0 && arr[idx - 1] !== page - 1 && (
                                <span className="px-2 text-gray-400">...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded border border-black font-bold ${
                                  currentPage === page
                                    ? "bg-gray-700 text-white font-bold"
                                    : "bg-white text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}

                        <button
                          onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                          }
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
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <FooterAll darkMode={darkMode} />
    </div>
  );
};

export default Payment;
