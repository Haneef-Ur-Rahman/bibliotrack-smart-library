// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbarall from "../Navbar/Navbarall";
// import FooterAll from "../Footer/FooterAll";
// import {
//   AiOutlineEnvironment,
//   AiOutlineMail,
//   AiOutlinePhone,
//   AiOutlineClockCircle,
// } from "react-icons/ai";

// const Contactus = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, subject, message } = formData;

//     if (!name || !email || !subject || !message) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     // TODO: Connect to backend API here
//     setTimeout(() => {
//       toast.success("Message sent successfully!");
//       setLoading(false);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     }, 1000);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <Navbarall />

//       <main className="flex-grow py-12 px-4 md:px-10 lg:px-20">
//         <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
//           Contact Our Library
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* ================== CONTACT FORM ================== */}
//           <div className="lg:w-1/2 bg-white p-8 rounded-3xl shadow-2xl">
//             <h2 className="text-3xl font-semibold mb-6 text-indigo-700">
//               Send Us a Message
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 required
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full border p-3 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 rows="5"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold transition"
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>

//           {/* ================== CONTACT INFORMATION ================== */}
//           <div className="lg:w-1/2 bg-gradient-to-br from-indigo-50 via-indigo-100 to-white rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
//             <h2 className="text-3xl font-bold text-indigo-700 mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Have questions, feedback, or need support? Reach out to us via any
//               of the methods below.
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
//                 <AiOutlineEnvironment className="text-indigo-500 text-2xl" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Address</p>
//                   <p className="text-gray-500 text-sm">
//                     123 Library Street, City
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
//                 <AiOutlineMail className="text-indigo-500 text-2xl" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Email</p>
//                   <p className="text-gray-500 text-sm">info@librarylms.com</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
//                 <AiOutlinePhone className="text-indigo-500 text-2xl" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Phone</p>
//                   <p className="text-gray-500 text-sm">+123 456 7890</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
//                 <AiOutlineClockCircle className="text-indigo-500 text-2xl" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Working Hours</p>
//                   <p className="text-gray-500 text-sm">Mon - Fri, 9am - 6pm</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <FooterAll />
//       <ToastContainer />
//     </div>
//   );
// };

// export default Contactus;

//-------------------------------------------------------------------------

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   AiOutlineEnvironment,
//   AiOutlineMail,
//   AiOutlinePhone,
//   AiOutlineClockCircle,
// } from "react-icons/ai";
// import BG from "../../assets/bg.png"; // Assuming you use the same background
// import Navbarall from "../Navbar/Navbarall";
// import FooterAll from "../Footer/FooterAll";

// const Contactus = ({ darkMode }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, subject, message } = formData;

//     if (!name || !email || !subject || !message) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     // TODO: Connect to backend API here
//     setTimeout(() => {
//       toast.success("Message sent successfully!");
//       setLoading(false);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     }, 1000);
//   };

//   return (
//     <>
//       {/* Navbar Outside the main background container */}
//       <div
//         className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
//           darkMode
//             ? "bg-slate-900/80 border-slate-700/50"
//             : "bg-white/80 border-gray-200/50"
//         }`}
//       >
//         <Navbarall darkMode={darkMode} />
//       </div>

//       {/* Main Page Content with Background */}
//       <div className="relative min-h-screen flex flex-col">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${BG})` }}
//         />
//         <div
//           className={`absolute inset-0 transition-colors duration-300 ${darkMode ? "bg-black/80" : "bg-black/60"}`}
//         ></div>

//         <main className="relative z-10 flex-grow py-12 px-6">
//           {/* Hero Section */}
//           <section className="text-center text-white mb-16">
//             <h1
//               className="text-4xl md:text-6xl font-extrabold mb-4"
//               style={{ fontFamily: '"Playfair Display", serif' }}
//             >
//               Contact Our Library
//             </h1>
//             <p className="max-w-2xl mx-auto text-lg text-gray-200">
//               Have questions or need assistance? Reach out to us, and we'll be
//               happy to help.
//             </p>
//           </section>

//           {/* Form and Info Section */}
//           <div
//             className={`max-w-6xl mx-auto p-8 rounded-3xl shadow-2xl ${darkMode ? "bg-slate-800" : "bg-white"}`}
//           >
//             <div className="flex flex-col lg:flex-row gap-12">
//               {/* ================== CONTACT FORM ================== */}
//               <div className="lg:w-1/2">
//                 <h2
//                   className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
//                 >
//                   Send Us a Message
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* Name Input */}
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
//                         darkMode
//                           ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
//                           : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
//                       }`}
//                       placeholder="Your Name"
//                       required
//                     />
//                     <label
//                       htmlFor="name"
//                       className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
//                         darkMode
//                           ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
//                           : "text-gray-500 peer-focus:text-indigo-500 bg-white"
//                       }`}
//                     >
//                       Your Name
//                     </label>
//                   </div>

//                   {/* Email Input */}
//                   <div className="relative">
//                     <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
//                         darkMode
//                           ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
//                           : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
//                       }`}
//                       placeholder="Your Email"
//                       required
//                     />
//                     <label
//                       htmlFor="email"
//                       className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
//                         darkMode
//                           ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
//                           : "text-gray-500 peer-focus:text-indigo-500 bg-white"
//                       }`}
//                     >
//                       Your Email
//                     </label>
//                   </div>

//                   {/* Subject Input */}
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="subject"
//                       id="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
//                         darkMode
//                           ? "border-slate-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
//                           : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
//                       }`}
//                       placeholder="Subject"
//                       required
//                     />
//                     <label
//                       htmlFor="subject"
//                       className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
//                         darkMode
//                           ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
//                           : "text-gray-500 peer-focus:text-indigo-500 bg-white"
//                       }`}
//                     >
//                       Subject
//                     </label>
//                   </div>

//                   {/* Message Textarea */}
//                   <div className="relative">
//                     <textarea
//                       name="message"
//                       id="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all resize-none`}
//                       placeholder="Your Message"
//                       rows="5"
//                       required
//                     ></textarea>
//                     <label
//                       htmlFor="message"
//                       className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
//                         darkMode
//                           ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
//                           : "text-gray-500 peer-focus:text-indigo-500 bg-white"
//                       }`}
//                     >
//                       Your Message
//                     </label>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Sending..." : "Send Message"}
//                   </button>
//                 </form>
//               </div>

//               {/* ================== CONTACT INFORMATION ================== */}
//               <div className="lg:w-1/2 flex flex-col justify-center">
//                 <h2
//                   className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
//                 >
//                   Get in Touch
//                 </h2>
//                 <p
//                   className={`mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                 >
//                   Feel free to reach out to us through the following channels:
//                 </p>

//                 <div className="space-y-6">
//                   {/* --- ADDED: BORDER TO THE CONTACT CARDS --- */}
//                   <div
//                     className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${
//                       darkMode
//                         ? "bg-slate-700/50 hover:bg-slate-700 border-slate-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                     }`}
//                   >
//                     <AiOutlineEnvironment className="text-indigo-500 text-2xl flex-shrink-0 mt-1" />
//                     <div>
//                       <p
//                         className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
//                       >
//                         Address
//                       </p>
//                       <p
//                         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                       >
//                         Department of Computer Science, University of Peshawar
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${
//                       darkMode
//                         ? "bg-slate-700/50 hover:bg-slate-700 border-slate-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                     }`}
//                   >
//                     <AiOutlineMail className="text-indigo-500 text-2xl flex-shrink-0 mt-1" />
//                     <div>
//                       <p
//                         className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
//                       >
//                         Email
//                       </p>
//                       <p
//                         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                       >
//                         library.cs@uop.edu.pk
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${
//                       darkMode
//                         ? "bg-slate-700/50 hover:bg-slate-700 border-slate-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                     }`}
//                   >
//                     <AiOutlinePhone className="text-indigo-500 text-2xl flex-shrink-0 mt-1" />
//                     <div>
//                       <p
//                         className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
//                       >
//                         Phone
//                       </p>
//                       <p
//                         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                       >
//                         +92 123 456 7890
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${
//                       darkMode
//                         ? "bg-slate-700/50 hover:bg-slate-700 border-slate-600"
//                         : "bg-gray-50 hover:bg-gray-100 border-gray-200"
//                     }`}
//                   >
//                     <AiOutlineClockCircle className="text-indigo-500 text-2xl flex-shrink-0 mt-1" />
//                     <div>
//                       <p
//                         className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
//                       >
//                         Working Hours
//                       </p>
//                       <p
//                         className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
//                       >
//                         Mon - Fri, 8:30 AM - 4:30 PM
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         <div className="relative z-10">
//           <FooterAll darkMode={darkMode} />
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </>
//   );
// };

// export default Contactus;

//-------------------------------------------------------------------------

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineEnvironment,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineClockCircle,
} from "react-icons/ai";
import BG from "../../assets/bg.png";
import Navbarall from "../Navbar/Navbarall";
import FooterAll from "../Footer/FooterAll";

const Contactus = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode
            ? "bg-slate-900/80 border-slate-700/50"
            : "bg-white/80 border-gray-200/50"
        }`}
      >
        <Navbarall darkMode={darkMode} />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG})` }}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${darkMode ? "bg-black/80" : "bg-black/60"}`}
        ></div>

        <main className="relative z-10 flex-grow py-12 px-6">
          {/* Hero Section */}
          <section className="text-center text-white mb-16">
            <h1
              className="text-4xl md:text-6xl font-extrabold mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Contact Our Library
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              We're here to help. Send us a message and we'll respond as soon as
              possible.
            </p>
          </section>

          {/* Form and Info Section with SOLID Backgrounds for Visibility */}
          <div
            className={`max-w-6xl mx-auto p-8 md:p-12 rounded-3xl shadow-2xl ${darkMode ? "bg-slate-800" : "bg-white"}`}
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* ================== CONTACT FORM ================== */}
              <div className="lg:w-1/2">
                <h2
                  className={`text-3xl font-bold mb-8  ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:border-indigo-400 focus:ring-indigo-400/50"
                          : "border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/50"
                      }`}
                      placeholder="Your Name"
                      required
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                      }`}
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:border-indigo-400 focus:ring-indigo-400/50"
                          : "border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/50"
                      }`}
                      placeholder="Your Email"
                      required
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                      }`}
                    >
                      Your Email
                    </label>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "border-slate-600 text-white focus:border-indigo-400 focus:ring-indigo-400/50"
                          : "border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/50"
                      }`}
                      placeholder="Subject"
                      required
                    />
                    <label
                      htmlFor="subject"
                      className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                      }`}
                    >
                      Subject
                    </label>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`peer w-full px-4 py-3 bg-transparent border rounded-lg text-sm placeholder-transparent focus:outline-none focus:ring-2 transition-all resize-none ${
                        darkMode
                          ? "border-slate-600 text-white focus:border-indigo-400 focus:ring-indigo-400/50"
                          : "border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500/50"
                      }`}
                      placeholder="Your Message"
                      rows="5"
                      required
                    ></textarea>
                    <label
                      htmlFor="message"
                      className={`absolute left-4 -top-2.5 px-1 text-xs bg-inherit transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs ${
                        darkMode
                          ? "text-gray-400 peer-focus:text-indigo-400 bg-slate-800"
                          : "text-gray-500 peer-focus:text-indigo-500 bg-white"
                      }`}
                    >
                      Your Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* ================== CONTACT INFORMATION ================== */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <h2
                  className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  Get in Touch
                </h2>
                <p
                  className={`mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Feel free to reach out to us through the following channels:
                </p>

                <div className="space-y-6">
                  {/* --- CHANGES: SOLID BACKGROUND, BRIGHT BORDER, AND PROPER TEXT COLORS --- */}
                  <div
                    className={`flex items-start gap-4 p-5 rounded-2xl transition-all border-2 ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 border-[#1F2A4F]" // Bright border for dark mode
                        : "bg-gray-50 hover:bg-gray-100 border-[#1F2A4F]" // Bright border for light mode
                    }`}
                  >
                    <AiOutlineEnvironment className="text-2xl text-[#1F2A4F] flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Address
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {" "}
                        {/* Lighter text for better readability */}
                        Department of Computer Science, University of Peshawar
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 p-5 rounded-2xl transition-all border-2 ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 border-[#1F2A4F]"
                        : "bg-gray-50 hover:bg-gray-100 border-[#1F2A4F]"
                    }`}
                  >
                    <AiOutlineMail className="text-2xl text-[#1F2A4F] flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Email
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        library.cs@uop.edu.pk
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 p-5 rounded-2xl transition-all border-2 ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 border-[#1F2A4F]"
                        : "bg-gray-50 hover:bg-gray-100 border-[#1F2A4F]"
                    }`}
                  >
                    <AiOutlinePhone className="text-2xl text-[#1F2A4F] flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Phone
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        +92 123 456 7890
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 p-5 rounded-2xl transition-all border-2 ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600 border-[#1F2A4F]"
                        : "bg-gray-50 hover:bg-gray-100 border-[#1F2A4F]"
                    }`}
                  >
                    <AiOutlineClockCircle className="text-2xl text-[#1F2A4F] flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Working Hours
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Mon - Fri, 8:30 AM - 4:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="relative z-10">
          <FooterAll darkMode={darkMode} />
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
};

export default Contactus;
