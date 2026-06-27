import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import BookCard from '../components/books/BookCard';
import { HiArrowRight } from 'react-icons/hi';
import { MdMenuBook, MdLocalShipping } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import './Home.css';

const CATEGORIES = ['All', 'Government Jobs', 'Bank Jobs', 'BCS Preparation', 'NTRCA'];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchBooks(), fetchBooks({ featured: true })])
      .then(([all, featured]) => {
        setBooks(all.data);
        setFeaturedBooks(featured.data.slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? books
    : books.filter((b) => b.category === activeCategory);

  return (
    <main className="home">
      {/* ── HERO ────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="section-label">Career Books · Bangladesh</div>
            <h1 className="hero__headline">
              Books That Build <span className="hero__headline-accent">Careers.</span>
            </h1>
            <p className="hero__sub">
              Premium career and professional development books written for Bangladeshi graduates and working professionals. BCS, banking, interviews, freelancing — we cover it all.
            </p>
            <div className="hero__actions">
              <Link to="/books" className="btn btn-primary">
                Browse All Books <HiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>

          {/* Book cover stack */}
          <div className="hero__covers">
            {featuredBooks.map((book, i) => (
              <div key={book._id} className={`hero__cover hero__cover--${i}`}
                onClick={() => navigate(`/books/${book._id}`)}>
                {book.coverImage ? (
                  <img src={`${process.env.REACT_APP_API_URL || ""}${book.coverImage}`} alt={book.title} />
                ) : (
                  <div className="hero__cover-placeholder"><MdMenuBook /></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="container">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-item__number">3,000+</div>
              <div className="stat-item__label">Copies sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">{books.length || 8}</div>
              <div className="stat-item__label">Titles available</div>
            </div>
            <div className="stat-item">
              <div className="stat-item__number">5 yrs</div>
              <div className="stat-item__label">Publishing since 2019</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ────────────────────────────── */}
      <section className="section how-to-order">
        <div className="container">
          <div className="how-to-order__header">
            <h2 className="section-title">How to Order</h2>
            <span className="how-to-order__sub">Simple. Safe. Bangladesh-first.</span>
          </div>
          <div className="how-to-order__steps">
            {[
              { icon: <MdMenuBook />, step: '01', title: 'Choose Your Book', desc: 'Browse our catalog and pick the book that fits your career goals. View full descriptions, author info, and pricing.' },
              { icon: <BsCashCoin />, step: '02', title: 'Pay via bKash, Nagad or Rocket', desc: 'Send the book price to our verified number. Save your Transaction ID (TrxID) from your payment app.' },
              { icon: <MdLocalShipping />, step: '03', title: 'Submit & Receive', desc: 'Fill the order form with your TrxID and delivery address. We verify and ship within 1–3 business days.' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="how-to-order__card">
                <div className="how-to-order__icon">{icon}</div>
                <div className="how-to-order__step-label">{step}</div>
                <h3 className="how-to-order__title">{title}</h3>
                <p className="how-to-order__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BOOKS ──────────────────────────── */}
      {featuredBooks.length > 0 && (
        <section className="section featured-books">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Books</h2>
              <Link to="/books" className="btn btn-ghost">All books <HiArrowRight /></Link>
            </div>
            <div className="books-grid">
              {featuredBooks.map((book) => <BookCard key={book._id} book={book} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORY FILTER ─────────────────────────── */}
      <section className="category-section">
        <div className="container">
          <div className="section-label" style={{ textAlign: 'center', marginBottom: '24px' }}>
            Browse by Category
          </div>
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL BOOKS ───────────────────────────────── */}
      <section className="section all-books">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '32px' }}>All Books</h2>
          {loading ? (
            <div className="books-grid">
              {[...Array(4)].map((_, i) => <div key={i} className="book-card-skeleton" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="books-grid">
              {filtered.map((book) => <BookCard key={book._id} book={book} />)}
            </div>
          ) : (
            <div className="empty-state">No books in this category yet.</div>
          )}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="section-label" style={{ textAlign: 'center' }}>Need Help Choosing?</div>
            <h2 className="cta-box__title">Not sure which book is right for you?</h2>
            <p className="cta-box__sub">
              Send us a message — we'll recommend the best book for your current career stage and goals.
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Recommendation</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
