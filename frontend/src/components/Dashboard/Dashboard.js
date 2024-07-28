import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('browseLoan'); // Default tab

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <ul className="nav-tabs">
          <li
            className={`nav-item ${activeTab === 'browseLoan' ? 'active' : ''}`}
            onClick={() => handleTabChange('browseLoan')}
          >
            Browse Loan
          </li>
          <li
            className={`nav-item ${activeTab === 'makePayment' ? 'active' : ''}`}
            onClick={() => handleTabChange('makePayment')}
          >
            Make Payment
          </li>
          <li
            className={`nav-item ${activeTab === 'transaction' ? 'active' : ''}`}
            onClick={() => handleTabChange('transaction')}
          >
            Transaction
          </li>
        </ul>
      </header>

      <div className="dashboard-content">
        {activeTab === 'browseLoan' && <BrowseLoan />}
        {activeTab === 'makePayment' && <MakePayment />}
        {activeTab === 'transaction' && <Transaction />}
      </div>
    </div>
  );
};

// Browse Loan Component
const BrowseLoan = () => {
  const [loanDetails, setLoanDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cibilScore, setCibilScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch loan details from the backend
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/loans');
        console.log(response.data);
        setLoanDetails(response.data); // Set loan details to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  useEffect(() => {
    const cibil = localStorage.getItem('cibilScore');
    setCibilScore(cibil); // Update state with cibilScore
  }, []);

  // Handle expand/collapse of the loan application section
  const handleCibilEvent = () => {
    navigate('/cibilscore'); // Navigate to the CreditScoreChecker route
  };

  // Handle application navigation
  const handleApply = (loanId) => {
    navigate('/loanapplication'); // Redirect to loan application page with loan ID
  };

  return (
    <div className="browse-loan">
      {!cibilScore ? (
        <>
          <h2>Update your CIBIL to apply for a Loan</h2>
          <button onClick={handleCibilEvent} className="expand-button">
            Update CIBIL
          </button>
        </>
      ) : (
        <>
          <h3>Available Loans</h3>
          {loading ? (
            <p>Loading loan details...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : loanDetails.length > 0 ? (
            <div className="loan-list">
              <table>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Tenure</th>
                    <th>Monthly Payment</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loanDetails.map((loan) => (
                    <tr key={loan._id}>
                      <td>{loan.amount}</td>
                      <td>{loan.interestRate}%</td>
                      <td>{loan.tenure} months</td>
                      <td>${loan.monthlyPayment.toFixed(2)}</td>
                      <td>${loan.totalAmount.toFixed(2)}</td>
                      <td>
                        <button 
                          onClick={() => handleApply(loan._id)} 
                          className="apply-button"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No loan details available.</p>
          )}
        </>
      )}
    </div>
  );
};

// Make Payment Component
const MakePayment = () => {
  return (
    <div className="make-payment">
      <h2>Make Payment</h2>
      <p>Payment functionality will be available here soon!</p>
      {/* Add more content related to making payments here */}
    </div>
  );
};

// Transaction Component
const Transaction = () => {
  return (
    <div className="transaction">
      <h2>Transaction History</h2>
      <p>Transaction details will be shown here soon!</p>
      {/* Add more content related to transaction history here */}
    </div>
  );
};

export default Dashboard;
