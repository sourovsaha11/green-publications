const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const Admin = require('./models/Admin');

dotenv.config();

const books = [
  {
    title: 'Bank IQ',
    titleBn: 'ব্যাংক আইকিউ',
    author: 'Green Publication Editorial Team',
    category: 'Bank Jobs',
    price: 450,
    description: 'A comprehensive supplement on Financial-Banking Knowledge and Analytical Ability. Covers Banking GK, Business Knowledge, Finance Knowledge, Insurance Knowledge, Recent GK, Previous Questions, Analytical Skill and IQ Practice. Focused on Bangladesh Bank (Assistant Director), Combined Govt. Bank (Senior Officer), Private Banks (MTO/TO/PO). Includes Preli, Written & Viva preparation.',
    coverImage: '/uploads/book-bank-iq.jpg',
    isFeatured: true,
    stock: 100,
  },
  {
    title: 'Finance, Banking & Insurance',
    titleBn: 'ফিন্যান্স, ব্যাংকিং এন্ড ইন্স্যুরেন্স',
    author: 'Green Publication Editorial Team',
    category: 'NTRCA',
    price: 420,
    description: '19th Teacher Registration exam preparation book for Finance, Banking & Insurance subject. Written as per NTRCA new syllabus — College Level. Covers Preli and Viva preparation with topic-wise discussion, NCTB approved MCQ, previous year questions and model tests.',
    coverImage: '/uploads/book-finance-banking.jpg',
    isFeatured: true,
    stock: 100,
  },
  {
    title: 'Business Studies',
    titleBn: 'ব্যবসায় শিক্ষা',
    author: 'Green Publication Editorial Team',
    category: 'NTRCA',
    price: 400,
    description: '19th Teacher Registration exam preparation book for Business Studies subject. Written as per NTRCA new syllabus — School Level. Covers Preli and Viva preparation with topic-wise discussion, NCTB approved MCQ, previous year questions and model tests.',
    coverImage: '/uploads/book-business-education.jpg',
    isFeatured: true,
    stock: 100,
  },
  {
    title: 'Management',
    titleBn: 'ব্যবস্থাপনা',
    author: 'Green Publication Editorial Team',
    category: 'NTRCA',
    price: 380,
    description: '19th Teacher Registration exam preparation book for Management subject. Written as per NTRCA new syllabus — College Level. Covers Preli and Viva preparation with topic-wise discussion, NCTB approved MCQ, previous year questions and selected model tests.',
    coverImage: '/uploads/book-management.jpg',
    isFeatured: false,
    stock: 100,
  },
  {
    title: 'Accounting',
    titleBn: 'হিসাববিজ্ঞান',
    author: 'Green Publication Editorial Team',
    category: 'NTRCA',
    price: 380,
    description: '19th Teacher Registration exam preparation book for Accounting subject. Written as per NTRCA new syllabus — College Level. Covers Preli and Viva preparation with topic-wise discussion, NCTB approved MCQ, previous year questions and selected model tests.',
    coverImage: '/uploads/book-accounting.jpg',
    isFeatured: false,
    stock: 100,
  },
  {
    title: 'Production Management & Marketing',
    titleBn: 'উৎপাদন ব্যবস্থাপনা ও বিপণন',
    author: 'Green Publication Editorial Team',
    category: 'NTRCA',
    price: 380,
    description: '19th Teacher Registration exam preparation book for Production Management & Marketing subject. Written as per NTRCA new syllabus — College Level. Covers Preli and Viva preparation with topic-wise discussion, NCTB approved MCQ, previous year questions and model tests.',
    coverImage: '/uploads/book-production-marketing.jpg',
    isFeatured: false,
    stock: 100,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Clear existing books
    await Book.deleteMany({});
    console.log('🗑️  Cleared existing books');

    // Insert all books
    const inserted = await Book.insertMany(books);
    console.log(`📚 Inserted ${inserted.length} books:`);
    inserted.forEach(b => console.log(`   - ${b.title} (${b.category}) — BDT ${b.price}`));

    // Seed admin if not exists
    const adminExists = await Admin.findOne({ email: 'admin@greenpublications.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@greenpublications.com',
        password: 'admin123456',
      });
      console.log('👤 Admin created: admin@greenpublications.com / admin123456');
    } else {
      console.log('👤 Admin already exists');
    }

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
