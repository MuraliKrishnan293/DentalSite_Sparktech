import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Admin from './Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import AvailableSlots from './Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAvailableSlots, addAppointment } from '../Redux/appointmentSlice';
import { fetchAppointments } from '../Redux/appointmentSlice';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchReason, setSearchReason] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);






  useEffect(() => {
    const results = appointments.filter((appointment) => {
      const nameMatch = searchName ? appointment.userInfo.toLowerCase().includes(searchName.toLowerCase()) : true;
      const reasonMatch = searchReason ? appointment.reason.toLowerCase().includes(searchReason.toLowerCase()) : true;
      const locationMatch = searchLocation ? appointment.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
      const dateMatch = searchDate ? appointment.date === searchDate : true;
      const timeMatch = searchTime ? appointment.startTime === searchTime : true;
      
      return nameMatch && reasonMatch && locationMatch && dateMatch && timeMatch;
    });

    setFilteredAppointments(results);
  }, [searchName, searchReason, searchLocation, searchDate, searchTime, appointments]);
  // const { appointments } = useSelector((state) => state.appointments);

  // useEffect(() => {
  //   dispatch(fetchAppointments());
  // }, [dispatch]);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/app/allusers', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        const data = response.data;
        const nonAdminUsers = data.filter(user => user.role !== "admin");
        setUsers(nonAdminUsers);
        console.log(users);
      } catch (error) {
        if (error.response) {
          console.error("Error fetching users:", error.response.data);
          console.error("Status code:", error.response.status);
      } else {
          console.error("Error fetching users:", error.message);
      }
      }
    };
    fetchUsers();
  }, []);

  console.log(users);

  // const { appointments, status } = useSelector((state) => state.appointments);

  // useEffect(() => {
  //   // const authToken = localStorage.getItem("authToken");
  //   // if (authToken) {
  //     dispatch(fetchAppointments());
  //   // }
  // }, [dispatch]);
  
  
  
  // useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res1 = await axios.get('http://localhost:5000/app/allappointments',{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        setAppointments(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
  //   fetchAppointments();
  // }, []);


  console.log('Appointments state:', appointments);


  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const res1 = await axios.get('http://localhost:5000/app/getreviews',{
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //           }
  //       });
        
  //       setReviews(res1.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);

  const role = localStorage.getItem("role");
  console.log("authToken : ", authToken);














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

  // const dispatch = useDispatch();
  // const { appointments, status } = useSelector((state) => state.appointments);

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


  useEffect(() => {
    fetchAppointments();
  }, [authToken]);

  // if(appointments.length<1){
  //   return <div className='p-5 text-center' style={{marginTop: "300px"}}><h1>No appointments found</h1></div>;
  // }
  

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
      fetchAppointments();
    } catch (error) {
      toast.error("Error adding appointment", toastOptions);
      console.error('Error adding appointment:', error);
    }
  }


  const toggleModal = () => {
    setShowModal(!showModal);
  };
  

  return (
    <>
    {/* {role!=="admin" && (<h1>No</h1>)} */}
    <div style={{ paddingTop: '100px' }} className='container'>
      

    <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Book Appointment">
        {/* <AvailableSlots /> */}
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
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className='text-white'>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userInfo"
                      value={newAppointment.userInfo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className='text-white'>Reason</label>
                    <input
                      type="text"
                      className="form-control"
                      name="reason"
                      value={newAppointment.reason}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className='text-white'>Location</label>
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
                    <label className='text-white'>Date</label>
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
                  // window.location.reload("#app")
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
      </Tab>
      <Tab eventKey="profile" title="Users">
      <div className="table-responsive">
         <h4>All Users</h4>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Tab>
      <Tab id="app" eventKey="contact" title="Appointments">
      {appointments.length===0 ? (<h1 className='text-center w-100' style={{marginTop: "100px"}}>No Appointmnets Booked</h1>)
    :
    (<>
    <div className="row mb-4">
        <div className="col-md-2">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={searchReason}
            onChange={(e) => setSearchReason(e.target.value)}
            placeholder="Search by Reason"
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by Location"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          {/* <input
            type="time"
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
            className="form-control"
          /> */}
          <select
                      className="form-select"
                      value={searchTime}
                      onChange={(e) => setSearchTime(e.target.value)}
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
      </div>
    <div style={{overflowX: "hidden"}} className="table-responsive">
    
      <div className="row">
        <div className="col">
          <h5>Vadapalani</h5>
          <table className="table table-bordered table-black table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              
              {filteredAppointments
                .filter(appointment => appointment.location === "vadapalani")
                .map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      <span className={appointment.status === "confirmed" ? "bg-success btn btn-rounded" : "bg-danger"}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>{appointment.date}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="col">
          <h5>Perambur</h5>
          <table className="table table-bordered table-black table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments
                .filter(appointment => appointment.location === "perambur") // Replace with actual location
                .map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      <span className={appointment.status === "confirmed" ? "bg-success btn btn-rounded" : "bg-danger"}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>{appointment.date}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div></>)  
    }
  
</Tab>
    </Tabs>
  {/* ); */}
{/* } */}

{/* export default NoAnimationExample; */}
    </div>
    <ToastContainer />
    </>
  );
}

export default AdminPanel;