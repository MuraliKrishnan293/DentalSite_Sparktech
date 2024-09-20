import React from 'react';
// import '../Styles/Land.css'; // Assume custom CSS is applied here
import heroImage from '../images/image.png';
// import serviceImage1 from '../images/hero-bg.png';
// import serviceImage2 from 'assets/landingpageimages/image.png';
// import serviceImage3 from 'assets/landingpageimages/image.png';
// import serviceBannerImage from 'assets/landingpageimages/image.png';
// import serviceImage4 from 'assets/landingpageimages/image.png';
// import serviceImage5 from 'assets/landingpageimages/image.png';
// import serviceImage6 from 'assets/landingpageimages/image.png';
// import aboutBannerImage from 'assets/landingpageimages/image.png';
// import doctorImage1 from 'assets/landingpageimages/image.png';
// import doctorImage2 from 'assets/landingpageimages/image.png';
// import doctorImage3 from 'assets/landingpageimages/image.png';
// import doctorImage4 from 'assets/landingpageimages/image.png';

// import heroImage from '../../public/assets/landingpageimages/image.png';

const MainComponent = () => {
  return (
    <>
      <article>
        {/* Hero Section */}
        <section className="section hero" id="home" style={{ backgroundImage: `url(${heroImage})` }} aria-label="hero">
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">Welcome To ThulasiRaam</p>
              <h1 className="h1 hero-title">We Are Best Dental Service</h1>
              <p className="hero-text">
                We believe that a healthy smile is a beautiful smile. Our dedicated team of dental professionals is committed to
                providing you with personalized, high-quality care in a comfortable and welcoming environment. Whether you need a
                routine check-up, advanced cosmetic procedures, or restorative treatments, we offer a comprehensive range of
                services tailored to meet your unique needs.
              </p>
            </div>
            <figure style={{ border: '2px solid blue' }} className="hero-banner">
              <img src={heroImage} width="587" height="839" alt="hero banner" className="w-100" />
            </figure>
          </div>
        </section>

       </article></>
  );
};

export default MainComponent;