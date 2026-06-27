import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <img src="/logo.png" alt="Green Publications" className="admin-login__logo" />
        <h1 className="admin-login__title">Admin Login</h1>
        <p className="admin-login__sub">Sign in to manage books and orders</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input" placeholder="admin@greenpublications.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary admin-login__btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
