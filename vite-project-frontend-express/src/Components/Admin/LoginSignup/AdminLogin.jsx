// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbarall from "../../Navbar/Navbarall";
// import FooterAll from "../../Footer/FooterAll";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       toast.success("Login successful!");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", "admin");
//       navigate("/admin-home");
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#2e3a87] via-[#475aa7]">
//       <Navbarall />
//       <div className="flex items-center justify-center py-25">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6 text-dark">
//             Admin Login
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="username"
//               placeholder="👤username"
//               onChange={handleChange}
//               className="w-full border p-2 rounded border-gray-400"
//               required
//             />
//             <div className="relative">
//               <input
//                 // type="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="🔒 password"
//                 onChange={handleChange}
//                 className="w-full border border-gray-400 p-2 rounded"
//                 required
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-600 cursor-pointer"
//               >
//                 {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//               </span>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 to-[#d6d6f5] hover:bg-indigo-700 text-white py-2 rounded transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => navigate("/admin-signup")}
//               className="text-red-600 cursor-pointer font-semibold"
//             >
//               Signup as Admin
//             </span>
//           </p>
//         </div>
//       </div>
//       <FooterAll />
//     </div>
//   );
// };

// export default AdminLogin;

//------------------------------------------------------------------------

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbarall from "../../Navbar/Navbarall";
import FooterAll from "../../Footer/FooterAll";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminLogin = ({ darkMode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/admin/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin-home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
        
  
    //--------------------------------------------------------------
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
          <div className="w-full max-w-3xl flex flex-col md:flex-row gap-0">
            {/* --- LEFT SIDE: Modern Stylish Quote Section --- */}
            <div
              className={`hidden md:flex md:w-1/3 items-center justify-center relative overflow-hidden rounded-l-2xl ${
                darkMode
                  ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]"
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
                <div className="w-24 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-3">
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
                  <p className="text-white text-2xl font-light leading-relaxed mb-6 relative">
                    <span className="absolute -left-4 top-0 text-5xl text-white/20 font-serif">
                      "
                    </span>
                    Management is doing things right; leadership is doing the
                    right things.
                    <span className="absolute -right-4 bottom-0 text-5xl text-white/20 font-serif">
                      "
                    </span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-0.5 bg-white/40"></div>
                    <p className="text-white/80 text-sm font-medium tracking-wider">
                      PETER DRUCKER
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
                      : "bg-gradient-to-br from-indigo-100 to-purple-100 text-[#1F2A4F]"
                  }`}
                >
                  <svg
                    className="w-10 h-10"
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
                  className={`text-4xl font-bold mb-3 bg-gradient-to-r ${
                    darkMode
                      ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B] text-white"
                      : "from-[#1F2A4F] to-[#4A427B]"
                  } bg-clip-text text-transparent`}
                >
                  Admin Login
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Please enter your credentials to access the admin portal
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Input */}
                <div className="relative group">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    onChange={handleChange}
                    className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                      darkMode
                        ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                        : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                      darkMode
                        ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                        : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                    }`}
                  >
                    Username
                  </label>
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    className={`peer w-full px-4 py-2.5 pr-12 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all [&::-ms-reveal]:hidden ${
                      darkMode
                        ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                        : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                      darkMode
                        ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                        : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                    }`}
                  >
                    Password
                  </label>
                  {/* --- MODERN: Styled Password Toggle Button --- */}
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

                {/* --- MODERN: Premium Submit Button with Loading State --- */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  )}
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* --- MODERN: Styled Signup Link --- */}
              <p
                className={`text-center text-sm mt-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/admin-signup")}
                  className={`font-semibold cursor-pointer transition-colors ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-600 hover:text-indigo-700"
                  }`}
                >
                  Sign up as Admin
                </span>
              </p>
            </div>
          </div>
        </div>

        <FooterAll darkMode={darkMode} />
      </div>

      <ToastContainer />

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

export default AdminLogin;
