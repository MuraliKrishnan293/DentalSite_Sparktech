const pass = "xtnu ltwd nmie oohh";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another service
  auth: {
    user: 'muralikrishnanvijayalakshmi@gmail.com',
    pass: pass
  }
});

// Function to send an email
const EmailHelper = (to, subject, text) => {
    const mailOptions = {
      from: 'muralikrishnanvijayalakshmi@gmail.com', // Replace with your email address
      to, // Recipient email address
      subject, // Subject of the email
      text // Body of the email in plain text
    };
  
    // Send email and return the result
    return transporter.sendMail(mailOptions);
  };

module.exports = { EmailHelper };
