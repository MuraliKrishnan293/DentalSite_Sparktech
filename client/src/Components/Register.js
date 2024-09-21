// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const navigate = useNavigate();
//   const [issubmitted, setIsSubmitted] = useState(false);
//   const [otp, setOtp] = useState("");

//   const toastOptions = {
//     position: "top-left",
//     autoClose: 5000,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   const handleValidation = () => {
//     console.log({ username, email, password, role, phoneNumber });
//     if (username === "" && username.length < 4) {
//       toast.error("Name must be at least 4 characters", toastOptions);
//       return false;
//     } else if (email === "") {
//       toast.error("Email is required", toastOptions);
//       return false;
//     } else if (password === "" && password.length < 8) {
//       toast.error("Password must be at least 8 characters", toastOptions);
//       return false;
//     }
//     else if (phoneNumber === "" && phoneNumber.length !==10) {
//       toast.error("PhoneNumber must be 10 digits", toastOptions);
//       return false;
//     }
//     return true;
//     // handleSubmit();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (handleValidation()) {
//         const req = await axios.post("http://localhost:5000/app/register", {
//           username: username,
//           email: email,
//           password: password,
//           role: role,
//           phoneNumber: phoneNumber
//         });
//         if (req.status === 200) {
//           toast.success("Registered Successfully", toastOptions);
//           setIsSubmitted(true);
//         }
//         // navigate("/login");
//       }
//     } catch (error) {
//       console.log(error.response.data);
//       if (error.response) {
//         // const errorMessage = error.response.data;
//         if (error.response.data === "Username Exists") {
//           toast.error("Username already exists", toastOptions);
//         } else if (error.response.data === "Email Exists") {
//           toast.error("Email already exists", toastOptions);
//         }
//         if (error.response.data === "User already exists") {
//           toast.error("Username already exists", toastOptions);
//         }
//         // else if()
//         else {
//           toast.error(
//             "Registration failed.",
//             toastOptions
//           );
//         }
//       } else {
//         toast.error(
//           "Registration failed.",
//           toastOptions
//         );
//       }
//     }
//   };

//   const handleotp = async(e)=>{
//     e.preventDefault();
//     try{
//       const req = await axios.post("http://localhost:5000/app/verify-otp", {
//         email: email,
//         otp: otp
//       });
//       if(req.status === 200){
//         toast.success("OTP verified successfully", toastOptions);
//         navigate("/login");
//       }
//     }catch(error){
//       setIsSubmitted(false);
//       console.log(error.response.data);
//       if(error.response){
//         toast.error("Invalid OTP", toastOptions);
//         if(error.response.data === "Invalid OTP"){
//           toast.error("Invalid OTP", toastOptions);
//         }
//         else{
//           toast.error("Verification failed.", toastOptions);
//         }
//       }else{
//         toast.error("Verification failed.", toastOptions);
//       }
//     }
//   }

//   const handleGoBack = () => {
//     setIsSubmitted(false);
//   };

//   return (<>
//     {!issubmitted ? (<div className="register d-flex justify-content-center align-items-center flex-column">
//       <div className="container registration d-flex justify-content-center align-items-center flex-column">
//         <h1 className="fw-bold text-center p-4">Register Form</h1>
//         <form className="form" onSubmit={handleSubmit}>
//           <div className="d-flex flex-row form-group">
//             <h6 className="fw-bold mt-2 p-1 mx-2">Username:</h6>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <div className="d-flex mt-3 flex-row form-group">
//             <h6 className="fw-bold mt-2 p-1 mx-2">Email:</h6>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <div className="d-flex mt-3 mb-5 flex-row form-group">
//             <h6 className="fw-bold mt-2 p-1 mx-2">Password:</h6>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//             />
//           </div>
//           <div className="d-flex mt-3 mb-5 flex-row form-group">
//             <h6 className="fw-bold mt-2 p-1 mx-2">Role:</h6>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="form-control"
//             >
//               <option value="user">User</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </div>
//           <div className="d-flex mt-3 mb-5 flex-row form-group">
//             <h6 className="fw-bold mt-2 p-1 mx-2">PhoneNumber:</h6>
//             <input
//               type="number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="form-control"
//             />
//           </div>

//           <div className="d-flex align-items-center justify-content-center mb-2 text-center form-group">
//             <button className="btn btn-primary" type="submit">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>):(
//       <div>
//         <form onSubmit={handleotp}>
//           <h1>Enter Email:</h1>
//           <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} readOnly/>
//           <h1>
//             Enter otp:
//             <input type="number" onChange={(e)=>setOtp(e.target.value)} required/>
//             <button type="submit">Submit</button>
//           </h1>
//         </form>
//         <button onClick={handleGoBack}>Go Back to Registration</button>
//       </div>
//     )}</>
//   );
// };

// export default Register;



import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [issubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null); // Track OTP sent time

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    if (username.length < 4) {
      toast.error("Name must be at least 4 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters", toastOptions);
      return false;
    } else if (phoneNumber.length !== 10) {
      toast.error("PhoneNumber must be 10 digits", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const req = await axios.post("http://localhost:5000/app/register", {
          username,
          email,
          password,
          role,
          phoneNumber,
        });
        if (req.status === 200) {
          toast.success("Registered Successfully", toastOptions);
          setIsSubmitted(true);
          setOtpSentTime(new Date()); // Record the time when OTP is sent
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleotp = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post("http://localhost:5000/app/verify-otp", {
        email,
        otp,
      });
      if (req.status === 200) {
        toast.success("OTP verified successfully", toastOptions);
        navigate("/login");
        alert("Successfully Verified")
      }
    } catch (error) {
      alert("Invalid otp");
      if (error.response && error.response.data) {
        if (error.response.data === "Invalid OTP") {
          toast.error("Invalid OTP", toastOptions);
        } else if (error.response.data === "OTP Expired") {
          toast.error("OTP expired, please request a new one", toastOptions);
        } else {
          toast.error("Verification failed.", toastOptions);
        }
      } else {
        toast.error("Verification failed.", toastOptions);
      }
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.data === "Username Exists") {
        toast.error("Username already exists", toastOptions);
      } else if (error.response.data === "Email Exists") {
        toast.error("Email already exists", toastOptions);
      } else {
        toast.error("Registration failed.", toastOptions);
      }
    } else {
      toast.error("Registration failed.", toastOptions);
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
  };

  // Check if OTP request expired
  const isOtpExpired = () => {
    if (!otpSentTime) return false;
    const now = new Date();
    const elapsed = now - otpSentTime;
    const threeMinutes = 3 * 60 * 1000; // 3 minutes in milliseconds
    return elapsed > threeMinutes;
  };

  return (
    <>
      {!issubmitted ? (
        <div className="register d-flex justify-content-center align-items-center flex-column">
          <div className="container mt-5 registration d-flex justify-content-center align-items-center flex-column">
            
            <form style={{}} className="form mt-5" onSubmit={handleSubmit}>
            <h1 className="fw-bold text-center text-white">Signup</h1>
              <div className="d-flex flex-row form-group">
                {/* <h6 className="fw-bold mt-2 p-1 mx-2">Username:</h6> */}
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex mt-3 flex-row form-group">
                {/* <h6 className="fw-bold mt-2 p-1 mx-2">Email:</h6> */}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex mt-3 mb-3 flex-row form-group">
                {/* <h6 className="fw-bold mt-2 p-1 mx-2">Password:</h6> */}
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex flex-row form-group">
                {/* <h6 className="fw-bold mt-2 p-1 mx-2">Role:</h6> */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-control mb-2"
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <div className="d-flex mt-3 mb-3 flex-row form-group">
                {/* <h6 className="fw-bold mt-2 p-1 mx-2">PhoneNumber:</h6> */}
                <input
                  type="number"
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control mb-2"
                />
              </div>
              <div className="d-flex align-items-center justify-content-center text-center form-group">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
              <div className="text-start"><h5 className="text-white mt-3 w-100 text-start">Already an user?</h5>
          <a className="text-start" href='/login' style={{textDecoration: "none", color: "white"}}>Click here</a>
        </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div>
          <form onSubmit={handleotp}>
            <h1>Enter Email:</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
            <h1>
              Enter OTP:
              <input type="number" onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit">Submit</button>
            </h1>
          </form>
          <button onClick={handleGoBack}>Go Back to Registration</button>
          {isOtpExpired() && <p className="text-danger">OTP has expired. Please request a new one.</p>}
        </div>
      )}
    </>
  );
};

export default Register;