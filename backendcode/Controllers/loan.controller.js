const Loan = require('../Models/loan.model.js');

// Function to retrieve all loan details
exports.getLoanDetails = async (req, res) => {
  try {
    const loans = await Loan.find();
    console.log(loans);
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the loan details.' });
  }
};

// Function to retrieve loan details by ID
exports.getLoanDetailsById = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found.' });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the loan details.' });
  }
};

// Function to create a new loan
exports.createLoan = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { amount, interestRate, tenure, monthlyPayment, totalAmount } = req.body;

    // Create a new Loan instance
    const newLoan = new Loan({
      amount,
      interestRate,
      tenure,
      monthlyPayment,
      totalAmount,
    });

    // Save the loan to the database
    const savedLoan = await newLoan.save();

    // Return the saved loan as a response
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the loan.' });
  }
};
