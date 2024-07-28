const express = require('express');
const router = express.Router();
const loanController = require('../Controllers/loan.controller');

// Route to get all loan details
router.get('/', loanController.getLoanDetails);

// Route to get loan details by ID
router.get('/:loanId', loanController.getLoanDetailsById);

// Route to create a new loan
router.post('/', loanController.createLoan);

module.exports = router;
