import React from 'react';
import '../Styles/Steps.css';
import a1 from '../images/a1.jpeg';
import a2 from '../images/a2.jpeg';
import a3 from '../images/a3.jpeg';

const Steps = () => {
  return (
    <div className="steps-container">
      <h2>Get started today!</h2>
      <p>3 Simple steps for achieving your best smile</p>
      <div className="steps-grid">
        <div className="step">
          <img src={a1} alt="Step 1" className="step-image" />
          <div className="step-number">1</div>
          <p className="step-description">Schedule an exam</p>
        </div>
        <div className="step">
          <img src={a2} alt="Step 2" className="step-image" />
          <div className="step-number">2</div>
          <p className="step-description">Speak with a dentist about your goals</p>
        </div>
        <div className="step">
          <img src={a3} alt="Step 3" className="step-image" />
          <div className="step-number">3</div>
          <p className="step-description">Create a plan and start your smile journey</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;