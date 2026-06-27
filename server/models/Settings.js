const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  paymentNumber: { type: String, default: '01923507973' },
  paymentMethods: { type: String, default: 'bKash · Nagad · Rocket' },
  siteName: { type: String, default: 'Green Publications' },
  phone: { type: String, default: '01923507973' },
  address: { type: String, default: '40/2 Purana Paltan, Level-3, Dhaka-1000, Bangladesh' },
  fbLink: { type: String, default: 'https://www.facebook.com/share/1ETaTwSJU1/' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
