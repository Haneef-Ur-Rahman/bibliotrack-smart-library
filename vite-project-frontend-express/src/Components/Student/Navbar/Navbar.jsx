// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { socket } from "./socket";
// import { socket } from "../../../socket";
// // import "./App.css";
// import "../../../App.css";
// // import Logo from "./assets/logo.jpg";
// import Logo from "../../../assets/logo.jpg";
// function Navbar() {
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
//       <nav className="bg-white text-white flex justify-between items-center p-1 w-[98%]">
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

//         <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//           <button
//             onClick={() => navigate("/update-profile")}
//             // className=" border-4 border-blue-600 rounded-[50px] h-12 w-12 text-2xl"
//             className="border-4 border-blue-600 rounded-[10px]  h-15 w-33 text-xl font-bold cursor-pointer transition duration-200 bg-black text-white"
//             style={{
//               backgroundColor: "white", // bg-black
//               color: "white",
//               fontWeight: "bold",
//               cursor: "pointer",
//               transition: "background-color 0.2s",
//             }}
//             // onMouseOver={(e) => (e.target.style.backgroundColor = "#1f2937")} // hover:bg-gray-800
//             // onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#1f2937")} // hover:bg-gray-800
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
//           >
//             Student{" "}
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

// export default Navbar;

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

// function Navbar({ darkMode }) {
//   const navigate = useNavigate();
//   const [studentName, setStudentName] = useState("");
//   const [displayedText, setDisplayedText] = useState("");
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStudent = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get("http://localhost:3002/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const user = res.data.user;
//         setStudentName(user?.firstName || "Student");
//       } catch (err) {
//         console.error("Error fetching student:", err);
//       }
//     };

//     fetchStudent();

//     socket.on("receive_new_user", (data) => {
//       toast.info(`New user signed up: ${data.username} (${data.email})`);
//     });

//     return () => socket.off("receive_new_user");
//   }, [token]);

//   // Typing animation
//   useEffect(() => {
//     if (!studentName) return;

//     const fullText = `Greetings, ${studentName}!`;
//     let currentText = "";
//     let i = 0;

//     setDisplayedText("");
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
//   }, [studentName]);

//   return (
//     <>
//       {/* <nav className="bg-white flex justify-between items-center p-2 w-full shadow-md"> */}
//       <nav
//         className={`flex justify-between items-center p-2 w-full shadow-md transition-colors duration-300 ${
//           darkMode
//             ? "bg-slate-900 text-white border-b border-slate-700"
//             : "bg-white text-black"
//         }`}
//       >
//         {/* Left - Logo + Greeting */}
//         <div className="flex items-center ml-6">
//           <img src={Logo} alt="Logo" className="h-14 w-14" />

//           <h1
//             className="text-[#27439A] dark:text-blue-600 text-4xl font-bold ml-1"
//             style={{ fontFamily: '"Playfair Display", serif' }}
//           >
//             LMS
//           </h1>

//           <div className="ml-24">
//             <h2 className="text-2xl font-bold text-black dark:text-white">
//               <span className="text-[#27439A] dark:text-blue-600">
//                 {displayedText}
//               </span>
//               {!isTypingDone && (
//                 <span className="animate-blink text-black dark:text-white">
//                   |
//                 </span>
//               )}
//             </h2>
//           </div>
//         </div>

//         {/* Right - Profile Button */}
//         <div className="flex items-center gap-3 mr-2">
//           <button
//             onClick={() => navigate("/update-profile")}
//             className="border-4 border-[#27439A] rounded-[10px]  h-14 w-30 text-xl font-bold cursor-pointer transition duration-200 bg-white hover:bg-gray-600 hover:text-white"
//           >
//             <span className="text-black flex items-center justify-center gap-1">
//               <span>Student </span>
//               <span>
//                 <User size={25} color="#6B7280" />
//               </span>
//             </span>
//           </button>
//         </div>
//       </nav>

//       <ToastContainer position="top-center" autoClose={2000} />
//     </>
//   );
// }

// export default Navbar;

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

function Navbar({ darkMode }) {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudent = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:3002/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user;
        setStudentName(user?.firstName || "Student");
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();

    socket.on("receive_new_user", (data) => {
      toast.info(`New user signed up: ${data.username} (${data.email})`);
    });

    return () => socket.off("receive_new_user");
  }, [token]);

  // Typing animation - only run once per session
  useEffect(() => {
    if (!studentName) return;

    const typedAlready = sessionStorage.getItem("typedGreeting");
    const fullText = `Greetings, ${studentName}!`;

    if (typedAlready) {
      // Agar pehle se type ho chuka, directly show full text
      setDisplayedText(fullText);
      setIsTypingDone(true);
      return;
    }

    let currentText = "";
    let i = 0;

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
  }, [studentName]);

  return (
    <>
      <nav
        className={`flex justify-between items-center p-2 w-full shadow-md transition-colors duration-300 ${
          darkMode
            ? "bg-slate-900 text-white border-b border-slate-700"
            : "bg-white text-black border-b border-slate-200"
        }`}
      >
        <div className="flex items-center ml-6">
          <img src={Logo} alt="Logo" className="h-14 w-14" />

          <h1
            className="text-[#27439A] dark:text-blue-600 text-4xl font-bold ml-1"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            LMS
          </h1>

          <div className="ml-24">
            <h2
              className="text-2xl font-bold"
              style={{ color: darkMode ? "white" : "black" }}
            >
              <span style={{ color: darkMode ? "white" : "black" }}>
                {displayedText}
              </span>
              {!isTypingDone && (
                <span
                  className="animate-blink"
                  style={{ color: darkMode ? "white" : "black" }}
                >
                  |
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* <button
          onClick={() => navigate("/update-profile")}
          className="
    group relative inline-flex items-center justify-center gap-x-2.5 rounded-xl 
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
          Student Profile
        </button> */}
        <button
          onClick={() => navigate("/update-profile")}
          className={`
    group relative inline-flex items-center justify-center gap-x-2.5 rounded-xl 
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
          Student Profile
        </button>
      </nav>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Navbar;
