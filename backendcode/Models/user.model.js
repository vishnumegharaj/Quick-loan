// userSchema.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['lender', 'borrower'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
}, {timestamps: true}
);

const User = mongoose.model("user", userSchema);

module.exports = User;
 
