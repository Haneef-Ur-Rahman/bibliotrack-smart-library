// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Login from "./login.jsx";
// import Signup from "./MemberSignup.jsx";
// import Home from "./Home.jsx";
// import UpdateProfile from "./UpdateProfile.jsx";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/update-profile" element={<UpdateProfile />} />
//     </Routes>
//   );
// }

// export default App;

//----------------------------------------------------------------------------------------------
// import React from "react";
// // import "./index.css";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Common
// import Contactus from "./Components/Contactus/Contactus.jsx";
// import Aboutus from "./Components/Aboutus/Aboutus.jsx";
// import Welcomepage from "./Components/Welcome/Welcomepage.jsx";

// // Admin
// import AdminSignup from "./Components/Admin/LoginSignup/AdminSignup.jsx";
// import AdminLogin from "./Components/Admin/LoginSignup/AdminLogin.jsx";
// import StudentManagement from "./Components/Admin/Students/StudentManagement.jsx";
// import StudentStatus from "./Components/Admin/Students/StudentStatus.jsx";
// import AddStudent from "./Components/Admin/Students/AddStudent.jsx";
// import AdminHome from "./Components/Admin/Home/AdminHome.jsx";
// import AdminBooks from "./Components/Admin/Books/AdminBooks.jsx";
// import AdminUpdateProfile from "./Components/Admin/UpdateProfile/AdminUpdateProfile.jsx";
// import Fine from "./Components/Admin/Fine/Fine.jsx";

// // Student
// import MemberLogin from "./Components/Student/Login&Signup/MemberLogin.jsx";
// import MemberSignup from "./Components/Student/Login&Signup/MemberSignup.jsx";
// import UpdateProfile from "./Components/Student/UpdateProfile/UpdateProfile.jsx";
// import StudentHome from "./Components/Student/Home/StudentHome.jsx";
// import StudentDashboard from "./Components/Student/Dashboard/StudentDashboard.jsx";
// import Wishlist from "./Components/Student/Wishlist/Wishlist.jsx";
// import DigitalLibrary from "./Components/Student/Digital Library/DigitalLibrary.jsx";
// import Reservations from "./Components/Student/Reservations/Reservations.jsx";
// import Report from "./Components/Student/Report/Report.jsx";

// // import AdminDashboard from "./AdminDashboard.jsx";

// // Placeholder components for Sidebar links
// // import AdminHome from "./StudentHome.jsx";

// function App() {
//   return (
//     <div>
//       {/* Main Content Area */}
//       {/* <main className="flex-1 bg-gray-100 p-5"> */}
//       <Routes>
//         {/* Default/Home */}
//         <Route path="/" element={<Welcomepage />} />
//         {/* Logins */}
//         <Route path="/member-login" element={<MemberLogin />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         {/* Signups */}
//         <Route path="/member-signup" element={<MemberSignup />} />
//         <Route path="/admin-signup" element={<AdminSignup />} />
//         {/* NavAll Links */}
//         <Route path="/contactus" element={<Contactus />} />
//         <Route path="/aboutus" element={<Aboutus />} />
//         {/* Dashboard */}
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         {/* Profile */}
//         <Route path="/update-profile" element={<UpdateProfile />} />
//         <Route path="/admin-update-profile" element={<AdminUpdateProfile />} />
//         {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
//         {/* Sidebar links */}
//         <Route path="/student-home" element={<StudentHome />} />
//         <Route path="/admin-home" element={<AdminHome />} />
//         <Route path="/StudentManagement" element={<StudentManagement />} />
//         <Route path="/StudentStatus" element={<StudentStatus />} />
//         <Route path="/addstudent" element={<AddStudent />} />
//         <Route path="/Admin-Books" element={<AdminBooks />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/digital-library" element={<DigitalLibrary />} />
//         <Route path="/reservations" element={<Reservations />} />
//         <Route path="/logout" element={<Welcomepage />} />
//         <Route path="/student-report" element={<Report />} />
//         ;
//         <Route path="/admin-fines" element={<Fine />} />
//       </Routes>
//       {/* </main> */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default App;

//----------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMoon, FaSun } from "react-icons/fa";
// App.css
import "./App.css";

// Common
import Contactus from "./Components/Contactus/Contactus.jsx";
import Aboutus from "./Components/Aboutus/Aboutus.jsx";
import Welcomepage from "./Components/Welcome/Welcomepage.jsx";

// --- Dark Mode Toggle Component ---

// Admin
import AdminSignup from "./Components/Admin/LoginSignup/AdminSignup.jsx";
import AdminLogin from "./Components/Admin/LoginSignup/AdminLogin.jsx";
import StudentManagement from "./Components/Admin/Students/StudentManagement.jsx";
import StudentStatus from "./Components/Admin/Students/StudentStatus.jsx";
import AddStudent from "./Components/Admin/Students/AddStudent.jsx";
import AdminHome from "./Components/Admin/Home/AdminHome.jsx";
import AdminBooks from "./Components/Admin/Books/AdminBooks.jsx";
import AdminUpdateProfile from "./Components/Admin/UpdateProfile/AdminUpdateProfile.jsx";
import Fine from "./Components/Admin/Fine/Fine.jsx";
import Payment from "./Components/Admin/Payement/Payment.jsx";
import AdminSidebar from "./Components/Admin/Sidebar/AdminSidebar.jsx";
import AdminNavbar from "./Components/Admin/Navbar/AdminNavbar.jsx";
import BookList from "./Components/Admin/Books/BookList.jsx";
import AllStudents from "./Components/Admin/Students/AllStudents.jsx";
// import BookStatus from "./Components/Admin/Books/BookStatus.jsx";
import FooterAll from "./Components/Footer/FooterAll.jsx";
import ChatBot from "./Components/Footer/ChatBot.jsx";
import NavbarAll from "./Components/Navbar/Navbarall.jsx";
import AboutPage from "./Components/Aboutus/Aboutus.jsx";

// Student
import MemberLogin from "./Components/Student/Login&Signup/MemberLogin.jsx";
import MemberSignup from "./Components/Student/Login&Signup/MemberSignup.jsx";
import UpdateProfile from "./Components/Student/UpdateProfile/UpdateProfile.jsx";
import StudentHome from "./Components/Student/Home/StudentHome.jsx";
import StudentDashboard from "./Components/Student/Dashboard/StudentDashboard.jsx";
import Wishlist from "./Components/Student/Wishlist/Wishlist.jsx";
import DigitalLibrary from "./Components/Student/Digital Library/DigitalLibrary.jsx";
import Reservations from "./Components/Student/Reservations/Reservations.jsx";
import Report from "./Components/Student/Report/Report.jsx";
import LeftSidebar from "./Components/Student/Sidebar/LeftSidebar.jsx";
import FinePayment from "./Components/Student/FinePayment/FinePayment.jsx";
import { Sidebar } from "lucide-react";

function App() {
  // 🌙 Global Dark Mode state
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark"); // ✅ GLOBAL dark mode
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark"); // GLOBAL remove
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark"); // GLOBAL add
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <div
      className={`App min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Routes */}
      <Routes>
        {/* Default/Home */}
        <Route path="/" element={<Welcomepage darkMode={darkMode} />} />
        {/* Logins */}
        <Route
          path="/member-login"
          element={<MemberLogin darkMode={darkMode} />}
        />
        <Route
          path="/admin-login"
          element={<AdminLogin darkMode={darkMode} />}
        />

        {/* Admin Navbar */}
        <Route
          path="/admin-navbar"
          element={<AdminNavbar darkMode={darkMode} />}
        />
        {/* Student Navbar */}
        {/* <Route path="/navbar" element={<Navbar darkMode={darkMode} />} /> */}

        <Route path="/navbar" element={<NavbarAll darkMode={darkMode} />} />
        {/* About  */}
        <Route path="/aboutus" element={<AboutPage darkMode={darkMode} />} />

        {/* Contact  */}
        <Route path="/contactus" element={<Contactus darkMode={darkMode} />} />

        {/* Signups */}
        <Route
          path="/member-signup"
          element={<MemberSignup darkMode={darkMode} />}
        />

        {/* Student Report */}
        <Route
          path="/student-report"
          element={<Report darkMode={darkMode} />}
        />
        {/* Admin Signup */}

        <Route
          path="/admin-signup"
          element={<AdminSignup darkMode={darkMode} />}
        />
        <Route path="/admin-fines" element={<Fine darkMode={darkMode} />} />
        <Route
          path="/admin-payment"
          element={<Payment darkMode={darkMode} />}
        />
        {/* Nav Links */}
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/aboutus" element={<Aboutus />} />
        {/* Dashboards */}
        <Route
          path="/student-dashboard"
          element={<StudentDashboard darkMode={darkMode} />}
        />
        {/* Admin (All Student) */}
        <Route
          path="/all-students"
          element={<AllStudents darkMode={darkMode} />}
        />
        <Route
          path="/update-profile"
          element={<UpdateProfile darkMode={darkMode} />}
        />
        <Route
          path="/admin-update-profile"
          element={<AdminUpdateProfile darkMode={darkMode} />}
        />
        {/* Sidebar links */}
        <Route
          path="/leftsidebar"
          element={<LeftSidebar darkMode={darkMode} />}
        ></Route>

        <Route
          path="/student-home"
          element={<StudentHome darkMode={darkMode} />}
        />
        <Route path="/admin-home" element={<AdminHome darkMode={darkMode} />} />
        <Route
          path="/StudentManagement"
          element={<StudentManagement darkMode={darkMode} />}
        />

        <Route path="/StudentStatus" element={<StudentStatus />} />
        <Route path="/addstudent" element={<AddStudent />} />

        {/* FooterAll */}
        <Route path="/footerall" element={<FooterAll darkMode={darkMode} />} />

        {/* Chatbot*/}
        <Route path="/chatbot" element={<ChatBot darkMode={darkMode} />} />

        <Route
          path="/Admin-Books"
          element={<AdminBooks darkMode={darkMode} />}
        />
        <Route path="/booklist" element={<BookList darkMode={darkMode} />} />
        {/* <Route path="/bookstatus" element={<BookStatus />} /> */}
        <Route path="/wishlist" element={<Wishlist darkMode={darkMode} />} />
        <Route
          path="/fine-payment"
          element={<FinePayment darkMode={darkMode} />}
        />
        <Route
          path="/digital-library"
          element={<DigitalLibrary darkMode={darkMode} />}
        />
        <Route
          path="/reservations"
          element={<Reservations darkMode={darkMode} />}
        />
        <Route path="/logout" element={<Welcomepage />} />
        <Route path="/student-report" element={<Report />} />
        <Route path="/admin-fines" element={<Fine />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Floating Dark Mode Toggle Button */}
      {/* <button
        onClick={toggleDarkMode}
        className={`fixed right-4 rounded-full shadow-lg z-[9999] flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
        style={{
          bottom: "9.0rem",
          width: "3.5rem",
          height: "3.5rem",
          background: darkMode
            ? "#1f2937" // Dark background
            : "linear-gradient(135deg, #facc15, #fbbf24)", // Light gradient yellow
          color: "#ffffff", // Text always white
          border: darkMode
            ? "2px solid #10b981" // Stylish green border in dark
            : "2px solid #d97706", // Stylish orange border in light
          boxShadow: darkMode
            ? "0 4px 15px rgba(16, 185, 129, 0.6)" // Glow green in dark
            : "0 4px 15px rgba(251, 191, 36, 0.6)", // Glow yellow in light
        }}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button> */}
      {/* //---------------------------------------------------------------------------------- */}
      {/* --- SIMPLE & ROBUST DARK MODE TOGGLE BUTTON --- */}
      {/* This button is now directly in App.js to avoid any issues */}
      <button
        onClick={toggleDarkMode}
        className="dark-toggle-btn fixed right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110"
        style={{
          bottom: "9.0rem",

          background: darkMode
            ? "#1e293b"
            : "linear-gradient(135deg, #fbbf24, #f59e0b)",

          color: "#ffffff",

          border: darkMode ? "1px solid #334155" : "2px solid #92400e",

          outline: "none",

          boxShadow: darkMode
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
            : `
      0 10px 25px -5px rgba(251, 191, 36, 0.6),
      0 0 0 2px rgba(255, 255, 255, 0.9)
    `,
        }}
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      >
        {/* Icon with rotation animation */}
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: darkMode ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {/* Icon with inverted colors for better visibility */}
          <div
            className="p-3 rounded-full flex items-center justify-center"
            style={{
              background: darkMode
                ? "#fbbf24" // Bright yellow for sun icon
                : "#1e293b", // Dark slate for moon icon
              color: darkMode
                ? "#1e293b" // Dark text for sun icon
                : "#fbbf24", // Yellow text for moon icon
            }}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </div>
        </div>
      </button>
    </div>
  );
}

export default App;
