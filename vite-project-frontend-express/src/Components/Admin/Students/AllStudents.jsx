// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token"); // or sessionStorage, depending on your login logic
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setStudents(data.users); // 👈 correct key: backend sends { users }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>
//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Degree</th>
//                 <th className="px-4 py-2">Program</th>
//                 <th className="px-4 py-2">Batch</th>
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr
//                   key={student._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-2">
//                     {student.firstName} {student.lastName}
//                   </td>
//                   <td className="px-4 py-2">{student.degree}</td>
//                   <td className="px-4 py-2">{student.program}</td>
//                   <td className="px-4 py-2">{student.batchNo}</td>
//                   <td className="px-4 py-2">{student.rollNo}</td>
//                   <td className="px-4 py-2">{student.email}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <button
//                       className="text-blue-600 hover:text-blue-800"
//                       onClick={() => setSelectedStudent(student)}
//                     >
//                       <AiOutlineEye size={20} />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => deleteStudent(student._id)}
//                     >
//                       <AiOutlineDelete size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal for Details */}
//       {selectedStudent && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-2 text-indigo-700 text-center">
//               Student Details
//             </h3>
//             <p>
//               <b>Name:</b> {selectedStudent.firstName}{" "}
//               {selectedStudent.lastName}
//             </p>
//             <p>
//               <b>Username:</b> {selectedStudent.username}
//             </p>
//             <p>
//               <b>Email:</b> {selectedStudent.email}
//             </p>
//             <p>
//               <b>CNIC:</b> {selectedStudent.cnic}
//             </p>
//             <p>
//               <b>Degree:</b> {selectedStudent.degree}
//             </p>
//             <p>
//               <b>Program:</b> {selectedStudent.program}
//             </p>
//             <p>
//               <b>Batch:</b> {selectedStudent.batchNo}
//             </p>
//             <p>
//               <b>Roll No:</b> {selectedStudent.rollNo}
//             </p>
//             <div className="text-center mt-4">
//               <button
//                 onClick={() => setSelectedStudent(null)}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//     setEditStudent(null);
//   };

//   const handleEditClick = (student) => {
//     setEditStudent(student);
//   };

//   const handleInputChange = (e) => {
//     setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating student ❌");
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>
//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Degree</th>
//                 <th className="px-4 py-2">Program</th>
//                 <th className="px-4 py-2">Batch</th>
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr
//                     className="border-b hover:bg-gray-50 transition"
//                     onClick={() => toggleRow(student._id)}
//                   >
//                     <td className="px-4 py-2 cursor-pointer">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.degree}</td>
//                     <td className="px-4 py-2">{student.program}</td>
//                     <td className="px-4 py-2">{student.batchNo}</td>
//                     <td className="px-4 py-2">{student.rollNo}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2 flex gap-3 justify-center">
//                       <AiOutlineEye
//                         className="text-blue-600 hover:text-blue-800 cursor-pointer"
//                         size={20}
//                       />
//                       <AiOutlineEdit
//                         className="text-green-600 hover:text-green-800 cursor-pointer"
//                         size={20}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleEditClick(student);
//                         }}
//                       />
//                       <AiOutlineDelete
//                         className="text-red-600 hover:text-red-800 cursor-pointer"
//                         size={20}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       />
//                     </td>
//                   </tr>

//                   {expandedRow === student._id && (
//                     <tr className="bg-gray-50 border-b">
//                       <td colSpan="7" className="p-4">
//                         {editStudent && editStudent._id === student._id ? (
//                           // Edit Form
//                           <div className="grid grid-cols-2 gap-3">
//                             <input
//                               name="firstName"
//                               value={editStudent.firstName}
//                               onChange={handleInputChange}
//                               placeholder="First Name"
//                               className="border p-2 rounded"
//                             />
//                             <input
//                               name="lastName"
//                               value={editStudent.lastName}
//                               onChange={handleInputChange}
//                               placeholder="Last Name"
//                               className="border p-2 rounded"
//                             />
//                             <input
//                               name="email"
//                               value={editStudent.email}
//                               onChange={handleInputChange}
//                               placeholder="Email"
//                               className="border p-2 rounded col-span-2"
//                             />
//                             <input
//                               name="degree"
//                               value={editStudent.degree}
//                               onChange={handleInputChange}
//                               placeholder="Degree"
//                               className="border p-2 rounded"
//                             />
//                             <input
//                               name="program"
//                               value={editStudent.program}
//                               onChange={handleInputChange}
//                               placeholder="Program"
//                               className="border p-2 rounded"
//                             />
//                             <input
//                               name="batchNo"
//                               value={editStudent.batchNo}
//                               onChange={handleInputChange}
//                               placeholder="Batch"
//                               className="border p-2 rounded"
//                             />
//                             <input
//                               name="rollNo"
//                               value={editStudent.rollNo}
//                               onChange={handleInputChange}
//                               placeholder="Roll No"
//                               className="border p-2 rounded"
//                             />
//                             <div className="col-span-2 flex justify-between mt-2">
//                               <button
//                                 onClick={saveChanges}
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                               >
//                                 Save Changes
//                               </button>
//                               <button
//                                 onClick={() => resetPassword(student._id)}
//                                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                               >
//                                 <AiOutlineReload /> Reset Password
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           // Show Details View
//                           <div className="grid grid-cols-2 gap-2 text-sm">
//                             <p>
//                               <b>Username:</b> {student.username}
//                             </p>
//                             <p>
//                               <b>CNIC:</b> {student.cnic}
//                             </p>
//                             <p>
//                               <b>Degree:</b> {student.degree}
//                             </p>
//                             <p>
//                               <b>Program:</b> {student.program}
//                             </p>
//                             <p>
//                               <b>Batch:</b> {student.batchNo}
//                             </p>
//                             <p>
//                               <b>Roll No:</b> {student.rollNo}
//                             </p>
//                             <p className="col-span-2 text-gray-600 text-sm italic">
//                               Click edit icon to modify details.
//                             </p>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//     setEditStudent(null);
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     setEditStudent(student);
//   };

//   const handleInputChange = (e) => {
//     setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating student ❌");
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Degree</th>
//                 <th className="px-4 py-2">Program</th>
//                 <th className="px-4 py-2">Batch</th>
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.degree}</td>
//                     <td className="px-4 py-2">{student.program}</td>
//                     <td className="px-4 py-2">{student.batchNo}</td>
//                     <td className="px-4 py-2">{student.rollNo}</td>
//                     <td className="px-4 py-2">{student.email}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       {/* Show Details Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       {/* Edit Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Expanded Row */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="7">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2">
//                           {editStudent && editStudent._id === student._id ? (
//                             // 🟢 Edit Section
//                             <div className="grid grid-cols-2 gap-3">
//                               <input
//                                 name="firstName"
//                                 value={editStudent.firstName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="lastName"
//                                 value={editStudent.lastName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded col-span-2"
//                               />
//                               <input
//                                 name="degree"
//                                 value={editStudent.degree}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="program"
//                                 value={editStudent.program}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="batchNo"
//                                 value={editStudent.batchNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="rollNo"
//                                 value={editStudent.rollNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />

//                               <div className="col-span-2 flex justify-between mt-3">
//                                 <button
//                                   onClick={saveChanges}
//                                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                 >
//                                   Save Changes
//                                 </button>
//                                 <button
//                                   onClick={() => resetPassword(student._id)}
//                                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                                 >
//                                   <AiOutlineReload /> Reset Password
//                                 </button>
//                                 <button
//                                   onClick={() => setEditStudent(null)}
//                                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             // 🔵 Show Details Section
//                             <div>
//                               <div className="grid grid-cols-2 gap-2 text-sm">
//                                 <p>
//                                   <b>Username:</b> {student.username}
//                                 </p>
//                                 <p>
//                                   <b>CNIC:</b> {student.cnic}
//                                 </p>
//                                 <p>
//                                   <b>Degree:</b> {student.degree}
//                                 </p>
//                                 <p>
//                                   <b>Program:</b> {student.program}
//                                 </p>
//                                 <p>
//                                   <b>Batch:</b> {student.batchNo}
//                                 </p>
//                                 <p>
//                                   <b>Roll No:</b> {student.rollNo}
//                                 </p>
//                               </div>
//                               <div className="text-right mt-3">
//                                 <button
//                                   onClick={() => setExpandedRow(null)}
//                                   className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                                 >
//                                   Hide Details
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_API_URL}/api/users/getAllUsers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//     setEditStudent(null);
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     // Toggle edit section if clicked again on same student
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent(student);
//       setExpandedRow(student._id); // Auto open details when editing
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     // Auto-update username if degree, program, batchNo, or rollNo changes
//     if (["degree", "program", "batchNo", "rollNo"].includes(name)) {
//       const { degree, program, batchNo, rollNo } = updatedStudent;
//       if (degree && program && batchNo && rollNo) {
//         updatedStudent.username = `${degree}${program}-${batchNo}-${rollNo}`;
//       }
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating student ❌");
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Full Name</th>
//                 <th className="px-4 py-2">CNIC</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Username</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.cnic}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2">{student.username}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       {/* Show Details Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       {/* Edit Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Expanded Row */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2">
//                           {editStudent && editStudent._id === student._id ? (
//                             // 🟢 Edit Section
//                             <div className="grid grid-cols-2 gap-3">
//                               <input
//                                 name="firstName"
//                                 value={editStudent.firstName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="lastName"
//                                 value={editStudent.lastName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded col-span-2"
//                               />
//                               <input
//                                 name="degree"
//                                 value={editStudent.degree}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Degree"
//                               />
//                               <input
//                                 name="program"
//                                 value={editStudent.program}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Program"
//                               />
//                               <input
//                                 name="batchNo"
//                                 value={editStudent.batchNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Batch"
//                               />
//                               <input
//                                 name="rollNo"
//                                 value={editStudent.rollNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Roll No"
//                               />
//                               <input
//                                 name="username"
//                                 value={editStudent.username}
//                                 readOnly
//                                 className="border p-2 rounded bg-gray-100 col-span-2"
//                               />

//                               <div className="col-span-2 flex justify-between mt-3">
//                                 <button
//                                   onClick={saveChanges}
//                                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                 >
//                                   Save Changes
//                                 </button>
//                                 <button
//                                   onClick={() => resetPassword(student._id)}
//                                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                                 >
//                                   <AiOutlineReload /> Reset Password
//                                 </button>
//                                 <button
//                                   onClick={() => setEditStudent(null)}
//                                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             // 🔵 Show Details Section
//                             <div>
//                               <div className="grid grid-cols-2 gap-2 text-sm">
//                                 <p>
//                                   <b>Degree:</b> {student.degree}
//                                 </p>
//                                 <p>
//                                   <b>Program:</b> {student.program}
//                                 </p>
//                                 <p>
//                                   <b>Batch:</b> {student.batchNo}
//                                 </p>
//                                 <p>
//                                   <b>Roll No:</b> {student.rollNo}
//                                 </p>
//                               </div>
//                               <div className="text-right mt-3">
//                                 <button
//                                   onClick={() => setExpandedRow(null)}
//                                   className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                                 >
//                                   Hide Details
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
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
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(id);
//       setEditStudent(null);
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent(student);
//       setExpandedRow(student._id);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     // Auto-generate username based on degree, program, batch, rollNo
//     const { degree, program, batchNo, rollNo } = updatedStudent;
//     if (degree && program && batchNo && rollNo) {
//       updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating student ❌");
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Full Name</th>
//                 <th className="px-4 py-2">CNIC</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Username</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentStudents.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.cnic}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2">{student.username}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       {/* Show Details Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       {/* Edit Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Expanded Row */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2">
//                           {editStudent && editStudent._id === student._id ? (
//                             // 🟢 Edit Section
//                             <div className="grid grid-cols-2 gap-3">
//                               <input
//                                 name="firstName"
//                                 value={editStudent.firstName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="First Name"
//                               />
//                               <input
//                                 name="lastName"
//                                 value={editStudent.lastName}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Last Name"
//                               />
//                               <input
//                                 name="cnic"
//                                 value={editStudent.cnic}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="CNIC"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded col-span-2"
//                                 placeholder="Email"
//                               />

//                               {/* Dropdowns for Degree & Program */}
//                               <select
//                                 name="degree"
//                                 value={editStudent.degree || ""}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               >
//                                 <option value="">Select Degree</option>
//                                 <option value="BS">BS</option>
//                                 <option value="MS">MS</option>
//                                 <option value="PhD">PhD</option>
//                               </select>

//                               <select
//                                 name="program"
//                                 value={editStudent.program || ""}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                               >
//                                 <option value="">Select Program</option>
//                                 <option value="CS">CS</option>
//                                 <option value="IT">IT</option>
//                                 <option value="SE">SE</option>
//                               </select>

//                               <input
//                                 name="batchNo"
//                                 value={editStudent.batchNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Batch No"
//                               />
//                               <input
//                                 name="rollNo"
//                                 value={editStudent.rollNo}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded"
//                                 placeholder="Roll No"
//                               />

//                               <input
//                                 name="username"
//                                 value={editStudent.username}
//                                 readOnly
//                                 className="border p-2 rounded col-span-2 bg-gray-100"
//                               />

//                               <div className="col-span-2 flex justify-between mt-3">
//                                 <button
//                                   onClick={saveChanges}
//                                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                 >
//                                   Save Changes
//                                 </button>
//                                 <button
//                                   onClick={() => resetPassword(student._id)}
//                                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                                 >
//                                   <AiOutlineReload /> Reset Password
//                                 </button>
//                                 <button
//                                   onClick={() => setEditStudent(null)}
//                                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             // 🔵 Show Details Section
//                             <div>
//                               <div className="grid grid-cols-2 gap-2 text-sm">
//                                 <p>
//                                   <b>Degree:</b> {student.degree}
//                                 </p>
//                                 <p>
//                                   <b>Program:</b> {student.program}
//                                 </p>
//                                 <p>
//                                   <b>Batch:</b> {student.batchNo}
//                                 </p>
//                                 <p>
//                                   <b>Roll No:</b> {student.rollNo}
//                                 </p>
//                                 <p>
//                                   <b>Created At:</b>{" "}
//                                   {new Date(student.createdAt).toLocaleString()}
//                                 </p>
//                                 <p>
//                                   <b>Updated At:</b>{" "}
//                                   {new Date(student.updatedAt).toLocaleString()}
//                                 </p>
//                               </div>
//                               <div className="text-right mt-3">
//                                 <button
//                                   onClick={() => setExpandedRow(null)}
//                                   className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                                 >
//                                   Hide Details
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-center mt-4 gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &lt;
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
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
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(id);
//       setEditStudent(null); // close edit if details open
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent(student);
//       setExpandedRow(null); // close show details if edit opens
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     // Auto-generate username
//     const { degree, program, batchNo, rollNo } = updatedStudent;
//     if (degree && program && batchNo && rollNo) {
//       updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error updating student ❌");
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Full Name</th>
//                 <th className="px-4 py-2">CNIC</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Username</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentStudents.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.cnic}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2">{student.username}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Expanded Row */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-2 text-sm">
//                             <p>
//                               <b>Degree:</b> {student.degree}
//                             </p>
//                             <p>
//                               <b>Program:</b> {student.program}
//                             </p>
//                             <p>
//                               <b>Batch:</b> {student.batchNo}
//                             </p>
//                             <p>
//                               <b>Roll No:</b> {student.rollNo}
//                             </p>
//                             <p>
//                               <b>Created At:</b>{" "}
//                               {new Date(student.createdAt).toLocaleString()}
//                             </p>
//                             <p>
//                               <b>Updated At:</b>{" "}
//                               {new Date(student.updatedAt).toLocaleString()}
//                             </p>
//                           </div>
//                           <div className="text-right mt-3">
//                             <button
//                               onClick={() => setExpandedRow(null)}
//                               className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                             >
//                               Hide Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* Edit Row */}
//                   {editStudent && editStudent._id === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-3">
//                             <input
//                               name="firstName"
//                               value={editStudent.firstName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="First Name"
//                             />
//                             <input
//                               name="lastName"
//                               value={editStudent.lastName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Last Name"
//                             />

//                             {/* CNIC and Email same row */}
//                             <div className="col-span-2 flex gap-3">
//                               <input
//                                 name="cnic"
//                                 value={editStudent.cnic}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="CNIC"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="Email"
//                               />
//                             </div>

//                             {/* Degree Dropdown */}
//                             <select
//                               name="degree"
//                               value={editStudent.degree || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Degree</option>
//                               <option value="BS">BS</option>
//                               <option value="MS">MS</option>
//                               <option value="PhD">PhD</option>
//                             </select>

//                             {/* Program Dropdown — same as signup */}
//                             <select
//                               name="program"
//                               value={editStudent.program || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Program</option>
//                               <option value="CS">Computer Science</option>
//                               <option value="AI">
//                                 Artificial Intelligence
//                               </option>
//                               <option value="CSec">Cyber Security</option>
//                               <option value="DS">Data Science</option>
//                               <option value="SE">Software Engineering</option>
//                             </select>

//                             <input
//                               name="batchNo"
//                               value={editStudent.batchNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Batch No"
//                             />
//                             <input
//                               name="rollNo"
//                               value={editStudent.rollNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Roll No"
//                             />

//                             <input
//                               name="username"
//                               value={editStudent.username}
//                               readOnly
//                               className="border p-2 rounded w-[95%] text-center bg-gray-100"
//                             />

//                             <div className="col-span-2 flex justify-between mt-3">
//                               <button
//                                 onClick={saveChanges}
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                               >
//                                 Save Changes
//                               </button>
//                               <button
//                                 onClick={() => resetPassword(student._id)}
//                                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                               >
//                                 <AiOutlineReload /> Reset Password
//                               </button>
//                               <button
//                                 onClick={() => setEditStudent(null)}
//                                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-center mt-4 gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &lt;
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
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
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setStudents(data.users);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(id);
//       setEditStudent(null);
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent({ ...student, password: "" }); // add password field
//       setExpandedRow(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     // CNIC validation (only digits and 14 length)
//     if (name === "cnic") {
//       if (!/^\d*$/.test(value)) return; // only digits allowed
//       if (value.length > 14) return; // max 14 digits
//     }

//     // Email validation live feedback
//     if (
//       name === "email" &&
//       value &&
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//     ) {
//       toast.warn("Invalid email format ⚠️");
//     }

//     // Auto username generation
//     const { degree, program, batchNo, rollNo } = updatedStudent;
//     if (degree && program && batchNo && rollNo) {
//       updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // Validation before update
//       if (editStudent.cnic.length !== 14) {
//         toast.error("CNIC must be exactly 14 digits ❌");
//         return;
//       }

//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       if (error.response?.status === 400) {
//         toast.error("Email, CNIC or username already exists ❌");
//       } else {
//         toast.error("Error updating student ❌");
//       }
//       console.error(error);
//     }
//   };

//   const resetPassword = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/resetPassword/${id}`,
//         { newPassword: "asdf1234" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Password reset to asdf1234 ✅");

//       // show new password in input field
//       setEditStudent((prev) => ({ ...prev, password: "asdf1234" }));
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to reset password ❌");
//     }
//   };

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   return (
//     <div>
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         All Students
//       </h3>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-indigo-600 text-white">
//               <tr>
//                 <th className="px-4 py-2">Full Name</th>
//                 <th className="px-4 py-2">CNIC</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Username</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentStudents.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.cnic}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2">{student.username}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Show Details */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-2 text-sm">
//                             <p>
//                               <b>Degree:</b> {student.degree}
//                             </p>
//                             <p>
//                               <b>Program:</b> {student.program}
//                             </p>
//                             <p>
//                               <b>Batch:</b> {student.batchNo}
//                             </p>
//                             <p>
//                               <b>Roll No:</b> {student.rollNo}
//                             </p>
//                             <p>
//                               <b>Created At:</b>{" "}
//                               {new Date(student.createdAt).toLocaleString()}
//                             </p>
//                             <p>
//                               <b>Updated At:</b>{" "}
//                               {new Date(student.updatedAt).toLocaleString()}
//                             </p>
//                           </div>
//                           <div className="text-right mt-3">
//                             <button
//                               onClick={() => setExpandedRow(null)}
//                               className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                             >
//                               Hide Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* Edit Area */}
//                   {editStudent && editStudent._id === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-3">
//                             <input
//                               name="firstName"
//                               value={editStudent.firstName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="First Name"
//                             />
//                             <input
//                               name="lastName"
//                               value={editStudent.lastName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Last Name"
//                             />

//                             <div className="col-span-2 flex gap-3">
//                               <input
//                                 name="cnic"
//                                 value={editStudent.cnic}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="CNIC (14 digits)"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="Email"
//                               />
//                             </div>

//                             <select
//                               name="degree"
//                               value={editStudent.degree || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Degree</option>
//                               <option value="BS">BS</option>
//                               <option value="MS">MS</option>
//                               <option value="PhD">PhD</option>
//                             </select>

//                             <select
//                               name="program"
//                               value={editStudent.program || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Program</option>
//                               <option value="CS">Computer Science</option>
//                               <option value="AI">
//                                 Artificial Intelligence
//                               </option>
//                               <option value="CSec">Cyber Security</option>
//                               <option value="DS">Data Science</option>
//                               <option value="SE">Software Engineering</option>
//                             </select>

//                             <input
//                               name="batchNo"
//                               value={editStudent.batchNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Batch No"
//                             />
//                             <input
//                               name="rollNo"
//                               value={editStudent.rollNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Roll No"
//                             />

//                             <input
//                               name="username"
//                               value={editStudent.username}
//                               readOnly
//                               className="border p-2 rounded w-[95%] text-center bg-gray-100 mx-auto"
//                             />

//                             {/* Password Field (Read-only) */}
//                             <input
//                               name="password"
//                               value={editStudent.password || ""}
//                               readOnly
//                               placeholder="Password (after reset)"
//                               className="border p-2 rounded w-[95%] text-center bg-gray-100 mx-auto"
//                             />

//                             <div className="col-span-2 flex justify-between mt-3">
//                               <button
//                                 onClick={saveChanges}
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                               >
//                                 Save Changes
//                               </button>
//                               <button
//                                 onClick={() => resetPassword(student._id)}
//                                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                               >
//                                 <AiOutlineReload /> Reset Password
//                               </button>
//                               <button
//                                 onClick={() => setEditStudent(null)}
//                                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-center mt-4 gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &lt;
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//------------------------------------------------------------------------------------ ** Without Search bar ** -----------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";
// import Logo from "../../../assets/logo.jpg";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 5;

//   const thStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     background: "linear-gradient(to bottom, #1D3DA3, #6A8ED1)",
//     color: "#fff",
//     textAlign: "left",
//   };
//   const tdStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     textAlign: "left",
//   };

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

//       // Sort students: degree → batchNo → rollNo
//       const degreeOrder = { BS: 1, MS: 2, PhD: 3 };
//       const sortedStudents = data.users.sort((a, b) => {
//         if (degreeOrder[a.degree] !== degreeOrder[b.degree]) {
//           return degreeOrder[a.degree] - degreeOrder[b.degree];
//         }
//         if (a.batchNo !== b.batchNo) {
//           return a.batchNo - b.batchNo;
//         }
//         return a.rollNo - b.rollNo;
//       });

//       setStudents(sortedStudents);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(id);
//       setEditStudent(null);
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent({ ...student, password: "" }); // add password field
//       setExpandedRow(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     // CNIC validation (only digits and 14 length)
//     if (name === "cnic") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 14) return;
//     }

//     // Email validation live feedback
//     if (
//       name === "email" &&
//       value &&
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//     ) {
//       toast.warn("Invalid email format ⚠️");
//     }

//     // Auto username generation
//     const { degree, program, batchNo, rollNo } = updatedStudent;
//     if (degree && program && batchNo && rollNo) {
//       updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // Validation before update
//       if (editStudent.cnic.length !== 14) {
//         toast.error("CNIC must be exactly 14 digits ❌");
//         return;
//       }

//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       if (error.response?.status === 400) {
//         toast.error("Email, CNIC or username already exists ❌");
//       } else {
//         toast.error("Error updating student ❌");
//       }
//       console.error(error);
//     }
//   };

//   const resetPassword = (id) => {
//     // Just set password locally; not sent to backend yet
//     if (editStudent && editStudent._id === id) {
//       setEditStudent((prev) => ({ ...prev, password: "asdf1234" }));
//       toast.success("Password set to asdf1234 (not yet saved) ✅");
//     }
//   };

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = students.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(students.length / studentsPerPage);

//   const handlePrint = () => {
//     if (students.length === 0) {
//       toast.error("No students to print ❌");
//       return;
//     }

//     const printSection = document.getElementById("print-section");
//     printSection.style.display = "block"; // show hidden div
//     window.print();
//     printSection.style.display = "none"; // hide it again
//   };

//   return (
//     <div>
//       <div id="print-section" style={{ display: "none" }}>
//         <div className="flex flex-col items-center mb-6 ">
//           <img
//             src="/logo.jpg"
//             alt="Logo"
//             className="w-25 h-auto mb-2" // logo size, adjust as needed
//           />
//           <h1 className="text-2xl font-bold mb-1">Departmental Library</h1>
//           <h2 className="text-lg mb-1">Department of Computer Science</h2>
//           <h2 className="text-lg">University of Peshawar</h2>
//         </div>

//         <table className="w-full border-collapse mx-auto ">
//           <thead>
//             <tr className="">
//               <th style={thStyle}>#</th>
//               <th style={thStyle}>Full Name</th>
//               <th style={thStyle}>CNIC</th>
//               <th style={thStyle}>Email</th>
//               <th style={thStyle}>Username</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s, index) => (
//               <tr key={s._id}>
//                 <td style={tdStyle}>{index + 1}</td>
//                 <td style={tdStyle}>
//                   {s.firstName} {s.lastName}
//                 </td>
//                 <td style={tdStyle}>{s.cnic}</td>
//                 <td style={tdStyle}>{s.email}</td>
//                 <td style={tdStyle}>{s.username}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold text-indigo-700">All Students</h3>
//         <button
//           onClick={handlePrint}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 float-right mb-4"
//         >
//           🖨Print
//         </button>
//       </div>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white">
//               <tr>
//                 <th className="px-4 py-2">Full Name</th>
//                 <th className="px-4 py-2">CNIC</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">Username</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentStudents.map((student) => (
//                 <React.Fragment key={student._id}>
//                   <tr className="border-b hover:bg-gray-50 transition">
//                     <td className="px-4 py-2">
//                       {student.firstName} {student.lastName}
//                     </td>
//                     <td className="px-4 py-2">{student.cnic}</td>
//                     <td className="px-4 py-2">{student.email}</td>
//                     <td className="px-4 py-2">{student.username}</td>

//                     <td className="px-4 py-2 flex gap-2 justify-center">
//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={() => toggleRow(student._id)}
//                       >
//                         <AiOutlineEye size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => handleEditClick(student, e)}
//                       >
//                         <AiOutlineEdit size={18} />
//                       </button>

//                       <button
//                         className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteStudent(student._id);
//                         }}
//                       >
//                         <AiOutlineDelete size={18} />
//                       </button>
//                     </td>
//                   </tr>

//                   {/* Show Details */}
//                   {expandedRow === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-2 text-sm">
//                             <p>
//                               <b>Degree:</b> {student.degree}
//                             </p>
//                             <p>
//                               <b>Program:</b> {student.program}
//                             </p>
//                             <p>
//                               <b>Batch:</b> {student.batchNo}
//                             </p>
//                             <p>
//                               <b>Roll No:</b> {student.rollNo}
//                             </p>
//                             <p>
//                               <b>Created At:</b>{" "}
//                               {new Date(student.createdAt).toLocaleString()}
//                             </p>
//                             <p>
//                               <b>Updated At:</b>{" "}
//                               {new Date(student.updatedAt).toLocaleString()}
//                             </p>
//                           </div>
//                           <div className="text-right mt-3">
//                             <button
//                               onClick={() => setExpandedRow(null)}
//                               className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
//                             >
//                               Hide Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* Edit Area */}
//                   {editStudent && editStudent._id === student._id && (
//                     <tr>
//                       <td colSpan="5">
//                         <div className="bg-gray-200 p-4 rounded-lg mt-2 max-w-4xl mx-auto">
//                           <div className="grid grid-cols-2 gap-3">
//                             <input
//                               name="firstName"
//                               value={editStudent.firstName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="First Name"
//                             />
//                             <input
//                               name="lastName"
//                               value={editStudent.lastName}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Last Name"
//                             />

//                             <div className="col-span-2 flex gap-3">
//                               <input
//                                 name="cnic"
//                                 value={editStudent.cnic}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="CNIC (14 digits)"
//                               />
//                               <input
//                                 name="email"
//                                 value={editStudent.email}
//                                 onChange={handleInputChange}
//                                 className="border p-2 rounded w-1/2"
//                                 placeholder="Email"
//                               />
//                             </div>

//                             <select
//                               name="degree"
//                               value={editStudent.degree || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Degree</option>
//                               <option value="BS">BS</option>
//                               <option value="MS">MS</option>
//                               <option value="PhD">PhD</option>
//                             </select>

//                             <select
//                               name="program"
//                               value={editStudent.program || ""}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                             >
//                               <option value="">Select Program</option>
//                               <option value="CS">Computer Science</option>
//                               <option value="AI">
//                                 Artificial Intelligence
//                               </option>
//                               <option value="CSec">Cyber Security</option>
//                               <option value="DS">Data Science</option>
//                               <option value="SE">Software Engineering</option>
//                             </select>

//                             <input
//                               name="batchNo"
//                               value={editStudent.batchNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Batch No"
//                             />
//                             <input
//                               name="rollNo"
//                               value={editStudent.rollNo}
//                               onChange={handleInputChange}
//                               className="border p-2 rounded"
//                               placeholder="Roll No"
//                             />

//                             <input
//                               name="username"
//                               value={editStudent.username}
//                               readOnly
//                               className="border p-2 rounded w-[95%] text-center bg-gray-100 mx-auto"
//                             />

//                             {/* Password Field (Read-only until saved) */}
//                             <input
//                               name="password"
//                               value={editStudent.password || ""}
//                               readOnly
//                               placeholder="Password (after reset)"
//                               className="border p-2 rounded w-[95%] text-center bg-gray-100 mx-auto"
//                             />

//                             <div className="col-span-2 flex justify-between mt-3">
//                               <button
//                                 onClick={saveChanges}
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                               >
//                                 Save Changes
//                               </button>
//                               <button
//                                 onClick={() => resetPassword(student._id)}
//                                 className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center gap-1"
//                               >
//                                 <AiOutlineReload /> Reset Password
//                               </button>
//                               <button
//                                 onClick={() => setEditStudent(null)}
//                                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-center mt-4 gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &lt;
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   AiOutlineEye,
//   AiOutlineDelete,
//   AiOutlineEdit,
//   AiOutlineReload,
// } from "react-icons/ai";
// import Logo from "../../../assets/logo.jpg";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const studentsPerPage = 5;

//   const thStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     background: "linear-gradient(to bottom, #1D3DA3, #6A8ED1)",
//     color: "#fff",
//     textAlign: "left",
//   };
//   const tdStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     textAlign: "left",
//   };

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

//       const degreeOrder = { BS: 1, MS: 2, PhD: 3 };
//       const sortedStudents = data.users.sort((a, b) => {
//         if (degreeOrder[a.degree] !== degreeOrder[b.degree]) {
//           return degreeOrder[a.degree] - degreeOrder[b.degree];
//         }
//         if (a.batchNo !== b.batchNo) {
//           return a.batchNo - b.batchNo;
//         }
//         return a.rollNo - b.rollNo;
//       });

//       setStudents(sortedStudents);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?"))
//       return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Student deleted successfully ✅");
//       fetchStudents();
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(id);
//       setEditStudent(null);
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent({ ...student, password: "" });
//       setExpandedRow(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let updatedStudent = { ...editStudent, [name]: value };

//     if (name === "cnic") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 14) return;
//     }

//     if (
//       name === "email" &&
//       value &&
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//     ) {
//       toast.warn("Invalid email format ⚠️");
//     }

//     const { degree, program, batchNo, rollNo } = updatedStudent;
//     if (degree && program && batchNo && rollNo) {
//       updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
//     }

//     setEditStudent(updatedStudent);
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (editStudent.cnic.length !== 14) {
//         toast.error("CNIC must be exactly 14 digits ❌");
//         return;
//       }

//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Student updated successfully ✅");
//       setEditStudent(null);
//       fetchStudents();
//     } catch (error) {
//       if (error.response?.status === 400) {
//         toast.error("Email, CNIC or username already exists ❌");
//       } else {
//         toast.error("Error updating student ❌");
//       }
//       console.error(error);
//     }
//   };

//   const resetPassword = (id) => {
//     if (editStudent && editStudent._id === id) {
//       setEditStudent((prev) => ({ ...prev, password: "asdf1234" }));
//       toast.success("Password set to asdf1234 (not yet saved) ✅");
//     }
//   };

//   // ✅ Case-insensitive filter logic
//   // ✅ Case-insensitive & full name supported filter logic
//   const filteredStudents = students.filter((s) => {
//     const search = searchTerm.trim().toLowerCase();
//     if (search === "") return true; // ✅ show all when empty

//     const firstName = s.firstName?.toLowerCase() || "";
//     const lastName = s.lastName?.toLowerCase() || "";
//     const fullName = `${firstName} ${lastName}`.trim();
//     const email = s.email?.toLowerCase() || "";
//     const username = s.username?.toLowerCase() || "";
//     const cnic = s.cnic?.toLowerCase() || "";

//     return (
//       firstName.includes(search) ||
//       lastName.includes(search) ||
//       fullName.includes(search) || // ✅ full name match added
//       email.includes(search) ||
//       username.includes(search) ||
//       cnic.includes(search)
//     );
//   });

//   // Pagination Logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const handlePrint = () => {
//     if (students.length === 0) {
//       toast.error("No students to print ❌");
//       return;
//     }
//     const printSection = document.getElementById("print-section");
//     printSection.style.display = "block";
//     window.print();
//     printSection.style.display = "none";
//   };

//   return (
//     <div>
//       {/* 🔍 SEARCH BAR + PRINT */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-semibold text-indigo-700">All Students</h3>
//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="🔍 Search students..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="border border-gray-400 rounded px-3 py-2 w-60 focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             onClick={handlePrint}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             🖨 Print
//           </button>
//         </div>
//       </div>

//       {/* 🧾 TABLE DISPLAY */}
//       {filteredStudents.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
//             <thead>
//               <tr>
//                 <th style={thStyle}>#</th>
//                 <th style={thStyle}>Name</th>
//                 <th style={thStyle}>Email</th>
//                 <th style={thStyle}>Username</th>
//                 <th style={thStyle}>CNIC</th>
//                 <th style={thStyle}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentStudents.map((student, index) => (
//                 <tr key={student._id} className="hover:bg-gray-100">
//                   <td style={tdStyle}>{indexOfFirstStudent + index + 1}</td>
//                   <td style={tdStyle}>
//                     {student.firstName} {student.lastName}
//                   </td>
//                   <td style={tdStyle}>{student.email}</td>
//                   <td style={tdStyle}>{student.username}</td>
//                   <td style={tdStyle}>{student.cnic}</td>
//                   <td style={tdStyle}>
//                     <div className="flex gap-2">
//                       <button onClick={() => toggleRow(student._id)}>
//                         <AiOutlineEye />
//                       </button>
//                       <button onClick={(e) => handleEditClick(student, e)}>
//                         <AiOutlineEdit />
//                       </button>
//                       <button onClick={() => deleteStudent(student._id)}>
//                         <AiOutlineDelete />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* 📄 Pagination */}
//           <div className="flex justify-center mt-4 gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllStudents;

//------------------------------------------------------------------------------------

/* FINAL VERSION WITH SHOW DETAILS + EDIT + DELETE */

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editStudent, setEditStudent] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const studentsPerPage = 5;

//   const thStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     background: "linear-gradient(to bottom, #1D3DA3, #6A8ED1)",
//     color: "#fff",
//     textAlign: "left",
//   };
//   const tdStyle = {
//     border: "1px solid #333",
//     padding: "8px",
//     textAlign: "left",
//   };

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
//       setStudents(data.users);
//     } catch {
//       toast.error("Failed to fetch students ❌");
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Deleted successfully");
//       fetchStudents();
//     } catch {
//       toast.error("Error deleting student ❌");
//     }
//   };

//   const toggleRow = (id) => {
//     if (expandedRow === id) setExpandedRow(null);
//     else {
//       setExpandedRow(id);
//       setEditStudent(null);
//     }
//   };

//   const handleEditClick = (student, e) => {
//     e.stopPropagation();
//     if (editStudent && editStudent._id === student._id) {
//       setEditStudent(null);
//     } else {
//       setEditStudent({ ...student });
//       setExpandedRow(null);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditStudent({ ...editStudent, [name]: value });
//   };

//   const saveChanges = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
//         editStudent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Updated successfully");
//       setEditStudent(null);
//       fetchStudents();
//     } catch {
//       toast.error("Error updating student ❌");
//     }
//   };

//   const filteredStudents = students.filter((s) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       s.firstName?.toLowerCase().includes(search) ||
//       s.lastName?.toLowerCase().includes(search) ||
//       s.email?.toLowerCase().includes(search) ||
//       s.username?.toLowerCase().includes(search) ||
//       s.cnic?.toLowerCase().includes(search)
//     );
//   });

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );

//   return (
//     <div>
//       {/* SEARCH BAR */}
//       <div className="flex justify-between mb-4">
//         <h3 className="text-xl font-semibold text-indigo-700">All Students</h3>
//         <input
//           type="text"
//           placeholder="🔍 Search students..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-3 py-2 rounded w-60"
//         />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr>
//               <th style={thStyle}>#</th>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Email</th>
//               <th style={thStyle}>Username</th>
//               <th style={thStyle}>CNIC</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentStudents.map((student, index) => (
//               <>
//                 {/* MAIN ROW */}
//                 <tr key={student._id} className="hover:bg-gray-100">
//                   <td style={tdStyle}>{indexOfFirstStudent + index + 1}</td>
//                   <td style={tdStyle}>
//                     {student.firstName} {student.lastName}
//                   </td>
//                   <td style={tdStyle}>{student.email}</td>
//                   <td style={tdStyle}>{student.username}</td>
//                   <td style={tdStyle}>{student.cnic}</td>

//                   <td style={tdStyle}>
//                     <div className="flex gap-2">
//                       <button onClick={() => toggleRow(student._id)}>
//                         <AiOutlineEye />
//                       </button>

//                       <button onClick={(e) => handleEditClick(student, e)}>
//                         <AiOutlineEdit />
//                       </button>

//                       <button onClick={() => deleteStudent(student._id)}>
//                         <AiOutlineDelete />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>

//                 {/* SHOW DETAILS ROW */}
//                 {expandedRow === student._id && (
//                   <tr>
//                     <td colSpan="6" className="bg-gray-50 p-4 border">
//                       <div>
//                         <p>
//                           <b>Degree:</b> {student.degree}
//                         </p>
//                         <p>
//                           <b>Program:</b> {student.program}
//                         </p>
//                         <p>
//                           <b>Batch:</b> {student.batchNo}
//                         </p>
//                         <p>
//                           <b>Roll No:</b> {student.rollNo}
//                         </p>
//                         <p>
//                           <b>Phone:</b> {student.phoneNo}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* EDIT FORM ROW */}
//                 {editStudent && editStudent._id === student._id && (
//                   <tr>
//                     <td colSpan="6" className="bg-blue-50 p-4 border">
//                       <div className="grid grid-cols-2 gap-4">
//                         <input
//                           name="firstName"
//                           value={editStudent.firstName}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                         />

//                         <input
//                           name="lastName"
//                           value={editStudent.lastName}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                         />

//                         <input
//                           name="email"
//                           value={editStudent.email}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                         />

//                         <input
//                           name="cnic"
//                           value={editStudent.cnic}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                         />
//                       </div>

//                       <button
//                         onClick={saveChanges}
//                         className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
//                       >
//                         Save Changes
//                       </button>
//                     </td>
//                   </tr>
//                 )}
//               </>
//             ))}
//           </tbody>
//         </table>

//         {/* PAGINATION */}
//         <div className="flex justify-center mt-4 gap-2">
//           {Array.from(
//             { length: Math.ceil(filteredStudents.length / studentsPerPage) },
//             (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllStudents;

//------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineEye,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineReload,
} from "react-icons/ai";
import Logo from "../../../assets/logo.jpg";
import "../../../App.css";

const AllStudents = ({ darkMode }) => {
  const [students, setStudents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // --- ADVANCED SEARCH STATE VARIABLES ---
  // --- ADVANCED SEARCH STATE VARIABLES ---
  const [mainSearch, setMainSearch] = useState("");
  const [fullNameSearch, setFullNameSearch] = useState("");
  const [cnicSearch, setCnicSearch] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [usernameSearch, setUsernameSearch] = useState(""); // USERNAME ADDED BACK
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  // --- FILTERING LOGIC ---
  // Agar aapke paas pehle se `filteredStudents` variable hai, toh use hata kar yeh `useEffect` aur `useState` paste karen.
  const [filteredStudents, setFilteredStudents] = useState(students);

  const studentsPerPage = 10;

  const thStyle = {
    border: "1px solid #333",
    padding: "8px",
    background: "linear-gradient(to bottom, #1D3DA3, #6A8ED1)",
    color: "#fff",
    textAlign: "left",
  };
  const tdStyle = {
    border: "1px solid #333",
    padding: "8px",
    textAlign: "left",
  };

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

      // Sort students: degree → batchNo → rollNo
      const degreeOrder = { BS: 1, MS: 2, PhD: 3 };
      const sortedStudents = data.users.sort((a, b) => {
        if (degreeOrder[a.degree] !== degreeOrder[b.degree]) {
          return degreeOrder[a.degree] - degreeOrder[b.degree];
        }
        if (a.batchNo !== b.batchNo) {
          return a.batchNo - b.batchNo;
        }
        return a.rollNo - b.rollNo;
      });

      setStudents(sortedStudents);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students ❌");
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Student deleted successfully ✅");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting student ❌");
    }
  };

  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
      setEditStudent(null);
    }
  };

  const handleEditClick = (student, e) => {
    e.stopPropagation();
    if (editStudent && editStudent._id === student._id) {
      setEditStudent(null);
    } else {
      setEditStudent({ ...student, password: "" });
      setExpandedRow(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedStudent = { ...editStudent, [name]: value };

    if (name === "cnic") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 14) return;
    }

    if (
      name === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      toast.warn("Invalid email format ⚠️");
    }

    const { degree, program, batchNo, rollNo } = updatedStudent;
    if (degree && program && batchNo && rollNo) {
      updatedStudent.username = `${degree}-${program}-${batchNo}-${rollNo}`;
    }

    setEditStudent(updatedStudent);
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editStudent.cnic.length !== 13) {
        toast.error("CNIC must be exactly 13 digits ❌");
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/updateUser/${editStudent._id}`,
        editStudent,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Student updated successfully ✅");
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email, CNIC or username already exists ❌");
      } else {
        toast.error("Error updating student ❌");
      }
      console.error(error);
    }
  };

  const resetPassword = (id) => {
    if (editStudent && editStudent._id === id) {
      setEditStudent((prev) => ({ ...prev, password: "asdf1234" }));
      toast.success("Password set to asdf1234 (not yet saved) ✅");
    }
  };

  // Filter students based on search

  useEffect(() => {
    let results = [...students]; // Start with all students

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const lowercasedSearch = mainSearch.toLowerCase();
      results = results.filter(
        (s) =>
          `${s.firstName} ${s.lastName}`
            .toLowerCase()
            .includes(lowercasedSearch) ||
          s.cnic?.toLowerCase().includes(lowercasedSearch) ||
          s.email?.toLowerCase().includes(lowercasedSearch) ||
          s.username?.toLowerCase().includes(lowercasedSearch) ||
          s.degree?.toLowerCase().includes(lowercasedSearch) ||
          s.program?.toLowerCase().includes(lowercasedSearch) ||
          s.batchNo?.toString().includes(lowercasedSearch) ||
          s.rollNo?.toString().includes(lowercasedSearch),
      );
    }

    // Apply full name search if it exists (from filter options)
    if (fullNameSearch) {
      const lowercasedSearch = fullNameSearch.toLowerCase();
      results = results.filter((s) =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply CNIC search if it exists (from filter options)
    if (cnicSearch) {
      const lowercasedSearch = cnicSearch.toLowerCase();
      results = results.filter((s) =>
        s.cnic?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply email search if it exists (from filter options)
    if (emailSearch) {
      const lowercasedSearch = emailSearch.toLowerCase();
      results = results.filter((s) =>
        s.email?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply username search if it exists (from filter options)
    if (usernameSearch) {
      const lowercasedSearch = usernameSearch.toLowerCase();
      results = results.filter((s) =>
        s.username?.toLowerCase().includes(lowercasedSearch),
      );
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
    cnicSearch,
    emailSearch,
    usernameSearch, // USERNAME ADDED TO DEPENDENCIES
    alphabetFilter,
    students,
  ]);

  // --- HELPER FUNCTIONS ---
  // Updated clearAllSearches function
  const clearAllSearches = () => {
    setMainSearch("");
    setFullNameSearch("");
    setCnicSearch("");
    setEmailSearch("");
    setUsernameSearch(""); // USERNAME ADDED TO CLEAR FUNCTION
    setAlphabetFilter("");
  };

  // Updated hasActiveSearch check ( agar aapko kahin use karna ho toh )
  const hasActiveSearch =
    mainSearch ||
    fullNameSearch ||
    cnicSearch ||
    emailSearch ||
    usernameSearch || // USERNAME ADDED TO CHECK
    alphabetFilter;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePrint = () => {
    if (students.length === 0) {
      toast.error("No students to print ❌");
      return;
    }

    const printSection = document.getElementById("print-section");
    printSection.style.display = "block";
    window.print();
    printSection.style.display = "none";
  };

  return (
    <div>
      {/* Print Section */}
      <div id="print-section" style={{ display: "none" }}>
        <div className="flex flex-col items-center mb-6 ">
          <img src="/logo.jpg" alt="Logo" className="w-25 h-auto mb-2" />
          <h1 className="text-2xl font-bold mb-1">Department Library</h1>
          <h2 className="text-lg mb-1">Department of Computer Science</h2>
          <h2 className="text-lg">University of Peshawar</h2>
        </div>
        <table className="w-full border-collapse mx-auto ">
          <thead>
            <tr className="">
              <th style={thStyle}>#</th>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>CNIC</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Username</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, index) => (
              <tr key={s._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  {s.firstName} {s.lastName}
                </td>
                <td style={tdStyle}>{s.cnic}</td>
                <td style={tdStyle}>{s.email}</td>
                <td style={tdStyle}>{s.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Search + Print */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full max-w-3xl mx-auto">
        {/* Search (centered) */}
        {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
        <div className="flex-1">
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
                  placeholder="Search students by name, CNIC, email..."
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

        {/* Print Button (right aligned) */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white
    rounded-lg shadow-md transition
    bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F]"
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
              strokeWidth={1.5}
              d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"
            />
          </svg>
          Print
        </button>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* <table className="min-w-full border border-gray-300 rounded-lg"> */}
          <table
            className={`min-w-full border border-gray-300 rounded-lg transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <thead className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">CNIC</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <React.Fragment key={student._id}>
                  <tr
                    className={`border-b transition-colors ${
                      darkMode
                        ? "bg-gray-800 text-white border-t border-gray-700"
                        : "bg-white text-black border-t border-gray-400"
                    }`}
                  >
                    <td className="px-4 py-2">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-4 py-2">{student.cnic}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.username}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        onClick={() => toggleRow(student._id)}
                      >
                        <AiOutlineEye size={18} />
                      </button>
                      <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        onClick={(e) => handleEditClick(student, e)}
                      >
                        <AiOutlineEdit size={18} />
                      </button>
                      <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteStudent(student._id);
                        }}
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </td>
                  </tr>

                  {/* Show Details */}
                  {expandedRow === student._id && (
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
                            className={`h-1 ${darkMode ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}
                          ></div>

                          <div className="p-6 max-w-5xl mx-auto">
                            {/* Header with title */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    darkMode ? "bg-blue-900/50" : "bg-blue-100"
                                  }`}
                                >
                                  <svg
                                    className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
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
                                  Student Details
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Academic Information */}
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
                                    Academic Information
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Degree
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {student.degree}
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
                                      {student.program}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Batch
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {student.batchNo}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* System Information */}
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
                                    System Information
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Roll No
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {student.rollNo}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Created
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {new Date(
                                        student.createdAt,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span
                                      className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                    >
                                      Updated
                                    </span>
                                    <span
                                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {new Date(
                                        student.updatedAt,
                                      ).toLocaleDateString()}
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
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <span
                                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                  >
                                    Last active recently
                                  </span>
                                </div>
                                <div
                                  className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                                >
                                  ID: {student._id}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Edit Area */}
                  {editStudent && editStudent._id === student._id && (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <div
                          className={`relative overflow-hidden transition-all duration-500 ${
                            darkMode
                              ? "bg-gradient-to-b from-gray-800 to-gray-900"
                              : "bg-gradient-to-b from-blue-50 to-white"
                          }`}
                        >
                          {/* Decorative top border */}
                          <div
                            className={`h-1 ${darkMode ? "bg-gradient-to-r from-green-600 to-blue-600" : "bg-gradient-to-r from-green-500 to-blue-500"}`}
                          ></div>

                          <div className="p-6 max-w-5xl mx-auto">
                            {/* Header with title */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    darkMode
                                      ? "bg-green-900/50"
                                      : "bg-green-100"
                                  }`}
                                >
                                  <svg
                                    className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </div>
                                <h3
                                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                                >
                                  Edit Student Information
                                </h3>
                              </div>
                              <button
                                onClick={() => setEditStudent(null)}
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
                                  Cancel
                                </span>
                              </button>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              {/* Personal Information Section */}
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
                                    Personal Information
                                  </h4>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      First Name
                                    </label>
                                    <input
                                      name="firstName"
                                      value={editStudent.firstName}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="First Name"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      name="lastName"
                                      value={editStudent.lastName}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="Last Name"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      CNIC
                                    </label>
                                    <input
                                      name="cnic"
                                      value={editStudent.cnic}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="CNIC (14 digits)"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Email
                                    </label>
                                    <input
                                      name="email"
                                      value={editStudent.email}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="Email"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Academic Information Section */}
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
                                    Academic Information
                                  </h4>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Degree
                                    </label>
                                    <select
                                      name="degree"
                                      value={editStudent.degree || ""}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white"
                                          : "bg-white border-gray-300 text-gray-900"
                                      }`}
                                    >
                                      <option value="">Select Degree</option>
                                      <option value="BS">BS</option>
                                      <option value="MS">MS</option>
                                      <option value="PhD">PhD</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Program
                                    </label>
                                    <select
                                      name="program"
                                      value={editStudent.program || ""}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white"
                                          : "bg-white border-gray-300 text-gray-900"
                                      }`}
                                    >
                                      <option value="">Select Program</option>
                                      <option value="CS">
                                        Computer Science
                                      </option>
                                      <option value="AI">
                                        Artificial Intelligence
                                      </option>
                                      <option value="CSec">
                                        Cyber Security
                                      </option>
                                      <option value="DS">Data Science</option>
                                      <option value="SE">
                                        Software Engineering
                                      </option>
                                    </select>
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Batch No
                                    </label>
                                    <input
                                      name="batchNo"
                                      value={editStudent.batchNo}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="Batch No"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                    >
                                      Roll No
                                    </label>
                                    <input
                                      name="rollNo"
                                      value={editStudent.rollNo}
                                      onChange={handleInputChange}
                                      className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                        darkMode
                                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                      }`}
                                      placeholder="Roll No"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* System Information Section */}
                            <div
                              className={`p-4 rounded-xl ${darkMode ? "bg-gray-800/50" : "bg-white/80"} border ${darkMode ? "border-gray-700" : "border-gray-200"} mb-6`}
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <div
                                  className={`w-2 h-2 rounded-full ${darkMode ? "bg-yellow-400" : "bg-yellow-600"}`}
                                ></div>
                                <h4
                                  className={`text-sm font-semibold uppercase tracking-wide ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                  System Information
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    Username
                                  </label>
                                  <input
                                    name="username"
                                    value={editStudent.username}
                                    readOnly
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-gray-400"
                                        : "bg-gray-100 border-gray-300 text-gray-600"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <label
                                    className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    Password
                                  </label>
                                  <input
                                    name="password"
                                    value={editStudent.password || ""}
                                    readOnly
                                    placeholder="Password (after reset)"
                                    className={`w-full px-3 py-2 rounded-lg border ${
                                      darkMode
                                        ? "bg-gray-700 border-gray-600 text-gray-400"
                                        : "bg-gray-100 border-gray-300 text-gray-600"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                              <button
                                onClick={saveChanges}
                                className="px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Save Changes
                              </button>
                              <button
                                onClick={() => resetPassword(student._id)}
                                className="px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                Reset Password
                              </button>
                              <button
                                onClick={() => setEditStudent(null)}
                                className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                Cancel
                              </button>
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

export default AllStudents;
