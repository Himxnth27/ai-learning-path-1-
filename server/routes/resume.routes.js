const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'job_prep_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // In a real app, ensure this directory exists
        cb(null, './');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Mock Analysis Function
const analyzeResume = (filename) => {
    // In a real app, parse the PDF text here.
    // Simulating random but realistic scores for the customized 'wow' factor.
    const score = Math.floor(Math.random() * (95 - 60 + 1)) + 60;

    return {
        score: score,
        strengths: ['Clear formatting', 'Good use of action verbs', 'Relevant tech stack mentioned'],
        improvements: ['Add more quantitative metrics', 'Check for typos in Education section', 'Include link to GitHub'],
        keywords_found: ['React', 'Node.js', 'Teamwork', 'Agile']
    };
};

// Upload Route
router.post('/upload', upload.single('resume'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = req.file.filename;
    // Mock user ID 1 for MVP (since we don't have full auth state yet)
    const userId = 1;

    // Simulate processing delay for effect
    setTimeout(() => {
        const analysis = analyzeResume(filename);

        // Save to DB
        const query = 'INSERT INTO resumes (user_id, filename, score, analysis_json) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, filename, analysis.score, JSON.stringify(analysis)], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                // Return success anyway for the UI demo if DB fails (MVP robustness)
                return res.json({
                    success: true,
                    message: 'Resume analyzed (DB save failed but here is the result)',
                    data: analysis
                });
            }
            res.json({ success: true, data: analysis });
        });
    }, 2000);
});

module.exports = router;
