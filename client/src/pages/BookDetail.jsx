import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookById, placeOrder, fetchSettings } from '../services/api';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';
import { MdMenuBook } from 'react-icons/md';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook]         = useState(null);
  const [settings, setSettings] = useState({ paymentNumber: '01923507973', paymentMethods: 'bKash · Nagad · Rocket' });
  const [loading, setLoading]   = useState(true);
  const [submitting, setSubmit] = useState(false);
  const [form, setForm] = useState({
    customerName: '', phone: '', address: '',
    paymentMethod: 'bKash', transactionId: '', quantity: 1, note: '',
  });

  useEffect(() => {
    Promise.all([fetchBookById(id), fetchSettings()])
      .then(([bookRes, settingsRes]) => {
        setBook(bookRes.data);
        setSettings(settingsRes.data);
      })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      await placeOrder({ ...form, bookId: id });
      toast.success('🎉 Order placed! We will contact you soon.');
      setForm({ customerName: '', phone: '', address: '', paymentMethod: 'bKash', transactionId: '', quantity: 1, note: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmit(false);
    }
  };

  if (loading) return <div className="book-detail-loading">Loading...</div>;
  if (!book)   return <div className="book-detail-loading">Book not found.</div>;

  const imgSrc = book.coverImage ? `${process.env.REACT_APP_API_URL || ''}${book.coverImage}` : null;

  return (
    <main className="book-detail-page">
      <div className="container">
        <Link to="/books" className="book-detail-back"><HiArrowLeft /> Back to Books</Link>

        <div className="book-detail__grid">
          {/* Book info */}
          <div className="book-detail__info">
            <div className="book-detail__cover-wrap">
              {imgSrc
                ? <img src={imgSrc} alt={book.title} className="book-detail__cover" />
                : <div className="book-detail__cover-placeholder"><MdMenuBook /></div>}
            </div>
            <div className="book-card__category">{book.category}</div>
            <h1 className="book-detail__title">{book.title}</h1>
            {book.titleBn && <p className="book-detail__title-bn">{book.titleBn}</p>}
            <p className="book-detail__author">by {book.author}</p>
            <div className="book-detail__price">BDT {book.price}</div>
            {book.description && <p className="book-detail__description">{book.description}</p>}
          </div>

          {/* Order form */}
          <div className="book-detail__order">
            <h2 className="book-detail__order-title">Place Your Order</h2>
            <p className="book-detail__order-sub">Pay via {settings.paymentMethods}, then fill out the form below.</p>

            <div className="payment-info">
              <div className="payment-info__label">Send payment to:</div>
              <div className="payment-info__number">{settings.paymentNumber}</div>
              <div className="payment-info__methods">{settings.paymentMethods}</div>
            </div>

            <form onSubmit={handleOrder} className="order-form">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input name="customerName" value={form.customerName} onChange={handleChange} className="form-input" placeholder="Full name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="01XXXXXXXXX" required />
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <textarea name="address" value={form.address} onChange={handleChange} className="form-input" rows={3} placeholder="Full delivery address" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Payment Method *</label>
                  <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="form-input">
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input name="quantity" type="number" value={form.quantity} onChange={handleChange} className="form-input" min={1} max={10} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Transaction ID (TrxID) *</label>
                <input name="transactionId" value={form.transactionId} onChange={handleChange} className="form-input" placeholder="e.g. ABC1234567" required />
              </div>
              <div className="form-group">
                <label className="form-label">Note (optional)</label>
                <textarea name="note" value={form.note} onChange={handleChange} className="form-input" rows={2} placeholder="Any special instructions..." />
              </div>
              <div className="order-form__total">
                Total: <strong>BDT {book.price * form.quantity}</strong>
              </div>
              <button type="submit" className="btn btn-primary order-form__submit" disabled={submitting}>
                {submitting ? 'Placing Order...' : 'Confirm Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetail;
