import React from 'react';
import logo from '../images/Screenshot_2024-09-19_104956-removebg-preview.png';
import '../Styles/About.css';
import Nav from './Nav';

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

<div class="conta w-100">
    <div class="fill w-100">
        <h1 className='bg-succes w-100 p-5 text-white'><center data-aos='zoom-in' data-aos-once="true" data-aos-duration="2000">
        <br />
        ABOUT US
        <br /><br />
        </center></h1>
        
    </div>
    <div class="content container p-5" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-once="true">
        
        <h3><span id="sp" style={{color: "#2A4735"}} className=''
        data-aos-once="true" data-aos-duration="2000" data-aos="fade-in-right"
        >ABOUT US</span></h3>
        <h1 data-aos="fade-in-right">Welcome to ThulasiRaam</h1>
        <p>The Tamil Nadu Dental Council is a statutory body constituted under section 21 of The Dentists Act, 1948 for the purpose of registering the dentists & regulating the profession of dentistry in Tamilnadu.
        </p>
        <p>The dentists registration tribunal was in existence from Feb 1949 to Feb 1951. The Tamil Nadu Dental Council was inaugurated in October 1952. The BDS course was started in August 1953.</p>
        <p>Sixteen recognised dental colleges are functioning in Tamil Nadu. A total number of 15,936 dentists have been registered in Tamil Nadu Dental Council as on 31.03.12, out of which 1962 dentists hold MDS qualification. 606 number of Dental Hygienists and 959 number of Dental Mechanics have been registered in this Council as on 31.03.2012.</p>
        <p>Eight elected registered dentists, Principals of recognised dental colleges in Tamilnadu, one elected member from Tamil Nadu Medical Council, three TN Govt nominees, Director of Medical & Rural Health Services – all ex-officios – constitute the State Dental Council.</p>
        <p>Now the Continuing Dental Education Regulations have been implemented for updating the knowledge of Dentists in Dentistry.</p>
        
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
    </div></>
  );
}

export default AboutUs;