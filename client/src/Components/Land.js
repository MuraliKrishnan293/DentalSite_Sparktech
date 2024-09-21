import React, { useEffect } from "react";
import "../Styles/Land.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";
import s1 from '../images/Untitled design.png';
import s2 from '../images/Untitled design (1).png';
import s3 from '../images/Untitled design (2).png';
import s4 from '../images/Untitled design (3).png';
import s5 from '../images/Untitled design (4).png';
import s6 from '../images/Untitled design (5).png';
import doc from '../images/doccheck.jpeg';

import d1 from '../images/doctor-1.png';
import d2 from '../images/doctor-2.png';
import d3 from '../images/doctor-3.png';
import d4 from '../images/doctor-4.png';

import logo from '../images/Screenshot_2024-09-19_104956-removebg-preview.png';

const Land = () => {

  useEffect(() => {
    AOS.init({ duration: 1000});
  }, []);


  const services = [
    {
      title: "Root Canal",
      description:
        "The goal of root canal treatment is to save a tooth that might otherwise need to be removed.",
      icon: s1, // Replace with actual icon
    },
    {
      title: "Pediatric Dentistry",
      description:
        "Specialized care for children and adolescents, addressing their unique dental needs age-appropriate treatments.",
      icon: s2, // Replace with actual icon
    },
    {
      title: "Complete Dentures",
      description:
        "Removable prosthetics replacing all missing teeth in a jaw, designed for comfort and functionality in daily use.",
      icon: s3, // Replace with actual icon
    },
    {
      title: "Orthodontics",
      description:
        "Aligns teeth and corrects bite issues with braces, clear aligners, or retainers for a straight, healthy smile.",
      icon: s4, // Replace with actual icon
    },
    {
      title: "Flap Surgery",
      description:
        "Treats advanced gum disease by lifting and cleaning gum tissue, restoring oral health and preventing further damage.",
      icon: s5, // Replace with actual icon
    },
    {
      title: "Crowns and Bridges",
      description:
        "Fixed prosthetics that restore damaged or missing teeth, providing durability for improved function.",
      icon: s6, // Replace with actual icon
    },
  ];

  const dentists = [
    {
      id: 1,
      name: "Holmes",
      title: "Dentist",
      image: d1, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 2,
      name: "Paaraa",
      title: "Dentist",
      image: d2, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 3,
      name: "Monisha",
      title: "Dentist",
      image: d3, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 4,
      name: "Kaaviya",
      title: "Dentist",
      image: d4, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  return (
    <>
      {/* <Nav /> */}
      <div className="container-fluid d-flex justify-content-center aign-items-center text-center heroimg">
        <div
          style={{ minHeight: "100vh" }}
          className="d-flex justify-content-center align-items-center text-start herosmall flex-column"
        >
          <div
            style={{ maxWidth: "850px" }}
            className="d-flex flex-column text-start"
          >
            {/* <p className="fw-5 text-start">Welcome to ThulasiRaam</p> */}
            <h1
            data-aos="fade-in"
            data-aos-delay="500"
            className="h1text d-flex flex-wrap w-100">
              We are best dental service
            </h1>
            <p
            data-aos="fade-in"
            data-aos-delay="1000"
            className="ptexthero text-left">
              At ThulasiRaam, we believe that every smile deserves the best
              care. Our dedicated team is committed to providing exceptional
              dental services with a personal touch. Whether you're here for a
              routine check-up or a more complex procedure, we ensure a
              comfortable and stress-free experience. Our mission is to make
              top-quality dental care accessible and enjoyable.
            </p>
          </div>
        </div>
      </div>
      {/* <section className="services container">
      <h2 className="services-heading">OUR SERVICES</h2>
      <h3 className="services-subheading">What We Provide</h3>
      {/* <div className="services-grid d-flex justify-content-center align-items-center text-center flex-sm-wrap"> */}
      {/* <div className="row row-cols-6 d-flex justify-content-center align-items-center text-center flex-sm-wrap">
        {services.map((service, index) => (
          <div key={index} className="col">
            <div className="card" style={{width: "472px", height: "230px"}}>
            <div className="icon">{service.icon}</div>
            <h4 className="title">{service.title}</h4>
            <p className="description">{service.description}</p>
          </div></div>
        ))}
      </div>
    </section> */}

      <div className="container mt-md-5">
        <h2 className="services-heading">OUR SERVICES</h2>
        <h3 className="services-subheading">What We Provide</h3>
        <div className="row">
          {services.map((s) => (
            <div className="col-md-4 col-sm-6 col-12" key={s.id} data-aos="fade-up" data-aos-delay={s.id * 500000}>
              <div style={{ height: "300px" }} className="mt-5 p-4 card"><div className="w-100 text-center">
                <img src={s.icon} alt='icon' style={{width: "50px", height: "50px"}} className=" text-center" /></div>
                <h6 className="text-center">{s.title}</h6>
                <p className="text-center">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <section className="about-us">
        <div className="about-us-content">
          <div className="about-us-image tilted-image-container">
            <img className="tilted-image"
              src={doc} // Replace with actual image link
              alt="Dentist caring for a patient"
            />
          </div>
          <div className="about-us-text">
            <h1 className="w-100 fs-1 p-md-5" style={{ color: "#2b6d44" }}>
              ABOUT US
            </h1>
            <h3>We Care For Your Dental Health</h3>
            <p>
              At ThulasiRaam, we believe that every smile deserves the best
              care. Our dedicated team is committed to providing exceptional
              dental services with a personal touch. Whether you're here for a
              routine check-up or a more complex procedure, we ensure a
              comfortable and stress-free experience. Our mission is to make
              top-quality dental care accessible and enjoyable.
            </p>
            <p>
              We combine advanced technology with compassionate service to help
              you achieve optimal oral health and a beautiful smile. From
              preventive care to restorative treatments, we are here to support
              you every step of the way. With years of experience and a passion
              for excellence, we aim to exceed your expectations and make a
              positive impact on your dental health. At ThulasiRaam, your smile
              is in expert hands.
            </p>
            <button className="read-more-button">READ MORE</button>
          </div>
        </div>
      </section> */}

<section className="about-us">
  <div className="about-us-content">
  <h1 className="w-100 fs-1 p-md-5 text-center" style={{ color: "#2b6d44" }}>
        ABOUT US
      </h1>
    <div data-aos="fade-right" className="about-us-image tilted-image-container">
      <img className="tilted-image"
        src={doc} // Replace with actual image link
        alt="Dentist caring for a patient"
      />
    </div>
    <div data-aos="fade-left" className="about-us-text">
      
      <h3>We Care For Your Dental Health</h3>
      <p>
        At ThulasiRaam, we believe that every smile deserves the best
        care. Our dedicated team is committed to providing exceptional
        dental services with a personal touch. Whether you're here for a
        routine check-up or a more complex procedure, we ensure a
        comfortable and stress-free experience. Our mission is to make
        top-quality dental care accessible and enjoyable.
      </p>
      <p>
        We combine advanced technology with compassionate service to help
        you achieve optimal oral health and a beautiful smile. From
        preventive care to restorative treatments, we are here to support
        you every step of the way. With years of experience and a passion
        for excellence, we aim to exceed your expectations and make a
        positive impact on your dental health. At ThulasiRaam, your smile
        is in expert hands.
      </p>
      <button className="read-more-button">READ MORE</button>
    </div>
  </div>
</section>

      {/* <section className="dentist-profiles">
        <h2>OUR DOCTOR</h2>
        <h3>Best Expert Dentist</h3>
        <div className="">
          {dentists.map((dentist) => (
            <div key={dentist.id} className="profile-card">
              <img
                src={dentist.image}
                alt={dentist.name}
                className="profile-image"
              />
              <h4>{dentist.name}</h4>
              <p>{dentist.title}</p>
              <div className="social-icons">
                <a
                  href={dentist.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={dentist.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={dentist.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section> */}

<div className="container mt-md-5">
        <h2 className="services-heading">MEET OUR DOCTORS</h2>
        <div className="row d-flex justify-content-center align-items-center text-start">
          {dentists.map((s) => (
            <div className="col-md-3 col-sm-6 col-12" key={s.id}
            
            data-aos="fade-down"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay={s.id * 10000000}
            >
              <div className="doccard mt-5 p-4 card mb-4">
                <img src={s.image} alt="doc" className="docimg card-img card-img-top text-center" />
                <h6 className="text-center">{s.name}</h6>
                <p className="text-center">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{background: "#2a4735"}} class="foot">
        <div style={{background: "#2a4735", color: "white"}} class="container">
          <div class="row footer-con">
            <div 
            data-aos="zoom-in"
            data-aos-once="true"

            class="col-md-6 col-sm-12 col-12 d-flex justify-content-md-center align-items-md-center text-md-center text-start flex-column">
              <h2 class="footer-logo fw-5 fs-1">Thulasiraam</h2>
              <img
                src={logo}
                alt="Logo"
                class="footer-logo-img"
              />
            </div>
            {/* <div className="hr"><hr /></div> */}
            <div
            
            data-aos="zoom-in"
            data-aos-once="true"

            class="col-md-6 col-sm-12 col-12 d-flex justify-content-md-center align-items-md-center text-md-center text-start flex-column">
              <h4>Our Services</h4>
              <ul class="footer-services" style={{listStyleType: "none"}}>
                <li className="mt-3">Root Canal</li>
                <li className="mt-3">Pediatric Dentistry</li>
                <li className="mt-3">Complete Dentures</li>
                <li className="mt-3">Orthodontics</li>
                <li className="mt-3">Flap Surgery</li>
                <li className="mt-3">Crowns and Bridges</li>
              </ul>
            </div>
          </div><hr />
          <div className="row">
          <h2 style={{width: "100%"}} className="w-100 text-md-center text-start fw-5 fs-1">Contact us</h2>
          <div
          

          data-aos="zoom-in"
          data-aos-once="true"

          class="col-md-6 col-sm-12 col-12 d-flex justify-content-md-center align-items-md-center text-md-center text-start flex-column">
{/*               
              <div class="contact-details"> */}
                {/* <div className="col-md-6 col-12"> */}
                  <p>
                  <i class="fa fa-instagram"></i> _mo.nish_ 9
                </p>
                <p>
                  <i class="fa fa-envelope"></i> ThulasiRaam@gmail.com
                </p>
                <p>
                  <i class="fa fa-map-marker"></i> 18, Venkatesa St,
                  Pallikaranai, Chennai, Tamil Nadu
                </p>
                <p>
                  <i class="fa fa-phone"></i> +91-7052-101-786
                </p>
                </div>
                
                <div
                

                data-aos="zoom-in"
                data-aos-once="true"

                
                className="col-md-6 col-sm-12 col-12 d-flex justify-content-md-center align-items-md-center text-md-center text-start flex-column">
                  <p>
                  <i class="fa fa-instagram"></i> _mo.nish_
                </p>
                <p>
                  <i class="fa fa-envelope"></i> ThulasiRaam@gmail.com
                </p>
                <p>
                  <i class="fa fa-map-marker"></i> 18, Venkatesa St,
                  Pallikaranai, Chennai, Tamil Nadu
                </p>
                <p>
                  <i class="fa fa-phone"></i> +91-7052-101-786
                </p>
                </div>

              {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Land;