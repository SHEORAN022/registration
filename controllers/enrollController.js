
// // const axios = require("axios");
// // const Enrollment = require("../models/Enrollment");

// // // ========================================
// // // 🔥 1. CREATE ORDER (CASHFREE PRODUCTION)
// // // ========================================
// // exports.createOrder = async (req, res) => {
// //   try {
// //     const { payment, formData } = req.body;

// //     // ✅ Validate payment amount
// //     if (![999, 4499].includes(Number(payment))) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid payment amount ❌",
// //       });
// //     }

// //     // ✅ Validate required fields
// //     if (!formData?.name || !formData?.mobile) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Name & Mobile required ❌",
// //       });
// //     }

// //     // ✅ Unique order ID
// //     const orderId = "order_" + Date.now();

// //     // ✅ Cashfree API call (PRODUCTION)
// //     const response = await axios.post(
// //       "https://api.cashfree.com/pg/orders",
// //       {
// //         order_id: orderId,
// //         order_amount: Number(payment),
// //         order_currency: "INR",
// //         customer_details: {
// //           customer_id: "cust_" + Date.now(),
// //           customer_name: formData.name,
// //           customer_phone: formData.mobile,
// //           customer_email: formData.email || "noemail@example.com",
// //         },

// //       },
// //       {
// //         headers: {
// //           "x-client-id": process.env.CASHFREE_APP_ID,
// //           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
// //           "x-api-version": "2023-08-01",
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       order: response.data, // contains order_id, payment_session_id
// //     });

// //   } catch (error) {
// //     console.error("Cashfree Create Error:", error.response?.data || error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Order creation failed ❌",
// //     });
// //   }
// // };


// // // ========================================
// // // 🔥 2. VERIFY PAYMENT + SAVE ENROLLMENT
// // // ========================================
// // exports.verifyPayment = async (req, res) => {
// //   try {
// //     const { order_id, formData } = req.body;

// //     if (!order_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Order ID required ❌",
// //       });
// //     }

// //     // ✅ Cashfree se order status fetch karo
// //     const response = await axios.get(
// //       `https://api.cashfree.com/pg/orders/${order_id}`,
// //       {
// //         headers: {
// //           "x-client-id": process.env.CASHFREE_APP_ID,
// //           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
// //           "x-api-version": "2023-08-01",
// //         },
// //       }
// //     );

// //     const order = response.data;

// //     // ❌ Payment complete nahi hui
// //     if (order.order_status !== "PAID") {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Payment not completed. Status: ${order.order_status} ❌`,
// //       });
// //     }

// //     // ✅ Check if enrollment already exists (duplicate prevention)
// //     const existingEnrollment = await Enrollment.findOne({
// //       mobile: formData.mobile,
// //       rollNumber: formData.rollNumber,
// //     });

// //     if (existingEnrollment) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "Enrollment already exists ✅",
// //         data: existingEnrollment,
// //       });
// //     }

// //     // ✅ Save enrollment
// //     const enrollment = await Enrollment.create({
// //       name: formData.name,
// //       fatherName: formData.fatherName,
// //       motherName: formData.motherName,
// //       address: formData.address,
// //       mobile: formData.mobile,
// //       course: formData.course,
// //       collegeName: formData.collegeName,
// //       rollNumber: formData.rollNumber,
// //       semester: formData.semester,
// //       payment: Number(formData.payment),
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       message: "Payment verified & Enrollment saved ✅",
// //       data: enrollment,
// //     });

// //   } catch (error) {
// //     console.error("Verify Error:", error.response?.data || error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Verification failed ❌",
// //     });
// //   }
// // };


// // // ========================================
// // // 🔥 3. GET ALL ENROLLMENTS
// // // ========================================
// // exports.getAllEnrollments = async (req, res) => {
// //   try {
// //     const data = await Enrollment.find().sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       count: data.length,
// //       data,
// //     });

// //   } catch (error) {
// //     console.error("Fetch Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error ❌",
// //     });
// //   }
// // };


// const axios = require("axios");
// const Enrollment = require("../models/Enrollment");

// // ========================================
// // 🔥 1. CREATE ORDER (CASHFREE PRODUCTION)
// // ========================================
// exports.createOrder = async (req, res) => {
//   try {
//     const { payment, formData } = req.body;

//     // ✅ Validate payment amount
//     if (![999, 4499].includes(Number(payment))) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment amount ❌",
//       });
//     }

//     // ✅ Validate required fields
//     if (!formData?.name || !formData?.mobile) {
//       return res.status(400).json({
//         success: false,
//         message: "Name & Mobile required ❌",
//       });
//     }

//     // ✅ Unique order ID
//     const orderId = "order_" + Date.now();

//     // ✅ Cashfree API call (PRODUCTION)
//     const response = await axios.post(
//       "https://api.cashfree.com/pg/orders",
//       {
//         order_id: orderId,
//         order_amount: Number(payment),
//         order_currency: "INR",
//         customer_details: {
//           customer_id: "cust_" + Date.now(),
//           customer_name: formData.name,
//           customer_phone: formData.mobile,
//           customer_email: formData.email || "noemail@example.com",
//         },

//       },
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       order: response.data, // contains order_id, payment_session_id
//     });

//   } catch (error) {
//     console.error("Cashfree Create Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Order creation failed ❌",
//     });
//   }
// };


// // ========================================
// // 🔥 2. VERIFY PAYMENT + SAVE ENROLLMENT
// // ========================================
// exports.verifyPayment = async (req, res) => {
//   try {
//     const { order_id, formData } = req.body;

//     if (!order_id) {
//       return res.status(400).json({
//         success: false,
//         message: "Order ID required ❌",
//       });
//     }

//     // ✅ Cashfree se order status fetch karo
//     const response = await axios.get(
//       `https://api.cashfree.com/pg/orders/${order_id}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//           "x-api-version": "2023-08-01",
//         },
//       }
//     );

//     const order = response.data;

//     // ❌ Payment complete nahi hui
//     if (order.order_status !== "PAID") {
//       return res.status(400).json({
//         success: false,
//         message: `Payment not completed. Status: ${order.order_status} ❌`,
//       });
//     }

//     // ✅ Check if enrollment already exists (duplicate prevention)
//     const existingEnrollment = await Enrollment.findOne({
//       mobile: formData.mobile,
//       rollNumber: formData.rollNumber,
//     });

//     if (existingEnrollment) {
//       return res.status(200).json({
//         success: true,
//         message: "Enrollment already exists ✅",
//         data: existingEnrollment,
//       });
//     }

//     // ✅ Save enrollment
//     const enrollment = await Enrollment.create({
//       name: formData.name,
//       fatherName: formData.fatherName,
//       motherName: formData.motherName,
//       address: formData.address,
//       mobile: formData.mobile,
//       course: formData.course,
//       collegeName: formData.collegeName,
//       rollNumber: formData.rollNumber,
//       semester: formData.semester,
//       payment: Number(formData.payment),
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified & Enrollment saved ✅",
//       data: enrollment,
//     });

//   } catch (error) {
//     console.error("Verify Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Verification failed ❌",
//     });
//   }
// };


// // ========================================
// // 🔥 3. GET ALL ENROLLMENTS
// // ========================================
// exports.getAllEnrollments = async (req, res) => {
//   try {
//     const data = await Enrollment.find().sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });

//   } catch (error) {
//     console.error("Fetch Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error ❌",
//     });
//   }
// };



const axios = require("axios");
const PDFDocument = require("pdfkit");
const Enrollment = require("../models/Enrollment");

// ========================================
// 🔥 1. VERIFY PAYMENT + SAVE ENROLLMENT
// ========================================
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id, formData } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: "Order ID required ❌" });
    }

    // ✅ Cashfree se order status fetch karo
    const response = await axios.get(
      `https://api.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    const order = response.data;

    // ❌ Payment complete nahi hui
    if (order.order_status !== "PAID") {
      return res.status(400).json({
        success: false,
        message: `Payment not completed. Status: ${order.order_status} ❌`,
      });
    }

    // ✅ Duplicate check
    const existingEnrollment = await Enrollment.findOne({
      mobile: formData.mobile,
      rollNumber: formData.rollNumber,
    });

    const enrollment = existingEnrollment || await Enrollment.create({
      name: formData.name,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      address: formData.address,
      mobile: formData.mobile,
      course: formData.course,
      collegeName: formData.collegeName,
      rollNumber: formData.rollNumber,
      semester: formData.semester,
      payment: Number(formData.payment),
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified & Enrollment saved ✅",
      data: enrollment,
    });

  } catch (error) {
    console.error("Verify Error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Verification failed ❌" });
  }
};


// ========================================
// 🔥 2. GENERATE PDF RECEIPT
// ========================================
exports.generateReceipt = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found ❌" });
    }

    // ✅ PDF banao
    const doc = new PDFDocument({ margin: 50, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${enrollment.name.replace(/\s+/g, "_")}.pdf`
    );

    doc.pipe(res);

    const primaryColor = "#4F46E5";
    const darkColor = "#111827";
    const grayColor = "#6B7280";
    const lightGray = "#F3F4F6";

    // ── Header ──────────────────────────────────────────────────────────────
    doc.rect(0, 0, 595, 100).fill(primaryColor);

    doc.fillColor("#ffffff")
      .fontSize(24).font("Helvetica-Bold")
      .text("BeeCode", 50, 30);

    doc.fontSize(10).font("Helvetica")
      .text("Infyle Technologies Campus | IET Bhaddal", 50, 60)
      .text("www.beecode.in", 50, 75);

    doc.fillColor("#ffffff").fontSize(14).font("Helvetica-Bold")
      .text("ENROLLMENT RECEIPT", 350, 40, { align: "right", width: 195 });

    doc.fillColor("rgba(255,255,255,0.7)").fontSize(9).font("Helvetica")
      .text(`Receipt ID: ${enrollment._id}`, 350, 65, { align: "right", width: 195 })
      .text(`Date: ${new Date(enrollment.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`, 350, 80, { align: "right", width: 195 });

    // ── Payment Badge ────────────────────────────────────────────────────────
    const badgeColor = enrollment.payment === 4499 ? "#10B981" : "#F59E0B";
    const badgeLabel = enrollment.payment === 4499 ? "FULL PAYMENT" : "TOKEN PAYMENT";

    doc.roundedRect(50, 115, 495, 55, 8).fill(lightGray);

    doc.fillColor(darkColor).fontSize(11).font("Helvetica-Bold")
      .text("Amount Paid", 70, 128);

    doc.fillColor(primaryColor).fontSize(22).font("Helvetica-Bold")
      .text(`₹${enrollment.payment.toLocaleString("en-IN")}`, 70, 143);

    doc.roundedRect(380, 124, 140, 22, 4).fill(badgeColor);
    doc.fillColor("#ffffff").fontSize(9).font("Helvetica-Bold")
      .text(badgeLabel, 380, 129, { width: 140, align: "center" });

    // ── Section Helper ───────────────────────────────────────────────────────
    let yPos = 190;

    const sectionTitle = (title, icon) => {
      doc.fillColor(primaryColor).fontSize(11).font("Helvetica-Bold")
        .text(`${icon}  ${title}`, 50, yPos);
      doc.moveTo(50, yPos + 16).lineTo(545, yPos + 16).strokeColor("#E5E7EB").lineWidth(1).stroke();
      yPos += 24;
    };

    const fieldRow = (label, value) => {
      doc.fillColor(grayColor).fontSize(9).font("Helvetica")
        .text(label, 50, yPos, { width: 150 });
      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold")
        .text(value || "—", 210, yPos, { width: 335 });
      yPos += 20;
    };

    // ── Personal Details ─────────────────────────────────────────────────────
    sectionTitle("Personal Details", "👤");
    fieldRow("Full Name", enrollment.name);
    fieldRow("Father's Name", enrollment.fatherName);
    fieldRow("Mother's Name", enrollment.motherName);
    fieldRow("Mobile Number", enrollment.mobile);
    fieldRow("Address", enrollment.address);

    yPos += 10;

    // ── Course Details ───────────────────────────────────────────────────────
    sectionTitle("Course Details", "📚");
    fieldRow("Course Type", enrollment.course);

    yPos += 10;

    // ── College Details ──────────────────────────────────────────────────────
    sectionTitle("College Details", "🏫");
    fieldRow("College Name", enrollment.collegeName);
    fieldRow("Roll Number", enrollment.rollNumber);
    fieldRow("Semester", enrollment.semester);

    yPos += 20;

    // ── Payment Summary Box ──────────────────────────────────────────────────
    doc.roundedRect(50, yPos, 495, 70, 8).fill(lightGray);

    doc.fillColor(darkColor).fontSize(11).font("Helvetica-Bold")
      .text("Payment Summary", 70, yPos + 12);

    doc.fillColor(grayColor).fontSize(9).font("Helvetica")
      .text("Payment Type:", 70, yPos + 32)
      .text("Amount Paid:", 70, yPos + 48);

    doc.fillColor(darkColor).fontSize(9).font("Helvetica-Bold")
      .text(enrollment.payment === 4499 ? "Full Payment" : "Token Payment", 210, yPos + 32)
      .text(`₹${enrollment.payment.toLocaleString("en-IN")}`, 210, yPos + 48);

    if (enrollment.payment === 999) {
      doc.fillColor(grayColor).fontSize(9).font("Helvetica")
        .text("Remaining Balance:", 70, yPos + 64);
      doc.fillColor("#EF4444").fontSize(9).font("Helvetica-Bold")
        .text("₹3,500", 210, yPos + 64);
      yPos += 10;
    }

    yPos += 90;

    // ── Footer ───────────────────────────────────────────────────────────────
    doc.rect(0, 770, 595, 72).fill(primaryColor);

    doc.fillColor("#ffffff").fontSize(9).font("Helvetica")
      .text("This is a computer-generated receipt and does not require a signature.", 50, 780, { align: "center", width: 495 })
      .text("For support: support@beecode.in  |  BeeCode | Infyle Technologies", 50, 796, { align: "center", width: 495 });

    doc.fillColor("rgba(255,255,255,0.6)").fontSize(8)
      .text(`Generated on ${new Date().toLocaleString("en-IN")}`, 50, 812, { align: "center", width: 495 });

    doc.end();

  } catch (error) {
    console.error("PDF Error:", error);
    return res.status(500).json({ success: false, message: "PDF generation failed ❌" });
  }
};


// ========================================
// 🔥 3. GET ALL ENROLLMENTS
// ========================================
exports.getAllEnrollments = async (req, res) => {
  try {
    const data = await Enrollment.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ success: false, message: "Server error ❌" });
  }
};