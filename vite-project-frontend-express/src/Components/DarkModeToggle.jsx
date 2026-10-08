import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 shadow-xl border-2`}
      style={{
        // Dynamic background and border based on darkMode
        background: darkMode
          ? "#1e293b" // A modern dark slate
          : "linear-gradient(135deg, #fbbf24, #f59e0b)", // A vibrant yellow gradient
        borderColor: darkMode ? "#475569" : "#d97706",
        boxShadow: darkMode
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" // Dark shadow
          : "0 10px 25px -5px rgba(251, 191, 36, 0.5), 0 10px 10px -5px rgba(251, 191, 36, 0.04)", // Yellow shadow
      }}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
    >
      {/* Icon container with rotation animation */}
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: darkMode ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        {/* Icon with gradient background */}
        <div
          className="p-3 rounded-full flex items-center justify-center"
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #fbbf24, #f59e0b)" // Yellow gradient in dark mode
              : "linear-gradient(135deg, #1e293b, #334155)", // Dark gradient in light mode
            color: darkMode ? "#1e293b" : "#fbbf24", // Inverted text color for contrast
          }}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;
