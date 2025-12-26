require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Pool)
// Using a pool is better because it doesn't crash the app if the DB is down at startup.
// It will try to connect when a query is made.
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'job_prep_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// CRITICAL: Handle errors on the pool to prevent app crash
db.on('error', (err) => {
    console.error('Unexpected Database Error:', err.message);
});

// Routes
app.get('/', (req, res) => {
    res.send('Student Job Prep API is running');
});

const skillsRoutes = require('./routes/skills.routes');
const resumeRoutes = require('./routes/resume.routes');
const interviewRoutes = require('./routes/interview.routes');

app.use('/api/skills', skillsRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
