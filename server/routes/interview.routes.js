const express = require('express');
const router = express.Router();
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

// Get all questions or filter by category
router.get('/', (req, res) => {
    const { category } = req.query;
    let query = 'SELECT * FROM interview_questions';
    let params = [];

    if (category && category !== 'All') {
        query += ' WHERE category = ?';
        params.push(category);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            // Fallback mock data if DB fails
            return res.json([
                { id: 1, category: 'React', question_text: 'What is the Virtual DOM?', difficulty: 'Medium', sample_answer: 'The Virtual DOM is a lightweight copy...' },
                { id: 2, category: 'Behavioral', question_text: 'Tell me about a challenge you faced.', difficulty: 'Easy', sample_answer: 'STAR Method: Situation, Task, Action, Result...' },
                { id: 3, category: 'Node.js', question_text: 'Explain Event Loop.', difficulty: 'Hard', sample_answer: 'The event loop allows Node.js to perform non-blocking I/O...' },
            ]);
        }
        res.json(results);
    });
});

module.exports = router;
