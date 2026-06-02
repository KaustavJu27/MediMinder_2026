const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const notifications =
    await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

  res.json(notifications);
};

const markAsRead = async (req, res) => {
  const notification =
    await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

  res.json(notification);
};

module.exports = {
  getNotifications,
  markAsRead,
};