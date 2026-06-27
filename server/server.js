const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve committed book cover images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',   require('./routes/authRoutes'));
app.use('/api/books',  require('./routes/bookRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => res.json({ message: '🟢 Green Publications API running!' }));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => res.status(500).json({ message: err.message || 'Server Error' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));

module.exports = app;
