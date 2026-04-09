// const express = require("express");
// const router = express.Router();

// const {
//   createOrder,
//   verifyPayment,
//   getAllEnrollments
// } = require("../controllers/enrollController");

// // 🔥 Routes
// router.post("/create-order", createOrder);
// router.post("/verify-payment", verifyPayment);
// router.get("/enrollments", getAllEnrollments);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  verifyPayment,
  generateReceipt,
  getAllEnrollments,
} = require("../controllers/enrollController");

router.post("/verify-payment", verifyPayment);
router.get("/receipt/:enrollmentId", generateReceipt);  // PDF download
router.get("/enrollments", getAllEnrollments);

module.exports = router;