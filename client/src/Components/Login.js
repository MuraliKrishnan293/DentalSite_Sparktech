import React from "react";
// import "../Style.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/app/login", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        toast.success("Logged In Successfully", toastOptions);
        localStorage.setItem("authToken", res.data.authToken);
        // console.log("Stored username:", res.data.username);
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("id", res.data.id);

        // window.location.href = "/";
      }
      if(res.status === 400){
        toast.error(res.json, toastOptions);
      }
      navigate("/home");
      alert("Successfully Logged in");
    } catch (e) {
      
      if (e.response) {
        const er = e.response.data;
      if (er.message) {
        toast.error(er.message, toastOptions); // Assuming your backend sends errors as { message: "Error message" }
      } else {
        toast.error("Login failed. Please try again later", toastOptions);
      }
    } else {
      toast.error("Login failed. Please try again later", toastOptions);
    }
      }
  };

  return (
    <div className="register d-flex justify-content-center align-items-center flex-column">
      <div className="container registration d-flex justify-content-center align-items-center flex-column">
        <h1 className="fw-bold text-center p-4">Login Form</h1>
        <form className="form">
          <div className="d-flex mt-3 flex-row form-group">
            <h6 className="fw-bold mt-2 p-1 mx-2">Email:</h6>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-flex mt-3 mb-5 flex-row form-group">
            <h6 className="fw-bold mt-2 p-1 mx-2">Password:</h6>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="d-flex align-items-center justify-content-center mb-2 text-center form-group">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;