import React from 'react';
import logo from '../images/Screenshot_2024-09-19_104956-removebg-preview.png';
import '../Styles/About.css';
import Nav from './Nav';
import ScrollToTop from 'react-scroll-to-top';

const AboutUs = () => {

  const dentists = [
    {
      id: 1,
      name: "Nigga Holmes",
      title: "Dentist",
      // image: d1, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 2,
      name: "Dr Paramash",
      title: "Dentist",
      // image: d2, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 3,
      name: "Dr Monish 9",
      title: "Dentist",
      // image: d3, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 4,
      name: "Director Nesar Kaaviyan",
      title: "Dentist",
      // image: d4, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 1,
      name: "Holmes",
      title: "Dentist",
      // image: d1, // Replace with actual image link
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
      // image: d2, // Replace with actual image link
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
      // image: d3, // Replace with actual image link
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
      // image: d4, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 4,
      name: "Director Nesar Kaaviyan",
      title: "Dentist",
      // image: d4, // Replace with actual image link
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    }
  ];
  

  return (<>
    
    <div className='containerd w-100'>
      {/* <div style={{minHeight: "100vh"}} className='first'>
      

      </div> */}

<div class="conta">
    <div class="fill w-100">
        <h1 className='bg-succes w-100 p-5 text-white'><center data-aos='zoom-in' data-aos-once="true" data-aos-duration="1000">
        <br />
        ABOUT US
        <br /><br />
        </center></h1>
        
    </div>
    <div class="content container p-5" data-aos="fade-up" data-aos-once="true">
        
        <h3><span id="sp" style={{color: "#2A4735"}} className=''
        data-aos-once="true" data-aos-duration="1000" data-aos="fade-in-right"
        >ABOUT US</span></h3>
        <h1 data-aos="fade-in-right">Welcome to ThulasiRaam</h1>
        <p>ThulasiRaam is a newly established dental initiative focused on delivering high-quality oral healthcare through our two branches and a dedicated dental hospital. We aim to be a cornerstone of dental excellence in our community.</p>
<p>Our mission is to provide comprehensive services that prioritize patient comfort and satisfaction. From routine check-ups to advanced treatments, we are dedicated to meeting the diverse needs of our patients.</p>
<p>With a commitment to continuous education, we ensure our team stays updated with the latest advancements in dentistry. This dedication enables us to offer innovative solutions and techniques for optimal care.</p>
<p>At ThulasiRaam, we strive to create a welcoming environment where every patient feels valued. Our friendly staff is here to assist you at every step of your dental journey.</p>
<p>Our services include preventive care, restorative treatments, and specialized procedures, ensuring all your dental needs are met under one roof. We believe in a holistic approach to oral health.</p>
<p>We believe in fostering strong relationships with our patients to achieve optimal oral health. Open communication is key to understanding your needs and ensuring a positive experience.</p>
<p>Join us in our journey to enhance oral health and promote brighter smiles in our community. Together, we can create a healthier future, one smile at a time.</p>

    </div></div>



      <h4 className='text-center w-100' data-aos="fade-up"
     data-aos-anchor-placement="center-center">Our Team</h4>
      <div className='container d-flex justify-content-center w-100 align-items-center text-center'>
        
      <div className='row sec mb-3 pt-5 d-flex justify-content-center w-100 align-items-center text-center'>
        {dentists.map((d)=>(
          <div key={d.id} className='col-md-4 col-sm-6 col-12 d-flex justify-content-center align-items-center text-center'
          data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-delay={d.id * 5000} data-aos-once="true"
          >
            <div style={{width: "250px", height: "250px"}} className='card mt-5'>
              <h6>{d.name}</h6>
              <h6>{d.title}</h6>
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
    </div>
    {/* <ScrollToTop smooth /> */}
    </>
  );
}

export default AboutUs;