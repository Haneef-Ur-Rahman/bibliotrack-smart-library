// src/components/Reservations/Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700"
            : "bg-white text-gray-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 shadow hover:shadow-md hover:-translate-y-0.5 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700"
            : "bg-white text-gray-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-800 dark:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
