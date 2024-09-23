const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const SECRETKEY = "ABCDEFG";
const crypto = require("crypto");
const { EmailHelper } = require("./EmailHelper");

router.post("/register", async (req, res) => {
  const { username, email, password, role, phoneNumber } = req.body;
  try {
    if (!username || !email || !password || !role ||!phoneNumber) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = crypto.randomInt(100000, 999999).toString();
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        otp,
        otpExpires: Date.now() + 1 * 60 * 1000
      });

      const subject = "Your OTP Code";
      const text = `Your OTP code is ${otp}. It will expire in 1 hour.`;
      await EmailHelper(email, subject, text);
      const newUser = await user.save();



      setTimeout(async () => {
        const currentUser = await User.findById(newUser._id);
        if (currentUser && !currentUser.isVerified) {
          await User.deleteOne({ _id: newUser._id });
          console.log(`Deleted user with ID ${newUser._id} due to OTP expiration.`);
        }
      }, 1 * 60 * 1000);

      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      await User.deleteOne({ email });
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authToken = jwt.sign({ id: user.id }, SECRETKEY, {
      expiresIn: "30d",
    });

    res
      .status(200)
      .json({
        success: true,
        authToken: authToken,
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;