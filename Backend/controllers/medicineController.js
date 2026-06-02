// const Medicine = require("../models/Medicine");

// const createMedicine = async (req, res) => {
//   try {
//     const medicine = await Medicine.create(req.body);

//     res.status(201).json(medicine);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   createMedicine,
// };

const Medicine = require("../models/Medicine");

const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create({
  ...req.body,
  user: req.user._id,
});

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMedicines = async (req, res) => {
  try {
const medicines = await Medicine.find({
  user: req.user._id,
});

    res.json(medicines);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id,
});
    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user._id,
  },
  req.body,
  { new: true }
);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
};