import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import './App.css';
import SignUp from './components/Auth/signUp';
import Login from './components/Auth/login';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import CibilScoreForm from './components/cibilScoreForm/CibilScoreForm';
import LoanApplication from './components/loanApplication/loanApplication';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cibilscore" element={<CibilScoreForm />} />
        <Route path="/loanapplication" element={<LoanApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
