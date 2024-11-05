import React, { useState } from "react";
import "../Styles/Specialities.css";
import logo from '../images/Screenshot_2024-09-19_104956-removebg-preview.png';
import ScrollToTop from "react-scroll-to-top";
import i1 from '../images/service-icon-1.png';
import i2 from '../images/service-icon-2.png';
import i3 from '../images/service-icon-3.png';
import i4 from '../images/service-icon-4.png';
import i5 from '../images/service-icon-5.png';
import Steps from "./Steps";
import a1 from '../images/a1.jpeg';
import a2 from '../images/a2.jpeg';
import a3 from '../images/a3.jpeg';

const Specialities = () => {


  const specmap = [
    {
      id: 1,
      title: "Root Canal",
      description: `Our root canal treatments are designed to save severely decayed or infected teeth with minimal discomfort. 
                    We use advanced techniques to clean and seal the inner canals, preventing further infection. 
                    This procedure relieves pain while preserving your natural tooth structure. 
                    A successful root canal can strengthen and protect the tooth for years to come. 
                    Trust our experts for a seamless, effective restoration process.`,
      image: i1
    },
    {
      id: 2,
      title: "Pediatric Dentistry",
      description: `Our pediatric dentistry services provide comprehensive dental care for children in a welcoming environment. 
                    We focus on preventive care, teaching young patients the importance of oral hygiene early on. 
                    Our gentle approach ensures a positive experience, helping children feel comfortable with dental visits. 
                    From regular checkups to cavity prevention, our goal is to support lifelong dental health. 
                    We’re here to make dental care fun and stress-free for your little ones.`,
      image: i2
    },
    {
      id: 3,
      title: "Orthodontics",
      description: `Our orthodontic services help align teeth and improve bite issues, enhancing both appearance and functionality. 
                    We offer a variety of options, from traditional braces to clear aligners, suited for all ages. 
                    Proper alignment improves oral health, making teeth easier to clean and reducing wear. 
                    Orthodontics can also boost self-confidence with a more attractive smile. 
                    Let us guide you to a healthy, well-aligned smile you'll love.`,
      image: i3
    },
    {
      id: 4,
      title: "Complete Dentures",
      description: `Our complete dentures are custom-made to restore the natural look and function of your smile. 
                    Crafted with precision, they provide a comfortable fit and allow you to eat, speak, and smile confidently. 
                    Whether full or partial, dentures can restore facial structure and support overall oral health. 
                    We work closely with you to ensure a personalized design for optimal comfort and aesthetics. 
                    Rediscover your smile with high-quality, durable dentures tailored just for you.`,
      image: i4
    },
    {
      id: 5,
      title: "Flap Surgery",
      description: `Flap surgery is a specialized procedure aimed at treating advanced gum disease. 
                    It involves lifting the gums to remove tartar buildup and bacteria from the roots of the teeth. 
                    This procedure promotes gum healing, reduces pocket depth, and helps prevent further infection. 
                    Flap surgery can significantly improve oral health, protecting both gums and teeth in the long term. 
                    Trust our experienced team to provide a precise, effective approach to restoring your gum health.`,
      image: i5
    }    
  ];
  



  const [selectedItem, setSelectedItem] = useState(null);
  const handleCardClick = (item) => {
    setSelectedItem(item);
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  };

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

        <div class="content container p-5" data-aos="fade-up" data-aos-once="true">
        
        <p> At our dental practice, we are committed to delivering exceptional care across a wide range of dental specialties, ensuring that all your oral health needs are met under one roof. Our orthodontic specialists focus on correcting misaligned teeth and jaws, providing solutions like braces and clear aligners to enhance both function and aesthetics. For those seeking to improve the appearance of their smiles, our cosmetic dentistry experts offer innovative treatments, including teeth whitening, veneers, and smile makeovers, tailored to your unique desires.</p>

        <p> We understand that children require special attention when it comes to dental care. Our pediatric dentistry team is dedicated to creating a comfortable and friendly environment for your little ones, teaching them the importance of oral hygiene while addressing their specific dental needs. Additionally, our restorative specialists are skilled in repairing damaged teeth and restoring functionality through crowns, bridges, and implants, ensuring you can enjoy a confident smile once again.</p>

        <p> Our endodontists specialize in root canal therapy, providing relief from dental pain and preserving natural teeth whenever possible. Moreover, our periodontists are focused on maintaining gum health, offering treatments for gum disease and implementing preventive care strategies. With the incorporation of cutting-edge technology and advanced techniques, we prioritize your comfort and the efficacy of our treatments.</p>

        <p> As part of our holistic approach to dental health, we also emphasize the importance of preventive care, offering regular check-ups and cleanings to help you maintain optimal oral health. Our dedicated team collaborates closely to create personalized treatment plans that align with your goals and lifestyle. At our practice, we believe that everyone deserves a healthy, beautiful smile, and we are here to support you every step of the way.</p>
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




          <div>
          <div id="218887269ad5946d9dc53238651c90472884f234" className="teams justify-content-md-center justify-content-center" style={{ position: "relative", borderRadius:"70px" }}>
      <div className="hello card">
      </div>
        <h1 className="text-center text-white mx-md-5">WE OFFER</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 d-flex justify-content-center align-items-center text-center flex-wrap g-4">
        {specmap.map((item) => (
          <div className="col" key={item.id}>
            <div
              style={{ cursor: "pointer", height:"250px" }}
              className="card teamcard m-3 p-4"
              onClick={() => handleCardClick(item)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              
              {/* <h5>{item.id}</h5> */}
              <center><h5>{item.title}</h5></center>
              <center><img src={item.image} alt={item.title} style={{ width: "100px", height: "auto" }} /></center>
              {/* <img src={imageMap[item.image]} alt={item.title} style={{ width: "100px", height: "auto" }} /> */}
            </div>
          </div>
        ))}
      </div></div>





            
            <div className="modal fade modal-fullscreen" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {selectedItem ? selectedItem.title : "Modal title"}
              </h5>
            </div>
            <div className="modal-body">
              {selectedItem ? (
                <>
                <center><img 
                      src={selectedItem.image}
                      alt={selectedItem.title} 
                      style={{ width: "50%", height: "auto" }} 
                  /></center>
                  
                  <p><strong>Description: </strong> {selectedItem.description}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
          </div>








          {/* <div id='rootcanal' className="row mb-5 p-md-5 p-sm-2 container text-black align-items-center">
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
          </div> */}

          

<div className="continer p-5">
      <h2>Get started today!</h2>
      <p>3 Simple steps for achieving your best smile</p>
      <div className="steps w-100 row d-flex justify-content-center align-items-center text-center">
        <div className="step col-md-3 col-sm-6 col-12">
          <img src={a1} alt="Step 1" className="step-image" />
          <div className="step-number">1</div>
          <p className="step-description">Schedule an exam now first!</p>
        </div>
        <div className="step col-md-3 col-sm-6 col-12">
          <img src={a2} alt="Step 2" className="step-image" />
          <div className="step-number">2</div>
          <p className="step-description">Speak with a dentist about your goals</p>
        </div>
        <div className="step col-md-3 col-sm-6 col-12">
          <img src={a3} alt="Step 3" className="step-image" />
          <div className="step-number">3</div>
          <p className="step-description">Create a plan and start your smile journey</p>
        </div>
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
          <style jsx>
            {`
            .step {
      position: relative;
      margin-bottom: 40px;
      font-size: 30px;
      gap: 2rem;
    }
             .step-number {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #a67c52; /* Match the brown color */
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
  }
            `}
          </style>
    </div>
  );
};

export default Specialities;
