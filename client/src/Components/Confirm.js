import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const paymentId = location.state?.razorpay_payment_id;
  const amount = location.state?.amount;

  return (
    <div style={{ paddingTop: "100px", textAlign: "center" }}>
      <h1>Payment Successful!</h1>
      <h3>Your appointment is confirmed</h3>
      <div>
        <p>Appointment ID: {appointmentId}</p>
        <p>Payment ID: {paymentId}</p>
        <p>Amount Paid: ₹{amount / 100}</p>
      </div>
      <button onClick={() => window.print()}>Print Receipt</button>
    </div>
  );
};

export default Confirmation;