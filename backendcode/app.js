const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const userRouter = require('./Router/user.router.js');
const cibilRoutes = require('./Router/cibil.router.js');
const loanRoutes = require('./Router/loan.router.js');

const app = express();
const PORT = process.env.PORT || 8085;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/api/auth', userRouter);
app.use('/api/cibilscore', cibilRoutes);
app.use('/api/loans', loanRoutes); // Add loan routes

// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
const db = require('./config/db.config');
mongoose.connect(db.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.error("Cannot connect to the database!", err);
        process.exit();
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
