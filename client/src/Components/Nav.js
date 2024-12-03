// import React from 'react'

// const Nav = () => {
//   return (
//     <nav class="navbar navbar-expand-lg position-fixed w-100 text-dark">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//       <div className="navbar-nav ms-auto text-center">
//         <a className="nav-link" aria-current="page" href="#">Home</a>
//         <a className="nav-link" href="#">Features</a>
//         <a className="nav-link" href="#">Pricing</a>
//       </div>
//     </div>
//   </div>
// </nav>
//   )
// }

// export default Nav;

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../Styles/Land.css"; // Custom CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import logo from '../images/WhatsApp_Image_2024-11-09_at_8.25.43_PM-removebg-preview.png';

const MyNavbar = () => {
  const [scrolling, setScrolling] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("appointment");
    localStorage.removeItem("appointmentTimestamp");
    localStorage.removeItem("rzp_checkout_anon_id");
    localStorage.removeItem("rzp_device_id");
    localStorage.clear();
    // localStorage.removeItem("otpSentTime");
    // localStorage.removeItem("otpStatus");
    window.location.href = "/";
  };

  useEffect(() => {
    // const token = localStorage.getItem("authToken");

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeToExpire = expirationTime - currentTime;

      if (timeToExpire > 0) {
        const logoutTimer = setTimeout(() => {
          handleLogout();
        }, timeToExpire);

        return () => clearTimeout(logoutTimer);
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleBook = () => {
    navigate("/book");
  };

  const role = localStorage.getItem("role");

  const isContactPage = location.pathname === "/book";

  return (
    <nav
      style={{ top: "0" }}
      className={`navbar navbar-expand-lg position-fixed w-100 text-dark ${
        scrolling ? "scrolled" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="" style={{ width: "50%" }}>
          <a
            className="navbar-brand text-md-start text-start"
            style={{ color: "#2A4735", fontWeight: "500", fontSize: "34px" }}
            href="/"
          >
             <img src={logo} style={{width: "200px", borderRadius: "10px"}}/>
          </a>
          {/* <b>ThulasiRaam</b> */}
         
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          style={{ width: "60%" }}
          className="collapse navbar-collapse w-100 gap-md-5"
          id="navbarNavAltMarkup"
        >
          {/* <div className="navbar-nav justify-content-center text-end gap-1 gap-sm-2 gap-md-3">
            <a
              style={{ color: "#2A4735" }}
              className="nav-link"
              aria-current="page"
              href="/"
            >
              Home
            </a>
            <a style={{ color: "#2A4735" }} className="nav-link" href="/about">
              About
            </a>
            <a
              style={{ color: "#2A4735" }}
              className="nav-link"
              href="/specialities"
            >
              Specialities
            </a>
            <a style={{ color: "#2A4735" }} className="nav-link" href="/book">
              Contact
            </a>
            {!isContactPage && (
              <a
                style={{ background: "#2A4735", color: "white" }}
                className="btn"
                href="/book"
              >
                Book Appointment
              </a>
            )}
            {role === "admin" && (
              <a style={{ color: "#2A4735" }} className="nav-link" href="admin">
                Admin Panel
              </a>
            )}
            {!authToken ? (
              <a
                style={{ textDecoration: "none" }}
                href="/login"
                className="loginbtn mx-md-5"
              >
                Login
              </a>
            ) : (
              <a
                style={{ textDecoration: "none" }}
                href="/"
                onClick={handleLogout}
                className="loginbtn mx-md-5"
              >
                Logout
              </a>
            )}
          </div> */}



<div className="navbar-nav justify-content-center text-end gap-1 gap-sm-2 gap-md-3">
            <a
              style={{ color: "#2A4735" }}
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              href="/"
            >
              Home
            </a>
            <a
              style={{ color: "#2A4735" }}
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              href="/about"
            >
              About
            </a>
            <a
              style={{ color: "#2A4735" }}
              className={`nav-link ${location.pathname === "/specialities" ? "active" : ""}`}
              href="/specialities"
            >
              Specialities
            </a>
            <a
              style={{ color: "#2A4735" }}
              className={`nav-link ${location.pathname === "/book" ? "active" : ""}`}
              href="/book"
            >
              Contact
            </a>
            {!isContactPage && (
              <a
                style={{ background: "#2A4735", color: "white" }}
                className="btn"
                href="/book"
              >
                Book Appointment
              </a>
            )}
            {authToken && (
              <a
                style={{ color: "#2A4735" }}
                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                href="admin"
              >
                Admin Panel
              </a>
            )}
            {!authToken ? (
              <a
                style={{ textDecoration: "none" }}
                href="/login"
                className="loginbtn mx-md-5"
              >
                Login
              </a>
            ) : (
              <a
                style={{ textDecoration: "none" }}
                href="/"
                onClick={handleLogout}
                className="loginbtn mx-md-5"
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .nav-link.active {
          font-weight: bold;
          color: #2a4735;
        }
      `}</style>
    </nav>
  );
};

export default MyNavbar;
