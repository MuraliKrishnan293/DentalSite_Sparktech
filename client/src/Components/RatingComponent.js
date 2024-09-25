// RatingComponent.js

import React, { useState } from 'react';

const StarRating = ({ onRatingChange }) => {
  const [currentValue, setCurrentValue] = useState(0); // Default rating value

  const handleRatingChange = (value) => {
    setCurrentValue(value);
    onRatingChange(value); // Call the passed function to update the rating in parent component
    console.log("Current Rating Value: ", value); // Log the rating value
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{
            cursor: 'pointer',
            fontSize: '30px',
            color: i <= currentValue ? 'gold' : 'gray'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        {renderStars()}
      </div>
      <div>
        <button className="btn btn-warning" onClick={() => handleRatingChange(0)}>Reset</button>
      </div>
    </div>
  );
};

export default StarRating;