const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
  role: {
    type: String,
    enum: [
        // 'admin',
         'doctor', 'user'],
    default: 'user',
  },
  phoneNumber: {
    type: String,
    required: [true, "phonenumber is required"],
    unique: true
  },
  otp: {
    type: String, // Stores the OTP
    default: null,
  },
  otpExpires: {
    type: Date, // Stores the OTP expiration date
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false, // Indicates if the email is verified
  }
},{timestamps: true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;