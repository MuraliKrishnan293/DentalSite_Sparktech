// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const appointmentExists = location.state?.exists;
//   const appointmentTimestamp = location.state?.timestamp;

//   const TIMER_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const [remainingTime, setRemainingTime] = useState(TIMER_DURATION);

//   useEffect(() => {
//     const checkAppointmentExpiry = () => {
//       if (appointmentExists && appointmentTimestamp) {
//         const currentTime = Date.now();
//         const appointmentTime = Number(appointmentTimestamp);

//         // Calculate remaining time
//         const timeLeft = TIMER_DURATION - (currentTime - appointmentTime);

//         if (timeLeft <= 0) {
//             alert("Your appointment has been canceled as Payment was incomplete");
//             localStorage.removeItem("appointment");
//             localStorage.removeItem("appointmentTimestamp");
//           toast.info("Your appointment has been canceled due to time limit", {
//             position: "top-left",
//             autoClose: 5000,
//             theme: "dark",
//           });
//           setRemainingTime(0);
//           navigate("/book"); // Redirect to booking page
//         } else {
//           setRemainingTime(timeLeft);
//         }
//       }
//     };

//     // Check initial state
//     checkAppointmentExpiry();

//     // Set up interval to update remaining time every second
//     const interval = setInterval(() => {
//       checkAppointmentExpiry();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [appointmentExists, appointmentTimestamp, navigate]);

//   // Format remaining time into minutes and seconds
//   const formatTime = (time) => {
//     const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((time % (1000 * 60)) / 1000);
//     return `${minutes}m ${seconds}s`;
//   };

//   return (
//     <div style={{ paddingTop: "100px" }}>
//       <h1>Payment Page</h1>
//       {appointmentExists ? (
//         <div>
//           <h3>Time remaining: {formatTime(remainingTime)}</h3>
//           {/* Add your payment form here */}
//         </div>
//       ) : (
//         <h3>No appointment to process.</h3>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Payment;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appointmentExists = location.state?.exists;
  const appointmentId = location.state?.appointmentId; // Ensure this ID is available in state
  const orderId = location.state?.orderId; // The order ID returned from your backend
  const amount = 50000;
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
          localStorage.removeItem("appointment");
          localStorage.removeItem("appointmentTimestamp");
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

  const handlePayment = async () => {
    const options = {
      key: "rzp_live_yc3AZztwWuIG7a", // Your Razorpay key
      amount: amount, // Amount in paise
      currency: "INR",
      name: "Appointment Payment",
      description: "Payment for your booked appointment",
      order_id: orderId, // The order ID created in your backend
      handler: async function (response) {
        try {
          const paymentResponse = await axios.post(
            "http://localhost:5000/app/payment-callback",
            {
              appointmentId: appointmentId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (paymentResponse.status === 200) {
            toast.success("Payment successful and appointment confirmed!", {
              autoClose: 3000,
            });
            // navigate("/confirmation"); // Navigate to confirmation page
            localStorage.removeItem("rzp_checkout_anon_id");
            localStorage.removeItem("rzp_device_id");
            navigate("/confirmation", {
              state: {
                appointmentId: appointmentId,
                razorpay_payment_id: response.razorpay_payment_id,
                amount: amount,
              },
            });
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment verification failed",
            { autoClose: 3000 }
          );
        }
      },
      prefill: {
        name: "Monish", // Placeholder name
        email: "email", // Placeholder email
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>Payment Page</h1>
      {appointmentExists ? (
        <div>
          <h3>Time remaining: {formatTime(remainingTime)}</h3>
          <button onClick={handlePayment}>Complete Payment</button>
        </div>
      ) : (
        <h3>No appointment to process.</h3>
      )}
      <ToastContainer />
    </div>
  );
};

export default Payment;
