const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  receiptNumber: Number,
  customerName: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

const Receipt = mongoose.model("Receipt", receiptSchema);