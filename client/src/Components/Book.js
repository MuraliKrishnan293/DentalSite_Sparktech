// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const timeSlots = [
//   "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
// ];

// const locations = ["vadapalani", "perambur"];

// const BookAppointment = () => {
//   const [date, setDate] = useState("");
//   const [time, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [location, setLocation] = useState(locations[0]);
//   const [appointmentExists, setAppointmentExists] = useState(false);
//   const navigate = useNavigate();
//   const TIMER_DURATION = 1 * 60 * 1000; // 15 minutes in milliseconds

//   const toastOptions = {
//     position: "top-left",
//     autoClose: 5000,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };

//   useEffect(() => {
//     const checkAppointment = () => {
//       const storedAppointment = localStorage.getItem("appointment");
//       const storedTimestamp = localStorage.getItem("appointmentTimestamp");

//       if (storedAppointment === "payment_pending" && storedTimestamp) {
//         const currentTime = Date.now();
//         const appointmentTime = Number(storedTimestamp);

//         if (currentTime - appointmentTime >= TIMER_DURATION) {
//           localStorage.removeItem("appointment");
//           localStorage.removeItem("appointmentTimestamp");
//           setAppointmentExists(false);
//           toast.info("Your appointment has been canceled due to time limit", toastOptions);
//           alert("Cancelled");
//           navigate("/book"); // Redirect or whatever logic you prefer
//         }
//       }
//     };

//     // Initial check and interval
//     checkAppointment();
//     const interval = setInterval(checkAppointment, 60 * 1000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://dentalsite-sparktech-2.onrender.com/app/book", {
//         date,
//         startTime: time,
//         location,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });

//       if (res.status === 200) {
//         toast.success("Appointment available, confirm booking", toastOptions);
//         localStorage.setItem("appointment", "payment_pending");
//         localStorage.setItem("appointmentTimestamp", Date.now());
//         setAppointmentExists(true);
//         console.log("Appointment booked and state updated.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to book appointment", toastOptions);
//       console.error("Error booking appointment:", error.response);
//     }
//   };

//   const handleProceedToPayment = () => {
//     navigate("/payment", {
//       state: {
//         exists: true,
//         timestamp: localStorage.getItem("appointmentTimestamp"), // Ensure this is correct
//       },
//     });
//   };

//   if (localStorage.getItem("authToken") === null) {
//     return <h1>Unauthorized</h1>;
//   }

//   return (
//     <div style={{ padding: "100px" }} className="container book-appointment">
//       <h1>Book Appointment</h1>

//       {appointmentExists ? (
//         <div>
//           <h3>You have already booked an appointment, continue to Payment. Time Limit: 15 mins</h3>
//           <button onClick={handleProceedToPayment}>
//             Proceed to Payment
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Start Time:</label>
//             <select
//               value={time}
//               onChange={(e) => {
//                 const selectedTime = e.target.value;
//                 setStartTime(selectedTime);
//                 const nextSlot = timeSlots[timeSlots.indexOf(selectedTime) + 1];
//                 setEndTime(nextSlot || selectedTime);
//               }}
//               required
//             >
//               <option value="">Select start time</option>
//               {timeSlots.map((slot, index) => (
//                 <option key={index} value={slot}>{slot}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>End Time:</label>
//             <select
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               required
//             >
//               <option value="">Select end time</option>
//               {timeSlots
//                 .filter((slot) => slot > time)
//                 .map((slot, index) => (
//                   <option key={index} value={slot}>{slot}</option>
//                 ))}
//             </select>
//           </div>
//           <div>
//             <label>Location:</label>
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             >
//               {locations.map((loc, index) => (
//                 <option key={index} value={loc}>{loc}</option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default BookAppointment;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CButton } from "@coreui/react";
import StarRating from "./RatingComponent";
import "../Styles/Rev.css";
import logo from '../images/WhatsApp Image 2024-11-09 at 8.25.43 PM (1).jpeg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const timeSlots = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
];

const locations = ["madipakkam", "balajinagar"];

const BookAppointment = () => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  // const [rating, setRating] = useState(0);
  // const [currentValue, seCurrentValue] = useState(0);
  const [date, setDate] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [time, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState(locations[0]);
  const [appointmentExists, setAppointmentExists] = useState(false);
  const [reason, setReason]  =useState("");
  const navigate = useNavigate();
  const TIMER_DURATION = 15 * 60 * 1000; // 1 minute
  const [loadings, setLoadings] = useState(false);

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const Submit = async (e) => {
    // console.log(username, comment, currentValue);
    e.preventDefault();
    try {
      const res = await axios.post("https://dentalsite-sparktech-2.onrender.com/app/postreview", {
        username,
        comment,
        rating: currentValue,
      });
      if (res.status === 200) {
        toast.success("Thanks for your valuable feedback", toastOptions);
      }
      console.log(username, comment, currentValue);
    } catch (e) {
      console.error("Error posting review:", e.response);
    }
  };

  useEffect(() => {
    const checkAppointment = () => {
      const storedAppointment = localStorage.getItem("appointment");
      const storedTimestamp = localStorage.getItem("appointmentTimestamp");

      if (storedAppointment === "payment_pending" && storedTimestamp) {
        const currentTime = Date.now();
        const appointmentTime = Number(storedTimestamp);

        if (currentTime - appointmentTime >= TIMER_DURATION) {
          localStorage.removeItem("appointment");
          localStorage.removeItem("appointmentTimestamp");
          localStorage.removeItem("rzp_checkout_anon_id");
          localStorage.removeItem("rzp_device_id");
          setAppointmentExists(false);
          toast.error(
            "Your appointment has been canceled as Payment was incomplete",
            toastOptions
          );
          // alert("Your appointment has been canceled as Payment was incomplete");
          navigate("/book");
        } else {
          // Set the appointment exists if still valid
          setAppointmentExists(true);
        }
      }
    };

    // Initial check for existing appointments
    checkAppointment();
  }, [navigate]);

  const orderId = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadings(true);
    try {
      const res = await axios.post(
        "https://dentalsite-sparktech-2.onrender.com/app/book",
        {
          reason,
          date,
          startTime: time,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLoadings(false);

      if (res.status === 200) {
        toast.success("Appointment available, confirm booking", res.data.orderId, toastOptions);
        // alert(res.data.orderId);
        localStorage.setItem("appointment", "payment_pending");
        localStorage.setItem("appointmentTimestamp", Date.now());
        setAppointmentExists(true); // Update state to reflect appointment exists
        console.log("Appointment booked and state updated.");
        fetchAvailableSlots();
        setLoadings(false);
        
      }
      const orderId = res.data.orderId; // Ensure you are retrieving orderId correctly
      const apptId = res.data.appointmentId;
      if (orderId && apptId) {
        localStorage.setItem("orderId", orderId); // Save orderId to localStorage
        localStorage.setItem("apptId", apptId);
        handleProceedToPayment(orderId); // Pass orderId to proceed to payment
      } else {
        console.error("Order ID is undefined in the response.");
      }
      setLoadings(false);
    } catch (error) {
      setLoadings(false);
      toast.error(
        error.response?.data?.message || "Failed to book appointment",
        toastOptions
      );
      console.error("Error booking appointment:", error.response);
    }
  };
  // localStorage.setItem("orderId", orderId);
  const handleProceedToPayment = () => {
    
    // console.log(orderId);
    navigate("/payment", {
      state: {
        exists: true,
        
        // orderId: orderId,
        timestamp: localStorage.getItem("appointmentTimestamp"),
      },
    });
  };

  // if (localStorage.getItem("authToken") === null) {
  //   return <h1>Unauthorized</h1>;
  // }

  const authToken = localStorage.getItem("authToken");

  // if (
  // localStorage.getItem("role") !== "user" &&

  // !authToken) {
  //   return <h1 className="" style={{paddingTop: "100px"}}>You must be user to perform booking</h1>;
  // }




  const today = new Date().toISOString().split("T")[0];

  const [availableSlots, setAvailableSlots] = useState({ madipakkam: {}, balajinagar: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString('en-CA'));

  useEffect(() => {
    const updateToday = () => {
      setTodayDate(new Date().toLocaleDateString('en-CA'));
    };

    updateToday();
    
    const intervalId = setInterval(updateToday, 1000 * 60 * 60 * 24);

    return () => clearInterval(intervalId);
  }, []);

 
  const timeSlots = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30"];



  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`https://dentalsite-sparktech-2.onrender.com/app/available-slots?date=${todayDate}`);
      setAvailableSlots(response.data.availableSlots);
      setLoading(false);
    } catch (error) {
      setError("Error fetching available slots");
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
    // console.log("Slot date : ", todayDate);
  }, [todayDate]);

  const appointment = localStorage.getItem("appointment");

  return (<div style={{width: "100%"}}>
    <div style={{marginTop: "100px"}} className="container"><Tabs><Tab eventKey="home" title="Book Appointment">
        {/* <AvailableSlots /> */}
        <div className="available-slots-container">
      <h3>Available Time Slots for Today</h3>

      <div className="slots row">
        <div className="col-md-6 location-slots">
          <h4>Madipakkam</h4>
          <ul className="list-group">
            {Object.entries(availableSlots.madipakkam).length > 0 ? (
              Object.entries(availableSlots.madipakkam).map(([slot, available]) => (
                <li key={slot} className="list-group-item">
                  {slot} - {available} slot{available !== 1 ? 's' : ''} left
                </li>
              ))
            ) : (
              <li className="list-group-item">No available slots</li>
            )}
          </ul>
        </div>
        <div className="col-md-6 location-slots">
          <h4>Balaji nagar</h4>
          <ul className="list-group">
            {Object.entries(availableSlots.balajinagar).length > 0 ? (
              Object.entries(availableSlots.balajinagar).map(([slot, available]) => (
                <li key={slot} className="list-group-item">
                  {slot} - {available} slot{available !== 1 ? 's' : ''} left
                </li>
              ))
            ) : (
              <li className="list-group-item">No available slots</li>
            )}
          </ul>
        </div>
      </div>      
    

    </div>
      </Tab></Tabs></div>
    <div
      className="container-fluid d-flex justify-content-center align-items-start flex-column"
      style={{ paddingTop: "100px" }}
    >
      <h1 className="text-center mb-4">Book Appointment</h1>
      <div className="row w-100">
        <div className="col-md-6">
          {appointmentExists && appointment==="payment_pending" ? (
            <div className="text-center">
              <h3>
                You have already booked an appointment, continue to Payment.
                Time Limit: 15 mins
              </h3>
              <button
                style={{ border: "0.3px solid black" }}
                className="btn br-5 btn-light mt-3"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <form className="fr" onSubmit={handleSubmit}>
              <div className="mb-3 form-group text-white">
                <label className="form-label">Reason for Booking:</label>
                <textarea
                rows={5}
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 form-group text-white">
                <label className="form-label">Date:</label>
                <input
                  type="date"
                  className="form-control"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 form-group text-white">
                <label className="form-label">Start Time:</label>
                <select
                  className="form-select"
                  value={time}
                  onChange={(e) => {
                    const selectedTime = e.target.value;
                    setStartTime(selectedTime);
                    const nextSlot =
                      timeSlots[timeSlots.indexOf(selectedTime) + 1];
                    setEndTime(nextSlot || selectedTime);
                  }}
                  required
                >
                  <option value="">Select start time</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-group text-white">
                <label className="form-label">Location:</label>
                <select
                  className="form-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              {authToken ? (
                <button type="submit" className="btn btn-light w-100"
                disabled={loadings}
                >
                  {loadings ? "Please wait..." : "Book"}
                  {/* Submit */}
                </button>
              ) : (
                <a href="/login">
                  <h5 className="btn btn-primary text-white">Login to Book</h5>
                </a>
              )}
            </form>
          )}
        </div>
        <div className="col-md-6 text-black">
          <h2>We're Here to Help</h2>
          <p>
            At ThulasiRaam Dental Hospital, your oral health and comfort are our
            top priorities. Feel free to reach out to us with any inquiries or
            concerns.
          </p>
          <h2>Office Hours</h2>
          <p>Monday to Sunday: 06:00 PM - 10:00 PM</p>
        </div>
      </div>
      <div className="writereview d-flex justify-content-center align-items-center text-center w-100 pt-5">
        <form
          onSubmit={Submit}
          className="revf border p-4 rounded shadow bg-light"
        >
          <h2 className="mb-4">Write a Review</h2>
          <div className="form-group mb-3">
            {/* <label htmlFor="username" className="form-label">Username:</label> */}
            <input
              type="text"
              id="username"
              placeholder="name"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            {/* <label htmlFor="review" className="form-label">Review:</label> */}
            <textarea
              id="review"
              className="form-control"
              placeholder="Add your feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-group mb-4 d-flex flex-column justify-content-center flex-wrap text-center align-items-center">
            {/* <label className="me-3">Rating:</label> */}
            <div>
              <StarRating onRatingChange={setCurrentValue} />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div></div>
      <h1 className="text-center fw-5 p-5 w-100" style={{textTransform: "capitalize"}}>Locations</h1>
      {/* <div style={{width: "100%", minHeight: "50vh"}} class="container123 position-relative w-100 d-md-flex flex-md-row d-flex flex-column">
        
        <div class="map1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.28107876955!2d80.20482007588429!3d12.953857387359887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d4044339ec5%3A0x8bca68a2cfd3593d!2sDr.%20E%20Thulasiraam%20Dental%20and%20Orthodontic%20Center!5e0!3m2!1sen!2sin!4v1727241024860!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div class="map2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.200311225868!2d80.19998547588439!3d12.959030487355188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525db15316369d%3A0x8bd810380c921037!2sDr.E.Thulasiraam%20Dental%26orthodontic%20center%7CSmile%20Design%20in%20Madipakkam%7CRoot%20Canal%20in%20Madipakkam%7CSmile%20Correction%20in%20Madipakkam!5e0!3m2!1sen!2sin!4v1727240997166!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div> */}

<div style={{minHeight: "fit-content"}} className="container123 position-relative w-100 d-md-flex p-5 flex-md-row d-flex flex-column">
  <div className="map1 col-md-6 col-12">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.28107876955!2d80.20482007588429!3d12.953857387359887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d4044339ec5%3A0x8bca68a2cfd3593d!2sDr.%20E%20Thulasiraam%20Dental%20and%20Orthodontic%20Center!5e0!3m2!1sen!2sin!4v1727241024860!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ width: "100%", height: "100%", border: 0 }}
    ></iframe>
  </div>

  <div className="map2 col-md-6 col-12">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.200311225868!2d80.19998547588439!3d12.959030487355188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525db15316369d%3A0x8bd810380c921037!2sDr.E.Thulasiraam%20Dental%26orthodontic%20center%7CSmile%20Design%20in%20Madipakkam%7CRoot%20Canal%20in%20Madipakkam%7CSmile%20Correction%20in%20Madipakkam!5e0!3m2!1sen!2sin!4v1727240997166!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ width: "100%", height: "100%", border: 0 }}
    ></iframe>
  </div>
</div>


    {/* </div> */}


    {/* <div className="position-relative" style={{width: "100%", minHeight: ""}}>
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
        </div>
      </div>
    </footer>
    </div> */}



{/* <div className="position-relative" style={{ width: "100%", minHeight: "200px" }}>
  <footer style={{ background: "#2a4735" }} className="foot">
    <div style={{ background: "#2a4735", color: "white" }} className="container py-5">
      <div className="row footer-con">
        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center text-center flex-column mb-4 mb-md-0"
        >
          <h2 className="footer-logo fw-5 fs-1">Thulasiraam</h2>
          <img src={logo} alt="Logo" className="footer-logo-img my-3" style={{ maxWidth: "150px" }} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center text-center flex-column"
        >
          <h4>Our Services</h4>
          <ul className="footer-services list-unstyled mt-3">
            <li className="mt-3">Root Canal</li>
            <li className="mt-3">Pediatric Dentistry</li>
            <li className="mt-3">Complete Dentures</li>
            <li className="mt-3">Orthodontics</li>
            <li className="mt-3">Flap Surgery</li>
            <li className="mt-3">Crowns and Bridges</li>
          </ul>
        </div>
      </div>
      <hr className="my-4" />
      <div className="row">
        <h2 className="w-100 text-center fw-5 fs-1 mb-4">Contact us</h2>
        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center text-center flex-column mb-4 mb-md-0"
        >
          <p>
            <i className="fa fa-instagram"></i> _mo.nish_ 9
          </p>
          <p>
            <i className="fa fa-envelope"></i> ThulasiRaam@gmail.com
          </p>
          <p>
            <i className="fa fa-map-marker"></i> 18, Venkatesa St, Pallikaranai, Chennai, Tamil Nadu
          </p>
          <p>
            <i className="fa fa-phone"></i> +91-7052-101-786
          </p>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center text-center flex-column"
        >
          <p>
            <i className="fa fa-instagram"></i> _mo.nish_
          </p>
          <p>
            <i className="fa fa-envelope"></i> ThulasiRaam@gmail.com
          </p>
          <p>
            <i className="fa fa-map-marker"></i> 18, Venkatesa St, Pallikaranai, Chennai, Tamil Nadu
          </p>
          <p>
            <i className="fa fa-phone"></i> +91-7052-101-786
          </p>
        </div>
      </div>
    </div>
  </footer>
</div> */}


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


    <ToastContainer />
    </div>
  );
};

export default BookAppointment;