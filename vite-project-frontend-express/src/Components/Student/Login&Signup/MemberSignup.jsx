//---------------------------------------------------------------------------------------

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Navbarall from "./Components/Navbar/Navbarall";
// import FooterAll from "./Components/Footer/FooterAll";
import Navbarall from "../../Navbar/Navbarall";
import FooterAll from "../../Footer/FooterAll";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const MemberSignup = ({ darkMode }) => {
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
    console.log("Form Data before submit:", formData);

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
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/member/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Member created successfully! 🎉");
        setTimeout(() => navigate("/member-login"), 1500);
      } else {
        toast.error(data.message || "User didn't get created ❌");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(
        "An error occurred while creating your account. Please try again.",
      );
    }
  };

  return (
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
        className={`min-h-[100dvh] grid grid-rows-[auto_1fr_auto] transition-colors duration-500 ${
          darkMode
            ? "bg-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
        }`}
      >
        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          {/* <div className="w-full max-w-6xl flex flex-col md:flex-row gap-0"> */}
          <div className="w-full h-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center">
            {/* --- LEFT SIDE: Modern Stylish Quote Section --- */}
            <div
              className={`md:flex md:w-1/3 h-full items-center justify-center relative overflow-hidden rounded-l-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B]"
                  : "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B]"
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

              <div className="relative z-10 p-8 text-center">
                {/* Modern Quote Icon */}
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform rotate-3">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Famous Motivational Quote with Modern Typography */}
                <div className="max-w-md mx-auto">
                  <p className="text-white text-2xl font-light leading-relaxed mb-6 relative">
                    <span className="absolute -left-4 top-0 text-6xl text-white/20 font-serif">
                      "
                    </span>
                    The beautiful thing about learning is that nobody can take
                    it away from you.
                    <span className="absolute -right-4 bottom-0 text-6xl text-white/20 font-serif">
                      "
                    </span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-0.5 bg-white/40"></div>
                    <p className="text-white/80 text-sm font-medium tracking-wider">
                      B.B. KING
                    </p>
                    <div className="w-8 h-0.5 bg-white/40"></div>
                  </div>
                </div>

                {/* Modern University Branding */}
                <div className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full shadow-lg">
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
                      CS DEPARTMENT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT SIDE: Stylish Form Section --- */}
            <div
              className={`w-full md:w-2/4 h-full p-4 rounded-r-2xl shadow-2xl transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border-2 border-slate-600"
                  : "bg-white border-2 border-[#1F2A4F]"
              }`}
            >
              {/* --- Modern Header with Animation --- */}
              <div className="text-center mb-10">
                <div
                  className={`inline-flex items-center justify-center w-17 h-17 rounded-2xl mb-6 shadow-lg transform transition-all duration-300 hover:scale-110 ${
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
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </div>
                <h2
                  className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
                    darkMode
                      ? "bg-gradient-to-br from-[#1F2A4F] to-[#4A427B] text-white"
                      : "from-[#1F2A4F] to-[#4A427B]"
                  } bg-clip-text text-transparent`}
                >
                  Create Account
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Join CS Library to access world-class resources
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

                {/* --- CNIC & Email --- */}
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

                {/* --- Degree & Program --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <select
                      id="degree"
                      name="degree"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      <option
                        value=""
                        disabled
                        selected
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Select Degree
                      </option>
                      <option
                        value="BS"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        BS
                      </option>
                      <option
                        value="MS"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        MS
                      </option>
                      <option
                        value="PHD"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        PhD
                      </option>
                    </select>
                    <label
                      htmlFor="degree"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Degree
                    </label>
                  </div>
                  <div className="relative group">
                    <select
                      id="program"
                      name="program"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      <option
                        value=""
                        disabled
                        selected
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Select Program
                      </option>
                      <option
                        value="CS"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Computer Science
                      </option>
                      <option
                        value="AI"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Artificial Intelligence
                      </option>
                      <option
                        value="CSec"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Cyber Security
                      </option>
                      <option
                        value="DS"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Data Science
                      </option>
                      <option
                        value="SE"
                        className={
                          darkMode
                            ? "bg-slate-800 text-white"
                            : "bg-white text-gray-900"
                        }
                      >
                        Software Engineering
                      </option>
                    </select>
                    <label
                      htmlFor="program"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Program
                    </label>
                  </div>
                </div>

                {/* --- Batch & Roll No --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      id="batchNo"
                      name="batchNo"
                      type="number"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Batch No"
                    />
                    <label
                      htmlFor="batchNo"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Batch Number
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      id="rollNo"
                      name="rollNo"
                      type="number"
                      required
                      onChange={handleChange}
                      className={`peer w-full px-4 py-2.5 bg-transparent border rounded-xl text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="Roll No"
                    />
                    <label
                      htmlFor="rollNo"
                      className={`absolute left-4 -top-2.5 px-1 text-sm bg-inherit transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-blue-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-blue-500 bg-white"
                      }`}
                    >
                      Roll Number
                    </label>
                  </div>
                </div>

                {/* --- Username Preview --- */}
                {formData.degree &&
                  formData.program &&
                  formData.batchNo &&
                  formData.rollNo && (
                    <div
                      className={`p-4 rounded-xl border-2 border-dashed ${
                        darkMode
                          ? "border-slate-600 bg-slate-700/50"
                          : "border-blue-300 bg-blue-50"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium text-center ${darkMode ? "text-slate-300" : "text-blue-700"}`}
                      >
                        Your username will be:{" "}
                        <span className="font-bold">
                          {`${formData.degree}${formData.program}-${formData.batchNo}-${formData.rollNo}`.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  )}

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
                    checked={formData.acceptedTerms}
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
                  Create Account
                </button>
              </form>

              <p
                className={`text-center text-sm mt-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/member-login")}
                  className={`font-semibold cursor-pointer transition-colors ${
                    darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-[#1F2A4F] hover:text-blue-700"
                  }`}
                >
                  Sign In as Student
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

export default MemberSignup;
