// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AddStudent = () => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     cnic: "",
//     email: "",
//     password: "",
//     acceptedTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:3002/auth/member/signup", form);
//       toast.success("Student registered successfully ✅");
//       setForm({
//         firstName: "",
//         lastName: "",
//         degree: "",
//         program: "",
//         batchNo: "",
//         rollNo: "",
//         cnic: "",
//         email: "",
//         password: "",
//         acceptedTerms: false,
//       });
//     } catch (error) {
//       const msg =
//         error.response?.data?.message ||
//         "Failed to register student. Please try again.";
//       toast.error(msg);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-lg mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700 text-center">
//         Add New Student
//       </h3>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div className="grid grid-cols-2 gap-2">
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="border p-2 rounded"
//           />
//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <input
//             name="degree"
//             value={form.degree}
//             onChange={handleChange}
//             placeholder="Degree"
//             className="border p-2 rounded"
//           />
//           <input
//             name="program"
//             value={form.program}
//             onChange={handleChange}
//             placeholder="Program"
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <input
//             name="batchNo"
//             value={form.batchNo}
//             onChange={handleChange}
//             placeholder="Batch No"
//             className="border p-2 rounded"
//           />
//           <input
//             name="rollNo"
//             value={form.rollNo}
//             onChange={handleChange}
//             placeholder="Roll No"
//             className="border p-2 rounded"
//           />
//         </div>

//         <input
//           name="cnic"
//           value={form.cnic}
//           onChange={handleChange}
//           placeholder="CNIC"
//           className="border p-2 rounded w-full"
//         />

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="border p-2 rounded w-full"
//         />

//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="border p-2 rounded w-full"
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             name="acceptedTerms"
//             checked={form.acceptedTerms}
//             onChange={handleChange}
//           />
//           Accept Terms & Conditions
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//         >
//           Register Student
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

//--------------------------------------------------------------

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const AddStudent = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     cnic: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     acceptedTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validations (same as MemberSignup)
//     if (!form.acceptedTerms) {
//       toast.error("You must accept the terms");
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (!/^\d{13}$/.test(form.cnic)) {
//       toast.error("CNIC must be exactly 13 digits!");
//       return;
//     }

//     const username =
//       `${form.degree}${form.program}-${form.batchNo}-${form.rollNo}`.toUpperCase();

//     const payload = {
//       ...form,
//       batchNo: Number(form.batchNo),
//       rollNo: Number(form.rollNo),
//       acceptedTerms: !!form.acceptedTerms,
//       username,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:3002/auth/member/signup",
//         payload
//       );
//       toast.success(res.data.message || "Student registered successfully ✅");

//       setForm({
//         firstName: "",
//         lastName: "",
//         degree: "",
//         program: "",
//         batchNo: "",
//         rollNo: "",
//         cnic: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         acceptedTerms: false,
//       });
//     } catch (error) {
//       const msg =
//         error.response?.data?.message ||
//         "Failed to register student. Please try again.";
//       toast.error(msg);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-lg mx-auto">
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700 text-center">
//         Add New Student
//       </h3>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div className="grid grid-cols-2 gap-2">
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="border p-2 rounded"
//             required
//           />
//         </div>

//         <input
//           name="cnic"
//           value={form.cnic}
//           onChange={handleChange}
//           placeholder="CNIC (Without dashes)"
//           className="border p-2 rounded w-full"
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="border p-2 rounded w-full"
//           required
//         />

//         <div className="grid grid-cols-2 gap-2">
//           <select
//             name="degree"
//             value={form.degree}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="" disabled>
//               Select Degree
//             </option>
//             <option value="BS">BS</option>
//             <option value="MS">MS</option>
//             <option value="PHD">PhD</option>
//           </select>

//           <select
//             name="program"
//             value={form.program}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="" disabled>
//               Select Program
//             </option>
//             <option value="CS">Computer Science</option>
//             <option value="AI">Artificial Intelligence</option>
//             <option value="CSec">Cyber Security</option>
//             <option value="DS">Data Science</option>
//             <option value="SE">Software Engineering</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <input
//             name="batchNo"
//             value={form.batchNo}
//             onChange={handleChange}
//             placeholder="Batch No"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             name="rollNo"
//             value={form.rollNo}
//             onChange={handleChange}
//             placeholder="Roll No"
//             className="border p-2 rounded"
//             required
//           />
//         </div>

//         {/* 🔹 Auto-generated Username Preview */}
//         {form.degree && form.program && form.batchNo && form.rollNo && (
//           <div className="text-center text-sm text-gray-700 font-semibold mt-1 w-full border p-2 rounded">
//             Username:{" "}
//             <span className="text-indigo-700">
//               {`${form.degree}${form.program}-${form.batchNo}-${form.rollNo}`.toUpperCase()}
//             </span>
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-2 relative">
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="border p-2 rounded w-full"
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-600 cursor-pointer"
//             >
//               {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//             </span>
//           </div>
//           <div className="relative">
//             <input
//               type={showPassword2 ? "text" : "password"}
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               className="border p-2 rounded w-full"
//               required
//             />
//             <span
//               onClick={() => setShowPassword2(!showPassword2)}
//               className="absolute right-3 top-3 text-gray-600 cursor-pointer"
//             >
//               {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//             </span>
//           </div>
//         </div>

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             name="acceptedTerms"
//             checked={form.acceptedTerms}
//             onChange={handleChange}
//           />
//           Accept Terms & Conditions
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//         >
//           Register Student
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;

//--------------------------------------------------------------

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddStudent = ({ darkMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    degree: "",
    program: "",
    batchNo: "",
    rollNo: "",
    cnic: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      toast.error("You must accept the terms");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!/^\d{13}$/.test(formData.cnic)) {
      toast.error("CNIC must be exactly 13 digits!");
      return;
    }

    const username =
      `${formData.degree}${formData.program}-${formData.batchNo}-${formData.rollNo}`.toUpperCase();

    const payload = {
      ...formData,
      batchNo: Number(formData.batchNo),
      rollNo: Number(formData.rollNo),
      acceptedTerms: !!formData.acceptedTerms,
      username,
    };

    try {
      const res = await fetch("http://localhost:3002/auth/member/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Student added successfully! 🎉");

        // Reset the form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          cnic: "",
          email: "",
          degree: "",
          program: "",
          batchNo: "",
          rollNo: "",
          password: "",
          confirmPassword: "",
          acceptedTerms: false,
        });

        // Hide password fields
        setShowPassword(false);
        setShowPassword2(false);
      } else {
        toast.error(data.message || "Failed to add student ❌");
      }
    } catch (err) {
      toast.error("An error occurred while adding student ❌");
      console.error("Error:", err);
    }
  };
  return (
    // <div className="min-h-screen flex items-center justify-center p-4">
    //   <div
    //     className={`max-w-2xl w-full mx-auto p-4 shadow-2xl rounded-2xl transition-all duration-300 ${
    //       darkMode
    //         ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700"
    //         : "bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-gray-200"
    //     }`}
    //   >
    //     {/* Header Section */}
    //     <div className="text-center mb-8">
    //       <div
    //         className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
    //           darkMode ? "bg-indigo-900/50" : "bg-indigo-100"
    //         }`}
    //       >
    //         <svg
    //           className={`w-8 h-8 ${darkMode ? "text-indigo-400" : "text-[#1F2A4F]"}`}
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //         >
    //           <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6v1H2v-1a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
    //         </svg>
    //       </div>
    //       <h2
    //         className={`text-3xl font-bold mb-2 ${
    //           darkMode ? "text-white" : "text-gray-900"
    //         }`}
    //       >
    //         Add New Student
    //       </h2>
    //       <p
    //         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
    //       >
    //         Fill in the information below to register a new student
    //       </p>
    //     </div>

    //     <form onSubmit={handleSubmit} className="space-y-6">
    //       {/* Personal Information Section */}
    //       <div>
    //         <h3
    //           className={`text-lg font-semibold mb-4 pb-2 border-b ${
    //             darkMode
    //               ? "border-gray-700 text-gray-300"
    //               : "border-gray-200 text-gray-700"
    //           }`}
    //         >
    //           Personal Information
    //         </h3>
    //         <div className="space-y-4">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 First Name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="firstName"
    //                 placeholder="First Name"
    //                 value={formData.firstName}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Last Name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="lastName"
    //                 placeholder="Last Name"
    //                 value={formData.lastName}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 CNIC
    //               </label>
    //               <input
    //                 type="text"
    //                 name="cnic"
    //                 placeholder="CNIC (Without dashes)"
    //                 value={formData.cnic}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Email
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 placeholder="Email"
    //                 value={formData.email}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Academic Information Section */}
    //       <div>
    //         <h3
    //           className={`text-lg font-semibold mb-4 pb-2 border-b ${
    //             darkMode
    //               ? "border-gray-700 text-gray-300"
    //               : "border-gray-200 text-gray-700"
    //           }`}
    //         >
    //           Academic Information
    //         </h3>
    //         <div className="space-y-4">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Degree
    //               </label>
    //               <select
    //                 name="degree"
    //                 value={formData.degree}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white"
    //                     : "bg-white border-gray-300 text-gray-900"
    //                 }`}
    //                 required
    //               >
    //                 <option value="" disabled>
    //                   Select Degree
    //                 </option>
    //                 <option value="BS">BS</option>
    //                 <option value="MS">MS</option>
    //                 <option value="PHD">PhD</option>
    //               </select>
    //             </div>
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Program
    //               </label>
    //               <select
    //                 name="program"
    //                 value={formData.program}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white"
    //                     : "bg-white border-gray-300 text-gray-900"
    //                 }`}
    //                 required
    //               >
    //                 <option value="" disabled>
    //                   Select Program
    //                 </option>
    //                 <option value="CS">Computer Science</option>
    //                 <option value="AI">Artificial Intelligence</option>
    //                 <option value="CSec">Cyber Security</option>
    //                 <option value="DS">Data Science</option>
    //                 <option value="SE">Software Engineering</option>
    //               </select>
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Batch No
    //               </label>
    //               <input
    //                 type="number"
    //                 name="batchNo"
    //                 placeholder="Batch No"
    //                 value={formData.batchNo}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Roll No
    //               </label>
    //               <input
    //                 type="number"
    //                 name="rollNo"
    //                 placeholder="Roll No"
    //                 value={formData.rollNo}
    //                 onChange={handleChange}
    //                 className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                   darkMode
    //                     ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                     : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                 }`}
    //                 required
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Username Preview */}
    //       {formData.degree &&
    //         formData.program &&
    //         formData.batchNo &&
    //         formData.rollNo && (
    //           <div
    //             className={`p-4 rounded-lg ${
    //               darkMode ? "bg-gray-700/50" : "bg-indigo-50"
    //             }`}
    //           >
    //             <div className="flex items-center gap-2 mb-2">
    //               <svg
    //                 className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
    //                 fill="currentColor"
    //                 viewBox="0 0 20 20"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //               <span
    //                 className={`text-sm font-medium ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Generated Username
    //               </span>
    //             </div>
    //             <div
    //               className={`text-center text-lg font-bold ${
    //                 darkMode ? "text-indigo-400" : "text-indigo-700"
    //               }`}
    //             >
    //               {`${formData.degree}${formData.program}-${formData.batchNo}-${formData.rollNo}`.toUpperCase()}
    //             </div>
    //           </div>
    //         )}

    //       {/* Account Information Section */}
    //       <div>
    //         <h3
    //           className={`text-lg font-semibold mb-4 pb-2 border-b ${
    //             darkMode
    //               ? "border-gray-700 text-gray-300"
    //               : "border-gray-200 text-gray-700"
    //           }`}
    //         >
    //           Account Information
    //         </h3>
    //         <div className="space-y-4">
    //           <div className="grid grid-cols-2 gap-4">
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Password
    //               </label>
    //               <div className="relative">
    //                 <input
    //                   type={showPassword ? "text" : "password"}
    //                   name="password"
    //                   placeholder="Password"
    //                   value={formData.password}
    //                   onChange={handleChange}
    //                   className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                     darkMode
    //                       ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                   }`}
    //                   required
    //                 />
    //                 <button
    //                   type="button"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                   className={`absolute right-3 top-3.5 p-1 rounded ${
    //                     darkMode
    //                       ? "text-gray-400 hover:text-gray-300"
    //                       : "text-gray-500 hover:text-gray-700"
    //                   }`}
    //                 >
    //                   {showPassword ? (
    //                     <AiOutlineEye size={20} />
    //                   ) : (
    //                     <AiOutlineEyeInvisible size={20} />
    //                   )}
    //                 </button>
    //               </div>
    //             </div>
    //             <div>
    //               <label
    //                 className={`block text-sm font-medium mb-1 ${
    //                   darkMode ? "text-gray-300" : "text-gray-700"
    //                 }`}
    //               >
    //                 Confirm Password
    //               </label>
    //               <div className="relative">
    //                 <input
    //                   type={showPassword2 ? "text" : "password"}
    //                   name="confirmPassword"
    //                   placeholder="Confirm Password"
    //                   value={formData.confirmPassword}
    //                   onChange={handleChange}
    //                   className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
    //                     darkMode
    //                       ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    //                       : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    //                   }`}
    //                   required
    //                 />
    //                 <button
    //                   type="button"
    //                   onClick={() => setShowPassword2(!showPassword2)}
    //                   className={`absolute right-3 top-3.5 p-1 rounded ${
    //                     darkMode
    //                       ? "text-gray-400 hover:text-gray-300"
    //                       : "text-gray-500 hover:text-gray-700"
    //                   }`}
    //                 >
    //                   {showPassword2 ? (
    //                     <AiOutlineEye size={20} />
    //                   ) : (
    //                     <AiOutlineEyeInvisible size={20} />
    //                   )}
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Terms and Submit */}
    //       <div className="space-y-4">
    //         <label className="flex items-start">
    //           <input
    //             type="checkbox"
    //             name="acceptedTerms"
    //             checked={formData.acceptedTerms}
    //             onChange={handleChange}
    //             className={`mt-1 mr-3 h-4 w-4 rounded border ${
    //               darkMode
    //                 ? "bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
    //                 : "bg-white border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             }`}
    //           />
    //           <span
    //             className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
    //           >
    //             I accept the{" "}
    //             <a
    //               href="#"
    //               className={`font-medium ${darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"}`}
    //             >
    //               terms and conditions
    //             </a>{" "}
    //             and{" "}
    //             <a
    //               href="#"
    //               className={`font-medium ${darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"}`}
    //             >
    //               privacy policy
    //             </a>
    //           </span>
    //         </label>
    //         <button
    //           type="submit"
    //           className="w-full bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
    //         >
    //           Add Student
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    //------------------------------------------------------------------

    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`max-w-2xl w-full mx-auto p-4 shadow-2xl rounded-2xl transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700"
            : "bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-gray-200"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-5">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode ? "bg-indigo-900/50" : "bg-indigo-100"
            }`}
          >
            <svg
              className={`w-8 h-8 ${darkMode ? "text-indigo-400" : "text-[#1F2A4F]"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6v1H2v-1a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Add New Student
          </h2>
          <p
            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Fill in the information below to register a new student
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information Section */}
          <div>
            <h3
              className={`text-base font-semibold mb-3 pb-2 border-b ${
                darkMode
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* CNIC + Email in same row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    CNIC
                  </label>
                  <input
                    type="text"
                    name="cnic"
                    placeholder="CNIC (Without dashes)"
                    value={formData.cnic}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div>
            <h3
              className={`text-base font-semibold mb-3 pb-2 border-b ${
                darkMode
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              Academic Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Degree
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  >
                    <option value="" disabled>
                      Select Degree
                    </option>
                    <option value="BS">BS</option>
                    <option value="MS">MS</option>
                    <option value="PHD">PhD</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Program
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                  >
                    <option value="" disabled>
                      Select Program
                    </option>
                    <option value="CS">Computer Science</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="CSec">Cyber Security</option>
                    <option value="DS">Data Science</option>
                    <option value="SE">Software Engineering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Batch No
                  </label>
                  <input
                    type="number"
                    name="batchNo"
                    placeholder="Batch No"
                    value={formData.batchNo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Roll No
                  </label>
                  <input
                    type="number"
                    name="rollNo"
                    placeholder="Roll No"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Username Preview */}
          {formData.degree &&
            formData.program &&
            formData.batchNo &&
            formData.rollNo && (
              <div
                className={`p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-indigo-50"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Generated Username
                  </span>
                </div>
                <div
                  className={`text-center text-base font-bold ${
                    darkMode ? "text-indigo-400" : "text-indigo-700"
                  }`}
                >
                  {`${formData.degree}${formData.program}-${formData.batchNo}-${formData.rollNo}`.toUpperCase()}
                </div>
              </div>
            )}

          {/* Account Information Section */}
          <div>
            <h3
              className={`text-base font-semibold mb-3 pb-2 border-b ${
                darkMode
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-2.5 p-1 rounded ${
                        darkMode
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPassword ? (
                        <AiOutlineEye size={18} />
                      ) : (
                        <AiOutlineEyeInvisible size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className={`absolute right-3 top-2.5 p-1 rounded ${
                        darkMode
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPassword2 ? (
                        <AiOutlineEye size={18} />
                      ) : (
                        <AiOutlineEyeInvisible size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className={`mt-1 mr-3 h-4 w-4 rounded border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500"
                    : "bg-white border-gray-300 text-indigo-600 focus:ring-indigo-500"
                }`}
              />
              <span
                className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                I accept the{" "}
                <a
                  href="#"
                  className={`font-medium ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-600 hover:text-indigo-500"
                  }`}
                >
                  terms and conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className={`font-medium ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-600 hover:text-indigo-500"
                  }`}
                >
                  privacy policy
                </a>
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white py-2 px-3 rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
