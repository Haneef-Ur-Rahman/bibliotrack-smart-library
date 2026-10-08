// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const UpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     country: "",
//     province: "",
//     city: "",
//   });
//   const [userId, setUserId] = useState("");
//   const [message, setMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Country → Province → City data
//   const countries = ["Pakistan", "India", "USA", "UK", "Canada"];
//   const provinces = {
//     Pakistan: ["Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan"],
//     India: ["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Tamil Nadu"],
//     USA: ["California", "Texas", "New York", "Florida", "Illinois"],
//     UK: ["England", "Scotland", "Wales", "Northern Ireland"],
//     Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
//   };
//   const cities = {
//     Punjab: ["Lahore", "Faisalabad", "Multan", "Rawalpindi"],
//     Sindh: ["Karachi", "Hyderabad", "Sukkur"],
//     KPK: ["Peshawar", "Mardan", "Abbottabad"],
//     Balochistan: ["Quetta", "Gwadar", "Turbat"],
//     "Gilgit-Baltistan": ["Gilgit", "Skardu"],
//     Maharashtra: ["Mumbai", "Pune", "Nagpur"],
//     Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
//     Delhi: ["New Delhi"],
//     Karnataka: ["Bengaluru", "Mysore"],
//     "Tamil Nadu": ["Chennai", "Coimbatore"],
//     California: ["Los Angeles", "San Francisco", "San Diego"],
//     Texas: ["Houston", "Dallas", "Austin"],
//     "New York": ["New York City", "Buffalo"],
//     Florida: ["Miami", "Orlando", "Tampa"],
//     Illinois: ["Chicago", "Springfield"],
//     England: ["London", "Manchester", "Birmingham"],
//     Scotland: ["Edinburgh", "Glasgow"],
//     Wales: ["Cardiff", "Swansea"],
//     "Northern Ireland": ["Belfast", "Derry"],
//     Ontario: ["Toronto", "Ottawa"],
//     Quebec: ["Montreal", "Quebec City"],
//     "British Columbia": ["Vancouver", "Victoria"],
//     Alberta: ["Calgary", "Edmonton"],
//     Manitoba: ["Winnipeg", "Brandon"],
//   };

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user; // correct
//         setUserId(user._id);
//         setFormData({
//           username: user.username,
//           email: user.email,
//           password: "",
//           country: user.country,
//           province: user.province,
//           city: user.city,
//         });
//       } catch (error) {
//         console.log("Error fetching user: ", error);
//         setMessage("Failed to fetch user, try again later");
//       }
//     };
//     fetchUser();
//   }, [token]);

//   // Handle form field changes
//   const HandleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "country") {
//       setFormData({ ...formData, country: value, province: "", city: "" });
//     } else if (name === "province") {
//       setFormData({ ...formData, province: value, city: "" });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Submit updated profile
//   const HandleSubmit = async (e) => {
//     e.preventDefault();
//     const updateData = { ...formData };
//     if (!updateData.password) delete updateData.password;

//     try {
//       await axios.put(`http://localhost:3002/auth/user/${userId}`, updateData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage("Profile updated successfully");
//       setTimeout(() => navigate("/home"), 2000);
//     } catch (error) {
//       console.log("Full error object:", error);
//       console.log("Error response:", error.response);
//       setMessage(
//         error.response?.data?.error || "Update failed, try again later"
//       );
//     }
//   };

//   return (
//     <div
//       style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
//     >
//       <form
//         onSubmit={HandleSubmit}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//           width: "100%",
//           maxWidth: "500px",
//           padding: "2rem",
//           border: "1px solid #ccc",
//           borderRadius: "0.5rem",
//           backgroundColor: "#f9f9f9",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "bold",
//             textAlign: "center",
//             color: "blue",
//           }}
//         >
//           Update Profile
//         </h1>

//         {/* Username & Email */}
//         {["username", "email"].map((field) => (
//           <input
//             key={field}
//             type="text"
//             name={field}
//             value={formData[field]}
//             onChange={HandleChange}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             style={{
//               padding: "0.5rem",
//               border: "1px solid #ccc",
//               borderRadius: "0.25rem",
//             }}
//           />
//         ))}

//         {/* Password */}
//         <div style={{ position: "relative", width: "100%" }}>
//           <input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             value={formData.password}
//             onChange={HandleChange}
//             placeholder="Password"
//             style={{
//               width: "100%",
//               padding: "0.5rem 2.5rem 0.5rem 0.5rem",
//               border: "1px solid #ccc",
//               borderRadius: "0.25rem",
//               fontSize: "1rem",
//               boxSizing: "border-box",
//             }}
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               position: "absolute",
//               right: "0.75rem",
//               top: "50%",
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//               color: "#6b7280",
//               fontSize: "1.2rem",
//             }}
//           >
//             {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//           </span>
//         </div>

//         {/* Country */}
//         <select
//           name="country"
//           value={formData.country}
//           onChange={HandleChange}
//           style={{
//             padding: "0.5rem",
//             border: "1px solid #ccc",
//             borderRadius: "0.25rem",
//           }}
//         >
//           <option value="">Select Country</option>
//           {countries.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         {/* Province */}
//         <select
//           name="province"
//           value={formData.province}
//           onChange={HandleChange}
//           disabled={!formData.country}
//           style={{
//             padding: "0.5rem",
//             border: "1px solid #ccc",
//             borderRadius: "0.25rem",
//           }}
//         >
//           <option value="">Select Province</option>
//           {provinces[formData.country]?.map((p) => (
//             <option key={p} value={p}>
//               {p}
//             </option>
//           ))}
//         </select>

//         {/* City */}
//         <select
//           name="city"
//           value={formData.city}
//           onChange={HandleChange}
//           disabled={!formData.province}
//           style={{
//             padding: "0.5rem",
//             border: "1px solid #ccc",
//             borderRadius: "0.25rem",
//           }}
//         >
//           <option value="">Select City</option>
//           {cities[formData.province]?.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           style={{
//             padding: "0.5rem",
//             backgroundColor: "#3b82f6",
//             color: "#fff",
//             fontWeight: "bold",
//             borderRadius: "0.25rem",
//             cursor: "pointer",
//           }}
//         >
//           Update
//         </button>

//         {message && (
//           <p
//             style={{
//               color: "#ef4444",
//               textAlign: "center",
//               fontWeight: "bold",
//             }}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

//-----------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const StudentUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;

//         setFormData({
//           firstName: user.firstName,
//           lastName: user.lastName,
//           degree: user.degree,
//           program: user.program,
//           batchNo: user.batchNo,
//           rollNo: user.rollNo,
//           email: user.email,
//           password: "",
//         });
//       } catch (err) {
//         console.error("Error fetching student:", err);
//         toast.error("Failed to load profile details ❌");
//       }
//     };
//     fetchStudentData();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.password.trim()) {
//       toast.error("Password field cannot be empty ⚠️");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:3002/auth/update-password",
//         { password: formData.password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message || "Password updated successfully ✅");
//       setTimeout(() => navigate("/student-home"), 2000);
//     } catch (err) {
//       console.error("Password update error:", err);
//       toast.error("Failed to update password ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#28156F] to-[#d6d6f5]">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-center text-2xl font-bold text-[#28156F] mb-4">
//           Update Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Read-Only Fields */}
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             disabled
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="degree"
//               value={formData.degree}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="program"
//               value={formData.program}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="batchNo"
//               value={formData.batchNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {/* Editable Password Field */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               className="w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//             >
//               {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentUpdateProfile;
//-----------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const StudentUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Fetch student data on component mount
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // const user = res.data.user;
//         const user = res.data;

//         setFormData({
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           degree: user.degree || "",
//           program: user.program || "",
//           batchNo: user.batchNo || "",
//           rollNo: user.rollNo || "",
//           email: user.email || "",
//           password: "",
//         });
//       } catch (err) {
//         console.error("Error fetching student data:", err);
//         toast.error("Failed to load profile details ❌");
//       }
//     };

//     fetchStudentData();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.password.trim()) {
//       toast.warning("Password cannot be empty ⚠️");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:3002/auth/update-password",
//         { password: formData.password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message || "Password updated successfully ✅");
//       setTimeout(() => navigate("/student-home"), 2000);
//     } catch (err) {
//       console.error("Password update error:", err);
//       toast.error("Failed to update password ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#28156F] to-[#d6d6f5]">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-center text-2xl font-bold text-[#28156F] mb-4">
//           Student Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Read-Only Fields */}
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             disabled
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="degree"
//               value={formData.degree}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="program"
//               value={formData.program}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="batchNo"
//               value={formData.batchNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {/* Editable Password Field */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               className="w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//             >
//               {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentUpdateProfile;

//---------------------------------------------------------------------------------------

// // ✅ StudentUpdateProfile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const StudentUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     cnic: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (!token) {
//         toast.error("Not logged in");
//         navigate("/member-login");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // ✅ Expect { user }
//         const user = res.data.user;
//         setFormData({
//           firstName: user?.firstName || "",
//           lastName: user?.lastName || "",
//           cnic: user?.cnic || "",
//           degree: user?.degree || "",
//           program: user?.program || "",
//           batchNo: user?.batchNo || "",
//           rollNo: user?.rollNo || "",
//           email: user?.email || "",
//           password: "",
//         });
//         console.log("User response from backend:", res.data);
//       } catch (err) {
//         console.error("Error fetching student data:", err);
//         const status = err.response?.status;
//         const message = err.response?.data?.message;
//         if (status === 401) {
//           toast.error(message || "Session expired. Please log in again.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("role");
//           navigate("/member-login");
//         } else {
//           toast.error("Failed to load profile details ❌");
//         }
//       }
//     };

//     fetchStudentData();
//   }, [token, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.password.trim()) {
//       toast.warning("Password cannot be empty ⚠️");
//       return;
//     }
//     try {
//       const res = await axios.put(
//         "http://localhost:3002/auth/update-password",
//         { password: formData.password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(res.data.message || "Password updated successfully ✅");
//       setTimeout(() => navigate("/student-home"), 1500);
//     } catch (err) {
//       console.error("Password update error:", err);
//       const status = err.response?.status;
//       if (status === 401) {
//         toast.error(err.response?.data?.message || "Session expired");
//         localStorage.removeItem("token");
//         navigate("/member-login");
//       } else {
//         toast.error("Failed to update password ❌");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#28156F] to-[#d6d6f5]">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-center text-2xl font-bold text-[#28156F] mb-4">
//           Student Profile
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <input
//             type="text"
//             name="cnic"
//             value={formData.cnic}
//             placeholder=" CNIC (Without dashes)"
//             disabled
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             disabled
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="degree"
//               value={formData.degree}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="program"
//               value={formData.program}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="text"
//               name="batchNo"
//               value={formData.batchNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               disabled
//               className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               className="w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//             >
//               {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentUpdateProfile;

//---------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaArrowLeft } from "react-icons/fa";

// const StudentUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     cnic: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (!token) {
//         toast.error("Not logged in");
//         navigate("/member-login");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const user = res.data.user;
//         setFormData({
//           firstName: user?.firstName || "",
//           lastName: user?.lastName || "",
//           cnic: user?.cnic || "",
//           degree: user?.degree || "",
//           program: user?.program || "",
//           batchNo: user?.batchNo || "",
//           rollNo: user?.rollNo || "",
//           email: user?.email || "",
//           password: "",
//         });
//       } catch (err) {
//         console.error("Error fetching student data:", err);
//         toast.error("Failed to load profile details ❌");
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/member-login");
//         }
//       }
//     };

//     fetchStudentData();
//   }, [token, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.password.trim()) {
//       toast.warning("Password cannot be empty ⚠️");
//       return;
//     }
//     try {
//       const res = await axios.put(
//         "http://localhost:3002/auth/update-password",
//         { password: formData.password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(res.data.message || "Password updated successfully ✅");
//       setTimeout(() => navigate("/student-home"), 1500);
//     } catch (err) {
//       console.error("Password update error:", err);
//       toast.error("Failed to update password ❌");
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#28156F] to-[#d6d6f5] min-h-screen flex flex-col">
//       {/* Back Button */}
//       <div className="p-4">
//         <button
//           onClick={() => navigate("/student-home")}
//           className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-4 py-2 rounded-[10px] border-2 border-white shadow-md hover:from-indigo-800 hover:to-indigo-600 transition-all duration-300"
//         >
//           <FaArrowLeft className="text-lg" />
//           <span className="font-medium">Back</span>
//         </button>
//       </div>

//       {/* Form Section */}
//       <div className="flex-grow flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//           <h2 className="text-center text-2xl font-bold text-[#28156F] mb-4">
//             Student Profile
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* CNIC & Email */}
//             <input
//               type="text"
//               name="cnic"
//               value={formData.cnic}
//               disabled
//               className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               disabled
//               className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />

//             {/* Degree / Program */}
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="program"
//                 value={formData.program}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Batch / Roll */}
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 name="batchNo"
//                 value={formData.batchNo}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="text"
//                 name="rollNo"
//                 value={formData.rollNo}
//                 disabled
//                 className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter new password"
//                 className="w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//               >
//                 {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//               </span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//             >
//               Update Password
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentUpdateProfile;

//---------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaArrowLeft } from "react-icons/fa";
// import Navbar from "../Navbar/Navbar"; // Add navbar import
// import FooterAll from "../../Footer/FooterAll"; // Add footer import

// const StudentUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     degree: "",
//     program: "",
//     batchNo: "",
//     rollNo: "",
//     cnic: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (!token) {
//         toast.error("Not logged in");
//         navigate("/member-login");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const user = res.data.user;
//         setFormData({
//           firstName: user?.firstName || "",
//           lastName: user?.lastName || "",
//           cnic: user?.cnic || "",
//           degree: user?.degree || "",
//           program: user?.program || "",
//           batchNo: user?.batchNo || "",
//           rollNo: user?.rollNo || "",
//           email: user?.email || "",
//           password: "",
//         });
//       } catch (err) {
//         console.error("Error fetching student data:", err);
//         toast.error("Failed to load profile details ❌");
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/member-login");
//         }
//       }
//     };

//     fetchStudentData();
//   }, [token, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.password.trim()) {
//       toast.warning("Password cannot be empty ⚠️");
//       return;
//     }
//     try {
//       const res = await axios.put(
//         "http://localhost:3002/auth/update-password",
//         { password: formData.password },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(res.data.message || "Password updated successfully ✅");
//       setTimeout(() => navigate("/student-home"), 1500);
//     } catch (err) {
//       console.error("Password update error:", err);
//       toast.error("Failed to update password ❌");
//     }
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <Navbar />

//       <div className="bg-gradient-to-b from-[#28156F] to-[#d6d6f5] min-h-screen flex flex-col">
//         {/* Back Button */}
//         <div className="p-4">
//           <button
//             onClick={() => navigate("/student-home")}
//             className="flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-4 py-2 rounded-[10px] border-2 border-white shadow-md hover:from-indigo-800 hover:to-indigo-600 transition-all duration-300"
//           >
//             <FaArrowLeft className="text-lg" />
//             <span className="font-medium">Back</span>
//           </button>
//         </div>

//         {/* Form Section */}
//         <div className="flex-grow flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-center text-2xl font-bold text-[#28156F] mb-4">
//               Student Profile
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name */}
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//               </div>

//               {/* CNIC & Email */}
//               <input
//                 type="text"
//                 name="cnic"
//                 value={formData.cnic}
//                 disabled
//                 className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 disabled
//                 className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//               />

//               {/* Degree / Program */}
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="text"
//                   name="degree"
//                   value={formData.degree}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//                 <input
//                   type="text"
//                   name="program"
//                   value={formData.program}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//               </div>

//               {/* Batch / Roll */}
//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   type="text"
//                   name="batchNo"
//                   value={formData.batchNo}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//                 <input
//                   type="text"
//                   name="rollNo"
//                   value={formData.rollNo}
//                   disabled
//                   className="border p-2 rounded bg-gray-100 cursor-not-allowed"
//                 />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter new password"
//                   className="w-full border p-2 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//               >
//                 Update Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <FooterAll />
//     </>
//   );
// };

// export default StudentUpdateProfile;

//------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import FooterAll from "../../Footer/FooterAll";

const StudentUpdateProfile = ({ darkMode }) => {
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
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!token) {
        toast.error("Not logged in");
        navigate("/member-login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3002/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        setFormData({
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          cnic: user?.cnic || "",
          degree: user?.degree || "",
          program: user?.program || "",
          batchNo: user?.batchNo || "",
          rollNo: user?.rollNo || "",
          email: user?.email || "",
          password: "",
        });
      } catch (err) {
        console.error("Error fetching student data:", err);
        toast.error("Failed to load profile details ❌");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/member-login");
        }
      }
    };

    fetchStudentData();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password.trim()) {
      toast.warning("Password cannot be empty ⚠️");
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:3002/auth/update-password",
        { password: formData.password },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(res.data.message || "Password updated successfully ✅");
      setTimeout(() => navigate("/student-home"), 1500);
    } catch (err) {
      console.error("Password update error:", err);
      toast.error("Failed to update password ❌");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar darkMode={darkMode} />

      <div
        className={`min-h-screen flex flex-col ${darkMode ? "bg-slate-900" : "bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-t border-gray-400"}`}
      >
        {/* Header Section */}
        <div
          className={`px-6 py-4 ${darkMode ? "bg-slate-800/50" : "bg-white/70"} backdrop-blur-sm border-b ${darkMode ? "border-slate-700" : "border-gray-100"}`}
        >
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("/student-home")}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                darkMode
                  ? "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] hover:border-slate-600"
                  : "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] border-gray-400 hover:border-gray-300 shadow-sm"
              }`}
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center px- py-8">
          <div
            className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-500"}`}
          >
            {/* Header */}
            <div
              className={`px-8 py-6 border-b ${darkMode ? "border-slate-700 bg-slate-900/50" : " bg-gray-50/50 "} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? "bg-indigo-500/20 text-[#1F2A4F]" : "bg-indigo-100 text-[#1F2A4F]"}`}
                >
                  <svg
                    className="w-6 h-6"
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
                  <h2
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Student Profile
                  </h2>
                  <p
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}
                  >
                    View and update your profile information
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 ">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
                  >
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
                  >
                    Contact Information
                  </h3>
                  {/* <div className="space-y-4"> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        CNIC
                      </label>
                      <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
                  >
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Program
                      </label>
                      <input
                        type="text"
                        name="program"
                        value={formData.program}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Batch Number
                      </label>
                      <input
                        type="text"
                        name="batchNo"
                        value={formData.batchNo}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Roll Number
                      </label>
                      <input
                        type="text"
                        name="rollNo"
                        value={formData.rollNo}
                        disabled
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-gray-500"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div>
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-4`}
                  >
                    Security
                  </h3>
                  <div className="relative">
                    <label
                      className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className={`w-full px-4 py-2.5 pr-12 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-9 p-1 rounded-md transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {showPassword ? (
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
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
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl font-medium text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterAll />
      </div>
    </>
  );
};

export default StudentUpdateProfile;
