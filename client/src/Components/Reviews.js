import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/app/getreviews',{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#FFD700' : '#e4e5e9'} />
    ));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px' }}>
      {reviews.map((review) => (
        <div
          key={review._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ marginBottom: '10px' }}>{review.username}</p>
          <div style={{ marginBottom: '10px', color: '#FFD700' }}>
            {renderStars(review.rating)}
          </div>
          <p style={{fontSize: "13px"}}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;