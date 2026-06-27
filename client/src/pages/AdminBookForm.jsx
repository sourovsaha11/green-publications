import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createBook, fetchBookById, updateBook } from '../services/api';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';
import { MdCloudUpload } from 'react-icons/md';
import './AdminBookForm.css';

const CATEGORIES = ['Government Jobs', 'Bank Jobs', 'BCS Preparation', 'NTRCA', 'Others'];

const AdminBookForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', titleBn: '', author: '', category: 'Government Jobs',
    price: '', description: '', isFeatured: false, stock: 100,
  });
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchBookById(id).then((res) => {
        const b = res.data;
        setForm({
          title: b.title, titleBn: b.titleBn || '', author: b.author,
          category: b.category, price: b.price, description: b.description || '',
          isFeatured: b.isFeatured, stock: b.stock,
        });
        if (b.coverImage) setPreview(`${process.env.REACT_APP_API_URL || ""}${b.coverImage}`);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverImage) fd.append('coverImage', coverImage);

      if (isEdit) {
        await updateBook(id, fd);
        toast.success('Book updated!');
      } else {
        await createBook(fd);
        toast.success('Book added!');
      }
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-book-form-page">
      <div className="admin-book-form__header">
        <Link to="/admin" className="book-detail-back"><HiArrowLeft /> Back to Dashboard</Link>
        <h1 className="admin-book-form__title">{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
      </div>

      <div className="admin-book-form__grid">
        {/* Cover upload */}
        <div className="admin-book-form__cover-section">
          <div className="admin-cover-upload" onClick={() => document.getElementById('coverInput').click()}>
            {preview
              ? <img src={preview} alt="Preview" className="admin-cover-preview" />
              : <div className="admin-cover-placeholder">
                  <MdCloudUpload />
                  <span>Click to upload cover image</span>
                </div>}
          </div>
          <input id="coverInput" type="file" accept="image/*" hidden onChange={handleImageChange} />
          <p className="admin-cover-hint">JPG, PNG or WebP · Max 5MB · Recommended 3:4 ratio</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-book-form__fields">
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Title (English) *</label>
              <input name="title" value={form.title} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Title (Bengali)</label>
              <input name="titleBn" value={form.titleBn} onChange={handleChange} className="form-input" placeholder="বাংলা শিরোনাম" />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Author *</label>
              <input name="author" value={form.author} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className="form-input">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Price (BDT) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="form-input" min={0} required />
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className="form-input" min={0} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              className="form-input" rows={5} placeholder="Short description about the book..." />
          </div>

          <label className="admin-featured-check">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            <span>Mark as Featured (shows in hero & featured section)</span>
          </label>

          <button type="submit" className="btn btn-primary admin-book-form__submit" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminBookForm;
