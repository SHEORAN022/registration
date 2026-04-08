// const Enrollment = require("../models/Enrollment");

// // CREATE
// exports.createEnrollment = async (req, res) => {
//   try {
//     const {
//       name,
//       fatherName,
//       motherName,
//       address,
//       mobile,
//       course,
//       collegeName,
//       rollNumber,
//       semester,
//       payment,
//       token,
//       fullPayment
//     } = req.body;

//     // Basic validation
//     if (!name || !mobile || !course) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing"
//       });
//     }

//     // Payment logic check
//     if (token > payment) {
//       return res.status(400).json({
//         success: false,
//         message: "Token cannot be greater than total payment"
//       });
//     }

//     const enrollment = await Enrollment.create(req.body);

//     res.status(201).json({
//       success: true,
//       message: "Enrollment Created Successfully ✅",
//       data: enrollment
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// // GET ALL
// exports.getAllEnrollments = async (req, res) => {
//   try {
//     const data = await Enrollment.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: data.length,
//       data
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


const Enrollment = require("../models/Enrollment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


// 🔥 1. CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: Number(amount) * 100, // ₹ to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};



// 🔥 2. VERIFY PAYMENT + SAVE ENROLLMENT
exports.verifyPaymentAndEnroll = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData
    } = req.body;

    // ✅ Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed ❌",
      });
    }

    // ✅ Extract form data
    const {
      name,
      fatherName,
      motherName,
      address,
      mobile,
      course,
      collegeName,
      rollNumber,
      semester,
      payment,
      token,
      fullPayment
    } = formData;

    // ✅ Validation
    if (!name || !fatherName || !motherName || !address || !mobile || !course) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    if (Number(token) > Number(payment)) {
      return res.status(400).json({
        success: false,
        message: "Token cannot be greater than total payment",
      });
    }

    // ✅ Save enrollment AFTER payment success
    const enrollment = await Enrollment.create({
      name,
      fatherName,
      motherName,
      address,
      mobile,
      course,
      collegeName,
      rollNumber,
      semester,
      payment,
      token,
      fullPayment,
      paymentStatus: "Paid",
      razorpay_payment_id
    });

    return res.status(200).json({
      success: true,
      message: "Payment Verified & Enrollment Saved ✅",
      data: enrollment,
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};



// 🔥 3. GET ALL ENROLLMENTS
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });

  } catch (error) {
    console.error("Get Enrollments Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};