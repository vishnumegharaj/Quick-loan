const mongoose = require('mongoose');

const cibilScoreSchema = new mongoose.Schema({
  socialSecurityNumber: {
    type: String,
    required: true,
    unique: true, // Ensure each SSC is unique
    trim: true,
  },
  cibilScore: {
    type: Number,
    required: true,
    min: 300, // Minimum valid CIBIL score
    max: 900, // Maximum valid CIBIL score
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CibilScore = mongoose.model('CibilScore', cibilScoreSchema);

module.exports = CibilScore;
