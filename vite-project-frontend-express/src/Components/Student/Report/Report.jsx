// import React, { useEffect, useState, useRef } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import moment from "moment";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

// function Report({ darkMode }) {
//   const printRef = useRef();

//   const [student, setStudent] = useState({});
//   const [issuedCount, setIssuedCount] = useState(0);
//   const [reservedCount, setReservedCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // ================= FETCH STUDENT =================
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user || {});
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [token]);

//   // ================= FETCH ISSUED =================
//   useEffect(() => {
//     axios
//       .get("${import.meta.env.VITE_API_URL}/api/books/student/issued-books", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setIssuedCount(res.data.issuedBooks?.length || 0))
//       .catch((err) => console.error(err));
//   }, [token]);

//   // ================= FETCH RESERVED =================
//   useEffect(() => {
//     axios
//       .get("${import.meta.env.VITE_API_URL}/api/books/student/reserved-books", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setReservedCount(res.data.reservations?.length || 0))
//       .catch((err) => console.error(err));
//   }, [token]);

//   const isCleared = issuedCount === 0 && reservedCount === 0;

//   // ================= DOWNLOAD PDF =================
//   const handleDownloadPdf = () => {
//     if (!student.firstName) {
//       alert("Report data is still loading. Please wait a moment.");
//       return;
//     }

//     const element = printRef.current;
//     if (!element) {
//       alert("Error: Could not find report content to download.");
//       return;
//     }

//     const opt = {
//       margin: 10,
//       filename: `Library_Clearance_${student.firstName}_${student.lastName}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex">
//           <LeftSidebar />
//           <div
//             style={{ backgroundColor: "#f3f4f6" }}
//             className="p-6 w-full min-h-screen flex items-center justify-center"
//           >
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//               <p className="mt-2">Loading report data...</p>
//             </div>
//           </div>
//         </div>
//         <FooterAll />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         <LeftSidebar />
//         <div
//           style={{ backgroundColor: "#f3f4f6" }}
//           className="p-5 w-full min-h-screen"
//         >
//           {/* REPORT CONTENT */}
//           <div
//             ref={printRef}
//             style={{ backgroundColor: "#ffffff", border: "2px solid #1f2937" }}
//             className="max-w-4xl mx-auto shadow-lg p-8"
//           >
//             {/* HEADER */}
//             <div className="relative text-center mb-6">
//               <p
//                 style={{
//                   position: "absolute",
//                   right: 0,
//                   top: 0,
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 <b>Date:</b> {moment().format("MMMM D, YYYY")}
//               </p>

//               <img
//                 src="/uop-logo.png" // public folder me rakhi hui image
//                 className="mx-auto w-45 mb-1"
//                 alt="UOP"
//               />

//               <h2 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
//                 Departmental Library (Clearance Report)
//               </h2>
//               <p style={{ fontWeight: "600" }}>
//                 Department of Computer Science
//               </p>
//               <p style={{ fontWeight: "600" }}>University of Peshawar</p>
//             </div>

//             <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

//             {/* STUDENT DETAILS TABLE */}
//             <table className="border border-dark text-md mx-auto w-3/4">
//               <tbody>
//                 <tr className="border-b border-dark">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Name:</span>{" "}
//                     {student.firstName} {student.lastName}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">CNIC:</span>{" "}
//                     {student.cnic || "N/A"}
//                   </td>
//                 </tr>
//                 <tr className="border-b border-dark">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Degree:</span>{" "}
//                     {student.degree || "N/A"}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">Program:</span>{" "}
//                     {student.program || "N/A"}
//                   </td>
//                 </tr>
//                 <tr className="border-b border-dark">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Batch:</span>{" "}
//                     {student.batchNo || "N/A"}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">Roll No:</span>{" "}
//                     {student.rollNo || "N/A"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

//             {/* STATUS */}
//             <div className="flex flex-col items-center gap-4 text-md mt-12">
//               <div className="flex gap-10 justify-center w-full mb-2">
//                 <p>
//                   <b>Issued Books:</b> {issuedCount}
//                 </p>
//                 <p>
//                   <b>Reserved Books:</b> {reservedCount}
//                 </p>
//               </div>
//               <p>
//                 <b>Total Pending:</b> {issuedCount + reservedCount}
//               </p>
//             </div>

//             {/* CLEARED / NOT CLEARED */}
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "1.25rem",
//                 fontWeight: "bold",
//                 color: isCleared ? "#047857" : "#b91c1c",
//                 marginTop: "3rem",
//                 marginBottom: "1.5rem",
//               }}
//             >
//               <span
//                 style={{
//                   display: "flex",
//                   flexDirection: "column", // icon upar, text neeche
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "0.25rem", // icon aur text ke beech gap
//                 }}
//               >
//                 {isCleared ? (
//                   <FaCheckCircle style={{ fontSize: "1.5rem" }} />
//                 ) : (
//                   <FaTimesCircle style={{ fontSize: "1.5rem" }} />
//                 )}
//                 {isCleared ? "CLEARED" : "NOT CLEARED"}
//               </span>
//             </div>

//             {/* DECLARATION */}
//             <p
//               style={{
//                 fontSize: "1.1rem",
//                 marginTop: "1.9rem",
//                 lineHeight: "1.5",
//                 color: isCleared ? "green" : "red", // ✅ Add this line
//               }}
//             >
//               {isCleared
//                 ? "This is to certify that the above-mentioned student has cleared all library dues and has returned all issued and reserved books. This clearance report is issued for official and academic purposes."
//                 : "This is to certify that the above-mentioned student has NOT cleared all library dues. There are pending issued or reserved books; therefore, library clearance cannot be granted at this time."}
//             </p>

//             {/* SIGNATURES */}
//             <div className="flex flex-wrap justify-center md:justify-between gap-y-8 mt-40 text-sm">
//               <div className="w-full md:w-auto text-center">
//                 <div
//                   style={{
//                     borderTop: "1px solid #1f2937",
//                     width: "12rem",
//                     margin: "0 auto",
//                   }}
//                 ></div>
//                 <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
//                   Librarian
//                 </p>
//               </div>

//               <div className="w-full md:w-auto text-center">
//                 <div
//                   style={{
//                     borderTop: "1px solid #1f2937",
//                     width: "12rem",
//                     margin: "0 auto",
//                   }}
//                 ></div>
//                 <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
//                   Chairman / Director / Principal
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* DOWNLOAD PDF BUTTON */}
//           <div className="text-center mt-6">
//             <button
//               onClick={handleDownloadPdf}
//               disabled={isLoading}
//               style={{
//                 padding: "0.5rem 1.5rem",
//                 borderRadius: "0.375rem",
//                 backgroundColor: isLoading ? "#9ca3af" : "#000",
//                 color: isLoading ? "#6b7280" : "#fff",
//                 cursor: isLoading ? "not-allowed" : "pointer",
//               }}
//             >
//               {isLoading ? "Loading..." : "Download PDF 📄"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <FooterAll />
//     </>
//   );
// }

// export default Report;

//-------------------------------- NEW FILE --------------------------------

// import React, { useEffect, useState, useRef } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import axios from "axios";
// import moment from "moment";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

// function Report({ darkMode }) {
//   const printRef = useRef();

//   const [student, setStudent] = useState({});
//   const [issuedCount, setIssuedCount] = useState(0);
//   const [reservedCount, setReservedCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // ================= FETCH STUDENT =================
//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data.user || {});
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [token]);

//   // ================= FETCH ISSUED =================
//   useEffect(() => {
//     axios
//       .get("${import.meta.env.VITE_API_URL}/api/books/student/issued-books", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setIssuedCount(res.data.issuedBooks?.length || 0))
//       .catch((err) => console.error(err));
//   }, [token]);

//   // ================= FETCH RESERVED =================
//   useEffect(() => {
//     axios
//       .get("${import.meta.env.VITE_API_URL}/api/books/student/reserved-books", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setReservedCount(res.data.reservations?.length || 0))
//       .catch((err) => console.error(err));
//   }, [token]);

//   const isCleared = issuedCount === 0 && reservedCount === 0;

//   // ================= DOWNLOAD PDF =================
//   const handleDownloadPdf = () => {
//     if (!student.firstName) {
//       alert("Report data is still loading. Please wait a moment.");
//       return;
//     }

//     const element = printRef.current;
//     if (!element) {
//       alert("Error: Could not find report content to download.");
//       return;
//     }

//     const opt = {
//       margin: 10,
//       filename: `Library_Clearance_${student.firstName}_${student.lastName}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2, useCORS: true },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Navbar darkMode={darkMode} />
//         <div className="flex">
//           <LeftSidebar darkMode={darkMode} />
//           <div
//             style={{ backgroundColor: "#f3f4f6" }}
//             className="p-6 w-full min-h-screen flex items-center justify-center"
//           >
//             <div className="text-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//               <p className="mt-2">Loading report data...</p>
//             </div>
//           </div>
//         </div>
//         <FooterAll />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar darkMode={darkMode} />
//       <div className="flex text-black  dark:text-black">
//         <LeftSidebar darkMode={darkMode} />
//         <div
//           style={{ backgroundColor: "#f3f4f6" }}
//           className="p-5 w-full min-h-screen"
//         >
//           {/* REPORT CONTENT */}
//           <div
//             ref={printRef}
//             style={{ backgroundColor: "#ffffff", border: "2px solid #1f2937" }}
//             className="max-w-4xl mx-auto shadow-lg p-8"
//           >
//             {/* HEADER */}
//             <div className="relative text-center mb-6">
//               <p
//                 style={{
//                   position: "absolute",
//                   right: 0,
//                   top: 0,
//                   fontSize: "0.875rem",
//                 }}
//               >
//                 <b>Date:</b> {moment().format("MMMM D, YYYY")}
//               </p>

//               <img
//                 src="/uop-logo.png" // public folder me rakhi hui image
//                 className="mx-auto w-45 mb-1"
//                 alt="UOP"
//               />

//               <h2
//                 style={{
//                   fontWeight: "bold",
//                   textTransform: "uppercase",
//                   color: "black",
//                 }}
//               >
//                 Departmental Library (Clearance Report)
//               </h2>
//               <p style={{ fontWeight: "600", color: "black" }}>
//                 Department of Computer Science
//               </p>
//               <p style={{ fontWeight: "600", color: "black" }}>
//                 University of Peshawar
//               </p>
//             </div>

//             <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

//             {/* STUDENT DETAILS TABLE */}
//             <table className="border border-dark text-md mx-auto w-3/4">
//               <tbody>
//                 <tr className="border-b border-dark">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Name:</span>{" "}
//                     {student.firstName} {student.lastName}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">CNIC:</span>{" "}
//                     {student.cnic || "N/A"}
//                   </td>
//                 </tr>
//                 <tr className="border-b border-dark">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Degree:</span>{" "}
//                     {student.degree || "N/A"}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">Program:</span>{" "}
//                     {student.program || "N/A"}
//                   </td>
//                 </tr>
//                 <tr className="">
//                   <td className="px-4 py-2 border-r border-dark">
//                     <span className="font-semibold">Batch:</span>{" "}
//                     {student.batchNo || "N/A"}
//                   </td>
//                   <td className="px-4 py-2">
//                     <span className="font-semibold">Roll No:</span>{" "}
//                     {student.rollNo || "N/A"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

//             {/* STATUS */}
//             <div className="flex flex-col items-center gap-4 text-md mt-12 text-black">
//               <div className="flex gap-10 justify-center w-full mb-2">
//                 <p>
//                   <b>Issued Books:</b> {issuedCount}
//                 </p>
//                 <p>
//                   <b>Reserved Books:</b> {reservedCount}
//                 </p>
//               </div>
//               <p>
//                 <b>Total Pending:</b> {issuedCount + reservedCount}
//               </p>
//             </div>

//             {/* CLEARED / NOT CLEARED */}
//             <div
//               style={{
//                 textAlign: "center",
//                 fontSize: "1.25rem",
//                 fontWeight: "bold",
//                 color: isCleared ? "#047857" : "#b91c1c",
//                 marginTop: "3rem",
//                 marginBottom: "1.5rem",
//               }}
//             >
//               <span
//                 style={{
//                   display: "flex",
//                   flexDirection: "column", // icon upar, text neeche
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "0.25rem", // icon aur text ke beech gap
//                 }}
//               >
//                 {isCleared ? (
//                   <FaCheckCircle style={{ fontSize: "1.5rem" }} />
//                 ) : (
//                   <FaTimesCircle style={{ fontSize: "1.5rem" }} />
//                 )}
//                 {isCleared ? "CLEARED" : "NOT CLEARED"}
//               </span>
//             </div>

//             {/* DECLARATION */}
//             <p
//               style={{
//                 fontSize: "1.1rem",
//                 marginTop: "1.9rem",
//                 lineHeight: "1.5",
//                 color: isCleared ? "green" : "red", // ✅ Add this line
//               }}
//             >
//               {isCleared
//                 ? "This is to certify that the above-mentioned student has cleared all library dues and has returned all issued and reserved books. This clearance report is issued for official and academic purposes."
//                 : "This is to certify that the above-mentioned student has NOT cleared all library dues. There are pending issued or reserved books; therefore, library clearance cannot be granted at this time."}
//             </p>

//             {/* SIGNATURES */}
//             <div className="flex flex-wrap justify-center md:justify-between gap-y-8 mt-40 text-sm text-black">
//               <div className="w-full md:w-auto text-center">
//                 <div
//                   style={{
//                     borderTop: "1px solid #1f2937",
//                     width: "12rem",
//                     margin: "0 auto",
//                   }}
//                 ></div>
//                 <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
//                   Librarian
//                 </p>
//               </div>

//               <div className="w-full md:w-auto text-center">
//                 <div
//                   style={{
//                     borderTop: "1px solid #1f2937",
//                     width: "12rem",
//                     margin: "0 auto",
//                   }}
//                 ></div>
//                 <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
//                   Chairman / Director / Principal
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* DOWNLOAD PDF BUTTON */}
//           <div className="text-center mt-6">
//             <button
//               onClick={handleDownloadPdf}
//               disabled={isLoading}
//               style={{
//                 padding: "0.5rem 1.5rem",
//                 borderRadius: "0.375rem",
//                 backgroundColor: isLoading ? "#9ca3af" : "#000",
//                 color: isLoading ? "#6b7280" : "#fff",
//                 cursor: isLoading ? "not-allowed" : "pointer",
//               }}
//             >
//               {isLoading ? "Loading..." : "Download PDF 📄"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <FooterAll darkMode={darkMode} />
//     </>
//   );
// }

// export default Report;

//--------------------------------------------------------------

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FooterAll from "../../Footer/FooterAll";
import axios from "axios";
import moment from "moment";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { toast, Toaster } from "react-hot-toast"; // toast message

function Report({ darkMode }) {
  const printRef = useRef();

  const [student, setStudent] = useState({});
  const [issuedCount, setIssuedCount] = useState(0);
  const [reservedCount, setReservedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false); // for button state
  const [fines, setFines] = useState([]);
  const [totalFine, setTotalFine] = useState(0);

  const token = localStorage.getItem("token");

  // ================= FETCH STUDENT =================
  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) return;
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data.user || {});
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudent();
  }, [token]);

  // ================= FETCH ISSUED =================
  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/api/books/student/issued-books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setIssuedCount(res.data.issuedBooks?.length || 0))
      .catch((err) => console.error(err));
  }, [token]);

  // ================= FETCH RESERVED =================
  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/api/books/student/reserved-books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReservedCount(res.data.reservations?.length || 0))
      .catch((err) => console.error(err));
  }, [token]);

  const isCleared = issuedCount === 0 && reservedCount === 0;

  // ================= FETCH STUDENT FINES =================
  // useEffect(() => {
  //   if (!token) return;
  //   axios
  //     .get("${import.meta.env.VITE_API_URL}/api/fines/student", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       const challan = res.data.challan;
  //       if (challan?.fineDetails) {
  //         setFines(challan.fineDetails);
  //         setTotalFine(challan.fineDetails.reduce((sum, f) => sum + f.fine, 0));
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, [token]);

  // ================= FETCH STUDENT FINES =================
  // useEffect(() => {
  //   if (!token) return;
  //   axios
  //     .get("${import.meta.env.VITE_API_URL}/api/fines/student", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log("Full API Response in Report.js:", res.data); // <-- DEBUG LOG

  //       const challan = res.data.challan;
  //       // Check if challan exists and has a totalAmount property
  //       if (challan && typeof challan.totalAmount === "number") {
  //         setFines(challan.fineDetails || []); // Use || [] as a fallback
  //         setTotalFine(challan.totalAmount);
  //       } else {
  //         // Explicitly set to 0 if no challan or no amount is found
  //         setFines([]);
  //         setTotalFine(0);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, [token]);
  ///////////////////////////////////////////////////////////////////////////////////////
  // ================= FETCH STUDENT FINES LIKE FINEPAYMENT =================
  useEffect(() => {
    if (!token) return;

    const fetchFines = async () => {
      try {
        // Fetch all issued books
        const res = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/books/student/issued-books",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const issuedBooks = res.data.issuedBooks || [];

        const today = new Date();
        let calculatedFines = [];
        let total = 0;

        issuedBooks.forEach((book) => {
          const dueDate = new Date(book.dueDate);
          const daysOverdue = Math.ceil(
            (today - dueDate) / (1000 * 60 * 60 * 24),
          );

          if (daysOverdue > 0) {
            const fineAmount = daysOverdue * 100; // same as FinePayment
            total += fineAmount;

            calculatedFines.push({
              title: book.bookId?.title || "Unknown Book",
              author: book.bookId?.author || "Unknown Author",
              isbn: book.bookId?.isbn || "N/A",
              fine: fineAmount,
              daysOverdue,
            });
          }
        });

        setFines(calculatedFines);
        setTotalFine(total);
      } catch (err) {
        console.error("Error calculating fines:", err);
        setFines([]);
        setTotalFine(0);
      }
    };

    fetchFines();
    const interval = setInterval(fetchFines, 60000); // optional: refresh every minute
    return () => clearInterval(interval);
  }, [token]);

  // ================= DOWNLOAD PDF =================
  const handleDownloadPdf = () => {
    if (!student.firstName) {
      alert("Report data is still loading. Please wait a moment.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const element = printRef.current;
      if (!element) return;

      // TEMP LIGHT MODE FOR PDF
      const originalBg = element.style.backgroundColor;
      const originalColor = element.style.color;
      element.style.backgroundColor = "#ffffff";
      element.style.color = "black";

      const opt = {
        margin: 10,
        filename: `Library_Clearance_${student.firstName}_${student.lastName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .finally(() => {
          element.style.backgroundColor = originalBg;
          element.style.color = originalColor;
          setIsGenerating(false);
          toast.success("PDF downloaded successfully!");
        });
    }, 2000); // 2 seconds generating delay
  };

  if (isLoading) {
    return (
      <>
        <Navbar darkMode={darkMode} />
        <div className="flex">
          <LeftSidebar darkMode={darkMode} />
          <div
            style={{ backgroundColor: "#f3f4f6" }}
            className="p-6 w-full min-h-screen flex items-center justify-center"
          >
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">Loading report data...</p>
            </div>
          </div>
        </div>
        <FooterAll darkMode={darkMode} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Navbar darkMode={darkMode} />
      <div
        className={`flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}
      >
        <LeftSidebar darkMode={darkMode} />
        <div className="p-5 w-full">
          {/* REPORT CONTENT */}
          <div
            ref={printRef}
            style={{ backgroundColor: "#ffffff", border: "2px solid #1f2937" }}
            className="max-w-4xl mx-auto shadow-lg p-6"
          >
            {/* HEADER */}
            <div className="relative text-center mb-6">
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  fontSize: "0.875rem",
                  color: "black",
                }}
              >
                <b className="text-black">Date:</b>{" "}
                {moment().format("MMMM D, YYYY")}
              </p>

              <img
                src="/uop-logo.png"
                className="mx-auto w-45 mb-0"
                alt="UOP"
              />

              <h2
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                Department Library (Clearance Report)
              </h2>
              <p style={{ fontWeight: "600", color: "black" }}>
                Department of Computer Science
              </p>
              <p style={{ fontWeight: "600", color: "black" }}>
                University of Peshawar
              </p>
            </div>

            <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

            <table className="border border-dark text-md mx-auto w-3/4 dark:text-black">
              <tbody>
                <tr className="border-b border-dark">
                  <td className="px-3 py-2 border-r border-dark">
                    <span className="font-semibold">Name:</span>{" "}
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-semibold">CNIC:</span>{" "}
                    {student.cnic || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-dark">
                  <td className="px-3 py-2 border-r border-dark">
                    <span className="font-semibold">Degree:</span>{" "}
                    {student.degree || "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-semibold">Program:</span>{" "}
                    {student.program || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border-r border-dark">
                    <span className="font-semibold">Batch:</span>{" "}
                    {student.batchNo || "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    <span className="font-semibold">Roll No:</span>{" "}
                    {student.rollNo || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>

            <hr style={{ borderColor: "#1f2937", margin: "1.5rem 0" }} />

            {/* STATUS SECTION - PROFESSIONAL WHITE BG */}
            <div className="max-w-3xl mx-auto mt-0 p-0 bg-white rounded-lg">
              {/* <h3 className="text-lg font-semibold mb-4 text-black">
                Library Status Overview
              </h3> */}

              <div className="grid grid-cols-3 gap-1 text-center">
                {/* ISSUED BOOKS */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-black">
                  <p className="text-sm font-medium text-black">Issued Books</p>
                  <p className="text-2xl font-bold text-black">{issuedCount}</p>
                </div>

                {/* RESERVED BOOKS */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-black">
                  <p className="text-sm font-medium text-black">
                    Reserved Books
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {reservedCount}
                  </p>
                </div>

                {/* OUTSTANDING FINE */}
                {/* <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-black">
                  <p className="text-sm font-medium text-black">
                    Outstanding Fine
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {totalFine} Rs
                  </p>
                </div> */}
                {/* OUTSTANDING FINE */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-black">
                  <p className="text-sm font-medium text-black">
                    Outstanding Fine
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {totalFine} Rs
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-md font-medium text-black">
                  <b>Total Pending Items:</b> {issuedCount + reservedCount}
                </p>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: isCleared ? "#047857" : "#b91c1c",
                marginTop: "3rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.25rem",
                }}
              >
                {isCleared ? (
                  <FaCheckCircle style={{ fontSize: "1.5rem" }} />
                ) : (
                  <FaTimesCircle style={{ fontSize: "1.5rem" }} />
                )}
                {isCleared ? "CLEARED" : "NOT CLEARED"}
              </span>
            </div>

            {/* DECLARATION */}
            <p
              style={{
                fontSize: "1.1rem",
                marginTop: "1.9rem",
                lineHeight: "1.5",
                color: isCleared ? "green" : "red",
              }}
            >
              {isCleared
                ? "This is to certify that the above-mentioned student has cleared all library dues and has returned all issued and reserved books. This clearance report is issued for official and academic purposes."
                : "This is to certify that the above-mentioned student has NOT cleared all library dues. There are pending issued or reserved books; therefore, library clearance cannot be granted at this time."}
            </p>

            {/* SIGNATURES */}
            <div className="flex flex-wrap justify-center md:justify-between gap-y-8 mt-40 text-sm text-black">
              <div className="w-full md:w-auto text-center">
                <div
                  style={{
                    borderTop: "1px solid #1f2937",
                    width: "12rem",
                    margin: "0 auto",
                  }}
                ></div>
                <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
                  Librarian
                </p>
              </div>

              <div className="w-full md:w-auto text-center">
                <div
                  style={{
                    borderTop: "1px solid #1f2937",
                    width: "12rem",
                    margin: "0 auto",
                  }}
                ></div>
                <p style={{ marginTop: "0.25rem", fontWeight: "600" }}>
                  Chairman / Director / Principal
                </p>
              </div>
            </div>
          </div>

          {/* ADVANCED DOWNLOAD BUTTON */}
          <div className="max-w-4xl mx-auto mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col items-center gap-3">
            <p className="text-lg font-semibold text-center text-white">
              Click to generate the clearance certificate
            </p>
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className={`px-6 py-2 rounded-md font-semibold text-white transition-all ${
                isGenerating
                  ? "bg-gray-500 cursor-not-allowed animate-pulse"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isGenerating ? "Generating..." : "Download PDF 📄"}
            </button>
          </div>
        </div>
      </div>
      <FooterAll darkMode={darkMode} />
      <Toaster />
    </>
  );
}

export default Report;
