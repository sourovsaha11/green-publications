import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchBooks, deleteBook, fetchOrders, updateOrderStatus, deleteOrder } from '../services/api';
import toast from 'react-hot-toast';
import { MdMenuBook, MdAdd, MdEdit, MdDelete, MdLogout, MdSettings } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBooks(), fetchOrders()])
      .then(([b, o]) => { setBooks(b.data); setOrders(o.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success('Book deleted');
    } catch { toast.error('Failed to delete book'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
      toast.success('Status updated');
    } catch { toast.error('Failed to update status'); }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success('Order deleted');
    } catch { toast.error('Failed to delete order'); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const STATUS_COLORS = {
    Pending: '#f39c12', Confirmed: '#3498db', Shipped: '#9b59b6',
    Delivered: '#2ecc71', Cancelled: '#e74c3c',
  };

  return (
    <div className="admin-dash">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <img src="/logo.png" alt="Green Publications" className="admin-sidebar__logo" />
        <nav className="admin-sidebar__nav">
          <button className={`admin-nav-btn ${tab === 'books' ? 'active' : ''}`} onClick={() => setTab('books')}>
            <MdMenuBook /> Books
          </button>
          <button className={`admin-nav-btn ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
            <FaBoxOpen /> Orders
            {orders.filter((o) => o.status === 'Pending').length > 0 && (
              <span className="admin-badge">{orders.filter((o) => o.status === 'Pending').length}</span>
            )}
          </button>
          <Link to="/admin/settings" className="admin-nav-btn" style={{textDecoration:'none'}}>
            <MdSettings /> Settings
          </Link>
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}><MdLogout /> Logout</button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">
              {tab === 'books' ? 'Manage Books' : 'Manage Orders'}
            </h1>
            <p className="admin-topbar__sub">Welcome, {admin?.name}</p>
          </div>
          {tab === 'books' && (
            <Link to="/admin/books/add" className="btn btn-primary"><MdAdd /> Add Book</Link>
          )}
        </div>

        {/* Stats row */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-card__num">{books.length}</div>
            <div className="admin-stat-card__label">Total Books</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__num">{orders.length}</div>
            <div className="admin-stat-card__label">Total Orders</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__num">{orders.filter((o) => o.status === 'Pending').length}</div>
            <div className="admin-stat-card__label">Pending Orders</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__num">{orders.filter((o) => o.status === 'Delivered').length}</div>
            <div className="admin-stat-card__label">Delivered</div>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : tab === 'books' ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cover</th><th>Title</th><th>Author</th>
                  <th>Category</th><th>Price</th><th>Featured</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      {book.coverImage
                        ? <img src={`${process.env.REACT_APP_API_URL || ""}${book.coverImage}`} alt="" className="admin-table__cover" />
                        : <div className="admin-table__cover-placeholder"><MdMenuBook /></div>}
                    </td>
                    <td className="admin-table__title">{book.title}</td>
                    <td>{book.author}</td>
                    <td><span className="admin-tag">{book.category}</span></td>
                    <td>BDT {book.price}</td>
                    <td>{book.isFeatured ? '⭐' : '—'}</td>
                    <td>
                      <div className="admin-actions">
                        <Link to={`/admin/books/edit/${book._id}`} className="admin-action-btn edit"><MdEdit /></Link>
                        <button className="admin-action-btn delete" onClick={() => handleDeleteBook(book._id)}><MdDelete /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {books.length === 0 && <div className="admin-empty">No books yet. <Link to="/admin/books/add">Add your first book →</Link></div>}
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th><th>Phone</th><th>Book</th>
                  <th>Amount</th><th>Payment</th><th>TrxID</th><th>Status</th><th>Del</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>
                    <td>{order.phone}</td>
                    <td className="admin-table__title">{order.bookTitle}</td>
                    <td>BDT {order.totalPrice}</td>
                    <td>{order.paymentMethod}</td>
                    <td><code>{order.transactionId}</code></td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="admin-status-select"
                        style={{ color: STATUS_COLORS[order.status] }}>
                        {['Pending','Confirmed','Shipped','Delivered','Cancelled'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="admin-action-btn delete" onClick={() => handleDeleteOrder(order._id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="admin-empty">No orders yet.</div>}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
