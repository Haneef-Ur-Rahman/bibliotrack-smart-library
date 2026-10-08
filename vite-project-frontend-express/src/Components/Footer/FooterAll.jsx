// import React from "react";
// import ChatBot from "../Footer/Chatbot";

// function FooterAll() {
//   return (
//     // <footer className="bg-[#1E1E2F] text-gray-300 py-6 shadow-inner">
//     <footer className="bg-gradient-to-r from-[#131e42] to-[#3a2e8a] text-gray-300 py-6 shadow-inner relative z-10 w-full">
//       <ChatBot />
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center w-full">
//         {/* Left Section */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <h2 className="text-lg font-semibold text-white">
//             Final Year Project (BSCS)
//           </h2>
//           <p className="text-sm text-gray-400">
//             University of Peshawar — Department of Computer Science
//           </p>
//         </div>

//         {/* Middle Section */}
//         <div className="text-center mb-4 md:mb-0">
//           <p className="text-sm text-gray-400">
//             Built with 💻 using{" "}
//             <span className="text-yellow-400 font-medium">MERN Stack</span> &{" "}
//             <span className="text-pink-400 font-medium">
//               UI/UX Design Principles
//             </span>
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="text-center md:text-right">
//           <p className="font-semibold text-white">Developed by:</p>
//           <p className="text-sm">
//             <span className="text-yellow-400 font-medium">
//               Haneef Ur Rahman
//             </span>{" "}
//           </p>
//           <p className="text-sm">
//             <span className="text-pink-400 font-medium"> Syeda Dilawaiz </span>{" "}
//           </p>
//         </div>
//       </div>

//       <div className="border-t border-gray-700 mt-6 pt-3 text-center text-xs text-white">
//         © {new Date().getFullYear()} All Rights Reserved | FYP Project — UOP CS
//         Dept.
//       </div>
//     </footer>
//   );
// }

// export default FooterAll;

//-------------------------------------------

// import React from "react";
// import ChatBot from "../Footer/Chatbot";

// const FooterAll = ({ darkMode }) => {
//   // Conditional styling function
//   const getStyles = () => ({
//     footerBg: darkMode
//       ? "bg-gradient-to-r from-slate-900 to-slate-800"
//       : "bg-gradient-to-r from-[#131e42] to-[#3a2e8a]",
//     textColor: darkMode ? "text-slate-300" : "text-gray-300",
//     titleColor: darkMode ? "text-white" : "text-white",
//     subtitleColor: darkMode ? "text-slate-400" : "text-gray-400",
//     borderColor: darkMode ? "border-slate-700" : "border-gray-700",
//     copyrightColor: darkMode ? "text-slate-200" : "text-white",
//     highlightColor1: darkMode ? "text-blue-400" : "text-yellow-400",
//     highlightColor2: darkMode ? "text-purple-400" : "text-pink-400",
//     shadow: darkMode ? "shadow-slate-900/50" : "shadow-black/30",
//   });

//   const styles = getStyles();

//   return (
//     <footer
//       className={`${styles.footerBg} ${styles.textColor} py-6 shadow-inner relative z-10 w-full transition-all duration-300`}
//     >
//       <ChatBot />
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center w-full">
//         {/* Left Section */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <h2 className={`text-lg font-semibold ${styles.titleColor}`}>
//             Final Year Project (BSCS)
//           </h2>
//           <p className={`text-sm ${styles.subtitleColor}`}>
//             University of Peshawar — Department of Computer Science
//           </p>
//         </div>

//         {/* Middle Section */}
//         <div className="text-center mb-4 md:mb-0">
//           <p className={`text-sm ${styles.subtitleColor}`}>
//             Built with 💻 using{" "}
//             <span className={`${styles.highlightColor1} font-medium`}>
//               MERN Stack
//             </span>{" "}
//             &{" "}
//             <span className={`${styles.highlightColor2} font-medium`}>
//               UI/UX Design Principles
//             </span>
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="text-center md:text-right">
//           <p className={`font-semibold ${styles.titleColor}`}>Developed by:</p>
//           <p className="text-sm">
//             <span className={`${styles.highlightColor1} font-medium`}>
//               Haneef Ur Rahman
//             </span>{" "}
//           </p>
//           <p className="text-sm">
//             <span className={`${styles.highlightColor2} font-medium`}>
//               {" "}
//               Syeda Dilawaiz{" "}
//             </span>{" "}
//           </p>
//         </div>
//       </div>

//       <div
//         className={`border-t ${styles.borderColor} mt-6 pt-3 text-center text-xs ${styles.copyrightColor}`}
//       >
//         © {new Date().getFullYear()} All Rights Reserved | FYP Project — UOP CS
//         Dept.
//       </div>
//     </footer>
//   );
// };

// export default FooterAll;

//-------------------------------------------

import React from "react";
import ChatBot from "../Footer/ChatBot";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaPalette,
  FaDatabase,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

const FooterAll = ({ darkMode }) => {
  // Conditional styling function
  const getStyles = () => ({
    footerBg: darkMode
      ? "bg-gray-800"
      : "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]",
    textColor: darkMode ? "text-slate-300" : "text-slate-300",
    titleColor: darkMode ? "text-white" : "text-white",
    subtitleColor: darkMode ? "text-slate-400" : "text-slate-400",
    borderColor: darkMode ? "border-slate-700/50" : "border-slate-600/30",
    copyrightColor: darkMode ? "text-slate-200" : "text-slate-200",
    accentColor1: darkMode ? "text-blue-400" : "text-blue-400",
    accentColor2: darkMode ? "text-purple-400" : "text-purple-400",
    cardBg: darkMode ? "bg-slate-800/50" : "bg-slate-700/20",
    iconBg: darkMode ? "bg-slate-700/50" : "bg-slate-600/30",
    shadow: darkMode ? "shadow-slate-900/50" : "shadow-black/30",
    glowEffect: darkMode ? "shadow-blue-500/20" : "shadow-blue-400/20",
  });

  const styles = getStyles();

  const techStack = [
    { icon: FaReact, name: "React", color: "text-cyan-400" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-400" },
    { icon: SiMongodb, name: "MongoDB", color: "text-emerald-400" },
    { icon: FaDatabase, name: "Express", color: "text-gray-400" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <footer
      className={`${styles.footerBg} ${styles.textColor} py-5 shadow-inner relative z-10 w-full transition-all duration-500`}
    >
      <ChatBot darkMode={darkMode} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg ${styles.iconBg} flex items-center justify-center`}
              >
                <FaCode className={`text-xl ${styles.accentColor1}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${styles.titleColor}`}>
                  FYP Project
                </h3>
                <p className={`text-sm ${styles.subtitleColor}`}>
                  Library Management
                </p>
              </div>
            </div>
            <p className={`text-sm ${styles.subtitleColor} leading-relaxed`}>
              Final Year Project for the Department of Computer Science,
              University of Peshawar. A modern library management system built
              with cutting-edge technologies.
            </p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className={`${styles.accentColor2}`} />
              <span className={`text-sm ${styles.subtitleColor}`}>
                University of Peshawar
              </span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4
              className={`text-lg font-semibold ${styles.titleColor} flex items-center`}
            >
              <FaPalette className="mr-2" />
              Tech Stack
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${styles.cardBg} hover:bg-slate-600/30 transition-colors`}
                >
                  <tech.icon className={`text-lg ${tech.color}`} />
                  <span className={`text-sm ${styles.textColor}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${styles.titleColor}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`text-sm ${styles.subtitleColor} hover:${styles.accentColor1} transition-colors flex items-center`}
                >
                  <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                  About Project
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm ${styles.subtitleColor} hover:${styles.accentColor1} transition-colors flex items-center`}
                >
                  <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm ${styles.subtitleColor} hover:${styles.accentColor1} transition-colors flex items-center`}
                >
                  <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`text-sm ${styles.subtitleColor} hover:${styles.accentColor1} transition-colors flex items-center`}
                >
                  <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
                  Contact Team
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${styles.titleColor}`}>
              Development Team
            </h4>
            <div className="space-y-3">
              <div
                className={`flex items-center space-x-3 p-2 rounded-lg ${styles.cardBg}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">HR</span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${styles.titleColor}`}>
                    Haneef Ur Rahman
                  </p>
                  <p className={`text-xs ${styles.subtitleColor}`}>
                    Full Stack Developer
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center space-x-3 p-2 rounded-lg ${styles.cardBg}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SD</span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${styles.titleColor}`}>
                    Syeda Dilawaiz
                  </p>
                  <p className={`text-xs ${styles.subtitleColor}`}>
                    UI/UX Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${styles.borderColor} pt-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className={`text-sm ${styles.copyrightColor}`}>
              © {new Date().getFullYear()} All Rights Reserved | FYP Project —
              UOP CS Dept.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center ${styles.textColor} hover:${styles.accentColor1} transition-all duration-300 hover:scale-110 hover:${styles.glowEffect} hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAll;
