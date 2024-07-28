import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './loanApplication.css';

const LoanApplication = () => {
  const { id } = useParams(); // Get loan ID from URL
  const [loanDetails, setLoanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/loans/${id}`);
        setLoanDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields here if necessary
    if (!fullName || !dateOfBirth || !street || !city || !state || !country || !zipCode || !employmentStatus || !yearlyIncome) {
      alert("Please fill out all fields.");
      return;
    }

    // Build application data to send to the backend
    const applicationData = {
      loanId: id,
      fullName,
      dateOfBirth,
      address: {
        street,
        city,
        state,
        country,
        zipCode,
      },
      incomeDetails: {
        employmentStatus,
        yearlyIncome,
      },
    };

    console.log(applicationData); // For demonstration purposes, log the data to the console.

    // Submit the application to the backend
    axios.post('http://localhost:8085/api/loanapplication', applicationData)
      .then(response => {
        console.log(response.data);
        alert('Application Submitted Successfully!');
        // Clear form after submission
        setFullName('');
        setDateOfBirth('');
        setStreet('');
        setCity('');
        setState('');
        setCountry('');
        setZipCode('');
        setEmploymentStatus('');
        setYearlyIncome('');
      })
      .catch(err => {
        console.error(err);
        alert('There was an error submitting your application.');
      });
  };

  if (loading) return <p>Loading loan details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="loan-application">
      <h2>Loan Application</h2>
      {loanDetails ? (
        <div>
          <h3>Loan Details</h3>
          <p>Amount: ${loanDetails.amount}</p>
          <p>Interest Rate: {loanDetails.interestRate}%</p>
          <p>Tenure: {loanDetails.tenure} months</p>
          <p>Monthly Payment: ${loanDetails.monthlyPayment.toFixed(2)}</p>
          <p>Total Amount: ${loanDetails.totalAmount.toFixed(2)}</p>

          <h3>Applicant Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employmentStatus">Employment Status:</label>
              <select
                id="employmentStatus"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                required
              >
                <option value="">Select Employment Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="yearlyIncome">Yearly Income:</label>
              <input
                type="number"
                id="yearlyIncome"
                value={yearlyIncome}
                onChange={(e) => setYearlyIncome(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        </div>
      ) : (
        <p>Loan details not found.</p>
      )}
    </div>
  );
};

export default LoanApplication;
