// import React, { useEffect, useState, useCallback } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { AiOutlineCopy } from "react-icons/ai";
// import { FaFileInvoiceDollar, FaCheckCircle } from "react-icons/fa";

// // Utility for conditional classes
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // Inline Alert component (same as before)
// const InlineAlert = ({ message, type, onClose, darkMode }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);
//   const alertStyles =
//     type === "success"
//       ? cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-emerald-900/80 text-white border border-emerald-700/50"
//             : "bg-white/80 text-gray-800 border border-emerald-200/50",
//         )
//       : cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-red-900/80 text-white border border-red-700/50"
//             : "bg-white/80 text-gray-800 border border-red-200/50",
//         );
//   return (
//     <div className={alertStyles}>
//       <span className="flex-1 text-center font-medium">{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
//         aria-label="Close notification"
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// export default function FinePayment({ darkMode }) {
//   const [challan, setChallan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);
//   // --- NEW STATE for confirming payment ---
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [alert, setAlert] = useState({ message: "", type: "", show: false });
//   const token = localStorage.getItem("token");

//   const showAlert = useCallback(
//     (message, type) => setAlert({ show: true, message, type }),
//     [],
//   );
//   const hideAlert = useCallback(
//     () => setAlert({ show: false, message: "", type: "" }),
//     [],
//   );
//   const handleCopyChallan = (text) => {
//     navigator.clipboard.writeText(text);
//     showAlert("Challan number copied to clipboard!", "success");
//   };

//   const fetchChallan = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/fines/student", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setChallan(response.data.challan);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) fetchChallan();
//   }, [token, fetchChallan]);

//   const handleGenerateChallan = async () => {
//     setIsGenerating(true);
//     try {
//       const response = await axios.post(
//         "/api/fines/generate-challan",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setChallan(response.data.challan);
//       showAlert("Challan Generated!", "success");
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 400) {
//           showAlert(err.response.data.message, "error");
//         } else {
//           showAlert(
//             err.response.data.message || "An unexpected error occurred.",
//             "error",
//           );
//         }
//       } else {
//         showAlert("Network error. Please check your connection.", "error");
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // --- NEW HANDLER for confirming payment ---
//   const handleConfirmPayment = async () => {
//     if (
//       !window.confirm(
//         "Are you sure you have paid the fine and want to submit it for verification?",
//       )
//     )
//       return;

//     setIsConfirming(true);
//     try {
//       await axios.post(
//         "/api/fines/confirm-payment",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       showAlert(
//         "Payment confirmation submitted! We will verify it shortly.",
//         "success",
//       );
//       // Re-fetch the challan to update the UI
//       fetchChallan();
//     } catch (err) {
//       showAlert(
//         err.response?.data?.message || "Failed to submit confirmation.",
//         "error",
//       );
//     } finally {
//       setIsConfirming(false);
//     }
//   };

//   const mainStyles = cn(
//     "flex-1 p-4 md:p-8 min-h-screen",
//     darkMode ? "bg-gray-900" : "bg-gray-50",
//   );
//   const titleStyles = cn(
//     "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r",
//     darkMode
//       ? "from-indigo-400 to-purple-400"
//       : "from-indigo-600 to-purple-600",
//   );

//   const totalPayable = challan
//     ? challan.totalAmount + challan.currentLateFee
//     : 0;

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar darkMode={darkMode} />
//         <main className={mainStyles}>
//           <section className="max-w-4xl mx-auto">
//             <header className="mb-8 text-center">
//               <h1 className={titleStyles}>Fine Payment</h1>
//             </header>
//             {alert.show && (
//               <InlineAlert
//                 message={alert.message}
//                 type={alert.type}
//                 onClose={hideAlert}
//                 darkMode={darkMode}
//               />
//             )}

//             {loading ? (
//               <p
//                 className={cn(
//                   "text-center",
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 Loading...
//               </p>
//             ) : !challan ? (
//               <div
//                 className={cn(
//                   "p-8 rounded-2xl shadow-lg text-center",
//                   darkMode ? "bg-gray-800" : "bg-white",
//                 )}
//               >
//                 <p
//                   className={cn(
//                     "text-2xl font-light mb-6",
//                     darkMode ? "text-gray-400" : "text-gray-500",
//                   )}
//                 >
//                   You have no active payment challan.
//                 </p>
//                 <button
//                   onClick={handleGenerateChallan}
//                   disabled={isGenerating}
//                   className={cn(
//                     "px-6 py-3 rounded-lg font-semibold transition-all",
//                     isGenerating
//                       ? "bg-gray-400"
//                       : "bg-indigo-600 hover:bg-indigo-700 text-white",
//                   )}
//                 >
//                   {isGenerating
//                     ? "Checking..."
//                     : "Check for Fines & Generate Challan"}
//                 </button>
//               </div>
//             ) : (
//               <div
//                 className={cn(
//                   "border-2 rounded-lg shadow-2xl overflow-hidden",
//                   darkMode
//                     ? "bg-white text-black border-gray-300"
//                     : "bg-white text-black border-gray-400",
//                 )}
//               >
//                 {/* --- CHALLAN HEADER --- */}
//                 <div className="text-center py-6 border-b-2 border-dashed">
//                   <h2 className="text-3xl font-bold">UNIVERSITY OF PESHAWAR</h2>
//                   <p className="text-lg">Fee Receipt / Challan</p>
//                 </div>

//                 {/* --- CHALLAN DETAILS --- */}
//                 <div className="p-6 space-y-4">
//                   <div className="flex justify-between">
//                     <span className="font-semibold">Challan No:</span>
//                     <div className="flex items-center gap-2">
//                       <span className="font-mono">{challan.challanNumber}</span>
//                       <button
//                         onClick={() => handleCopyChallan(challan.challanNumber)}
//                         className="p-1 rounded hover:bg-gray-200"
//                       >
//                         <AiOutlineCopy size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-semibold">Date:</span>
//                     <span>
//                       {new Date(challan.issueDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                   {challan.dueDate && (
//                     <div className="flex justify-between">
//                       <span className="font-semibold">Due Date:</span>
//                       <span className="text-red-600">
//                         {new Date(challan.dueDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                   )}
//                   <div className="p-6 space-y-4">
//                     {/* ... other details like Challan No, Date, Due Date ... */}
//                     <div className="flex justify-between">
//                       <span className="font-semibold">Student Name:</span>
//                       <span>
//                         {challan.studentId?.firstName}{" "}
//                         {challan.studentId?.lastName}
//                       </span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="font-semibold">CNIC:</span>
//                       <span>{challan.studentId?.cnic}</span>
//                     </div>

//                     <div className="flex justify-between">
//                       <span className="font-semibold">Username:</span>
//                       <span>{challan.studentId?.username}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* --- FEE TABLE --- */}
//                 <div className="px-6">
//                   <table className="w-full text-left">
//                     <thead>
//                       <tr className="border-b-2 border-dashed">
//                         <th className="py-2">S.No</th>
//                         <th className="py-2">Fee Item</th>
//                         <th className="py-2 text-right">Net Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="border-b">
//                         <td className="py-2">1</td>
//                         <td className="py-2">Library Fine</td>
//                         <td className="py-2 text-right">
//                           {challan.totalAmount}.00
//                         </td>
//                       </tr>
//                       {challan.currentLateFee > 0 && (
//                         <tr className="border-b">
//                           <td className="py-2">2</td>
//                           <td className="py-2">Late Fee Charges</td>
//                           <td className="py-2 text-right">
//                             {challan.currentLateFee}.00
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* --- TOTAL, STATUS, and ACTION --- */}
//                 <div className="p-6 space-y-4">
//                   <div className="flex justify-between items-center text-xl font-bold">
//                     <span>Total Fee</span>
//                     <span>{totalPayable}.00</span>
//                   </div>
//                   <div className="flex justify-between items-center text-xl font-bold">
//                     <span>Status</span>
//                     <span
//                       className={cn(
//                         "px-3 py-1 rounded-full text-sm",
//                         challan.status === "paid"
//                           ? "bg-green-200 text-green-800"
//                           : challan.status === "overdue"
//                             ? "bg-red-200 text-red-800"
//                             : "bg-yellow-200 text-yellow-800",
//                       )}
//                     >
//                       {challan.status.toUpperCase()}
//                     </span>
//                   </div>

//                   {/* --- NEW "I HAVE PAID" BUTTON --- */}
//                   {challan.status !== "paid" && (
//                     <div className="mt-6 text-center">
//                       <hr
//                         className={cn(
//                           "my-4 border",
//                           darkMode ? "border-gray-700" : "border-gray-300",
//                         )}
//                       />
//                       <p
//                         className={cn(
//                           "text-sm mb-4",
//                           darkMode ? "text-gray-400" : "text-gray-600",
//                         )}
//                       >
//                         <strong>Instructions:</strong> Copy the challan number
//                         above. Pay the amount using any digital payment app
//                         (e.g., Easypaisa, JazzCash). Click the button below once
//                         you have paid.
//                       </p>
//                       <button
//                         onClick={handleConfirmPayment}
//                         disabled={isConfirming}
//                         className={cn(
//                           "px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center mx-auto",
//                           isConfirming
//                             ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                             : "bg-indigo-600 hover:bg-indigo-700 text-white",
//                         )}
//                       >
//                         {isConfirming ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Submitting...
//                           </>
//                         ) : (
//                           <>
//                             <FaCheckCircle className="-ml-1 mr-2 h-5 w-5" />I
//                             Have Paid
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </section>
//         </main>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//---------------------------------------------------------

// src/components/Student/FinePayment/FinePayment.jsx

// import React, { useEffect, useState, useCallback } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import { AiOutlineCopy, AiOutlineDownload } from "react-icons/ai";
// import {
//   FaFileInvoiceDollar,
//   FaCheckCircle,
//   FaUniversity,
// } from "react-icons/fa";

// // Utility for conditional classes
// const cn = (...classes) => classes.filter(Boolean).join(" ");

// // Inline Alert component
// const InlineAlert = ({ message, type, onClose, darkMode }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);
//   const alertStyles =
//     type === "success"
//       ? cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-emerald-900/80 text-white border border-emerald-700/50"
//             : "bg-white/80 text-gray-800 border border-emerald-200/50",
//         )
//       : cn(
//           "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
//           darkMode
//             ? "bg-red-900/80 text-white border border-red-700/50"
//             : "bg-white/80 text-gray-800 border border-red-200/50",
//         );
//   return (
//     <div className={alertStyles}>
//       <span className="flex-1 text-center font-medium">{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
//         aria-label="Close notification"
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// export default function FinePayment({ darkMode }) {
//   const [challan, setChallan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [alert, setAlert] = useState({ message: "", type: "", show: false });
//   const token = localStorage.getItem("token");

//   const showAlert = useCallback(
//     (message, type) => setAlert({ show: true, message, type }),
//     [],
//   );
//   const hideAlert = useCallback(
//     () => setAlert({ show: false, message: "", type: "" }),
//     [],
//   );

//   const handleCopyChallan = (text) => {
//     navigator.clipboard.writeText(text);
//     showAlert("Challan number copied to clipboard!", "success");
//   };

//   const fetchChallan = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/fines/student", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setChallan(response.data.challan);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) fetchChallan();
//   }, [token, fetchChallan]);

//   const handleGenerateChallan = async () => {
//     setIsGenerating(true);
//     try {
//       const response = await axios.post(
//         "/api/fines/generate-challan",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setChallan(response.data.challan);
//       showAlert("Challan Generated!", "success");
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 400) {
//           showAlert(err.response.data.message, "error");
//         } else {
//           showAlert(
//             err.response.data.message || "An unexpected error occurred.",
//             "error",
//           );
//         }
//       } else {
//         showAlert("Network error. Please check your connection.", "error");
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleConfirmPayment = async () => {
//     if (
//       !window.confirm(
//         "Are you sure you have paid the fine and want to submit it for verification?",
//       )
//     )
//       return;

//     setIsConfirming(true);
//     try {
//       await axios.post(
//         "/api/fines/confirm-payment",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       showAlert(
//         "Payment confirmation submitted! We will verify it shortly.",
//         "success",
//       );
//       fetchChallan();
//     } catch (err) {
//       showAlert(
//         err.response?.data?.message || "Failed to submit confirmation.",
//         "error",
//       );
//     } finally {
//       setIsConfirming(false);
//     }
//   };

//   // --- NEW: Download Challan Function ---
//   const handleDownload = () => {
//     const printWindow = window.open("", "", "width=900,height=650");
//     const student = challan.studentId;
//     const totalPayable = challan.totalAmount + (challan.currentLateFee || 0);

//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Challan - ${challan.challanNumber}</title>
//           <style>
//             body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; }
//             .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
//             .header h1 { margin: 0; font-size: 28px; }
//             .header p { margin: 5px 0 0; font-size: 16px; color: #555; }
//             .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
//             .details-section h3, .details-section p { margin: 0 0 8px; }
//             .details-section p { font-size: 14px; }
//             .fee-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
//             .fee-table th, .fee-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
//             .fee-table th { background-color: #f2f2f2; font-weight: bold; }
//             .fee-table td:last-child { text-align: right; }
//             .footer { border-top: 2px solid #000; padding-top: 20px; }
//             .footer-row { display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
//             .status { padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: normal; text-transform: uppercase; }
//             .status.paid { background: #d4edda; color: #155724; }
//             .status.pending { background: #fff3cd; color: #856404; }
//             .status.overdue { background: #f8d7da; color: #721c24; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>UNIVERSITY OF PESHAWAR</h1>
//             <p>Central Library - Fee Receipt / Challan</p>
//           </div>
//           <div class="details-grid">
//             <div class="details-section">
//               <h3>Student Details</h3>
//               <p><strong>Name:</strong> ${student?.firstName} ${student?.lastName}</p>
//               <p><strong>CNIC:</strong> ${student?.cnic}</p>
//               <p><strong>Username:</strong> ${student?.username}</p>
//             </div>
//             <div class="details-section">
//               <h3>Challan Details</h3>
//               <p><strong>Challan No:</strong> ${challan.challanNumber}</p>
//               <p><strong>Issue Date:</strong> ${new Date(challan.issueDate).toLocaleDateString()}</p>
//               <p><strong>Due Date:</strong> ${challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : "N/A"}</p>
//             </div>
//           </div>
//           <table class="fee-table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Fee Item</th>
//                 <th>Net Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td>Library Fine</td>
//                 <td>${challan.totalAmount}.00</td>
//               </tr>
//               ${challan.currentLateFee > 0 ? `<tr><td>2</td><td>Late Fee Charges</td><td>${challan.currentLateFee}.00</td></tr>` : ""}
//             </tbody>
//           </table>
//           <div class="footer">
//             <div class="footer-row">
//               <span>Total Fee</span>
//               <span>${totalPayable}.00</span>
//             </div>
//             <div class="footer-row">
//               <span>Status</span>
//               <span class="status ${challan.status}">${challan.status}</span>
//             </div>
//           </div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   const mainStyles = cn(
//     "flex-1 p-4 md:p-8 min-h-screen",
//     darkMode ? "bg-gray-900" : "bg-gray-50",
//   );
//   const titleStyles = cn(
//     "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r",
//     darkMode
//       ? "from-indigo-400 to-purple-400"
//       : "from-indigo-600 to-purple-600",
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar darkMode={darkMode} />
//         <main className={mainStyles}>
//           <section className="max-w-4xl mx-auto">
//             <header className="mb-8 text-center">
//               <h1 className={titleStyles}>Fine Payment</h1>
//             </header>
//             {alert.show && (
//               <InlineAlert
//                 message={alert.message}
//                 type={alert.type}
//                 onClose={hideAlert}
//                 darkMode={darkMode}
//               />
//             )}

//             {loading ? (
//               <p
//                 className={cn(
//                   "text-center",
//                   darkMode ? "text-gray-400" : "text-gray-600",
//                 )}
//               >
//                 Loading...
//               </p>
//             ) : !challan ? (
//               <div
//                 className={cn(
//                   "p-8 rounded-2xl shadow-lg text-center",
//                   darkMode ? "bg-gray-800" : "bg-white",
//                 )}
//               >
//                 <p
//                   className={cn(
//                     "text-2xl font-light mb-6",
//                     darkMode ? "text-gray-400" : "text-gray-500",
//                   )}
//                 >
//                   You have no active payment challan.
//                 </p>
//                 <button
//                   onClick={handleGenerateChallan}
//                   disabled={isGenerating}
//                   className={cn(
//                     "px-6 py-3 rounded-lg font-semibold transition-all",
//                     isGenerating
//                       ? "bg-gray-400"
//                       : "bg-indigo-600 hover:bg-indigo-700 text-white",
//                   )}
//                 >
//                   {isGenerating
//                     ? "Checking..."
//                     : "Check for Fines & Generate Challan"}
//                 </button>
//               </div>
//             ) : (
//               <div
//                 className={cn(
//                   "border rounded-2xl shadow-2xl overflow-hidden bg-white text-black",
//                 )}
//               >
//                 {/* --- CHALLAN HEADER --- */}
//                 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-white/20 p-3 rounded-full">
//                       <FaUniversity size={28} />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold">
//                         UNIVERSITY OF PESHAWAR
//                       </h2>
//                       <p className="text-sm opacity-90">
//                         Central Library - Fee Receipt / Challan
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleCopyChallan(challan.challanNumber)}
//                       className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
//                       title="Copy Challan Number"
//                     >
//                       <AiOutlineCopy size={20} />
//                     </button>
//                     <button
//                       onClick={handleDownload}
//                       className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
//                       title="Download Challan"
//                     >
//                       <AiOutlineDownload size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* --- CHALLAN BODY --- */}
//                 <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
//                   {/* Student Details */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//                       Student Details
//                     </h3>
//                     <p>
//                       <span className="font-medium text-gray-600">Name:</span>{" "}
//                       {challan.studentId?.firstName}{" "}
//                       {challan.studentId?.lastName}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-600">CNIC:</span>{" "}
//                       {challan.studentId?.cnic}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-600">
//                         Username:
//                       </span>{" "}
//                       {challan.studentId?.username}
//                     </p>
//                   </div>

//                   {/* Challan Details */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//                       Challan Details
//                     </h3>
//                     <div className="flex justify-between">
//                       <span className="font-medium text-gray-600">
//                         Challan No:
//                       </span>
//                       <span className="font-mono text-sm">
//                         {challan.challanNumber}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="font-medium text-gray-600">Date:</span>
//                       <span>
//                         {new Date(challan.issueDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                     {challan.dueDate && (
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-600">
//                           Due Date:
//                         </span>
//                         <span className="text-red-600 font-semibold">
//                           {new Date(challan.dueDate).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* --- FEE TABLE --- */}
//                 <div className="px-6 pb-6">
//                   <table className="w-full border-separate border-spacing-0">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-300">
//                           S.No
//                         </th>
//                         <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-300">
//                           Fee Item
//                         </th>
//                         <th className="py-3 px-4 text-right font-semibold text-gray-700 border-b-2 border-gray-300">
//                           Net Amount
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td className="py-3 px-4 border-b border-gray-200">
//                           1
//                         </td>
//                         <td className="py-3 px-4 border-b border-gray-200">
//                           Library Fine
//                         </td>
//                         <td className="py-3 px-4 text-right border-b border-gray-200 font-medium">
//                           {challan.totalAmount}.00
//                         </td>
//                       </tr>
//                       {challan.currentLateFee > 0 && (
//                         <tr>
//                           <td className="py-3 px-4 border-b border-gray-200">
//                             2
//                           </td>
//                           <td className="py-3 px-4 border-b border-gray-200">
//                             Late Fee Charges
//                           </td>
//                           <td className="py-3 px-4 text-right border-b border-gray-200 font-medium">
//                             {challan.currentLateFee}.00
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* --- TOTAL, STATUS, and ACTION --- */}
//                 <div
//                   className={cn(
//                     "p-6 border-t space-y-4",
//                     darkMode ? "border-gray-700" : "border-gray-200",
//                   )}
//                 >
//                   <div className="flex justify-between items-center text-2xl font-bold">
//                     <span>Total Fee</span>
//                     <span>
//                       {challan.totalAmount + (challan.currentLateFee || 0)}.00
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold">Status</span>
//                     <span
//                       className={cn(
//                         "px-4 py-2 rounded-full text-sm font-semibold",
//                         challan.status === "paid"
//                           ? "bg-green-100 text-green-800"
//                           : challan.status === "overdue"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-yellow-100 text-yellow-800",
//                       )}
//                     >
//                       {challan.status.toUpperCase()}
//                     </span>
//                   </div>

//                   {challan.status !== "paid" && (
//                     <div className="mt-6 text-center">
//                       <p
//                         className={cn(
//                           "text-sm mb-4",
//                           darkMode ? "text-gray-400" : "text-gray-600",
//                         )}
//                       >
//                         <strong>Instructions:</strong> Pay the amount using any
//                         digital payment app and click the button below to submit
//                         for verification.
//                       </p>
//                       <button
//                         onClick={handleConfirmPayment}
//                         disabled={isConfirming}
//                         className={cn(
//                           "px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center mx-auto",
//                           isConfirming
//                             ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                             : "bg-indigo-600 hover:bg-indigo-700 text-white",
//                         )}
//                       >
//                         {isConfirming ? (
//                           <>
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Submitting...
//                           </>
//                         ) : (
//                           <>
//                             <FaCheckCircle className="-ml-1 mr-2 h-5 w-5" />I
//                             Have Paid
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </section>
//         </main>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

//--------------------------------------------------------------------------------------------------------------

// src/components/Student/FinePayment/FinePayment.jsx

// Import React, useEffect, useState, useCallback at the top
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FooterAll from "../../Footer/FooterAll";
import axios from "axios";
import { AiOutlineCopy, AiOutlineDownload } from "react-icons/ai";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaUniversity,
} from "react-icons/fa";

// Utility for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Inline Alert component
const InlineAlert = ({ message, type, onClose, darkMode }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const alertStyles =
    type === "success"
      ? cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
          darkMode
            ? "bg-emerald-900/80 text-white border border-emerald-700/50"
            : "bg-white/80 text-gray-800 border border-emerald-200/50",
        )
      : cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md transition-all duration-700",
          darkMode
            ? "bg-red-900/80 text-white border border-red-700/50"
            : "bg-white/80 text-gray-800 border border-red-200/50",
        );
  return (
    <div className={alertStyles}>
      <span className="flex-1 text-center font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-2xl leading-none hover:opacity-60 transition-opacity"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default function FinePayment({ darkMode }) {
  const [challan, setChallan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const [issuedBooks, setIssuedBooks] = useState([]); // Add this to track issued books
  const token = localStorage.getItem("token");

  const showAlert = useCallback(
    (message, type) => setAlert({ show: true, message, type }),
    [],
  );
  const hideAlert = useCallback(
    () => setAlert({ show: false, message: "", type: "" }),
    [],
  );

  const handleCopyChallan = (text) => {
    navigator.clipboard.writeText(text);
    showAlert("Challan number copied to clipboard!", "success");
  };

  const fetchIssuedBooks = useCallback(async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/books/student/issued-books",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setIssuedBooks(res.data.issuedBooks || []);
      return res.data.issuedBooks || [];
    } catch (err) {
      console.error("Error fetching issued books:", err);
      return [];
    }
  }, [token]);

  // In the fetchChallan function, update it to handle the case where no challan exists:

  const fetchChallan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/fines/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Challan Response:", response.data); // ← Add this
      setChallan(response.data.challan);
    } catch (err) {
      console.error(err);
      // setChallan(null);
      setChallan({
        fineDetails: response.data.fines,
        totalAmount: response.data.totalAmount,
        // Add defaults for other fields to avoid errors
        challanNumber: "N/A",
        studentId: {},
        status: "pending",
        currentLateFee: 0,
        issueDate: new Date(),
        dueDate: null,
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchChallan();
      fetchIssuedBooks();
    }
  }, [token, fetchChallan, fetchIssuedBooks]);
  //////////////////////////////////////////////////////////
  // In the handleGenerateChallan function, fix the fine calculation:

  const handleGenerateChallan = async () => {
    setIsGenerating(true);
    try {
      // First fetch all issued books to calculate total fine
      const issuedBooksData = await fetchIssuedBooks();

      // Calculate total fine from all books
      let totalFine = 0;
      const today = new Date();
      const fineDetails = [];

      for (const book of issuedBooksData) {
        const dueDate = new Date(book.dueDate);
        const daysOverdue = Math.ceil(
          (today - dueDate) / (1000 * 60 * 60 * 24),
        );

        if (daysOverdue > 0) {
          // Calculate fine: 100 Rs per day (same as backend)
          const bookFine = daysOverdue * 100; // Changed from 10 to 100
          totalFine += bookFine;

          // Add book details for display
          fineDetails.push({
            title: book.bookId?.title || "Unknown Book",
            author: book.bookId?.author || "Unknown Author",
            isbn: book.bookId?.isbn || "N/A",
            fine: bookFine,
            daysOverdue: daysOverdue,
          });
        }
      }

      // If no fine, show message
      if (totalFine === 0) {
        showAlert(
          "You have no overdue fines to generate a challan for.",
          "error",
        );
        setIsGenerating(false);
        return;
      }

      // Generate challan with the correct total fine
      const response = await axios.post(
        "/api/fines/generate-challan",
        { totalFine }, // Send the calculated total fine to backend
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Update the challan with our calculated values
      const updatedChallan = {
        ...response.data.challan,
        totalAmount: totalFine,
        fineDetails: fineDetails,
      };

      setChallan(updatedChallan);
      showAlert("Challan Generated!", "success");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          showAlert(err.response.data.message, "error");
        } else {
          showAlert(
            err.response.data.message || "An unexpected error occurred.",
            "error",
          );
        }
      } else {
        showAlert("Network error. Please check your connection.", "error");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (
      !window.confirm(
        "Are you sure you have paid the fine and want to submit it for verification?",
      )
    )
      return;

    setIsConfirming(true);
    try {
      await axios.post(
        "/api/fines/confirm-payment",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      showAlert(
        "Payment confirmation submitted! We will verify it shortly.",
        "success",
      );
      fetchChallan();
    } catch (err) {
      showAlert(
        err.response?.data?.message || "Failed to submit confirmation.",
        "error",
      );
    } finally {
      setIsConfirming(false);
    }
  };

  // --- NEW: Download Challan Function ---
  const handleDownload = () => {
    const printWindow = window.open("", "", "width=900,height=650");
    const student = challan.studentId;
    const totalPayable = challan.totalAmount + (challan.currentLateFee || 0);

    // Generate fine details rows for the print view
    const fineDetailsRows = challan.fineDetails
      ? challan.fineDetails
          .map(
            (book, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${book.title}</td>
          <td>Rs. ${book.fine}.00</td>
        </tr>
      `,
          )
          .join("")
      : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Challan - ${challan.challanNumber}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 5px 0 0; font-size: 16px; color: #555; }
            .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .details-section h3, .details-section p { margin: 0 0 8px; }
            .details-section p { font-size: 14px; }
            .fee-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .fee-table th, .fee-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .fee-table th { background-color: #f2f2f2; font-weight: bold; }
            .fee-table td:last-child { text-align: right; }
            .footer { border-top: 2px solid #000; padding-top: 20px; }
            .footer-row { display: flex; justify-content: space-between; align-items: center; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .status { padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: normal; text-transform: uppercase; }
            .status.paid { background: #d4edda; color: #155724; }
            .status.pending { background: #fff3cd; color: #856404; }
            .status.overdue { background: #f8d7da; color: #721c24; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>UNIVERSITY OF PESHAWAR</h1>
            <p>Computer Science Department Library - Fee Receipt /
                        Challan </p>
          </div>
          <div class="details-grid">
            <div class="details-section">
              <h3>Student Details</h3>
              <p><strong>Name:</strong> ${student?.firstName} ${student?.lastName}</p>
              <p><strong>CNIC:</strong> ${student?.cnic}</p>
              <p><strong>Username:</strong> ${student?.username}</p>
            </div>
            <div class="details-section">
              <h3>Challan Details</h3>
              <p><strong>Challan No:</strong> ${challan.challanNumber}</p>
              <p><strong>Issue Date:</strong> ${new Date(challan.issueDate).toLocaleDateString()}</p>
              <p><strong>Due Date:</strong> ${challan.dueDate ? new Date(challan.dueDate).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>
          <table class="fee-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book Title</th>
                <th>Fine Amount</th>
              </tr>
            </thead>
            <tbody>
              ${fineDetailsRows}
            </tbody>
          </table>
          ${
            challan.currentLateFee > 0
              ? `
            <table class="fee-table">
              <tbody>
                <tr>
                  <td colspan="2">Late Fee Charges</td>
                  <td>Rs. ${challan.currentLateFee}.00</td>
                </tr>
              </tbody>
            </table>
          `
              : ""
          }
          <div class="footer">
            <div class="footer-row">
              <span>Total Fee</span>
              <span>Rs. ${totalPayable}.00</span>
            </div>
            <div class="footer-row">
              <span>Status</span>
              <span class="status ${challan.status}">${challan.status}</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const mainStyles = cn(
    "flex-1 p-4 md:p-8 min-h-screen",
    darkMode ? "bg-gray-900" : "bg-gray-50",
  );
  // const titleStyles = cn(
  //   "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r",
  //   darkMode
  //     ? "from-indigo-400 to-purple-400"
  //     : "from-indigo-600 to-purple-600",
  // );

  return (
    <>
      <Navbar />
      <div className="flex">
        <LeftSidebar darkMode={darkMode} />
        <main className={mainStyles}>
          <section className="max-w-4xl mx-auto">
            <header className="mb-10">
              <div className="max-w-7xl mx-auto px-2 md:px-2">
                {/* Title */}
                <h1
                  className={`text-4xl md:text-3xl font-bold leading-tight ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Fine Payment
                </h1>
              </div>
            </header>

            {alert.show && (
              <InlineAlert
                message={alert.message}
                type={alert.type}
                onClose={hideAlert}
                darkMode={darkMode}
              />
            )}

            {loading ? (
              <p
                className={cn(
                  "text-center",
                  darkMode ? "text-gray-400" : "text-gray-600",
                )}
              >
                Loading...
              </p>
            ) : !challan ? (
              <div
                className={cn(
                  "p-8 rounded-2xl shadow-lg text-center",
                  darkMode ? "bg-gray-800" : "bg-white",
                )}
              >
                <p
                  className={cn(
                    "text-2xl font-light mb-6",
                    darkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  You have no active payment challan.
                </p>
                <button
                  onClick={handleGenerateChallan}
                  disabled={isGenerating}
                  className={cn(
                    "px-6 py-3 rounded-lg font-semibold transition-all",
                    isGenerating
                      ? "bg-gray-400"
                      : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] hover:from-[#1F2A4F]/90 hover:to-[#4A427B]/90 text-white",
                  )}
                >
                  {isGenerating
                    ? "Checking..."
                    : "Check for Fines & Generate Challan"}
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "border rounded-2xl shadow-2xl overflow-hidden bg-white text-black",
                )}
              >
                {/* --- CHALLAN HEADER --- */}
                <div className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white p-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <FaUniversity size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        UNIVERSITY OF PESHAWAR
                      </h2>
                      <p className="text-sm opacity-90">
                        Department of Computer Science Library - Fee Receipt /
                        Challan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyChallan(challan.challanNumber)}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                      title="Copy Challan Number"
                    >
                      <AiOutlineCopy size={20} />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                      title="Download Challan"
                    >
                      <AiOutlineDownload size={20} />
                    </button>
                  </div>
                </div>

                {/* --- CHALLAN BODY --- */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  {/* Student Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Student Details
                    </h3>
                    <p>
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      {challan.studentId?.firstName}{" "}
                      {challan.studentId?.lastName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">CNIC:</span>{" "}
                      {challan.studentId?.cnic}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Username:
                      </span>{" "}
                      {challan.studentId?.username}
                    </p>
                  </div>

                  {/* Challan Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                      Challan Details
                    </h3>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Challan No:
                      </span>
                      <span className="font-mono text-sm">
                        {challan.challanNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Date:</span>
                      <span>
                        {new Date(challan.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                    {challan.dueDate && (
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Due Date:
                        </span>
                        <span className="text-red-600 font-semibold">
                          {new Date(challan.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- FEE TABLE --- */}
                <div className="px-6 pb-6">
                  <table className="w-full border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-300">
                          S.No
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b-2 border-gray-300">
                          Fee Item
                        </th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-700 border-b-2 border-gray-300">
                          Net Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {challan.fineDetails && challan.fineDetails.length > 0 ? (
                        challan.fineDetails.map((book, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4 border-b border-gray-200">
                              {index + 1}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200">
                              {book.title}
                            </td>
                            <td className="py-3 px-4 text-right border-b border-gray-200 font-medium">
                              Rs. {book.fine}.00
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="py-3 px-4 border-b border-gray-200">
                            1
                          </td>
                          <td className="py-3 px-4 border-b border-gray-200">
                            Library Fine
                          </td>
                          <td className="py-3 px-4 text-right border-b border-gray-200 font-medium">
                            Rs. {challan.totalAmount}.00
                          </td>
                        </tr>
                      )}
                      {challan.currentLateFee > 0 && (
                        <tr>
                          <td className="py-3 px-4 border-b border-gray-200">
                            {challan.fineDetails
                              ? challan.fineDetails.length + 1
                              : 2}
                          </td>
                          <td className="py-3 px-4 border-b border-gray-200">
                            Late Fee Charges
                          </td>
                          <td className="py-3 px-4 text-right border-b border-gray-200 font-medium">
                            Rs. {challan.currentLateFee}.00
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* --- TOTAL, STATUS, and ACTION --- */}
                <div
                  className={cn(
                    "p-6 border-t space-y-4",
                    darkMode ? "border-gray-700" : "border-gray-200",
                  )}
                >
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total Fee</span>
                    <span>
                      Rs. {challan.totalAmount + (challan.currentLateFee || 0)}
                      .00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Status</span>
                    <span
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold",
                        challan.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : challan.status === "overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800",
                      )}
                    >
                      {challan.status.toUpperCase()}
                    </span>
                  </div>

                  {challan.status !== "paid" && (
                    <div className="mt-6 text-center">
                      <p
                        className={cn(
                          "text-sm mb-4",
                          darkMode ? "text-gray-400" : "text-gray-600",
                        )}
                      >
                        <strong>Instructions:</strong> Pay the amount using any
                        digital payment app and click the button below to submit
                        for verification.
                      </p>
                      <button
                        onClick={handleConfirmPayment}
                        disabled={isConfirming}
                        className={cn(
                          "px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center mx-auto",
                          isConfirming
                            ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white",
                        )}
                      >
                        {isConfirming ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="-ml-1 mr-2 h-5 w-5" />I
                            Have Paid
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
      <FooterAll />
    </>
  );
}
