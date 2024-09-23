import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointmentExists = location.state?.exists;
  const appointmentTimestamp = location.state?.timestamp;

  const TIMER_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  const [remainingTime, setRemainingTime] = useState(TIMER_DURATION);
  
  useEffect(() => {
    const checkAppointmentExpiry = () => {
      if (appointmentExists && appointmentTimestamp) {
        const currentTime = Date.now();
        const appointmentTime = Number(appointmentTimestamp);
        
        // Calculate remaining time
        const timeLeft = TIMER_DURATION - (currentTime - appointmentTime);

        if (timeLeft <= 0) {
            alert("Your appointment has been canceled as Payment was incomplete");
          toast.info("Your appointment has been canceled due to time limit", {
            position: "top-left",
            autoClose: 5000,
            theme: "dark",
          });
          setRemainingTime(0);
          navigate("/book"); // Redirect to booking page
        } else {
          setRemainingTime(timeLeft);
        }
      }
    };

    // Check initial state
    checkAppointmentExpiry();

    // Set up interval to update remaining time every second
    const interval = setInterval(() => {
      checkAppointmentExpiry();
    }, 1000);

    return () => clearInterval(interval);
  }, [appointmentExists, appointmentTimestamp, navigate]);

  // Format remaining time into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>Payment Page</h1>
      {appointmentExists ? (
        <div>
          <h3>Time remaining: {formatTime(remainingTime)}</h3>
          {/* Add your payment form here */}
        </div>
      ) : (
        <h3>No appointment to process.</h3>
      )}
      <ToastContainer />
    </div>
  );
};

export default Payment;