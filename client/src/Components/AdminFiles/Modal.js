import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableSlots, addAppointment } from '../Redux/appointmentSlice';

const AvailableSlots = () => {
  const [availableSlots, setAvailableSlots] = useState({ vadapalani: {}, perambur: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // New state for success modal
  const [newAppointment, setNewAppointment] = useState({
    userId: '',
    userInfo: "",
    reason: '',
    location: 'vadapalani',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
  });

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);

  const todayDate = new Date().toISOString().split('T')[0];
  const timeSlots = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30"];
  const today = new Date().toISOString().split("T")[0];

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/app/available-slots?date=${todayDate}`);
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
  }, [todayDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

//   const dispatch = useDispatch();


//Redux


//   const handleAddAppointment = async () => {
//     try {
//     await dispatch(addAppointment(newAppointment)).unwrap(); // Unwrap to handle errors
//     setShowModal(false); // Close the modal after successful addition
//     setSuccessModal(true); // Show success modal
//     fetchAvailableSlots(); // Refresh available slots after adding an appointment
//     setNewAppointment({
//     userId: '',
//     userInfo: "",
//     reason: '',
//     location: 'vadapalani',
//     date: "",
//     startTime: '',
//     });

//   } catch (error) {
//     toast.error("Error in Adding Appointments", toastOptions);
//     console.error('Error adding appointment:', error);
//   }



//Normal

const handleAddAppointment = async () => {
    try {
      await axios.post('http://localhost:5000/app/offline-book', newAppointment);
      toast.success("Appointment added successfully!", toastOptions);
      setShowModal(false); // Close the modal after successful addition
      fetchAvailableSlots(); // Refresh available slots after adding an appointment

      // Reset new appointment state
      setNewAppointment({
        userId: '',
        userInfo: "",
        reason: '',
        location: 'vadapalani',
        date: todayDate,
        startTime: '',
      });
    } catch (error) {
      toast.error("Error adding appointment", toastOptions);
      console.error('Error adding appointment:', error);
    }
  }





    // try {
    //   const response = await axios.post('http://localhost:5000/app/offline-book', newAppointment);
    //   console.log('Appointment added:', response.data);
    //   setShowModal(false);

    //   toast.success("Added Appointment Successfully", toastOptions);
      
    //   // Show success modal
    //   setSuccessModal(true);


    //   // Refresh available slots after adding an appointment
    //   await fetchAvailableSlots();
    // } catch (error) {
    //   toast.error("Error in Adding Appointments", toastOptions);
    //   console.error('Error adding appointment:', error);
    // }
//   };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

//   if (loading) {
//     return <div>Loading available slots...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

  return (
    <div className="available-slots-container">
      <h3>Available Time Slots for Today</h3>
      <button className="btn btn-primary mb-3" onClick={toggleModal}>
        Add Appointment
      </button>

      <div className="slots row">
        <div className="col-md-6 location-slots">
          <h4>Vadapalani</h4>
          <ul className="list-group">
            {Object.entries(availableSlots.vadapalani).length > 0 ? (
              Object.entries(availableSlots.vadapalani).map(([slot, available]) => (
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
          <h4>Perambur</h4>
          <ul className="list-group">
            {Object.entries(availableSlots.perambur).length > 0 ? (
              Object.entries(availableSlots.perambur).map(([slot, available]) => (
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

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Appointment</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userInfo"
                      value={newAppointment.userInfo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Reason</label>
                    <input
                      type="text"
                      className="form-control"
                      name="reason"
                      value={newAppointment.reason}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <select
                      className="form-control"
                      name="location"
                      value={newAppointment.location}
                      onChange={handleInputChange}
                    >
                      <option value="vadapalani">Vadapalani</option>
                      <option value="perambur">Perambur</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      min={today}
                      className="form-control"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 form-group text-white">
                    <label className="form-label">Start Time:</label>
                    <select
                      className="form-select"
                      value={newAppointment.startTime}
                      onChange={(e) => {
                        const selectedTime = e.target.value;
                        setNewAppointment((prev) => ({
                          ...prev,
                          startTime: selectedTime,
                        }))
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
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddAppointment}>
                  Save Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Booked</h5>
              </div>
              <div className="modal-body">
                <p>Your appointment has been successfully booked!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                  setSuccessModal(false); 
                  window.location.reload("#app")
                  fetchAvailableSlots(); // Refresh available slots
                }}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AvailableSlots;