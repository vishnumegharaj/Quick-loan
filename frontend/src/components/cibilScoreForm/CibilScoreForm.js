import React, { useState } from 'react';
import './CibilScoreForm.css';
import { useNavigate } from 'react-router-dom';

const CibilScoreForm = () => {
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
  const [cibilScore, setCibilScore] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!socialSecurityNumber || !cibilScore) {
      setMessage('Please fill in both fields.');
      return;
    }

    try {
      // Send POST request to backend

    
        localStorage.setItem('cibilScore', cibilScore);
        navigate('/dashboard');
        console.log(cibilScore);

        // Update success message
        setMessage('CIBIL Score successfully saved.');
        setSocialSecurityNumber('');
        setCibilScore('');
       
    
    } catch (error) {
      setMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="credit-score-checker">
      <h1>
        To accurately check your rate, please provide your social security
        number and CIBIL score
      </h1>
      <form onSubmit={handleSubmit} className="credit-score-form">
        <div>
          <input
            type="text"
            placeholder="Social Security Number"
            value={socialSecurityNumber}
            onChange={(e) => setSocialSecurityNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="CIBIL Score"
            value={cibilScore}
            onChange={(e) => setCibilScore(e.target.value)}
          />
        </div>
        <div className="credit-score-info">
          <i className="fas fa-info-circle"></i>
          We need this information to provide an accurate rate.
        </div>
        <button type="submit">Get Your Rate</button>
        <div className="credit-score-footer">
          <i className="fas fa-info-circle"></i>
          Checking your rate won't affect your CIBIL score!
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CibilScoreForm;
