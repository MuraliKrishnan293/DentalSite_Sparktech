import React from 'react';
import logo from '../images/WhatsApp Image 2024-11-09 at 8.25.43 PM (1).jpeg';
import '../Styles/About.css';
import Nav from './Nav';
import ScrollToTop from 'react-scroll-to-top';

const AboutUs = () => {

  const dentists = [
    {
      id: 1,
      name: "Thulasiraam",
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
      name: "Thaaraa",
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
      name: "Dentist Nesar Kaaviyan",
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
  <div className='bg'><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div class="fill py-5 pt-5 w-100">
        <h1 className='py-5 pt-5'><center data-aos='zoom-in' data-aos-once="true" data-aos-duration="1000">
        <br />
        <strong style={{color: "white"}}>ABOUT US</strong>
        <br /><br />
        </center></h1>
    </div></div>
    

    <div class="content container p-5" data-aos="fade-up" data-aos-once="true">
        
        <h3><span id="sp" style={{color: "#2A4735"}} className=''
        data-aos-once="true" data-aos-duration="1000" data-aos="fade-in-right"
        >ABOUT US</span></h3>
        <h1 data-aos="fade-in-right">Welcome to ThulasiRaam</h1>
        <p>ThulasiRaam is a newly established dental initiative focused on delivering high-quality oral healthcare through our two branches and a dedicated dental hospital. We aim to be a cornerstone of dental excellence in our community.</p>
<p>Our mission is to provide comprehensive services that prioritize patient comfort and satisfaction. From routine check-ups to advanced treatments, we are dedicated to meeting the diverse needs of our patients.</p>
<p>With a commitment to continuous education, we ensure our team stays updated with the latest advancements in dentistry. This dedication enables us to offer innovative solutions and techniques for optimal care.</p>

    </div></div>



      {/* <h4 className='text-center w-100' data-aos="fade-up">Our Team</h4>
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
      </div> */}
      {/*  */}

      <div
      id="b37456c4530be810dc040f50da72eda09addfb0b"
      style={{ minHeight: "50vh", backgroundColor: "#2A4735" }}
      className="container-fluid text-light"
    >
      <div className="row pt-5">
        <div
          className="col-12 d-flex flex-column text-center align-items-center justify-content-center col-sm-6 col-md-6 col-lg-2"
        >
          <h3 className="text-md-center mt-5" transition={{ duration: 2, delay: 1 }}>
            Thulasiraam
          </h3>
          <img
                src={logo}
                alt="Logo"
                class="footer-logo-img"
                style={{width: "180px", height: "0100px", borderRadius: "20px"}}
              />
        </div>

        <div
          className="col-12 col-sm-6 col-md-6 col-lg-3"
        >
          <h4 className="text-md-center pt-5 mt-md-0 mt-sm-0 mt-lg-0 text-start">Our Services</h4><hr />
              <ul class="footer-services list-unstyled text-md-center" style={{listStyleType: "none"}}>
              <li className="mt-3">Root Canal</li>
                <li className="mt-3">Pediatric Dentistry</li>
                <li className="mt-3">Complete Dentures</li>
                <li className="mt-3">Orthodontics</li>
                <li className="mt-3">Flap Surgery</li>
                <li className="mt-3">Crowns and Bridges</li>
              </ul>
        </div>
        <div
          className="col-12 col-sm-12 col-md-12 col-lg-7"
        ><h4 className="text-md-center pt-5 mt-md-0 mt-sm-0 mt-lg-0 text-start">Contact us</h4><hr />
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
              <ul className="list-unstyled">
              {/* <li>
                _mo.nish_
              </li> */}
              {/* <li>
                ThulasiRaam@gmail.com
              </li> */}
              <li style={{lineHeight: "30px"}}>
              No: 6th St, Kuberan Nagar, Madipakkam, Chennai, Tamil Nadu 600091
              </li>
              <li>
               +91 9840812127
              </li></ul>
              <br /><br /></div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6"><ul className="list-unstyled">
              {/* <li>
                _mo.nish_
              </li>
              <li>
                 ThulasiRaam@gmail.com
              </li> */}
              <li style={{lineHeight: "30px"}}>
              18, Venkatesa St, Ram Nagar South Extension, Alaiamman Nagar, Pallikaranai, Chennai, Tamil Nadu 600100
              </li>
              <li>
                +91 9884922333
              </li></ul>
              </div>

              
            
          </div>
        </div>

        
        <div className="display d-flex flex-row justify-content-center align-items-center text-center"><div
          className="col-12 col-sm-12 col-md-12 col-lg-12 d-flex flex-column flex-sm-row flex-md-row justify-content-center align-items-center text-center"
        >
          
              <p className="mt-3 mx-2">
                FOLLOW US ON 
              </p>
              {/* <hr /> */}
           <div className="d-flex flex-row">
            <a style={{width:"60px", backgroundColor: '#dd4b39'}}
                  className="btn btn-primary btn-floating m-1"
                  // style={{ backgroundColor: '#dd4b39' }}
                  href="#!"
                  role="button" rel="noopener noreferrer" target="_blank"
                >
                  <i className="fab fa-google"></i>
                </a>

                <a style={{width:"60px", backgroundColor: '#ac2bac'}}
                  className="btn btn-primary btn-floating m-1"
                  // style={{ backgroundColor: '#ac2bac' }}
                  href="https://www.instagram.com/sparktech_st?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  role="button" rel="noopener noreferrer" target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a style={{width:"60px", backgroundColor: '#0082ca'}}
                  className="btn btn-primary btn-floating m-1"
                  // style={{ backgroundColor: '#0082ca' }}
                  href="https://www.linkedin.com/company/sparktech-sparktech/"
                  role="button" rel="noopener noreferrer" target="_blank"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a></div>
          
        </div></div>
        </div>



        
        </div>
    </div>
    {/* <ScrollToTop smooth /> */}
    </>
  );
}

export default AboutUs;