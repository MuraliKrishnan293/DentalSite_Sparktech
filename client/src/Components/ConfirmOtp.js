import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Styles/Otp.css';

const ConfirmOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    const otpStatus = localStorage.getItem("otpStatus");
    const otpSentTime = localStorage.getItem("otpSentTime");
    const now = new Date().getTime();

    if (!otpStatus || otpStatus !== "sent") {
      alert("No OTP sent. Please register first.");
      navigate("/register");
    } else if (otpSentTime && now - otpSentTime > 60 * 1000) {
      setOtpExpired(true);
      localStorage.removeItem("otpStatus");
      localStorage.removeItem("otpSentTime");
      alert("Your OTP has expired. Please register again.");
      navigate("/register");
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      if (otpSentTime && currentTime - otpSentTime > 60 * 1000) {
        setOtpExpired(true);
        localStorage.removeItem("otpStatus");
        localStorage.removeItem("otpSentTime");
        alert("Your OTP has expired. Please register again.");
        navigate("/register");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dentalsite-sparktech-2.onrender.com/app/verify-otp", {
        email,
        otp,
      });

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("otpSentTime");
        localStorage.removeItem("otpStatus");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="confirm-otp-container">
      {otpExpired ? (
        <div className="otp-expired-message">
          <h2 className="text-danger">Your OTP has expired. Please register again.</h2>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn btn-primary mt-3"
          >
            Register Again
          </button>
        </div>
      ) : (
        <div className="otp-form-container">
          <h1>Confirm OTP for {email}</h1>
          <form onSubmit={handleOtpSubmit} className="otp-form">
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="form-control mb-2"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Verify OTP
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ConfirmOtp;