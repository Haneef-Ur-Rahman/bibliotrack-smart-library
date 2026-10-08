// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
// import LeftSidebar from "../Sidebar/LeftSidebar";
// import FooterAll from "../../Footer/FooterAll";
// import { FaBook } from "react-icons/fa";

// export default function DigitalLibrary({ darkMode }) {
//   //----------------------------------------------------------
//   const folders = [
//     { id: "1gsf0XF-JUmmhzijIac6P81xQAWlhqZtx", name: "أولى" },
//     { id: "19MV3hD1UkXoGPbIoQegf4p8OpTej8BnQ", name: "ثانية" },
//     { id: "10RlT-_9i5ePApVXA6han_5Led0D9IxQB", name: "ثالثة" },
//     { id: "13BVi1j1SYawQ124vw4Lf6DbKd90njait", name: "رابعة" },
//     { id: "1gl57kJ_MP_osyh1vdiS_QckW-NEWB4Ak", name: "خامسة" },
//     { id: "1HxsReAibmx9sxltFdH5NtFwN7CQfP9yj", name: "سادسة" },
//     { id: "1JMNuVB8CzDB36s6IUtnf9WrmuuN_imem", name: "سابعة" },
//     { id: "1pq-9XOl2NMenyzIlEV3K3HpZoOrb9yze", name: "دورہؑ حدیث" },
//   ];

//   const [currentFolder, setCurrentFolder] = useState(0);
//   const [iframeSrc, setIframeSrc] = useState("");

//   useEffect(() => {
//     setIframeSrc(
//       `https://drive.google.com/embeddedfolderview?id=${folders[0].id}#list`,
//     );
//   }, []);

//   const handleFolderClick = (index) => {
//     setCurrentFolder(index);
//     setIframeSrc(
//       `https://drive.google.com/embeddedfolderview?id=${folders[index].id}#list`,
//     );
//   };
//   //----------------------------------------------------------

//   return (
//     <>
//       <Navbar />

//       <div className="flex">
//         <LeftSidebar />

//         <div
//           className={`flex-1 p-6 min-h-screen ${
//             darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
//           }`}
//         >
//           {/* Heading */}
//           <div
//             className={`relative overflow-hidden rounded-2xl shadow-xl mb-8 ${
//               darkMode
//                 ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
//                 : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"
//             }`}
//           >
//             {/* Decorative Background Element */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>

//             <div className="relative p-8">
//               <div className="flex items-center justify-center mb-6">
//                 <div
//                   className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
//                     darkMode
//                       ? "bg-indigo-500/20 text-indigo-400"
//                       : "bg-indigo-100 text-indigo-600"
//                   }`}
//                 >
//                   <svg
//                     className="w-8 h-8"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <h1
//                 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
//                   darkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Academic Resource Repository
//               </h1>

//               <p
//                 className={`text-center text-lg max-w-3xl mx-auto ${
//                   darkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Explore a structured collection of academic PDFs designed to
//                 enhance digital learning. Access materials effortlessly without
//                 relying on physical library resources. Click a folder below to
//                 begin.
//               </p>
//             </div>
//           </div>

//           {/* Folder Buttons Row */}
//           <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
//             {folders.map((folder, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleFolderClick(index)}
//                 className={`group relative flex items-center justify-center gap-3 font-semibold rounded-2xl text-lg h-25 px-5 min-w-[160px] max-w-[200px] flex-1 transition-all duration-300 overflow-hidden ${
//                   currentFolder === index
//                     ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl transform -translate-y-1"
//                     : darkMode
//                       ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
//                       : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
//                 }`}
//               >
//                 {/* Background decoration */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                 {/* Icon Container */}
//                 <div
//                   className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                     currentFolder === index
//                       ? "bg-white/20 shadow-lg"
//                       : darkMode
//                         ? "bg-slate-700/50 group-hover:bg-slate-600/50"
//                         : "bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200"
//                   }`}
//                 >
//                   <svg
//                     className={`w-6 h-6 transition-all duration-300 ${
//                       currentFolder === index
//                         ? "text-white scale-110"
//                         : darkMode
//                           ? "text-indigo-400 group-hover:text-indigo-300"
//                           : "text-indigo-600 group-hover:text-indigo-700"
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
//                     />
//                   </svg>
//                 </div>

//                 {/* Folder Name */}
//                 <span className="font-medium truncate">{folder.name}</span>

//                 {/* Active Indicator */}
//                 {currentFolder === index && (
//                   <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full shadow-lg"></div>
//                 )}
//               </button>
//             ))}
//           </div>
//           {/* Iframe Card */}
//           <div className="bg-white border-2 border-[#1F2A4F] rounded-xl shadow-md overflow-hidden">
//             {iframeSrc ? (
//               <iframe
//                 src={iframeSrc}
//                 width="100%"
//                 height="580px"
//                 frameBorder="0" // Already 0
//                 className="rounded-xl shadow-md"
//                 title="Digital Library"
//               />
//             ) : (
//               <div
//                 className={`p-6 text-center ${
//                   darkMode ? "text-gray-300" : "text-gray-500"
//                 }`}
//               >
//                 Loading folder...
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <FooterAll />
//     </>
//   );
// }

//----------------------------------------------------------

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../Navbar/Navbar";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FooterAll from "../../Footer/FooterAll";

/**
 * Academic Resource Repository Component
 * Displays educational resources organized by grade level
 */
export default function DigitalLibrary({ darkMode }) {
  // Configuration for academic resource folders
  // const folders = [
  //   {
  //     id: "1gsf0XF-JUmmhzijIac6P81xQAWlhqZtx",
  //     name: "أولى",
  //     category: "primary",
  //   },
  //   {
  //     id: "19MV3hD1UkXoGPbIoQegf4p8OpTej8BnQ",
  //     name: "ثانية",
  //     category: "primary",
  //   },
  //   {
  //     id: "10RlT-_9i5ePApVXA6han_5Led0D9IxQB",
  //     name: "ثالثة",
  //     category: "primary",
  //   },
  //   {
  //     id: "13BVi1j1SYawQ124vw4Lf6DbKd90njait",
  //     name: "رابعة",
  //     category: "elementary",
  //   },
  //   {
  //     id: "1gl57kJ_MP_osyh1vdiS_QckW-NEWB4Ak",
  //     name: "خامسة",
  //     category: "elementary",
  //   },
  //   {
  //     id: "1HxsReAibmx9sxltFdH5NtFwN7CQfP9yj",
  //     name: "سادسة",
  //     category: "middle",
  //   },
  //   {
  //     id: "1JMNuVB8CzDB36s6IUtnf9WrmuuN_imem",
  //     name: "سابعة",
  //     category: "middle",
  //   },
  //   {
  //     id: "1pq-9XOl2NMenyzIlEV3K3HpZoOrb9yze",
  //     name: "دورہؑ حدیث",
  //     category: "research",
  //   },
  // ];
  // Memoize Folders array to prevent unnecessary re-renders
  const Folders = useMemo(
    () => [
      {
        id: "1ibgct5Ab_9_VMKH-nA7cjSDTgMIMpZ6r",
        name: "Artificial Intelligence",
        category: "ai",
      },
      {
        id: "12hO1mM2U8i6pXan2VfraTyPsO80euBWQ",
        name: "Cyber Security",
        category: "cybersecurity",
      },
      {
        id: "1wpLw3fvOyIQJIpnslUPWBgiZQnQy-Hc0",
        name: "Data Science",
        category: "datascience",
      },
      {
        id: "1-o52TmQLjTPKJbR7whl0jvxvOLmag6yn",
        name: "Software Engineering",
        category: "softwareengineering",
      },
      {
        id: "1-XjrtOWJ3hR2SdP3sXN_D8WpK91MOSAL",
        name: "Machine Learning",
        category: "machinelearning",
      },
    ],
    [],
  );

  // State management
  const [currentFolder, setCurrentFolder] = useState(0);
  const [iframeSrc, setIframeSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate Google Drive embed URL for a folder
   * @param {string} folderId - The Google Drive folder ID
   * @returns {string} The complete embed URL
   */
  const generateEmbedUrl = useCallback((folderId) => {
    return `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  }, []);

  /**
   * Handle folder selection and iframe update
   * @param {number} index - Index of the selected folder
   */
  const handleFolderClick = useCallback(
    (index) => {
      try {
        // Validate index
        if (index < 0 || index >= Folders.length) {
          throw new Error(`Invalid folder index: ${index}`);
        }

        // Set loading state
        setIsLoading(true);
        setError(null);

        // Update current folder
        setCurrentFolder(index);

        // Generate and set iframe source
        const newSrc = generateEmbedUrl(Folders[index].id);
        setIframeSrc(newSrc);
      } catch (err) {
        console.error("Error loading folder:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [generateEmbedUrl],
  );

  /**
   * Reset to the first folder
   */
  const resetToFirstFolder = useCallback(() => {
    handleFolderClick(0);
  }, [handleFolderClick]);

  // Initialize with first folder
  useEffect(() => {
    if (Folders.length > 0 && !iframeSrc) {
      setIframeSrc(generateEmbedUrl(Folders[0].id));
    }
  }, [iframeSrc, generateEmbedUrl]);

  return (
    <>
      <Navbar darkMode={darkMode} />

      <div className="flex">
        <LeftSidebar darkMode={darkMode} />

        {/* Main Content */}
        <div
          className={`flex-1 p-3 min-h-screen ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900  "
          }`}
        >
          <div className="px-8 py-1">
            {/* Folder Buttons Row */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-4 mt-2">
              {Folders.map((folder, index) => (
                <button
                  key={index}
                  onClick={() => handleFolderClick(index)}
                  className={`group relative flex items-center justify-between gap-2 font-semibold rounded-2xl text-lg h-20 px-5 min-w-[150px] max-w-[180px] flex-1 transition-all duration-300 overflow-hidden ${
                    currentFolder === index
                      ? "bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white shadow-xl transform -translate-y-1"
                      : darkMode
                        ? "bg-gradient-to-br from-slate-800 to-slate-900 text-gray-300 hover:from-slate-700 hover:to-slate-800 border border-slate-600 hover:border-slate-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:from-indigo-50 hover:to-purple-50 border border-gray-300 hover:border-indigo-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Folder Name */}
                  <span className=" break-words text-center">
                    {folder.name}
                  </span>
                  {/* Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-xl flex  items-center justify-center transition-all duration-300 ${
                      currentFolder === index
                        ? "bg-white shadow-lg"
                        : darkMode
                          ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                          : "bg-gradient-to-br from-indigo-100 to-purple-100 border-gray-300 group-hover:from-indigo-200  group-hover:to-purple-200"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 transition-all duration-300 ${
                        currentFolder === index
                          ? "text-[#2F3563] scale-110"
                          : darkMode
                            ? "text-indigo-400 group-hover:text-indigo-300"
                            : "text-indigo-600 group-hover:text-indigo-700"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Active Indicator */}
                  {currentFolder === index && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full shadow-lg"></div>
                  )}
                </button>
              ))}
            </div>

            {/* PDF Viewer Card */}
            <div
              className={`relative overflow-hidden rounded-2xl shadow-xl ${
                darkMode
                  ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                  : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
              }`}
            >
              {/* Header Section */}
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode
                    ? "border-slate-700 bg-slate-800/50"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      darkMode
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {Folders[currentFolder].name} Folder
                    </h3>
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {isLoading ? "Loading..." : "Digital Library Resources"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(iframeSrc, "_blank")}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-400 hover:text-white hover:bg-slate-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Open in new tab"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={resetToFirstFolder}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "text-gray-400 hover:text-white hover:bg-slate-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                    title="Reset to first folder"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              {/* <div className="relative" style={{ height: "580px" }}> */}
              <div
                className={`relative ${darkMode ? "bg-slate-200" : "bg-white"}`}
                style={{ height: "580px" }}
              >
                {iframeSrc ? (
                  <div className="absolute inset-0">
                    <iframe
                      src={iframeSrc}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="w-full h-full"
                      title={`${Folders[currentFolder].name} - Digital Library`}
                    />

                    {/* Loading Overlay */}
                    <div
                      className={`absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center transition-opacity duration-300 ${
                        isLoading
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        <p
                          className={`mt-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Loading folder content...
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`h-full flex flex-col items-center justify-center p-8 ${
                      darkMode ? "bg-slate-800/50" : "bg-gray-50/50"
                    }`}
                  >
                    <div
                      className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 ${
                        darkMode ? "bg-slate-700" : "bg-gray-200"
                      }`}
                    >
                      <svg
                        className={`w-12 h-12 ${darkMode ? "text-slate-500" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {error ? "Error Loading Folder" : "No Document Selected"}
                    </h3>
                    <p
                      className={`text-center max-w-md ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {error
                        ? error.message
                        : "Select a folder from the options above to view its documents."}
                    </p>
                    {error && (
                      <button
                        onClick={resetToFirstFolder}
                        className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          darkMode
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterAll />
    </>
  );
}
