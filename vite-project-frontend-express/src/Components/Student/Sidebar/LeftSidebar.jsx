// import { Link } from "react-router-dom";
// import { Home, LayoutDashboard, Heart, LogOut } from "lucide-react";
// // import "./App.css";
// import "../../../App.css";
// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white flex flex-col p-5 ml-2 border-1 rounded-[10px]">
//       {/* Logo / Title */}
//       {/* <div className="text-2xl font-bold mb-10">MyApp</div> */}

//       {/* Nav Links */}
//       <nav className="flex flex-col gap-4  mt-10">
//         <Link
//           to="/student-home"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <Home className="w-5 h-5" /> Home
//         </Link>

//         <Link
//           to="/member-dashboard"
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
//           to="/member-login"
//           className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
//         >
//           <LogOut className="w-5 h-5" /> Logout
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//--------------------------------------------------------------

// import { Link, useLocation } from "react-router-dom";
// import { Home, LayoutDashboard, Heart, LogOut } from "lucide-react";
// import { FaArrowCircleRight } from "react-icons/fa";
// import "../../../App.css";

// const Sidebar = () => {
//   const location = useLocation();

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
//     <div
//       className="min-h-screen w-75 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]
//                     text-white flex flex-col p-5 ml-2 border-1 rounded-[10px]"
//     >
//       <nav className="flex flex-col gap-8 mt-10">
//         <Link
//           to="/student-home"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/student-home")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Home className="w-5 h-5" /> Home
//           </div>
//           {isActive("/student-home") && arrowIcon}
//         </Link>

//         <Link
//           to="/student-dashboard"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/student-dashboard")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <LayoutDashboard className="w-5 h-5" /> Dashboard
//           </div>
//           {isActive("/student-dashboard") && arrowIcon}
//         </Link>

//         <Link
//           to="/wishlist"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/wishlist")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <Heart className="w-5 h-5" /> Wishlist
//           </div>
//           {isActive("/wishlist") && arrowIcon}
//         </Link>

//         <Link
//           to="/member-login"
//           className={`flex items-center justify-between p-2 rounded-lg transition ${
//             isActive("/member-login")
//               ? "bg-white text-black font-semibold"
//               : "hover:bg-gray-700"
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <LogOut className="w-5 h-5" /> Logout
//           </div>
//           {isActive("/member-login") && arrowIcon}
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//--------------------------------------------------------------

// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   LayoutDashboard,
//   Heart,
//   LogOut,
//   BookOpen,
//   BookmarkCheck,
// } from "lucide-react";
// import { FaArrowCircleRight } from "react-icons/fa";
// import "../../../App.css";

// const Sidebar = () => {
//   const location = useLocation();
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

//   // Conditional distance between text and arrow
//   const getTextMargin = (path) => {
//     switch (path) {
//       case "/student-home":
//         return "mr-16";
//       case "/student-dashboard":
//         return "mr-24";
//       case "/digital-library":
//         return "mr-14";
//       case "/reservation":
//         return "mr-18";
//       case "/wishlist":
//         return "mr-20";
//       case "/member-login":
//         return "mr-16";
//       default:
//         return "mr-16";
//     }
//   };

//   const menuItems = [
//     {
//       path: "/student-home",
//       label: "Home",
//       icon: <Home className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/student-dashboard",
//       label: "Dashboard",
//       icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/digital-library",
//       label: "Digital Library",
//       icon: <BookOpen className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/reservations",
//       label: "Reservation",
//       icon: <BookmarkCheck className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/wishlist",
//       label: "Wishlist",
//       icon: <Heart className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/member-login",
//       label: "Logout",
//       icon: <LogOut className="w-5 h-5 mr-2" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white flex flex-col p-5 border rounded-[10px]">
//       <nav className="flex flex-col gap-6 mt-10">
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`relative flex items-center justify-between p-3 rounded-lg transition ${
//               isActive(item.path)
//                 ? "bg-white text-black font-semibold"
//                 : "hover:bg-gray-700"
//             }`}
//           >
//             <div className={`flex items-center ${getTextMargin(item.path)}`}>
//               {item.icon}
//               {item.label}
//             </div>

//             {isActive(item.path) && (
//               <div className="absolute right-3">{arrowIcon}</div>
//             )}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//--------------------------------------------------------------

// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   LayoutDashboard,
//   Heart,
//   LogOut,
//   BookOpen,
//   BookmarkCheck,
//   FileText,
//   CreditCard,
// } from "lucide-react";
// import { FaArrowCircleRight } from "react-icons/fa";
// import "../../../App.css";

// const Sidebar = ({ darkMode }) => {
//   const location = useLocation();
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

//   // Conditional distance between text and arrow
//   const getTextMargin = (path) => {
//     switch (path) {
//       case "/student-home":
//         return "mr-16";
//       case "/student-dashboard":
//         return "mr-24";
//       case "/digital-library":
//         return "mr-14";
//       case "/reservations":
//         return "mr-18";
//       case "/wishlist":
//         return "mr-20";
//       case "/student-report":
//         return "mr-20";
//       case "/fine-payment":
//         return "mr-16";
//       case "/member-login":
//         return "mr-16";
//       default:
//         return "mr-16";
//     }
//   };

//   const menuItems = [
//     {
//       path: "/student-home",
//       label: "Home",
//       icon: <Home className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/student-dashboard",
//       label: "Dashboard",
//       icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/digital-library",
//       label: "Digital Library",
//       icon: <BookOpen className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/reservations",
//       label: "Reservation",
//       icon: <BookmarkCheck className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/wishlist",
//       label: "Wishlist",
//       icon: <Heart className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/student-report",
//       label: "Report",
//       icon: <FileText className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/fine-payment",
//       label: "Fine Payment",
//       icon: <CreditCard className="w-5 h-5 mr-2" />,
//     },
//     {
//       path: "/member-login",
//       label: "Logout",
//       icon: <LogOut className="w-5 h-5 mr-2" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen w-64 bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white flex flex-col p-5 border rounded-[10px]">
//       <nav className="flex flex-col gap-6 mt-3">
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`relative flex items-center justify-between p-3 rounded-lg transition ${
//               isActive(item.path)
//                 ? "bg-white text-black font-semibold"
//                 : "hover:bg-gray-700"
//             }`}
//           >
//             <div className={`flex items-center ${getTextMargin(item.path)}`}>
//               {item.icon}
//               {item.label}
//             </div>

//             {isActive(item.path) && (
//               <div className="absolute right-3">{arrowIcon}</div>
//             )}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

//------`--------------------------------------------------------

// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   LayoutDashboard,
//   Heart,
//   LogOut,
//   BookOpen,
//   BookmarkCheck,
//   FileText,
//   CreditCard,
//   ChevronRight,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import "../../../App.css";

// const Sidebar = ({ darkMode }) => {
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
//     { path: "/student-home", label: "Home", icon: Home },
//     { path: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { path: "/digital-library", label: "Digital Library", icon: BookOpen },
//     { path: "/reservations", label: "Reservations", icon: BookmarkCheck },
//     { path: "/wishlist", label: "Wishlist", icon: Heart },
//     { path: "/student-report", label: "Report", icon: FileText },
//     { path: "/fine-payment", label: "Fine Payment", icon: CreditCard },
//     { path: "/member-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       className={`h-auto w-70 ${styles.sidebarBg} text-white flex flex-col p-4 border-1 rounded-tr-2xl rounded-br-2xl ${styles.shadow} transition-all duration-300`}
//     >
//       {/* Logo/Title Section */}
//       <div className="mb-8 mt-2">
//         <div className="flex items-center justify-center mb-6">
//           <div
//             className={`w-16 h-16 rounded-full ${styles.iconBg} flex items-center justify-center shadow-lg`}
//           >
//             <User className="w-8 h-8" />
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center">Student Portal</h2>
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
//               className={`group flex items-center justify-between p-3 rounded-xl  transition-all duration-200 ${
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
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
//               <div
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} border-2 ${darkMode ? "border-slate-900" : "border-indigo-700"}`}
//               ></div>
//             </div>
//             <div>
//               <p className="text-sm font-medium">Student User</p>
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

// export default Sidebar;

//-------------------------------------------------------------------

// import { Link, useLocation } from "react-router-dom";
// import {
//   Home,
//   LayoutDashboard,
//   Heart,
//   LogOut,
//   BookOpen,
//   BookmarkCheck,
//   FileText,
//   CreditCard,
//   ArrowRight,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import "../../../App.css";

// const Sidebar = ({ darkMode }) => {
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
//     { path: "/student-home", label: "Home", icon: Home },
//     { path: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { path: "/digital-library", label: "Digital Library", icon: BookOpen },
//     { path: "/reservations", label: "Reservations", icon: BookmarkCheck },
//     { path: "/wishlist", label: "Wishlist", icon: Heart },
//     { path: "/student-report", label: "Report", icon: FileText },
//     { path: "/fine-payment", label: "Fine Payment", icon: CreditCard },
//     { path: "/member-login", label: "Logout", icon: LogOut, isLogout: true },
//   ];

//   return (
//     <div
//       // Added flex-shrink-0 here to prevent the sidebar from shrinking
//       className={`h-auto w-70 flex-shrink-0 ${styles.sidebarBg} text-white flex flex-col p-4 ml-0 border-2 rounded-tr-2xl rounded-br-2xl ${styles.shadow} transition-all duration-300 relative overflow-hidden`}
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
//             <User className="w-8 h-8" />
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center">Student Portal</h2>
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
//               } ${item.isLogout ? "mt-auto mb-2" : ""}`}
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
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
//               <div
//                 className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${darkMode ? "bg-green-400" : "bg-green-300"} border-2 ${darkMode ? "border-slate-900" : "border-indigo-700"}`}
//               ></div>
//             </div>
//             <div>
//               <p className="text-sm font-medium">Student User</p>
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

// export default Sidebar;

//------------------------------------------------------------------------------------

import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Heart,
  LogOut,
  BookOpen,
  BookmarkCheck,
  FileText,
  CreditCard,
  ArrowRight,
  User,
} from "lucide-react";
import { useState } from "react";
import "../../../App.css";

const Sidebar = ({ darkMode }) => {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  // Check if a path is active
  const isActive = (path) => location.pathname === path;

  // Professional styling with clear active/inactive distinction
  const getStyles = () => ({
    sidebarBg: darkMode
      ? "bg-gradient-to-b from-slate-900 to-slate-800"
      : "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]",
    textColor: darkMode ? "text-slate-100" : "text-white",
    activeBg: darkMode
      ? "bg-slate-700/60 backdrop-blur-sm"
      : "bg-white/25 backdrop-blur-sm",
    hoverBg: darkMode ? "hover:bg-slate-700/30" : "hover:bg-white/15",
    iconBg: darkMode ? "bg-slate-800/80" : "bg-white/20",
    activeIconBg: darkMode ? "bg-blue-600" : "bg-white",
    activeIconColor: darkMode ? "text-white" : "text-blue-700",
    iconColor: darkMode ? "text-blue-400" : "text-white/95",
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
    // Professional button styles with clear distinction
    inactiveButtonBg: darkMode ? "bg-slate-800/30" : "bg-white/5",
    inactiveButtonBorder: darkMode ? "border-slate-700/40" : "border-white/20",
    activeButtonBorder: darkMode ? "border-blue-500" : "border-white",
    activeButtonShadow: darkMode ? "shadow-blue-500/30" : "shadow-white/30",
  });

  const styles = getStyles();

  // Navigation items
  const navItems = [
    { path: "/student-home", label: "Home", icon: Home },
    { path: "/student-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/digital-library", label: "Digital Library", icon: BookOpen },
    { path: "/reservations", label: "Reservations", icon: BookmarkCheck },
    { path: "/wishlist", label: "Wishlist", icon: Heart },
    { path: "/student-report", label: "Report", icon: FileText },
    { path: "/fine-payment", label: "Fine Payment", icon: CreditCard },
    { path: "/member-login", label: "Logout", icon: LogOut, isLogout: true },
  ];

  return (
    <div
      // Added flex-shrink-0 here to prevent the sidebar from shrinking
      className={`h-auto w-70 flex-shrink-0 ${styles.sidebarBg} ${styles.textColor} shrink-0 flex flex-col p-5 ml-0 border ${styles.borderColor} rounded-tr-3xl rounded-br-3xl ${styles.shadow} transition-all duration-500 relative overflow-hidden`}
    >
      {/* Decorative top gradient with more visibility */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          darkMode
            ? "from-blue-500 via-purple-500 to-pink-500"
            : "from-white via-white/70 to-transparent"
        }`}
      ></div>

      {/* Logo Section – Admin Style */}
      <div className="mb-8 mt-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-2xl ${styles.logoBg} flex items-center justify-center transform transition-transform hover:scale-105 border ${
              darkMode ? "border-slate-700" : "border-white/30"
            }`}
          >
            <User
              className={`w-7 h-7 ${darkMode ? "text-white" : "text-black"}`}
            />
          </div>

          {/* Text */}
          <div>
            <h2
              className={`text-2xl font-bold tracking-tight ${styles.textShadow}`}
            >
              Student Portal
            </h2>
            <p
              className={`text-sm ${styles.subtitleColor} mt-1 ${styles.textShadow}`}
            >
              Library Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu with professional button distinction */}
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
              } ${item.isLogout ? "mt-auto mb-2" : ""}`}
              onMouseEnter={() => setExpandedItem(index)}
              onMouseLeave={() => setExpandedItem(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    // active
                    // ? `${styles.activeIconBg} shadow-md border-2 ${styles.activeButtonBorder}`
                    active
                      ? `bg-white shadow-md border-2 border-gray-800`
                      : `${styles.iconBg} border ${styles.inactiveButtonBorder}`
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      // active
                      // ? `${styles.activeIconColor}`
                      active ? "text-black" : `${styles.iconColor}`
                    }`}
                  />
                </div>
                <span
                  className={`font-medium tracking-wide ${
                    active ? "font-semibold" : ""
                  } ${styles.textShadow}`}
                >
                  {item.label}
                </span>
              </div>

              {/* Arrow indicator with better visibility */}
              {active && (
                // <div
                //   className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${styles.arrowBg} shadow-md border-2 ${styles.activeButtonBorder}`}
                // >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-b from-[#1F2A4F] to-[#4A427B]">
                  {/* <ArrowRight
                    className={`w-4 h-4 ${styles.arrowColor} transition-transform group-hover:translate-x-0.5`}
                  /> */}
                  <ArrowRight
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              )}

              {expandedItem === index && !active && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 border border-white/20">
                  <ArrowRight className="w-4 h-5 text-white/80" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section with improved readability */}
      <div
        className={`mt-6 pt-4 border-t ${styles.footerBorder} relative z-10`}
      >
        <div
          className={`flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border ${darkMode ? "border-slate-700/50" : "border-white/20"}`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                  darkMode
                    ? "from-blue-500 to-purple-600"
                    : "bg-gradient-to-r from-[#03ff68] to-[#361aed] hover:from-[#f38600] hover:to-[#1F2A4F]"
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
                Student User
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

export default Sidebar;
