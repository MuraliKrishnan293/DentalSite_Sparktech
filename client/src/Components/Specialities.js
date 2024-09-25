import React from "react";
import "../Styles/Specialities.css";
import logo from '../images/Screenshot_2024-09-19_104956-removebg-preview.png';
import ScrollToTop from "react-scroll-to-top";

const Specialities = () => {
  return (
    <div>
        <div style={{width: "100%", paddingTop: "100px"}} class="fill w-100">
          <h1 className="bg-succes w-100 p-5 text-white">
            <center
              data-aos="zoom-in"
              data-aos-once="true"
              data-aos-duration="2000"
            >
              <br />
              SPECIALITIES
              <br />
              <br />
            </center>
          </h1>
        </div>

        {/* <div className="first" style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h1 className="section-title">Root Canal</h1>
              <p className="section-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi facere, tempore unde velit maiores accusantium! Ab eum, rerum deleniti consectetur ad est rem aliquam repellendus, eos mollitia quasi quae.</p>
              <p className="section-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis voluptatem dolor, consectetur libero corporis voluptas aliquam quia inventore ea possimus dignissimos est dolorum provident, minima porro quaerat, dolores sequi!</p>
            </div>
            <div className="image-wrapper">
              <img src="assets/images/doctor-1.png" alt="img1" className="img11" />
            </div>
          </div>

          <br /><br /><br />

        
          <div className="first" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="image-wrapper">
              <img src="assets/images/doctor-1.png" alt="img1" className="img11" />
            </div>
            <div>
              <h1 className="section-title">Pediatric Dentistry</h1>
              <p className="section-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi facere, tempore unde velit maiores accusantium! Ab eum, rerum deleniti consectetur ad est rem aliquam repellendus, eos mollitia quasi quae.</p>
              <p className="section-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis voluptatem dolor, consectetur libero corporis voluptas aliquam quia inventore ea possimus dignissimos est dolorum provident, minima porro quaerat, dolores sequi!</p>
            </div>
          </div>

          <br /><br /><br />

          
          <div className="first" style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h1 className="section-title">Orthodontics</h1>
              <p className="section-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi facere, tempore unde velit maiores accusantium! Ab eum, rerum deleniti consectetur ad est rem aliquam repellendus, eos mollitia quasi quae.</p>
              <p className="section-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis voluptatem dolor, consectetur libero corporis voluptas aliquam quia inventore ea possimus dignissimos est dolorum provident, minima porro quaerat, dolores sequi!</p>
            </div>
            <div className="image-wrapper">
              <img src="assets/images/doctor-1.png" alt="img1" className="img11" />
            </div>
          </div>

          <br /><br /><br />t

         
          <div className="first" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="image-wrapper">
              <img src="assets/images/doctor-1.png" alt="img1" className="img11" />
            </div>
            <div>
              <h1 className="section-title">Complete Dentures</h1>
              <p className="section-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi facere, tempore unde velit maiores accusantium! Ab eum, rerum deleniti consectetur ad est rem aliquam repellendus, eos mollitia quasi quae.</p>
              <p className="section-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus perferendis voluptatem dolor, consectetur libero corporis voluptas aliquam quia inventore ea possimus dignissimos est dolorum provident, minima porro quaerat, dolores sequi!</p>
            </div>
          </div>

          <br /><br /><br />

          
          <div className="first" style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h1 className="section-title">Flap Surgery</h1>
              <p className="section-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi facere, tempore unde velit maiores accusantium! Ab eum, rerum deleniti consectetur ad est rem aliquam repellendus, eos mollitia quasi quae.</p>
            </div>
            <div className="image-wrapper">
              <img src="assets/images/doctor-1.png" alt="img1" className="img11" />
            </div>
          </div> */}
          <div id='rootcanal' className="row mb-5 p-md-5 p-sm-2 container text-black align-items-center">
            <div data-aos="fade-right" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center order-md-2">
              <div className="text-center mb-4">
                <img
                  style={{ width: "400px", height: "400px" }}
                  //   src={sw}
                  className="img-fluid text-center rounded shadow-lg"
                  alt="Software Dev"
                />
              </div>
            </div>
            <div data-aos="fade-left" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center text-black order-md-1">
              <h2 className="mb-3 text-start">Root Canal</h2>
              <p className="text-black text-center">
                At the heart of our services lies our expertise in crafting
                bespoke software solutions that are as unique as your business.
                Whether you're looking for a custom application, a dynamic
                website, or a mobile app, we have the skills and experience to
                bring your vision to life. Our team of developers works closely
                with you to understand your specific needs, ensuring that the
                final product is not only functional and efficient but also
                user-friendly and scalable. We focus on creating solutions that
                drive your business forward, offering you the competitive edge
                you need in today's fast-paced digital landscape.
              </p>
            </div>
          </div>

          <div className="row mb-5 p-md-5 p-sm-2 align-items-center">
            <div data-aos="fade-up-right" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center">
              <div className="text-center mb-4">
                <img
                  //   src={ui}
                  className="img-fluid text-center rounded shadow-lg"
                  alt="UI/UX Design"
                />
              </div>
            </div>
            <div data-aos="fade-up-left" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-black">
              <h2 className="mb-3">Pediatric Dentistry</h2>
              <p className="text-center">
                Creating an exceptional user experience is at the core of our
                design philosophy. Our UI/UX design team specializes in
                developing intuitive interfaces and visually compelling designs
                that captivate users and enhance their interaction with your
                digital products. Whether it’s for a website, mobile app, or
                software platform, we ensure that every element is thoughtfully
                crafted to provide a seamless, engaging experience. By focusing
                on both functionality and aesthetics, we help your users
                navigate effortlessly, leading to increased satisfaction and
                long-term loyalty.
              </p>
            </div>
          </div>

          <div className="row mb-5 p-md-5 p-sm-2 align-items-center">
            <div data-aos="fade-down-right" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center order-md-2">
              <div className="text-center mb-4">
                <img
                  //   src={teach}
                  className="img-fluid text-center rounded shadow-lg"
                  alt="Tech Training"
                />
              </div>
            </div>
            <div data-aos="fade-down-left" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-black order-md-1">
              <h2 className="mb-3">Orthodontics</h2>
              <p className="text-center">
                In today’s rapidly evolving tech environment, staying ahead of
                the curve is essential. Our tech training programs are designed
                to equip you with the knowledge and skills needed to thrive in
                this dynamic landscape. We offer a wide range of workshops and
                courses covering the latest emerging technologies, programming
                languages, and software tools. Whether you're looking to upskill
                your team or advance your own expertise, our hands-on training
                ensures you gain practical experience that can be applied
                immediately. With our guidance, you'll be prepared to excel and
                innovate, keeping pace with industry advancements.
              </p>
            </div>
          </div>

          <div className="row p-md-5 p-sm-2 align-items-center">
            <div data-aos="zoom-in-up" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center">
              <div className="text-center mb-4">
                <img
                  //   src={write}
                  className="img-fluid text-center rounded shadow-lg"
                  alt="Tech Writing"
                />
              </div>
            </div>
            <div data-aos="zoom-in-down" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-black">
              <h2 className="mb-3">Complete Dentures</h2>
              <p className="text-center">
                Effective communication of complex technology is crucial for
                both experts and novices alike. Our tech writing services are
                designed to transform intricate concepts into clear, concise,
                and actionable content. Whether you need detailed technical
                documentation, insightful blog posts, or step-by-step guides, we
                ensure that your audience can easily understand and engage with
                the material. Our team of skilled writers combines technical
                expertise with a deep understanding of your target audience,
                producing content that is not only informative but also engaging
                and accessible. From simplifying complex processes to showcasing
                industry innovations, we help you connect with your audience
                through compelling and accurate writing.
              </p>
            </div>
          </div>

          <div className="row mb-5 p-md-5 p-sm-2 align-items-center">
            <div data-aos="fade-up"
     data-aos-anchor-placement="top-center" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-center order-md-2">
              <div className="text-center mb-4">
                <img
                  //   src={teach}
                  className="img-fluid text-center rounded shadow-lg"
                  alt="Tech Training"
                />
              </div>
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="center-center" data-aos-delay="5000" data-aos-once="true" className="col-md-6 text-black order-md-1">
              <h2 className="mb-3 text-center">Flap Surgery</h2>
              <p className="">
                In today’s rapidly evolving tech environment, staying ahead of
                the curve is essential. Our tech training programs are designed
                to equip you with the knowledge and skills needed to thrive in
                this dynamic landscape. We offer a wide range of workshops and
                courses covering the latest emerging technologies, programming
                languages, and software tools. Whether you're looking to upskill
                your team or advance your own expertise, our hands-on training
                ensures you gain practical experience that can be applied
                immediately. With our guidance, you'll be prepared to excel and
                innovate, keeping pace with industry advancements.
              </p>
            </div>
          </div>
          <>
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
    </div>
  );
};

export default Specialities;
