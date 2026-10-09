// // src/components/AddBooks.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AddBooks = () => {
//   const [books, setBooks] = useState([
//     {
//       title: "",
//       author: "",
//       edition: "",
//       category: "",
//       totalCopies: 1,
//       image: null,
//     },
//   ]);
//   const token = localStorage.getItem("token");

//   const handleChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const newBooks = [...books];
//     if (name === "image") newBooks[index].image = files[0];
//     else newBooks[index][name] = value;
//     setBooks(newBooks);
//   };

//   const addRow = () =>
//     setBooks([
//       ...books,
//       {
//         title: "",
//         author: "",
//         edition: "",
//         category: "",
//         totalCopies: 1,
//         image: null,
//       },
//     ]);
//   const removeRow = (i) => setBooks(books.filter((_, idx) => idx !== i));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       const booksPayload = Array.isArray(books)
//         ? books.map((book) => {
//             if (book && typeof book === "object") {
//               const { image: _image, ...rest } = book;
//               return rest;
//             }
//             return {};
//           })
//         : [];

//       formData.append("books", JSON.stringify(booksPayload));
//       books.forEach((b) => formData.append("images", b.image));

//       const res = await axios.post(
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res.data.message || "Books added");
//       setBooks([
//         {
//           title: "",
//           author: "",
//           edition: "",
//           category: "",
//           totalCopies: 1,
//           image: null,
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Upload failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Add Multiple Books</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {books.map((b, idx) => (
//           <div key={idx} className="p-4 border rounded">
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 name="title"
//                 required
//                 value={b.title}
//                 onChange={(e) => handleChange(idx, e)}
//                 placeholder="Title"
//                 className="p-2 border rounded"
//               />
//               <input
//                 name="author"
//                 required
//                 value={b.author}
//                 onChange={(e) => handleChange(idx, e)}
//                 placeholder="Author"
//                 className="p-2 border rounded"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               <input
//                 name="edition"
//                 value={b.edition}
//                 onChange={(e) => handleChange(idx, e)}
//                 placeholder="Edition"
//                 className="p-2 border rounded"
//               />
//               <input
//                 name="category"
//                 value={b.category}
//                 onChange={(e) => handleChange(idx, e)}
//                 placeholder="Category"
//                 className="p-2 border rounded"
//               />
//             </div>
//             <div className="flex gap-2 mt-2 items-center">
//               <input
//                 name="totalCopies"
//                 type="number"
//                 min="1"
//                 value={b.totalCopies}
//                 onChange={(e) => handleChange(idx, e)}
//                 placeholder="Copies"
//                 className="p-2 border rounded w-28"
//               />
//               <input
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleChange(idx, e)}
//                 className="p-2"
//                 required
//               />
//               {books.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeRow(idx)}
//                   className="text-red-600"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={addRow}
//             className="px-4 py-2 bg-gray-200 rounded"
//           >
//             + Add Another
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-700 text-white rounded"
//           >
//             Upload Books
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBooks;

//----------------------------------------------------------------

// src/components/AddBooks.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AddBooks = () => {
//   const [books, setBooks] = useState([
//     {
//       bookId: "",
//       isbn: "",
//       category: "",
//       title: "",
//       edition: "",
//       author: "",
//       language: "",
//       publisherName: "",
//       totalQuantity: "",
//       availableQuantity: "",
//       image: null,
//     },
//   ]);
//   const token = localStorage.getItem("token");

//   const handleChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updatedBooks = [...books];
//     if (name === "image") updatedBooks[index].image = files[0];
//     else updatedBooks[index][name] = value;
//     setBooks(updatedBooks);
//   };

//   const addRow = () =>
//     setBooks([
//       ...books,
//       {
//         bookId: "",
//         isbn: "",
//         category: "",
//         title: "",
//         edition: "",
//         author: "",
//         language: "",
//         publisherName: "",
//         totalQuantity: "",
//         availableQuantity: "",
//         image: null,
//       },
//     ]);

//   const removeRow = (index) =>
//     setBooks(books.filter((_, idx) => idx !== index));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       const payload = books.map((book) => {
//         const { image, ...rest } = book;
//         return rest;
//       });

//       formData.append("books", JSON.stringify(payload));
//       books.forEach((book) => formData.append("images", book.image));

//       const res = await axios.post(
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res.data.message || "Books added successfully!");
//       setBooks([
//         {
//           bookId: "",
//           isbn: "",
//           category: "",
//           title: "",
//           edition: "",
//           author: "",
//           language: "",
//           publisherName: "",
//           totalQuantity: "",
//           availableQuantity: "",
//           image: null,
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Upload failed!");
//     }
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
//         📚 Add Books
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {books.map((book, index) => (
//           <div
//             key={index}
//             className="border border-gray-300 rounded-lg p-6 bg-gray-50 shadow-sm"
//           >
//             <div className="flex flex-col gap-3">
//               {/* Book Image Upload */}
//               <div>
//                 <label className="block font-semibold mb-1 text-gray-700">
//                   Upload Book Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={(e) => handleChange(index, e)}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               </div>

//               {/* Book Fields */}
//               {[
//                 ["bookId", "Book ID"],
//                 ["isbn", "Book ISBN"],
//                 ["category", "Category"],
//                 ["title", "Title"],
//                 ["edition", "Edition"],
//                 ["author", "Author"],
//                 ["language", "Language"],
//                 ["publisherName", "Publisher Name"],
//                 ["totalQuantity", "Total Quantity"],
//                 ["availableQuantity", "Available Quantity"],
//               ].map(([name, placeholder]) => (
//                 <input
//                   key={name}
//                   type={
//                     name === "totalQuantity" || name === "availableQuantity"
//                       ? "number"
//                       : "text"
//                   }
//                   name={name}
//                   value={book[name]}
//                   onChange={(e) => handleChange(index, e)}
//                   placeholder={placeholder}
//                   className="w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               ))}

//               {/* Remove Button */}
//               {books.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeRow(index)}
//                   className="text-red-600 mt-2 font-medium hover:text-red-800 self-end"
//                 >
//                   ❌ Remove This Book
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-between items-center">
//           <button
//             type="button"
//             onClick={addRow}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
//           >
//             + Add Another
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 font-semibold"
//           >
//             Upload Books
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBooks;

//----------------------------------------------------------------

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AddBooks = ({ darkMode }) => {
  const [books, setBooks] = useState([
    {
      bookId: "",
      isbn: "",
      category: "",
      title: "",
      edition: "",
      author: "",
      language: "",
      publisherName: "",
      totalQuantity: "",
      availableQuantity: "",
      image: null,
    },
  ]);
  const token = localStorage.getItem("token");

  // const handleChange = (index, e) => {
  //   const { name, value, files } = e.target;
  //   const updatedBooks = [...books];
  //   if (name === "image") updatedBooks[index].image = files[0];
  //   else updatedBooks[index][name] = value;
  //   setBooks(updatedBooks);
  // };
  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedBooks = [...books];
    if (name === "images")
      updatedBooks[index].image = files[0]; // ✅ match new field name
    else updatedBooks[index][name] = value;
    setBooks(updatedBooks);
  };

  const addRow = () =>
    setBooks([
      ...books,
      {
        bookId: "",
        isbn: "",
        category: "",
        title: "",
        edition: "",
        author: "",
        language: "",
        publisherName: "",
        totalQuantity: "",
        availableQuantity: "",
        image: null,
      },
    ]);

  const removeRow = (index) =>
    setBooks(books.filter((_, idx) => idx !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const payload = books.map((book) => {
        const { image, ...rest } = book;
        return rest;
      });

      formData.append("books", JSON.stringify(payload));
      books.forEach((book) => formData.append("images", book.image));

     const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/books/add-multiple`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  },
);

      toast.success(res.data.message || "Books added successfully!");
      setBooks([
        {
          bookId: "",
          isbn: "",
          category: "",
          title: "",
          edition: "",
          author: "",
          language: "",
          publisherName: "",
          totalQuantity: "",
          availableQuantity: "",
          image: null,
        },
      ]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload failed!");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Run all book uploads in parallel
  //     await Promise.all(
  //       books.map(async (book) => {
  //         const formData = new FormData();
  //         Object.entries(book).forEach(([key, value]) => {
  //           if (key === "image")
  //             formData.append("images", imageFile); // ✅ correct
  //           else formData.append(key, value);
  //         });

  //         await axios.post(
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //       })
  //     );

  //     toast.success("All books added successfully!");
  //     setBooks([
  //       {
  //         bookId: "",
  //         isbn: "",
  //         category: "",
  //         title: "",
  //         edition: "",
  //         author: "",
  //         language: "",
  //         publisherName: "",
  //         totalQuantity: "",
  //         availableQuantity: "",
  //         image: null,
  //       },
  //     ]);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(
  //       err.response?.data?.message || "Some books failed to upload!"
  //     );
  //   }
  // };

  const categories = [
    "Networking",
    "Web Development",
    "Algorithms",
    "Software Engineering",
    "Calculus",
    "Data Science",
    "Cybersecurity",
    "Operating Systems",
    "Artificial Intelligence",
    "Database Systems",
  ];

  return (
    <div
      className={`max-w-4xl mx-auto ${darkMode ? "bg-slate-900" : "bg-white"} shadow-2xl rounded-2xl overflow-hidden`}
    >
      <form onSubmit={handleSubmit} className="p-8">
        {books.map((book, index) => (
          <div
            key={index}
            className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-slate-500/50 border border-slate-700" : "bg-gray-50 border border-gray-400"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-lg font-bold  ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Book # {index + 1}
              </h3>
              {books.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className={`p-2 rounded-lg bg-gray-200  transition-colors ${darkMode ? "hover:bg-gray-400 text-red-500" : "hover:bg-gray-400 text-red-500"}`}
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 Columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Primary Information */}
                <div>
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}
                  >
                    Primary Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Enter book title"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Enter author name"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div>
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}
                  >
                    Book Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Book ID
                      </label>

                      <input
                        type="text"
                        name="bookId"
                        value={book.bookId}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Enter Book ID"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        ISBN
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        value={book.isbn}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="ISBN number"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Edition
                      </label>
                      <input
                        type="text"
                        name="edition"
                        value={book.edition}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Edition"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Language
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={book.language}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Language"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Publication Details */}
                <div>
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}
                  >
                    Publication Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisherName"
                        value={book.publisherName}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Publisher name"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Category
                      </label>
                      <select
                        name="category"
                        value={book.category}
                        onChange={(e) => handleChange(index, e)}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Inventory Details */}
                <div>
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}
                  >
                    Inventory
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Total Quantity
                      </label>
                      <input
                        type="number"
                        name="totalQuantity"
                        value={book.totalQuantity}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Total quantity"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Available Quantity
                      </label>
                      <input
                        type="number"
                        name="availableQuantity"
                        value={book.availableQuantity}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Available quantity"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          darkMode
                            ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Book ID - Hidden but required */}
                <input
                  type="hidden"
                  name="bookId"
                  value={book.bookId}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              {/* Image Upload - 1 Column */}
              <div className="lg:col-span-1">
                <h4
                  className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}
                >
                  Book Cover
                </h4>
                <div className="relative">
                  <div
                    className={`w-full h-64 rounded-xl overflow-hidden border-2 border-dashed ${darkMode ? "border-slate-600 bg-slate-800/50" : "border-gray-300 bg-gray-50"} flex flex-col items-center justify-center transition-colors hover:border-indigo-500 group`}
                  >
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      onChange={(e) => handleChange(index, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />

                    <div
                      className={`p-4 text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <svg
                        className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"} group-hover:text-indigo-500 transition-colors`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm font-medium">Click to upload</p>
                      <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {book.images && book.images.length > 0 && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(book.images[0])}
                        alt="Book cover preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
          <button
            type="button"
            onClick={addRow}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
              darkMode
                ? "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700"
                : "bg-gray-100 text-black hover:bg-gray-300 border border-gray-600"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Another Book
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-medium bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Upload Books
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooks;
