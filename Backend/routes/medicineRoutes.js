// const express = require("express");
// const router = express.Router();

// const {
//   createMedicine,
// } = require("../controllers/medicineController");

// router.post("/", createMedicine);

// module.exports = router;


const express = require("express");
const router = express.Router();


const {
  createMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
} = require("../controllers/medicineController");

const { protect } = require("../middleware/authMiddleware");

// router.post("/", createMedicine);
// router.get("/", getMedicines);
// router.put("/:id", updateMedicine);
// router.delete("/:id", deleteMedicine);

router.post("/", protect, createMedicine);
router.get("/", protect, getMedicines);
router.put("/:id", protect, updateMedicine);
router.delete("/:id", protect, deleteMedicine);

module.exports = router;