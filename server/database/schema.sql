-- Database Schema for Student Job Prep Platform

CREATE DATABASE IF NOT EXISTS job_prep_db;
USE job_prep_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Simplified for MVP
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table (Roadmap)
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_category VARCHAR(100) NOT NULL, -- e.g., 'Frontend', 'Backend', 'Data Science'
    skill_name VARCHAR(100) NOT NULL,
    resource_link VARCHAR(500), -- Tutorial link
    description TEXT
);

-- PDF Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    score INT DEFAULT 0,
    analysis_json JSON, -- Stores structure feedback like { "strengths": [], "improvements": [] }
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Interview Questions Table
CREATE TABLE IF NOT EXISTS interview_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- e.g., 'React', 'Behavioral', 'SQL'
    question_text TEXT NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
    sample_answer TEXT
);

-- Seed Data

-- Skills
INSERT INTO skills (role_category, skill_name, resource_link, description) VALUES
('Frontend', 'HTML & CSS', 'https://developer.mozilla.org', 'The foundation of the web.'),
('Frontend', 'React', 'https://react.dev', 'A library for building user interfaces.'),
('Frontend', 'Tailwind CSS', 'https://tailwindcss.com', 'A utility-first CSS framework.'),
('Backend', 'Node.js', 'https://nodejs.org', 'JavaScript runtime built on Chrome V8.'),
('Backend', 'Express.js', 'https://expressjs.com', 'Fast, unopinionated web framework for Node.js.'),
('Backend', 'MySQL', 'https://dev.mysql.com', 'Open source relational database.');

-- Interview Questions
INSERT INTO interview_questions (category, question_text, difficulty, sample_answer) VALUES
('React', 'What is the Virtual DOM?', 'Medium', 'A lightweight copy of the actual DOM...'),
('React', 'Explain useEffect hook.', 'Medium', 'Used for side effects in functional components.'),
('Behavioral', 'Tell me about a time you failed.', 'Easy', 'STAR method answer...'),
('Node.js', 'What is the event loop?', 'Hard', 'Mechanism that handles asynchronous callbacks.');
