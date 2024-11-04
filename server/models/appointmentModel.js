// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//       enum: ['vadapalani', 'perambur']
//     },
//     userInfo: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//       default: "pending",
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const appointmentModel = mongoose.model("appointments", appointmentSchema);

// module.exports = appointmentModel;



const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    reason: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
      enum: ['vadapalani', 'perambur']
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending_payment', 'confirmed'],
      default: 'pending_payment',
    },
    startTime: {
      type: String,
      required: true,
    },
    // endTime: { // New field for end time
    //   type: String,
    //   required: false,
    // },
    paymentExpiry: { // New field for payment expiration
      type: Date,
      required: false,
    },
    visited: { // New field to track the patient's visit status
      type: Boolean,
      required: true,
      default: false,
    },
    prescriptionPath: { // New field for storing the prescription file path
      type: String,
      required: false,
      default: ""
    },
    fileId: {  // This can be the filename or path
      type: String,
      required: false,
      default: null
  },
  fileName: {  // Optional: Store the original file name
      type: String,
      required: false,
      default: null
  },
  fileSize: {  // Optional: Store the size of the file
      type: Number,
      required: false,
      default: null
  }
},
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;