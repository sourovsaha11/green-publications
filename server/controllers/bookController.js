const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

// @desc  Get all books (with optional category filter)
// @route GET /api/books
const getBooks = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = {};
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Get single book
// @route GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Create a book (Admin)
// @route POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, titleBn, author, category, price, description, isFeatured, stock } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : '';

    const book = await Book.create({
      title, titleBn, author, category, price,
      description, isFeatured, stock, coverImage,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Update a book (Admin)
// @route PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, titleBn, author, category, price, description, isFeatured, stock } = req.body;

    // If new image uploaded, delete old one
    if (req.file) {
      if (book.coverImage) {
        const oldPath = path.join(__dirname, '..', book.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      book.coverImage = `/uploads/${req.file.filename}`;
    }

    book.title = title || book.title;
    book.titleBn = titleBn || book.titleBn;
    book.author = author || book.author;
    book.category = category || book.category;
    book.price = price || book.price;
    book.description = description || book.description;
    book.isFeatured = isFeatured !== undefined ? isFeatured : book.isFeatured;
    book.stock = stock || book.stock;

    const updated = await book.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Delete a book (Admin)
// @route DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Delete image file
    if (book.coverImage) {
      const imgPath = path.join(__dirname, '..', book.coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
