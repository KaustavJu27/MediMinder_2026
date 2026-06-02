const Medicine = require("../models/Medicine");

const getDashboardStats = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    const today = new Date();

    const totalMedicines = medicines.length;

    const expired = medicines.filter(
      (medicine) => new Date(medicine.expiryDate) < today
    ).length;

    const expiringSoon = medicines.filter((medicine) => {
      const diff =
        (new Date(medicine.expiryDate) - today) /
        (1000 * 60 * 60 * 24);

      return diff >= 0 && diff <= 30;
    }).length;

    const active = totalMedicines - expired;

    res.json({
      totalMedicines,
      expired,
      expiringSoon,
      active,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};