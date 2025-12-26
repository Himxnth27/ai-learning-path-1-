import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Code2, Database, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
// Note: In a real app, Navbar would be in a Layout component.
// For now, I'll include it here or let App.jsx handle it.
// I will assuming App.jsx handles layout or I drop it in here? 
// Let's use a Layout wrapper in App.jsx later, but for now I'll use it in the Page layout.

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        // Fetch from backend
        fetch('http://localhost:5000/api/skills')
            .then(res => res.json())
            .then(data => {
                setSkills(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch skills", err);
                // Fallback dummy data if DB isn't running
                setSkills([
                    { id: 1, role_category: 'Frontend', skill_name: 'HTML & CSS', resource_link: '#', description: 'The structure and style.' },
                    { id: 2, role_category: 'Frontend', skill_name: 'React', resource_link: '#', description: 'Component-based UI logic.' },
                    { id: 3, role_category: 'Backend', skill_name: 'Node.js', resource_link: '#', description: 'Server-side JS.' },
                ]);
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...new Set(skills.map(s => s.role_category))];

    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(s => s.role_category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Navbar /> {/* Temporary placement */}

            <header className="bg-indigo-600 pt-20 pb-32 px-4 rounded-b-[3rem] shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 text-white">
                    <Code2 size={200} />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Your Learning Path
                    </motion.h1>
                    <p className="text-indigo-100 text-lg">Master the skills needed for your dream job.</p>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-20">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                                    ? 'bg-white text-indigo-600 shadow-lg scale-105'
                                    : 'bg-white/20 text-indigo-800 backdrop-blur-sm hover:bg-white/40'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading your roadmap...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${skill.role_category === 'Frontend' ? 'bg-pink-100 text-pink-600' :
                                            skill.role_category === 'Backend' ? 'bg-blue-100 text-blue-600' :
                                                'bg-purple-100 text-purple-600'
                                        }`}>
                                        {skill.role_category}
                                    </span>
                                    <a href={skill.resource_link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.skill_name}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{skill.description}</p>

                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;
