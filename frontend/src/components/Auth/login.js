import React, { useState } from 'react';
import axios from 'axios'; // Optional: For styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles.css';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log('Form data:', formData);
  
      try {
        const response = await axios.post('http://localhost:8085/api/auth/login', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Handle successful response
        console.log('Login successful:', response.data);
        setSuccessMessage('Login successful! Redirecting...');
        setErrorMessage('');
  
        // Correctly access the data from response
        const accessToken = response.data.authToken;
        console.log('Access Token:', accessToken);
  
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          console.log("Access Token stored in localStorage:", localStorage.getItem('accessToken'));

          // Navigate to the dashboard or another page
          navigate('/dashboard'); // You can change the path here
        } else {
          console.log('Access token not found in the response.');
        }
  
      } catch (error) {
        // Handle error response
        if (error.response && error.response.data) {
          console.error('Login failed:', error.response.data);
          setErrorMessage(error.response.data.message || 'Login failed');
        } else {
          console.error('Login failed:', error.message);
          setErrorMessage('An unexpected error occurred.');
        }
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <div className="error">{formErrors.password}</div>}
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
