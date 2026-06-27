const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, seedAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/me', protect, getAdminProfile);
router.post('/seed', seedAdmin); // Run once to create admin account

module.exports = router;
