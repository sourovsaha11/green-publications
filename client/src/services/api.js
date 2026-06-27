import axios from 'axios';

// In production (Vercel), use env variable. In dev, use proxy.
const BASE_URL = process.env.REACT_APP_API_URL || '';

const API = axios.create({ baseURL: `${BASE_URL}/api` });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchBooks      = (params) => API.get('/books', { params });
export const fetchBookById   = (id)     => API.get(`/books/${id}`);
export const createBook      = (fd)     => API.post('/books', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateBook      = (id, fd) => API.put(`/books/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteBook      = (id)     => API.delete(`/books/${id}`);
export const placeOrder      = (data)   => API.post('/orders', data);
export const fetchOrders     = ()       => API.get('/orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}`, { status });
export const deleteOrder     = (id)     => API.delete(`/orders/${id}`);
export const adminLogin      = (creds)  => API.post('/auth/login', creds);
export const getAdminProfile = ()       => API.get('/auth/me');

export default API;

// ── Settings ───────────────────────────────────────────
export const fetchSettings     = ()       => API.get('/settings');
export const updateSettings    = (data)   => API.put('/settings', data);
export const updateAdminProfile = (data)  => API.put('/settings/profile', data);
