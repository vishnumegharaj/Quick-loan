import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './home.css'; // Import the CSS file for styling
import Logo from '../../images/logo.svg';
import ApiIcon from '../../images/icon-api.svg';
import BudgetingIcon from '../../images/icon-budgeting.svg';
import OnlineIcon from '../../images/icon-online.svg';
import OnboardingIcon from '../../images/icon-onboarding.svg';
import CurrencyImage from '../../images/image-currency.jpg';
import RestaurantImage from '../../images/image-restaurant.jpg';
import PlaneImage from '../../images/image-plane.jpg';
import ConfettiImage from '../../images/image-confetti.jpg';

const Home = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="container flex">
          <div className="logo">
           <h1>Quick Funder</h1>
          </div>
          <div className="auth-buttons">
            <button className="signup-button" onClick={handleSignupClick}>
              Signup
            </button>
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Empower Your Financial Future with Quick Funds</h1>
            <p>
              Join Quick Funds to connect directly with borrowers and lenders.
              Our platform provides a transparent and efficient way to manage
              your finances.
            </p>
            <div className="auth-buttons">
              <button className="signup-button" onClick={handleSignupClick}>
                SignUp
              </button>
              <button className="login-button" onClick={handleLoginClick}>
                LogIn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <div className="container">
          <div className="info-header">
            <h2>Why Choose Quick Funds?</h2>
            <p>
              Quick Funds offers a unique P2P lending experience with
              cutting-edge technology to simplify the borrowing and lending
              process.
            </p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <img src={OnlineIcon} alt="Online Banking Icon" />
              <h3>Secure Transactions</h3>
              <p>
                Experience peace of mind with secure, encrypted transactions and
                rigorous verification processes.
              </p>
            </div>
            <div className="info-card">
              <img src={BudgetingIcon} alt="Budgeting Icon" />
              <h3>Transparent Rates</h3>
              <p>
                Our platform provides clear and competitive interest rates,
                ensuring you get the best deal.
              </p>
            </div>
            <div className="info-card">
              <img src={OnboardingIcon} alt="Fast Onboarding Icon" />
              <h3>Fast Approvals</h3>
              <p>
                Get your loan approved quickly with our streamlined application
                process. Lenders can also start earning in no time.
              </p>
            </div>
            <div className="info-card">
              <img src={ApiIcon} alt="Open API Icon" />
              <h3>Flexible Options</h3>
              <p>
                Choose from a variety of loan and investment options tailored to
                meet your unique financial needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles">
        <div className="container">
          <h2>Latest Insights</h2>
          <div className="article-grid">
            <div className="article-card">
              <img src={CurrencyImage} alt="Currency" />
              <div className="article-text">
                <span>By Claire Robinson</span>
                <h3>P2P Lending: A Modern Approach to Finance</h3>
                <p>
                  Discover how P2P lending is reshaping the financial landscape
                  by connecting borrowers and lenders directly.
                </p>
              </div>
            </div>
          
            <div className="article-card">
              <img src={PlaneImage} alt="Plane" />
              <div className="article-text">
                <span>By Wilson Hutton</span>
                <h3>Expanding Financial Access Globally</h3>
                <p>
                  Explore how P2P platforms are breaking down barriers and
                  providing financial opportunities worldwide.
                </p>
              </div>
            </div>
            <div className="article-card">
              <img src={ConfettiImage} alt="Confetti" />
              <div className="article-text">
                <span>By Claire Robinson</span>
                <h3>Join the Quick Funds Community Today!</h3>
                <p>
                  Sign up for exclusive access to our beta features and be part
                  of a growing community focused on financial innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              
            </div>
            <nav className="footer-navigation">
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#support">Support</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
              </ul>
            </nav>
            <div className="social-media">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <button className="request-invite">Request Invite</button>
            <p className="copyright">
              &copy; 2024 Quick Funds. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
