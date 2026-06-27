const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, updateAdminProfile } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSettings);                          // Public - frontend reads payment info
router.put('/', protect, updateSettings);              // Admin only
router.put('/profile', protect, updateAdminProfile);   // Admin only

module.exports = router;
