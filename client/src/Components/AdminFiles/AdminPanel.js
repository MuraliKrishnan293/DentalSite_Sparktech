import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Admin from './Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import AvailableSlots from './Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { fetchAvailableSlots, addAppointment } from '../Redux/appointmentSlice';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import '../../App.css';
import Billing from '../Billing';
import Reviews from '../Reviews';
import PrescriptionForm from './Prescription';

const rowsToShow = 10;
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
  const [fileData, setFileData] = useState({});
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [appointments1, setAppointments1] = useState([]);  // Store all appointments
  const [editingAppointment, setEditingAppointment] = useState(null); // The appointment currently being edited
  const [newPatientName, setNewPatientName] = useState("");  // Store new patient name input
  const [alldatap, setAllDataP] = useState([]);
  // const [alldatap, setAllDataP] = useState([]);
  



  //Pagination
  //const currentAppointments = appointments.slice((page - 1) * rowsPerPage, page * rowsPerPage);



  const updatePatientName = async (appointmentId, newPatientName) => {
    try {
      const response = await axios.put(
        `https://dentalsite-sparktech-2.onrender.com/app/updateappointment/${appointmentId}`,
        { patientName: newPatientName },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      
      const updatedAppointments = appointments.map(appointment =>
        appointment._id === appointmentId ? { ...appointment, userInfo: newPatientName } : appointment
      );
      setAppointments(updatedAppointments);
      //////////console.log("Appointment updated:", response.data);
    } catch (error) {
      //////////console.error("Error updating patient name:", error);
    }
  };
  

const fetchApp1 = async()=>{
  try {
    //https://dentalsite-sparktech-2.onrender.com
    const res1 = await axios.get('https://dentalsite-sparktech-2.onrender.com/app/allappfilter',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    setAllDataP(res1.data.Appointments);
    //////////console.log("All Appointments : ", res1.data);
  } catch (error) {
    //////////console.error(error);
  }
};



const fetchAppointments = async (page=1, limit=10) => {
  try {
    //https://dentalsite-sparktech-2.onrender.com
    const res1 = await axios.get(`https://dentalsite-sparktech-2.onrender.com/app/allappointments?page=${page}&limit=${limit}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    //////////console.log("res1.data.totalPages : " + res1.data.totalPages);
  setTotalPages(res1.data.totalPages);
  setCurrentPage(res1.data.currentPage);
    setAppointments(res1.data.appointments);
  } catch (error) {
    //////////console.error(error);
  }
};

// const fetchApp1 = async()=>{
//   try {
//     //https://dentalsite-sparktech-2.onrender.com
//     const res1 = await axios.get('https://dentalsite-sparktech-2.onrender.com/app/allappfilter',{
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//         }
//     });
//     setAllDataP(res1.data.appointments);
//     //////////console.log("All Appointments", res1.data.appointments);
//   } catch (error) {
//     //////////console.error(error);
//   }
// };

// fetchAppointments(1, 20);



  // const loadMore = () => {
  //   setPage(page + 1);
  // };











  const role = localStorage.getItem("role");
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (role !== 'admin') {
      // If the user is not an admin, don't fetch data or show an error message
      //////////console.log('You are not authorized to view this page.');
      
      return (<div>
        <h1 className='text-danger'>Un Authorized</h1>
      </div>);
    }
  }
  ,[role, authToken]);

  // const toastOptions = {
  //   position: "top-left",
  //   autoClose: 5000,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   theme: "dark",
  // };



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

const handleSubmit = async (event, appointmentId) => {
  event.preventDefault(); // Prevent default form submission
  // alert(`Uploading to: https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/upload`);

  if (!file) {
      alert('Please select a file before uploading.');
      return;
  }

  const formData = new FormData();
  formData.append('Prescription_Files', file); // Ensure you have the file variable defined

  try {
      const response = await axios.post(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/upload`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              // 'Authorization': 
          },
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
            appt._id === appointmentId
                ? { ...appt, fileId: file.name, fileName: file.name } // Update the fileId and fileName
                : appt
        )
    );
      //////////console.log(response.data); // Log the server response
      // alert(`File uploaded successfully!`); // Optional success message
      toast.success("File uploaded successfully!", toastOptions);
  } catch (error) {
      //////////console.error('Error uploading file:', error.response || error); // Log error response
      alert('Failed to upload file: ' + (error.response ? error.response.data : error.message));
      toast.error('Failed to upload file: ' + (error.response ? error.response.data : error.message), toastOptions);
  }
};








const handleDownloadFile = async (e, appointmentId) => {
  e.preventDefault();
  // alert("Id: " + appointmentId);
  try {
      // Make a GET request to the server to fetch the file
      const response = await axios.get(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/file`, {
          responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the blob file
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;

      // Get the file name from the Content-Disposition header, if available
      const disposition = response.headers['content-disposition'];
      const fileName = "downloaded_file.pdf";



      if (disposition) {
        const filenameMatch = disposition.match(/filename="?(.+?)"?;?/);
        if (filenameMatch.length > 1) {
            fileName = filenameMatch[1];
        }
    }

      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();

      // Clean up
      document.body.removeChild(fileLink);
      window.URL.revokeObjectURL(fileURL);
  } catch (error) {
      //////////console.error('Error downloading file:', error);
      alert('Failed to download the file.');
  }
};




  






  // useEffect(() => {
  //   if (!appointments || appointments.length === 0) return;
  //   if (Array.isArray(appointments)) {
  //   const results = appointments.filter((appointment) => {
  //     const nameMatch = searchName ? appointment.userInfo.toLowerCase().includes(searchName.toLowerCase()) : true;
  //     const reasonMatch = searchReason ? appointment.reason.toLowerCase().includes(searchReason.toLowerCase()) : true;
  //     const locationMatch = searchLocation ? appointment.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
  //     const dateMatch = searchDate ? appointment.date === searchDate : true;
  //     const timeMatch = searchTime ? appointment.startTime === searchTime : true;
      
  //     return nameMatch && reasonMatch && locationMatch && dateMatch && timeMatch;
  //   });

  //   setFilteredAppointments(results);
  // }
  // else{
  //   //////////console.error('Error fetching appointments:', appointments);
  // }
  // }, [searchName, searchReason, searchLocation, searchDate, searchTime, appointments]);



  // const paginatedAppointments = searchName || searchReason || searchLocation || searchDate || searchTime
  // ? filteredAppointments
  // : appointments;

// 1️⃣ First, filter the full list of appointments
const displayAppointments = (searchName || searchReason || searchLocation || searchDate || searchTime)
  ? alldatap.filter((appointment) => {

      const nameMatch = searchName ? appointment.userInfo.toLowerCase().includes(searchName.toLowerCase()) : true;
      const reasonMatch = searchReason ? appointment.reason.toLowerCase().includes(searchReason.toLowerCase()) : true;
      const locationMatch = searchLocation ? appointment.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
      const dateMatch = searchDate ? appointment.date === searchDate : true;
      const timeMatch = searchTime ? appointment.startTime === searchTime : true;

      return nameMatch && reasonMatch && locationMatch && dateMatch && timeMatch;
    })
  : appointments;

// 2️⃣ Then, apply pagination on the filtered list
const paginatedAppointments = displayAppointments.slice(0, rowsToShow);




// const paginatedAppointments = displayAppointments;





  // const { appointments } = useSelector((state) => state.appointments);

  // useEffect(() => {
  //   dispatch(fetchAppointments());
  // }, [dispatch]);

  
  

  useEffect(() => {
    const role1 = localStorage.getItem("role");
    if(role1==="admin"){
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dentalsite-sparktech-2.onrender.com/app/allusers', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        const data = response.data;
        const nonAdminUsers = data.filter(user => user.role !== "admin");
        setUsers(nonAdminUsers);
        //////////console.log(users);
      } catch (error) {
        if (error.response) {
          //////////console.error("Error fetching users:", error.response.data);
          //////////console.error("Status code:", error.response.status);
      } else {
          //////////console.error("Error fetching users:", error.message);
      }
      }
    };
    fetchUsers();
  }
  }, []);

  //////////console.log(users);

  // const { appointments, status } = useSelector((state) => state.appointments);

  // useEffect(() => {
  //   // const authToken = localStorage.getItem("authToken");
  //   // if (authToken) {
  //     dispatch(fetchAppointments());
  //   // }
  // }, [dispatch]);
  
  
  
  // const handleShowMore = () => {
  //   setRowsToShow(rowsToShow + 10);
  // };
  // useEffect(() => {
    // const fetchAppointments = async () => {
    //   try {
    //     //https://dentalsite-sparktech-2.onrender.com
    //     const res1 = await axios.get('https://dentalsite-sparktech-2.onrender.com/app/allappointments',{
    //         headers: {
    //           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //         }
    //     });
    //     //////////console.log(res1);
    //     setAppointments(res1.data.appointments);
    //   } catch (error) {
    //     ////////console.error(error);
    //   }
    // };
  //   fetchAppointments();
  // }, []);


  ////////console.log('Appointments state:', appointments);


  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const res1 = await axios.get('https://dentalsite-sparktech-2.onrender.com/app/getreviews',{
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //           }
  //       });
        
  //       setReviews(res1.data);
  //     } catch (error) {
  //       ////////console.error(error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);

  
  ////////console.log("authToken : ", authToken);

  useEffect(()=>{
    const role = localStorage.getItem("role");
  ////////console.log("Role : ", role);
  },[]);



//   const handleFileChange = (e, appointmentId) => {
//     setFileData({ ...fileData, [appointmentId]: e.target.files[0] }); // Make sure this is consistent with your state management
// };

// const handleUpload = async (appointmentId) => {
//     const formData = new FormData();
//     formData.append('Prescription_Files', fileData[appointmentId]);

//     try {
//         await axios.post(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/upload`, formData);
//         alert('File uploaded successfully!');
//     } catch (error) {
//         ////////console.error('Error uploading file', error);
//         alert('Error uploading file');
//     }
// };









  const [availableSlots, setAvailableSlots] = useState({ madipakkam: {}, balajinagar: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [successModal, setSuccessModal] = useState(false); // New state for success modal
  const [newAppointment, setNewAppointment] = useState({
    userId: '',
    userInfo: "",
    reason: '',
    phoneNumber: '',
    location: 'madipakkam',
    date: new Date().toLocaleDateString('en-CA'),
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
  // const today = new Date().toISOString().split("T")[0];

  useEffect(()=>{
    ////////console.log(todayDate);
  },[]);

  

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`https://dentalsite-sparktech-2.onrender.com/app/available-slots?date=${todayDate}`);
      setAvailableSlots(response.data.availableSlots);
      setLoading(false);
    } catch (error) {
      setError("Error fetching available slots");
      ////////console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
    ////////console.log("Slot date : ", todayDate);
  }, [todayDate]);
  ////////console.log("Slot date : ", todayDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };


  useEffect(() => {
    fetchAppointments();
      fetchApp1();
    const interval = setInterval(()=>{
      fetchAvailableSlots();

      return () => clearInterval(interval);
    },5000);
    
  }, [authToken]);

  const [load, setLoad] = useState(false);
  

  const handleAddAppointment = async () => {
    // setLoad(true);
    setLoad(false);
    //////////console.log(newAppointment);
    if (!newAppointment.userInfo || !newAppointment.reason || !newAppointment.date || !newAppointment.phoneNumber || !newAppointment.startTime) {
      toast.error("Please fill in all required fields.", toastOptions);
      setLoad(false);
      return; // Exit function if validation fails
    }

    // setLoad(false);
  
    // Validate available slot for the selected location
    const availableSlotsForLocation = availableSlots[newAppointment.location];
    if (!availableSlotsForLocation || availableSlotsForLocation[newAppointment.startTime] === 0) {
      toast.error("Selected time slot is not available.", toastOptions);
      setLoad(false);
      return; // Exit function if the slot is not available
      
    }

    
    try {
      setLoad(true);
      document.getElementById("lo").disabled = true;
      await axios.post('https://dentalsite-sparktech-2.onrender.com/app/offline-book', newAppointment);
      toast.success("Appointment added successfully!", toastOptions);
      setShowModal(false); // Close the modal after successful addition
      fetchAvailableSlots(); // Refresh available slots after adding an appointment

      // Reset new appointment state
      setNewAppointment({
        userId: '',
        userInfo: "",
        reason: '',
        phoneNumber:'',
        location: 'madipakkam',
        date: todayDate,
        startTime: '',
      });
      fetchAppointments();
      closeModal();
      setLoad(false);
    } catch (error) {
      setLoad(false);
      toast.error("Error adding appointment", toastOptions);
      //////////console.log('Error adding appointment:', error);
    }
  }

  // useEffect(() => {
  //   if (closeModal) {
  //     setNewAppointment({
  //       userId: '',
  //       userInfo: "",
  //       reason: '',
  //       phoneNumber: '',
  //       location: 'madipakkam',
  //       date: todayDate,
  //       startTime: '',
  //     });
  //   }
  // }, [closeModal]);


  const toggleModal = () => {
    setShowModal(!showModal);
  };



  const handleToggleVisited = async (appointmentId, currentStatus) => {
    try {
        const response = await axios.put(
            `https://dentalsite-sparktech-2.onrender.com/app/appointment/${appointmentId}`,
            { visited: !currentStatus },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        // Check the response and handle unexpected formats
        // if (!response || !response.data || typeof response.data.visited !== 'boolean') {
        //     //////////console.error("Unexpected response data:", response);
        //     return;
        // }

        // If data is valid, update the state
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment._id === appointmentId
                    ? { ...appointment, visited: response.data.visited }
                    : appointment
            )
        );
    } catch (error) {
        //////////console.error("Error updating visited status:", error.message);
        // Display more specific errors based on the error type
        //////////console.log(error);
        if (error.response) {
            //////////console.error("Server responded with error:", error.response.status);
        } else if (error.request) {
            //////////console.error("No response from server, possible network issue");
        } else {
            //////////console.error("Unexpected error:", error.message);
        }
    }
};



const [amountsPaid, setAmountsPaid] = useState({});

const handleAmountChange = (e, appointmentId) => {
  const updatedAmount = Number(e.target.value);
  setAmountsPaid((prevAmounts) => ({
    ...prevAmounts,
    [appointmentId]: updatedAmount,
  }));
};




const handleUpdatePayment = async (appointmentId) => {
  const updatedAmount = amountsPaid[appointmentId];  // Get the specific amount for the appointment

  if (updatedAmount === undefined || updatedAmount === null) {
    alert("Please enter a valid amount.");
    return;
  }
  try {
    const response = await fetch(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/update-payment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ amountPaid: updatedAmount })
    });
    // setAmountsPaid(null);
    const data = await response.json();
    if (response.ok) {
      toast.success("Payment updated successfully", toastOptions);
      setAmountsPaid((prevAmounts) => {
        const { [appointmentId]: _, ...rest } = prevAmounts; // Remove updated appointment's amount
        return rest;});
    } else {
      alert(data.message || "Failed to update payment");
    }
    setAmountsPaid(null);
  } catch (error) {
    setAmountsPaid(null);
    //////////console.error("Error updating payment:", error);
  }
};

const [editingId, setEditingId] = useState(null);
const [editedName, setEditedName] = useState("");

const handleEdit = (id, currentName) => {
  setEditingId(id);
  setEditedName(currentName);
};

const handleSaveName = async (id) => {
  //////////console.log("Patient name updated successfully! + " + editedName);
  try {
    await axios.put(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${id}/update-patientname`, {
      userInfo: editedName,
    },{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    toast.success("Patient name updated successfully!");
    // alert("Patient name updated successfully! + " + editedName);
    setEditingId(null);
    fetchAppointments();
  } catch (error) {
    setEditingId(null);
    //////////console.error("Error updating name", error);
  }
};



const [editingPId, setEditingPId] = useState(null);
const [editedPhoneNumber, setEditedPhoneNumber] = useState("");

const handleEditPhoneNumber = (id, phoneNumber) => {
  setEditingPId(id);
  setEditedPhoneNumber(phoneNumber);
};



const handleSavePhoneNumber = async (id) => {
  //////////console.log("Patient name updated successfully! + " + editedName);
  try {
    await axios.put(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${id}/update-phonenumber`, {
      phoneNumber: editedPhoneNumber,
    },{
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    toast.success("Phonenumber updated successfully!");

    // alert("Phonenumber updated successfully! + " + editedPhoneNumber);
    setEditingPId(null);
    fetchAppointments();
  } catch (error) {
    setEditingPId(null);
    //////////console.error("Error updating name", error);
  }
};



//Delete Appointment
const deleteAppointment = async (appointmentId) => {
  const authToken1 = localStorage.getItem("authToken");
  if (!authToken) {
    alert("Authentication token missing. Please log in again.");
    return;
  }
  try {
    const response = await axios.delete("https://dentalsite-sparktech-2.onrender.com/app/delete-appointment", {
      data: { appointmentId },
      headers: {
        Authorization: `Bearer ${authToken1}`,
      },
    });

    toast.success(response.data.message);
    setAppointments(appointments.filter((app) => app._id !== appointmentId));
    //////////console.log(response);
  } catch (error) {
    //////////console.error("Error deleting appointment:", error);
    toast.error("Error deleting appointment, try after sometime");
  }
};






// const handleFileUpload = async (e, appointmentId) => {
//   const file = e.target.files[0];
//   if (file) {
//     const formData = new FormData();
//     formData.append("prescription", file);
//     formData.append("appointmentId", appointmentId);

//     try {
//       const response = await axios.post("/upload-prescription", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         alert("Prescription uploaded successfully.");
        
//       } else {
//         alert("Failed to upload prescription.");
//       }
//     } catch (error) {
//       //////////console.error("Error uploading file:", error);
//       alert("An error occurred while uploading the prescription.");
//     }
//   }
// };

// const handleDeleteFile = async (e, appointmentId) => {
//   e.preventDefault();

//   try {
//     const response = await axios.delete(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/upload`,{
//       headers:{
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`
//       }
//     });

//     if (response.ok) {
//       // Handle successful file deletion, e.g., updating the state
//       // Remove the file information from the state
//       setAppointments((prevAppointments) =>
//         prevAppointments.map((appointment) =>
//           appointment._id === appointmentId
//             ? { ...appointment, fileName: null, fileId: null, fileSize: null }
//             : appointment
//         )
//       );
//       alert('File deleted successfully!');
//     } else {
//       const errorData = await response.json();
//       alert(`Error deleting file: ${errorData.message}`);
//     }
//   } catch (error) {
//     //////////console.error('Error deleting file:', error);
//     alert('Server error. Unable to delete file.');
//   }
// };

const handleDeleteFile = async (e, appointmentId) => { e.preventDefault(); try { const response = await axios.delete(`https://dentalsite-sparktech-2.onrender.com/app/appointments/${appointmentId}/delete`);
 if (response.status === 200) { // Handle successful file deletion, e.g., updating the state 
  setAppointments((prevAppointments) => prevAppointments.map((appointment) => appointment._id === appointmentId ? { ...appointment, fileName: null, fileId: null, fileSize: null } : appointment ) ); 
  // alert('File deleted successfully!'); 
  toast.success("File deleted Successfully!", toastOptions);
} 
  else { 
    // alert(`Error deleting file: ${response.statusText}`); 
    toast.error(`Error deleting file: ${response.statusText}`, toastOptions);
} }
 catch (error) { 
  //////////console.error('Error deleting file:', error); 
  // alert('Server error. Unable to delete file.');
  toast.error('Failed to delete file: ' + (error.response ? error.response.data : error.message), toastOptions);
 }};



 if(role!=="admin"){
  return (
    <div style={{ paddingTop: '100px' }} className='container'>
      <h1 className='text-danger text-center'>You do not have the required permissions to access this page.</h1>
    </div>
  );
 }

  
  

  return (
    <>{role=="admin" && (<div style={{ paddingTop: '100px' }} className='container'>
      

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
      <button className="btn mb-3" style={{background: "#2a4735"}} onClick={toggleModal}>
       <article className='text-white'>Add Appointment</article>
      </button>

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
                      <option value="madipakkam">Madipakkam</option>
                      <option value="balajinagar">Balaji nagar</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className='text-white'>Date</label>
                    <input
                      type="date"
                      // min={todayDate}
                      className="form-control"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Adding PhoneNumber Field */}
                  <div className="form-group">
                    <label className='text-white'>Phonenumber</label>
                    <input
                      type="number"
                      // min={todayDate}
                      className="form-control"
                      name="phoneNumber"
                      value={newAppointment.phoneNumber}
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
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn text-white" style={{background: "#2a4735"}} onClick={handleAddAppointment}
                disabled={load}
                id="lo"
                >
                  {load ? <>Saving Appointment</> : <>Save Appointment</>}
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
    

    </div>
      </Tab>
      <Tab eventKey="profile" title="Patient Records">
        
      {/* <div style={{overflowX: "hidden"}} className="table-responsive"> */}
        {/* <table className="table table-bordered table-striped"> */}
          {/* <tbody> */}
            {appointments.length===0 ? (<h1 className='text-center w-100' style={{marginTop: "100px"}}>No Appointments Booked</h1>)
    :
    (<>
    <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            value={searchReason}
            onChange={(e) => setSearchReason(e.target.value)}
            placeholder="Search by Reason"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          {/* <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by Location"
            className="form-control"
          /> */}
          <select
                      className="form-select"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      required
                    >
                      <option value="">Select Location</option>
                        <option value="madipakkam">
                          Madipakkam
                        </option>
                        <option value="balajinagar">
                          Balaji nagar
                        </option>
                    </select>
        </div>
        {/* <div className="col-md-3">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="form-control"
          />
        </div> */}
        <div className="col-md-3">
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
    <div className="table-responsive">
    
      <div className="row">
      
        <div className="col">
          <table className="table table-bordered table-black table-striped appointments-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Reason</th>
                <th>PhoneNumber</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Visited</th>
                <th>Upload</th>
                <th>Download</th>
                <th>Amount paid</th>
                
              </tr>
            </thead>
            <tbody>

              {paginatedAppointments
                .map((appointment, index) => (
                  <tr key={appointment._id}>
                    <td>{index+1}</td>
                    
                    
                    
                    {/* <td style={{textTransform: "capitalize"}} className='text-nowrap text-no-wrap'>{appointment.userInfo}</td>
                     */}




<td style={{ 
  textTransform: "capitalize"
  ,
   whiteSpace: "nowrap" }} className="text-nowrap">
  {editingId === appointment._id ? (
    <div className="d-flex align-items-center">
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        className="form-control"
        style={{ width: "120px", marginRight: "5px" }} // Adjust width
      />
      <button
        className="btn btn-success btn-sm"
        style={{ marginLeft: "5px" }}
        onClick={() => handleSaveName(appointment._id)}
      >
        Save
      </button>
    </div>
  ) : (
    <div className="d-flex align-items-center">
      <span>{appointment.userInfo || "N/A"}</span>  {/* Ensure name is not empty */}
      <button
        className="btn"
        style={{ marginLeft: "10px" }} // Ensure spacing
        onClick={() => handleEdit(appointment._id, appointment.userInfo)}
      >
        ✏️
      </button>
    </div>
  )}
</td>





 
                    <td style={{width: "103px",
                        textWrap: "nowrap"}}>{appointment.reason}</td>




                    {/* phoneNumber Edit */}

                    <td style={{ whiteSpace: "nowrap" }} className="text-nowrap">
  {editingPId === appointment._id ? (
    <div className="d-flex align-items-center">
      <input
        type="text"
        value={editedPhoneNumber}
        onChange={(e) => setEditedPhoneNumber(e.target.value)}
        className="form-control"
        style={{ width: "120px", marginRight: "5px" }} // Adjust width
      />
      <button
        className="btn btn-success btn-sm"
        style={{ marginLeft: "5px" }}
        onClick={() => handleSavePhoneNumber(appointment._id)}
      >
        Save
      </button>
    </div>
  ) : (
    <div className="d-flex align-items-center">
      <span>{appointment.phoneNumber}</span>
      <button
        className="btn"
        style={{ marginLeft: "10px" }}
        onClick={() => handleEditPhoneNumber(appointment._id, appointment.phoneNumber)}
      >
        ✏️
      </button>
    </div>
  )}
</td>








                    <td style={{
                        textWrap: "nowrap"}}>{appointment.date}</td>
                    <td>{appointment.startTime}</td>
                    <td>{appointment.location}</td>
                    <td className='text-center'>
                  <input
                    type="checkbox"
                    // className='w-100'
                    checked={appointment.visited || false}
                    onChange={() => handleToggleVisited(appointment._id, appointment.visited)}
                    style={{ 
                      transform: 'scale(1.5)',
                      margin: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </td>
                {/* <td>{appointment.fileId && (
                            <div>
                                <td>
                                <button onClick={(e) => handleDownloadFile(e, appointment._id)}>
                                    Download File
                                </button>
                            </td>
                            </div>
                        )}</td>
                <td>{appointment.fileName === null ? (<><input type="file" onChange={handleFileChange} />
    <button 
        type="button" // Change to "button" to prevent default form submission
        onClick={(e) => handleSubmit(e, appointment._id)} // Call handleSubmit on click
    >
        Upload
    </button></>):(<>{appointment.fileName}</>)}
    
</td> */}
            <td style={{ width: "200px", padding: "5px" }}>
                {appointment.fileName == null ? (
                    <>
                        <input type="file" onChange={handleFileChange} 
                        style={{width: "103px",
                        display: "inline-block"}}
                        />
                        <button
                            type="button" style={{background: "#2A4735", textWrap: "nowrap"}} className='text-white btn mt-2 d-flex flex-row' // Change to "button" to prevent default form submission
                            onClick={(e) => handleSubmit(e, appointment._id)} // Call handleSubmit on click
                        >
                            Upload File
                        </button>
                    </>
                ) : (
                    <>{appointment.fileName}</>
                )}
            </td>
            <td>
                {appointment.fileId ? (
                    <div>
                        <td>
                            <button className='btn' style={{background: "#2A4735", color: "white"}} onClick={(e) => handleDownloadFile(e, appointment._id)}>
                                Download
                            </button>
                        </td>
                        <td>
                        <button className='btn btn-danger' style={{background: "#FF0000", color: "white"}} onClick={(e) => handleDeleteFile(e, appointment._id)}> Delete</button>
                        </td>
                    </div>
                ) : null}
            </td>

            <td>
  {
    <div className='text-center'>
    <input
      type="number"
      placeholder="Enter amount paid"
      value={appointment.amountPaid}  // Bind value to the specific appointment's amount
      onChange={(e) => handleAmountChange(e, appointment._id)}  // Update specific appointment's amount on change
    />
    <button
      className="btn mt-2"
      style={{ backgroundColor: "#2A4735", color: "#FFFFFF" }}
      onClick={() => handleUpdatePayment(appointment._id)}  // Update payment for specific appointment
    >
      Update Payment
    </button>
  </div>  
  }
</td>
<td>
<button className='btn' onClick={() => deleteAppointment(appointment._id)}>🗑️</button>
</td>

                  </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* <div className="col">
          <h5>balajinagar</h5>
          <table className="table table-bordered table-black table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments
                // .filter(appointment => appointment.location === "balajinagar")
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
                    <td>{appointment.startTime}</td>
                    <td className='text-center'>
                  <input
                    type="checkbox"
                    checked={appointment.visited || false}
                    onChange={() => handleToggleVisited(appointment._id, appointment.visited)}
                    style={{ 
                      transform: 'scale(1.5)',
                      margin: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
      {appointments.length > 0 && !(searchName || searchReason || searchLocation || searchDate || searchTime) && (
  <div className="text-center mt-4">
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={(page) => {
        setCurrentPage(page);
        fetchAppointments(page, 10);
      }}
    />
  </div>
)}

            
    </div>
    
    </>)  
    }
          {/* </tbody> */}
        {/* </table> */}
      {/* </div> */}
      
      </Tab>
      <Tab id="app" eventKey="contact" title="Appointments">
      {appointments.length===0 || appointments.filter(app => app.date === todayDate).length === 0 ? (<h1 className='text-center w-100' style={{marginTop: "100px"}}>No Appointmnets Booked for Today</h1>)
    :
    (<>
    <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            value={searchReason}
            onChange={(e) => setSearchReason(e.target.value)}
            placeholder="Search by Reason"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by Location"
            className="form-control"
          />
        </div>
        {/* <div className="col-md-3">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="form-control"
          />
        </div> */}
        <div className="col-md-3">
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
          <h5>Madipakkam</h5>
          <table className="table table-bordered table-black table-striped appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Visited</th>
                
              </tr>
            </thead>
            <tbody>

              {filteredAppointments
                .filter(appointment => appointment.location === "madipakkam" && appointment.date === new Date().toLocaleDateString('en-CA'))
                .map(appointment => (
                  <tr key={appointment._id}>
                    <td >{appointment.userInfo}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      <span className={appointment.status === "confirmed" ? "text-white btn btn-rounded" : "bg-danger"}
                      style={{background: "#2A4735"}}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td style={{width: "103px",
                        display: "inline-block"}}>{appointment.date}</td>
                    <td>{appointment.startTime}</td>
                    <td className='text-center'>
                  <input
                    type="checkbox"
                    // className='w-100'
                    checked={appointment.visited || false}
                    onChange={() => handleToggleVisited(appointment._id, appointment.visited)}
                    style={{ 
                      transform: 'scale(1.5)',
                      margin: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="col">
          <h5>Balaji nagar</h5>
          <table className="table table-bordered table-black table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments
                .filter(appointment => appointment.location === "balajinagar" && appointment.date === new Date().toLocaleDateString('en-CA'))
                .map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.userInfo}</td>
                    <td
                    
                    
                    
                    
                    >{appointment.reason}</td>
                    <td>
                      <span className={appointment.status === "confirmed" ? "bg-success btn btn-rounded" : "bg-danger"}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>{appointment.date}</td>
                    <td>{appointment.startTime}</td>
                    <td className='text-center'>
                  <input
                    type="checkbox"
                    checked={appointment.visited || false}
                    onChange={() => handleToggleVisited(appointment._id, appointment.visited)}
                    style={{ 
                      transform: 'scale(1.5)',
                      margin: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div></>)  
    }
  
</Tab>

<Tab id="app" eventKey="PrescriptionPage" title="Prescription">
  <PrescriptionForm />
</Tab>




{/* Bill Code Render */}
<Tab id="bill" eventKey="BillingPage" title="Billing">
  <Billing />
</Tab>





<Tab id="rev" eventKey="reviews" title="Reviews">
  <Reviews />
</Tab>
    </Tabs>
  {/* ); */}
{/* } */}

{/* export default NoAnimationExample; */}
    </div>)}
    
    <ToastContainer />
    <style jsx>
      {`
      .page-item .page-link {
  
  color: white;
  background-color: #2A4735;
  transition: none;
}

      .page-item .page-link:hover{
        color: white;
        background-color: #2A4735;
      }
      

      .page-item.active .page-link {
      border-color: #2A4735;
      font-weight: 700;
      color: #000000;
      background-color: #FFFFFF;
      }

      .page-item.disabled .page-link {
        color: #6c757d;
        pointer-events: none;
        cursor: auto;
      }

      .btn {
        transition: all 0.3s ease-in-out;
      }

      .btn:hover {
        background: #1e3628 !important;
        transform: scale(1.05);
      }

      .btn:active {
        transform: scale(0.95);
      }



      `}
    </style>
    </>
  );
}

export default AdminPanel;