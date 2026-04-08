// const express = require("express");
// const router = express.Router();

// const {
//   createEnrollment,
//   getAllEnrollments
// } = require("../controllers/enrollController");

// router.post("/enroll", createEnrollment);
// router.get("/enroll", getAllEnrollments);

// module.exports = router;

const express = require("express");
const router = express.Router();

// Controllers import
const {
  createOrder,
  verifyPaymentAndEnroll,
  getAllEnrollments
} = require("../controllers/enrollController");


// ===============================
// 💳 PAYMENT ROUTES (RAZORPAY)
// ===============================

// Create Razorpay Order
router.post("/create-order", createOrder);

// Verify Payment + Save Enrollment
router.post("/verify-payment", verifyPaymentAndEnroll);


// ===============================
// 📋 ENROLLMENT ROUTES
// ===============================

// Get All Enrollments
router.get("/enrollments", getAllEnrollments);


// ===============================
// 📌 HEALTH CHECK (OPTIONAL)
// ===============================

router.get("/health", (req, res) => {
  res.send("API is running 🚀");
});


module.exports = router;