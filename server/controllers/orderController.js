const Order = require('../models/Order');
const Book = require('../models/Book');

// @desc  Place an order (Public)
// @route POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, bookId, quantity, paymentMethod, transactionId, note } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const qty = quantity || 1;
    const totalPrice = book.price * qty;

    const order = await Order.create({
      customerName,
      phone,
      address,
      book: bookId,
      bookTitle: book.title,
      quantity: qty,
      totalPrice,
      paymentMethod,
      transactionId,
      note,
    });

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Get all orders (Admin)
// @route GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('book', 'title coverImage').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Update order status (Admin)
// @route PUT /api/orders/:id
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc  Delete order (Admin)
// @route DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus, deleteOrder };
