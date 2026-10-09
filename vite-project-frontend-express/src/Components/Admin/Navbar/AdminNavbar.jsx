// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // 👈 Add this
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { socket } from "./socket";
// import "./App.css";
// import Logo from "./assets/logo.jpg";

// function AdminNavbar() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Listen for new user signup broadcast
//     socket.on("receive_new_user", (data) => {
//       toast.info(`New user signed up: ${data.username} (${data.email})`);
//     });

//     // Cleanup on unmount
//     return () => socket.off("receive_new_user");
//   }, []);
//   return (
//     <>
//       <nav className="bg-white text-white flex justify-between items-center p-1 w-[100%]">
//         {/* <div className="" style={{ display: "flex", alignItems: "center", gap: "1rem" }}> */}
//         <div className="flex">
//           <img src={Logo} alt="" className="h-15 w-15 ml-6 mt-1" />
//           <h1 className="text-blue-600 text-4xl font-bold pt-3 pl-1"> LMS</h1>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="&nbsp;&nbsp;&nbsp;Search"
//             className="text-black border-1 border-grey w-100 h-9 "
//           />
//         </div>
//         {/* </div> */}

//         <div className="flex items-center gap-3 mr-2">
//           <button
//             onClick={() => navigate("/admin-update-profile")}
//             className="border-4 border-blue-600 rounded-[10px]  h-14 w-30 text-xl font-bold cursor-pointer transition duration-200 bg-black text-white"
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#1f2937")} // hover:bg-gray-800
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
//           >
//             Admin{" "}
//             <span className="rounded-[50px] border-2 border-yellow-400">
//               {" "}
//               👤{" "}
//             </span>
//           </button>
//         </div>
//       </nav>

//       <ToastContainer position="top-center" autoClose={2000} />
//     </>
//   );
// }

// export default AdminNavbar;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { socket } from "./socket";
// import "./App.css";
// import Logo from "./assets/logo.jpg";

// function AdminNavbar() {
//   const navigate = useNavigate();
//   const [adminName, setAdminName] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // ✅ Fetch admin data from backend
//     const fetchAdmin = async () => {
//       if (!token) return;

//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;
//         setAdminName(user?.firstName || "Admin");
//       } catch (err) {
//         console.error("Error fetching admin:", err);
//       }
//     };

//     fetchAdmin();

//     // ✅ Listen for new user signup broadcast
//     socket.on("receive_new_user", (data) => {
//       toast.info(`New user signed up: ${data.username} (${data.email})`);
//     });

//     // ✅ Cleanup
//     return () => socket.off("receive_new_user");
//   }, [token]);

//   return (
//     <>
//       <nav className="bg-white flex justify-between items-center p-1 w-full shadow-md">
//         {/* Left - Logo */}
//         <div className="flex">
//           <img src={Logo} alt="Logo" className="h-15 w-15 ml-6 mt-1" />
//           <h1 className="text-blue-600 text-4xl font-bold pt-3 pl-1">LMS</h1>
//         </div>

//         {/* Center - Admin Name */}
//         {/* <div className="mr-150">
//           <h2 className="text-2xl font-semibold text-black text-bold">
//             Welcome{" "}
//             <span className="text-2xl font-semibold text-blue-700 text-bold">
//               {" "}
//               {adminName}
//             </span>
//           </h2>
//         </div> */}
//         <div className="mr-150">
//           <h2
//             key={adminName}
//             className="text-2xl font-semibold text-black typing-text text-bold"
//           >
//             Greetings,{" "}
//             <span className="text-2xl font-semibold text-blue-700 typing-text text-bold">
//               {" "}
//               {adminName}!{" "}
//             </span>
//           </h2>
//         </div>

//         {/* Right - Profile Button */}
//         <div className="flex items-center gap-3 mr-2">
//           <button
//             onClick={() => navigate("/admin-update-profile")}
//             className="border-4 border-blue-600 rounded-[10px] h-14 w-31 text-xl font-bold cursor-pointer transition duration-200 bg-black text-white hover:bg-gray-800"
//           >
//             Admin <span className="rounded-full">👤</span>
//           </button>
//         </div>
//       </nav>

//       <ToastContainer position="top-center" autoClose={2000} />
//     </>
//   );
// }

// export default AdminNavbar;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { socket } from "../../../socket";
// import "../../../App.css";
// import Logo from "../../../assets/logo.jpg";
// import { User } from "lucide-react";

// function AdminNavbar({ darkMode }) {
//   const navigate = useNavigate();
//   const [adminName, setAdminName] = useState("");
//   const [displayedText, setDisplayedText] = useState("");
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;
//         setAdminName(user?.firstName || "Admin");
//       } catch (err) {
//         console.error("Error fetching admin:", err);
//       }
//     };

//     fetchAdmin();

//     socket.on("receive_new_user", (data) => {
//       toast.info(`New user signed up: ${data.username} (${data.email})`);
//     });

//     return () => socket.off("receive_new_user");
//   }, [token]);

//   // ✅ Typing animation logic
//   useEffect(() => {
//     if (!adminName) return;

//     const fullText = `Greetings, ${adminName}!`;
//     let currentText = "";
//     let i = 0;

//     setDisplayedText(""); // reset
//     setIsTypingDone(false);

//     const typingInterval = setInterval(() => {
//       currentText += fullText[i];
//       setDisplayedText(currentText);
//       i++;

//       if (i >= fullText.length) {
//         clearInterval(typingInterval);
//         setIsTypingDone(true);
//       }
//     }, 120);

//     return () => clearInterval(typingInterval);
//   }, [adminName]);

//   return (
//     <>
//       <nav
//         className={`flex justify-between items-center p-2 w-full shadow-md transition-colors duration-300 ${
//           darkMode
//             ? "bg-gray-900 border-b border-gray-600"
//             : "bg-white border-b border-gray-200"
//         }`}
//       >
//         {/* Left - Logo */}
//         <div className="flex items-center ml-6">
//           <img src={Logo} alt="Logo" className="h-14 w-14" />
//           <h1
//             className={`text-4xl font-bold ml-1 transition-colors duration-300 ${
//               darkMode ? "text-white" : "text-[#27439A]"
//             }`}
//             style={{ fontFamily: '"Playfair Display", serif' }}
//           >
//             LMS
//           </h1>
//           <div className="ml-30">
//             <h2
//               className={`text-2xl font-bold transition-colors duration-300 ${
//                 darkMode ? "text-white" : "text-black"
//               }`}
//             >
//               <span className={darkMode ? "text-white" : "text-[#27439A]"}>
//                 {displayedText}
//               </span>
//               {!isTypingDone && (
//                 <span
//                   className={`${
//                     darkMode ? "text-white" : "text-black"
//                   } animate-blink`}
//                 >
//                   |
//                 </span>
//               )}
//             </h2>
//           </div>
//         </div>

//         {/* Right - Profile Button */}
//         <div className="flex items-center gap-3 mr-2">
//           <button
//             onClick={() => navigate("/admin-update-profile")}
//             className={`border-4 rounded-[10px] h-14 w-30 text-xl font-bold cursor-pointer transition duration-200 ${
//               darkMode
//                 ? "bg-gray-800 border-gray-400 text-white hover:bg-gray-700 hover:text-white"
//                 : "bg-white border-[#27439A] text-black hover:bg-gray-600 hover:text-white"
//             }`}
//           >
//             <span className="flex items-center justify-center gap-1">
//               <span>Admin</span>
//               <User size={25} color={darkMode ? "#F3F4F6" : "#6B7280"} />
//             </span>
//           </button>
//         </div>
//       </nav>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </>
//   );
// }

// export default AdminNavbar;

//--------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { socket } from "../../../socket";
// import "../../../App.css";
// import Logo from "../../../assets/logo.jpg";
// import { User } from "lucide-react";

// function AdminNavbar({ darkMode }) {
//   const navigate = useNavigate();
//   const [adminName, setAdminName] = useState("");
//   const [displayedText, setDisplayedText] = useState("");
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;
//         setAdminName(user?.firstName || "Admin");
//       } catch (err) {
//         console.error("Error fetching admin:", err);
//       }
//     };

//     fetchAdmin();

//     socket.on("receive_new_user", (data) => {
//       toast.info(`New user signed up: ${data.username} (${data.email})`);
//     });

//     return () => socket.off("receive_new_user");
//   }, [token]);

//   // ✅ Typing animation logic - only once per session
//   useEffect(() => {
//     if (!adminName) return;

//     const typedAlready = sessionStorage.getItem("typedGreeting");
//     const fullText = `Greetings, ${adminName}!`;

//     if (typedAlready) {
//       // Agar pehle se type ho chuka, directly show full text
//       setDisplayedText(fullText);
//       setIsTypingDone(true);
//       return;
//     }

//     let currentText = "";
//     let i = 0;

//     setDisplayedText(""); // reset
//     setIsTypingDone(false);

//     const typingInterval = setInterval(() => {
//       currentText += fullText[i];
//       setDisplayedText(currentText);
//       i++;

//       if (i >= fullText.length) {
//         clearInterval(typingInterval);
//         setIsTypingDone(true);
//         // mark as typed in sessionStorage
//         sessionStorage.setItem("typedGreeting", "true");
//       }
//     }, 120);

//     return () => clearInterval(typingInterval);
//   }, [adminName]);

//   return (
//     <>
//       <nav
//         className={`flex justify-between items-center p-2 w-full shadow-md transition-colors duration-300 ${
//           darkMode
//             ? "bg-gray-900 border-b border-gray-600"
//             : "bg-white border-b border-gray-200"
//         }`}
//       >
//         {/* Left - Logo */}
//         <div className="flex items-center ml-6">
//           <img src={Logo} alt="Logo" className="h-14 w-14" />
//           <h1
//             className={`text-4xl font-bold ml-1 transition-colors duration-300 ${
//               darkMode ? "text-white" : "text-[#27439A]"
//             }`}
//             style={{ fontFamily: '"Playfair Display", serif' }}
//           >
//             LMS
//           </h1>
//           <div className="ml-30">
//             <h2
//               className={`text-2xl font-bold transition-colors duration-300 ${
//                 darkMode ? "text-white" : "text-black"
//               }`}
//             >
//               <span className={darkMode ? "text-white" : "text-[#27439A]"}>
//                 {displayedText}
//               </span>
//               {!isTypingDone && (
//                 <span
//                   className={`${
//                     darkMode ? "text-white" : "text-black"
//                   } animate-blink`}
//                 >
//                   |
//                 </span>
//               )}
//             </h2>
//           </div>
//         </div>

//         {/* Right - Profile Button */}
//         <div className="flex items-center gap-3 mr-2">
//           <button
//             onClick={() => navigate("/admin-update-profile")}
//             className={`border-4 rounded-[10px] h-14 w-30 text-xl font-bold cursor-pointer transition duration-200 ${
//               darkMode
//                 ? "bg-gray-800 border-gray-400 text-white hover:bg-gray-700 hover:text-white"
//                 : "bg-white border-[#27439A] text-black hover:bg-gray-600 hover:text-white"
//             }`}
//           >
//             <span className="flex items-center justify-center gap-1">
//               <span>Admin</span>
//               <User size={25} color={darkMode ? "#F3F4F6" : "#6B7280"} />
//             </span>
//           </button>
//         </div>
//       </nav>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </>
//   );
// }

// export default AdminNavbar;

//--------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { socket } from "../../../socket";
import "../../../App.css";
import Logo from "../../../assets/logo.jpg";
import { User } from "lucide-react";

function AdminNavbar({ darkMode }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token) return;
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user;
        setAdminName(user?.firstName || "Admin");
      } catch (err) {
        console.error("Error fetching admin:", err);
      }
    };

    fetchAdmin();

    socket.on("receive_new_user", (data) => {
      toast.info(`New user signed up: ${data.username} (${data.email})`);
    });

    return () => socket.off("receive_new_user");
  }, [token]);

  // ✅ Typing animation logic - only once per session
  useEffect(() => {
    if (!adminName) return;

    const typedAlready = sessionStorage.getItem("typedGreeting");
    const fullText = `Greetings, ${adminName}!`;

    if (typedAlready) {
      // Agar pehle se type ho chuka, directly show full text
      setDisplayedText(fullText);
      setIsTypingDone(true);
      return;
    }

    let currentText = "";
    let i = 0;

    setDisplayedText(""); // reset
    setIsTypingDone(false);

    const typingInterval = setInterval(() => {
      currentText += fullText[i];
      setDisplayedText(currentText);
      i++;

      if (i >= fullText.length) {
        clearInterval(typingInterval);
        setIsTypingDone(true);
        // mark as typed in sessionStorage
        sessionStorage.setItem("typedGreeting", "true");
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, [adminName]);

  return (
    <>
      <nav
        className={`flex justify-between items-center p-2 w-full shadow-md transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-b border-gray-600"
            : "bg-white border-b border-gray-200"
        }`}
      >
        {/* Left - Logo */}
        <div className="flex items-center ml-6">
          <img src={Logo} alt="Logo" className="h-14 w-14" />
          <h1
            className={`text-4xl font-bold ml-1 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-[#27439A]"
            }`}
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            LMS
          </h1>
          <div className="ml-30">
            <h2
              className={`text-2xl font-bold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              <span className={darkMode ? "text-white" : "text-black"}>
                {displayedText}
              </span>
              {!isTypingDone && (
                <span
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } animate-blink`}
                >
                  |
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Right - Profile Button */}
        {/* Right - Profile Button */}
        {/* <div className="flex items-center gap-3 mr-2">
          <button
            onClick={() => navigate("/admin-update-profile")}
            className="
      group relative inline-flex items-center justify-center gap-x-3 rounded-xl 
      border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 
      px-6 py-3 text-sm font-semibold text-slate-700 
      shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white 
      hover:text-blue-700 hover:shadow-[0_10px_25px_-5px_rgb(0_0_0/0.1),_0_10px_10px_-5px_rgb(0_0_0/0.04)]
      active:scale-[0.97] active:translate-y-0
      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2
      dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 dark:text-slate-200 dark:shadow-none
      dark:hover:-translate-y-0.5 dark:hover:border-blue-500 dark:hover:bg-gradient-to-br dark:hover:from-slate-700 dark:hover:to-slate-800/80
      dark:hover:text-blue-400 dark:hover:shadow-[0_10px_25px_-5px_rgb(0_0_0/0.5),_0_10px_10px_-5px_rgb(0_0_0/0.4)]
    "
          >
            <User
              size={20}
              className="text-slate-500 transition-all duration-300 group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-400"
            />
            Admin Profile
          </button>
        </div> */}
        <div className="flex items-center gap-3 mr-2">
          <button
            onClick={() => navigate("/admin-update-profile")}
            className={`
      group relative inline-flex items-center justify-center gap-x-3 rounded-xl 
      border border-gray-500
      px-6 py-3 text-sm font-semibold
      shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white 
      hover:text-blue-700 hover:shadow-[0_10px_25px_-5px_rgb(0_0_0/0.1),_0_10px_10px_-5px_rgb(0_0_0/0.04)]
      active:scale-[0.97] active:translate-y-0
      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2

      ${
        darkMode
          ? "bg-black text-white shadow-none hover:border-blue-500 hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800/80 hover:text-blue-400 hover:shadow-[0_10px_25px_-5px_rgb(0_0_0/0.5),_0_10px_10px_-5px_rgb(0_0_0/0.4)]"
          : "bg-white text-black"
      }
    `}
          >
            <User
              size={20}
              className={`transition-all duration-300 group-hover:text-blue-700 ${
                darkMode ? "text-white group-hover:text-blue-400" : "text-black"
              }`}
            />
            Admin Profile
          </button>
        </div>
      </nav>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
}

export default AdminNavbar;
