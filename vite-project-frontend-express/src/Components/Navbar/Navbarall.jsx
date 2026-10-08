// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/logo.jpg";
// function Navbarall() {
//   return (
//     <div className="flex items-center justify-between px-6 py-2 shadow-md bg-transparent relative z-10">
//       {/* Left side (Logo + LMS text) */}
//       <div className="flex items-center gap-2">
//         <img
//           src={Logo}
//           alt="Logo"
//           className="h-16 w-16 border-2 border-blue-600 rounded-[20px]"
//         />
//         <h1
//           className="text-white text-3xl font-bold"
//           style={{ fontFamily: '"Playfair Display", serif' }}
//         >
//           LMS
//         </h1>
//       </div>

//       {/* Right side (Navigation Links as Buttons) */}
//       <nav className="flex gap-4">
//         <Link
//           to="/"
//           className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
//         >
//           Home
//         </Link>

//         <Link
//           to="/contactus"
//           className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
//         >
//           Contact Us
//         </Link>

//         <Link
//           to="/aboutus"
//           className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
//         >
//           About Us
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default Navbarall;

//------ Updated Code ------------------------------------------------------------

// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/logo.jpg";

// function Navbarall({ darkMode }) {
//   return (
//     // --- FIX: Professional Glass-morphism Background ---
//     // Ab navbar mein khud ka semi-transparent background hai jo har page pe visible rahega
//     <div
//       className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
//         darkMode
//           ? "bg-slate-900/80 border-slate-700/50"
//           : "bg-slate-200/80 border-gray-500"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 sm:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Left side (Logo + LMS text) */}
//           <Link to="/" className="flex items-center gap-3">
//             <img
//               src={Logo}
//               alt="Logo"
//               className="h-16 w-16 border-2 border-blue-600 rounded-[25px]"
//             />
//             {/* --- FIX: Dynamic Text Color for Readability --- */}

//             <h1
//               className={`text-3xl font-bold transition-colors duration-300 ${
//                 darkMode ? "text-white" : "text-slate-900"
//               }`}
//               style={{ fontFamily: '"Playfair Display", serif' }}
//             >
//               LMS
//             </h1>
//           </Link>

//           {/* Right side (Navigation Links as Buttons) */}
//           <nav className="flex gap-3">
//             {/* --- Professional Neutral Buttons --- */}
//             <Link
//               to="/"
//               className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
//                 darkMode
//                   ? "bg-slate-700 text-white hover:bg-slate-600"
//                   : "bg-slate-600 text-white hover:bg-slate-700"
//               }`}
//             >
//               Home
//             </Link>

//             <Link
//               to="/contactus"
//               className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
//                 darkMode
//                   ? "bg-slate-700 text-white hover:bg-slate-600"
//                   : "bg-slate-600 text-white hover:bg-slate-700"
//               }`}
//             >
//               Contact Us
//             </Link>

//             <Link
//               to="/aboutus"
//               className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
//                 darkMode
//                   ? "bg-slate-700 text-white hover:bg-slate-600"
//                   : "bg-slate-600 text-white hover:bg-slate-700"
//               }`}
//             >
//               About Us
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbarall;

//-----------------------------------------------------------------------------

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbarall({ darkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode
          ? "bg-slate-900/80 border-slate-700/50"
          : "bg-slate-200/80 border-gray-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo"
              className="h-16 w-16 border-2 border-blue-600 rounded-[25px]"
            />
            <h1
              className={`text-4xl font-bold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-blue-900"
              }`}
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              LMS
            </h1>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-black bg-white border-4 border-gray-800 dark:bg-white dark:text-black dark:border-4 dark:border-gray-400"
            >
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>

          {/* Nav Links */}
          <nav
            className={`
              absolute sm:static top-20 left-0 w-full sm:w-auto bg-slate-200 sm:bg-transparent dark:bg-slate-900 sm:dark:bg-transparent
              flex flex-col sm:flex-row gap-3 p-4 sm:p-0 transition-all duration-300
              ${menuOpen ? "block" : "hidden"} sm:flex
            `}
          >
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                darkMode
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-slate-600 text-white hover:bg-slate-700"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/contactus"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                darkMode
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-slate-600 text-white hover:bg-slate-700"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>

            <Link
              to="/aboutus"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                darkMode
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-slate-600 text-white hover:bg-slate-700"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbarall;
