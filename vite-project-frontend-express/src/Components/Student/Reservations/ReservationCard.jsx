// src/Components/Student/Reservations/ReservationCard.jsx

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ReservationCard = ({ reservation, onCancel }) => {
  const { book, status, reservationDate } = reservation;

  const formattedDate = new Date(reservationDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
    },
  );

  return (
    <li className="group relative block w-full h-full">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out">
        {/* Book Cover Image */}
        <img
          src={book.image || "/path/to/placeholder-image.png"}
          alt={`Cover of the book "${book.title}"`}
          className="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay & Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

          <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-serif text-2xl font-bold text-white mb-1 leading-tight line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm font-light text-gray-300 mb-4">
              by {book.author}
            </p>

            <div className="flex items-center justify-between text-xs">
              <span
                className={`px-3 py-1 rounded-full font-medium tracking-wider uppercase ${
                  status === "active"
                    ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50"
                    : "bg-gray-500/30 text-gray-300 border border-gray-400/50"
                }`}
              >
                {status}
              </span>
              <span className="text-gray-400">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Cancel Button - Ghost Style */}
        <button
          onClick={() => onCancel(reservation._id, book.title)}
          aria-label={`Cancel reservation for ${book.title}`}
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full
                     border border-white/30 text-white opacity-0 group-hover:opacity-100
                     backdrop-blur-sm transition-all duration-300
                     hover:bg-white hover:text-gray-900 hover:scale-110"
        >
          <AiOutlineClose size={18} />
        </button>
      </div>
    </li>
  );
};

// THIS IS THE IMPORTANT LINE
export default ReservationCard;
