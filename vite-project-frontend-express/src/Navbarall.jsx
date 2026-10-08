import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.jpg";

function Navbarall() {
  return (
    // <div className="flex items-center justify-between px-6 py-2 shadow-md bg-gray-300 border-gradient-to-b from-[#1F2A4F] to-[#4A427B]">
    // <div className="flex items-center justify-between px-6 py-2 shadow-md bg-gradient-to-r from-[#2e227b] to-[#131e42] rounded-b-1xl">
    <div className="flex items-center justify-between px-6 py-2 shadow-md bg-transparent relative z-10">
      {/* Left side (Logo + LMS text) */}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-16 w-16 border-2 border-blue-600 rounded-[20px]"
        />
        <h1
          className="text-white text-3xl font-bold"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          LMS
        </h1>
      </div>

      {/* Right side (Navigation Links as Buttons) */}
      <nav className="flex gap-4">
        <Link
          to="/"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Home
        </Link>

        <Link
          to="/contactus"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Contact Us
        </Link>

        <Link
          to="/aboutus"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          About Us
        </Link>
      </nav>
    </div>
  );
}

export default Navbarall;
