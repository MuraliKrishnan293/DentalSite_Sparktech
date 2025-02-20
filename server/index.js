const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 5000
const User = require("./models/userModel");
const appointmentModel = require('./models/appointmentModel');
const bodyParser = require('body-parser');
const cron = require('node-cron');

app.use(express.json());
app.use(cors({
  origin: 'https://thulasiraam.netlify.app',
  // origin: 'http://localhost:3000'
  origin: "*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, '0.0.0.0', ()=>{
    console.log('App connected to PORT 5000');
});

app.use('/app', require('./routes/userRoutes'));
app.use('/app', require('./routes/appointmentRoutes'));
// app.use('/app', require('./routes/appointmentRoutes'));
app.use('/app', require('./routes/AdminRoutes'));
app.use('/app/', require('./routes/ReviewsRoutes'));

try{
    mongoDBURL = "mongodb+srv://MuraliKrishnan412:MuraliKrishnan412@cluster0.d0ek1az.mongodb.net/DentalSite?retryWrites=true&w=majority";
    mongoose.connect(mongoDBURL)
    .then(() => {
      console.log("Successfully connected to Database");
      // Initial cleanup when the server starts
      // cleanupExpiredUsers();
    
      // Periodic cleanup every 15 minutes (900,000 milliseconds)
      // setInterval(cleanupExpiredUsers, 2 * 60 * 1000); // Adjust interval as needed
      // setInterval(checkExpiredAppointments, 1 * 60 * 1000);
    })
    .catch((e) => {
      console.log(e);
    });
    
    // Function to clean up expired OTPs
    async function cleanupExpiredUsers() {
    try {
      const now = new Date().toISOString();;
      // Find users with expired OTPs and delete them
      await User.deleteMany({ otpExpires: { $lt: now }, isVerified: false });
      console.log("Expired OTPs cleaned up.");
    } catch (err) {
      console.error("Error during cleanup:", err.message);
    }
    }


    //Expired Appointments
    const checkExpiredAppointments = async () => {
      // try {
      //     const now = new Date();
      //     const expiredAppointments = await appointmentModel.find({
      //         status: "pending_payment",
      //         paymentExpiry: { $lt: now }
      //     });

      //     for (let appointment of expiredAppointments) {
      //         appointment.status = "available";
      //         appointment.paymentExpiry = null;
      //         await appointment.save();
      //     }
      //     console.log("Expired appointments cleaned up.");
      // } catch (e) {
      //     console.error("Error checking expired appointments:", e);
      // }

      try {
        const now = new Date().toISOString();;
        
        // Delete appointments that are expired
        const appointmentsToDelete = await appointmentModel.find({
          status: "pending_payment",
          paymentExpiry: { $lt: now }
      });
      
      console.log("Appointments to delete:", appointmentsToDelete);
      
      const result = await appointmentModel.deleteMany({
          status: "pending_payment",
          paymentExpiry: { $lt: now }
      });
    
        console.log(`Deleted ${result.deletedCount} expired appointments.`);
      } catch (e) {
        console.error("Error deleting expired appointments:", e);
      }
  };


    } catch (e) {
      console.log(e);
    }



    cron.schedule('* * * * *', async () => {
      try {
        const currentDateTime = new Date();
        const expiredAppointments = await appointmentModel.find({
          status: "pending_payment",
          paymentExpiry: { $lt: currentDateTime }
        });
    
        if (expiredAppointments.length > 0) {
          for (const appointment of expiredAppointments) {
            await appointmentModel.deleteOne({ _id: appointment._id });
            console.log(`Deleted expired appointment with ID ${appointment._id}`);
          }
        }
      } catch (err) {
        console.error("Error while checking expired appointments:", err);
      }
    });