const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      default: "",
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    reminderTime: {
      type: String,
      default: "",
    },

    dosageInstructions: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);