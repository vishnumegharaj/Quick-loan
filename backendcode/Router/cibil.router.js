const express = require('express');
const router = express.Router();
const cibilController = require('../Controllers/cibil.controller'); // Correct path

// Define route for posting CIBIL score data
router.post('/cibilscore', cibilController.createCibilScore);

// Define route for getting all CIBIL score entries
router.get('/cibilscores', cibilController.getCibilScores);

module.exports = router;
