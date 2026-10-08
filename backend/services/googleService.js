const axios = require("axios");
const dotenv = require("dotenv");

async function fetchBookByISBN(isbn) {
  try {
    // 1️⃣ Google Books API
    const gRes = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
    );
    const gBook = gRes.data.items?.[0]?.volumeInfo;

    if (gBook) {
      return {
        rating: gBook.averageRating || 0,
        reviewCount: gBook.ratingsCount || 0,
        description: gBook.description || "",
        categories: gBook.categories || [],
      };
    }

    // 2️⃣ Fallback to Open Library
    const olRes = await axios.get(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
    );
    const olBook = olRes.data[`ISBN:${isbn}`];

    if (olBook) {
      return {
        rating: 0, // Open Library me rating mostly nahi hoti
        reviewCount: 0,
        description: olBook.notes || olBook.subtitle || "",
        categories: olBook.subjects?.map((s) => s.name) || [],
      };
    }

    // Agar dono se nahi mila
    return { rating: 0, reviewCount: 0, description: "", categories: [] };
  } catch (error) {
    console.error(`Error fetching ISBN ${isbn}:`, error.message);
    return { rating: 0, reviewCount: 0, description: "", categories: [] };
  }
}

module.exports = { fetchBookByISBN };
