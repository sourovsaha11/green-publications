import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookForm from './pages/AdminBookForm';

import './index.css';

// Layout wrapper for public pages (with Navbar + Footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161616',
              color: '#fff',
              border: '1px solid #222',
            },
            success: { iconTheme: { primary: '#2ecc71', secondary: '#000' } },
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/books" element={<PublicLayout><Books /></PublicLayout>} />
          <Route path="/books/:id" element={<PublicLayout><BookDetail /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/books/add" element={<ProtectedRoute><AdminBookForm /></ProtectedRoute>} />
          <Route path="/admin/books/edit/:id" element={<ProtectedRoute><AdminBookForm /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
