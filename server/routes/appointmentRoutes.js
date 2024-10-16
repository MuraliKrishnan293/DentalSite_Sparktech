const express = require("express");
const router = express.Router();
const moment = require("moment");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const middleware = require("../verify");
const Razorpay = require("razorpay");

// router.post("/book", middleware, async (req, res) => {
//   const { date, startTime, endTime, location } = req.body;



//   try{const usernames = await userModel.findById(req.user.id);

//     const existingAppointment = await appointmentModel.findOne({
//         userId: req.user.id,
//         date,
//       });
  
//       if (existingAppointment) {
//         return res.status(400).json({ message: "You already have an appointment booked for today" });
//       }

//   const aptmnts = await appointmentModel.find({
//     date,
//     time: {
//       $gte: startTime,
//       $lt: endTime,

//     },
//     location,
//   });

//   if (aptmnts.length >= 3) {
//     return res.status(400).json({ message: "This appointment slot is full" });
//   }

//   const newAppointment = new appointmentModel({
//     date,
//     time: startTime,
//     status: "pending",
//     location,
//     userId: req.user.id,
//     userInfo: usernames.username
//   });
//   await newAppointment.save();

//   return res.status(200).json("Success in adding Appointment");}
// catch(e){
//     return res.json(e);
// }
// })

// module.exports = router;

const razorpayInstance = new Razorpay({
  key_id: "rzp_live_yc3AZztwWuIG7a",
  key_secret: "U3P6hrmRqqadC3oDGXGJ8xAu"
});



router.post("/book", middleware, async (req, res) => {
  const { date, startTime, endTime, location, reason } = req.body;

  try {
    const usernames = await userModel.findById(req.user.id);
    
    const existingAppointment = await appointmentModel.findOne({
      userId: req.user.id,
      date,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "You already have an appointment booked for today" });
    }

    const aptmnts = await appointmentModel.find({
      date,
      time: {
        $gte: startTime,
        $lt: endTime,
      },
      location,
    });

    if (aptmnts.length >= 3) {
      return res.status(400).json({ message: "This appointment slot is full" });
    }

    const newAppointment = new appointmentModel({
      date,
      reason,
      startTime,
      // endTime,
      status: "pending_payment", // Updated status
      location,
      userId: req.user.id,
      userInfo: usernames.username,
      paymentExpiry: new Date(Date.now() + 15 * 60 * 1000) // Set expiry time for 15 minutes later
    });

    const options = {
      amount: 50000,  // amount in the smallest currency unit (paise for INR, so 50000 paise = ₹500)
      currency: "INR",
      receipt: `receipt_order_${newAppointment._id}`,
    };

    const order = await razorpayInstance.orders.create(options);

    await newAppointment.save();

    setTimeout(async () => {
      const currentAppointment = await appointmentModel.findById(newAppointment._id);
      if (currentAppointment && currentAppointment.status === "pending_payment") {
        await appointmentModel.deleteOne({ _id: newAppointment._id });
        console.log(`Deleted appointment with ID ${newAppointment._id} due to expiration.`);
      }
    }, 15* 60 * 1000);

    // Provide the user with a payment link or redirect URL
    return res.status(200).json({ message: "Appointment created successfully", appointment: newAppointment, orderId: order.id, 
      amount: options.amount });
  } catch (e) {
    return res.status(500).json(e);
  }
});



router.post("/payment-callback", async (req, res) => {
  const { appointmentId, razorpay_payment_id, razorpay_order_id, razorpay_signature, paymentStatus } = req.body;

  try {
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", 
        U3P6hrmRqqadC3oDGXGJ8xAu
        )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      appointment.status = "confirmed";
      appointment.paymentExpiry = null; // Clear the expiry time
      await appointment.save();
      return res.status(200).json({ message: "Payment successful and appointment confirmed" });
    } else {
      appointment.status = "payment_failed";
      appointment.paymentExpiry = null; // Clear the expiry time
      await appointment.save();
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});






module.exports = router;