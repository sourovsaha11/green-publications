const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createOrder);                           // Public - place order
router.get('/', protect, getOrders);                    // Admin only
router.put('/:id', protect, updateOrderStatus);         // Admin only
router.delete('/:id', protect, deleteOrder);            // Admin only

module.exports = router;
