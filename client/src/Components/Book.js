import React, { useState } from "react";
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
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    console.log(time,
        endTime);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/app/book",
        {
            date,
            startTime: time,
            // endTime,
            location,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
      );

      if (res.status === 200) {
        toast.success("Appointment booked successfully!", toastOptions);
        navigate("/payment");
      }
    } catch (error) {
        console.log("Error response:", error.response);
        toast.error(error.response?.data?.message || "Failed to book appointment", toastOptions);
    }    
  };

  if(localStorage.getItem("authToken")===null){
    return (<h1>Unauthorized</h1>)
  }

  return (
    <div className="book-appointment">
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <select
            value={time}
            onChange={(e) => {
              const time = e.target.value;
              setStartTime(time);
              // Automatically set endTime based on startTime
              const nextSlot = timeSlots[timeSlots.indexOf(time) + 1];
              setEndTime(nextSlot || time); // Default to startTime if no next slot
            }}
            required
          >
            <option value="">Select start time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div>
          <label>End Time:</label>
          <select
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
        </div>
        <div>
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;