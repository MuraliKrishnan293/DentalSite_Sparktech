import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/app/allusers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        const data = response.data;
        const nonAdminUsers = data.filter(user => user.role !== "admin");
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res1 = await axios.get('http://localhost:5000/app/allapointments',{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        setAppointments(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res1 = await axios.get('http://localhost:5000/app/getreviews',{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        setReviews(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
  

  return (
    <div style={{ paddingTop: '100px' }} className='container'>
      <h1>Admin Panel</h1>
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

      <h4>Appointments Booked</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-black table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>User Reviews</h4>
      <div className='container'>
        <div className='row'>
          {reviews.map((r)=>(
            <div key={r._id} className='col-md-4 col-sm-6 col-12'>
              <div className='card mt-5'>
                <h6>{r.username}</h6>
                <p>{r.comment}</p>
                <p>{r.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;