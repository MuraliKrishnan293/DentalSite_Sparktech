import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // import custom CSS file for styles

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
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("id", res.data.id);

        navigate("/home");
      }
      if (res.status === 400) {
        toast.error(res.data, toastOptions);
      }
      alert("Successfully Logged in");
    } catch (e) {
      if (e.response) {
        const er = e.response.data;
        if (er.message) {
          toast.error(er.message, toastOptions); 
        } else {
          toast.error("Login failed. Please try again later", toastOptions);
        }
      } else {
        toast.error("Login failed. Please try again later", toastOptions);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <form onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
          <div className="input-group form-group d-flex flex-column">
            {/* <p className="text-start">Name:</p> */}
            {/* <label>Email</label> */}
            <input
              type="email"
              className="form-control w-100"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group form-group">
            {/* <label>Password</label> */}
            <input
            className="form-control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group"><button className="login-btn btn btn-primary form-control" type="submit">
            Login
          </button></div>
          <div className="text-start"><h5 className="text-white mt-3 w-100 text-start">Already an user?</h5>
          <a className="text-start w-100" href='/register' style={{textDecoration: "none", color: "white"}}>Click here</a>
        </div></form>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;