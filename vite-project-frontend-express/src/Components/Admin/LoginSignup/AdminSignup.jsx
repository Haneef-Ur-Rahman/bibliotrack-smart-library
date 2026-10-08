// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../../../index.css";
// import Navbarall from "../../Navbar/Navbarall";
// import FooterAll from "../../Footer/FooterAll";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const AdminSignup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     username: "",
//     cnic: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     passkey: "",
//     acceptedTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.acceptedTerms) {
//       toast.error("You must accept the terms");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const payload = { ...formData };
//     delete payload.confirmPassword;

//     try {
//       const res = await fetch("http://localhost:3002/auth/admin/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       toast.success("Admin registered successfully!");

//       navigate("/admin-login");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };
//   return (
//     <div className="bg-gradient-to-b from-[#2e3a87] via-[#475aa7] to-[#cfcfd6] min-h-screen">
//       <Navbarall />
//       <div className="flex items-center justify-center py-6">
//         <div className="max-w-md w-full p-3 bg-white rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-center text-dark">
//             Admin Signup
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 onChange={handleChange}
//                 className="w-full border p-1 rounded border-gray-400"
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 onChange={handleChange}
//                 className="w-full border p-1 rounded border-gray-400"
//                 required
//               />
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Phone Number"
//                 onChange={handleChange}
//                 className="w-full border p-1 rounded border-gray-400"
//                 required
//               />
//               <input
//                 type="password"
//                 name="passkey"
//                 placeholder="Enter Security Passcode"
//                 onChange={handleChange}
//                 className="w-full border border- p-1 rounded border-gray-400"
//                 required
//               />
//             </div>

//             <input
//               type="number"
//               name="cnic"
//               placeholder=" CNIC (Without dashes)"
//               onChange={handleChange}
//               className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none border-gray-400"
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               className="w-full border p-1 rounded border-gray-400"
//               required
//             />
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               onChange={handleChange}
//               className="w-full border p-1 rounded border-gray-400"
//               required
//             />
//             <div className="flex gap-2">
//               <div className="relative flex-1">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   className="w-full border p-1 rounded border-gray-400"
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                 </span>
//               </div>

//               <div className="relative flex-1">
//                 <input
//                   type={showPassword2 ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   onChange={handleChange}
//                   className="w-full border p-1 rounded border-gray-400"
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword2(!showPassword2)}
//                   className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
//                 >
//                   {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//                 </span>
//               </div>
//             </div>

//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="acceptedTerms"
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               I accept the terms of the user and Privacy Policy
//             </label>

//             <button
//               type="submit"
//               className="w-full bg-[#28156F] text-white py-2 rounded hover:bg-indigo-700"
//             >
//               Signup
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/admin-login")}
//               className="text-red-600 cursor-pointer font-semibold"
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default AdminSignup;

//-----------------------------------------------------------------

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../index.css";
import Navbarall from "../../Navbar/Navbarall";
import FooterAll from "../../Footer/FooterAll";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminSignup = ({ darkMode }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    cnic: "",
    email: "",
    password: "",
    confirmPassword: "",
    passkey: "",
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
      toast.error("Passwords do not match");
      return;
    }

    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const res = await fetch("http://localhost:3002/auth/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Admin registered successfully!");

      navigate("/admin-login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    //-------------------------------------------------------------------------------------
    // <div
    //   className={`min-h-screen transition-colors duration-300 ${
    //     darkMode
    //       ? "bg-gray-900 text-white"
    //       : "bg-gradient-to-b from-[#2e3a87] via-[#475aa7] to-[#cfcfd6] text-black"
    //   }`}
    // >
    //   <Navbarall darkMode={darkMode} />
    //   <div className="flex items-center justify-center py-6">
    //     <div
    //       className={`max-w-md w-full p-6 rounded-lg shadow-lg transition-colors duration-300 ${
    //         darkMode
    //           ? "bg-gray-800 text-white border-2 border-gray-500"
    //           : "bg-white text-black"
    //       }`}
    //     >
    //       <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>

    //       <form onSubmit={handleSubmit} className="space-y-4">
    //         <div className="flex gap-2">
    //           <input
    //             type="text"
    //             name="firstName"
    //             placeholder="First Name"
    //             onChange={handleChange}
    //             className={`w-full border p-2 rounded transition-colors duration-300 ${
    //               darkMode
    //                 ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                 : "bg-white border-gray-400 text-black"
    //             }`}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="lastName"
    //             placeholder="Last Name"
    //             onChange={handleChange}
    //             className={`w-full border p-2 rounded transition-colors duration-300 ${
    //               darkMode
    //                 ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                 : "bg-white border-gray-400 text-black"
    //             }`}
    //             required
    //           />
    //         </div>

    //         <div className="flex gap-2">
    //           <input
    //             type="text"
    //             name="phoneNumber"
    //             placeholder="Phone Number"
    //             onChange={handleChange}
    //             className={`w-full border p-2 rounded transition-colors duration-300 ${
    //               darkMode
    //                 ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                 : "bg-white border-gray-400 text-black"
    //             }`}
    //             required
    //           />
    //           <input
    //             type="password"
    //             name="passkey"
    //             placeholder="Enter Security Passcode"
    //             onChange={handleChange}
    //             className={`w-full border p-2 rounded transition-colors duration-300 ${
    //               darkMode
    //                 ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                 : "bg-white border-gray-400 text-black"
    //             }`}
    //             required
    //           />
    //         </div>

    //         <input
    //           type="number"
    //           name="cnic"
    //           placeholder="CNIC (Without dashes)"
    //           onChange={handleChange}
    //           className={`w-full border p-2 rounded transition-colors duration-300 ${
    //             darkMode
    //               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //               : "bg-white border-gray-400 text-black"
    //           }`}
    //           required
    //         />

    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Email"
    //           onChange={handleChange}
    //           className={`w-full border p-2 rounded transition-colors duration-300 ${
    //             darkMode
    //               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //               : "bg-white border-gray-400 text-black"
    //           }`}
    //           required
    //         />

    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="Username"
    //           onChange={handleChange}
    //           className={`w-full border p-2 rounded transition-colors duration-300 ${
    //             darkMode
    //               ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //               : "bg-white border-gray-400 text-black"
    //           }`}
    //           required
    //         />

    //         <div className="flex gap-2">
    //           <div className="relative flex-1">
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               name="password"
    //               placeholder="Password"
    //               onChange={handleChange}
    //               className={`w-full border p-2 rounded transition-colors duration-300 ${
    //                 darkMode
    //                   ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                   : "bg-white border-gray-400 text-black"
    //               }`}
    //               required
    //             />
    //             <span
    //               onClick={() => setShowPassword(!showPassword)}
    //               className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
    //             >
    //               {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    //             </span>
    //           </div>

    //           <div className="relative flex-1">
    //             <input
    //               type={showPassword2 ? "text" : "password"}
    //               name="confirmPassword"
    //               placeholder="Confirm Password"
    //               onChange={handleChange}
    //               className={`w-full border p-2 rounded transition-colors duration-300 ${
    //                 darkMode
    //                   ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
    //                   : "bg-white border-gray-400 text-black"
    //               }`}
    //               required
    //             />
    //             <span
    //               onClick={() => setShowPassword2(!showPassword2)}
    //               className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
    //             >
    //               {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
    //             </span>
    //           </div>
    //         </div>

    //         <label className="flex items-center">
    //           <input
    //             type="checkbox"
    //             name="acceptedTerms"
    //             onChange={handleChange}
    //             className="mr-2"
    //           />
    //           I accept the terms of the user and Privacy Policy
    //         </label>

    //         <button
    //           type="submit"
    //           className={`w-full py-2 rounded transition-colors duration-300 ${
    //             darkMode
    //               ? "bg-indigo-700 hover:bg-indigo-600 text-white"
    //               : "bg-[#28156F] hover:bg-indigo-700 text-white"
    //           }`}
    //         >
    //           Signup
    //         </button>
    //       </form>

    //       <p
    //         className={`text-center text-sm mt-4 transition-colors duration-300 ${
    //           darkMode ? "text-gray-300" : "text-gray-600"
    //         }`}
    //       >
    //         Already have an account?{" "}
    //         <span
    //           onClick={() => navigate("/admin-login")}
    //           className="text-red-600 cursor-pointer font-semibold"
    //         >
    //           Login
    //         </span>
    //       </p>
    //     </div>
    //   </div>

    //   <FooterAll darkMode={darkMode} />
    // </div>
    //-------------------------------------------------------------------------------------
    // <>
    //   <Navbarall darkMode={darkMode} />
    //   <div
    //     className={`min-h-screen flex flex-col transition-colors duration-300 ${
    //       darkMode
    //         ? "bg-gray-900 text-white"
    //         : "bg-gradient-to-b from-[#2e3a87] via-[#475aa7] to-[#cfcfd6] text-black"
    //     }`}
    //   >
    //     {/* Form Section */}
    //     <div className="flex-grow flex items-center justify-center px-4 py-12">
    //       <div
    //         className={`w-full max-w-lg p-8 rounded-2xl shadow-xl transition-all duration-300 ${
    //           darkMode
    //             ? "bg-slate-800 border border-slate-700"
    //             : "bg-white border border-gray-100"
    //         }`}
    //       >
    //         <h2
    //           className={`text-3xl font-bold text-center mb-2 ${
    //             darkMode ? "text-white" : "text-gray-900"
    //           }`}
    //         >
    //           Admin Signup
    //         </h2>
    //         <p
    //           className={`text-center mb-8 ${
    //             darkMode ? "text-gray-400" : "text-gray-600"
    //           }`}
    //         >
    //           Create your admin account to get started
    //         </p>

    //         <form onSubmit={handleSubmit} className="space-y-6">
    //           {/* Name Fields */}
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="relative">
    //               <input
    //                 id="firstName"
    //                 name="firstName"
    //                 type="text"
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="First Name"
    //               />
    //               <label
    //                 htmlFor="firstName"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 First Name
    //               </label>
    //             </div>
    //             <div className="relative">
    //               <input
    //                 id="lastName"
    //                 name="lastName"
    //                 type="text"
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="Last Name"
    //               />
    //               <label
    //                 htmlFor="lastName"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 Last Name
    //               </label>
    //             </div>
    //           </div>

    //           {/* Phone & Passkey Fields */}
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="relative">
    //               <input
    //                 id="phoneNumber"
    //                 name="phoneNumber"
    //                 type="text"
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="Phone Number"
    //               />
    //               <label
    //                 htmlFor="phoneNumber"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 Phone Number
    //               </label>
    //             </div>
    //             <div className="relative">
    //               <input
    //                 id="passkey"
    //                 name="passkey"
    //                 type="password"
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="Enter Security Passcode"
    //               />
    //               <label
    //                 htmlFor="passkey"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 Security Passcode
    //               </label>
    //             </div>
    //           </div>

    //           {/* CNIC, Email, Username Fields */}
    //           <div className="relative">
    //             <input
    //               id="cnic"
    //               name="cnic"
    //               type="number"
    //               required
    //               onChange={handleChange}
    //               className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                 darkMode
    //                   ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                   : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //               }`}
    //               placeholder="CNIC (Without dashes)"
    //             />
    //             <label
    //               htmlFor="cnic"
    //               className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                 darkMode
    //                   ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                   : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //               }`}
    //             >
    //               CNIC
    //             </label>
    //           </div>

    //           <div className="relative">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               required
    //               onChange={handleChange}
    //               className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                 darkMode
    //                   ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                   : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //               }`}
    //               placeholder="Email"
    //             />
    //             <label
    //               htmlFor="email"
    //               className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                 darkMode
    //                   ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                   : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //               }`}
    //             >
    //               Email Address
    //             </label>
    //           </div>

    //           <div className="relative">
    //             <input
    //               id="username"
    //               name="username"
    //               type="text"
    //               required
    //               onChange={handleChange}
    //               className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                 darkMode
    //                   ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                   : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //               }`}
    //               placeholder="Username"
    //             />
    //             <label
    //               htmlFor="username"
    //               className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                 darkMode
    //                   ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                   : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //               }`}
    //             >
    //               Username
    //             </label>
    //           </div>

    //           {/* Password Fields */}
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="relative">
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type={showPassword ? "text" : "password"}
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 pr-12 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="Password"
    //               />
    //               <label
    //                 htmlFor="password"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 Password
    //               </label>
    //               <button
    //                 type="button"
    //                 onClick={() => setShowPassword(!showPassword)}
    //                 className={`absolute right-3 top-3.5 p-1 rounded-md transition-colors ${
    //                   darkMode
    //                     ? "text-gray-400 hover:text-gray-300"
    //                     : "text-gray-500 hover:text-gray-700"
    //                 }`}
    //               >
    //                 {showPassword ? (
    //                   <AiOutlineEye size={20} />
    //                 ) : (
    //                   <AiOutlineEyeInvisible size={20} />
    //                 )}
    //               </button>
    //             </div>

    //             <div className="relative">
    //               <input
    //                 id="confirmPassword"
    //                 name="confirmPassword"
    //                 type={showPassword2 ? "text" : "password"}
    //                 required
    //                 onChange={handleChange}
    //                 className={`peer w-full px-4 py-3 pr-12 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
    //                   darkMode
    //                     ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
    //                     : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
    //                 }`}
    //                 placeholder="Confirm Password"
    //               />
    //               <label
    //                 htmlFor="confirmPassword"
    //                 className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
    //                   darkMode
    //                     ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
    //                     : "text-gray-500 peer-focus:text-indigo-500 bg-white"
    //                 }`}
    //               >
    //                 Confirm Password
    //               </label>
    //               <button
    //                 type="button"
    //                 onClick={() => setShowPassword2(!showPassword2)}
    //                 className={`absolute right-3 top-3.5 p-1 rounded-md transition-colors ${
    //                   darkMode
    //                     ? "text-gray-400 hover:text-gray-300"
    //                     : "text-gray-500 hover:text-gray-700"
    //                 }`}
    //               >
    //                 {showPassword2 ? (
    //                   <AiOutlineEye size={20} />
    //                 ) : (
    //                   <AiOutlineEyeInvisible size={20} />
    //                 )}
    //               </button>
    //             </div>
    //           </div>

    //           {/* Terms Checkbox */}
    //           <label
    //             className={`flex items-start gap-3 text-sm cursor-pointer ${
    //               darkMode ? "text-gray-300" : "text-gray-600"
    //             }`}
    //           >
    //             <input
    //               type="checkbox"
    //               name="acceptedTerms"
    //               onChange={handleChange}
    //               className={`mt-1 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
    //                 darkMode ? "bg-slate-700 border-slate-600" : ""
    //               }`}
    //             />
    //             <span>
    //               I accept the{" "}
    //               <span className="font-semibold">terms of use</span> and{" "}
    //               <span className="font-semibold">Privacy Policy</span>
    //             </span>
    //           </label>

    //           {/* Submit Button */}
    //           <button
    //             type="submit"
    //             className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
    //           >
    //             Signup
    //           </button>
    //         </form>

    //         <p
    //           className={`text-center text-sm mt-6 ${
    //             darkMode ? "text-gray-400" : "text-gray-600"
    //           }`}
    //         >
    //           Already have an account?{" "}
    //           <span
    //             onClick={() => navigate("/admin-login")}
    //             className={`font-semibold cursor-pointer transition-colors ${
    //               darkMode
    //                 ? "text-indigo-400 hover:text-indigo-300"
    //                 : "text-indigo-600 hover:text-indigo-700"
    //             }`}
    //           >
    //             Login
    //           </span>
    //         </p>
    //       </div>
    //     </div>

    //     <FooterAll darkMode={darkMode} />
    //   </div>
    // </>
    //------------------------------------------------------------------------------------
    <>
      <div
        className={`sticky top-0 z-50 backdrop-blur-sm border-b transition-colors duration-300 ${
          darkMode
            ? "bg-slate-800/90 border-slate-700"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <Navbarall darkMode={darkMode} />
      </div>

      {/* --- Main Page Content with a modern, subtle background --- */}
      <div
        className={`min-h-[85vh] flex flex-col transition-colors duration-500 ${
          darkMode
            ? "bg-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
        }`}
      >
        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-0">
            {/* --- LEFT SIDE: Modern Stylish Quote Section --- */}
            <div
              className={`hidden md:flex md:w-1/3 items-center justify-center relative overflow-hidden rounded-l-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B]"
                  : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]"
              }`}
            >
              {/* Modern Background Pattern */}
              <div className="absolute inset-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>

              {/* Geometric Shapes */}
              <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/10 rounded-lg transform rotate-45"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/10 rounded-full"></div>
              <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-white/10 transform rotate-12"></div>

              <div className="relative z-10 p-6 text-center">
                {/* Modern Quote Icon */}
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-3">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Admin Motivational Quote with Modern Typography */}
                <div className="max-w-sm mx-auto">
                  <p className="text-white text-3xl font-light leading-relaxed mb-6 relative">
                    <span className="absolute -left-4 top-0 text-5xl text-white/20 font-serif">
                      "
                    </span>
                    Leadership is not about being in charge. It's about taking
                    care of those in your charge.
                    <span className="absolute -right-4 bottom-0 text-5xl text-white/20 font-serif">
                      "
                    </span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-0.5 bg-white/40"></div>
                    <p className="text-white/80 text-sm font-medium tracking-wider">
                      SIMON SINEK
                    </p>
                    <div className="w-8 h-0.5 bg-white/40"></div>
                  </div>
                </div>

                {/* Modern University Branding */}
                <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full shadow-lg">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm tracking-wide">
                      UoP
                    </h3>
                    <p className="text-white/70 text-xs tracking-wider">
                      ADMIN PORTAL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT SIDE: Stylish Form Section --- */}
            <div
              className={`w-full md:w-2/3 p-6 rounded-r-2xl shadow-2xl transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border-2 border-slate-600"
                  : "bg-white border-2 border-[#1F2A4F]"
              }`}
            >
              {/* --- Modern Header with Animation --- */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg transform transition-all duration-300 hover:scale-110 ${
                    darkMode
                      ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B] text-white"
                      : "bg-gradient-to-br from-blue-100 to-purple-100 text-[#1F2A4F]"
                  }`}
                >
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h2
                  className={`text-4xl font-bold mb-3 bg-gradient-to-r ${
                    darkMode
                      ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B] text-white"
                      : "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B]"
                  } bg-clip-text text-transparent`}
                >
                  Admin Signup
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Create your admin account to manage the system
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* --- Name Fields --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="lastName"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                {/* --- Phone & Passkey Fields --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Phone Number"
                    />
                    <label
                      htmlFor="phoneNumber"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      id="passkey"
                      name="passkey"
                      type="password"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Enter Security Passcode"
                    />
                    <label
                      htmlFor="passkey"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Security Passcode
                    </label>
                  </div>
                </div>

                {/* --- CNIC, Email, Username Fields --- */}
                <div className="relative group">
                  <input
                    id="cnic"
                    name="cnic"
                    type="number"
                    required
                    onChange={handleChange}
                    className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                      darkMode
                        ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="CNIC (Without dashes)"
                  />
                  <label
                    htmlFor="cnic"
                    className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                      darkMode
                        ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                        : "text-gray-500 peer-focus:text-blue-500 bg-white"
                    }`}
                  >
                    CNIC
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                      darkMode
                        ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                      darkMode
                        ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                        : "text-gray-500 peer-focus:text-blue-500 bg-white"
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    onChange={handleChange}
                    className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                      darkMode
                        ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                      darkMode
                        ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                        : "text-gray-500 peer-focus:text-blue-500 bg-white"
                    }`}
                  >
                    Username
                  </label>
                </div>

                {/* --- Password Fields --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 pr-12 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all [&::-ms-reveal]:hidden ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-2.5 p-1 rounded-md transition-colors ${
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
                  <div className="relative group">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 pr-12 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all [&::-ms-reveal]:hidden ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Confirm Password"
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className={`absolute right-3 top-2.5 p-1 rounded-md transition-colors ${
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

                {/* --- Terms Checkbox --- */}
                <label
                  className={`flex items-start gap-3 text-sm cursor-pointer ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    onChange={handleChange}
                    className={`mt-1 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                      darkMode ? "bg-slate-700 border-slate-600" : ""
                    }`}
                  />
                  <span>
                    I accept the{" "}
                    <span className="font-semibold">terms of use</span> and{" "}
                    <span className="font-semibold">Privacy Policy</span>
                  </span>
                </label>

                {/* --- Submit Button --- */}
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Create Admin Account
                </button>
              </form>

              <p
                className={`text-center text-sm mt-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/admin-login")}
                  className={`font-semibold cursor-pointer transition-colors ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-[#1F2A4F] hover:text-blue-700"
                  }`}
                >
                  Login as Admin
                </span>
              </p>
            </div>
          </div>
        </div>

        <FooterAll darkMode={darkMode} />
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default AdminSignup;
