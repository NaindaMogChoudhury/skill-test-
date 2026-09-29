const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library_management_db';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(' Successfully connected to MongoDB database');
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
  });

// Health check / Root route
app.get('/', (req, res) => {
  res.send({ status: 'API is running', message: 'Library Book Management Backend' });
});

// B. Backend — Node.js and Express
// POST /api/books - Create and store a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn, category, publicationYear } = req.body;

    // Validate that required fields are provided
    if (!title || !author || !isbn || !category || !publicationYear) {
      return res.status(400).json({
        success: false,
        message: 'All fields (title, author, isbn, category, publicationYear) are required.'
      });
    }

    // Validate publicationYear is a valid number
    const yearNumber = Number(publicationYear);
    if (isNaN(yearNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Publication Year must be a valid number.'
      });
    }

    // Create new book document using Mongoose Model
    const newBook = new Book({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      category: category.trim(),
      publicationYear: yearNumber
    });

    // Save to MongoDB
    const savedBook = await newBook.save();

    // Return the newly created book as a JSON response with status 201 Created
    return res.status(201).json({
      success: true,
      message: 'Book successfully created and saved to MongoDB',
      book: savedBook
    });
  } catch (error) {
    console.error('Error saving book:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while saving book'
    });
  }
});

// GET /api/books - Retrieve all books (helpful for testing & demonstration)
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while fetching books'
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
