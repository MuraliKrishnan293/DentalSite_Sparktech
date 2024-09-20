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

const MyNavbar = () => {
    const [scrolling, setScrolling] = useState(false);

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

    return (
        <nav className={`navbar navbar-expand-lg position-fixed w-100 text-dark ${scrolling ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <a className="navbar-brand text-md-end text-sm-start text-start" style={{ color: "#2A4735", fontWeight: "500", fontSize: "34px", width: "50%" }} href="#"><b>ThulasiRaam</b></a>
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
                <div style={{width: "50%"}} className="collapse navbar-collapse w-100 gap-md-5" id="navbarNavAltMarkup">
                    <div className="navbar-nav justify-content-center text-end justify-content-lg-end gap-md-5">
                        <a style={{ color: "#2A4735" }} className="nav-link" aria-current="page" href="#">Home</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="#">About us</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="#">Specialities</a>
                        <a style={{ color: "#2A4735" }} className="nav-link" href="#">Contact us</a>
                        <button
                        style={{background: "#2A4735", color: "white"}}
                        className='btn'>Book Appointment</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;