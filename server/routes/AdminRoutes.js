const express = require("express");
const router = express.Router();
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const middleware = require("../verify");
const { isAdmin } = require("../checkuser");

router.get("/allusers", middleware, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (e) {
    res.json(e);
  }
});

router.get("/allappfilter", middleware, isAdmin, async (req, res) => {
  try{
  const appointments = await appointmentModel.find({}).sort({date:-1});
  return res.status(200).json({"Appointments": appointments});
  }
  catch(e) {
    return res.status(500).json({message: e});
  }
});

router.get("/allappointments", middleware, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    console.log(`Currently fetching appointments of page ${page}, skipping ${skip}, limit ${limit}`);
    const appointments = await appointmentModel.find({}).sort({date:-1})
    .skip(skip).limit(limit);
    ;

    const totalAppointments = await appointmentModel.countDocuments();
    const totalPages = Math.ceil(totalAppointments/limit);
    // console.log("Appointments found:", appointments);
    return res.json({appointments,
        currentPage: page,
        totalPages
    });
    
  } catch (e) {
    return res.status(400).json(e);
  }
});



router.get("/get-last-receipt", middleware, isAdmin, async (req, res) => {
  try {
    const lastPayment = await Payment.findOne().sort({ receipt: -1 });
    res.json({ lastReceipt: lastPayment ? lastPayment.receipt : 0 });
  } catch (error) {
    res.status(500).json({ error: "Error fetching receipt" });
  }
});



router.put("/updateappointment/:id", middleware, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;   // Get the appointment ID from URL
      const { patientName } = req.body; // Get the new patient name from the request body
  
      // Validate that patientName is provided
      if (!patientName) {
        return res.status(400).json({ message: "Patient name is required" });
      }
  
      // Update the patient name for the specific appointment
      const updatedAppointment = await appointmentModel.findByIdAndUpdate(
        id,
        { patientName }, // Only update the patientName field
        { new: true } // Return the updated document
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
  
      // Respond with the updated appointment
      return res.json(updatedAppointment);
  
    } catch (error) {
      console.error("Error updating appointment:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;