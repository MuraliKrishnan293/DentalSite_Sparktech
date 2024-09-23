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

const timeSlots = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
];

const locations = ["vadapalani", "perambur"];

const BookAppointment = () => {
  const [date, setDate] = useState("");
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
          setAppointmentExists(false);
          toast.info("Your appointment has been canceled as Payment was incomplete", toastOptions);
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
      const res = await axios.post("http://localhost:5000/app/book", {
        date,
        startTime: time,
        location,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (res.status === 200) {
        toast.success("Appointment available, confirm booking", toastOptions);
        localStorage.setItem("appointment", "payment_pending");
        localStorage.setItem("appointmentTimestamp", Date.now());
        setAppointmentExists(true); // Update state to reflect appointment exists
        console.log("Appointment booked and state updated.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book appointment", toastOptions);
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

  if (localStorage.getItem("authToken") === null) {
    return <h1>Unauthorized</h1>;
  }

  if (localStorage.getItem("role") !== "user") {
    return <h1 className="" style={{paddingTop: "100px"}}>You must be user to perform booking</h1>;
  }

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

    <div className="container-fluid d-flex justify-content-center align-items-start flex-column" style={{ paddingTop: "100px" }}>
      <h1 className="text-center mb-4">Book Appointment</h1>
      <div className="row w-100">
        <div className="col-md-6">
          {appointmentExists ? (
            <div className="text-center">
              <h3>You have already booked an appointment, continue to Payment. Time Limit: 15 mins</h3>
              <button style={{border: "0.3px solid black"}} className="btn br-5 btn-light mt-3" onClick={handleProceedToPayment}>
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
                    const nextSlot = timeSlots[timeSlots.indexOf(selectedTime) + 1];
                    setEndTime(nextSlot || selectedTime);
                  }}
                  required
                >
                  <option value="">Select start time</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
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
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-light w-100">Submit</button>
            </form>
          )}
        </div>
        <div className="col-md-6 text-black">
          <h2>We're Here to Help</h2>
<p>At ThulasiRaam Dental Hospital, your oral health and comfort are our top priorities. Feel free to reach out to us with any inquiries or concerns.</p>
<h2>Office Hours</h2>
<p>Monday to Sunday: 06:00 PM - 10:00 PM</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;