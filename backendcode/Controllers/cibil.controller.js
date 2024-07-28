const CibilScore = require('../Models/cibil.model');

// Function to create a new CIBIL score entry
exports.createCibilScore = async (req, res) => {
  try {
    const { socialSecurityNumber, cibilScore } = req.body;

    // Validate inputs
    if (!socialSecurityNumber || !cibilScore) {
      return res.status(400).json({ error: 'Both fields are required.' });
    }

    // Validate CIBIL score range
    if (cibilScore < 300 || cibilScore > 900) {
      return res.status(400).json({ error: 'CIBIL score must be between 300 and 900.' });
    }

    // Check if SSC already exists in the database
    const existingEntry = await CibilScore.findOne({ socialSecurityNumber });
    if (existingEntry) {
      return res.status(409).json({ error: 'This Social Security Number is already registered.' });
    }

    // Create a new CibilScore entry
    const cibilScoreEntry = new CibilScore({
      socialSecurityNumber,
      cibilScore,
    });

    // Save to database
    await cibilScoreEntry.save();

    // Respond with success message
    res.status(201).json({
      message: 'CIBIL Score successfully saved.',
      cibilScoreEntry,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the CIBIL score.' });
  }
};

// Function to retrieve all CIBIL score entries
exports.getCibilScores = async (req, res) => {
  try {
    const scores = await CibilScore.find();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the CIBIL scores.' });
  }
};
