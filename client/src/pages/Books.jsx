import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import BookCard from '../components/books/BookCard';
import './Books.css';

const CATEGORIES = ['All', 'Government Jobs', 'Bank Jobs', 'BCS Preparation', 'NTRCA'];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks()
      .then((res) => setBooks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = books
    .filter((b) => activeCategory === 'All' || b.category === activeCategory)
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="books-page">
      <div className="books-page__hero">
        <div className="container">
          <div className="section-label">Our Collection</div>
          <h1 className="section-title">All Books</h1>
          <p className="books-page__sub">
            Browse our full catalog of career and professional development books.
          </p>
          <input
            type="text"
            placeholder="Search by title or author..."
            className="form-input books-page__search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container books-page__body">
        {/* Category filter */}
        <div className="books-page__filters">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button key={cat}
                className={`pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <span className="books-page__count">{filtered.length} books</span>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="books-grid">
            {[...Array(6)].map((_, i) => <div key={i} className="book-card-skeleton" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="books-grid">
            {filtered.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <div className="empty-state">No books found. Try a different search or category.</div>
        )}
      </div>
    </main>
  );
};

export default Books;
