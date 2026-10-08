// // // src/components/BookList.jsx
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const BookList = () => {
// //   const [books, setBooks] = useState([]);
// //   const token = localStorage.getItem("token");

// //   const fetchBooks = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:3002/api/books");
// //       setBooks(res.data.books || []);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to load books");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const handleIssue = async (bookId) => {
// //     try {
// //       const res = await axios.post(
// //         `http://localhost:3002/api/books/issue/${bookId}`,
// //         {},
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       toast.success(res.data.message);
// //       fetchBooks();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || "Failed to issue/reserve");
// //     }
// //   };

// //   // For return, you should pass the issuedId — here it's simplified: call endpoint separately
// //   const HandleReturn = async (issuedId) => {
// //     try {
// //       const res = await axios.post(
// //         `http://localhost:3002/api/books/return/${issuedId}`,
// //         {},
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       toast.success(res.data.message);
// //       fetchBooks();
// //     } catch (err) {
// //       console.error(err);
// //       toast.error(err.response?.data?.message || "Failed to return");
// //     }
// //   };

// //   return (

// //   );
// // };

// // export default BookList;

// //----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [editRow, setEditRow] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:3002/api/books");
//       setBooks(res.data.books);
//     } catch (err) {
//       console.error("Error fetching books:", err);
//     }
//   };

//   const handleEditClick = (book) => {
//     setEditRow(book._id);
//     setEditData(book);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleSave = async (id) => {
//     try {
//       setLoading(true);
//       await axios.put(`http://localhost:3002/api/books/${id}`, editData);
//       setEditRow(null);
//       fetchBooks();
//       alert("Book updated successfully");
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Error updating book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       await axios.delete(`http://localhost:3002/api/books/${id}`);
//       fetchBooks();
//       alert("Book deleted successfully");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Error deleting book");
//     }
//   };

//   const toggleDetails = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold text-center text-indigo-700 underline underline-offset-4 decoration-4 decoration-indigo-700 mb-6">
//         📖 Book List
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">Book ID</th>
//               <th className="py-3 px-4 text-left">ISBN</th>
//               <th className="py-3 px-4 text-left">Title</th>
//               <th className="py-3 px-4 text-left">Author</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {books.map((book) => (
//               <React.Fragment key={book._id}>
//                 <tr
//                   className={`border-b hover:bg-indigo-50 ${
//                     editRow === book._id ? "bg-yellow-100" : ""
//                   }`}
//                 >
//                   <td className="py-2 px-4">{book._id}</td>
//                   <td className="py-2 px-4">{book.isbn || "—"}</td>
//                   <td className="py-2 px-4">
//                     {editRow === book._id ? (
//                       <input
//                         type="text"
//                         name="title"
//                         value={editData.title}
//                         onChange={handleEditChange}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       book.title
//                     )}
//                   </td>
//                   <td className="py-2 px-4">
//                     {editRow === book._id ? (
//                       <input
//                         type="text"
//                         name="author"
//                         value={editData.author}
//                         onChange={handleEditChange}
//                         className="border p-1 rounded w-full"
//                       />
//                     ) : (
//                       book.author
//                     )}
//                   </td>
//                   <td className="py-2 px-4 text-center space-x-2">
//                     {editRow === book._id ? (
//                       <>
//                         <button
//                           onClick={() => handleSave(book._id)}
//                           disabled={loading}
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         >
//                           {loading ? "Saving..." : "Save"}
//                         </button>
//                         <button
//                           onClick={() => setEditRow(null)}
//                           className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleEditClick(book)}
//                           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book._id)}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Delete
//                         </button>
//                         <button
//                           onClick={() => toggleDetails(book._id)}
//                           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                         >
//                           {expandedRow === book._id ? "Hide" : "Show"} Details
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>

//                 {expandedRow === book._id && (
//                   <tr>
//                     <td colSpan="5" className="bg-gray-100 p-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p>
//                             <strong>Title:</strong> {book.title}
//                           </p>
//                           <p>
//                             <strong>Author:</strong> {book.author}
//                           </p>
//                           <p>
//                             <strong>Edition:</strong> {book.edition || "N/A"}
//                           </p>
//                           <p>
//                             <strong>Category:</strong> {book.category || "N/A"}
//                           </p>
//                           <p>
//                             <strong>Total Copies:</strong> {book.totalCopies}
//                           </p>
//                           <p>
//                             <strong>Available Copies:</strong>{" "}
//                             {book.availableCopies}
//                           </p>
//                         </div>
//                         <div className="flex justify-center items-center">
//                           {book.image ? (
//                             <img
//                               src={book.image}
//                               alt={book.title}
//                               className="w-40 h-40 object-cover rounded-lg shadow-md"
//                             />
//                           ) : (
//                             <p>No image available</p>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookList;

//----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [editMode, setEditMode] = useState(null);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const response = await axios.get("http://localhost:3002/api/books");
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this book?")) {
//       await axios.delete(`http://localhost:3002/api/books/${id}`);
//       fetchBooks();
//     }
//   };

//   const handleEdit = (bookId) => {
//     setEditMode(bookId);
//     setSelectedBook(null);
//   };

//   const handleShowDetails = (book) => {
//     setSelectedBook(selectedBook?.bookId === book.bookId ? null : book);
//     setEditMode(null);
//   };

//   const handleSave = async (book) => {
//     try {
//       await axios.put(`http://localhost:3002/api/books/${book._id}`, book);
//       setEditMode(null);
//       fetchBooks();
//     } catch (error) {
//       console.error("Error updating book:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">📚 Book List</h2>
//       <table className="min-w-full border border-gray-300 text-sm text-left">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Book ID</th>
//             <th className="p-2 border">ISBN</th>
//             <th className="p-2 border">Title</th>
//             <th className="p-2 border">Author</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book) => (
//             <React.Fragment key={book._id}>
//               <tr
//                 className={`border ${
//                   selectedBook?.bookId === book.bookId
//                     ? "bg-blue-50"
//                     : editMode === book.bookId
//                     ? "bg-yellow-50"
//                     : ""
//                 }`}
//               >
//                 <td className="p-2 border">{book.bookId}</td>
//                 <td className="p-2 border">{book.ISBN}</td>
//                 <td className="p-2 border">
//                   {editMode === book.bookId ? (
//                     <input
//                       type="text"
//                       value={book.title}
//                       onChange={(e) =>
//                         setBooks((prev) =>
//                           prev.map((b) =>
//                             b._id === book._id
//                               ? { ...b, title: e.target.value }
//                               : b
//                           )
//                         )
//                       }
//                       className="border p-1 w-full"
//                     />
//                   ) : (
//                     book.title
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   {editMode === book.bookId ? (
//                     <input
//                       type="text"
//                       value={book.author}
//                       onChange={(e) =>
//                         setBooks((prev) =>
//                           prev.map((b) =>
//                             b._id === book._id
//                               ? { ...b, author: e.target.value }
//                               : b
//                           )
//                         )
//                       }
//                       className="border p-1 w-full"
//                     />
//                   ) : (
//                     book.author
//                   )}
//                 </td>
//                 <td className="p-2 border space-x-2">
//                   {editMode === book.bookId ? (
//                     <Button
//                       size="sm"
//                       onClick={() => handleSave(book)}
//                       className="bg-green-500 text-white"
//                     >
//                       Save
//                     </Button>
//                   ) : (
//                     <Button
//                       size="sm"
//                       onClick={() => handleEdit(book.bookId)}
//                       className="bg-yellow-500 text-white"
//                     >
//                       Edit
//                     </Button>
//                   )}
//                   <Button
//                     size="sm"
//                     onClick={() => handleDelete(book._id)}
//                     className="bg-red-500 text-white"
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleShowDetails(book)}
//                     className="bg-blue-500 text-white"
//                   >
//                     {selectedBook?.bookId === book.bookId
//                       ? "Hide"
//                       : "Show Details"}
//                   </Button>
//                 </td>
//               </tr>

//               {selectedBook?.bookId === book.bookId && (
//                 <tr className="bg-gray-50 border">
//                   <td colSpan="5" className="p-4">
//                     <div className="flex gap-6 items-start">
//                       {book.imageUrl && (
//                         <img
//                           src={book.imageUrl}
//                           alt={book.title}
//                           className="w-32 h-40 rounded shadow"
//                         />
//                       )}
//                       <div>
//                         <p>
//                           <strong>Category:</strong> {book.category || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Publisher:</strong> {book.publisher || "N/A"}
//                         </p>
//                         <p>
//                           <strong>Publication Date:</strong>{" "}
//                           {book.publicationDate
//                             ? new Date(book.publicationDate).toDateString()
//                             : "N/A"}
//                         </p>
//                         <p>
//                           <strong>Price:</strong> Rs. {book.price || "N/A"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookList;

//----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [editBookId, setEditBookId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3002/api/books", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBooks(res.data.books || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch books!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/books/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Book deleted successfully!");
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete book!");
//     }
//   };

//   const handleEdit = (bookId) => {
//     setEditBookId(bookId === editBookId ? null : bookId);
//   };

//   const handleShowDetails = (book) => {
//     setSelectedBook(selectedBook?.bookId === book.bookId ? null : book);
//   };

//   const handleSave = async (updatedBook) => {
//     try {
//       await axios.put(
//         `http://localhost:3002/api/books/update/${updatedBook._id}`,
//         updatedBook,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Book updated successfully!");
//       setEditBookId(null);
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed!");
//     }
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 underline decoration-4 decoration-indigo-700">
//         📖 Book List
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading books...</p>
//       ) : books.length === 0 ? (
//         <p className="text-center text-gray-600">No books found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-800">
//               <th className="py-2 px-4 border-b">Book ID</th>
//               <th className="py-2 px-4 border-b">ISBN</th>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Author</th>
//               <th className="py-2 px-4 border-b text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <React.Fragment key={book._id}>
//                 <tr
//                   className={`hover:bg-gray-50 ${
//                     editBookId === book.bookId
//                       ? "bg-yellow-50"
//                       : selectedBook?.bookId === book.bookId
//                       ? "bg-indigo-50"
//                       : ""
//                   }`}
//                 >
//                   <td className="py-2 px-4 border-b">{book.bookId}</td>
//                   <td className="py-2 px-4 border-b">{book.isbn}</td>
//                   <td className="py-2 px-4 border-b">{book.title}</td>
//                   <td className="py-2 px-4 border-b">{book.author}</td>
//                   <td className="py-2 px-4 border-b text-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(book.bookId)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       {editBookId === book.bookId ? "Cancel" : "Edit"}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(book._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleShowDetails(book)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       {selectedBook?.bookId === book.bookId
//                         ? "Hide"
//                         : "Show Details"}
//                     </button>
//                   </td>
//                 </tr>

//                 {selectedBook?.bookId === book.bookId && (
//                   <tr className="bg-gray-50">
//                     <td colSpan="5" className="p-4 border-t">
//                       <div className="grid grid-cols-2 gap-3 text-sm">
//                         <p>
//                           <strong>Edition:</strong> {book.edition}
//                         </p>
//                         <p>
//                           <strong>Language:</strong> {book.language}
//                         </p>
//                         <p>
//                           <strong>Publisher:</strong> {book.publisherName}
//                         </p>
//                         <p>
//                           <strong>Category:</strong> {book.category}
//                         </p>
//                         <p>
//                           <strong>Total Quantity:</strong> {book.totalQuantity}
//                         </p>
//                         <p>
//                           <strong>Available:</strong> {book.availableQuantity}
//                         </p>
//                         {book.image && (
//                           <div className="col-span-2 text-center mt-3">
//                             <img
//                               src={book.image}
//                               alt={book.title}
//                               className="w-40 h-48 object-cover mx-auto rounded-md shadow"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookList;

//----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [editBook, setEditBook] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBooks();
//   }, []);
//-----------------------------------------------------------------------------
// const fetchBooks = async () => {
//   try {
//     setLoading(true);
//     const res = await axios.get("http://localhost:3002/api/books", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setBooks(res.data.books || []);
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to fetch books!");
//   } finally {
//     setLoading(false);
//   }
// };
//-----------------------------------------------------------------------------
//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3002/api/books", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.books) {
//         // ✅ Sort books by Book ID (ascending)
//         const sortedBooks = [...res.data.books].sort((a, b) => {
//           // Convert to numbers if bookId is stored as string
//           return Number(a.bookId) - Number(b.bookId);
//         });

//         setBooks(sortedBooks);
//       } else {
//         setBooks([]);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch books!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3002/api/books/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Book deleted successfully!");
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete book!");
//     }
//   };

//   const handleEdit = (book) => {
//     setEditBook(editBook?._id === book._id ? null : { ...book });
//   };

//   const handleShowDetails = (book) => {
//     setSelectedBook(selectedBook?._id === book._id ? null : book);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditBook((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3002/api/books/update/${editBook._id}`,
//         editBook,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Book updated successfully!");
//       setEditBook(null);
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed!");
//     }
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 underline decoration-4 decoration-indigo-700">
//         📖 Book List
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading books...</p>
//       ) : books.length === 0 ? (
//         <p className="text-center text-gray-600">No books found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-800">
//               <th className="py-2 px-4 border-b">Book ID</th>
//               <th className="py-2 px-4 border-b">ISBN</th>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Author</th>
//               <th className="py-2 px-4 border-b text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <React.Fragment key={book._id}>
//                 <tr
//                   className={`hover:bg-gray-50 ${
//                     selectedBook?._id === book._id ? "bg-indigo-50" : ""
//                   }`}
//                 >
//                   <td className="py-2 px-4 border-b">{book.bookId}</td>
//                   <td className="py-2 px-4 border-b">{book.isbn}</td>
//                   <td className="py-2 px-4 border-b">{book.title}</td>
//                   <td className="py-2 px-4 border-b">{book.author}</td>
//                   <td className="py-2 px-4 border-b text-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(book)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       {editBook?._id === book._id ? "Cancel" : "Edit"}
//                     </button>
//                     <button
//                       onClick={() => handleDelete(book._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleShowDetails(book)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     >
//                       {selectedBook?._id === book._id ? "Hide" : "Show Details"}
//                     </button>
//                   </td>
//                 </tr>

//                 {/* ✅ Book Details Section */}
//                 {selectedBook?._id === book._id && (
//                   <tr className="bg-gray-50">
//                     <td colSpan="5" className="p-4 border-t">
//                       <div className="flex flex-col md:flex-row gap-6 items-start">
//                         {/* Book Image */}
//                         {book.image && (
//                           <div className="flex-shrink-0">
//                             <img
//                               src={book.image}
//                               alt={book.title}
//                               className="w-40 h-48 object-cover rounded-md shadow"
//                             />
//                           </div>
//                         )}

//                         {/* Book Info */}
//                         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                           <p>
//                             <strong>Book ID:</strong> {book.bookId}
//                           </p>
//                           <p>
//                             <strong>ISBN:</strong> {book.isbn}
//                           </p>
//                           <p>
//                             <strong>Title:</strong> {book.title}
//                           </p>
//                           <p>
//                             <strong>Author:</strong> {book.author}
//                           </p>
//                           <p>
//                             <strong>Edition:</strong> {book.edition}
//                           </p>
//                           <p>
//                             <strong>Language:</strong> {book.language}
//                           </p>
//                           <p>
//                             <strong>Publisher:</strong> {book.publisherName}
//                           </p>
//                           <p>
//                             <strong>Category:</strong> {book.category}
//                           </p>
//                           <p>
//                             <strong>Total Quantity:</strong> {book.totalCopies}
//                           </p>
//                           <p>
//                             <strong>Available:</strong> {book.availableCopies}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {/* ✅ Editable Form (Full like AddBook) */}
//                 {editBook?._id === book._id && (
//                   <tr className="bg-yellow-50">
//                     <td colSpan="5" className="p-4 border-t">
//                       <div className="grid grid-cols-2 gap-4">
//                         <input
//                           type="text"
//                           name="bookId"
//                           value={editBook.bookId}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Book ID"
//                         />
//                         <input
//                           type="text"
//                           name="isbn"
//                           value={editBook.isbn}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="ISBN"
//                         />
//                         <input
//                           type="text"
//                           name="title"
//                           value={editBook.title}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Title"
//                         />
//                         <input
//                           type="text"
//                           name="author"
//                           value={editBook.author}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Author"
//                         />
//                         <input
//                           type="text"
//                           name="edition"
//                           value={editBook.edition}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Edition"
//                         />
//                         <input
//                           type="text"
//                           name="language"
//                           value={editBook.language}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Language"
//                         />
//                         <input
//                           type="text"
//                           name="publisherName"
//                           value={editBook.publisherName}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Publisher Name"
//                         />
//                         <input
//                           type="text"
//                           name="category"
//                           value={editBook.category}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Category"
//                         />
//                         <input
//                           type="number"
//                           name="totalCopies"
//                           value={editBook.totalCopies}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Total Copies"
//                         />
//                         <input
//                           type="number"
//                           name="availableCopies"
//                           value={editBook.availableCopies}
//                           onChange={handleInputChange}
//                           className="border p-2 rounded"
//                           placeholder="Available Copies"
//                         />
//                       </div>
//                       <div className="text-right mt-4">
//                         <button
//                           onClick={handleSave}
//                           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                         >
//                           💾 Save Changes
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookList;

//----------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [editBook, setEditBook] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 5;

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3002/api/books", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.books) {
//         // ✅ Sort by Book ID (ascending)
//         const sortedBooks = [...res.data.books].sort(
//           (a, b) => Number(a.bookId) - Number(b.bookId)
//         );
//         setBooks(sortedBooks);
//       } else {
//         setBooks([]);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch books!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3002/api/books/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Book deleted successfully!");
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete book!");
//     }
//   };

//   const handleEdit = (book) => {
//     setEditBook(editBook?._id === book._id ? null : { ...book });
//   };

//   const handleShowDetails = (book) => {
//     setSelectedBook(selectedBook?._id === book._id ? null : book);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditBook((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3002/api/books/update/${editBook._id}`,
//         editBook,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Book updated successfully!");
//       setEditBook(null);
//       fetchBooks();
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed!");
//     }
//   };

//   // ✅ Pagination logic
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(books.length / booksPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="p-4 max-w-9xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center text-dark ">
//         Book List
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading books...</p>
//       ) : books.length === 0 ? (
//         <p className="text-center text-gray-600">No books found.</p>
//       ) : (
//         <>
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-indigo-100 text-indigo-800">
//                 <th className="py-2 px-4 border-b">Book ID</th>
//                 <th className="py-2 px-4 border-b">ISBN</th>
//                 <th className="py-2 px-4 border-b">Title</th>
//                 <th className="py-2 px-4 border-b">Author</th>
//                 <th className="py-2 px-4 border-b text-center">Actions</th>
//               </tr>
//             </thead>
//             {/* <tbody>
//               {currentBooks.map((book) => (
//                 <React.Fragment key={book._id}>
//                   <tr
//                     className={`hover:bg-gray-50 ${
//                       selectedBook?._id === book._id ? "bg-indigo-50" : ""
//                     }`}
//                   >
//                     <td className="py-2 px-4 border-b">{book.bookId}</td>
//                     <td className="py-2 px-4 border-b">{book.isbn}</td>
//                     <td className="py-2 px-4 border-b">{book.title}</td>
//                     <td className="py-2 px-4 border-b">{book.author}</td>
//                     <td className="py-2 px-4 border-b text-center space-x-2">
//                       <button
//                         onClick={() => handleEdit(book)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         {editBook?._id === book._id ? "Cancel" : "Edit"}
//                       </button>
//                       <button
//                         onClick={() => handleDelete(book._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>

//                       <button
//                         onClick={() => handleShowDetails(book)}
//                         className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center justify-center gap-1"
//                         title={
//                           selectedBook?._id === book._id
//                             ? "Hide Details"
//                             : "Show Details"
//                         }
//                       >
//                         {selectedBook?._id === book._id ? (
//                           <>
//                             <AiOutlineEye size={18} /> Hide Detials
//                           </>
//                         ) : (
//                           <>👁️ Show Details</>
//                         )}
//                       </button>
//                     </td>
//                   </tr>

//                   {/* ✅ Details Section
//                   {selectedBook?._id === book._id && (
//                     <tr className="bg-gray-50">
//                       <td colSpan="5" className="p-4 border-t">
//                         <div className="flex flex-col md:flex-row gap-6 items-start">
//                           {book.image && (
//                             <div className="flex-shrink-0">
//                               <img
//                                 src={book.image}
//                                 alt={book.title}
//                                 className="w-40 h-48 object-cover rounded-md shadow"
//                               />
//                             </div>
//                           )}
//                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm leading-relaxed">
//                             <p>
//                               <strong>Book ID:</strong> {book.bookId}
//                             </p>
//                             <p>
//                               <strong>ISBN:</strong> {book.isbn}
//                             </p>
//                             <p>
//                               <strong>Edition:</strong> {book.edition}
//                             </p>
//                             <p>
//                               <strong>Language:</strong> {book.language}
//                             </p>
//                             <p>
//                               <strong>Publisher:</strong> {book.publisherName}
//                             </p>
//                             <p>
//                               <strong>Category:</strong> {book.category}
//                             </p>
//                             <p>
//                               <strong>Total Quantity:</strong>{" "}
//                               {book.totalCopies}
//                             </p>
//                             <p>
//                               <strong>Available:</strong> {book.availableCopies}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody> */}
//             <tbody>
//               {currentBooks.map((book) => (
//                 <React.Fragment key={book._id}>
//                   {/* ✅ Normal Row */}
//                   {editBook?._id !== book._id ? (
//                     <tr
//                       className={`hover:bg-gray-50 ${
//                         selectedBook?._id === book._id ? "bg-indigo-50" : ""
//                       }`}
//                     >
//                       <td className="py-2 px-4 border-b">{book.bookId}</td>
//                       <td className="py-2 px-4 border-b">{book.isbn}</td>
//                       <td className="py-2 px-4 border-b">{book.title}</td>
//                       <td className="py-2 px-4 border-b">{book.author}</td>
//                       <td className="py-2 px-2 border-b text-center">
//                         <div className="flex justify-center items-center space-x-2">
//                           {/* Edit Button */}
//                           <button
//                             onClick={() => handleEdit(book)}
//                             className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
//                           >
//                             <AiOutlineEdit size={18} />
//                           </button>

//                           {/* Delete Button */}
//                           <button
//                             onClick={() => handleDelete(book._id)}
//                             className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
//                           >
//                             <AiOutlineDelete size={18} />
//                           </button>

//                           {/* Show Details Button */}
//                           <button
//                             onClick={() => handleShowDetails(book)}
//                             className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
//                           >
//                             <AiOutlineEye size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     /* ✅ Edit Mode Row */
//                     <tr className="bg-yellow-50 border-b border-gray-300">
//                       <td colSpan="5" className="p-4 border-t">
//                         <div className="flex flex-col md:flex-row gap-6 items-start">
//                           {editBook.image && (
//                             <div className="flex-shrink-0">
//                               <img
//                                 src={editBook.image}
//                                 alt={editBook.title}
//                                 className="mt-7 w-45 h-60 object-cover rounded-md shadow border-5 border-indigo-700"
//                               />
//                             </div>
//                           )}

//                           <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                             <div>
//                               <label className="block font-semibold">
//                                 Book ID
//                               </label>
//                               <input
//                                 type="text"
//                                 name="bookId"
//                                 value={editBook.bookId}
//                                 onChange={handleInputChange}
//                                 disabled
//                                 className="border rounded px-2 py-1 w-full bg-gray-100"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 ISBN
//                               </label>
//                               <input
//                                 type="text"
//                                 name="isbn"
//                                 value={editBook.isbn}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Title
//                               </label>
//                               <input
//                                 type="text"
//                                 name="title"
//                                 value={editBook.title}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Author
//                               </label>
//                               <input
//                                 type="text"
//                                 name="author"
//                                 value={editBook.author}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Edition
//                               </label>
//                               <input
//                                 type="text"
//                                 name="edition"
//                                 value={editBook.edition}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Language
//                               </label>
//                               <input
//                                 type="text"
//                                 name="language"
//                                 value={editBook.language}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Publisher
//                               </label>
//                               <input
//                                 type="text"
//                                 name="publisherName"
//                                 value={editBook.publisherName}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Category
//                               </label>
//                               <input
//                                 type="text"
//                                 name="category"
//                                 value={editBook.category}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Total Copies
//                               </label>
//                               <input
//                                 type="number"
//                                 name="totalCopies"
//                                 value={editBook.totalCopies}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>

//                             <div>
//                               <label className="block font-semibold">
//                                 Available Copies
//                               </label>
//                               <input
//                                 type="number"
//                                 name="availableCopies"
//                                 value={editBook.availableCopies}
//                                 onChange={handleInputChange}
//                                 className="border rounded px-2 py-1 w-full"
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex justify-end gap-2 mt-4">
//                           <button
//                             onClick={handleSave}
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={() => setEditBook(null)}
//                             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   )}

//                   {/* ✅ Details Section */}
//                   {/* {selectedBook?._id === book._id && (
//                     <tr className="bg-gray-50">
//                       <td colSpan="5" className="p-4 border-t"> */}
//                   {selectedBook?._id === book._id && (
//                     <tr
//                       className={`${
//                         selectedBook?._id === book._id
//                           ? "bg-indigo-100"
//                           : "bg-gray-50"
//                       } transition-colors duration-300`}
//                     >
//                       <td colSpan="5" className="p-4 border-t">
//                         <div className="flex flex-col md:flex-row gap-6 items-start">
//                           {book.image && (
//                             <div className="flex-shrink-0">
//                               <img
//                                 src={book.image}
//                                 alt={book.title}
//                                 className="w-40 h-48 object-cover rounded-md shadow border-5 border-indigo-700"
//                               />
//                             </div>
//                           )}
//                           <div className="pt-7 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-lg leading-relaxed">
//                             <p>
//                               <strong>Edition:</strong> {book.edition}
//                             </p>
//                             <p>
//                               <strong>Language:</strong> {book.language}
//                             </p>
//                             <p>
//                               <strong>Publisher:</strong> {book.publisherName}
//                             </p>
//                             <p>
//                               <strong>Category:</strong> {book.category}
//                             </p>
//                             <p>
//                               <strong>Total Copies:</strong> {book.totalCopies}
//                             </p>
//                             <p>
//                               <strong>Available:</strong> {book.availableCopies}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Pagination Controls */}
//           {/* <div className="flex justify-center mt-6 space-x-2">
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`px-4 py-2 rounded-lg border ${
//                   currentPage === index + 1
//                     ? "bg-indigo-600 text-white"
//                     : "bg-white text-indigo-600 hover:bg-indigo-50"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div> */}
//           <div className="flex justify-center mt-6 space-x-1">
//             {/* Previous Button */}
//             <button
//               onClick={() =>
//                 currentPage > 1 && handlePageChange(currentPage - 1)
//               }
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {/* Page Numbers */}
//             {Array.from({ length: totalPages }, (_, index) => index + 1)
//               .filter(
//                 (page) =>
//                   page === 1 ||
//                   page === totalPages ||
//                   (page >= currentPage - 1 && page <= currentPage + 1)
//               )
//               .map((page, idx, arr) => (
//                 <React.Fragment key={page}>
//                   {/* Add ... between gaps */}
//                   {idx > 0 && arr[idx - 1] !== page - 1 && (
//                     <span className="px-2 text-gray-400">...</span>
//                   )}
//                   <button
//                     onClick={() => handlePageChange(page)}
//                     className={`px-3 py-1 rounded-lg border ${
//                       currentPage === page
//                         ? "bg-indigo-600 text-white"
//                         : "bg-white text-indigo-600 hover:bg-indigo-50"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 </React.Fragment>
//               ))}

//             {/* Next Button */}
//             <button
//               onClick={() =>
//                 currentPage < totalPages && handlePageChange(currentPage + 1)
//               }
//               className={`px-3 py-1 rounded-lg border ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-indigo-600 hover:bg-indigo-50"
//               }`}
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookList;

//---------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Logo from "../../../assets/logo.jpg";

const BookList = ({ darkMode }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mainSearch, setMainSearch] = useState("");
  const [bookIdSearch, setBookIdSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [publisherSearch, setPublisherSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showMoreAlphabets, setShowMoreAlphabets] = useState(false);

  // --- FILTERING LOGIC ---
  // Agar aapke paas pehle se `filteredBooks` variable hai, toh use hata kar yeh `useEffect` aur `useState` paste karen.
  const [filteredBooks, setFilteredBooks] = useState(books);

  //   // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3002/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.books) {
        const sortedBooks = [...res.data.books].sort(
          (a, b) => Number(a.bookId) - Number(b.bookId),
        );
        setBooks(sortedBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book!");
    }
  };

  const handleEdit = (book) => {
    setEditBook(editBook?._id === book._id ? null : { ...book });
  };

  const handleShowDetails = (book) => {
    setSelectedBook(selectedBook?._id === book._id ? null : book);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/books/update/${editBook._id}`,
        editBook,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Book updated successfully!");
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  const thStyle = {
    border: "1px solid #333",
    padding: "10px",
    background: "linear-gradient(to bottom, #1D3DA3, #6A8ED1)",
    color: "#fff",
    textAlign: "left",
  };
  const tdStyle = {
    border: "1px solid #333",
    padding: "8px",
    textAlign: "left",
  };

  const handlePrint = () => {
    if (filteredBooks.length === 0) {
      toast.error("No books to print ❌");
      return;
    }

    const printSection = document.getElementById("print-section");
    printSection.style.display = "block";
    window.print();
    printSection.style.display = "none";
  };

  {
    /* Book Print Section */
  }

  // Filtered and paginated books

  // --- ADVANCED SEARCH STATE VARIABLES ---
  useEffect(() => {
    let results = [...books];

    // Apply main search if it exists (searches across all fields)
    if (mainSearch) {
      const lowercasedSearch = mainSearch.toLowerCase();
      results = results.filter(
        (book) =>
          book.bookId?.toString().includes(mainSearch) ||
          book.isbn?.toLowerCase().includes(lowercasedSearch) ||
          book.title?.toLowerCase().includes(lowercasedSearch) ||
          book.author?.toLowerCase().includes(lowercasedSearch) ||
          book.publisherName?.toLowerCase().includes(lowercasedSearch) ||
          book.category?.toLowerCase().includes(lowercasedSearch),
      );
    }

    // Apply book ID filter if it exists
    if (bookIdSearch) {
      results = results.filter((book) =>
        book.bookId?.toString().includes(bookIdSearch),
      );
    }

    // Apply ISBN filter if it exists
    if (isbnSearch) {
      const lower = isbnSearch.toLowerCase();
      results = results.filter((book) =>
        book.isbn?.toLowerCase().includes(lower),
      );
    }

    // Apply title filter if it exists
    if (titleSearch) {
      const lower = titleSearch.toLowerCase();
      results = results.filter((book) =>
        book.title?.toLowerCase().includes(lower),
      );
    }

    // Apply author filter if it exists
    if (authorSearch) {
      const lower = authorSearch.toLowerCase();
      results = results.filter((book) =>
        book.author?.toLowerCase().includes(lower),
      );
    }

    // Apply publisher filter if it exists
    if (publisherSearch) {
      const lower = publisherSearch.toLowerCase();
      results = results.filter((book) =>
        book.publisherName?.toLowerCase().includes(lower),
      );
    }

    // Apply category filter if it exists
    if (categorySearch) {
      const lower = categorySearch.toLowerCase();
      results = results.filter((book) =>
        book.category?.toLowerCase().includes(lower),
      );
    }

    // Apply alphabet filter if it exists
    if (alphabetFilter) {
      results = results.filter((book) => {
        if (!book.title) return false;
        const firstChar = book.title.charAt(0).toUpperCase();
        return firstChar === alphabetFilter.toUpperCase();
      });
    }

    setFilteredBooks(results);
    setCurrentPage(1);
  }, [
    mainSearch,
    bookIdSearch,
    isbnSearch,
    titleSearch,
    authorSearch,
    publisherSearch,
    categorySearch,
    alphabetFilter,
    books,
  ]);

  // --- HELPER FUNCTIONS ---
  // Updated clearAllSearches function
  const clearAllSearches = () => {
    setMainSearch("");
    setBookIdSearch("");
    setIsbnSearch("");
    setTitleSearch("");
    setAuthorSearch("");
    setPublisherSearch("");
    setCategorySearch("");
    setAlphabetFilter("");
  };

  // Updated hasActiveSearch check
  const hasActiveSearch =
    mainSearch ||
    bookIdSearch ||
    isbnSearch ||
    titleSearch ||
    authorSearch ||
    publisherSearch ||
    categorySearch ||
    alphabetFilter;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`p-1 max-w-9xl mx-auto shadow-md rounded-lg
  ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div id="print-section" style={{ display: "none" }}>
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="w-25 h-auto mb-2" />
          <h1 className="text-2xl font-bold mb-1">Department Library</h1>
          <h2 className="text-lg mb-1">Department of Computer Science</h2>
          <h2 className="text-lg">University of Peshawar</h2>
        </div>
        <table className="w-full border-collapse mx-auto">
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Book ID</th>
              <th style={thStyle}>ISBN</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Author</th>
              {/* <th style={thStyle}>Publisher</th> */}
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Total Copies</th>
              {/* <th style={thStyle}>Available Copies</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{book.bookId}</td>
                <td style={tdStyle}>{book.isbn}</td>
                <td style={tdStyle}>{book.title}</td>
                <td style={tdStyle}>{book.author}</td>
                {/* <td style={tdStyle}>{book.publisherName}</td> */}
                <td style={tdStyle}>{book.category}</td>
                <td style={tdStyle}>{book.totalCopies}</td>
                {/* <td style={tdStyle}>{book.availableCopies}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {/* <h2
        className={`text-3xl font-bold mb-4 text-center
 ${darkMode ? "text-white" : "text-black"}`}
      >
        Book List
      </h2> */}
      {/* Search & Print */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full max-w-3xl mx-auto gap-4">
        {/* COMPACT SEARCH BAR WITH FILTER BUTTON */}
        <div className="relative w-full">
          <div className="flex items-center w-full">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`w-4 h-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search books..."
                value={mainSearch}
                onChange={(e) => setMainSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-l-lg border transition
          ${
            darkMode
              ? "bg-slate-800 border-slate-600 text-white placeholder-gray-400"
              : "bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500"
          }
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        `}
              />
            </div>

            {/* Filter Button */}
            <button
              className={`px-4 py-3 rounded-r-xl border-l-0 transition-colors ${
                darkMode
                  ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-gray-600"
                  : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white border-gray-300"
              }`}
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>

          {/* Filter Options (Hidden by default) */}
          {showFilterOptions && (
            <div
              className={`absolute z-10 mt-2 w-full rounded-xl shadow-lg p-4 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Book ID
                  </label>
                  <input
                    type="text"
                    placeholder="Book ID..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={bookIdSearch}
                    onChange={(e) => setBookIdSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Book title..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="Author name..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={authorSearch}
                    onChange={(e) => setAuthorSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Publisher
                  </label>
                  <input
                    type="text"
                    placeholder="Publisher name..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={publisherSearch}
                    onChange={(e) => setPublisherSearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Web, Data Science..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    ISBN
                  </label>
                  <input
                    type="text"
                    placeholder="ISBN..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                        : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"
                    }`}
                    value={isbnSearch}
                    onChange={(e) => setIsbnSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* ALPHABETICAL FILTER - ADDED HERE */}
              <div
                className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <label
                  className={`block text-xs font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Browse by Letter
                </label>
                <div className="flex flex-wrap gap-1 mb-2">
                  <button
                    onClick={() => setAlphabetFilter("")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      !alphabetFilter
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All
                  </button>

                  {/* Show first 10 letters */}
                  {"ABCDEFGHIJ".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setAlphabetFilter(letter)}
                      className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                        alphabetFilter === letter
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}

                  {/* Show remaining letters when expanded */}
                  {showMoreAlphabets &&
                    "KLMNOPQRSTUVWXYZ".split("").map((letter) => (
                      <button
                        key={letter}
                        onClick={() => setAlphabetFilter(letter)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === letter
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {letter}
                      </button>
                    ))}

                  {/* Numbers */}
                  {showMoreAlphabets &&
                    "0123456789".split("").map((number) => (
                      <button
                        key={number}
                        onClick={() => setAlphabetFilter(number)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                          alphabetFilter === number
                            ? darkMode
                              ? "bg-blue-600 text-white"
                              : "bg-blue-500 text-white"
                            : darkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {number}
                      </button>
                    ))}

                  {/* See More/Less Button */}
                  <button
                    onClick={() => setShowMoreAlphabets(!showMoreAlphabets)}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {showMoreAlphabets ? "See Less" : "See More..."}
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  onClick={clearAllSearches}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className={`ml-0 sm:ml-4 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            darkMode
              ? "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white"
              : "bg-gradient-to-r from-[#1F2A4F] to-[#4A427B] hover:from-[#4A427B] hover:to-[#1F2A4F] text-white "
          } focus:outline-none`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : currentBooks.length === 0 ? (
        <p className="text-center text-gray-600">No books found.</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 rounded-lg table-fixed">
            <thead>
              <tr className="bg-gradient-to-b from-[#1F2A4F] to-[#4A427B] text-white">
                <th className="py-2 px-2 border-b">Book ID</th>
                <th className="py-2 px-4 border-b">ISBN</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-3 border-b">Author</th>
                <th className="py-2 px-5 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <React.Fragment key={book._id}>
                  {/* Normal Row */}
                  {editBook?._id !== book._id ? (
                    <tr
                      className={`${
                        selectedBook?._id === book._id ? "bg-grey-200 " : " "
                      }`}
                    >
                      <td className="py-2 px-1 border-b border-t">
                        {book.bookId}
                      </td>
                      <td className="py-2 px-4 border-b border-t">
                        {book.isbn}
                      </td>
                      <td
                        className="py-2 px-4 border-b border-t max-w-[260px] truncate"
                        title={book.title}
                      >
                        {book.title}
                      </td>
                      <td className="py-2 px-4 border-b border-t">
                        {book.author}
                      </td>
                      {/* <td className="py-2 px-2 border-b text-center flex justify-center items-center gap-2"> */}
                      <td className="py-2 px-2 border-b border-t text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleShowDetails(book)}
                            className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            <AiOutlineEye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(book)}
                            className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            <AiOutlineEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            <AiOutlineDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    /* Edit Mode Row */
                    <tr
                      className={`border-b border-gray-300 transition-colors duration-300 ${
                        darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-yellow-50 text-black"
                      }`}
                    >
                      <td colSpan="5" className="p-4 border-t">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {editBook.image && (
                            <div className="flex-shrink-0">
                              <img
                                src={editBook.image}
                                alt={editBook.title}
                                className="w-40 h-48 object-cover rounded-md shadow border-5 border-indigo-700"
                              />
                            </div>
                          )}
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <p>
                              <strong>Book ID:</strong>{" "}
                              <input
                                name="bookId"
                                value={editBook.bookId}
                                disabled
                                className={`border px-2 py-1 w-full transition-colors duration-300 ${
                                  darkMode
                                    ? "bg-gray-700 text-white placeholder-gray-300"
                                    : "bg-gray-100 text-black placeholder-gray-500"
                                }`}
                              />
                            </p>
                            <p>
                              <strong>ISBN:</strong>{" "}
                              <input
                                name="isbn"
                                value={editBook.isbn}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Title:</strong>{" "}
                              <input
                                name="title"
                                value={editBook.title}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Author:</strong>{" "}
                              <input
                                name="author"
                                value={editBook.author}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Edition:</strong>{" "}
                              <input
                                name="edition"
                                value={editBook.edition}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Language:</strong>{" "}
                              <input
                                name="language"
                                value={editBook.language}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Publisher:</strong>{" "}
                              <input
                                name="publisherName"
                                value={editBook.publisherName}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Category:</strong>{" "}
                              <input
                                name="category"
                                value={editBook.category}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Total Copies:</strong>{" "}
                              <input
                                name="totalCopies"
                                type="number"
                                value={editBook.totalCopies}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                            <p>
                              <strong>Available:</strong>{" "}
                              <input
                                name="availableCopies"
                                type="number"
                                value={editBook.availableCopies}
                                onChange={handleInputChange}
                                className="border px-2 py-1 w-full"
                              />
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditBook(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Details Section */}
                  {selectedBook?._id === book._id && (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            darkMode ? "bg-gray-800" : "bg-indigo-50"
                          }`}
                        >
                          <div className="p-6">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    darkMode
                                      ? "bg-indigo-900/50"
                                      : "bg-indigo-100"
                                  }`}
                                >
                                  <svg
                                    className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                  </svg>
                                </div>
                                <h3
                                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                                >
                                  Book Details
                                </h3>
                              </div>
                              <button
                                onClick={() => setSelectedBook(null)}
                                className={`p-2 rounded-lg transition-colors ${
                                  darkMode
                                    ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                                    : "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Book Image */}
                              {book.image && (
                                <div className="flex-shrink-0">
                                  <div
                                    className={`relative overflow-hidden rounded-lg shadow-lg ${
                                      darkMode
                                        ? "ring-1 ring-gray-700"
                                        : "ring-1 ring-indigo-200"
                                    }`}
                                  >
                                    <img
                                      src={book.image}
                                      alt={book.title}
                                      className="w-40 h-48 object-cover"
                                    />
                                    <div
                                      className={`absolute inset-0 bg-gradient-to-t ${
                                        darkMode
                                          ? "from-gray-900/50"
                                          : "from-indigo-900/20"
                                      }`}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Book Information */}
                              <div className="flex-1">
                                {/* Book Title */}
                                <div
                                  className={`mb-4 pb-4 border-b ${
                                    darkMode
                                      ? "border-gray-700"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <h4
                                    className={`text-xl font-bold mb-1 ${
                                      darkMode ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {book.title}
                                  </h4>
                                  <p
                                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                  >
                                    by {book.author}
                                  </p>
                                </div>

                                {/* Book Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {/* Edition */}
                                  <div
                                    className={`p-3 rounded-lg ${
                                      darkMode
                                        ? "bg-gray-700/50"
                                        : "bg-white/70"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          darkMode
                                            ? "bg-blue-400"
                                            : "bg-blue-600"
                                        }`}
                                      ></div>
                                      <span
                                        className={`text-xs font-medium uppercase tracking-wide ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Edition
                                      </span>
                                    </div>
                                    <p
                                      className={`text-lg font-semibold ${
                                        darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {book.edition}
                                    </p>
                                  </div>

                                  {/* Language */}
                                  <div
                                    className={`p-3 rounded-lg ${
                                      darkMode
                                        ? "bg-gray-700/50"
                                        : "bg-white/70"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          darkMode
                                            ? "bg-green-400"
                                            : "bg-green-600"
                                        }`}
                                      ></div>
                                      <span
                                        className={`text-xs font-medium uppercase tracking-wide ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Language
                                      </span>
                                    </div>
                                    <p
                                      className={`text-lg font-semibold ${
                                        darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {book.language}
                                    </p>
                                  </div>

                                  {/* Publisher */}
                                  <div
                                    className={`p-3 rounded-lg ${
                                      darkMode
                                        ? "bg-gray-700/50"
                                        : "bg-white/70"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          darkMode
                                            ? "bg-purple-400"
                                            : "bg-purple-600"
                                        }`}
                                      ></div>
                                      <span
                                        className={`text-xs font-medium uppercase tracking-wide ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Publisher
                                      </span>
                                    </div>
                                    <p
                                      className={`text-lg font-semibold ${
                                        darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {book.publisherName}
                                    </p>
                                  </div>

                                  {/* Category */}
                                  <div
                                    className={`p-3 rounded-lg ${
                                      darkMode
                                        ? "bg-gray-700/50"
                                        : "bg-white/70"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          darkMode
                                            ? "bg-amber-400"
                                            : "bg-amber-600"
                                        }`}
                                      ></div>
                                      <span
                                        className={`text-xs font-medium uppercase tracking-wide ${
                                          darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Category
                                      </span>
                                    </div>
                                    <p
                                      className={`text-lg font-semibold ${
                                        darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {book.category}
                                    </p>
                                  </div>
                                </div>

                                {/* Copy Information */}
                                <div
                                  className={`mt-4 p-4 rounded-lg ${
                                    darkMode
                                      ? "bg-gray-700/50"
                                      : "bg-indigo-100/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-3">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        darkMode ? "bg-red-400" : "bg-red-600"
                                      }`}
                                    ></div>
                                    <span
                                      className={`text-sm font-medium uppercase tracking-wide ${
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      Availability
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p
                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                      >
                                        Available Copies
                                      </p>
                                      <p
                                        className={`text-2xl font-bold ${
                                          darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {book.availableCopies}
                                      </p>
                                    </div>
                                    <div className="text-center">
                                      <p
                                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                                      >
                                        Total Copies
                                      </p>
                                      <p
                                        className={`text-2xl font-bold ${
                                          darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {book.totalCopies}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <div
                                      className={`w-full bg-gray-200 rounded-full h-2 ${
                                        darkMode ? "bg-gray-700" : "bg-gray-300"
                                      }`}
                                    >
                                      <div
                                        className={`h-2 rounded-full ${
                                          darkMode
                                            ? "bg-green-500"
                                            : "bg-green-600"
                                        }`}
                                        style={{
                                          width: `${(book.availableCopies / book.totalCopies) * 100}%`,
                                        }}
                                      ></div>
                                    </div>
                                    <p
                                      className={`text-xs mt-1 text-center ${
                                        darkMode
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {Math.round(
                                        (book.availableCopies /
                                          book.totalCopies) *
                                          100,
                                      )}
                                      % available
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-1">
            <button
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              className={`px-3 py-1 rounded border border-black font-bold ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1),
              )
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && arr[idx - 1] !== page - 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded border border-black font-bold ${
                      currentPage === page
                        ? "bg-gray-700 text-white font-bold"
                        : "bg-white text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              className={`px-3 py-1 rounded border border-black font-bold ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;
