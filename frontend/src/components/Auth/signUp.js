import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './styles.css';

const SignUp = () => {
  const navigate = useNavigate();

  // State for form fields and errors
  const [formData, setFormData] = useState({
    role: '', // Role (Lender/Borrower)
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!formData.role) {
      errors.role = 'Role is required';
    }

    if (!formData.fullName) {
      errors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 3) {
      errors.fullName = 'Full Name must be at least 3 characters';
    } else if (formData.fullName.length > 50) {
      errors.fullName = 'Full Name cannot exceed 50 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords must match';
    }

    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact Number is required';
    } else if (!/^[0-9]+$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact Number must contain only digits';
    } else if (formData.contactNumber.length < 10) {
      errors.contactNumber = 'Contact Number must be at least 10 digits';
    } else if (formData.contactNumber.length > 15) {
      errors.contactNumber = 'Contact Number cannot exceed 15 digits';
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
        const response = await axios.post('http://localhost:8085/api/auth/signup', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Handle successful response
        console.log('Registration successful:', response.data);
        setSuccessMessage('Registration successful! Please check your email for verification.');
        setTimeout(() => {
          navigate('/login'); // Ensure the correct path is used
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        // Handle error response
        console.error('Registration failed:', error.response.data);
        setFormErrors({ apiError: error.response.data.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Lender">Lender</option>
            <option value="Borrower">Borrower</option>
          </select>
          {formErrors.role && <div className="error">{formErrors.role}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {formErrors.fullName && <div className="error">{formErrors.fullName}</div>}
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && <div className="error">{formErrors.confirmPassword}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {formErrors.contactNumber && <div className="error">{formErrors.contactNumber}</div>}
        </div>

        {formErrors.apiError && <div className="error">{formErrors.apiError}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
