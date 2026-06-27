const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    const { paymentNumber, paymentMethods, siteName, phone, address, fbLink } = req.body;
    if (paymentNumber) settings.paymentNumber = paymentNumber;
    if (paymentMethods) settings.paymentMethods = paymentMethods;
    if (siteName) settings.siteName = siteName;
    if (phone) settings.phone = phone;
    if (address) settings.address = address;
    if (fbLink) settings.fbLink = fbLink;
    await settings.save();
    res.json({ message: 'Settings updated', settings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const Admin = require('../models/Admin');
    const { name, email, currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    if (name) admin.name = name;
    if (email) admin.email = email;

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password required' });
      const isMatch = await admin.comparePassword(currentPassword);
      if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
      admin.password = newPassword;
    }

    await admin.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSettings, updateSettings, updateAdminProfile };
