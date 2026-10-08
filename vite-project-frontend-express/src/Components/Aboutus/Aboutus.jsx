// import React from "react";
// import Navbarall from "../Navbar/Navbarall";
// import FooterAll from "../Footer/FooterAll";
// import {
//   FaBook,
//   FaLaptop,
//   FaUsers,
//   FaChalkboardTeacher,
//   FaSearch,
// } from "react-icons/fa";

// const Aboutus = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbarall />

//       <main className="flex-grow">
//         {/* ====== Hero Section ====== */}
//         <section className="py-20 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
//             About Our Library
//           </h1>
//           <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
//             Established alongside the Computer Science Department at the
//             University of Peshawar, our library is a center of knowledge,
//             research, and innovation for students and faculty.
//           </p>
//         </section>

//         {/* ====== Vision & Mission ====== */}
//         <section className="py-16 px-6 bg-white text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 relative after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:mx-auto after:mt-4">
//             Vision & Mission
//           </h2>
//           <div className="max-w-4xl mx-auto text-gray-700 space-y-4 text-left md:text-center">
//             <p>
//               <strong>Vision:</strong> To become a leading academic library
//               supporting excellence in education, research, and innovation.
//             </p>
//             <p>
//               <strong>Mission:</strong> Provide access to resources, foster a
//               culture of reading, and integrate modern technologies for students
//               and faculty.
//             </p>
//           </div>
//         </section>

//         {/* ====== Library Milestones ====== */}
//         <section className="py-16 px-6 bg-gray-50">
//           <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center relative after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:mx-auto after:mt-4">
//             Library Milestones
//           </h2>
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-600">
//                 2000
//               </h3>
//               <p>
//                 Library established with the Computer Science Department at UOP.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-600">
//                 2005
//               </h3>
//               <p>
//                 Collection expanded to research journals and digital resources.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-600">
//                 2012
//               </h3>
//               <p>
//                 Computer labs and online database access introduced for
//                 students.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-600">
//                 2020
//               </h3>
//               <p>
//                 Library modernized with e-books, digital archives, and study
//                 spaces.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ====== Our Services ====== */}
//         <section className="py-16 px-6 bg-white">
//           <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center relative after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:mx-auto after:mt-4">
//             Our Services
//           </h2>
//           <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
//             <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
//               <FaBook className="text-indigo-500 text-4xl mb-3" />
//               <h3 className="text-xl font-semibold mb-2">Book Lending</h3>
//               <p>
//                 Borrow books and research materials easily for your studies.
//               </p>
//             </div>
//             <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
//               <FaSearch className="text-purple-500 text-4xl mb-3" />
//               <h3 className="text-xl font-semibold mb-2">Research Support</h3>
//               <p>
//                 Get assistance with research, references, and academic guidance.
//               </p>
//             </div>
//             <div className="bg-pink-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
//               <FaLaptop className="text-pink-500 text-4xl mb-3" />
//               <h3 className="text-xl font-semibold mb-2">Digital Access</h3>
//               <p>
//                 Access e-books, journals, and online resources anytime,
//                 anywhere.
//               </p>
//             </div>
//             <div className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
//               <FaChalkboardTeacher className="text-indigo-500 text-4xl mb-3" />
//               <h3 className="text-xl font-semibold mb-2">
//                 Workshops & Training
//               </h3>
//               <p>
//                 Attend sessions on research, digital literacy, and library use.
//               </p>
//             </div>
//             <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
//               <FaUsers className="text-purple-500 text-4xl mb-3" />
//               <h3 className="text-xl font-semibold mb-2">Study Spaces</h3>
//               <p>
//                 Modern, quiet study areas for collaboration or solo learning.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ====== Why Choose Us ====== */}
//         <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
//           <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-10 text-center relative after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:mx-auto after:mt-4">
//             Why Choose Us
//           </h2>
//           <ul className="max-w-4xl mx-auto text-gray-700 space-y-4 list-disc list-inside text-lg md:text-xl">
//             <li>Comprehensive collection of academic books and journals.</li>
//             <li>Modern library management with digital access.</li>
//             <li>Expert staff to assist with research and study needs.</li>
//             <li>Workshops and skill development sessions.</li>
//             <li>Comfortable and collaborative study spaces.</li>
//           </ul>
//         </section>
//       </main>

//       <FooterAll />
//     </div>
//   );
// };

// export default Aboutus;

//------------------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import {
  RiMailLine,
  RiTimeLine,
  RiMapPin2Line,
  RiBook2Line,
  RiLightbulbLine,
  RiTeamLine,
  RiRocketLine,
  RiBookOpenLine,
  RiSearchEyeLine,
  RiComputerLine,
  RiUserStarLine,
  RiGroupLine,
  RiShieldCheckLine,
  RiAwardLine,
} from "react-icons/ri";
import BG from "../../assets/bg.png";
import Navbarall from "../Navbar/Navbarall.jsx";
import FooterAll from "../Footer/FooterAll.jsx";

function AboutPage({ darkMode }) {
  return (
    <>
      <div
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode
            ? "bg-slate-900/80 border-slate-700/50"
            : "bg-white/80 border-gray-200/50"
        }`}
      >
        <Navbarall darkMode={darkMode} />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG})` }}
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${darkMode ? "bg-black/80" : "bg-black/60"}`}
        ></div>

        <main className="relative z-10 flex-grow">
          <section className="py-20 px-6 text-center text-white">
            <h1
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Departmental Library
              <br />
              of Computer Science
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-200">
              Your dedicated hub for academic resources, research support, and
              collaborative learning within the Department of Computer Science.
            </p>
          </section>

          <div
            className={`px-6 py-16 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
          >
            {/* ====== Contact Details Section ====== */}
            <section className="max-w-4xl mx-auto mb-20">
              <div
                className={`p-8 rounded-2xl shadow-xl ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white"}`}
              >
                <h2 className="text-3xl font-bold text-center mb-10 text-[#1F2A4F]">
                  Get in Touch
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full ${darkMode ? "bg-[#1F2A4F]/50" : "bg-[#1F2A4F]/10"}`}
                    >
                      <RiMailLine className="text-3xl text-[#1F2A4F]" />
                    </div>
                    <p className="font-semibold">Email</p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      library.cs@uop.edu.pk
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full ${darkMode ? "bg-[#1F2A4F]/50" : "bg-[#1F2A4F]/10"}`}
                    >
                      <RiTimeLine className="text-3xl text-[#1F2A4F]" />
                    </div>
                    <p className="font-semibold">Timings</p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Mon - Fri, 8:30 AM - 4:30 PM
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full ${darkMode ? "bg-[#1F2A4F]/50" : "bg-[#1F2A4F]/10"}`}
                    >
                      <RiMapPin2Line className="text-3xl text-[#1F2A4F]" />
                    </div>
                    <p className="font-semibold">Address</p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Department of Computer Science, University of Peshawar
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ====== Vision & Mission ====== */}
            <section className="max-w-5xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1F2A4F]">
                Our Vision & Mission
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${darkMode ? "bg-slate-800" : "bg-white"}`}
                >
                  <RiLightbulbLine className="text-4xl text-[#1F2A4F] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Vision</h3>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    To be the primary information resource center for the
                    Computer Science department, empowering students and faculty
                    to achieve academic and research excellence.
                  </p>
                </div>
                <div
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${darkMode ? "bg-slate-800" : "bg-white"}`}
                >
                  <RiRocketLine className="text-4xl text-[#1F2A4F] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Mission</h3>
                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    To curate and provide seamless access to relevant
                    information resources, offer expert research assistance, and
                    maintain a state-of-the-art learning environment tailored to
                    the needs of the CS community.
                  </p>
                </div>
              </div>
            </section>

            {/* ====== Our Services ====== */}
            <section className="max-w-6xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1F2A4F]">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: RiBookOpenLine,
                    title: "Book Lending",
                    desc: "Borrow books and research materials easily.",
                  },
                  {
                    icon: RiSearchEyeLine,
                    title: "Research Support",
                    desc: "Get assistance with research and references.",
                  },
                  {
                    icon: RiComputerLine,
                    title: "Digital Access",
                    desc: "Access e-books and online resources anytime.",
                  },
                  {
                    icon: RiUserStarLine,
                    title: "Workshops & Training",
                    desc: "Attend sessions on research and digital literacy.",
                  },
                  {
                    icon: RiGroupLine,
                    title: "Study Spaces",
                    desc: "Modern, quiet areas for collaboration.",
                  },
                  {
                    icon: RiShieldCheckLine,
                    title: "Secure Environment",
                    desc: "A safe and monitored space for all users.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center ${darkMode ? "bg-slate-800" : "bg-white"}`}
                  >
                    <service.icon
                      className={`text-4xl mb-4 mx-auto ${index % 3 === 0 ? "text-[#1F2A4F]" : index % 3 === 1 ? "text-[#1F2A4F]" : "text-[#1F2A4F]"}`}
                    />
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p
                      className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ====== Why Choose Us ====== */}
            <section className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1F2A4F]">
                Why Choose Us
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "A curated collection focused on computer science and related fields.",
                  "Easy-to-use online system for searching and reserving resources.",
                  "Dedicated librarians ready to help with your research projects.",
                  "Free workshops on research skills and digital literacy.",
                  "Quiet and collaborative zones designed for focused study and group work.",
                ].map((point, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? "bg-slate-800/50" : "bg-white"}`}
                  >
                    <RiAwardLine className="text-2xl text-[#1F2A4F] flex-shrink-0 mt-1" />
                    <p
                      className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <div className="relative z-10">
          <FooterAll darkMode={darkMode} />
        </div>
      </div>
    </>
  );
}

export default AboutPage;
