const express = require("express");
const router = express.Router();
const moment = require("moment");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const middleware = require("../verify");
const Razorpay = require("razorpay");
const Appointment = require('../models/appointmentModel');
const multer = require("multer");
const path = require('path');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const mimePromise = import('mime');
const crypto = require("crypto");



router.post("/myappointment", async(req, res)=>{
  const {id} = req.user;

  try{
    const appointments = await appointmentModel.find({userId: id});
    res.json(appointments);
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
})

// const { upload, gfs } = require('../routes/FileUpload');

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

// const razorpayInstance = new Razorpay({
//   // key_id: "rzp_live_yc3AZztwWuIG7a",
//   key_id: "rzp_test_z9jZXy28renH1B",
//   key_secret: "U3P6hrmRqqadC3oDGXGJ8xAu"
// });



const razorpayInstance = new Razorpay({
  // key_id: "rzp_live_yc3AZztwWuIG7a",key_id: "rzp_test_k85tp70RzjZ5kf",key_secret: "7hwWnj0VCKoT0PvSCuifxosH"
  key_id: "rzp_live_9UGHfbZkxezXiE",
  key_secret: "5kgS9AsMiaHYPZGNRzVFGE57"
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

    const endTimeDate = moment(`${date} ${startTime}`).add(30, 'minutes'); // Assuming startTime is in HH:mm format
    const endTime = endTimeDate.format('HH:mm');

    const aptmnts = await appointmentModel.find({
      date,
      // time: {
      //   $gte: startTime,
      // },
      location,
      $or: [
        {
          startTime: { $gte: startTime, $lt: endTime } // Appointments starting in the requested time slot
        },
        {
          endTime: { $gt: startTime } // Appointments ending after the requested startTime
        }
      ]
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
      paymentExpiry: new Date(Date.now() + 15 * 60 * 1000).toISOString() // Set expiry time for 15 minutes later
    });

    const options = {
      amount: 20000,  // amount in the smallest currency unit (paise for INR, so 50000 paise = ₹500)
      currency: "INR",
      receipt: `receipt_order_${newAppointment._id}`,
    };

    


    const order = await razorpayInstance.orders.create(options);

    await newAppointment.save();

    // setTimeout(async () => {
    //   const currentAppointment = await appointmentModel.findById(newAppointment._id);
    //   if (currentAppointment && currentAppointment.status === "pending_payment") {
    //     await appointmentModel.deleteOne({ _id: newAppointment._id });
    //     console.log(`Deleted appointment with ID ${newAppointment._id} due to expiration.`);
    //   }
    // }, 15* 60 * 1000);

    

    // setTimeout(async () => {
    //   try {
    //     const currentAppointment = await appointmentModel.findOne({
    //       _id: newAppointment._id,
    //       status: "pending_payment"
    //     });

    //     if (currentAppointment) {
    //       await appointmentModel.deleteOne({ _id: newAppointment._id });
    //       console.log(`Deleted appointment with ID ${newAppointment._id} due to payment expiration.`);
    //     }
    //   } catch (err) {
    //     console.error("Error during scheduled appointment deletion:", err);
    //   }
    // }, 15 * 60 * 1000);

    // Provide the user with a payment link or redirect URL
    return res.status(200).json({ message: "Appointment created successfully", appointment: newAppointment, appointmentId: newAppointment._id, orderId: order.id, 
      amount: options.amount });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.put("/appointments/:id/update-payment", middleware, async (req, res) => {
  const { amountPaid } = req.body;
  const appointmentId = req.params.id;

  try {
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { amountPaid },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({ message: "Payment updated successfully", appointment: updatedAppointment });
  } catch (error) {
    return res.status(500).json({ message: "Error updating payment", error });
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
        "5kgS9AsMiaHYPZGNRzVFGE57"
        // U3P6hrmRqqadC3oDGXGJ8xAu
        )
      .update(body.toString())
      .digest("hex");

      console.log("Payment callback received:", req.body);
console.log("Expected Signature:", expectedSignature);
console.log("Received Signature:", razorpay_signature);


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
    console.error("Error processing payment callback:", e);
    return res.status(500).json(e);
  }
});



router.get('/available-slots', async (req, res) => {
  const { date } = req.query;

  try {
    // Define all possible time slots
    const allSlots = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30'];

    // Count appointments per time slot for the given date and both locations
    const appointments = await Appointment.aggregate([
      { $match: { date } },
      { $group: { _id: { startTime: "$startTime", location: "$location" }, count: { $sum: 1 } } }
    ]);

    const availableSlots = {
      madipakkam: {},
      balajinagar: {},
    };

    // Initialize available slots with counts
    allSlots.forEach(slot => {
      availableSlots.madipakkam[slot] = 3; // Start with 3 available slots
      availableSlots.balajinagar[slot] = 3;   // Start with 3 available slots
    });

    // Adjust counts based on appointments
    appointments.forEach(app => {
      const location = app._id.location;
      const slot = app._id.startTime;

      if (app.count >= 3) {
        // If fully booked, set to 0
        availableSlots[location][slot] = 0;
      } else {
        // Subtract the count from 3 to find available slots
        availableSlots[location][slot] = 3 - app.count;
      }
    });

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error); // Log the error
    res.status(500).json({ message: 'Error fetching available slots', error });
  }
});



router.post("/offline-book", async(req, res)=>{
  const { userId, userInfo, reason, location, date, startTime } = req.body;

  const endTimeDate = moment(`${date} ${startTime}`).add(30, 'minutes'); // Assuming startTime is in HH:mm format
  const endTime = endTimeDate.format('HH:mm');

  // Create a new appointment
  try{
    const aptmnts = await Appointment.find({
      date,
      location,
      // startTime: {
      //   $gte: startTime, // Find appointments that start at or after the requested startTime
      // },
      // // endTime: {
      // //   $lt: endTime, // Find appointments that end before the requested endTime
      // // },

      $or: [
        {
          startTime: { $gte: startTime, $lt: endTime } // Appointments starting in the requested time slot
        },
        {
          endTime: { $gt: startTime } // Appointments ending after the requested startTime
        }
      ]
    });

    if (aptmnts.length >= 3) {
      return res.status(400).json({ message: "This appointment slot is full" });
    }
  const newAppointment = new Appointment({ userId, userInfo, reason, location, date, startTime, status:"confirmed" });

    await newAppointment.save();

    // Update available slots (decrease available slot count)
    // await AvailableSlot.updateOne(
    //   { date, location },
    //   { $inc: { [`slots.${startTime}`]: -1 } }

    // res.json(newAppointment);
    // );

    res.status(201).json({ message: 'Appointment added successfully', newAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding appointment' });
  }
});


// In your routes file
router.put('/appointment/:id', async (req, res) => {
  const { id } = req.params;
  const { visited } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { visited },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update visited status' });
  }
});




// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'Prescription_Files'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });



// router.post("/upload-prescription", upload.single("prescription"), async (req, res) => {
//   const { appointmentId } = req.body;
//   const filePath = req.file ? req.file.path : null;

//   if (!filePath) {
//     return res.status(400).json({ success: false, message: "File not uploaded" });
//   }

//   try {
//     await appointmentModel.findByIdAndUpdate(appointmentId, { prescriptionPath: filePath }, { new: true });
//     res.json({ success: true, message: "Prescription uploaded successfully" });
//   } catch (error) {
//     console.error("Error saving prescription to DB:", error);
//     res.status(500).json({ success: false, message: "Error saving prescription" });
//   }
// });




// Route to upload a prescription file and update the appointment
// router.post('/appointments/:id/upload', upload.single('Prescription_Files'), async (req, res) => {
//   try {
//       const appointmentId = req.params.id;

//       // Log the uploaded file for debugging
//       console.log('Uploaded file:', req.file);

//       // Check if the appointment exists
//       const appointment = await Appointment.findById(appointmentId);
//       if (!appointment) {
//           return res.status(404).json({ message: 'Appointment not found' });
//       }

//       // Check if a file was uploaded
//       if (req.file) {
//           // Update the appointment with the file ID
//           appointment.fileId = req.file.id; // Access the file ID from req.file
//       } else {
//           return res.status(400).json({ message: 'No file uploaded' });
//       }

//       await appointment.save();

//       res.status(200).json({ message: 'File uploaded and appointment updated successfully', appointment });
//   } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ message: 'Error uploading file and updating appointment', error });
//   }
// });

const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadsDir); // Save to uploads directory
  },
  filename: async(req, file, cb) => {
      // // Use the original filename but enforce .pdf extension
      // const name = path.basename(file.originalname, path.extname(file.originalname)); // Get the base name without extension
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) { return cb(new Error('Appointment not found'), false); 
      }
      const userInfo = appointment.userInfo.replace(/\s/g, '_');
      // Replace spaces with underscores
      const originalName = path.basename(file.originalname, path.extname(file.originalname)); // Get the base name without extension cb(null, `${userInfo}_${originalName}.pdf`
      cb(null, `${userInfo}_${originalName}.pdf`); // Save as .pdf
  }
});


const upload = multer({ 
  // dest: uploadsDir, 
  // limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
    storage: storage, // Use the custom storage
    limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif|pdf/; // Allowed file types
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
          return cb(null, true);
      } else {
          cb(new Error('Error: File type not supported!'), false);
      }
  }
});

// POST route for file upload
router.post('/appointments/:id/upload', upload.single('Prescription_Files'), async (req, res) => {
  const appointmentId = req.params.id;
  const file = req.file;

  if (!file) {
      return res.status(400).send('No file uploaded.');
  }

  try {
      // Update the appointment with the file information
      await Appointment.findByIdAndUpdate(appointmentId, {
          fileId: file.filename, // Save the path to the uploaded file
          fileName: file.originalname, // Save the original file name
          fileSize: file.size // Save the file size
      });

      res.status(200).send({ message: 'File uploaded successfully!', appointmentId });
  } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).send('Server error');
  }
});







// router.get('/app/appointments', async (req, res) => {
//   try {
//       const appointments = await Appointment.find(); // Fetch all appointments
//       res.status(200).json(appointments);
//   } catch (error) {
//       console.error('Error fetching appointments:', error);
//       res.status(500).send('Server error');
//   }
// });









// router.get('/appointments/:id/file', async (req, res) => {
//   const appointmentId = req.params.id;

//   console.log('Appointment ID:', appointmentId);

//   if (!mongoose.Types.ObjectId.isValid(appointmentId) || appointmentId.length !== 24) {
//       return res.status(400).send('Invalid appointment ID format');
//   }

//   try {
//       // Retrieve the appointment with the binary PDF data
//       const appointment = await Appointment.findById(appointmentId);

//       if (!appointment || !appointment.fileId) {
//           return res.status(404).send('Appointment or file not found.');
//       }

//       // Set the correct content type and disposition for PDF download
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', `attachment; filename="${appointment.fileId}.pdf"`);

//       // Send the binary data directly to the response
//       res.send(appointment.fileId);
      
//   } catch (error) {
//       console.error('Error fetching appointment:', error);
//       res.status(500).send('Server error');
//   }
// });



router.get('/appointments/:id/file', async (req, res) => {
  const appointmentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).send('Invalid appointment ID format');
  }

  try {
      // Retrieve the appointment record from the database
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment || !appointment.fileId) {
          return res.status(404).send('File not found for this appointment.');
      }

      const filePath = path.join(__dirname, 'uploads', appointment.fileId);

      // Check if the file exists on the server
      fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
              console.error(`File not found at path: ${filePath}`);
              return res.status(404).send('File not found.');
          }

          // Set headers to serve the file as a downloadable PDF
          res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${appointment.fileName}.pdf"`); // Change to 'attachment' if you want a download

          // Stream the file to the response
          const fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);
      });
  } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).send('Server error');
  }
});



router.delete('/appointments/:id/delete', async (req, res) => { 
  const appointmentId = req.params.id; 
  try { const appointment = await Appointment.findById(appointmentId); if (!appointment) { return res.status(404).send('Appointment not found.'); } if (appointment.fileId) { const oldFilePath = path.join(uploadsDir, appointment.fileId); fs.access(oldFilePath, fs.constants.F_OK, (err) => { if (!err) { fs.unlink(oldFilePath, (err) => { if (err) { console.error('Error deleting old file:', err); return res.status(500).send('Error deleting old file.'); } }); } else { console.log('File does not exist, nothing to delete.'); } }); } appointment.fileId = null; appointment.fileName = null; appointment.fileSize = null; await appointment.save(); res.status(200).send({ message: 'File deleted successfully!', appointmentId }); } catch (error) { console.error('Error updating appointment:', error); if (!res.headersSent) { res.status(500).send('Server error'); } } 
          });

router.get('/my-appointments', async (req, res) => {
  const {id} = req.user;
  try {
      const appointments = await Appointment.findById(id);
      res.status(200).json(appointments);
  } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).send('Server error');
  }
});


module.exports = router;