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
//       const res = await axios.post("http://localhost:5000/app/book", {
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

const locations = ["vadapalani", "perambur"];

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
  const navigate = useNavigate();
  const TIMER_DURATION = 15 * 60 * 1000; // 1 minute for testing (15 minutes in production)

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const Submit = async (e) => {
    console.log(username, comment, currentValue);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/app/postreview", {
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
          toast.info(
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/app/book",
        {
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

      if (res.status === 200) {
        toast.success("Appointment available, confirm booking", toastOptions);
        localStorage.setItem("appointment", "payment_pending");
        localStorage.setItem("appointmentTimestamp", Date.now());
        setAppointmentExists(true); // Update state to reflect appointment exists
        console.log("Appointment booked and state updated.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment",
        toastOptions
      );
      console.error("Error booking appointment:", error.response);
    }
  };

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        exists: true,
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

  return (
    // <div style={{ padding: "100px" }} className="container book-appointment">
    //   <h1>Book Appointment</h1>

    //   {appointmentExists ? (
    //     <div>
    //       <h3>You have already booked an appointment, continue to Payment. Time Limit: 15 mins</h3>
    //       <button onClick={handleProceedToPayment}>
    //         Proceed to Payment
    //       </button>
    //     </div>
    //   ) : (
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label>Date:</label>
    //         <input
    //           type="date"
    //           value={date}
    //           onChange={(e) => setDate(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Start Time:</label>
    //         <select
    //           value={time}
    //           onChange={(e) => {
    //             const selectedTime = e.target.value;
    //             setStartTime(selectedTime);
    //             const nextSlot = timeSlots[timeSlots.indexOf(selectedTime) + 1];
    //             setEndTime(nextSlot || selectedTime);
    //           }}
    //           required
    //         >
    //           <option value="">Select start time</option>
    //           {timeSlots.map((slot, index) => (
    //             <option key={index} value={slot}>{slot}</option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label>End Time:</label>
    //         <select
    //           value={endTime}
    //           onChange={(e) => setEndTime(e.target.value)}
    //           required
    //         >
    //           <option value="">Select end time</option>
    //           {timeSlots
    //             .filter((slot) => slot > time)
    //             .map((slot, index) => (
    //               <option key={index} value={slot}>{slot}</option>
    //             ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label>Location:</label>
    //         <select
    //           value={location}
    //           onChange={(e) => setLocation(e.target.value)}
    //           required
    //         >
    //           {locations.map((loc, index) => (
    //             <option key={index} value={loc}>{loc}</option>
    //           ))}
    //         </select>
    //       </div>
    //       <button type="submit">Submit</button>
    //     </form>
    //   )}

    //   <ToastContainer />
    // </div>

    <div
      className="container-fluid d-flex justify-content-center align-items-start flex-column"
      style={{ paddingTop: "100px" }}
    >
      <h1 className="text-center mb-4">Book Appointment</h1>
      <div className="row w-100">
        <div className="col-md-6">
          {appointmentExists ? (
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-group text-white">
                <label className="form-label">Date:</label>
                <input
                  type="date"
                  className="form-control"
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
              {/* <div className="mb-3 form-group text-white">
                <label className="form-label">End Time:</label>
                <select
                  className="form-select"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                >
                  <option value="">Select end time</option>
                  {timeSlots
                    .filter((slot) => slot > time)
                    .map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>
              </div> */}
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
                <button type="submit" className="btn btn-light w-100">
                  Submit
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
      </div>
      <div class="container123 p-5 w-100 d-md-flex flex-md-row d-flex flex-column">
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;
