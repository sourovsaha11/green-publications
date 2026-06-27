const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use /tmp on Vercel, local uploads/ otherwise
const uploadDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, 'book-' + Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  /jpeg|jpg|png|webp/.test(file.mimetype) ? cb(null, true) : cb(new Error('Images only!'));
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
