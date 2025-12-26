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

// Get all skills
router.get('/', (req, res) => {
    const query = 'SELECT * FROM skills ORDER BY role_category, skill_name';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching skills:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get skills by role
router.get('/:role', (req, res) => {
    const role = req.params.role;
    const query = 'SELECT * FROM skills WHERE role_category = ?';
    db.query(query, [role], (err, results) => {
        if (err) {
            console.error('Error fetching skills by role:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Generate AI Roadmap (Simulated with Curated 2026 Data & Resources)
router.post('/generate', (req, res) => {
    const { goal } = req.body;
    const input = goal.toLowerCase();

    // Simulate AI delay
    setTimeout(() => {
        let roadmap = [];
        const basicSteps = [
            {
                step: 'Core Logic & CS',
                description: 'Master algorithms, data structures, and system design basics.',
                time: '3 weeks',
                docLink: 'https://roadmap.sh/computer-science',
                videoLink: 'https://www.youtube.com/watch?v=szL66PshTto'
            },
        ];

        // 1. AI ENGINEER
        if (input.includes('ai') || input.includes('machine') || input.includes('ml')) {
            roadmap = [
                ...basicSteps,
                {
                    step: 'Mathematics for AI',
                    description: 'Linear algebra, calculus, and probability for building models.',
                    time: '4 weeks',
                    docLink: 'https://standard-deviants-ml.github.io/math-for-ml/',
                    videoLink: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'
                },
                {
                    step: 'Prompt & Agent Engineering',
                    description: 'Mastering ReAct patterns and building autonomous AI Agents.',
                    time: '4 weeks',
                    docLink: 'https://www.promptingguide.ai/',
                    videoLink: 'https://www.youtube.com/watch?v=v2gD8BHOaX4'
                },
                {
                    step: 'Nvidia/CUDA Optimization',
                    description: 'Learning how to run massive LLMs efficiently on GPU hardware.',
                    time: '3 weeks',
                    docLink: 'https://docs.nvidia.com/cuda/',
                    videoLink: 'https://www.youtube.com/watch?v=0_u6_6XF-sM'
                }
            ];
        }
        // 2. CLOUD ARCHITECT
        else if (input.includes('cloud') || input.includes('aws') || input.includes('azure')) {
            roadmap = [
                ...basicSteps,
                {
                    step: 'AWS & multi-Cloud',
                    description: 'Learning AWS and Azure integration for enterprise reliability.',
                    time: '4 weeks',
                    docLink: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
                    videoLink: 'https://www.youtube.com/watch?v=ia7_vD1zT5I'
                },
                {
                    step: 'Kubernetes Mastery',
                    description: 'Advanced orchestration and horizontal autoscaling.',
                    time: '4 weeks',
                    docLink: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
                    videoLink: 'https://www.youtube.com/watch?v=X48VuDVv0do'
                }
            ];
        }
        // 3. CYBERSECURITY
        else if (input.includes('sec') || input.includes('cyb') || input.includes('hack')) {
            roadmap = [
                ...basicSteps,
                {
                    step: 'Ethical Hacking',
                    description: 'Testing system vulnerabilities and penetration testing.',
                    time: '5 weeks',
                    docLink: 'https://owasp.org/www-project-top-ten/',
                    videoLink: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE'
                },
                {
                    step: 'Zero Trust Architecture',
                    description: 'Mastering identity-centric security and modern authentication.',
                    time: '4 weeks',
                    docLink: 'https://www.nist.gov/publications/zero-trust-architecture',
                    videoLink: 'https://www.youtube.com/watch?v=03n_Cozd7yU'
                }
            ];
        }
        // 4. NEXT-GEN FULL STACK
        else if (input.includes('web') || input.includes('react') || input.includes('full')) {
            roadmap = [
                ...basicSteps,
                {
                    step: 'Next.js 15+ & RSC',
                    description: 'Mastering React Server Components and performance optimization.',
                    time: '4 weeks',
                    docLink: 'https://nextjs.org/docs',
                    videoLink: 'https://www.youtube.com/watch?v=wm5gMKuwSYk'
                },
                {
                    step: 'Typed Web (TS + Zod)',
                    description: 'Building end-to-end type-safe applications.',
                    time: '3 weeks',
                    docLink: 'https://www.typescriptlang.org/docs/',
                    videoLink: 'https://www.youtube.com/watch?v=BwuLxPH8AVM'
                }
            ];
        }
        // 5. GENERIC FALLBACK
        else {
            roadmap = [
                ...basicSteps,
                {
                    step: 'Specialized Roadmap',
                    description: `Custom path generated for ${goal}.`,
                    time: '6 weeks',
                    docLink: 'https://roadmap.sh',
                    videoLink: 'https://www.youtube.com'
                },
            ];
        }

        res.json({ success: true, roadmap });
    }, 1500);
});

module.exports = router;
