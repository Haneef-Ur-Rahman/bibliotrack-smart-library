// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// function AdminUpdateProfile() {
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
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
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
//         "${import.meta.env.VITE_API_URL}/auth/update-password",
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
// }

// export default AdminUpdateProfile;

//----------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FaArrowLeft } from "react-icons/fa";
// import FooterAll from "../../Footer/FooterAll";

// const AdminUpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     username: "",
//     cnic: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ✅ Fetch admin details
//   useEffect(() => {
//     const fetchAdminData = async () => {
//       if (!token) {
//         toast.error("Not logged in");
//         navigate("/admin-login");
//         return;
//       }

//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const user = res.data.user;
//         if (!user) throw new Error("User data not found");

//         setFormData({
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           phoneNumber: user.phoneNumber || "",
//           username: user.username ? user.username.toLowerCase() : "",
//           cnic: user.cnic || "",
//           email: user.email || "",
//           password: "",
//         });

//         console.log("Fetched Admin:", user);
//       } catch (err) {
//         console.error("Error fetching admin data:", err);
//         const message = err.response?.data?.message || "Failed to load profile";
//         toast.error(message);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/admin-login");
//         }
//       }
//     };

//     fetchAdminData();
//   }, [token, navigate]);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.put(
//         "${import.meta.env.VITE_API_URL}/auth/admin/update-profile",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success(res.data.message || "Profile updated successfully ✅");
//       setTimeout(() => navigate("/admin-home"), 1500);
//     } catch (err) {
//       console.error("Profile update error:", err);
//       const message = err.response?.data?.message || "Update failed ❌";
//       toast.error(message);
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/admin-login");
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#28156F] to-[#d6d6f5] min-h-screen flex flex-col">
//       {/* Back Button */}
//       <div className="p-4">
//         <button
//           onClick={() => navigate("/admin-home")}
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
//             Admin Profile
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//             />

//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//             />

//             <input
//               type="text"
//               name="cnic"
//               value={formData.cnic}
//               onChange={handleChange}
//               placeholder="CNIC (Without dashes)"
//               className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//             />

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter new password (optional)"
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
//               Update Profile
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Footer with gap */}
//       <div className="mt-10">
//         <FooterAll />
//       </div>
//     </div>
//   );
// };

// export default AdminUpdateProfile;

//----------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import FooterAll from "../../Footer/FooterAll";
import AdminNavbar from "../Navbar/AdminNavbar";

const AdminUpdateProfile = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    cnic: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch admin details
  useEffect(() => {
    const fetchAdminData = async () => {
      if (!token) {
        toast.error("Not logged in");
        navigate("/admin-login");
        return;
      }

      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        if (!user) throw new Error("User data not found");

        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          username: user.username ? user.username.toLowerCase() : "",
          cnic: user.cnic || "",
          email: user.email || "",
          password: "",
        });

        console.log("Fetched Admin:", user);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        const message = err.response?.data?.message || "Failed to load profile";
        toast.error(message);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin-login");
        }
      }
    };

    fetchAdminData();
  }, [token, navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "${import.meta.env.VITE_API_URL}/auth/admin/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(res.data.message || "Profile updated successfully ✅");
      setTimeout(() => navigate("/admin-home"), 1500);
    } catch (err) {
      console.error("Profile update error:", err);
      const message = err.response?.data?.message || "Update failed ❌";
      toast.error(message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin-login");
      }
    }
  };

  return (
    <>
      <AdminNavbar darkMode={darkMode} />
      <div
        className={`bg-gradient-to-b min-h-screen flex flex-col ${
          darkMode ? "from-[#0f172a] via-[#020617]" : "white"
        }`}
      >
        {/* Back Button */}
        {/* Header Section */}
        <div
          className={`px-6 py-4 ${darkMode ? "bg-slate-800/50" : "bg-white/70"} backdrop-blur-sm border-b ${darkMode ? "border-slate-700" : "border-gray-300"}`}
        >
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/admin-home")}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] ${
                darkMode
                  ? "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] border-slate-700 hover:border-slate-600"
                  : "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] border border-gray-400 hover:border-gray-300"
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
        <div className="flex-grow flex items-center justify-center mt-2">
          <div
            className={`p-6 rounded-2xl shadow-2xl max-w-2xl w-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-900 text-white border border-gray-700"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  darkMode ? "bg-indigo-900/50" : "bg-indigo-100"
                }`}
              >
                <svg
                  className={`w-8 h-8 ${darkMode ? "text-white" : "text-[#1F2A4F]"}`}
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
              <h2
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Admin Profile
              </h2>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Update your personal information
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    darkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          darkMode
                            ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                            : "bg-white text-black border-gray-300 placeholder-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          darkMode
                            ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                            : "bg-white text-black border-gray-300 placeholder-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    darkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Account Information
                </h3>
                {/* <div className="space-y-4"> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                          : "bg-white text-black border-gray-300 placeholder-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                          : "bg-white text-black border-gray-300 placeholder-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      CNIC
                    </label>
                    <input
                      type="text"
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="CNIC (Without dashes)"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                          : "bg-white text-black border-gray-300 placeholder-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                          : "bg-white text-black border-gray-300 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 pb-2 border-b ${
                    darkMode
                      ? "border-gray-700 text-gray-300"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Security
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password (optional)"
                        className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          darkMode
                            ? "bg-gray-800 text-white border-gray-400 placeholder-gray-400"
                            : "bg-white text-black border-gray-300 placeholder-gray-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-3.5 p-1 rounded ${
                          darkMode
                            ? "text-gray-400 hover:text-gray-300"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {showPassword ? (
                          <AiOutlineEye size={20} />
                        ) : (
                          <AiOutlineEyeInvisible size={20} />
                        )}
                      </button>
                    </div>
                    <p
                      className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Leave blank to keep current password
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
                  darkMode
                    ? "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F]"
                    : "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F]"
                }`}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
        {/* Footer with gap */}
        <div className="mt-10">
          <FooterAll />
        </div>
      </div>
    </>
  );
};

export default AdminUpdateProfile;
