const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  titleBn:     { type: String, trim: true, default: '' },
  author:      { type: String, required: true, trim: true },
  category:    { type: String, required: true, enum: ['Government Jobs', 'Bank Jobs', 'BCS Preparation', 'NTRCA', 'Others'], default: 'NTRCA' },
  price:       { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  coverImage:  { type: String, default: '' },
  isFeatured:  { type: Boolean, default: false },
  stock:       { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
