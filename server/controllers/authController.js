const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Book = require('../models/Book');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Provide email and password' });
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ _id: admin._id, name: admin.name, email: admin.email, token: generateToken(admin._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminProfile = async (req, res) => {
  res.json({ _id: req.admin._id, name: req.admin.name, email: req.admin.email });
};

const seedAdmin = async (req, res) => {
  try {
    // Seed admin
    let adminMsg = 'Admin already exists';
    const exists = await Admin.findOne({ email: 'admin@greenpublications.com' });
    if (!exists) {
      await Admin.create({ name: 'Admin', email: 'admin@greenpublications.com', password: 'admin123456' });
      adminMsg = 'Admin created';
    }

    // Seed books
    const count = await Book.countDocuments();
    let booksMsg = `Books already seeded (${count} books)`;
    if (count === 0) {
      const books = [
        { title: 'Bank IQ', titleBn: 'ব্যাংক আইকিউ', author: 'Green Publication Editorial Team', category: 'Bank Jobs', price: 450, description: 'A comprehensive supplement on Financial-Banking Knowledge and Analytical Ability. Covers Banking GK, Business Knowledge, Finance Knowledge, Insurance Knowledge, Recent GK and Previous Questions. Focused on Bangladesh Bank, Combined Govt. Bank and Private Banks.', coverImage: '/uploads/book-bank-iq.jpg', isFeatured: true, stock: 100 },
        { title: 'Finance, Banking & Insurance', titleBn: 'ফিন্যান্স, ব্যাংকিং এন্ড ইন্স্যুরেন্স', author: 'Green Publication Editorial Team', category: 'NTRCA', price: 420, description: '19th Teacher Registration exam book for Finance, Banking & Insurance — College Level. Written as per NTRCA new syllabus with topic-wise discussion, MCQ, previous year questions and model tests.', coverImage: '/uploads/book-finance-banking.jpg', isFeatured: true, stock: 100 },
        { title: 'Business Studies', titleBn: 'ব্যবসায় শিক্ষা', author: 'Green Publication Editorial Team', category: 'NTRCA', price: 400, description: '19th Teacher Registration exam book for Business Studies — School Level. Written as per NTRCA new syllabus with topic-wise discussion, MCQ, previous year questions and model tests.', coverImage: '/uploads/book-business-education.jpg', isFeatured: true, stock: 100 },
        { title: 'Management', titleBn: 'ব্যবস্থাপনা', author: 'Green Publication Editorial Team', category: 'NTRCA', price: 380, description: '19th Teacher Registration exam book for Management — College Level. NTRCA new syllabus with topic-wise discussion, MCQ, previous year questions and selected model tests.', coverImage: '/uploads/book-management.jpg', isFeatured: false, stock: 100 },
        { title: 'Accounting', titleBn: 'হিসাববিজ্ঞান', author: 'Green Publication Editorial Team', category: 'NTRCA', price: 380, description: '19th Teacher Registration exam book for Accounting — College Level. NTRCA new syllabus with topic-wise discussion, MCQ, previous year questions and selected model tests.', coverImage: '/uploads/book-accounting.jpg', isFeatured: false, stock: 100 },
        { title: 'Production Management & Marketing', titleBn: 'উৎপাদন ব্যবস্থাপনা ও বিপণন', author: 'Green Publication Editorial Team', category: 'NTRCA', price: 380, description: '19th Teacher Registration exam book for Production Management & Marketing — College Level. NTRCA new syllabus with topic-wise discussion, MCQ, previous year questions and model tests.', coverImage: '/uploads/book-production-marketing.jpg', isFeatured: false, stock: 100 },
      ];
      await Book.insertMany(books);
      booksMsg = `6 books seeded successfully`;
    }

    res.status(201).json({ message: 'Seed complete', admin: adminMsg, books: booksMsg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginAdmin, getAdminProfile, seedAdmin };
