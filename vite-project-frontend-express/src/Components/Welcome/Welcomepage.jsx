// import React from "react";
// import { Link } from "react-router-dom";
// import "../../index.css";
// import Librarybg from "../../assets/librarybg.jpg";
// import Librarybg1 from "../../assets/librarybg1.jpeg";
// import Librarybg3 from "../../assets/librarybg3.jpg";
// import BG from "../../assets/bg.png";

// import Navbarall from "../Navbar/Navbarall.jsx";
// import FooterAll from "../Footer/FooterAll.jsx";
// function Welcomepage({ darkMode }) {
//   return (
//     <div
//       className="relative min-h-screen bg-opacity-2"
//       style={{
//         backgroundImage: `url(${BG})`,
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/60 h-full"></div>
//       <Navbarall />
//       {/* Centered Content */}
//       <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-33 pt-20 relative z-10">
//         <h1
//           className="text-6xl  text-white mb-6 font-bold"
//           style={{ fontFamily: '"Playfair Display", serif' }}
//         >
//           Welcome to
//         </h1>
//         <h1
//           className="text-6xl  text-white mb-6 font-bold"
//           style={{ fontFamily: '"Playfair Display", serif' }}
//         >
//           Library Management System
//         </h1>
//         <h2 className="text-center text-2xl font-semibold p-1 text-white mb-8 bold mt-10">
//           Please Choose :
//         </h2>
//         {/* Buttons */}
//         <div className="flex gap-8 mt-3">
//           <Link
//             to="/admin-signup"
//             className="bg-gradient-to-r from-[#2e227b] to-[#131e42] border-2 border-white-100 hover:from-[#3a2cb3] hover:to-[#1f2a6b] text-white px-10 py-4 rounded-lg shadow-md text-lg font-medium"
//           >
//             Admin
//           </Link>
//           <Link
//             to="/member-signup"
//             className="bg-gradient-to-r from-[#2e227b] to-[#131e42] hover:from-[#3a2cb3] hover:to-[#1f2a6b] border-2 border-white-100 text-white px-8 py-4 rounded-lg shadow-md text-lg font-medium"
//           >
//             Student
//           </Link>
//         </div>
//       </div>
//       {/* Footer */}
//       <FooterAll />
//     </div>
//   );
// }

// export default Welcomepage;

//------------------------------------------------------------

// import React from "react";
// import { Link } from "react-router-dom";
// import "../../index.css";
// import BG from "../../assets/bg.png";

// import Navbarall from "../Navbar/Navbarall.jsx";
// import FooterAll from "../Footer/FooterAll.jsx";

// function Welcomepage({ darkMode }) {
//   return (
//     <div
//       className="relative min-h-screen bg-opacity-2 transition-colors duration-300"
//       style={{
//         backgroundImage: `url(${BG})`,
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//         backgroundSize: "cover",
//       }}
//     >
//       {/* Overlay */}
//       <div
//         className={`absolute inset-0 h-full transition-colors duration-300 ${
//           darkMode ? "bg-black/80" : "bg-black/60"
//         }`}
//       ></div>

//       <Navbarall darkMode={darkMode} />

//       {/* Centered Content */}
//       <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-33 pt-20 relative z-10">
//         <h1
//           className={`text-6xl mb-6 font-bold transition-colors duration-300 ${
//             darkMode ? "text-white" : "text-white"
//           }`}
//           style={{ fontFamily: '"Playfair Display", serif' }}
//         >
//           Welcome to
//         </h1>
//         <h1
//           className={`text-6xl mb-6 font-bold transition-colors duration-300 ${
//             darkMode ? "text-white" : "text-white"
//           }`}
//           style={{ fontFamily: '"Playfair Display", serif' }}
//         >
//           Library Management System
//         </h1>
//         <h2
//           className={`text-2xl font-semibold p-1 mb-8 mt-10 transition-colors duration-300 ${
//             darkMode ? "text-gray-200" : "text-white"
//           }`}
//         >
//           Please Choose :
//         </h2>

//         {/* Buttons */}
//         <div className="flex gap-8 mt-3">
//           <Link
//             to="/admin-signup"
//             className={`px-10 py-4 rounded-lg shadow-md text-lg font-medium transition-all duration-300 border-2 ${
//               darkMode
//                 ? "bg-indigo-800 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-500"
//                 : "bg-gradient-to-r from-[#2e227b] to-[#131e42] border-white text-white hover:from-[#3a2cb3] hover:to-[#1f2a6b]"
//             }`}
//           >
//             Admin
//           </Link>
//           <Link
//             to="/member-signup"
//             className={`px-8 py-4 rounded-lg shadow-md text-lg font-medium transition-all duration-300 border-2 ${
//               darkMode
//                 ? "bg-indigo-800 border-indigo-600 text-white hover:bg-indigo-700 hover:border-indigo-500"
//                 : "bg-gradient-to-r from-[#2e227b] to-[#131e42] border-white text-white hover:from-[#3a2cb3] hover:to-[#1f2a6b]"
//             }`}
//           >
//             Student
//           </Link>
//         </div>
//       </div>

//       {/* Footer */}
//       <FooterAll darkMode={darkMode} />
//     </div>
//   );
// }

// export default Welcomepage;

//------ Final Updated Code ------------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import BG from "../../assets/bg.png";
import Navbarall from "../Navbar/Navbarall.jsx";
import FooterAll from "../Footer/FooterAll.jsx";

function Welcomepage({ darkMode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BG})`,
        }}
      />

      {/* Original Simple Overlay */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          darkMode ? "bg-black/80" : "bg-black/60"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbarall darkMode={darkMode} />

        {/* Centered Content */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-33">
          <div className="max-w-4xl mx-auto">
            {/* --- MODERN & PROFESSIONAL MAIN HEADING --- */}
            <h1
              className={`text-4xl md:text-6xl font-bold leading-tight mb-8 transition-all duration-500 ${
                darkMode ? "text-white" : "text-white"
              }`}
              style={{
                fontFamily: '"Playfair Display", serif',
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              Welcome to
              <br />
              Library Management System
            </h1>

            {/* Call to Action */}
            <h2
              className={`text-lg md:text-xl font-medium mb-12 tracking-wide transition-all duration-500 ${
                darkMode ? "text-gray-400" : "text-gray-300"
              }`}
            >
              Please choose your portal
            </h2>

            {/* --- STYLISH & MODERN BUTTONS --- */}
            {/* --- STYLISH & MODERN BUTTONS WITH COLOR --- */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/admin-signup"
                className={`group w-full sm:w-auto px-12 py-4 rounded-2xl text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 shadow-xl ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-[#344785] hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                Admin Portal
              </Link>
              <Link
                to="/member-signup"
                className={`group w-full sm:w-auto px-12 py-4 rounded-2xl text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 shadow-xl ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-[#344785] hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                Student Portal
              </Link>
            </div>
          </div>
        </main>

        <FooterAll darkMode={darkMode} />
      </div>
    </div>
  );
}

export default Welcomepage;
