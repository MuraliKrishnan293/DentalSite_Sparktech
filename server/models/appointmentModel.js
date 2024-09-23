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
      required: true,
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
    }
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;