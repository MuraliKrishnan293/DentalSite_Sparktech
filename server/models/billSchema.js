// const mongoose = require("mongoose");
// const User = require("./userModel");

// const billSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   appointmentId: String,
//   paymentId: String,
//   amount: Number,
//   name: String,
//   date: String,
//   time: String,
//   location: String,
//   bookdate: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Bill = mongoose.model("Bill", billSchema);
// module.exports = Bill;



const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  receipt: {
    type: Number,
    required: true,
    unique: true, // Ensures no duplicate receipt IDs
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  appliedAmount: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;