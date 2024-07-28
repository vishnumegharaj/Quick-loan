const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  tenure: {
    type: Number, // tenure in months
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;
