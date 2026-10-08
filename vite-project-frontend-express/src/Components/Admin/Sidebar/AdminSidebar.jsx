// import React from "react";
// import { Link } from "react-router-dom";
// import { Home, LayoutDashboard, Heart, LogOut } from "lucide-react";
// import "./App.css";

// const AdminSidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white flex flex-col p-5 ml-2 border-1 rounded-[10px]">
//       {/* Logo / Title */}
//       <div className="text-2xl font-bold mb-10">MyApp</div>

//       {/* Nav Links */}
//       <nav className="flex flex-col gap-4">
//         <Link
//           to="/admin-home"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <Home className="w-5 h-5" /> Home
//         </Link>

//         <Link
//           to="/admin-dashboard"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <LayoutDashboard className="w-5 h-5" /> Dashboard
//         </Link>

//         <Link
//           to="/wishlist"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <Heart className="w-5 h-5" /> Wishlist
//         </Link>

//         <Link
//           to="/admin-login"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <LogOut className="w-5 h-5" /> Logout
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

//--------------------------------------------------------------------------------------------

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, LayoutDashboard, Heart, LogOut } from "lucide-react";
// import { FaArrowCircleRight } from "react-icons/fa";

// import "./App.css";

// const AdminSidebar = () => {
//   const location = useLocation(); // ✅ Get current route path

//   // Helper function for active route
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="h-screen w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white flex flex-col p-5 ml-2 border-1 rounded-[10px]">
//       {/* Logo / Title */}
//       <div className="text-2xl font-bold mb-10">MyApp</div>

//       {/* Nav Links */}
//       <nav className="flex flex-col gap-4">
//         <Link
//           to="/admin-home"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-home")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Home className="w-5 h-5" /> Home
//           </div>
//           {isActive("/admin-home") && (
//             <span className="text-lg">
//               <div
//                 style={{
//                   backgroundColor: "#4b3f93",
//                   borderRadius: "50%",
//                   padding: "5px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FaArrowCircleRight size={18} color="white" />
//               </div>
//             </span>
//           )}
//         </Link>

//         <Link
//           to="/AllStudents"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/AllStudents")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <LayoutDashboard className="w-5 h-5" /> Students
//           </div>
//           {isActive("/admin-dashboard") && <span className="text-lg">⇒</span>}
//         </Link>

//         <Link
//           to="/Allbooks"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/wishlist")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Heart className="w-5 h-5" /> Books
//           </div>
//           {isActive("/Allbooks") && (
//             <span className="text-lg">
//               {" "}
//               <div
//                 style={{
//                   backgroundColor: "#4b3f93",
//                   borderRadius: "50%",
//                   padding: "5px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FaArrowCircleRight size={18} color="white" />
//               </div>{" "}
//             </span>
//           )}
//         </Link>
//         <Link
//           to="/Allbooks"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/wishlist")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Heart className="w-5 h-5" /> Fine
//           </div>
//           {isActive("/fine") && (
//             <span className="text-lg">
//               {" "}
//               <div
//                 style={{
//                   backgroundColor: "#4b3f93",
//                   borderRadius: "50%",
//                   padding: "5px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FaArrowCircleRight size={18} color="white" />
//               </div>{" "}
//             </span>
//           )}
//         </Link>
//          <Link
//           to="/Allbooks"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/wishlist")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Heart className="w-5 h-5" /> Payement
//           </div>
//           {isActive("/payement") && (
//             <span className="text-lg">
//               {" "}
//               <div
//                 style={{
//                   backgroundColor: "#4b3f93",
//                   borderRadius: "50%",
//                   padding: "5px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FaArrowCircleRight size={18} color="white" />
//               </div>{" "}
//             </span>
//           )}
//         </Link>

//         <Link
//           to="/admin-login"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-login")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <LogOut className="w-5 h-5" /> Logout
//           </div>
//           {isActive("/admin-login") && (
//             <span className="text-lg">
//               <div
//                 style={{
//                   backgroundColor: "#4b3f93",
//                   borderRadius: "50%",
//                   padding: "5px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <FaArrowCircleRight size={18} color="white" />
//               </div>
//             </span>
//           )}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

//--------------------------------------------------------------------------------------------

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   DollarSign,
//   FileWarning,
//   LogOut,
// } from "lucide-react"; // ✅ better matching icons
// import { FaArrowCircleRight } from "react-icons/fa";

// // import "./App.css";
// import "../../../App.css";
// const AdminSidebar = ({ darkMode }) => {
//   const isActive = (path) => location.pathname === path;

//   const arrowIcon = (
//     <div
//       style={{
//         backgroundColor: "#4b3f93",
//         borderRadius: "50%",
//         padding: "5px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <FaArrowCircleRight size={18} color="white" />
//     </div>
//   );

//   return (
//     <div className="h-screen-max w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]  text-white  flex flex-col p-5 ml-2 border-1 rounded-[10px] dark:bg-gray-900 dark:text-white dark:border-white">
//       <nav className="flex flex-col gap-10 mt-10 ">
//         {/* 🏠 Home */}
//         <Link
//           to="/admin-home"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-home")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Home className="w-5 h-5" /> Home
//           </div>
//           {isActive("/admin-home") && arrowIcon}
//         </Link>

//         {/* 👩‍🎓 Students */}
//         <Link
//           to="/StudentManagement"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/StudentManagement")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Users className="w-5 h-5" /> Students
//           </div>
//           {isActive("/StudentManagement") && arrowIcon}
//         </Link>

//         {/* 📚 Books */}
//         <Link
//           to="/Admin-Books"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/Admin-Books")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <BookOpen className="w-5 h-5" /> Books
//           </div>
//           {isActive("/Admin-Books") && arrowIcon}
//         </Link>

//         {/* 💸 Fine */}
//         <Link
//           to="/admin-fines"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-fines")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <FileWarning className="w-5 h-5" /> Fine
//           </div>
//           {isActive("/fine") && arrowIcon}
//         </Link>

//         {/* 💳 Payment */}
//         <Link
//           to="/admin-payment"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-payment")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <DollarSign className="w-5 h-5" /> Payment
//           </div>
//           {isActive("/payment") && arrowIcon}
//         </Link>

//         {/* 🚪 Logout */}
//         <Link
//           to="/admin-login"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/admin-login")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <LogOut className="w-5 h-5" /> Logout
//           </div>
//           {isActive("/admin-login") && arrowIcon}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

//--------------------------------------------------------------------------------------------

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   DollarSign,
//   FileWarning,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";
// import { useState } from "react";

// const AdminSidebar = ({ darkMode }) => {
//   const location = useLocation();
//   const [expandedItem, setExpandedItem] = useState(null);

//   // Check if a path is active
//   const isActive = (path) => location.pathname === path;

//   // Conditional styling function
//   const getStyles = () => ({
//     sidebarBg: darkMode
//       ? "bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700"
//       : "bg-gradient-to-b from-indigo-700 to-indigo-600 border-indigo-500",
//     textColor: darkMode ? "text-slate-100" : "text-white",
//     activeBg: darkMode ? "bg-slate-700/50" : "bg-white/20",
//     hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/10",
//     iconBg: darkMode ? "bg-slate-800" : "bg-indigo-600",
//     activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
//     activeIconColor: darkMode ? "text-white" : "text-indigo-600",
//     iconColor: darkMode ? "text-blue-400" : "text-white",
//     badgeBg: darkMode ? "bg-red-600" : "bg-red-500",
//     shadow: darkMode
//       ? "shadow-lg shadow-black/20"
//       : "shadow-lg shadow-indigo-500/20",
//   });

//   const styles = getStyles();

//   // Navigation items
//   const navItems = [
//     { path: "/admin-home", label: "Home", icon: Home },
//     { path: "/StudentManagement", label: "Students", icon: Users },
//     { path: "/Admin-Books", label: "Books", icon: BookOpen },
//     { path: "/admin-fines", label: "Fine", icon: FileWarning },
//     { path: "/admin-payment", label: "Payment", icon: DollarSign },
//     { path: "/admin-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       className={`h-auto w-64 ${styles.sidebarBg} text-white flex flex-col p-4 ml-2 border-1 rounded-xl ${styles.shadow} transition-all duration-300`}
//     >
//       {/* Logo/Title Section */}
//       <div className="mb-8 mt-2">
//         <div className="flex items-center justify-center mb-6">
//           <div
//             className={`w-14 h-14 rounded-full ${styles.iconBg} flex items-center justify-center`}
//           >
//             <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//             </svg>
//           </div>
//         </div>
//         <h2 className="text-xl font-bold text-center">Admin Panel</h2>
//         <p
//           className={`text-sm text-center ${darkMode ? "text-slate-400" : "text-indigo-200"} mt-1`}
//         >
//           Library Management
//         </p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex flex-col gap-2 flex-1">
//         {navItems.map((item, index) => {
//           const Icon = item.icon;
//           const active = isActive(item.path);

//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
//                 active ? `${styles.activeBg}` : `${styles.hoverBg}`
//               }`}
//               onMouseEnter={() => setExpandedItem(index)}
//               onMouseLeave={() => setExpandedItem(null)}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
//                     active ? `${styles.activeIconBg}` : `${styles.iconBg}`
//                   }`}
//                 >
//                   <Icon
//                     className={`w-5 h-5 transition-all duration-200 ${
//                       active
//                         ? `${styles.activeIconColor}`
//                         : `${styles.iconColor}`
//                     }`}
//                   />
//                 </div>
//                 <span
//                   className={`font-medium ${active ? "font-semibold" : ""}`}
//                 >
//                   {item.label}
//                 </span>
//               </div>

//               {active && <ChevronRight className="w-5 h-5" />}

//               {expandedItem === index && !active && (
//                 <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer Section */}
//       <div
//         className={`mt-auto pt-4 border-t ${darkMode ? "border-slate-700" : "border-indigo-500/30"}`}
//       >
//         <div className="flex items-center justify-between p-3">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
//             <div>
//               <p className="text-sm font-medium">Admin User</p>
//               <p
//                 className={`text-xs ${darkMode ? "text-slate-400" : "text-indigo-200"}`}
//               >
//                 Online
//               </p>
//             </div>
//           </div>
//           <div
//             className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} animate-pulse`}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

//--------------------------------------------------------------

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   DollarSign,
//   FileWarning,
//   LogOut,
//   ChevronRight,
// } from "lucide-react";
// import { useState } from "react";

// const AdminSidebar = ({ darkMode }) => {
//   const location = useLocation();
//   const [expandedItem, setExpandedItem] = useState(null);

//   // Check if a path is active
//   const isActive = (path) => location.pathname === path;

//   // Conditional styling function
//   const getStyles = () => ({
//     sidebarBg: darkMode
//       ? "bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700"
//       : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] border-indigo-600/30",
//     textColor: darkMode ? "text-slate-100" : "text-white",
//     activeBg: darkMode ? "bg-slate-700/50" : "bg-white/20",
//     hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/10",
//     iconBg: darkMode ? "bg-slate-800" : "bg-indigo-600/30",
//     activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
//     activeIconColor: darkMode ? "text-white" : "text-indigo-700",
//     iconColor: darkMode ? "text-blue-400" : "text-white",
//     badgeBg: darkMode ? "bg-red-600" : "bg-red-500",
//     shadow: darkMode
//       ? "shadow-lg shadow-black/20"
//       : "shadow-lg shadow-indigo-900/30",
//     borderColor: darkMode ? "border-slate-700" : "border-indigo-600/30",
//     subtitleColor: darkMode ? "text-slate-400" : "text-indigo-200",
//     footerBorder: darkMode ? "border-slate-700" : "border-indigo-600/30",
//   });

//   const styles = getStyles();

//   // Navigation items
//   const navItems = [
//     { path: "/admin-home", label: "Home", icon: Home },
//     { path: "/StudentManagement", label: "Students", icon: Users },
//     { path: "/Admin-Books", label: "Books", icon: BookOpen },
//     { path: "/admin-fines", label: "Fine", icon: FileWarning },
//     { path: "/admin-payment", label: "Payment", icon: DollarSign },
//     { path: "/admin-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       className={`h-auto w-66 ${styles.sidebarBg} text-white flex flex-col p-4 ml-0 border-1 rounded-tr-2xl rounded-br-2xl ${styles.shadow} transition-all duration-300`}
//     >
//       {/* Logo/Title Section */}
//       <div className="mb-8 mt-2">
//         <div className="flex items-center justify-center mb-6">
//           <div
//             className={`w-16 h-16 rounded-full ${styles.iconBg} flex items-center justify-center shadow-lg`}
//           >
//             <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//             </svg>
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
//         <p className={`text-sm text-center ${styles.subtitleColor} mt-1`}>
//           Library Management
//         </p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex flex-col gap-2 flex-1">
//         {navItems.map((item, index) => {
//           const Icon = item.icon;
//           const active = isActive(item.path);

//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
//                 active ? `${styles.activeBg} shadow-md` : `${styles.hoverBg}`
//               } ${item.isLogout ? "mt-auto" : ""}`}
//               onMouseEnter={() => setExpandedItem(index)}
//               onMouseLeave={() => setExpandedItem(null)}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
//                     active
//                       ? `${styles.activeIconBg} shadow-md`
//                       : `${styles.iconBg}`
//                   }`}
//                 >
//                   <Icon
//                     className={`w-5 h-5 transition-all duration-200 ${
//                       active
//                         ? `${styles.activeIconColor}`
//                         : `${styles.iconColor}`
//                     }`}
//                   />
//                 </div>
//                 <span
//                   className={`font-medium ${active ? "font-semibold" : ""}`}
//                 >
//                   {item.label}
//                 </span>
//               </div>

//               {active && <ChevronRight className="w-5 h-5" />}

//               {expandedItem === index && !active && (
//                 <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer Section */}
//       <div className={`mt-4 pt-4 border-t ${styles.footerBorder}`}>
//         <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
//               <div
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} border-2 ${darkMode ? "border-slate-900" : "border-indigo-700"}`}
//               ></div>
//             </div>
//             <div>
//               <p className="text-sm font-medium">Admin User</p>
//               <p className={`text-xs ${styles.subtitleColor}`}>Online</p>
//             </div>
//           </div>
//           <div
//             className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} animate-pulse`}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

//--------------------------------------------------------------------------------------------

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   DollarSign,
//   FileWarning,
//   LogOut,
//   ArrowRight,
// } from "lucide-react";
// import { useState } from "react";

// const AdminSidebar = ({ darkMode }) => {
//   const location = useLocation();
//   const [expandedItem, setExpandedItem] = useState(null);

//   // Check if a path is active
//   const isActive = (path) => location.pathname === path;

//   // Conditional styling function
//   const getStyles = () => ({
//     sidebarBg: darkMode
//       ? "bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700"
//       : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] border-indigo-600/30",
//     textColor: darkMode ? "text-slate-100" : "text-white",
//     activeBg: darkMode ? "bg-slate-700/50" : "bg-white/20",
//     hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/10",
//     iconBg: darkMode ? "bg-slate-800" : "bg-indigo-600/30",
//     activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
//     activeIconColor: darkMode ? "text-white" : "text-indigo-700",
//     iconColor: darkMode ? "text-blue-400" : "text-white",
//     badgeBg: darkMode ? "bg-red-600" : "bg-red-500",
//     shadow: darkMode
//       ? "shadow-lg shadow-black/20"
//       : "shadow-lg shadow-indigo-900/30",
//     borderColor: darkMode ? "border-slate-700" : "border-indigo-600/30",
//     subtitleColor: darkMode ? "text-slate-400" : "text-indigo-200",
//     footerBorder: darkMode ? "border-slate-700" : "border-indigo-600/30",
//   });

//   const styles = getStyles();

//   // Navigation items
//   const navItems = [
//     { path: "/admin-home", label: "Home", icon: Home },
//     { path: "/StudentManagement", label: "Students", icon: Users },
//     { path: "/Admin-Books", label: "Books", icon: BookOpen },
//     { path: "/admin-fines", label: "Fine", icon: FileWarning },
//     { path: "/admin-payment", label: "Payment", icon: DollarSign },
//     { path: "/admin-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       className={`h-auto w-66 ${styles.sidebarBg} text-white flex flex-col p-4 ml-0 border-2 rounded-tr-2xl rounded-br-2xl ${styles.shadow} transition-all duration-300 relative overflow-hidden`}
//     >
//       {/* Stylish Border Effect */}
//       <div
//         className={`absolute inset-0 rounded-tr-2xl rounded-br-2xl ${darkMode ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20" : "bg-gradient-to-r from-white/10 to-indigo-600/20"} p-[2px]`}
//       >
//         <div
//           className={`w-full h-full ${darkMode ? "bg-slate-900" : "bg-[#1F2A4F]"} rounded-tr-2xl rounded-br-2xl`}
//         ></div>
//       </div>

//       {/* Logo/Title Section */}
//       <div className="mb-8 mt-2 relative z-10">
//         <div className="flex items-center justify-center mb-6">
//           <div
//             className={`w-16 h-16 rounded-full ${styles.iconBg} flex items-center justify-center shadow-lg`}
//           >
//             <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//             </svg>
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
//         <p className={`text-sm text-center ${styles.subtitleColor} mt-1`}>
//           Library Management
//         </p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex flex-col gap-2 flex-1 relative z-10">
//         {navItems.map((item, index) => {
//           const Icon = item.icon;
//           const active = isActive(item.path);

//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
//                 active ? `${styles.activeBg} shadow-md` : `${styles.hoverBg}`
//               } ${item.isLogout ? "mt-auto" : ""}`}
//               onMouseEnter={() => setExpandedItem(index)}
//               onMouseLeave={() => setExpandedItem(null)}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
//                     active
//                       ? `${styles.activeIconBg} shadow-md`
//                       : `${styles.iconBg}`
//                   }`}
//                 >
//                   <Icon
//                     className={`w-5 h-5 transition-all duration-200 ${
//                       active
//                         ? `${styles.activeIconColor}`
//                         : `${styles.iconColor}`
//                     }`}
//                   />
//                 </div>
//                 <span
//                   className={`font-medium ${active ? "font-semibold" : ""}`}
//                 >
//                   {item.label}
//                 </span>
//               </div>

//               {/* Professional Arrow Icon */}
//               {active && (
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
//                   <ArrowRight className="w-4 h-4 text-white" />
//                 </div>
//               )}

//               {expandedItem === index && !active && (
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                   <ArrowRight className="w-4 h-4 text-white/70" />
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer Section */}
//       <div
//         className={`mt-4 pt-4 border-t ${styles.footerBorder} relative z-10`}
//       >
//         <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
//               <div
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} border-2 ${darkMode ? "border-slate-900" : "border-indigo-700"}`}
//               ></div>
//             </div>
//             <div>
//               <p className="text-sm font-medium">Admin User</p>
//               <p className={`text-xs ${styles.subtitleColor}`}>Online</p>
//             </div>
//           </div>
//           <div
//             className={`w-2 h-2 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} animate-pulse`}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

//------------------------------------------------------------------------------------------

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   DollarSign,
//   FileWarning,
//   LogOut,
//   ArrowRight,
// } from "lucide-react";
// import { useState } from "react";

// const AdminSidebar = ({ darkMode }) => {
//   const location = useLocation();
//   const [expandedItem, setExpandedItem] = useState(null);

//   // Check if a path is active
//   const isActive = (path) => location.pathname === path;

//   // Professional styling with clear active/inactive distinction
//   const getStyles = () => ({
//     sidebarBg: darkMode
//       ? "bg-gradient-to-b from-slate-900 to-slate-800"
//       : "bg-gradient-to-b from-blue-500 to-blue-600",
//     textColor: darkMode ? "text-slate-100" : "text-white",
//     activeBg: darkMode
//       ? "bg-slate-700/60 backdrop-blur-sm"
//       : "bg-white/25 backdrop-blur-sm",
//     hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/15",
//     iconBg: darkMode ? "bg-slate-800/80" : "bg-white/20",
//     activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
//     activeIconColor: darkMode ? "text-white" : "text-blue-700",
//     iconColor: darkMode ? "text-blue-400" : "text-white/95",
//     badgeBg: "bg-red-500",
//     shadow: darkMode
//       ? "shadow-xl shadow-black/40"
//       : "shadow-xl shadow-blue-900/40",
//     borderColor: darkMode ? "border-slate-700/50" : "border-white/30",
//     subtitleColor: darkMode ? "text-slate-400" : "text-white/90",
//     footerBorder: darkMode ? "border-slate-700/50" : "border-white/30",
//     logoBg: darkMode ? "bg-slate-800/80" : "bg-white/20",
//     arrowBg: darkMode
//       ? "from-blue-600 to-purple-600"
//       : "from-white to-gray-100",
//     arrowColor: darkMode ? "text-white" : "text-blue-700",
//     textShadow: darkMode ? "" : "drop-shadow-sm",
//     // Professional button styles with clear distinction
//     inactiveButtonBg: darkMode ? "bg-slate-800/30" : "bg-white/5",
//     inactiveButtonBorder: darkMode ? "border-slate-700/40" : "border-white/20",
//     activeButtonBorder: darkMode ? "border-blue-500" : "border-white",
//     activeButtonShadow: darkMode ? "shadow-blue-500/30" : "shadow-white/30",
//   });

//   const styles = getStyles();

//   // Navigation items
//   const navItems = [
//     { path: "/admin-home", label: "Home", icon: Home },
//     { path: "/StudentManagement", label: "Students", icon: Users },
//     { path: "/Admin-Books", label: "Books", icon: BookOpen },
//     { path: "/admin-fines", label: "Fine", icon: FileWarning },
//     { path: "/admin-payment", label: "Payment", icon: DollarSign },
//     { path: "/admin-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       className={`h-auto w-64 ${styles.sidebarBg} ${styles.textColor} flex flex-col p-5 ml-0 border ${styles.borderColor} rounded-tr-3xl rounded-br-3xl ${styles.shadow} transition-all duration-500 relative overflow-hidden`}
//     >
//       {/* Decorative top gradient with more visibility */}
//       <div
//         className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
//           darkMode
//             ? "from-blue-500 via-purple-500 to-pink-500"
//             : "from-white via-white/70 to-transparent"
//         }`}
//       ></div>

//       {/* Logo/Title Section with better readability */}
//       <div className="mb-8 mt-4 relative z-10">
//         <div className="flex items-center justify-center mb-6">
//           <div
//             className={`w-16 h-16 rounded-2xl ${styles.logoBg} flex items-center justify-center ${styles.shadow} transform transition-transform hover:scale-105 border ${darkMode ? "border-slate-700" : "border-white/30"}`}
//           >
//             <svg
//               className={`w-9 h-9 ${styles.iconColor}`}
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//             </svg>
//           </div>
//         </div>
//         <h2
//           className={`text-2xl font-bold text-center tracking-tight ${styles.textShadow}`}
//         >
//           Admin Panel
//         </h2>
//         <p
//           className={`text-sm text-center ${styles.subtitleColor} mt-1 ${styles.textShadow}`}
//         >
//           Library Management
//         </p>
//       </div>

//       {/* Navigation Menu with professional button distinction */}
//       <nav className="flex flex-col gap-2.5 flex-1 relative z-10">
//         {navItems.map((item, index) => {
//           const Icon = item.icon;
//           const active = isActive(item.path);

//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
//                 active
//                   ? `${styles.activeBg} border-2 ${styles.activeButtonBorder} shadow-lg shadow-${styles.activeButtonShadow} transform scale-[1.02]`
//                   : `${styles.inactiveButtonBg} border ${styles.inactiveButtonBorder} ${styles.hoverBg} transform hover:translate-x-1`
//               } ${item.isLogout ? "mt-auto" : ""}`}
//               onMouseEnter={() => setExpandedItem(index)}
//               onMouseLeave={() => setExpandedItem(null)}
//             >
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                     active
//                       ? `${styles.activeIconBg} shadow-md border-2 ${styles.activeButtonBorder}`
//                       : `${styles.iconBg} border ${styles.inactiveButtonBorder}`
//                   }`}
//                 >
//                   <Icon
//                     className={`w-5 h-5 transition-all duration-300 ${
//                       active
//                         ? `${styles.activeIconColor}`
//                         : `${styles.iconColor}`
//                     }`}
//                   />
//                 </div>
//                 <span
//                   className={`font-medium tracking-wide ${
//                     active ? "font-semibold" : ""
//                   } ${styles.textShadow}`}
//                 >
//                   {item.label}
//                 </span>
//               </div>

//               {/* Arrow indicator with better visibility */}
//               {active && (
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${styles.arrowBg} shadow-md border-2 ${styles.activeButtonBorder}`}
//                 >
//                   <ArrowRight
//                     className={`w-4 h-4 ${styles.arrowColor} transition-transform group-hover:translate-x-0.5`}
//                   />
//                 </div>
//               )}

//               {expandedItem === index && !active && (
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 border border-white/20">
//                   <ArrowRight className="w-4 h-5 text-white/80" />
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer Section with improved readability */}
//       <div
//         className={`mt-6 pt-4 border-t ${styles.footerBorder} relative z-10`}
//       >
//         <div
//           className={`flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border ${darkMode ? "border-slate-700/50" : "border-white/20"}`}
//         >
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div
//                 className={`w-10 h-10 rounded-full bg-gradient-to-br ${
//                   darkMode
//                     ? "from-blue-500 to-purple-600"
//                     : "from-white/60 to-white/30"
//                 } border ${darkMode ? "border-slate-700" : "border-white/40"}`}
//               ></div>
//               <div
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 ${
//                   darkMode ? "border-slate-900" : "border-blue-600"
//                 }`}
//               ></div>
//             </div>
//             <div>
//               <p className={`text-sm font-medium ${styles.textShadow}`}>
//                 Admin User
//               </p>
//               <p
//                 className={`text-xs ${styles.subtitleColor} ${styles.textShadow}`}
//               >
//                 Online
//               </p>
//             </div>
//           </div>
//           <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

//---------------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  DollarSign,
  FileWarning,
  LogOut,
  ArrowRight,
} from "lucide-react";

const AdminSidebar = ({ darkMode }) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  const isActive = (path) => location.pathname === path;

  const getStyles = () => ({
    sidebarBg: darkMode
      ? "bg-gradient-to-b from-slate-900 to-slate-800"
      : // : "bg-[#28156F]",
        "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]",

    textColor: darkMode ? "text-slate-100" : "text-white",
    activeBg: darkMode
      ? "bg-slate-700/60 backdrop-blur-sm"
      : "bg-white/25 backdrop-blur-sm",
    hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/15",
    iconBg: darkMode ? "bg-slate-800/80" : "bg-white/20",
    activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
    activeIconColor: darkMode ? "text-white" : "text-black",
    iconColor: darkMode ? "text-blue-400 border" : "text-white",
    badgeBg: "bg-red-500",
    shadow: darkMode
      ? "shadow-xl shadow-black/40"
      : "shadow-xl shadow-blue-900/40",
    borderColor: darkMode ? "border-slate-700/50" : "border-white/30",
    subtitleColor: darkMode ? "text-slate-400" : "text-white/90",
    footerBorder: darkMode ? "border-slate-700/50" : "border-white/30",
    logoBg: darkMode ? "bg-slate-800/80" : "bg-white",
    arrowBg: darkMode
      ? "from-blue-600 to-purple-600"
      : "from-white to-gray-100",
    arrowColor: darkMode ? "text-white" : "text-blue-700",
    textShadow: darkMode ? "" : "drop-shadow-sm",
    inactiveButtonBg: darkMode ? "bg-slate-800/30" : "bg-white/5",
    inactiveButtonBorder: darkMode ? "border-slate-700/40" : "border-white/20",
    activeButtonBorder: darkMode ? "border-blue-500" : "border-white",
    activeButtonShadow: darkMode ? "shadow-blue-500/30" : "shadow-white/30",
  });

  const styles = getStyles();

  // Navigation items with darker icon colors for better visibility
  const navItems = [
    {
      path: "/admin-home",
      label: "Home",
      icon: Home,
      colorLight: "text-amber-700",
      colorDark: "text-amber-500",
    },
    {
      path: "/StudentManagement",
      label: "Students",
      icon: Users,
      colorLight: "text-indigo-700",
      colorDark: "text-indigo-500",
    },
    {
      path: "/Admin-Books",
      label: "Books",
      icon: BookOpen,
      colorLight: "text-emerald-700",
      colorDark: "text-emerald-500",
    },
    {
      path: "/admin-fines",
      label: "Fine",
      icon: FileWarning,
      colorLight: "text-orange-700",
      colorDark: "text-orange-500",
    },
    {
      path: "/admin-payment",
      label: "Payment",
      icon: DollarSign,
      colorLight: "text-green-700",
      colorDark: "text-green-500",
    },
    {
      path: "/admin-login",
      label: "Logout",
      icon: LogOut,
      colorLight: "text-slate-700",
      colorDark: "text-white",
      isLogout: true,
    },
  ];

  return (
    <div
      className={`h-auto w-64 ${styles.sidebarBg} ${styles.textColor} shrink-0 flex flex-col p-5 ml-0 border ${styles.borderColor} rounded-tr-3xl rounded-br-3xl ${styles.shadow} transition-all duration-500 relative overflow-hidden`}
    >
      {/* Decorative top gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          darkMode
            ? "from-blue-500 via-purple-500 to-pink-500"
            : "from-white via-white/70 to-transparent"
        }`}
      ></div>

      {/* Logo Section */}
      <div className="mb-8 mt-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-2xl ${styles.logoBg} flex items-center justify-center transform transition-transform hover:scale-105 border ${
              darkMode ? "border-slate-700" : "border-white/30"
            }`}
          >
            <svg
              className={`w-9 h-9 ${darkMode ? "text-white" : "text-black"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.115 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>

          {/* Text */}
          <div>
            <h2
              className={`text-2xl font-bold tracking-tight ${styles.textShadow}`}
            >
              Admin Panel
            </h2>
            <p
              className={`text-sm ${styles.subtitleColor} mt-1 ${styles.textShadow}`}
            >
              Library Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2.5 flex-1 relative z-10">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={index}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                // active
                // ? `${styles.activeBg} border-2 ${styles.activeButtonBorder} shadow-lg shadow-${styles.activeButtonShadow} transform scale-[1.02]`
                active
                  ? "bg-white/90 text-black shadow-md scale-[1.01]"
                  : `${styles.inactiveButtonBg} border ${styles.inactiveButtonBorder} ${styles.hoverBg} transform hover:translate-x-1`
              } ${item.isLogout ? "mt-auto" : ""}`}
              onMouseEnter={() => setExpandedItem(index)}
              onMouseLeave={() => setExpandedItem(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300  ${
                    active
                      ? `${styles.activeIconBg} shadow-md border-2 border-gray-800}`
                      : `${styles.iconBg} border ${styles.inactiveButtonBorder}`
                  }`}
                >
                  {/* Icon with darker colors for better visibility */}
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      active
                        ? `${styles.activeIconColor}`
                        : darkMode
                          ? item.colorDark
                          : "text-white"
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className={`font-medium tracking-wide ${active ? "font-semibold" : ""} ${styles.textShadow}`}
                >
                  {item.label}
                </span>
              </div>

              {/* {active && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${styles.arrowBg} shadow-md border-2 ${styles.activeButtonBorder}`}
                >
                  <ArrowRight
                    className={`w-4 h-4 ${styles.arrowColor} transition-transform group-hover:translate-x-0.5`}
                    strokeWidth={2.5}
                  />
                </div>
              )} */}
              {active && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]">
                  <ArrowRight
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              )}

              {expandedItem === index && !active && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 border border-white/20">
                  <ArrowRight
                    className="w-4 h-5 text-white/80"
                    strokeWidth={2.5}
                  />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`mt-6 pt-4 border-t ${styles.footerBorder} relative z-10`}
      >
        <div
          className={`flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border ${
            darkMode ? "border-slate-700/50" : "border-white/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  darkMode
                    ? "from-blue-500 to-purple-600"
                    : "to-purple-600 from-blue-500"
                } border ${darkMode ? "border-slate-700" : "border-white/40"}`}
              ></div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 ${
                  darkMode ? "border-slate-900" : "border-blue-600"
                }`}
              ></div>
            </div>
            <div>
              <p className={`text-sm font-medium ${styles.textShadow}`}>
                Admin User
              </p>
              <p
                className={`text-xs ${styles.subtitleColor} ${styles.textShadow}`}
              >
                Online
              </p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
