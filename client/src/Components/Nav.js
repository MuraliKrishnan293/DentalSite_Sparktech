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

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../Styles/Land.css';  // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
    const [scrolling, setScrolling] = useState(false);

    const navigate = useNavigate();

    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("appointment");
        localStorage.removeItem("appointmentTimestamp");
        // localStorage.removeItem("otpSentTime");
        // localStorage.removeItem("otpStatus");
        window.location.href = "/";
    }

    const handleBook = ()=>{
        navigate('/book');
    }

    const role = localStorage.getItem("role");

    return (
        <nav style={{top: "0"}} className={`navbar navbar-expand-lg position-fixed w-100 text-dark ${scrolling ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <div className='' style={{width: "50%"}}><a className="navbar-brand text-md-start text-start" style={{ color: "#2A4735", fontWeight: "500", fontSize: "34px"}} href="/"><b>ThulasiRaam</b></a>
                </div><button
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
                <div style={{width: "60%"}} className="collapse navbar-collapse w-100 gap-md-5" id="navbarNavAltMarkup">
                    <div className="navbar-nav justify-content-center text-end gap-1 gap-sm-2 gap-md-3">
                        <a style={{ color: "#2A4735" }} className="nav-link" aria-current="page" href="/">Home</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="/about">About</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="/specialities">Specialities</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="/book">Contact</a>
                        {/* {role==="user" && ( */}
                        <a
                        style={{background: "#2A4735", color: "white"}}
                        className='btn' href='/book'>Book Appointment</a>
                        {/* )} */}
                        {role==="admin" && (
                            <a style={{ color: "#2A4735" }} className="nav-link" href="admin">Admin Panel</a>
                        )}
                        {!authToken ? (<a style={{textDecoration: "none"}} href='/login' className='loginbtn mx-md-5'>Login</a>):(<a style={{textDecoration: "none"}} href='/' onClick={handleLogout} className='loginbtn mx-md-5'>Logout</a>)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;