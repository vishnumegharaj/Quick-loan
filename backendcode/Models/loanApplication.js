// models/LoanApplication.js
const mongoose = require('mongoose');

const LoanApplicationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  loanPurpose: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  employmentStatus: {
    type: String,
    enum: ['Employed', 'Self-Employed', 'Other'],
    required: true,
  },
  yearlyIncome: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);
