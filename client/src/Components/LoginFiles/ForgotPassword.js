// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [step, setStep] = useState(1);

//   const toastOptions = {
//     position: "top-left",
//     autoClose: 5000,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const nav = useNavigate();

//   // Step 1: Request OTP
//   const handleRequestOtp = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/app/forgot-password", {
//         email: email,
//       });
//       if (res.status === 200) {
//         toast.success("OTP sent to email", toastOptions);
//         setStep(2);
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP. Please try again.", toastOptions);
//     }
//   };

//   // Step 2: Verify OTP and Reset Password
//   const handleResetPassword = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/app/reset-password", {
//         email: email,
//         otp: otp,
//         newPassword: newPassword,
//       });
//       if (res.status === 200) {
//         toast.success("Password reset successfully", toastOptions);
//         nav("/login");
//       }
//     } catch (err) {
//         alert(err);
//       toast.error("Failed to reset password. Please check the OTP or try again.", toastOptions);
//     }
//   };

//   return (
//     <div style={{marginTop: "200px"}} className="forgot-password-container">
//       <h2 className="forgot-password-title">Forgot Password</h2>
//       {step === 1 && (
//         <div className="d-flex justify-content-center p-5 flex-column text-center">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button onClick={handleRequestOtp} className="btn btn-primary">
//             Send OTP
//           </button>
//         </div>
//       )}
//       {step === 2 && (
//         <div className="d-flex justify-content-center p-5 flex-column text-center">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             className="form-control"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <button onClick={handleResetPassword} className="btn btn-success">
//             Reset Password
//           </button>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default ForgotPassword;



// // import React, { useState } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useNavigate } from "react-router-dom";
// // import "./ForgotPassword.css";

// // const ForgotPassword = () => {
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [step, setStep] = useState(1);

// //   const toastOptions = {
// //     position: "top-left",
// //     autoClose: 5000,
// //     closeOnClick: true,
// //     pauseOnHover: true,
// //     draggable: true,
// //     theme: "dark",
// //   };

// //   const navigate = useNavigate();

// //   // Step 1: Request OTP
// //   const handleRequestOtp = async () => {
// //     try {
// //       const res = await axios.post("http://localhost:5000/app/forgot-password", { email });
// //       if (res.status === 200) {
// //         toast.success("OTP sent to email", toastOptions);
// //         setStep(2);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to send OTP. Please try again.", toastOptions);
// //     }
// //   };

// //   // Step 2: Verify OTP and Reset Password
// //   const handleResetPassword = async () => {
// //     try {
// //       const res = await axios.post("http://localhost:5000/app/reset-password", {
// //         email,
// //         otp,
// //         newPassword,
// //       });
// //       if (res.status === 200) {
// //         toast.success("Password reset successfully", toastOptions);
// //         navigate("/login");
// //       }
// //     } catch (err) {
// //       toast.error("Failed to reset password. Please check the OTP or try again.", toastOptions);
// //     }
// //   };

// //   return (
// //     <div style={{marginTop: "200px"}} className="forgot-password-container">
// //       <h2 className="forgot-password-title">Forgot Password</h2>
// //       {step === 1 && (
// //         <div className="d-flex flex-column align-items-center">
// //           <div className="input-group mb-3 w-100">
// //             <input
// //               type="email"
// //               className="form-control"
// //               placeholder="Enter your email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button onClick={handleRequestOtp} className="btn btn-primary mt-3">
// //             Send OTP
// //           </button>
// //         </div>
// //       )}
// //       {step === 2 && (
// //         <div className="d-flex flex-column align-items-center">
// //           <div className="input-group mb-3 w-100">
// //             <input
// //               type="text"
// //               className="form-control"
// //               placeholder="Enter OTP"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="input-group mb-3 w-100">
// //             <input
// //               type="password"
// //               className="form-control"
// //               placeholder="New Password"
// //               value={newPassword}
// //               onChange={(e) => setNewPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button onClick={handleResetPassword} className="btn btn-success mt-3">
// //             Reset Password
// //           </button>
// //         </div>
// //       )}
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// export default ForgotPassword;



import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleRequestOtp = async () => {
    setLoading(true); // Disable the button
    try {
      const res = await axios.post("http://localhost:5000/app/forgot-password", { email });
      if (res.status === 200) {
        toast.success("OTP sent to email", toastOptions);
        setStep(2);
      }
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.", toastOptions);
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/app/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (res.status === 200) {
        toast.success("Password reset successfully", toastOptions);
        navigate("/login");
      }
    } catch (err) {
      toast.error("Failed to reset password. Please check the OTP or try again.", toastOptions);
    }
  };

  return (
    <div className="bgf1">
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      {step === 1 && (
        <div className="d-flex flex-column align-items-center">
          <div className="input-group mb-3 w-100">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handleRequestOtp}
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="d-flex flex-column align-items-center">
          <div className="input-group mb-3 w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3 w-100">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={handleResetPassword} className="btn btn-success mt-3">
            Reset Password
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
    </div>
  );
};

export default ForgotPassword;