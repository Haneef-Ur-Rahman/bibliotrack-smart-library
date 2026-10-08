// import { useState } from "react";
// import axios from "axios";
// import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

// // CSS as a string constant for yellow glow
// const glowStyle = `
// @keyframes yellowGlow {
//   0%, 100% {
//     box-shadow: 0 0 10px 2px rgba(253, 224, 71, 0.5), 0 0 20px 5px rgba(253, 224, 71, 0.3);
//   }
//   50% {
//     box-shadow: 0 0 20px 5px rgba(253, 224, 71, 0.9), 0 0 30px 10px rgba(253, 224, 71, 0.6);
//   }
// }
// .glowing-icon {
//   animation: yellowGlow 1.5s infinite alternate;
// }
// `;

// const ChatBot = () => {
//   const [open, setOpen] = useState(false);
//   // In your React component, add some guidance
//   const [messages, setMessages] = useState([
//     {
//       text: "Hello! I'm your library assistant. You can search for books by title, author, or subject. Try searching for 'intro' or a specific book title!",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       let url = "http://localhost:3002/api/chatbot";

//       // Agar last bot message features ke liye pooch raha tha
//       const lastBotMsg = messages[messages.length - 1];
//       if (
//         lastBotMsg?.text?.includes("Do you want to see the unique features")
//       ) {
//         url = "http://localhost:3002/api/chatbot/features";
//       }

//       const res = await axios.post(url, { message: input });

//       if (res.data.reply) {
//         const botMessage = { text: res.data.reply, sender: "bot" };
//         setMessages((prev) => [...prev, botMessage]);
//       }
//     } catch (err) {
//       console.error("Chatbot Error:", err);
//     }

//     setInput("");
//   };

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-15 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 z-50 glowing-icon"
//         >
//           <IoChatbubbleEllipsesOutline size={28} />
//         </button>
//       )}

//       {/* Chat Box */}
//       {open && (
//         <div className="fixed bottom-32 right-6 w-80 bg-white shadow-xl rounded-xl border border-gray-300 z-50 animate-fadeIn">
//           {/* Chat Header */}
//           <div className="flex justify-between items-center bg-gradient-to-r from-[#131e42] to-[#3a2e8a] text-white px-4 py-2 rounded-t-xl">
//             <h3 className="text-lg font-semibold">Library Chatbot</h3>
//             <button onClick={() => setOpen(false)}>
//               <IoClose
//                 size={26}
//                 className="hover:text-red-400 cursor-pointer"
//               />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-xl max-w-[80%] text-sm leading-tight whitespace-pre-wrap ${
//                   msg.sender === "user"
//                     ? "bg-blue-600 text-white ml-auto"
//                     : "bg-gray-200 text-gray-900"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div className="flex p-2 border-t bg-white">
//             <input
//               type="text"
//               placeholder="Ask about a book..."
//               className="flex-1 p-2 border rounded-l-lg outline-none"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Inject the glowing CSS */}
//       <style>{glowStyle}</style>

//       {/* Existing fadeIn animation */}
//       <style>
//         {`
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-in-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         `}
//       </style>
//     </>
//   );
// };

// export default ChatBot;

//----------------------------------------------

// import { useState } from "react";
// import axios from "axios";
// import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

// // CSS as a string constant for yellow glow
// const glowStyle = `
// @keyframes yellowGlow {
//   0%, 100% {
//     box-shadow: 0 0 10px 2px rgba(253, 224, 71, 0.5), 0 0 20px 5px rgba(253, 224, 71, 0.3);
//   }
//   50% {
//     box-shadow: 0 0 20px 5px rgba(253, 224, 71, 0.9), 0 0 30px 10px rgba(253, 224, 71, 0.6);
//   }
// }
// .glowing-icon {
//   animation: yellowGlow 1.5s infinite alternate;
// }
// `;

// const ChatBot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       text: "Hello! I'm your library assistant. You can search for books by title, author, or subject. Try searching for 'intro' or a specific book title!",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput(""); // Clear input immediately

//     try {
//       let url = "http://localhost:3002/api/chatbot";

//       // Check if the last bot message is asking about features
//       const lastBotMsg = messages[messages.length - 1];
//       if (
//         lastBotMsg?.sender === "bot" &&
//         (lastBotMsg.text.includes("Want to know the key features") ||
//           lastBotMsg.text.includes(
//             "Type 'yes' to see what makes this book special"
//           ) ||
//           lastBotMsg.text.includes("key features of this book") ||
//           lastBotMsg.text.includes("see the unique features"))
//       ) {
//         url = "http://localhost:3002/api/chatbot/features";
//       }

//       const res = await axios.post(url, { message: input });

//       if (res.data.reply) {
//         const botMessage = { text: res.data.reply, sender: "bot" };
//         setMessages((prev) => [...prev, botMessage]);
//       }
//     } catch (err) {
//       console.error("Chatbot Error:", err);
//       const errorMessage = {
//         text: "Sorry, I'm having trouble connecting right now. Please try again.",
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-15 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 z-50 glowing-icon"
//         >
//           <IoChatbubbleEllipsesOutline size={28} />
//         </button>
//       )}

//       {/* Chat Box */}
//       {open && (
//         <div className="fixed bottom-32 right-6 w-80 bg-white shadow-xl rounded-xl border border-gray-300 z-50 animate-fadeIn">
//           {/* Chat Header */}
//           <div className="flex justify-between items-center bg-gradient-to-r from-[#131e42] to-[#3a2e8a] text-white px-4 py-2 rounded-t-xl">
//             <h3 className="text-lg font-semibold">Library Chatbot</h3>
//             <button onClick={() => setOpen(false)}>
//               <IoClose
//                 size={26}
//                 className="hover:text-red-400 cursor-pointer"
//               />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-xl max-w-[90%] text-sm leading-tight whitespace-pre-wrap ${
//                   msg.sender === "user"
//                     ? "bg-blue-600 text-white ml-auto"
//                     : "bg-gray-900 text-white"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div className="flex p-2 border-t bg-white">
//             <input
//               type="text"
//               placeholder="Ask about a book..."
//               className="flex-1 p-2 border font-semibold rounded-l-lg outline-none text-sm text-black"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition duration-200"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Inject the glowing CSS */}
//       <style>{glowStyle}</style>

//       {/* Existing fadeIn animation */}
//       <style>
//         {`
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-in-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         `}
//       </style>
//     </>
//   );
// };

// export default ChatBot;

//--------------------------------------------------------------------------------

// import { useState } from "react";
// import axios from "axios";
// import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";

// // --- MODERN & STYLISH CYAN GLOW ANIMATION ---
// const glowStyle = `
// @keyframes cyanGlow {
//   0% {
//     box-shadow: 0 0 5px 2px rgba(34, 211, 238, 0.7), 0 0 10px 5px rgba(34, 211, 238, 0.5);
//     transform: rotate(-3deg) scale(1);
//   }
//   50% {
//     box-shadow: 0 0 20px 5px rgba(34, 211, 238, 1), 0 0 35px 10px rgba(34, 211, 238, 0.7);
//     transform: rotate(3deg) scale(1.05);
//   }
//   100% {
//     box-shadow: 0 0 5px 2px rgba(34, 211, 238, 0.7), 0 0 10px 5px rgba(34, 211, 238, 0.5);
//     transform: rotate(-3deg) scale(1);
//   }
// }
// .glowing-icon {
//   animation: cyanGlow 2s infinite ease-in-out;
// }
// `;

// const ChatBot = ({ darkMode }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       text: "Hello! I'm your Library Assistant. I can help you find books, get personalized recommendations, view book descriptions, check availability, and track your total fine. Try searching by title, author, or subject!",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       let url = "http://localhost:3002/api/chatbot";
//       const lastBotMsg = messages[messages.length - 1];
//       if (
//         lastBotMsg?.sender === "bot" &&
//         (lastBotMsg.text.includes("Want to know the key features") ||
//           lastBotMsg.text.includes(
//             "Type 'yes' to see what makes this book special",
//           ))
//       ) {
//         url = "http://localhost:3002/api/chatbot/features";
//       }

//       const res = await axios.post(url, { message: input });

//       if (res.data.reply) {
//         const botMessage = { text: res.data.reply, sender: "bot" };
//         setMessages((prev) => [...prev, botMessage]);
//       }
//     } catch (err) {
//       console.error("Chatbot Error:", err);
//       const errorMessage = {
//         text: "Sorry, I'm having trouble connecting right now. Please try again.",
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Icon with STYLISH CYAN GLOW */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           aria-label="Open chat"
//           className={`fixed bottom-15 right-4 p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 glowing-icon ${
//             darkMode
//               ? "bg-cyan-700 text-cyan-200 hover:bg-cyan-800"
//               : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
//           }`}
//         >
//           <IoChatbubbleEllipsesOutline size={28} />
//         </button>
//       )}
//       {/* Chat Box */}
//       {open && (
//         <div
//           className={`fixed bottom-6 right-6 w-96 rounded-2xl shadow-2xl border transition-all duration-300 ease-out z-50 flex flex-col max-h-[500px] ${
//             darkMode
//               ? "bg-slate-800 border-slate-700 text-white"
//               : "bg-white border-gray-200"
//           }`}
//         >
//           {/* Chat Header */}
//           <div
//             className={`flex justify-between items-center px-5 py-4 rounded-t-2xl ${
//               darkMode
//                 ? "text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] border-b border-slate-700"
//                 : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] text-white"
//             }`}
//           >
//             <h3 className="text-lg font-semibold">Library Assistant</h3>
//             <button
//               onClick={() => setOpen(false)}
//               aria-label="Close chat"
//               className={`p-1 rounded-md transition-colors ${
//                 darkMode
//                   ? "hover:bg-slate-700 text-slate-400 hover:text-white"
//                   : "hover:bg-white/20 text-white/80 hover:text-white"
//               }`}
//             >
//               <IoClose size={24} />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div
//             className={`flex-grow overflow-y-auto p-4 space-y-3 ${
//               darkMode ? "bg-slate-800" : "bg-gray-50"
//             }`}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
//                     msg.sender === "user"
//                       ? darkMode
//                         ? "bg-indigo-600 text-white"
//                         : "bg-blue-600 text-white"
//                       : darkMode
//                         ? "bg-slate-700 text-slate-200"
//                         : "bg-white text-gray-800 border border-gray-200"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input Area */}
//           <div
//             className={`flex items-center gap-2 p-4 rounded-b-2xl border-t ${
//               darkMode
//                 ? "bg-slate-900 border-slate-700"
//                 : "bg-white border-gray-200"
//             }`}
//           >
//             <input
//               type="text"
//               placeholder="Ask about a book..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className={`flex-grow px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 transition-colors ${
//                 darkMode
//                   ? "bg-slate-800 text-white placeholder-gray-400 focus:ring-indigo-500"
//                   : "bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"
//               }`}
//             />
//             <button
//               onClick={sendMessage}
//               aria-label="Send message"
//               className={`p-2 rounded-full transition-colors ${
//                 darkMode
//                   ? " text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F]"
//                   : " text-white bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F]"
//               }`}
//             >
//               <IoSend size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Inject the glowing CSS */}
//       <style>{glowStyle}</style>
//     </>
//   );
// };

// export default ChatBot;

//-----------------------------------------------------------------------

import { useState } from "react";
import axios from "axios";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";

/* ================= CYAN GLOW ANIMATION ================= */

const glowStyle = `
@keyframes cyanGlow {
  0% {
    box-shadow: 0 0 5px 2px rgba(34, 211, 238, 0.7), 0 0 10px 5px rgba(34, 211, 238, 0.5);
    transform: rotate(-3deg) scale(1);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(34, 211, 238, 1), 0 0 35px 10px rgba(34, 211, 238, 0.7);
    transform: rotate(3deg) scale(1.05);
  }
  100% {
    box-shadow: 0 0 5px 2px rgba(34, 211, 238, 0.7), 0 0 10px 5px rgba(34, 211, 238, 0.5);
    transform: rotate(-3deg) scale(1);
  }
}
.glowing-icon {
  animation: cyanGlow 2s infinite ease-in-out;
}
`;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const ChatBot = ({ darkMode }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Library Assistant. You can check your fine, issued books, reserved books, or ask for AI book recommendations.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

//-----------------------------------------------------------------------------------

        // Local Intent Check for Greetings, Timings, Contact & General Queries
    const lowerInput = userMessage.text.toLowerCase().trim();

    // 👇 Detect Salam-based greeting (Urdu/Arabic)
    const isSalam = 
      lowerInput.includes("salam") || lowerInput.includes("assalam") ||
      lowerInput.includes("asalam") || lowerInput.includes("salaam");

    // 👇 Detect English greeting
    const isEnglishGreeting = 
      lowerInput === "hi" || lowerInput === "hello" || lowerInput === "hey" ||
      lowerInput.startsWith("hi ") || lowerInput.startsWith("hello ") ||
      lowerInput.startsWith("hey ") || lowerInput.includes("good morning") ||
      lowerInput.includes("good evening") || lowerInput.includes("good afternoon");

    // 👇 Thanks Intent
    const isThanks = 
      lowerInput.includes("thank") || lowerInput.includes("thanks") || 
      lowerInput.includes("shukriya") || lowerInput.includes("shukria") ||
      lowerInput.includes("jazak");

    // 👇 Bye Intent
    const isBye = 
      lowerInput === "bye" || lowerInput.includes("goodbye") || 
      lowerInput.includes("khuda hafiz") || lowerInput.includes("khuda hafiz") ||
      lowerInput.includes("allah hafiz") || lowerInput.includes("see you");

    // 👇 Bot Identity Intent
    const isIdentity = 
      lowerInput.includes("who are you") || lowerInput.includes("what are you") ||
      lowerInput.includes("your name") || lowerInput.includes("tum kon") ||
      lowerInput.includes("tum kaun") || lowerInput.includes("kaun ho") ||
      lowerInput.includes("kon ho") || lowerInput.includes("aap kon");

    // 👇 Help Intent
    const isHelp = 
      lowerInput === "help" || lowerInput.includes("help me") || 
      lowerInput.includes("madad") || lowerInput.includes("kya kar sakte");

    // 👇 Timing Intent
    const isTiming = lowerInput.includes("timing") || lowerInput.includes("time") || 
                     lowerInput.includes("hours") || lowerInput.includes("khula") || 
                     lowerInput.includes("band") || lowerInput.includes("waqt") ||
                     lowerInput.includes("open") || lowerInput.includes("close");
                     
    // 👇 Contact Intent
    const isContact = lowerInput.includes("contact") || lowerInput.includes("phone") || 
                      lowerInput.includes("number") || lowerInput.includes("call") || 
                      lowerInput.includes("rabta") || lowerInput.includes("email");

    // 👇 Handle Salam Greeting
    if (isSalam) {
      const botMessage = {
        text: "Wa Alaikum Assalam! Welcome to BiblioTrack Library.\n\nHow may I assist you today? You can ask me about:\n• Fine details\n• Issued books\n• Reserved books\n• AI recommendations\n• Book search\n• Library timings & contact",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle English Greeting
    if (isEnglishGreeting) {
      const botMessage = {
        text: "Hello! Welcome to BiblioTrack Library.\n\nHow may I assist you today? You can ask me about:\n• Fine details\n• Issued books\n• Reserved books\n• AI recommendations\n• Book search\n• Library timings & contact",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle Thanks
    if (isThanks) {
      const botMessage = {
        text: "You're welcome! 😊 Feel free to ask if you need anything else.",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle Bye
    if (isBye) {
      const botMessage = {
        text: "Goodbye! Have a great day. 📚 Come back anytime you need library assistance.",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle Bot Identity
    if (isIdentity) {
      const botMessage = {
        text: "I am BiblioBot, the AI assistant for the BiblioTrack Smart Library Management System. I can help you with book searches, checking fines, viewing issued or reserved books, library timings, and AI-based book recommendations.",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle Help
    if (isHelp) {
      const botMessage = {
        text: "I can assist you with the following:\n\n• Fine details\n• Issued books\n• Reserved books\n• AI recommendations\n• Book search\n• Library timings & contact\n\nJust type your question and I'll help you.",
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);

      return;
    }

    // 👇 Handle Timings & Contact
    if (isTiming || isContact) {
      let replyText = "BiblioTrack Library Information:\n\n";
      if (isTiming) replyText += "⏰ Timings: 8:30 AM to 4:30 PM\n";
      if (isContact) replyText += "📞 Contact: 091-111-543\n";
      
      const botMessage = {
        text: replyText,
        sender: "bot",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 600);
      
      return;
    }
//-----------------------------------------------------------------------------------

    try {
      console.log("Token from localStorage:", localStorage.getItem("token"));

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/chatbot`,
        { message: userMessage.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handle different response types
      if (res.data.type === "recommendation" && res.data.books) {
        // Create a formatted message for book recommendations
        let bookList = "📚 Here are some books I recommend:\n\n";

        if (res.data.books.length === 0) {
          bookList = "Sorry, I couldn't find any books matching your query.";
        } else {
          res.data.books.forEach((book, index) => {
            bookList += `${index + 1}. ${book.book.title} by ${book.book.author}\n`;
          });
        }

        const botMessage = {
          text: bookList,
          sender: "bot",
          type: "recommendation",
          books: res.data.books, // Store the books data for potential future interactions
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Handle regular text responses
        const botMessage = {
          text: res.data.reply || "No response from assistant.",
          sender: "bot",
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error("Chatbot Error:", err);

      const errorMessage = {
        text: "⚠ Unable to connect to assistant. Please try again.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className={`fixed bottom-15 right-4 p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 glowing-icon ${
            darkMode
              ? "bg-cyan-700 text-cyan-200 hover:bg-cyan-800"
              : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
          }`}
        >
          <IoChatbubbleEllipsesOutline size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 w-96 rounded-2xl shadow-2xl border transition-all duration-300 z-50 flex flex-col max-h-[500px] ${
            darkMode
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div
            className={`flex justify-between items-center px-5 py-4 rounded-t-2xl ${
              darkMode
                ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] border-b border-slate-700"
                : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B]"
            } text-white`}
          >
            <h3 className="text-lg font-semibold">BiblioBot </h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1 rounded-md hover:bg-white/20"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/* Messages */}
          <div
            className={`flex-grow overflow-y-auto p-4 space-y-3 ${
              darkMode ? "bg-slate-800" : "bg-gray-50"
            }`}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : darkMode
                        ? "bg-slate-700 text-slate-200"
                        : "bg-white text-gray-800 border"
                  }`}
                >
                  {/* Render text with line breaks */}
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400">
                Assistant is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className={`flex items-center gap-2 p-4 border-t ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
              className={`flex-grow px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-slate-800 text-white focus:ring-indigo-500"
                  : "bg-gray-200 text-black focus:ring-indigo-500"
              }`}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="p-2 rounded-full bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] text-white hover:opacity-90 disabled:opacity-50"
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}

      <style>{glowStyle}</style>
    </>
  );
};

export default ChatBot;
