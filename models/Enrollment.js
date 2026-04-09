const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    fatherName: {
      type: String,
      required: true
    },
    motherName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid mobile number"]
    },

    course: {
      type: String,
      enum: ["Industrial Training", "Internship"],
      required: true
    },

    collegeName: {
      type: String,
      required: true
    },
    rollNumber: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },

   payment: {
  type: Number,
  enum: [4499, 999],
  required: true
},
    
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollSchema);